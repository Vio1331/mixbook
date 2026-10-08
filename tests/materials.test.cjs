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
