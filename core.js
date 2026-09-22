/* v2: typed inventory, recipe variations and conservative three-way merging. */
(function(root){'use strict';
const clone=v=>v===undefined?undefined:JSON.parse(JSON.stringify(v)),same=(a,b)=>JSON.stringify(a)===JSON.stringify(b),norm=s=>String(s||'').normalize('NFKC').trim().toLowerCase(),now=()=>new Date().toISOString(),uid=()=>root.crypto?.randomUUID?.()||'id-'+Date.now().toString(36)+'-'+Math.random().toString(36).slice(2);
const empty=()=>({schemaVersion:2,recipes:[],ingredients:[],pantry:{},favorites:{},options:{glasses:[],tags:[],sources:[]},catalogVersion:''});
function fail(s){throw Error(s)}
function text(s,n=2000){return typeof s==='string'&&s.length<=n?s:fail('文本字段无效或过长。')}
function list(a,n=100){return Array.isArray(a)&&a.length<=10000&&a.every(x=>typeof x==='string'&&x.length<=n)?[...new Set(a)]:fail('选项列表无效。')}
function safeId(s){return typeof s==='string'&&/^[a-zA-Z0-9_-]{1,200}$/.test(s)&&!['__proto__','constructor','prototype'].includes(s)}
function image(s){return !s?'':safeId(s)?s:fail('图片标识无效。')}
function unique(a,label){if(!Array.isArray(a)||a.length>10000)fail(label+'结构无效。');const ids=new Set();for(const v of a){if(!v||!safeId(v.id)||ids.has(v.id))fail(label+'编号无效或重复。');ids.add(v.id)}return ids}
function validate(input){
 if(!input||![1,2].includes(input.schemaVersion))fail('数据版本不兼容，请更新网页。');const v1=input.schemaVersion===1,ids=unique(input.ingredients,'材料'),rids=unique(input.recipes,'酒谱');
 const ingredients=input.ingredients.map(i=>({id:i.id,name:text(i.name,100)||fail('材料需要名称。'),category:text(i.category,50),aliases:list(i.aliases,100),kind:i.kind==='product'?'product':'type',parentId:text(i.parentId||'',200),brand:text(i.brand||'',100),image:image(i.image)}));
 const dict=new Map(ingredients.map(i=>[i.id,i]));
 function treeCheck(a){const d=new Map(a.map(x=>[x.id,x]));for(const i of a){let p=i;const seen=new Set([i.id]);while(p.parentId){if(!d.has(p.parentId)||seen.has(p.parentId))fail('关联关系无效或形成循环。');seen.add(p.parentId);p=d.get(p.parentId)}}}
 treeCheck(ingredients);
 function rows(a,required=false){if(!Array.isArray(a)||a.length>60||(required&&!a.length))fail('请填写调酒材料。');return a.map(x=>{if(!x||!ids.has(x.id)||typeof x.optional!=='boolean')fail('配方材料引用无效。');const alternatives=x.alternatives||[];if(!Array.isArray(alternatives)||alternatives.some(id=>!ids.has(id)))fail('替代材料无效。');return{id:x.id,amount:text(x.amount,40),unit:text(x.unit,30),optional:x.optional,...(alternatives.length?{alternatives:[...new Set(alternatives)]}:{})}})}
 function steps(a){if(!Array.isArray(a)||!a.length||a.length>100||a.some(x=>typeof x!=='string'||x.length>3000))fail('请填写调制步骤。');return a}
 const recipes=input.recipes.map(r=>{const versions=r.versions||[];unique(versions,'比例版本');return{id:r.id,name:text(r.name,100)||fail('酒谱需要名称。'),en:text(r.en,100),base:text(r.base,60),method:text(r.method,60),glass:text(r.glass,100),tags:list(r.tags,60),notes:text(r.notes,10000),source:text(r.source,2000),sourceName:text(r.sourceName??(r.ibaCategory?'IBA · '+r.ibaCategory:''),200),steps:steps(r.steps),ingredients:rows(v1?r.ingredients.filter(x=>dict.get(x.id)?.category!=='装饰'):r.ingredients,true),garnishes:rows(v1?r.ingredients.filter(x=>dict.get(x.id)?.category==='装饰'):(r.garnishes||[])),versions:versions.map(v=>({id:v.id,name:text(v.name,100),author:text(v.author||'',100),notes:text(v.notes||'',10000),ingredients:rows(v.ingredients,true),garnishes:rows(v.garnishes||[]),steps:steps(v.steps)})),parentId:text(r.parentId||'',200),catalog:r.catalog===true,customized:r.customized===true,sample:r.sample===true,image:image(r.image),createdAt:typeof r.createdAt==='string'?text(r.createdAt,50):now(),updatedAt:typeof r.updatedAt==='string'?text(r.updatedAt,50):now()}});treeCheck(recipes);
 function flags(m,ids){if(!m||typeof m!=='object'||Array.isArray(m))fail('酒柜或收藏数据无效。');const out={};for(const[k,v]of Object.entries(m)){if(!ids.has(k)||typeof v!=='boolean')fail('酒柜或收藏引用无效。');out[k]=v}return out}
 const options={};for(const k of ['glasses','tags','sources'])options[k]=list(input.options?.[k]||[],k==='sources'?200:100);
 return{schemaVersion:2,recipes,ingredients,pantry:flags(input.pantry,ids),favorites:flags(input.favorites,rids),options,catalogVersion:text(input.catalogVersion||'',100)};
}
function satisfies(owned,required,data){const d=new Map(data.ingredients.map(i=>[i.id,i]));let p=d.get(owned);const seen=new Set();while(p&&!seen.has(p.id)){if(p.id===required)return true;seen.add(p.id);p=d.get(p.parentId)}return false}
function matches(row,data){return data.ingredients.filter(i=>data.pantry[i.id]&&[row.id,...(row.alternatives||[])].some(id=>satisfies(i.id,id,data)))}
function have(row,data){return matches(row,data).length>0}
function match(r,data){const req=[...new Map(r.ingredients.filter(i=>!i.optional).map(i=>[i.id+JSON.stringify(i.alternatives||[]),i])).values()];return{ready:req.every(i=>have(i,data)),missing:req.filter(i=>!have(i,data)),optional:r.ingredients.filter(i=>i.optional&&!have(i,data)),garnishes:(r.garnishes||[]).filter(i=>!have(i,data)),total:req.length}}
function query(data,f={}){const terms=norm(f.q).split(/\s+/).filter(Boolean),dict=new Map(data.ingredients.map(i=>[i.id,i]));return data.recipes.filter(r=>{const hay=norm([r.name,r.en,r.base,r.method,r.notes,...r.tags,r.sourceName,r.source,...[...r.ingredients,...r.garnishes].flatMap(x=>[x.id,...(x.alternatives||[])].flatMap(id=>{const i=dict.get(id);return[i?.name,...(i?.aliases||[])]}))].join(' ')),m=match(r,data);return terms.every(t=>hay.includes(t))&&(!f.tags?.length||f.tags.some(t=>r.tags.includes(t)))&&(!f.sourceName||r.sourceName===f.sourceName)&&(!f.favorite||data.favorites[r.id])&&(!f.availability||f.availability==='all'||f.availability==='ready'&&m.ready||f.availability==='one'&&m.missing.length===1)})}
function merge(base,local,remote){[base,local,remote]=[base,local,remote].map(validate);const out=empty(),conflicts=[];function val(k,b,l,r){if(same(l,r))return clone(l);if(same(l,b))return clone(r);if(same(r,b))return clone(l);conflicts.push(k);return clone(l)}
 for(const section of ['ingredients','recipes']){const ms=[base,local,remote].map(d=>new Map(d[section].map(v=>[v.id,v])));for(const id of new Set(ms.flatMap(m=>[...m.keys()]))){const v=val(section+':'+id,...ms.map(m=>m.get(id)));if(v!==undefined)out[section].push(v)}}
 for(const section of ['pantry','favorites'])for(const id of new Set([base,local,remote].flatMap(d=>Object.keys(d[section])))){const v=val(section+':'+id,base[section][id],local[section][id],remote[section][id]);if(v!==undefined)out[section][id]=v}
 for(const k of Object.keys(out.options))out.options[k]=[...new Set([...local.options[k],...remote.options[k]])];out.catalogVersion=local.catalogVersion||remote.catalogVersion;
 const ids=new Set(out.ingredients.map(i=>i.id)),rids=new Set(out.recipes.map(r=>r.id));for(const id of Object.keys(out.pantry))if(!ids.has(id))delete out.pantry[id];for(const id of Object.keys(out.favorites))if(!rids.has(id))delete out.favorites[id];for(const r of out.recipes){if(r.parentId&&!rids.has(r.parentId))r.parentId='';for(const x of [...r.ingredients,...r.garnishes,...r.versions.flatMap(v=>[...v.ingredients,...v.garnishes])])if(!ids.has(x.id))conflicts.push('missing-ingredient:'+x.id)}return{data:out,conflicts:[...new Set(conflicts)]};
}
function installCatalog(input,catalog){
 const d=validate(input),c=validate(catalog);if(d.catalogVersion===c.catalogVersion)return d;
 const installed=!!d.catalogVersion;
 for(const i of c.ingredients){const old=d.ingredients.find(x=>x.id===i.id);if(!old)d.ingredients.push(clone(i));else if(!old.parentId&&!old.image)Object.assign(old,{parentId:i.parentId,kind:i.kind,brand:i.brand,image:i.image})}
 for(const r of c.recipes){
  const existing=d.recipes.find(x=>x.id===r.id);
  if(existing){
   const raw=input.recipes.find(x=>x.id===r.id);
   // This catalog revision changes metadata only. Keep personal formulas, notes and versions.
   if(raw.sourceName===undefined)existing.sourceName=r.sourceName;
   if(!existing.customized){existing.base=r.base;existing.tags=[...new Set([...existing.tags,...r.tags])]}
   if(existing.catalog&&!existing.image)existing.image=r.image;
   continue;
  }
  // A catalog already installed on this device may have deliberate recipe deletions.
  if(installed)continue;
  const old=d.recipes.find(x=>x.id===r.id.replace(/^iba-/,''));
  if(old?.sample){d.recipes=d.recipes.filter(x=>x.id!==old.id);if(d.favorites[old.id])d.favorites[r.id]=true;delete d.favorites[old.id]}
  d.recipes.push(clone(r));
 }
 for(const k of Object.keys(d.options))d.options[k]=[...new Set([...d.options[k],...c.options[k]])];
 d.catalogVersion=c.catalogVersion;return validate(d);
}
root.MixCore={clone,same,norm,now,uid,empty,validate,match,query,merge,satisfies,have,matches,installCatalog};if(typeof module!=='undefined')module.exports=root.MixCore;
})(typeof window!=='undefined'?window:globalThis);
