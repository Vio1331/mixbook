const test = require("node:test"),
  assert = require("node:assert/strict"),
  fs = require("node:fs"),
  vm = require("node:vm"),
  path = require("node:path"),
  C = require("../core.js");
const ctx = { window: {} };
vm.runInNewContext(
  fs.readFileSync(path.join(__dirname, "../catalog.js"), "utf8"),
  ctx,
);
const catalog = C.clone(ctx.window.MIX_SEED),
  data = () => C.validate(C.clone(catalog)),
  row = (id) => ({
    id,
    amount: "30",
    unit: "ml",
    optional: false,
    alternatives: [],
  });
const own = (d, id, tags) => {
  const i = d.ingredients.find((x) => x.id === id);
  d.pantryItems = [
    {
      id: "owned",
      name: i.name,
      brand: i.brand || "",
      category: i.category,
      image: "",
      matches: [id],
      tags: tags || [...(i.tags || [])],
    },
  ];
};
test('材料搜索区分名称命中和继承分类，并隐藏重复导航节点', () => {
  const d = data(), original = C.clone(d);
  assert.equal(C.searchMaterials(d, 'Cointreau').direct[0].id, 'cointreau');
  const brandy = C.searchMaterials(d, '白兰地');
  assert.equal(brandy.direct.filter((x) => x.name === '白兰地').length, 1);
  assert.equal(brandy.direct[0].id, 'brandy');
  assert.ok(!C.searchMaterials(d).direct.some((x) => ['liquid-materials', 'brandy-root', 'juice'].includes(x.id)));
  assert.ok(C.searchMaterials(d, '柠檬').direct.some((x) => x.id === 'lemon'));
  assert.ok(C.searchMaterials(d, '柠檬').direct.some((x) => x.id === 'lemon-fruit'));
  assert.deepEqual(d, original);
  d.ingredients.push({...C.clone(d.ingredients.find((x) => x.id === 'campari')),
    id:'custom-gin', name:'孟买蓝宝石', brand:'孟买', aliases:['Bombay Sapphire'], parentId:'london-dry', tags:[]});
  const gin = C.searchMaterials(d, '金酒');
  assert.equal(gin.direct[0].id, 'gin');
  assert.ok(gin.related.some((x) => x.id === 'custom-gin'));
  assert.ok(!gin.direct.some((x) => x.id === 'custom-gin'));
  assert.equal(C.searchMaterials(d, 'Bombay Sapphire').direct[0].id, 'custom-gin');
  assert.ok(C.searchMaterials(d, '', 'gin').direct.some((x) => x.id === 'custom-gin'));
});
test("目录定义完整且每个产品均属于通用类别", () => {
  const d = data(),
    by = new Map(d.ingredients.map((i) => [i.id, i]));
  assert.equal(new Set(by.keys()).size, d.ingredients.length);
  assert.ok(d.ingredients.some((i) => i.builtInTag));
  for (const i of d.ingredients) {
    if (i.parentId) assert.equal(by.get(i.parentId).kind, "type", i.id);
    if (i.kind === "product") assert.ok(i.parentId, i.id);
  }
});
test("一级和二级目录逐层匹配具体原料", () => {
  const d = data();
  assert.deepEqual(
    C.ingredientPath("lagavulin-16", d).map((i) => i.id),
    ["whiskey", "scotch", "islay", "lagavulin-16"],
  );
  assert.ok(C.satisfies("lagavulin-16", "islay", d));
  assert.ok(C.satisfies("lagavulin-16", "whiskey", d));
  assert.equal(C.satisfies("islay", "lagavulin-16", d), false);
});
test("一级标签适用于其全部二级菜单", () => {
  const d = data();
  own(d, "jamaican-gold");
  assert.ok(C.have(row("jamaican-rum"), d));
  assert.ok(C.have(row("gold-rum"), d));
  assert.ok(C.have(row("rum"), d));
  assert.equal(C.have(row("cuban-rum"), d), false);
});
test("二级标签只匹配该二级菜单下带标签的材料", () => {
  const d = data();
  own(d, "cointreau");
  assert.ok(C.have(row("orange-liqueur"), d));
  assert.ok(C.have(row("liqueur"), d));
  assert.equal(C.have(row("coffee-liqueur"), d), false);
  own(d, "cognac");
  assert.ok(C.have(row("cognac"), d));
  assert.ok(C.have(row("brandy"), d));
  assert.equal(C.have(row("pisco"), d), false);
});
test("具体名称保持精确，不能由同类别的另一个名称代替", () => {
  const d = data();
  own(d, "cointreau");
  assert.ok(C.have(row("cointreau"), d));
  assert.ok(C.have(row("orange-liqueur"), d));
  assert.equal(C.have(row("grand-marnier"), d), false);
});
test("用户材料可挂在二级菜单并使用内置或自定义标签", () => {
  const d = data();
  d.ingredients.push({
    id: "my-tag",
    name: "自定义标签",
    kind: "type",
    parentId: "light-rum",
    category: "白朗姆",
    brand: "",
    aliases: [],
    tags: [],
    image: "",
    customized: true,
  });
  d.pantryItems = [
    {
      id: "my-bottle",
      name: "我的朗姆",
      brand: "",
      category: "白朗姆",
      image: "",
      matches: ["light-rum"],
      tags: ["cuban-rum", "my-tag"],
    },
  ];
  const v = C.validate(d);
  assert.ok(C.have(row("rum"), v));
  assert.ok(C.have(row("light-rum"), v));
  assert.ok(C.have(row("cuban-rum"), v));
  assert.ok(C.have(row("my-tag"), v));
});
test("所有 IBA 正文材料和装饰都符合统一目录", () => {
  const d = data(),
    roots = new Set(
      d.ingredients.filter((i) => i.builtIn && !i.parentId).map((i) => i.id),
    ),
    pages = new Set(
      d.ingredients
        .filter((i) => i.builtIn && !i.builtInTag && i.parentId)
        .map((i) => i.id),
    ),
    tags = new Set(d.ingredients.filter((i) => i.builtInTag).map((i) => i.id));
  for (const recipe of d.recipes)
    for (const ref of [...recipe.ingredients, ...recipe.garnishes]) {
      const i = d.ingredients.find((x) => x.id === ref.id);
      assert.ok(i, `${recipe.id}: ${ref.id}`);
      assert.ok(
        roots.has(i.id) ||
          pages.has(i.id) ||
          tags.has(i.id) ||
          i.kind === "product",
        `${recipe.id}: ${ref.id}`,
      );
    }
});
test("具体材料搜索包含二级菜单、标签、品牌和别名", () => {
  const d = data(),
    i = d.ingredients.find((i) => i.id === "cointreau"),
    text = C.materialText(i, d);
  assert.match(text, /利口酒/);
  assert.match(text, /橙味利口酒/);
  assert.match(text, /cointreau/);
});
test("目录引用、标签引用和循环仍被严格校验", () => {
  let d = data();
  d.ingredients.find((i) => i.id === "lagavulin-16").parentId = "missing";
  assert.throws(() => C.validate(d), /关联|上级/);
  d = data();
  d.ingredients.find((i) => i.id === "lagavulin-16").tags = ["missing"];
  assert.throws(() => C.validate(d), /标签/);
  d = data();
  d.ingredients.find((i) => i.id === "whiskey").parentId = "islay";
  assert.throws(() => C.validate(d), /循环/);
});

test('原料、品牌产品与导航分组按用途区分，鲜果不等于果汁', () => {
  const d = data(), get = id => d.ingredients.find(i => i.id === id);
  assert.equal(C.materialRole(get('lemon')), 'ingredient');
  assert.equal(C.materialRole(get('cointreau')), 'product');
  assert.equal(C.materialRole(get('juice')), 'group');
  assert.equal(C.satisfies('lemon-fruit', 'lemon', d), false);
  assert.equal(C.satisfies('lemon', 'lemon-fruit', d), false);
});
test('品牌果汁可归属于通用果汁，反向和同品牌不同产品不自动替代', () => {
  let d = data();
  const base = {...C.clone(d.ingredients.find(i => i.id === 'lemon')), kind:'product', brand:'测试品牌', customized:true};
  d.ingredients.push({...base, id:'bottled-lemon', name:'瓶装柠檬汁', parentId:'lemon'});
  d.ingredients.push({...base, id:'another-lemon', name:'另一款柠檬汁', parentId:'lemon'});
  d = C.validate(d);
  own(d, 'bottled-lemon');
  assert.ok(C.have(row('lemon'), d));
  assert.equal(C.have(row('another-lemon'), d), false);
  own(d, 'lemon');
  assert.equal(C.have(row('bottled-lemon'), d), false);
  d.ingredients.find(i => i.id === 'another-lemon').parentId = 'bottled-lemon';
  assert.throws(() => C.validate(d), /产品|上级/);
});
test('旧名称识别只迁移一次，备注名与笔记不会改变匹配身份', () => {
  let d = data();
  own(d, 'orange-liqueur');
  d.pantryItems[0].name = 'Cointreau';
  d = C.validate(d);
  assert.deepEqual(d.pantryItems[0].matches, ['cointreau']);
  assert.equal(d.pantryItems[0].identityMode, 'explicit');
  assert.deepEqual(C.validate(d), d);
  d.pantryItems[0].name = 'Grand Marnier';
  d.pantryItems[0].notes = '2026-10 开封，橙香';
  d = C.validate(d);
  assert.ok(C.have(row('cointreau'), d));
  assert.equal(C.have(row('grand-marnier'), d), false);
  assert.equal(d.pantryItems[0].notes, '2026-10 开封，橙香');
  own(d, 'liqueur');
  d.pantryItems[0].identityMode = 'explicit';
  d.pantryItems[0].name = 'Cointreau';
  d = C.validate(d);
  assert.deepEqual(d.pantryItems[0].matches, ['liqueur']);
  assert.equal(C.have(row('cointreau'), d), false);
});
test('旧通用原料的名称识别迁移保留其他明确匹配', () => {
  let d = data();
  own(d, 'juice');
  d.pantryItems[0].name = '柠檬汁';
  d.pantryItems[0].matches.push('simple-syrup');
  d = C.validate(d);
  assert.deepEqual(d.pantryItems[0].matches, ['lemon','simple-syrup']);
  assert.ok(C.have(row('lemon'), d));
  assert.ok(C.have(row('simple-syrup'), d));
  assert.equal(C.have(row('lemon-fruit'), d), false);
  assert.deepEqual(C.validate(d), d);
});

test('分类浏览顺序不随拥有状态、最近选择或配方使用次数变化', () => {
  const d=data(), ids = () => C.searchMaterials(d, '', 'gin', ['london-dry']).direct.map(i=>i.id);
  const before=ids();own(d,'gin');d.recipes.reverse();
  assert.deepEqual(ids(),before);
  assert.equal(C.searchMaterials(d,'Cointreau').direct[0].id,'cointreau');
});

test('重复原料统一库存、配方、版本、替代项及产品引用，保留个人内容', () => {
  const d=data(), lime=d.ingredients.find(i=>i.id==='lime');
  d.ingredients.push({...C.clone(lime),id:'legacy-lime',kind:'type',customized:true,aliases:['家用青柠汁']});
  d.ingredients.push({...C.clone(lime),id:'bottled-lime',name:'瓶装青柠汁',brand:'测试品牌',parentId:'legacy-lime',tags:['legacy-lime']});
  own(d,'legacy-lime');Object.assign(d.pantryItems[0],{identityMode:'explicit',notes:'保留备注',tags:['legacy-lime']});
  const recipe={...C.clone(d.recipes[0]),id:'personal',customized:true,notes:'个人笔记',ingredients:[row('legacy-lime')],garnishes:[row('legacy-lime')],versions:[{id:'version',name:'我的比例',notes:'版本笔记',ingredients:[{...row('lemon'),alternatives:['legacy-lime','lime']}],garnishes:[row('legacy-lime')],steps:['混合']}]};
  d.recipes.push(recipe);
  assert.equal(C.have(row('lime'),C.validate(d)),false);
  const fixed=C.installCatalog(d,catalog);
  assert.ok(C.have(row('lime'),fixed));
  assert.equal(C.searchMaterials(fixed,'青柠汁').direct.filter(i=>i.name==='青柠汁').length,1);
  assert.ok(!fixed.ingredients.some(i=>i.id==='legacy-lime'));
  assert.deepEqual(fixed.pantryItems[0].matches,['lime']);
  assert.deepEqual(fixed.pantryItems[0].tags,['lime']);
  assert.equal(fixed.pantryItems[0].notes,'保留备注');
  const r=fixed.recipes.find(r=>r.id==='personal');
  assert.equal(r.ingredients[0].id,'lime');assert.equal(r.garnishes[0].id,'lime');
  assert.equal(r.notes,'个人笔记');assert.equal(r.versions[0].notes,'版本笔记');
  assert.deepEqual(r.versions[0].ingredients[0].alternatives,['lime']);
  assert.equal(r.versions[0].garnishes[0].id,'lime');
  assert.equal(fixed.ingredients.find(i=>i.id==='bottled-lime').parentId,'lime');
  assert.ok(fixed.ingredients.find(i=>i.id==='lime').aliases.includes('家用青柠汁'));
  assert.deepEqual(C.installCatalog(fixed,catalog),fixed);
  assert.deepEqual(C.reconcileMaterials(C.merge(C.empty(),fixed,d).data,catalog),fixed);
});

test('同物异名可修复，品牌、果汁与果泥、类型边界和特征不能误合并', () => {
  const d=data();
  for(const [id,target,name] of [['old-fruit','lime-fruit','青柠'],['old-lemon','lemon-fruit','柠檬'],['old-grapefruit','grapefruit-juice','西柚汁'],['old-orange','orange-juice','橙汁']])
    d.ingredients.push({...C.clone(d.ingredients.find(i=>i.id===target)),id,name,customized:true});
  const lime=d.ingredients.find(i=>i.id==='lime');
  for(const [id,changes] of [['brand',{brand:'品牌 A'}],['boundary',{matchParent:false}],['other-parent',{parentId:'syrup'}],['qualified',{tags:['rum']}],['other-image',{image:'local-image'}]]) {
    d.ingredients.push({...C.clone(lime),id,customized:true,...changes});
  }
  d.ingredients.find(i=>i.id==='lime').image='original-image';
  d.ingredients.find(i=>i.id==='lime').customized=true;
  const fixed=C.installCatalog(d,catalog);
  for(const id of ['old-fruit','old-lemon','old-grapefruit','old-orange'])assert.ok(!fixed.ingredients.some(i=>i.id===id));
  for(const id of ['brand','boundary','other-parent','qualified','other-image','lime','lime-fruit','passion-puree','passion-fruit'])assert.ok(fixed.ingredients.some(i=>i.id===id));
  assert.equal(C.satisfies('lime-fruit','lime',fixed),false);
  assert.equal(C.satisfies('rum','light-rum',fixed),false);
});

test('马提尼克糖蜜朗姆同时满足产地和白朗姆，反向不成立', () => {
  const d=data();
  assert.ok(C.satisfies('martinique-molasses','martinique-rum',d));
  assert.ok(C.satisfies('martinique-molasses','light-rum',d));
  assert.equal(C.satisfies('martinique-rum','martinique-molasses',d),false);
});

test('目录的真实从属关系用于匹配，不把无关酒类混为一种', () => {
  const d=data();
  for(const [owned,required] of [['champagne','sparkling'],['prosecco','sparkling'],['cava','sparkling'],['cacao-brown','cacao-liqueur'],['menthe-white','mint-liqueur'],['kahlua','coffee-liqueur'],['cointreau','triple-sec'],['triple-sec','orange-liqueur'],['angostura','aromatic-bitters']])
    assert.ok(C.satisfies(owned,required,d),`${owned} → ${required}`);
  for(const [owned,required] of [['baijiu','vodka'],['soju','vodka'],['shochu','vodka'],['cachaca','rum'],['absinthe','liqueur'],['blanco-tequila','mezcal'],['joven-mezcal','tequila']])
    assert.equal(C.satisfies(owned,required,d),false,`${owned} ≠ ${required}`);
});

test('同一类型和同一产品的多条库存各自保留并可独立删除', () => {
  const d=data();own(d,'blanco-tequila');const a={...d.pantryItems[0],id:'first',name:'第一瓶',notes:'2026-10 开封',identityMode:'explicit'};
  d.pantryItems=[a,{...a,id:'second',name:'第二瓶',notes:'未开封'}];
  const installed=C.installCatalog(d,catalog);
  assert.equal(installed.pantryItems.length,2);
  assert.equal(C.matches(row('blanco-tequila'),installed).length,2);
  installed.pantryItems=installed.pantryItems.filter(i=>i.id!=='first');
  assert.ok(C.have(row('blanco-tequila'),installed));
  assert.equal(installed.pantryItems[0].notes,'未开封');
});

test('补充分类的多级关系与目录一致，边界和具体品牌仍严格匹配', () => {
  const d=data(),base=d.ingredients.find(i=>i.id==='dark-rum');
  d.ingredients.push({...C.clone(base),id:'region-style',name:'地区风格',tags:['jamaican-rum']});
  d.ingredients.push({...C.clone(base),id:'custom-style',name:'自定义风格',tags:['region-style']});
  d.ingredients.push({...C.clone(base),id:'bottle',name:'某款黑朗姆',kind:'product',brand:'某品牌',parentId:'custom-style'});
  assert.ok(C.satisfies('bottle','jamaican-rum',d));
  assert.equal(C.satisfies('jamaican-rum','bottle',d),false);
  d.ingredients.find(i=>i.id==='bottle').matchParent=false;
  assert.equal(C.satisfies('bottle','jamaican-rum',d),false);
  d.ingredients.find(i=>i.id==='region-style').tags=['custom-style'];
  assert.equal(C.satisfies('custom-style','gin',d),false);
});
