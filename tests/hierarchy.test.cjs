const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),vm=require('node:vm');
const root=path.join(__dirname,'..');
function fresh(){const context={window:{}};context.globalThis=context.window;vm.createContext(context);for(const name of ['cocktail-system.js','hierarchy.js'])vm.runInContext(fs.readFileSync(path.join(root,name),'utf8'),context);return context.window}
test('单一体系文件同时提供完整原料、配方标签和全站菜单层级',()=>{const w=fresh(),menus=w.MixHierarchy.get();assert.equal(menus[0][0],'whiskey');assert.ok(w.MIX_TAXONOMY.ingredients.length>250);assert.ok(w.MIX_TAXONOMY.recipe.tags.includes('酸甜'));assert.ok(w.MIX_TAXONOMY.recipe.glasses.includes('古典杯'));assert.ok(w.MIX_TAXONOMY.recipe.sources.includes('IBA · 当代经典'))});
test('菜单读取为副本且拒绝无效结构',()=>{const w=fresh(),menus=w.MixHierarchy.get();menus[0][0]='changed';assert.equal(w.MixHierarchy.get()[0][0],'whiskey');assert.equal(w.MixHierarchy.valid({root:'gin'}),false)});
