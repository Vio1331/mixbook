const test = require("node:test"),
  assert = require("node:assert/strict"),
  fs = require("node:fs"),
  vm = require("node:vm"),
  path = require("node:path"),
  C = require("../core.js");
const root = path.join(__dirname, ".."),
  ctx = { window: {} };
vm.runInNewContext(fs.readFileSync(path.join(root, "catalog.js"), "utf8"), ctx);
const seed = C.validate(C.clone(ctx.window.MIX_SEED));
const data = () => C.clone(seed),
  recipe = (d, id) => d.recipes.find((r) => r.id === "iba-" + id);
const own = (d, ...ids) => {
  d.pantryItems = ids.map((id, n) => {
    const i = d.ingredients.find((x) => x.id === id);
    return {
      id: `owned-${id}-${n}`,
      name: i.name,
      brand: i.brand,
      category: i.category,
      image: i.image,
      matches: [id],
      tags: i.tags,
    };
  });
};
function legacy() {
  const x = { window: {} };
  vm.runInNewContext(
    fs.readFileSync(path.join(root, "tests/fixtures/legacy-seed.js"), "utf8"),
    x,
  );
  return x.window.MIX_SEED;
}
test("内置目录可以省略仅属于用户状态的收藏字段", () => {
  const catalog = C.clone(ctx.window.MIX_SEED);
  delete catalog.favorites;
  delete catalog.pantryItems;
  const validated = C.validate(catalog);
  assert.deepEqual(validated.favorites, {});
  assert.deepEqual(validated.pantryItems, []);
});
test("102 条 IBA 配方都有独立来源，三组各 34 条，引用完整", () => {
  assert.equal(seed.recipes.length, 102);
  assert.equal(new Set(seed.recipes.map((r) => r.source)).size, 102);
  assert.ok(
    seed.recipes.every((r) =>
      r.source.startsWith("https://iba-world.com/iba-cocktail/"),
    ),
  );
  for (const category of ["难忘经典", "当代经典", "新时代"])
    assert.equal(
      seed.recipes.filter((r) => r.sourceName === "IBA · " + category).length,
      34,
    );
  C.validate(seed);
});
test("内置 IBA 配方只使用目录定义的标准杯形", () => {
  const glasses = new Set(seed.options.glasses);
  assert.ok(
    seed.recipes.every((r) => glasses.has(r.glass)),
    seed.recipes
      .filter((r) => !glasses.has(r.glass))
      .map((r) => `${r.id}: ${r.glass}`)
      .join("\n"),
  );
  assert.deepEqual(
    [...new Set(seed.recipes.map((r) => r.glass))].filter(
      (glass) => !glasses.has(glass),
    ),
    [],
  );
});
test("每条内置配方都按实际操作拆成多个调制步骤", () => {
  assert.ok(seed.recipes.every((r) => r.steps.length >= 2));
  assert.deepEqual(recipe(seed, "negroni").steps, [
    "材料直接倒入装冰的预冷古典杯。",
    "轻轻搅匀。",
  ]);
});
test("102 张 IBA 配图按上传文件名固定引用", () => {
  assert.equal(seed.recipes.length, 102);
  assert.equal(new Set(seed.recipes.map((r) => r.image)).size, 102);
  for (const r of seed.recipes)
    assert.ok(
      fs.existsSync(path.join(root, `assets/cocktails/${r.image}.webp`)),
      `${r.id}: ${r.image}`,
    );
  for (const i of seed.ingredients)
    if (i.image)
      assert.ok(
        fs.existsSync(path.join(root, `assets/ingredients/${i.image}.webp`)),
      );
});
test("同一份 catalog.js 修改后刷新内置配方，同时保留用户比例", () => {
  const old = data(),
    changed = data(),
    target = recipe(changed, "negroni");
  target.name = "我刚改的中文名";
  target.ingredients[0].amount = "31";
  recipe(old, "negroni").versions = [
    {
      id: "mine",
      name: "我的比例",
      author: "",
      notes: "",
      ingredients: recipe(old, "negroni").ingredients,
      garnishes: [],
      steps: ["我的步骤"],
    },
  ];
  const upgraded = C.installCatalog(old, changed),
    result = recipe(upgraded, "negroni");
  assert.equal(result.name, "我刚改的中文名");
  assert.equal(result.ingredients[0].amount, "31");
  assert.equal(result.versions[0].name, "我的比例");
});
test("目录升级会收敛未编辑的内置杯形，同时保留用户修改", () => {
  const old = data();
  old.catalogVersion = "iba-before-glass-unification";
  recipe(old, "bellini").glass = "香槟笛杯";
  recipe(old, "negroni").glass = "我的杯";
  recipe(old, "negroni").customized = true;
  const upgraded = C.installCatalog(old, seed);
  assert.equal(recipe(upgraded, "bellini").glass, "香槟杯");
  assert.equal(recipe(upgraded, "negroni").glass, "我的杯");
});
test("仙山露满足甜味美思，但类别不能反向满足具体名称", () => {
  const d = data();
  assert.ok(C.satisfies("cinzano-rosso", "sweet-vermouth", d));
  assert.equal(C.satisfies("sweet-vermouth", "cinzano-rosso", d), false);
});
test("君度满足橙味利口酒标签，但蓝橙与君度不可互换", () => {
  const d = data();
  assert.ok(C.satisfies("cointreau", "orange-liqueur", d));
  assert.ok(C.satisfies("grand-marnier", "orange-liqueur", d));
  assert.equal(C.satisfies("grand-marnier", "cointreau", d), false);
  assert.equal(C.satisfies("triple-sec", "cointreau", d), false);
  assert.equal(C.satisfies("curacao", "triple-sec", d), false);
});
test("具体苦精不会互相误匹配，但都满足苦精二级菜单", () => {
  const d = data();
  assert.equal(C.satisfies("angostura", "peychauds", d), false);
  assert.equal(C.satisfies("peychauds", "angostura", d), false);
  assert.ok(C.satisfies("angostura", "bitters", d));
});
test("酒柜产品匹配基础配方且不要求装饰", () => {
  const d = data();
  own(d, "gin", "campari", "cinzano-rosso");
  const m = C.match(recipe(d, "negroni"), d);
  assert.ok(m.ready);
  assert.equal(m.garnishes.length, 1);
  assert.equal(m.total, 3);
});
test("指定产品配方严格匹配", () => {
  const d = data(),
    r = recipe(d, "rabo-de-galo");
  own(d, "cachaca", "sweet-vermouth", "cynar");
  assert.equal(C.match(r, d).missing[0].id, "cinzano-rosso");
  own(d, "cachaca", "vermouth", "cynar", "cinzano-rosso");
  assert.ok(C.match(r, d).ready);
});
test("明确列出的替代品可用，蛋清的可选性保留", () => {
  const d = data();
  own(d, "rye", "campari", "sweet-vermouth");
  assert.ok(C.match(recipe(d, "boulevardier"), d).ready);
  own(d, "bourbon", "lemon", "simple-syrup");
  assert.ok(C.match(recipe(d, "whiskey-sour"), d).ready);
  assert.equal(
    recipe(d, "new-york-sour").ingredients.find((i) => i.id === "egg-white")
      .optional,
    false,
  );
});
test("维持官网容易误记的配方量与指定品牌", () => {
  const d = data();
  assert.equal(
    recipe(d, "monkey-gland").ingredients.find((x) => x.id === "absinthe").unit,
    "汤匙",
  );
  assert.equal(
    recipe(d, "bees-knees").ingredients.find((x) => x.id === "orange-juice")
      .amount,
    "22.5",
  );
  assert.equal(recipe(d, "vieux-carre").ingredients.at(-1).id, "peychauds");
  assert.equal(recipe(d, "moscow-mule").ingredients[0].id, "neutral-vodka");
  assert.equal(recipe(d, "sazerac").ingredients[0].id, "cognac");
});
test("搜索支持关键词、基酒、风味和单一来源交叉筛选", () => {
  const d = data();
  assert.ok(C.query(d, { q: "Negroni" }).some((r) => r.id === "iba-negroni"));
  const result = C.query(d, {
    base: "金酒",
    tags: ["酸甜", "苦甜"],
    sourceName: "IBA · 难忘经典",
  });
  assert.ok(result.length > 0);
  assert.ok(
    result.every(
      (r) =>
        r.base === "金酒" &&
        r.sourceName === "IBA · 难忘经典" &&
        r.tags.some((t) => ["酸甜", "苦甜"].includes(t)),
    ),
  );
  assert.equal(
    C.query(d, {
      q: "君度",
      base: "伏特加",
      sourceName: "IBA · 当代经典",
    }).some((r) => r.id === "iba-cosmopolitan"),
    true,
  );
  assert.equal(C.query(d, { base: "不存在的基酒" }).length, 0);
  assert.equal(C.query(d, { q: "IBA 新时代" }).length, 34);
});
test("v1 迁移把酒柜复制为独立记录，并保留收藏和装饰", () => {
  const old = legacy();
  old.pantry.gin = true;
  old.favorites.negroni = true;
  const d = C.installCatalog(old, seed);
  assert.equal(d.schemaVersion, 4);
  assert.deepEqual(
    d.pantryItems.find((i) => i.matches.includes("gin")).name,
    "金酒",
  );
  assert.equal(d.favorites["iba-negroni"], true);
  assert.equal(d.recipes.filter((r) => r.catalog).length, 102);
  assert.equal(
    C.validate(old).recipes.find((r) => r.id === "negroni").garnishes[0].id,
    "orange",
  );
});
test("目录升级不覆盖用户编辑，删除后重启不自动恢复", () => {
  const old = legacy();
  old.recipes[0].sample = false;
  old.recipes[0].notes = "我的笔记";
  const d = C.installCatalog(old, seed);
  assert.equal(d.recipes.find((r) => r.id === "negroni").notes, "我的笔记");
  assert.deepEqual(C.installCatalog(d, seed), d);
  d.recipes = d.recipes.filter((r) => r.id !== "iba-alexander");
  assert.equal(
    C.installCatalog(d, seed).recipes.some((r) => r.id === "iba-alexander"),
    false,
  );
});
test("比例版本与本体变体可完整保存", () => {
  const d = data(),
    r = recipe(d, "negroni");
  r.versions = [
    {
      id: "my-ratio",
      name: "我的 3:2:2",
      author: "自己",
      notes: "",
      steps: r.steps,
      ingredients: r.ingredients.map((i, n) => ({
        ...i,
        amount: n ? "30" : "45",
      })),
      garnishes: [],
    },
  ];
  const normalized = C.validate(d);
  assert.equal(recipe(normalized, "boulevardier").parentId, r.id);
  assert.equal(
    recipe(normalized, "negroni").versions[0].ingredients[0].amount,
    "45",
  );
});
test("两个设备的独立酒柜改动可合并", () => {
  const b = data(),
    l = data(),
    r = data();
  own(l, "gin");
  own(r, "campari");
  const m = C.merge(b, l, r);
  assert.deepEqual(m.conflicts, []);
  assert.deepEqual(m.data.pantryItems.flatMap((i) => i.matches).sort(), [
    "campari",
    "gin",
  ]);
});
test("删除酒柜记录不会删除材料或改动酒谱", () => {
  const d = data(),
    before = C.clone(recipe(d, "negroni"));
  own(d, "gin", "campari");
  d.pantryItems = d.pantryItems.filter((i) => !i.matches.includes("campari"));
  const normalized = C.validate(d);
  assert.ok(normalized.ingredients.some((i) => i.id === "campari"));
  assert.deepEqual(recipe(normalized, "negroni"), before);
  assert.equal(C.match(recipe(normalized, "negroni"), normalized).ready, false);
});
test("并发编辑同一配方会报告冲突，不能静默覆盖", () => {
  const b = data(),
    l = data(),
    r = data();
  l.recipes[0].notes = "甲";
  r.recipes[0].notes = "乙";
  const m = C.merge(b, l, r);
  assert.deepEqual(m.conflicts, ["recipes:iba-alexander"]);
});
test("删除与编辑冲突，独立配方改动不冲突", () => {
  const b = data(),
    l = data(),
    r = data();
  l.recipes = l.recipes.filter((x) => x.id !== "iba-alexander");
  r.recipes[0].notes = "远端笔记";
  r.recipes[1].notes = "另一杯";
  const m = C.merge(b, l, r);
  assert.ok(m.conflicts.includes("recipes:iba-alexander"));
  assert.equal(
    m.data.recipes.find((x) => x.id === "iba-americano").notes,
    "另一杯",
  );
});
test("材料与配方关联都拒绝循环和悬空关系", () => {
  let d = data();
  d.ingredients.find((i) => i.id === "gin").parentId = "london-dry";
  assert.throws(() => C.validate(d), /循环/);
  d = data();
  recipe(d, "negroni").parentId = "iba-boulevardier";
  assert.throws(() => C.validate(d), /循环/);
  d = data();
  d.recipes[0].ingredients[0].id = "missing";
  assert.throws(() => C.validate(d), /引用/);
});
test("导入数据拒绝危险编号、路径和未来版本，凭据不进入导出", () => {
  let d = data();
  d.ingredients[0].id = "__proto__";
  assert.throws(() => C.validate(d));
  d = data();
  d.recipes[0].image = "../../anything";
  assert.throws(() => C.validate(d));
  d = data();
  d.schemaVersion = 99;
  assert.throws(() => C.validate(d));
  d = data();
  d.token = "secret";
  assert.equal(C.validate(d).token, undefined);
});

test("旧 v2 来源迁移保留个人内容和删除记录，不引入重复分类", () => {
  const old = data();
  old.catalogVersion = "iba-2026-09-21-v2";
  old.options.formats = ["短饮"];
  old.options.families = ["Tiki"];
  delete old.options.sources;
  for (const r of old.recipes) {
    r.ibaCategory = r.sourceName.replace("IBA · ", "");
    delete r.sourceName;
    r.formats = ["短饮"];
    r.families = ["Tiki"];
  }
  old.recipes = old.recipes.filter((r) => r.id !== "iba-alexander");
  const r = recipe(old, "negroni");
  r.notes = "保留笔记";
  r.ingredients[0].amount = "45";
  r.customized = true;
  r.versions = [
    {
      id: "ratio",
      name: "比例",
      author: "Vio",
      notes: "偏好",
      ingredients: r.ingredients,
      garnishes: [],
      steps: r.steps,
    },
  ];
  own(old, "gin");
  old.favorites[r.id] = true;
  const d = C.installCatalog(old, seed),
    n = recipe(d, "negroni");
  assert.equal(d.recipes.length, 101);
  assert.equal(n.sourceName, "IBA · 难忘经典");
  assert.equal(n.notes, "保留笔记");
  assert.equal(n.ingredients[0].amount, "45");
  assert.deepEqual(n.versions, r.versions);
  assert.ok(d.pantryItems.some((i) => i.matches.includes("gin")));
  assert.equal(d.favorites[r.id], true);
  assert.equal(n.formats, undefined);
  assert.equal(n.families, undefined);
  assert.equal(n.ibaCategory, undefined);
  assert.deepEqual(Object.keys(d.options).sort(), [
    "glasses",
    "sources",
    "tags",
  ]);
  assert.deepEqual(C.installCatalog(d, seed), d);
});
test("自定义来源与链接独立保存、可留空、跨设备合并", () => {
  const b = data(),
    l = data(),
    r = data();
  l.options.sources.push("调酒笔记");
  l.recipes[0].sourceName = "调酒笔记";
  l.recipes[0].source = "第 12 页";
  r.options.sources.push("朋友的配方");
  const merged = C.merge(b, l, r);
  assert.deepEqual(merged.conflicts, []);
  const d = C.validate(merged.data);
  assert.equal(d.recipes[0].sourceName, "调酒笔记");
  assert.equal(d.recipes[0].source, "第 12 页");
  assert.ok(d.options.sources.includes("朋友的配方"));
  d.recipes[0].sourceName = "";
  assert.equal(C.validate(d).recipes[0].sourceName, "");
});
test("来源升级与云端独立笔记修改合并不会制造冲突", () => {
  const b = data();
  b.catalogVersion = "iba-2026-09-21-v2";
  for (const r of b.recipes) {
    r.ibaCategory = r.sourceName.replace("IBA · ", "");
    delete r.sourceName;
    r.formats = ["短饮"];
    r.families = ["经典"];
  }
  const remote = C.clone(b);
  remote.recipes[0].notes = "云端新增笔记";
  const upgraded = C.installCatalog(b, seed);
  const m = C.merge(upgraded, upgraded, C.installCatalog(remote, seed));
  assert.deepEqual(m.conflicts, []);
  assert.equal(m.data.recipes[0].notes, "云端新增笔记");
});
test("完全相同的原料返回布尔真值，通用类别不能反向匹配产品", () => {
  const d = data();
  assert.equal(C.satisfies("gin", "gin", d), true);
  assert.equal(C.satisfies("cointreau", "cointreau", d), true);
  assert.equal(C.satisfies("gin", "london-dry", d), false);
});
test("苏格兰层级不跨到波本，龙舌兰和梅斯卡尔各自独立", () => {
  const d = data();
  for (const id of ["islay", "blended-scotch", "lagavulin-16"])
    assert.equal(C.satisfies(id, "scotch", d), true);
  assert.equal(C.satisfies("bourbon", "scotch", d), false);
  assert.equal(C.satisfies("mezcal", "tequila", d), false);
  assert.equal(C.satisfies("tequila", "mezcal", d), false);
  own(d, "mezcal", "cointreau", "lime");
  assert.equal(C.match(recipe(d, "margarita"), d).ready, false);
  own(d, "tequila", "cointreau", "lime");
  assert.equal(C.match(recipe(d, "margarita"), d).ready, true);
});
test("相似描述标签不会把指定产品放宽成同类任意产品", () => {
  const d = data();
  own(d, "grand-marnier");
  assert.equal(C.have({ id: "cointreau" }, d), false);
  assert.equal(C.have({ id: "triple-sec" }, d), false);
  own(d, "cointreau");
  assert.equal(C.have({ id: "triple-sec" }, d), true);
  assert.equal(C.have({ id: "orange-liqueur" }, d), true);
});
test("替代原料优先级低于主体，缺料统计不重复计算", () => {
  const d = data();
  own(d, "bourbon", "rye");
  const row = {
    id: "bourbon",
    amount: "30",
    unit: "ml",
    optional: false,
    alternatives: ["rye"],
  };
  assert.deepEqual(
    C.matches(row, d).map((x) => x.matches[0]),
    ["bourbon"],
  );
  const r = { ingredients: [row, row], garnishes: [] };
  assert.equal(C.match(r, d).total, 1);
  own(d, "rye");
  assert.equal(C.match(r, d).substitutions.length, 1);
  assert.equal(C.match(r, d).ready, true);
});
test("用量验证拒绝负数、零和非法数值，文本用量及分数可用", () => {
  for (const s of ["", "-30", "−2", "0", "0.0", "1/0", "Infinity", "NaN"])
    assert.ok(C.amountIssue(s), s);
  for (const s of ["30", "22.5", "1/2", "适量", "补满", "半", "2–3"])
    assert.equal(C.amountIssue(s), "", s);
  assert.equal(C.scaleAmount("1/2", 3), "1.5");
  assert.equal(C.scaleAmount("22.5", 2), "45");
  assert.equal(C.scaleAmount("2-3", 2), "4–6");
  assert.equal(C.scaleAmount("适量", 4), "适量");
});
test("个人版本的杯型、方式、来源和时间可往返保存", () => {
  const d = data(),
    r = recipe(d, "negroni");
  r.versions = [
    {
      id: "full-version",
      name: "日常版",
      ingredients: r.ingredients,
      garnishes: [],
      steps: r.steps,
      glass: "古典杯",
      method: "搅拌",
      base: "金酒",
      source: "笔记12页",
      sourceName: "我的手册",
      tags: ["苦甜"],
      createdAt: "2026-10-08",
      updatedAt: "2026-10-08",
    },
  ];
  const v = C.validate(C.validate(d)).recipes.find((x) => x.id === r.id)
    .versions[0];
  assert.equal(v.glass, "古典杯");
  assert.equal(v.sourceName, "我的手册");
  assert.deepEqual(v.tags, ["苦甜"]);
});
test("v2 目录升级保留原笔记、自定义图、酒柜、收藏和首次迁移后删除", () => {
  const d = data(),
    r = recipe(d, "negroni");
  r.notes = "我的私人笔记";
  r.photoUrl = "https://example.com/photo.webp";
  d.favorites[r.id] = true;
  own(d, "gin");
  const upgraded = C.installCatalog(d, seed);
  assert.equal(recipe(upgraded, "negroni").notes, "我的私人笔记");
  assert.equal(recipe(upgraded, "negroni").photoUrl, r.photoUrl);
  assert.equal(upgraded.pantryItems.length, 1);
  assert.equal(upgraded.favorites[r.id], true);
  assert.deepEqual(C.installCatalog(upgraded, seed), upgraded);
});
test("自定义图片链接只允许 HTTPS，不允许可执行或内嵌协议", () => {
  for (const value of [
    "javascript:alert(1)",
    "data:image/png;base64,a",
    "http://example.com/a",
  ]) {
    const d = data();
    d.recipes[0].photoUrl = value;
    assert.throws(() => C.validate(d), /HTTPS/);
  }
  const d = data();
  d.recipes[0].photoUrl = "https://example.com/a.png";
  assert.equal(C.validate(d).recipes[0].photoUrl, d.recipes[0].photoUrl);
});
test("显示名称不能把已选择的另一品牌改成指定产品，旧通用记录可按名称识别", () => {
  const d = data();
  own(d, "grand-marnier");
  d.pantryItems[0].name = "君度";
  assert.equal(C.have({ id: "cointreau" }, d), false);
  own(d, "liqueur");
  d.pantryItems[0].name = "君度";
  assert.equal(C.have({ id: "cointreau" }, d), true);
});
