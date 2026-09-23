/* Mixbook data model + safe three-way merge. No credentials belong in this file. */
(function(root){
 'use strict';
 const clone = v => v === undefined ? undefined : JSON.parse(JSON.stringify(v));
 const same = (a,b) => JSON.stringify(a) === JSON.stringify(b);
 const norm = s => String(s || '').normalize('NFKC').trim().toLowerCase();
 const now = () => new Date().toISOString();
 const uid = () => root.crypto?.randomUUID?.() || 'id-'+Date.now().toString(36)+'-'+Math.random().toString(36).slice(2);
 const empty = () => ({schemaVersion:1,recipes:[],ingredients:[],pantry:{},favorites:{}});
 function validate(input){
   if(!input || typeof input !== 'object' || input.schemaVersion !== 1) throw Error('这个文件不是兼容的一杯手记数据。');
   if(!Array.isArray(input.recipes)||!Array.isArray(input.ingredients)||!input.pantry||!input.favorites||typeof input.pantry!=='object'||typeof input.favorites!=='object'||Array.isArray(input.pantry)||Array.isArray(input.favorites)) throw Error('数据结构不完整，原有记录未被修改。');
   if(input.recipes.length>10000||input.ingredients.length>10000) throw Error('数据量超过初版支持范围。');
   const unique = (items,label) => {const ids=new Set();for(const x of items){if(!x||typeof x.id!=='string'||!x.id||x.id.length>200||!(/^[a-zA-Z0-9_-]+$/).test(x.id)||['__proto__','constructor','prototype'].includes(x.id)||ids.has(x.id))throw Error(label+'含有无效或重复编号。');ids.add(x.id)}return ids};
   const ids=unique(input.ingredients,'材料');unique(input.recipes,'配方');
   const str=(v,max=2000)=>typeof v==='string'&&v.length<=max;
   const ingredients=input.ingredients.map(i=>{if(!str(i.name,100)||!i.name.trim()||!str(i.category,50)||!Array.isArray(i.aliases)||i.aliases.some(a=>!str(a,100)))throw Error('材料字段无效。');return {id:i.id,name:i.name,category:i.category,aliases:i.aliases}});
   const recipes=input.recipes.map(r=>{
     if(!str(r.name,100)||!r.name.trim()||!str(r.en,100)||!str(r.base,60)||!str(r.method,60)||!str(r.glass,100)||!str(r.notes,10000)||!str(r.source,2000)||!Array.isArray(r.tags)||r.tags.some(x=>!str(x,60))||!Array.isArray(r.steps)||r.steps.length<1||r.steps.some(x=>!str(x,3000))||!Array.isArray(r.ingredients)||r.ingredients.length<1||r.ingredients.length>60)throw Error('配方字段无效。');
     const rows=r.ingredients.map(x=>{if(!x||!ids.has(x.id)||!str(x.amount,40)||!str(x.unit,30)||typeof x.optional!=='boolean')throw Error('配方材料或用量无效。');return{id:x.id,amount:x.amount,unit:x.unit,optional:x.optional}});
     return {id:r.id,name:r.name,en:r.en,base:r.base,method:r.method,glass:r.glass,tags:r.tags,notes:r.notes,source:r.source,steps:r.steps,ingredients:rows,createdAt:str(r.createdAt,50)?r.createdAt:now(),updatedAt:str(r.updatedAt,50)?r.updatedAt:now(),sample:r.sample===true,image:r.image==='negroni'?'negroni':''};
   });
   const pantry={},favorites={};
   for(const [key,value] of Object.entries(input.pantry)){if(!ids.has(key)||typeof value!=='boolean')throw Error('酒柜数据无效。');Object.defineProperty(pantry,key,{value,enumerable:true,writable:true,configurable:true})}
   const recipeIds=new Set(recipes.map(r=>r.id));
   for(const [key,value] of Object.entries(input.favorites)){if(!recipeIds.has(key)||typeof value!=='boolean')throw Error('收藏数据无效。');Object.defineProperty(favorites,key,{value,enumerable:true,writable:true,configurable:true})}
   return {schemaVersion:1,recipes,ingredients,pantry,favorites};
 }
 function match(recipe,data){
   const required=[...new Map(recipe.ingredients.filter(i=>!i.optional).map(i=>[i.id,i])).values()];
   const ids=new Set(required.map(i=>i.id));
   const missing=required.filter(i=>!data.pantry[i.id]);
   const optional=[...new Map(recipe.ingredients.filter(i=>i.optional&&!ids.has(i.id)&&!data.pantry[i.id]).map(i=>[i.id,i])).values()];
   return{ready:missing.length===0,missing,optional,total:required.length};
 }
 function query(data,filters={}){
   const terms=norm(filters.q).split(/\s+/).filter(Boolean), dict=new Map(data.ingredients.map(i=>[i.id,i]));
   return data.recipes.filter(r=>{
     const hay=norm([r.name,r.en,r.base,r.method,r.notes,...r.tags,...r.ingredients.flatMap(x=>{const i=dict.get(x.id);return [i?.name,...(i?.aliases||[])]})].join(' '));
     const m=match(r,data);
     return terms.every(t=>hay.includes(t))&&(!filters.bases?.length||filters.bases.includes(r.base))&&(!filters.tags?.length||filters.tags.some(t=>r.tags.includes(t)))&&(!filters.method||filters.method===r.method)&&(!filters.favorite||data.favorites[r.id])&&(!filters.availability||filters.availability==='all'||(filters.availability==='ready'&&m.ready)||(filters.availability==='one'&&m.missing.length===1));
   });
 }
 // A conflict is never resolved by timestamp. Caller must request an explicit choice.
 function merge(base,local,remote){
   const out=empty(),conflicts=[];
   function mergeValue(key,b,l,r){
     if(same(l,r))return clone(l);
     if(same(l,b))return clone(r);
     if(same(r,b))return clone(l);
     conflicts.push(key);return clone(l);
   }
   for(const section of ['ingredients','recipes']){
     const bm=new Map(base[section].map(v=>[v.id,v])),lm=new Map(local[section].map(v=>[v.id,v])),rm=new Map(remote[section].map(v=>[v.id,v]));
     for(const id of new Set([...lm.keys(),...rm.keys(),...bm.keys()])){const value=mergeValue(section+':'+id,bm.get(id),lm.get(id),rm.get(id));if(value!==undefined)out[section].push(value)}
   }
   for(const section of ['pantry','favorites']){
     for(const id of new Set([...Object.keys(base[section]),...Object.keys(local[section]),...Object.keys(remote[section])])){
       const value=mergeValue(section+':'+id,base[section][id],local[section][id],remote[section][id]);
       if(value!==undefined)Object.defineProperty(out[section],id,{value,enumerable:true,writable:true,configurable:true});
     }
   }
   const recipeIds=new Set(out.recipes.map(r=>r.id));for(const id of Object.keys(out.favorites))if(!recipeIds.has(id))delete out.favorites[id];
   const ingredientIds=new Set(out.ingredients.map(i=>i.id));
   for(const r of out.recipes)for(const i of r.ingredients)if(!ingredientIds.has(i.id))conflicts.push('missing-ingredient:'+i.id);
   for(const id of Object.keys(out.pantry))if(!ingredientIds.has(id))delete out.pantry[id];
   return{data:out,conflicts:[...new Set(conflicts)]};
 }
 root.MixCore={clone,same,norm,now,uid,empty,validate,match,query,merge};
 if(typeof module!=='undefined')module.exports=root.MixCore;
})(typeof window!=='undefined'?window:globalThis);
