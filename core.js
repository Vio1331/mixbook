/* v4: recipe materials and standalone pantry records with explicit matching rules. */
(function(root){'use strict';
const clone=v=>v===undefined?undefined:JSON.parse(JSON.stringify(v)),same=(a,b)=>JSON.stringify(a)===JSON.stringify(b),norm=s=>String(s||'').normalize('NFKC').trim().toLowerCase(),now=()=>new Date().toISOString(),uid=()=>root.crypto?.randomUUID?.()||'id-'+Date.now().toString(36)+'-'+Math.random().toString(36).slice(2);
const empty=()=>({schemaVersion:4,recipes:[],ingredients:[],pantryItems:[],favorites:{},options:{glasses:[],tags:[],sources:[]},catalogVersion:''});
function fail(s){throw Error(s)}
function text(s,n=2000){return typeof s==='string'&&s.length<=n?s:fail('文本字段无效或过长。')}
function list(a,n=100){return Array.isArray(a)&&a.length<=10000&&a.every(x=>typeof x==='string'&&x.length<=n)?[...new Set(a)]:fail('选项列表无效。')}
function safeId(s){return typeof s==='string'&&/^[a-zA-Z0-9_-]{1,200}$/.test(s)&&!['__proto__','constructor','prototype'].includes(s)}
function image(s){return !s?'':safeId(s)?s:fail('图片标识无效。')}
function unique(a,label){if(!Array.isArray(a)||a.length>10000)fail(label+'结构无效。');const ids=new Set();for(const v of a){if(!v||!safeId(v.id)||ids.has(v.id))fail(label+'编号无效或重复。');ids.add(v.id)}return ids}
function validate(input){
 if(!input||![1,2,3,4].includes(input.schemaVersion))fail('数据版本不兼容，请更新网页。');const v1=input.schemaVersion===1,ids=unique(input.ingredients,'材料'),rids=unique(input.recipes,'酒谱');
 const ingredients=input.ingredients.map(i=>({id:i.id,name:text(i.name,100)||fail('材料需要名称。'),category:text(i.category,50),aliases:list(i.aliases,100),kind:i.kind==='product'?'product':'type',parentId:text(i.parentId||'',200),brand:text(i.brand||'',100),image:image(i.image),tags:list(i.tags||[],200),matchParent:i.matchParent===undefined?true:typeof i.matchParent==='boolean'?i.matchParent:fail('材料匹配边界无效。'),customized:i.customized===true}));
 const dict=new Map(ingredients.map(i=>[i.id,i]));
 function treeCheck(a){const d=new Map(a.map(x=>[x.id,x]));for(const i of a){let p=i;const seen=new Set([i.id]);while(p.parentId){if(!d.has(p.parentId)||seen.has(p.parentId))fail('关联关系无效或形成循环。');seen.add(p.parentId);p=d.get(p.parentId)}}}
 treeCheck(ingredients);
 for(const i of ingredients)if(i.parentId&&dict.get(i.parentId).kind!=='type')fail('上级必须是材料类别，不能是具体产品。');
 for(const i of ingredients){if(input.schemaVersion<3)i.tags=i.tags.filter(id=>dict.get(id)?.kind==='type'&&id!==i.id);else if(i.tags.some(id=>!dict.has(id)||dict.get(id).kind!=='type'||id===i.id))fail('材料标签引用无效。')}
 function rows(a,required=false){if(!Array.isArray(a)||a.length>60||(required&&!a.length))fail('请填写调酒材料。');return a.map(x=>{if(!x||!ids.has(x.id)||typeof x.optional!=='boolean')fail('配方材料引用无效。');const alternatives=x.alternatives||[];if(!Array.isArray(alternatives)||alternatives.length>60||alternatives.some(id=>!ids.has(id)))fail('替代材料无效。');const alts=[...new Set(alternatives)].filter(id=>id!==x.id);return{id:x.id,amount:text(x.amount,40),unit:text(x.unit,30),optional:x.optional,...(alts.length?{alternatives:alts}:{})}})}
 function steps(a){if(!Array.isArray(a)||!a.length||a.length>100||a.some(x=>typeof x!=='string'||x.length>3000))fail('请填写调制步骤。');return a}
 const recipes=input.recipes.map(r=>{const versions=r.versions||[];unique(versions,'比例版本');return{id:r.id,name:text(r.name,100)||fail('酒谱需要名称。'),en:text(r.en,100),base:text(r.base,60),method:text(r.method,60),glass:text(r.glass,100),tags:list(r.tags,60),notes:text(r.notes,10000),source:text(r.source,2000),sourceName:text(r.sourceName??(r.ibaCategory?'IBA · '+r.ibaCategory:''),200),steps:steps(r.steps),ingredients:rows(v1?r.ingredients.filter(x=>dict.get(x.id)?.category!=='装饰'):r.ingredients,true),garnishes:rows(v1?r.ingredients.filter(x=>dict.get(x.id)?.category==='装饰'):(r.garnishes||[])),versions:versions.map(v=>({id:v.id,name:text(v.name,100),author:text(v.author||'',100),notes:text(v.notes||'',10000),ingredients:rows(v.ingredients,true),garnishes:rows(v.garnishes||[]),steps:steps(v.steps)})),parentId:text(r.parentId||'',200),catalog:r.catalog===true,customized:r.customized===true,sample:r.sample===true,image:image(r.image),createdAt:typeof r.createdAt==='string'?text(r.createdAt,50):now(),updatedAt:typeof r.updatedAt==='string'?text(r.updatedAt,50):now()}});treeCheck(recipes);
 function flags(m,ids){if(!m||typeof m!=='object'||Array.isArray(m))fail('酒柜或收藏数据无效。');const out={};for(const[k,v]of Object.entries(m)){if(!ids.has(k)||typeof v!=='boolean')fail('酒柜或收藏引用无效。');out[k]=v}return out}
 const rawPantry=input.schemaVersion<4?Object.keys(input.pantry||{}).filter(id=>input.pantry[id]&&dict.has(id)).map(id=>{const i=dict.get(id);return{id:'pantry-'+id,name:i.name,brand:i.brand,category:i.category,image:i.image,matches:[i.id],tags:i.tags}}):(input.pantryItems||[]);
 unique(rawPantry,'酒柜记录');const pantryItems=rawPantry.map(i=>({id:i.id,name:text(i.name,100)||fail('酒柜记录需要名称。'),brand:text(i.brand||'',100),category:text(i.category||'',50),image:image(i.image),matches:list(i.matches||[],200),tags:list(i.tags||[],200)}));
 for(const i of pantryItems)if(!i.matches.length||i.matches.some(id=>!ids.has(id))||i.tags.some(id=>!ids.has(id)))fail('酒柜记录的分类无效。');
 const options={};for(const k of ['glasses','tags','sources'])options[k]=list(input.options?.[k]||[],k==='sources'?200:100);
 return{schemaVersion:4,recipes,ingredients,pantryItems,favorites:flags(input.favorites,rids),options,catalogVersion:text(input.catalogVersion||'',100)};
}
function ingredientPath(id,data){const d=new Map(data.ingredients.map(i=>[i.id,i])),out=[],seen=new Set();let i=d.get(id);while(i&&!seen.has(i.id)){out.unshift(i);seen.add(i.id);i=d.get(i.parentId)}return out}
function needsProduct(i,data){return i.kind==='type'&&ingredientPath(i.id,data).some(x=>x.id==='alcohol'||x.id==='bitters')}
function materialText(i,data){const d=new Map(data.ingredients.map(x=>[x.id,x]));return norm([...ingredientPath(i.id,data),...(i.tags||[]).map(id=>d.get(id)).filter(Boolean)].flatMap(x=>[x.name,x.brand,...x.aliases]).join(' '))}
function satisfies(owned,required,data){const d=new Map(data.ingredients.map(i=>[i.id,i])),o=d.get(owned),r=d.get(required);if(!o||!r)return false;
 // Match the selected material itself before considering labels or its category tree.
 if(o.id===r.id||[r.name,...r.aliases].map(norm).includes(norm(o.name)))return 0;
 // A classification may describe an intersection (for example Cuban + white rum).
 // Every tag must be present on the same owned bottle; two separate bottles cannot combine.
 if(r.tags?.length&&r.kind==='type')return(!r.parentId||satisfies(owned,r.parentId,data))&&r.tags.every(tag=>satisfies(owned,tag,data));
 if(o.tags?.includes(required))return true;
 let p=o,seen=new Set();while(p&&!seen.has(p.id)){if(p.id===required)return true;seen.add(p.id);if(p.matchParent===false)break;p=d.get(p.parentId)}return false}
function categorySatisfies(owned,required,data){const d=new Map(data.ingredients.map(i=>[i.id,i]));let p=d.get(owned),seen=new Set();while(p&&!seen.has(p.id)){if(p.id===required)return true;seen.add(p.id);if(p.matchParent===false)break;p=d.get(p.parentId)}return false}
function pantryMatchLevel(item,required,data){const r=data.ingredients.find(i=>i.id===required);if(!r)return Infinity;
 if([r.name,...r.aliases].map(norm).includes(norm(item.name))||(item.matches||[]).includes(required))return 0;
 if(r.tags?.length&&r.kind==='type'){const levels=[...(r.parentId?[pantryMatchLevel(item,r.parentId,data)]:[]),...r.tags.map(tag=>pantryMatchLevel(item,tag,data))];return levels.every(Number.isFinite)?Math.max(1,...levels):Infinity}
 if((item.tags||[]).includes(required)||(item.matches||[]).some(id=>data.ingredients.find(i=>i.id===id)?.tags?.includes(required)))return 1;
 return(item.matches||[]).some(id=>categorySatisfies(id,required,data))?2:Infinity}
function matches(row,data){const required=[row.id,...(row.alternatives||[])],ranked=data.pantryItems.map(item=>({item,level:Math.min(...required.map(id=>pantryMatchLevel(item,id,data)))})).filter(x=>Number.isFinite(x.level));if(!ranked.length)return[];const best=Math.min(...ranked.map(x=>x.level));return ranked.filter(x=>x.level===best).map(x=>x.item)}
function have(row,data){return matches(row,data).length>0}
function match(r,data){const req=[...new Map(r.ingredients.filter(i=>!i.optional).map(i=>[i.id+JSON.stringify(i.alternatives||[]),i])).values()];return{ready:req.every(i=>have(i,data)),missing:req.filter(i=>!have(i,data)),substitutions:req.filter(i=>have(i,data)&&!have({...i,alternatives:[]},data)),optional:r.ingredients.filter(i=>i.optional&&!have(i,data)),garnishes:(r.garnishes||[]).filter(i=>!have(i,data)),total:req.length}}
function query(data,f={}){const terms=norm(f.q).split(/\s+/).filter(Boolean),dict=new Map(data.ingredients.map(i=>[i.id,materialText(i,data)]));return data.recipes.filter(r=>{const hay=norm([r.name,r.en,r.base,r.method,r.notes,...r.tags,r.sourceName,r.source,...[...r.ingredients,...r.garnishes].flatMap(x=>[x.id,...(x.alternatives||[])].map(id=>dict.get(id)))].join(' ')),m=match(r,data);return terms.every(t=>hay.includes(t))&&(!f.tags?.length||f.tags.some(t=>r.tags.includes(t)))&&(!f.base||r.base===f.base)&&(!f.sourceName||r.sourceName===f.sourceName)&&(!f.favorite||data.favorites[r.id])&&(!f.availability||f.availability==='all'||f.availability==='ready'&&m.ready||f.availability==='one'&&m.missing.length===1)})}
function merge(base,local,remote){[base,local,remote]=[base,local,remote].map(validate);const out=empty(),conflicts=[];function val(k,b,l,r){if(same(l,r))return clone(l);if(same(l,b))return clone(r);if(same(r,b))return clone(l);conflicts.push(k);return clone(l)}
 for(const section of ['ingredients','recipes','pantryItems']){const ms=[base,local,remote].map(d=>new Map(d[section].map(v=>[v.id,v])));for(const id of new Set(ms.flatMap(m=>[...m.keys()]))){const v=val(section+':'+id,...ms.map(m=>m.get(id)));if(v!==undefined)out[section].push(v)}}
 for(const section of ['favorites'])for(const id of new Set([base,local,remote].flatMap(d=>Object.keys(d[section])))){const v=val(section+':'+id,base[section][id],local[section][id],remote[section][id]);if(v!==undefined)out[section][id]=v}
 for(const k of Object.keys(out.options))out.options[k]=[...new Set([...local.options[k],...remote.options[k]])];out.catalogVersion=local.catalogVersion||remote.catalogVersion;
 const ids=new Set(out.ingredients.map(i=>i.id)),rids=new Set(out.recipes.map(r=>r.id));out.pantryItems=out.pantryItems.filter(i=>i.matches.every(id=>ids.has(id))&&i.tags.every(id=>ids.has(id)));for(const id of Object.keys(out.favorites))if(!rids.has(id))delete out.favorites[id];for(const r of out.recipes){if(r.parentId&&!rids.has(r.parentId))r.parentId='';for(const x of [...r.ingredients,...r.garnishes,...r.versions.flatMap(v=>[...v.ingredients,...v.garnishes])])if(!ids.has(x.id))conflicts.push('missing-ingredient:'+x.id)}return{data:out,conflicts:[...new Set(conflicts)]};
}
function installCatalog(input,catalog){
 const d=validate(input),c=validate(catalog);if(d.catalogVersion===c.catalogVersion)return d;
 const installed=!!d.catalogVersion;
 for(const [removed,replacement]of Object.entries(catalog.ingredientRemovals||{})){
  for(const r of d.recipes)for(const x of [...r.ingredients,...r.garnishes,...r.versions.flatMap(v=>[...v.ingredients,...v.garnishes])]){if(x.id===removed)x.id=replacement;x.alternatives=(x.alternatives||[]).map(id=>id===removed?replacement:id).filter((id,n,a)=>id!==x.id&&a.indexOf(id)===n)}
  for(const i of d.pantryItems){i.matches=i.matches.map(id=>id===removed?replacement:id).filter((id,n,a)=>a.indexOf(id)===n);i.tags=i.tags.map(id=>id===removed?replacement:id).filter((id,n,a)=>a.indexOf(id)===n)}
  d.ingredients=d.ingredients.filter(i=>i.id!==removed);
 }
 for(const i of c.ingredients){const old=d.ingredients.find(x=>x.id===i.id);if(!old)d.ingredients.push(clone(i));else if(!old.customized){const migration=catalog.ingredientMigrations?.[i.id];if(migration)for(const [key,value]of Object.entries(migration))if(['name','parentId','category','kind','brand','matchParent'].includes(key)&&old[key]===value)old[key]=i[key];if(c.catalogVersion.includes('pantry-taxonomy'))for(const key of ['name','parentId','category','kind','matchParent'])old[key]=i[key];if(old.category==='利口酒与味美思'&&i.category==='利口酒')old.category=i.category;if(!old.parentId&&!old.image&&input.schemaVersion===1)Object.assign(old,{parentId:i.parentId,kind:i.kind,brand:i.brand,image:i.image});old.aliases=[...new Set([...old.aliases,...i.aliases])];old.tags=clone(i.tags)}}
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
root.MixCore={clone,same,norm,now,uid,empty,validate,match,query,merge,satisfies,have,matches,installCatalog,ingredientPath,needsProduct,materialText};if(typeof module!=='undefined')module.exports=root.MixCore;
})(typeof window!=='undefined'?window:globalThis);
