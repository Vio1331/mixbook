const test = require('node:test'), assert = require('node:assert/strict'), fs = require('fs'), vm = require('vm'), crypto = require('crypto');
const C = require('../core.js'), restoration = require('../catalog-recovery.js');
const ctx = {window:{}};
vm.runInNewContext(fs.readFileSync(require.resolve('../catalog.js'),'utf8'),ctx);
const catalog = JSON.parse(JSON.stringify(ctx.window.MIX_CATALOG));
const installed = () => C.validate(catalog);

test('完整恢复手动维护的 14 个目录与 231 条定义，证据来自 3e077cd', () => {
  const snapshot = {menus:catalog.menus,ingredients:catalog.ingredients.slice(0,231)};
  assert.equal(crypto.createHash('sha256').update(JSON.stringify(snapshot)).digest('hex'), '0335f136c7b07cd3a286dedca08dfaefb4c606e508ec92379d0be7410d4f8303');
});

test('只撤销已知错误版本的原样记录，保留后续所有用户数据并且只执行一次', () => {
  const d=installed();
  for(const change of restoration.changes) Object.assign(d.ingredients.find(i=>i.id===change.id),C.clone(change.from.at(-1)));
  const manual=d.ingredients.find(i=>i.id==='blanco-tequila');manual.name='我后来确定的名称';
  const flagged=d.ingredients.find(i=>i.id==='soju');flagged.customized=true;
  d.pantryItems=[{id:'new-bottle',name:'后来新增的酒',brand:'自己的品牌',matches:['blanco-tequila'],tags:[],notes:'保留',image:'',identityMode:'explicit',category:'龙舌兰'}];
  d.recipes[0].notes='后来写的笔记';d.recipes[0].ingredients[0].amount='37';d.favorites[d.recipes[0].id]=true;
  const before=C.clone(d),result=C.installCatalog(d,{...catalog,restoration});
  for(const change of restoration.changes) assert.deepEqual(result.ingredients.find(i=>i.id===change.id),['blanco-tequila','soju'].includes(change.id)?before.ingredients.find(i=>i.id===change.id):change.to);
  for(const section of ['pantryItems','recipes','favorites','options']) assert.deepEqual(result[section],before[section]);
  assert.deepEqual(d,before);assert.deepEqual(C.installCatalog(result,{...catalog,restoration}),result);
  // A later manual edit must not be interpreted as another rollback request.
  Object.assign(result.ingredients.find(i=>i.id==='baijiu'),restoration.changes.find(c=>c.id==='baijiu').from[0]);
  assert.deepEqual(C.installCatalog(result,{...catalog,restoration}),result);
});

test('更新、导入与同步使用的安装函数不得覆盖未标记编辑的已有内容', () => {
  const d=installed();d.catalogRecoveryVersion=restoration.version;
  d.ingredients.find(i=>i.id==='blanco-tequila').name='用户确认的名称';
  d.ingredients.find(i=>i.id==='baijiu').parentId='other-alcohol';
  d.recipes[0].name='用户维护的配方';d.recipes[0].ingredients[0].amount='41';
  const extra={...catalog.ingredients.find(i=>i.id==='neutral-vodka'),id:'unrequested-new-type'};
  const next={...catalog,ingredients:[...catalog.ingredients,extra],ingredientRemovals:{'blanco-tequila':'agave'}};
  const result=C.installCatalog(d,next);
  assert.deepEqual(result,d);
});

test('自建分类即使同名，也不能被自动归并删除', () => {
  const d=installed(),sameName={...d.ingredients.find(i=>i.id==='blanco-tequila'),id:'my-confirmed-type',customized:true};
  d.ingredients.push(sameName);d.catalogRecoveryVersion=restoration.version;
  assert.deepEqual(C.installCatalog(d,catalog),d);
});

test('用户后来移动上级分类时，恢复不得制造循环或破坏已有关系', () => {
  const d=installed(),change=restoration.changes.find(c=>c.id==='baijiu');
  Object.assign(d.ingredients.find(i=>i.id==='baijiu'),change.from.at(-1));
  d.ingredients.find(i=>i.id==='vodka').parentId='baijiu';
  const result=C.installCatalog(d,{...catalog,restoration});
  assert.equal(result.ingredients.find(i=>i.id==='vodka').parentId,'baijiu');
  assert.equal(result.ingredients.find(i=>i.id==='baijiu').parentId,'other-alcohol');
  assert.doesNotThrow(()=>C.validate(result));
});

test('目录恢复不破坏特基拉和苏格兰酒谱匹配，也不改目录字段', () => {
  const d=installed(),original=C.clone(d.ingredients);
  assert.equal(C.satisfies('blanco-tequila','tequila',d),true);
  assert.equal(C.satisfies('joven-mezcal','tequila',d),false);
  assert.equal(C.satisfies('islay','scotch',d),true);
  assert.deepEqual(d.ingredients,original);
});
