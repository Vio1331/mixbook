/* v4: recipe materials and standalone pantry records with explicit matching rules. */
(function (root) {
  "use strict";
  const clone = (v) =>
      v === undefined ? undefined : JSON.parse(JSON.stringify(v)),
    same = (a, b) => JSON.stringify(a) === JSON.stringify(b),
    norm = (s) =>
      String(s || "")
        .normalize("NFKC")
        .trim()
        .toLowerCase(),
    now = () => new Date().toISOString(),
    uid = () =>
      root.crypto?.randomUUID?.() ||
      "id-" +
        Date.now().toString(36) +
        "-" +
        Math.random().toString(36).slice(2);
  const empty = () => ({
    schemaVersion: 4,
    recipes: [],
    ingredients: [],
    pantryItems: [],
    favorites: {},
    options: { glasses: [], tags: [], sources: [] },
    catalogVersion: "",
  });
  function fail(s) {
    throw Error(s);
  }
  function text(s, n = 2000) {
    return typeof s === "string" && s.length <= n
      ? s
      : fail("文本字段无效或过长。");
  }
  function list(a, n = 100) {
    return Array.isArray(a) &&
      a.length <= 10000 &&
      a.every((x) => typeof x === "string" && x.length <= n)
      ? [...new Set(a)]
      : fail("选项列表无效。");
  }
  function safeId(s) {
    return (
      typeof s === "string" &&
      /^[a-zA-Z0-9_-]{1,200}$/.test(s) &&
      !["__proto__", "constructor", "prototype"].includes(s)
    );
  }
  function image(s) {
    return !s
      ? ""
      : typeof s === "string" &&
          s.length <= 200 &&
          !/[\\/\u0000-\u001f\u007f]/.test(s) &&
          ![".", ".."].includes(s)
        ? s
        : fail("图片标识无效。");
  }
  function photoUrl(s) {
    if (!s) return "";
    try {
      const u = new URL(s);
      if (u.protocol === "https:" && s.length <= 2000) return s;
    } catch {}
    fail("图片链接需要使用 HTTPS。");
  }
  function unique(a, label) {
    if (!Array.isArray(a) || a.length > 10000) fail(label + "结构无效。");
    const ids = new Set();
    for (const v of a) {
      if (!v || !safeId(v.id) || ids.has(v.id))
        fail(label + "编号无效或重复。");
      ids.add(v.id);
    }
    return ids;
  }
  function validate(input) {
    if (!input || ![1, 2, 3, 4].includes(input.schemaVersion))
      fail("数据版本不兼容，请更新网页。");
    const v1 = input.schemaVersion === 1,
      ids = unique(input.ingredients, "材料"),
      rids = unique(input.recipes, "酒谱");
    const ingredients = input.ingredients.map((i) => ({
      id: i.id,
      name: text(i.name, 100) || fail("材料需要名称。"),
      category: text(i.category, 50),
      aliases: list(i.aliases, 100),
      kind: i.kind === "product" ? "product" : "type",
      parentId: text(i.parentId || "", 200),
      brand: text(i.brand || "", 100),
      image: image(i.image),
      tags: list(i.tags || [], 200),
      matchParent:
        i.matchParent === undefined
          ? true
          : typeof i.matchParent === "boolean"
            ? i.matchParent
            : fail("材料匹配边界无效。"),
      customized: i.customized === true,
      builtIn: i.builtIn === true,
      builtInTag: i.builtInTag === true,
    }));
    const dict = new Map(ingredients.map((i) => [i.id, i]));
    function treeCheck(a) {
      const d = new Map(a.map((x) => [x.id, x]));
      for (const i of a) {
        let p = i;
        const seen = new Set([i.id]);
        while (p.parentId) {
          if (!d.has(p.parentId) || seen.has(p.parentId))
            fail("关联关系无效或形成循环。");
          seen.add(p.parentId);
          p = d.get(p.parentId);
        }
      }
    }
    treeCheck(ingredients);
    for (const i of ingredients)
      if (i.parentId && materialRole(dict.get(i.parentId)) === "product")
        fail("所属原料不能是另一个品牌产品。");
    for (const i of ingredients) {
      if (input.schemaVersion < 3)
        i.tags = i.tags.filter(
          (id) => dict.get(id)?.kind === "type" && id !== i.id,
        );
      else if (
        i.tags.some(
          (id) => !dict.has(id) || dict.get(id).kind !== "type" || id === i.id,
        )
      )
        fail("材料标签引用无效。");
    }
    function rows(a, required = false) {
      if (!Array.isArray(a) || a.length > 60 || (required && !a.length))
        fail("请填写调酒材料。");
      return a.map((x) => {
        if (!x || !ids.has(x.id) || typeof x.optional !== "boolean")
          fail("配方材料引用无效。");
        const alternatives = x.alternatives || [];
        if (
          !Array.isArray(alternatives) ||
          alternatives.length > 60 ||
          alternatives.some((id) => !ids.has(id))
        )
          fail("替代材料无效。");
        const alts = [...new Set(alternatives)].filter((id) => id !== x.id);
        return {
          id: x.id,
          amount: text(x.amount, 40),
          unit: text(x.unit, 30),
          optional: x.optional,
          ...(alts.length ? { alternatives: alts } : {}),
        };
      });
    }
    function steps(a) {
      if (
        !Array.isArray(a) ||
        !a.length ||
        a.length > 100 ||
        a.some((x) => typeof x !== "string" || x.length > 3000)
      )
        fail("请填写调制步骤。");
      return a;
    }
    const recipes = input.recipes.map((r) => {
      const versions = r.versions || [];
      unique(versions, "比例版本");
      return {
        id: r.id,
        name: text(r.name, 100) || fail("酒谱需要名称。"),
        en: text(r.en, 100),
        base: text(r.base, 60),
        method: text(r.method, 60),
        glass: text(r.glass, 100),
        tags: list(r.tags, 60),
        notes: text(r.notes, 10000),
        source: text(r.source, 2000),
        sourceName: text(
          r.sourceName ?? (r.ibaCategory ? "IBA · " + r.ibaCategory : ""),
          200,
        ),
        steps: steps(r.steps),
        ingredients: rows(
          v1
            ? r.ingredients.filter((x) => dict.get(x.id)?.category !== "装饰")
            : r.ingredients,
          true,
        ),
        garnishes: rows(
          v1
            ? r.ingredients.filter((x) => dict.get(x.id)?.category === "装饰")
            : r.garnishes || [],
        ),
        versions: versions.map((v) => ({
          id: v.id,
          name: text(v.name, 100),
          author: text(v.author || "", 100),
          notes: text(v.notes || "", 10000),
          ingredients: rows(v.ingredients, true),
          garnishes: rows(v.garnishes || []),
          steps: steps(v.steps),
          ...Object.fromEntries(
            [
              "base",
              "method",
              "glass",
              "source",
              "sourceName",
              "createdAt",
              "updatedAt",
            ]
              .filter((k) => v[k] !== undefined)
              .map((k) => [k, text(v[k], k === "source" ? 2000 : 200)]),
          ),
          ...(v.tags ? { tags: list(v.tags, 60) } : {}),
        })),
        parentId: text(r.parentId || "", 200),
        catalog: r.catalog === true,
        customized: r.customized === true,
        sample: r.sample === true,
        image: image(r.image),
        photoUrl: photoUrl(r.photoUrl),
        createdAt:
          typeof r.createdAt === "string" ? text(r.createdAt, 50) : now(),
        updatedAt:
          typeof r.updatedAt === "string" ? text(r.updatedAt, 50) : now(),
      };
    });
    treeCheck(recipes);
    function flags(m, ids) {
      if (!m || typeof m !== "object" || Array.isArray(m))
        fail("酒柜或收藏数据无效。");
      const out = {};
      for (const [k, v] of Object.entries(m)) {
        if (!ids.has(k) || typeof v !== "boolean") fail("酒柜或收藏引用无效。");
        out[k] = v;
      }
      return out;
    }
    const rawPantry =
      input.schemaVersion < 4
        ? Object.keys(input.pantry || {})
            .filter((id) => input.pantry[id] && dict.has(id))
            .map((id) => {
              const i = dict.get(id);
              return {
                id: "pantry-" + id,
                name: i.name,
                brand: i.brand,
                category: i.category,
                image: i.image,
                matches: [i.id],
                tags: i.tags,
              };
            })
        : input.pantryItems || [];
    unique(rawPantry, "酒柜记录");
    const pantryItems = rawPantry.map((i) => ({
      id: i.id,
      name: text(i.name, 100) || fail("酒柜记录需要名称。"),
      brand: text(i.brand || "", 100),
      category: text(i.category || "", 50),
      image: image(i.image),
      matches: list(i.matches || [], 200),
      tags: list(i.tags || [], 200),
      notes: text(i.notes || "", 2000),
      identityMode: "explicit",
    }));
    for (const i of pantryItems)
      if (
        !i.matches.length ||
        i.matches.some((id) => !ids.has(id)) ||
        i.tags.some((id) => !ids.has(id))
      )
        fail("酒柜记录的分类无效。");
    // Resolve old name-based bottle identities once. Subsequent label changes
    // are presentation only; matching always follows the chosen material ID.
    for (let n = 0; n < pantryItems.length; n++) {
      const item = pantryItems[n];
      if (rawPantry[n].identityMode === 'explicit') continue;
      const candidates = ingredients.filter((r) => materialRole(r) !== 'group' &&
        [r.name, ...r.aliases].map(norm).includes(norm(item.name)) &&
        item.matches.every((id) => materialRole(dict.get(id)) !== 'product') &&
        (!r.parentId || item.matches.some((id) => satisfies(id, r.parentId, {ingredients}))));
      if (candidates.length === 1) {
        const chosen = candidates[0].id;
        item.matches = [chosen, ...item.matches.filter(id => !satisfies(chosen, id, {ingredients}))];
      }
    }
    const options = {};
    for (const k of ["glasses", "tags", "sources"])
      options[k] = list(input.options?.[k] || [], k === "sources" ? 200 : 100);
    // Catalog files only describe built-in content and may omit user-state sections.
    // Keep rejecting malformed values when the section is present, but treat an
    // omitted favorites map the same way as the already-optional pantryItems list.
    const favorites = input.favorites === undefined ? {} : input.favorites;
    return {
      schemaVersion: 4,
      recipes,
      ingredients,
      pantryItems,
      favorites: flags(favorites, rids),
      options,
      catalogVersion: text(input.catalogVersion || "", 100),
    };
  }
  // An index lives for one synchronous operation only. Drafts are mutable, so a
  // permanent WeakMap cache could return stale names, parents or pantry matches.
  const indexes = new Map();
  function indexed(data, action) {
    if (indexes.has(data)) return action();
    indexes.set(data, {
      ingredients: new Map(data.ingredients.map((i) => [i.id, i])),
      paths: new Map(),
      matches: new Map(),
      satisfies: new Map(),
    });
    try { return action(); }
    finally { indexes.delete(data); }
  }
  function ingredientIndex(data) {
    return indexes.get(data)?.ingredients || new Map(data.ingredients.map((i) => [i.id, i]));
  }
  function ingredientPath(id, data) {
    const cache = indexes.get(data)?.paths;
    if (cache?.has(id)) return cache.get(id);
    const d = ingredientIndex(data),
      out = [],
      seen = new Set();
    let i = d.get(id);
    while (i && !seen.has(i.id)) {
      out.unshift(i);
      seen.add(i.id);
      i = d.get(i.parentId);
    }
    cache?.set(id, out);
    return out;
  }
  function needsProduct(i, data) {
    return (
      i.kind === "type" &&
      ingredientPath(i.id, data).some(
        (x) => x.id === "alcohol" || x.id === "bitters",
      )
    );
  }
  function materialText(i, data) {
    if (!i) return "";
    const d = ingredientIndex(data);
    return norm(
      [
        ...ingredientPath(i.id, data),
        ...(i.tags || []).map((id) => d.get(id)).filter(Boolean),
      ]
        .flatMap((x) => [x.name, x.brand, ...x.aliases])
        .join(" "),
    );
  }
  // Navigation groups are not ingredients. Keep their IDs in stored data, but
  // don't offer them as new selections or mix inherited category hits with names.
  const materialGroups = new Set(['brandy-root', 'liqueur-root', 'other-alcohol',
    'port-sherry', 'liquid-materials', 'solid-materials', 'other-liquid',
    'other-food', 'fruit-vegetable', 'seasoning', 'juice', 'syrup', 'soda-root']);
  function materialRole(item) {
    if (!item) return 'ingredient';
    return materialGroups.has(item.id) ? 'group' : item.brand?.trim() ? 'product' : 'ingredient';
  }
  function searchMaterials(data, query = '', category = '', recent = []) {
    const q = norm(query), terms = q.split(/\s+/).filter(Boolean);
    const direct = [], related = [];
    for (const i of data.ingredients) {
      if (materialGroups.has(i.id)) continue;
      if (category && !ingredientPath(i.id, data).some((x) => x.id === category)) continue;
      const names = [i.name, ...i.aliases].map(norm);
      const own = norm([i.name, i.brand, ...i.aliases].join(' '));
      const exact = names.includes(q);
      const hit = terms.every((t) => own.includes(t));
      if (!hit && !terms.every((t) => materialText(i, data).includes(t))) continue;
      const rank = q ? exact ? 100 : names.some((n) => n.startsWith(q)) ? 80 : 60 : 0;
      const row = {item:i,rank};
      (hit ? direct : related).push(row);
    }
    const pathLabel = item => ingredientPath(item.id,data).map(x=>x.name).join(' / ');
    const compare = (a,b) => b.rank-a.rank || pathLabel(a.item).localeCompare(pathLabel(b.item),'zh-CN') || a.item.id.localeCompare(b.item.id);
    return { direct: direct.sort(compare).map((x) => x.item),
      related: related.sort(compare).map((x) => x.item) };
  }
  // Membership and substitution are deliberately separate. A product's descriptive
  // tags never make every other product bearing the same tag interchangeable.
  function categorySatisfies(owned, required, data) {
    const d = ingredientIndex(data);
    let item = d.get(owned);
    const seen = new Set();
    while (item && !seen.has(item.id)) {
      if (item.id === required) return true;
      seen.add(item.id);
      if (item.matchParent === false) break;
      item = d.get(item.parentId);
    }
    return false;
  }
  function satisfies(owned, required, data) {
    const cache = indexes.get(data)?.satisfies, key = owned + ":" + required;
    if (cache?.has(key)) return cache.get(key);
    const result = satisfiesUncached(owned, required, data);
    cache?.set(key, result);
    return result;
  }
  function satisfiesUncached(owned, required, data) {
    const d = ingredientIndex(data), o = d.get(owned), r = d.get(required);
    if (!o || !r) return false;
    if (o.id === r.id) return true;
    if (materialRole(r) === "product") return false;
    if (categorySatisfies(owned, required, data)) return true;
    return ingredientPath(owned, data).some((i) =>
      (i.tags || []).some((tag) => categorySatisfies(tag, required, data)),
    );
  }
  function pantryMatchLevel(item, required, data) {
    const d = ingredientIndex(data), r = d.get(required);
    if (!r) return Infinity;
    if ((item.matches || []).includes(required)) return 0;
    // Names/aliases support legacy independently named bottles, within their category.
    const identity = [r.name, ...r.aliases].map(norm).includes(norm(item.name));
    if (
      item.identityMode !== 'explicit' && identity &&
      (item.matches || []).every((id) => {
        const selected = d.get(id);
        return selected?.kind === "type" || selected?.customized;
      }) &&
      (!r.parentId ||
        (item.matches || []).some((id) => satisfies(id, r.parentId, data)))
    )
      return 0;
    if (materialRole(r) === "product") return Infinity;
    if ((item.tags || []).some((tag) => categorySatisfies(tag, required, data)))
      return 1;
    if ((item.matches || []).some((id) => satisfies(id, required, data)))
      return 2;
    return Infinity;
  }
  function matches(row, data) {
    const cache = indexes.get(data)?.matches,
      key = JSON.stringify([row.id, ...(row.alternatives || [])]);
    if (cache?.has(key)) return cache.get(key);
    const required = [row.id, ...(row.alternatives || [])];
    const ranked = data.pantryItems
      .map((item) => ({
        item,
        level: Math.min(
          ...required.map(
            (id, n) => pantryMatchLevel(item, id, data) + (n ? 100 : 0),
          ),
        ),
      }))
      .filter((x) => Number.isFinite(x.level));
    const best = Math.min(...ranked.map((x) => x.level)),
      result = ranked.filter((x) => x.level === best).map((x) => x.item);
    cache?.set(key, result);
    return result;
  }
  function have(row, data) {
    return matches(row, data).length > 0;
  }
  function match(r, data) {
    const req = [
      ...new Map(
        r.ingredients
          .filter((i) => !i.optional)
          .map((i) => [i.id + JSON.stringify(i.alternatives || []), i]),
      ).values(),
    ];
    const missing = req.filter((i) => !have(i, data));
    return {
      ready: !missing.length,
      missing,
      substitutions: req.filter(
        (i) => have(i, data) && !have({ ...i, alternatives: [] }, data),
      ),
      optional: r.ingredients.filter((i) => i.optional && !have(i, data)),
      garnishes: (r.garnishes || []).filter((i) => !have(i, data)),
      total: req.length,
    };
  }
  function query(data, f = {}) {
    const terms = norm(f.q).split(/\s+/).filter(Boolean),
      dict = new Map(
        data.ingredients.map((i) => [i.id, materialText(i, data)]),
      );
    return data.recipes.filter((r) => {
      const hay = norm(
          [
            r.name,
            r.en,
            r.base,
            r.method,
            r.notes,
            ...r.tags,
            r.sourceName,
            r.source,
            ...(r.versions || []).flatMap((v) => [
              v.name,
              v.author,
              v.notes,
              v.sourceName,
              v.source,
              ...(v.tags || []),
              ...[...v.ingredients, ...v.garnishes].flatMap((x) =>
                [x.id, ...(x.alternatives || [])].map((id) => dict.get(id)),
              ),
            ]),
            ...[...r.ingredients, ...r.garnishes].flatMap((x) =>
              [x.id, ...(x.alternatives || [])].map((id) => dict.get(id)),
            ),
          ].join(" "),
        ),
        m = f.availability && f.availability !== "all" ? match(r, data) : null;
      return (
        terms.every((t) => hay.includes(t)) &&
        (!f.tags?.length || f.tags.some((t) => r.tags.includes(t))) &&
        (!f.base || r.base === f.base) &&
        (!f.sourceName || r.sourceName === f.sourceName) &&
        (!f.favorite || data.favorites[r.id]) &&
        (!f.availability ||
          f.availability === "all" ||
          (f.availability === "ready" && m.ready) ||
          (f.availability === "one" && m.missing.length === 1))
      );
    });
  }
  function merge(base, local, remote) {
    [base, local, remote] = [base, local, remote].map(validate);
    const out = empty(),
      conflicts = [];
    function val(k, b, l, r) {
      if (same(l, r)) return clone(l);
      if (same(l, b)) return clone(r);
      if (same(r, b)) return clone(l);
      conflicts.push(k);
      return clone(l);
    }
    for (const section of ["ingredients", "recipes", "pantryItems"]) {
      const ms = [base, local, remote].map(
        (d) => new Map(d[section].map((v) => [v.id, v])),
      );
      for (const id of new Set(ms.flatMap((m) => [...m.keys()]))) {
        const v = val(section + ":" + id, ...ms.map((m) => m.get(id)));
        if (v !== undefined) out[section].push(v);
      }
    }
    for (const section of ["favorites"])
      for (const id of new Set(
        [base, local, remote].flatMap((d) => Object.keys(d[section])),
      )) {
        const v = val(
          section + ":" + id,
          base[section][id],
          local[section][id],
          remote[section][id],
        );
        if (v !== undefined) out[section][id] = v;
      }
    for (const k of Object.keys(out.options))
      out.options[k] = [
        ...new Set([...local.options[k], ...remote.options[k]]),
      ];
    out.catalogVersion = local.catalogVersion || remote.catalogVersion;
    const ids = new Set(out.ingredients.map((i) => i.id)),
      rids = new Set(out.recipes.map((r) => r.id));
    out.pantryItems = out.pantryItems.filter(
      (i) =>
        i.matches.every((id) => ids.has(id)) &&
        i.tags.every((id) => ids.has(id)),
    );
    for (const id of Object.keys(out.favorites))
      if (!rids.has(id)) delete out.favorites[id];
    for (const r of out.recipes) {
      if (r.parentId && !rids.has(r.parentId)) r.parentId = "";
      for (const x of [
        ...r.ingredients,
        ...r.garnishes,
        ...r.versions.flatMap((v) => [...v.ingredients, ...v.garnishes]),
      ])
        if (!ids.has(x.id)) conflicts.push("missing-ingredient:" + x.id);
    }
    return { data: out, conflicts: [...new Set(conflicts)] };
  }
  // Identity is scoped to a concrete parent and matching constraints. Never
  // infer equivalence from a bottle's display name or from a shared category.
  function reconcileMaterials(data, catalog) {
    const canonicalIds = new Set(catalog.ingredients.map(i => i.id));
    const redirects = new Map();
    const compatible = (a, b) => !a.brand && !b.brand &&
      materialRole(a) === 'ingredient' && materialRole(b) === 'ingredient' &&
      a.parentId === b.parentId && a.matchParent === b.matchParent &&
      same([...a.tags].sort(), [...b.tags].sort()) &&
      (!a.image || !b.image || a.image === b.image);
    for (const item of data.ingredients) {
      if (canonicalIds.has(item.id)) continue;
      const candidates = data.ingredients.filter(target => canonicalIds.has(target.id) &&
        compatible(item, target) && [target.name, ...target.aliases].map(norm).includes(norm(item.name)));
      if (candidates.length !== 1) continue;
      const target = candidates[0];
      redirects.set(item.id, target.id);
      const aliases = [...new Set([...target.aliases, item.name, ...item.aliases])]
        .filter(name => norm(name) !== norm(target.name));
      if (!same(aliases, target.aliases) || item.image && !target.image || item.kind === 'type' && target.kind !== 'type') {
        target.aliases = aliases;
        target.image ||= item.image;
        if (item.kind === 'type') target.kind = 'type';
        target.customized = true;
      }
    }
    if (!redirects.size) return data;
    const resolve = id => redirects.get(id) || id;
    const refs = (ids = []) => [...new Set(ids.map(resolve))];
    for (const recipe of data.recipes)
      for (const row of [...recipe.ingredients, ...recipe.garnishes,
        ...recipe.versions.flatMap(v => [...v.ingredients, ...v.garnishes])]) {
        row.id = resolve(row.id);
        row.alternatives = refs(row.alternatives).filter(id => id !== row.id);
      }
    for (const stock of data.pantryItems) {
      stock.matches = refs(stock.matches);
      stock.tags = refs(stock.tags);
    }
    data.ingredients = data.ingredients.filter(i => !redirects.has(i.id));
    for (const item of data.ingredients) {
      item.parentId = resolve(item.parentId);
      item.tags = refs(item.tags).filter(id => id !== item.id);
    }
    return reconcileMaterials(data, catalog);
  }
  function installCatalog(input, catalog) {
    const d = validate(input),
      c = validate(catalog),
      installed = !!d.catalogVersion,
      sameCatalog = d.catalogVersion === c.catalogVersion;
    for (const [removed, replacement] of Object.entries(
      catalog.ingredientRemovals || {},
    )) {
      for (const r of d.recipes)
        for (const x of [
          ...r.ingredients,
          ...r.garnishes,
          ...r.versions.flatMap((v) => [...v.ingredients, ...v.garnishes]),
        ]) {
          if (x.id === removed) x.id = replacement;
          x.alternatives = (x.alternatives || [])
            .map((id) => (id === removed ? replacement : id))
            .filter((id, n, a) => id !== x.id && a.indexOf(id) === n);
        }
      for (const i of d.pantryItems) {
        i.matches = i.matches
          .map((id) => (id === removed ? replacement : id))
          .filter((id, n, a) => a.indexOf(id) === n);
        i.tags = i.tags
          .map((id) => (id === removed ? replacement : id))
          .filter((id, n, a) => a.indexOf(id) === n);
      }
      for (const i of d.ingredients) {
        if (i.parentId === removed) i.parentId = replacement;
        i.tags = (i.tags || [])
          .map((id) => (id === removed ? replacement : id))
          .filter((id, n, a) => id !== i.id && a.indexOf(id) === n);
      }
      d.ingredients = d.ingredients.filter((i) => i.id !== removed);
    }
    for (const i of c.ingredients) {
      const old = d.ingredients.find((x) => x.id === i.id);
      if (!old) d.ingredients.push(clone(i));
      else if (!old.customized) Object.assign(old, clone(i));
    }
    for (const r of c.recipes) {
      const existing = d.recipes.find((x) => x.id === r.id);
      if (existing) {
        const raw = input.recipes.find((x) => x.id === r.id);
        // Refresh untouched built-in recipes directly from catalog.js, even when its version string is unchanged.
        // Personal edits and user-created ratio versions remain local user data.
        if (!existing.customized) {
          const versions = existing.versions,
            createdAt = existing.createdAt,
            updatedAt = existing.updatedAt,
            notes = existing.notes || r.notes,
            photoUrl = existing.photoUrl || r.photoUrl;
          Object.assign(existing, clone(r), {
            versions,
            createdAt,
            updatedAt,
            notes,
            photoUrl,
          });
        } else {
          if (raw.sourceName === undefined) existing.sourceName = r.sourceName;
          if (!existing.customized) {
            existing.base = r.base;
            existing.glass = r.glass;
            existing.tags = [...new Set([...existing.tags, ...r.tags])];
          }
          if (existing.catalog && !existing.image) existing.image = r.image;
        }
        continue;
      }
      // A catalog already installed on this device may have deliberate recipe deletions.
      if (installed) continue;
      const old = d.recipes.find((x) => x.id === r.id.replace(/^iba-/, ""));
      if (old?.sample) {
        d.recipes = d.recipes.filter((x) => x.id !== old.id);
        if (d.favorites[old.id]) d.favorites[r.id] = true;
        delete d.favorites[old.id];
      }
      d.recipes.push(clone(r));
    }
    for (const k of Object.keys(d.options))
      d.options[k] = [...new Set([...d.options[k], ...c.options[k]])];
    d.catalogVersion = c.catalogVersion;
    return validate(reconcileMaterials(d, c));
  }

  const vulgarFractions = { '¼': '1/4', '½': '1/2', '¾': '3/4', '⅓': '1/3', '⅔': '2/3', '⅛': '1/8', '⅜': '3/8', '⅝': '5/8', '⅞': '7/8' };
  function normalizedAmount(value) {
    return String(value ?? '').trim()
      .replace(/(\d)([¼½¾⅓⅔⅛⅜⅝⅞])/g, '$1 $2')
      .replace(/[¼½¾⅓⅔⅛⅜⅝⅞]/g, (x) => vulgarFractions[x])
      .normalize('NFKC').replace(/⁄/g, '/').replace(/−/g, '-').trim();
  }
  function numericAmount(value) {
    const s = normalizedAmount(value);
    if (s === '半') return 0.5;
    const mixed = s.match(/^(\d+)\s+(\d+)\s*\/\s*(\d+)$/);
    if (mixed) return Number(mixed[1]) + Number(mixed[2]) / Number(mixed[3]);
    const fraction = s.match(/^([+]?\d*\.?\d+)\s*\/\s*(\d*\.?\d+)$/);
    if (fraction) return Number(fraction[1]) / Number(fraction[2]);
    if (/^[+]?\d*\.?\d+$/.test(s)) return Number(s);
    return null;
  }
  function amountParts(value) {
    const s = normalizedAmount(value), range = s.match(/^(.+?)\s*[–—~～-]\s*(.+)$/);
    return range ? range.slice(1).map(numericAmount) : [numericAmount(s)];
  }
  function amountIssue(value) {
    const s = normalizedAmount(value);
    if (!s) return '请填写用量，或填写“适量 / 补满”。';
    if (/^[−-]\s*\d/.test(s)) return '用量不能为负数。';
    if (/^(?:[+-]?NaN|[+-]?Infinity|∞)$/i.test(s)) return '请填写有效用量。';
    const parts = amountParts(s);
    if (parts.some((n) => n !== null && (!Number.isFinite(n) || n <= 0)))
      return '用量应大于零，分母不能为零。';
    if (parts.length === 2 && parts.every((n) => n !== null) && parts[0] > parts[1])
      return '用量范围应从小到大。';
    if (parts.some((n) => n === null) && /^[\d\s.+/–—~-]+$/.test(s))
      return '用量格式无效，请使用数字、分数或范围。';
    return '';
  }
  function scaleAmount(value, factor) {
    const s = String(value ?? '').trim(), parts = amountParts(s);
    if (!Number.isFinite(factor) || factor <= 0 || factor === 1 || amountIssue(s) || parts.some((n) => n === null)) return s;
    const scaled = parts.map((n) => n * factor);
    if (scaled.some((n) => !Number.isFinite(n))) return s;
    return scaled.map((n) => String(Number(n.toFixed(3)))).join('–');
  }

  root.MixCore = {
    clone,
    same,
    norm,
    now,
    uid,
    empty,
    amountIssue,
    materialRole,
    searchMaterials: (data, query, category, recent) => indexed(data, () => searchMaterials(data, query, category, recent)),
    scaleAmount,
    validate,
    match: (r, data) => indexed(data, () => match(r, data)),
    query: (data, f) => indexed(data, () => query(data, f)),
    merge,
    satisfies: (owned, required, data) => indexed(data, () => satisfies(owned, required, data)),
    have: (row, data) => indexed(data, () => have(row, data)),
    matches: (row, data) => indexed(data, () => matches(row, data)),
    installCatalog,
    reconcileMaterials: (data, catalog) => validate(reconcileMaterials(validate(data), validate(catalog))),
    ingredientPath: (id, data) => indexed(data, () => ingredientPath(id, data)),
    needsProduct,
    materialText: (i, data) => indexed(data, () => materialText(i, data)),
    analyze: (data) => indexed(data, () => new Map(data.recipes.map((r) => [r.id, match(r, data)]))),
  };
  if (typeof module !== "undefined") module.exports = root.MixCore;
})(typeof window !== "undefined" ? window : globalThis);
