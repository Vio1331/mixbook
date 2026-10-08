(async function () {
  "use strict";
  const C = window.MixCore,
    $ = (s) => document.querySelector(s),
    esc = (s) =>
      String(s ?? "").replace(
        /[&<>"']/g,
        (c) =>
          ({
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#39;",
          })[c],
      );
  const paths = {
    glass: '<path d="M4 4h16l-8 9L4 4Zm8 9v7m-5 0h10"/>',
    chevron: '<path d="m9 6 6 6-6 6"/>',
    book: '<path d="M4 4h6a3 3 0 0 1 2 1 3 3 0 0 1 2-1h6v15h-6a3 3 0 0 0-2 1 3 3 0 0 0-2-1H4V4Zm8 1v15"/>',
    bottle: '<path d="M9 3h6m-5 0v5l-3 4v8h10v-8l-3-4V3M7 14h10"/>',
    whiskey:
      '<path d="M9 2h6v3l-1 1v2c0 .8 4 2.6 4 6v7H6v-7c0-3.4 4-5.2 4-6V6L9 5V2Zm-1 12h8v5H8v-5Zm2-9h4"/><path d="M10 16h4m-3-2v5m2-5v5"/>',
    gin: '<path d="M9 3h6m-5 0v5L7 11v10h10V11l-3-3V3M7 13h10"/><path d="M12 19c-2-1-2-3 0-4 2 1 2 3 0 4Z"/>',
    rum: '<path d="M9 3h6m-5 0v5L7 11v10h10V11l-3-3V3M7 13h10"/><path d="m9 15.5 6 3m0-3-6 3"/>',
    tequila:
      '<path d="M9 3h6m-5 0v5L7 11v10h10V11l-3-3V3"/><path d="M12 20v-6m0 4-3-3m3 2 3-3m-3 5-2-1m2 1 2-1"/>',
    vodka:
      '<path d="M9 3h6m-5 0v5L7 11v10h10V11l-3-3V3M7 13h10"/><path d="m12 15 2 2-2 2-2-2 2-2Z"/>',
    brandy:
      '<path d="M10 3h4m-3 0v5c0 1-5 4-5 8 0 3 2 5 6 5s6-2 6-5c0-4-5-7-5-8V3m-5 12h8m-7 3h6"/>',
    amaro:
      '<path d="M9 3h6m-5 0v4c0 1-3 3-3 6v8h10v-8c0-3-3-5-3-6V3M9 14h6m-3-3c1-2 2-2 3-2"/>',
    bitters:
      '<path d="M10 3h4m-3 0v4l-3 3v11h8V10l-3-3V3M8 12h8"/><path d="M18 5c0-1 1-2 2-2 0 1 1 2 1 3a1.5 1.5 0 0 1-3 0Z"/>',
    beer: '<path d="M6 8v12h10V8H6Zm10 3h2a2 2 0 0 1 0 4h-2M6 8c0-2 1-3 3-3 1-2 4-2 5 0 2 0 3 1 3 3M9 11v6m4-6v6"/>',
    wine: '<path d="M10 2h4v7c0 1 2 2 2 4v8H8v-8c0-2 2-3 2-4V2"/><path d="M9 14h6v4H9zM10 5h4"/>',
    liqueur:
      '<path d="M9 3h6m-5 0v5l-3 4v8h10v-8l-3-4V3"/><path d="M10 16h4"/>',
    vermouth:
      '<path d="M9 3h6m-5 0v5l-3 4v8h10v-8l-3-4V3"/><path d="M9 14h6v4H9z"/>',
    port: '<path d="M9 2h6v5c0 1 3 3 3 6v8H6v-8c0-3 3-5 3-6V2Zm-1 12h8v5H8v-5Z"/><path d="M10 5h4m-4 11h4"/>',
    liquid:
      '<path d="M12 3s-6 7-6 12a6 6 0 0 0 12 0c0-5-6-12-6-12Z"/><path d="M9 16c.4 1.2 1.3 2 3 2"/>',
    solid:
      '<path d="M5 11h14l-2 9H7l-2-9Zm2 0c0-3 2-5 5-5s5 2 5 5"/><path d="M6 15h12"/>',
    aperitif: '<path d="M4 7h14l-7 7-7-7Zm7 7v6m-4 0h8M16 4l4 4m-4 0 4-4"/>',
    juice: '<path d="M7 6h10l1 15H6L7 6Zm1 4h9M9 6l2-3h5m-2 0 3 3"/>',
    produce:
      '<path d="M12 8c-2-3-7-2-8 3-1 5 3 10 8 10s9-5 8-10c-1-5-6-6-8-3Zm0 0c0-3 1-5 4-5m-4 3c-2-2-4-2-5-1"/>',
    syrup:
      '<path d="M9 4h6m-5 0v4l-3 3v10h10V11l-3-3V4M8 13h8m1-10h3v3m-3-1h3"/>',
    seasoning: '<path d="M8 7h8l2 14H6L8 7Zm0 4h8M9 3h.1m2.9 0h.1m2.9 0h.1"/>',
    soda: '<path d="M8 5h8l1 16H7L8 5Zm0 4h8M9 3h6"/><circle cx="19" cy="5" r="1"/><circle cx="20" cy="10" r="1"/>',
    food: '<path d="M6 8h12l-1 13H7L6 8Zm-1 0h14M8 5h8m-5-2h2M9 12h6m-3 0v5"/>',
    otherSpirits:
      '<path d="M9 3h6m-5 0v5l-3 4v8h10v-8l-3-4V3M7 14h10"/><path d="M9.5 17h.1m2.4 0h.1m2.4 0h.1"/>',
    multiSpirits:
      '<path d="M3 7h4M4 7v4l-2 2v8h6v-8l-2-2V7M2 16h6"/><path d="M10 3h4m-3 0v6l-2 3v9h6v-9l-2-3V3M9 15h6"/><path d="M17 7h4m-3 0v4l-2 2v8h6v-8l-2-2V7M16 17h6"/>',
    shake: '<path d="M7 3h10l-1 4 2 4-3 10H9L6 11l2-4-1-4Zm1 4h8M7 12h10"/>',
    stir: '<path d="M6 8h12l-1 13H7L6 8Zm.2 4h11.6M15 3l-4 15"/>',
    build: '<path d="M6 3h12l-1 18H7L6 3Zm1 5h10m-8 5h6m-5 4h4"/>',
    muddle:
      '<path d="M6 9h12l-1 12H7L6 9Zm.3 4h11.4"/><path d="M12 3v13m-1.5 0h3v3h-3v-3Z"/>',
    blend: '<path d="M7 3h10l-1 11H8L7 3Zm2 11h6l2 7H7l2-7Z"/>',
    roll: '<path d="M3 4h6l-1 8H4L3 4Zm12 8h6l-1 8h-4l-1-8Z"/><path d="M10 7h4m-2-2 2 2-2 2M14 17h-4m2 2-2-2 2-2"/>',
    cloud:
      '<path d="M7 17H6a4 4 0 1 1 1-7 6 6 0 0 1 12-1 4 4 0 0 1-1 8h-1m-5 4V11m-3 3 3-3 3 3"/>',
    check: '<path d="m5 12 4 4L19 6"/>',
    plus: '<path d="M12 5v14M5 12h14"/>',
    search: '<circle cx="10.5" cy="10.5" r="6.5"/><path d="m16 16 4 4"/>',
    heart:
      '<path d="M20 5a5 5 0 0 0-8 1 5 5 0 0 0-8-1c-4 4 0 9 8 15 8-6 12-11 8-15Z"/>',
    close: '<path d="m6 6 12 12M6 18 18 6"/>',
    arrow: '<path d="M4 12h16m-6-6 6 6-6 6"/>',
    filter: '<path d="M4 7h16M7 12h10m-7 5h4"/>',
    minus: '<path d="M5 12h14"/>',
    download: '<path d="M12 3v12m-4-4 4 4 4-4M4 17v4h16v-4"/>',
    upload: '<path d="M12 16V4m-4 4 4-4 4 4M4 17v4h16v-4"/>',
    edit: '<path d="m15 4 5 5M4 20l5-1L20 8a2 2 0 0 0-5-5L4 14v6Z"/>',
    copy: '<rect x="8" y="8" width="12" height="12" rx="2"/><path d="M15 8V4H4v11h4"/>',
    trash: '<path d="M3 6h18M9 6V3h6v3M5 6l1 15h12l1-15M10 10v7m4-7v7"/>',
    info: '<circle cx="12" cy="12" r="9"/><path d="M12 11v5m0-9v.1"/>',
    refresh:
      '<path d="M20 11a8 8 0 0 0-14-5L3 9m0-6v6h6M4 13a8 8 0 0 0 14 5l3-3m0 6v-6h-6"/>',
    offline:
      '<path d="M4 4 20 20M8 8a6 6 0 0 1 10 3 4 4 0 0 1 2 6M7 10a4 4 0 1 0-1 8h10"/>',
    bookmark: '<path d="M6 3h12v18l-6-4-6 4V3Z"/>',
    sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M4.9 4.9l1.4 1.4m11.4 11.4 1.4 1.4M2 12h2m16 0h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>',
    moon: '<path d="M20 15.5A8.5 8.5 0 0 1 8.5 4 8.5 8.5 0 1 0 20 15.5Z"/>',
  };
  const icon = (name) =>
    `<svg viewBox="0 0 24 24" aria-hidden="true">${paths[name] || paths.glass}</svg>`;
  const pantryIcons = {
    whiskey: "whiskey",
    gin: "gin",
    rum: "rum",
    agave: "tequila",
    vodka: "vodka",
    "brandy-root": "brandy",
    beer: "beer",
    wine: "wine",
    vermouth: "vermouth",
    "port-sherry": "port",
    "liqueur-root": "liqueur",
    "liquid-materials": "liquid",
    "solid-materials": "solid",
  };
  const baseIcons = {
    金酒: "gin",
    朗姆酒: "rum",
    伏特加: "vodka",
    龙舌兰: "tequila",
    威士忌: "whiskey",
    白兰地: "brandy",
    其他烈酒: "otherSpirits",
    多种烈酒: "multiSpirits",
  };
  const methodIcons = {
    摇和: "shake",
    搅拌: "stir",
    直调: "build",
    捣压: "muddle",
    搅打: "blend",
    旋调: "roll",
  };
  let pantryMenus = window.MixHierarchy?.get?.() || [];
  const pantryMenu = (id) =>
    pantryMenus.find(([root, items]) => root === id || items.includes(id));
  const pantryCategoryIcon = (id) => pantryIcons[id] || "bottle";
  const glassPaths = {
    cocktail: '<path d="M3.5 4h17L12 13 3.5 4Zm8.5 9v7m-5 0h10"/>',
    martini: '<path d="M4 4h16l-8 10L4 4Zm2.5 3h11M12 14v6m-4 0h8"/>',
    margarita:
      '<path d="M4 4h16l-2.5 4H15l-3 5-3-5H6.5L4 4Zm2.5 4h11M12 13v7m-4 0h8"/>',
    coupe: '<path d="M4 6c.5 4 3.4 6 8 6s7.5-2 8-6H4Zm8 6v8m-5 0h10"/>',
    champagne:
      '<path d="M7 3h10l-1.2 9a3.8 3.8 0 0 1-7.6 0L7 3Zm2 5h6m-3 8v4m-4 0h8"/>',
    wine: '<path d="M6 3h12l-1.2 7a4.9 4.9 0 0 1-9.6 0L6 3Zm.7 4h10.6M12 15v5m-4 0h8"/>',
    highball: '<path d="M6 3h12l-1 18H7L6 3Zm1 4h10"/>',
    collins: '<path d="M7 3h10l-1 18H8L7 3Zm.2 4h9.6"/>',
    rocks: '<path d="M5 7h14l-1 14H6L5 7Zm1 4h12"/>',
    hurricane:
      '<path d="M9 3h6c-.2 2.4-1.8 3.5-1.8 5.6 0 1.5 2.8 2.6 2.8 5 0 2.1-1.7 3.4-4 3.4s-4-1.3-4-3.4c0-2.4 2.8-3.5 2.8-5C10.8 6.5 9.2 5.4 9 3Zm3 14v4m-4 0h8"/>',
    copper: '<path d="M6 4h10v17H6V4Zm0 4h10m0-1h2a3.5 3.5 0 0 1 0 7h-2"/>',
    irish:
      '<path d="M7.5 3h9v9a4.5 4.5 0 0 1-9 0V3Zm.1 4h8.8m.1-1h1.5a3.5 3.5 0 0 1 0 7h-1.5M12 16.5V21M8 21h8"/>',
    tiki: '<path d="M6 3h12l-1 18H7L6 3Zm.2 4h11.6M6.5 12l3-3 2.5 3 2.5-3 3 3M7 17h10"/>',
    shot: '<path d="M7 7h10l-1 14H8L7 7Zm1.5 4h7"/>',
    beer: '<path d="M6 4h10v17H6V4Zm0 4h10m0-1h2a3.5 3.5 0 0 1 0 7h-2M9 11v7m3-7v7"/>',
    snifter:
      '<path d="M7 4h10l1 6a6 6 0 0 1-12 0l1-6Zm-.3 4h10.6M12 16v4m-4 0h8"/>',
    glass: '<path d="M5 5h14l-1 16H6L5 5Zm1 5h12"/>',
  };
  const glassTypes = [
    { name: "鸡尾酒杯", kind: "cocktail", match: /鸡尾酒杯/ },
    { name: "马天尼杯", kind: "martini", match: /马天尼/ },
    { name: "玛格丽特杯", kind: "margarita", match: /玛格丽特/ },
    { name: "碟形杯", kind: "coupe", match: /碟形|高脚碗/ },
    { name: "香槟杯", kind: "champagne", match: /香槟|笛/ },
    { name: "葡萄酒杯", kind: "wine", match: /葡萄酒/ },
    { name: "古典杯", kind: "rocks", match: /古典|平底|大号杯/ },
    { name: "高球杯", kind: "highball", match: /海波|高球|高杯/ },
    { name: "柯林杯", kind: "collins", match: /柯林/ },
    { name: "飓风杯", kind: "hurricane", match: /飓风/ },
    { name: "铜杯", kind: "copper", match: /铜杯/ },
    { name: "爱尔兰咖啡杯", kind: "irish", match: /咖啡杯/ },
    { name: "提基杯", kind: "tiki", match: /Tiki|提基|陶/ },
    { name: "子弹杯", kind: "shot", match: /子弹/ },
    { name: "啤酒杯", kind: "beer", match: /啤酒杯/ },
    { name: "白兰地杯", kind: "snifter", match: /白兰地杯/ },
  ];
  function glassType(name = "") {
    return glassTypes.find((type) => type.match.test(name));
  }
  function glassKind(name = "") {
    return glassType(name)?.kind || "glass";
  }
  const glassIcon = (name) => {
    const kind = glassKind(name);
    return `<svg class="glass-svg glass-svg-${kind}" viewBox="0 0 24 24" aria-hidden="true">${glassPaths[kind]}</svg>`;
  };

  paths.grid =
    '<rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>';
  paths.list = '<path d="M8 6h13M8 12h13M8 18h13M3 6h.1M3 12h.1M3 18h.1"/>';

  // Keep the v4 data format and stable catalog IDs: old backups remain importable.
  let db = null,
    storageError = "",
    env = {
      data: C.validate(C.clone(window.MIX_SEED)),
      base: null,
      syncId: "",
      sha: null,
      lastSync: null,
    };
  let view = "recipes",
    sort = "recent",
    filterOpen = false,
    pantrySection = "all",
    pantryTab = "owned",
    pantryQ = "",
    layout = "grid";
  let filters = {
    q: "",
    tags: [],
    base: "",
    sourceName: "",
    availability: "all",
    collection: "all",
    favorite: false,
    hideCatalog: false,
  };
  let config = {
      owner: "",
      repo: "",
      branch: "",
      path: "mixbook.json",
      auto: false,
    },
    token = "",
    remember = false,
    syncBusy = false,
    saveTimer = null,
    toastTimer = null;
  let editor = null,
    editorDraft = null,
    stockDraft = null,
    picker = null,
    selectedVersion = "",
    draftRecord = null,
    stockDraftRecord = null,
    draftTimer = null,
    searchTimer = null;
  let writeQueue = Promise.resolve(),
    detailScale = 1,
    cooking = false,
    cookChecks = new Set(),
    cookStep = 0,
    randomOrder = [];
  const rootIds = new Set(pantryMenus.map(([id]) => id));
  const recentKey = "mixbook.recent-materials",
    uiKey = "mixbook.ui",
    channel =
      typeof BroadcastChannel !== "undefined"
        ? new BroadcastChannel("mixbook-state")
        : null;
  function readLocal(key, fallback) {
    try {
      return JSON.parse(localStorage.getItem(key)) ?? fallback;
    } catch {
      return fallback;
    }
  }
  function writeLocal(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {}
  }
  let recentMaterials = readLocal(recentKey, []);
  try {
    config = { ...config, ...readLocal("mixbook.config", {}) };
    token =
      sessionStorage.getItem("mixbook.token") ||
      localStorage.getItem("mixbook.token") ||
      "";
    remember = !!localStorage.getItem("mixbook.token");
    layout = readLocal(uiKey, {}).layout === "list" ? "list" : "grid";
  } catch {}
  function dbRead(key) {
    if (!db) return Promise.resolve(null);
    return new Promise((resolve, reject) => {
      const tx = db.transaction("state", "readonly"),
        req = tx.objectStore("state").get(key);
      req.onsuccess = () => resolve(req.result);
      req.onerror = () => reject(req.error);
    });
  }
  function dbWrite(key, value) {
    if (!db) return Promise.resolve();
    return new Promise((resolve, reject) => {
      const tx = db.transaction("state", "readwrite");
      if (value === null) tx.objectStore("state").delete(key);
      else tx.objectStore("state").put(value, key);
      tx.oncomplete = resolve;
      tx.onerror = () => reject(tx.error);
      tx.onabort = () => reject(tx.error);
    });
  }
  // Read and write in a single IndexedDB transaction so two tabs cannot lose
  // independent edits between separate read and write transactions.
  function commit(makeNext) {
    return new Promise((resolve, reject) => {
      let next;
      if (!db) {
        try {
          next = makeNext(null);
          env = next;
          resolve(next);
        } catch (e) {
          reject(e);
        }
        return;
      }
      const tx = db.transaction("state", "readwrite"),
        store = tx.objectStore("state"),
        req = store.get("current");
      req.onsuccess = () => {
        try {
          next = makeNext(req.result);
          next.revision = C.uid();
          store.put(next, "current");
        } catch (e) {
          tx.abort();
          reject(e);
        }
      };
      tx.oncomplete = () => {
        env = next;
        channel?.postMessage(next.revision);
        resolve(next);
      };
      tx.onerror = () => reject(tx.error);
      tx.onabort = () => reject(tx.error || Error("保存事务已取消。"));
    });
  }
  async function persist(next) {
    const expected = C.clone(env);
    return commit((stored) => {
      if (stored && stored.revision !== expected.revision) {
        const merged = C.merge(
          expected.data,
          C.installCatalog(stored.data, window.MIX_SEED),
          next.data,
        );
        if (merged.conflicts.length)
          throw Error(
            "其他页面同时修改了数据，本机记录已保留。请刷新后再次同步。",
          );
        next.data = C.validate(merged.data);
      }
      return next;
    });
  }
  async function refreshState() {
    const stored = await dbRead("current");
    if (stored && stored.revision !== env.revision)
      env = {
        ...env,
        ...stored,
        data: C.installCatalog(stored.data, window.MIX_SEED),
      };
  }
  function update(change) {
    if (syncBusy) {
      toast("正在同步，请稍后再保存。");
      return Promise.resolve(false);
    }
    const task = writeQueue
      .then(async () => {
        await commit((stored) => {
          const next = C.clone(stored || env);
          next.data = C.installCatalog(next.data, window.MIX_SEED);
          change(next.data);
          next.data = C.validate(next.data);
          return next;
        });
        updateHeader();
        scheduleSync();
        return true;
      })
      .catch((e) => {
        toast("保存失败：" + e.message);
        return false;
      });
    writeQueue = task.then(() => {});
    return task;
  }
  function editing() {
    return [
      "editor-dialog",
      "item-dialog",
      "material-dialog",
      "sync-dialog",
    ].some((id) => $("#" + id)?.open);
  }
  function dirty() {
    return !env.base || !C.same(env.data, env.base);
  }
  function status() {
    return syncBusy
      ? "正在同步"
      : storageError
        ? "临时会话"
        : config.repo && env.lastSync
          ? dirty()
            ? "本机已保存 · 待同步"
            : "已同步"
          : "已存本机";
  }
  function dateText(v) {
    return v
      ? new Date(v).toLocaleString("zh-CN", {
          month: "2-digit",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
        })
      : "尚未同步";
  }
  function toast(message, undo = null) {
    const el = $("#toast");
    el.replaceChildren(document.createTextNode(message));
    if (undo) {
      const b = document.createElement("button");
      b.textContent = "撤销";
      b.onclick = async () => {
        await undo();
        el.classList.remove("show");
      };
      el.append(b);
    }
    el.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(
      () => el.classList.remove("show"),
      undo ? 8500 : 4200,
    );
  }
  function ingredient(id, data = env.data) {
    return data.ingredients.find((i) => i.id === id);
  }
  function ingredientName(id, data = env.data) {
    return ingredient(id, data)?.name || "材料已移除，请重新选择";
  }
  function rootOf(id, data = env.data) {
    return C.ingredientPath(id, data).find((i) => rootIds.has(i.id));
  }
  function pathName(id, data = env.data) {
    return C.ingredientPath(id, data)
      .map((i) => i.name)
      .filter((v, n, a) => n === 0 || v !== a[n - 1])
      .join(" / ");
  }
  function readyCount() {
    return env.data.recipes.filter((r) => C.match(r, env.data).ready).length;
  }
  function themeIsDark() {
    return (
      document.documentElement?.dataset.theme === "dark" ||
      (!document.documentElement?.dataset.theme &&
        typeof matchMedia === "function" &&
        matchMedia("(prefers-color-scheme: dark)").matches)
    );
  }
  function toggleTheme() {
    const next = themeIsDark() ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem("mixbook.theme", next);
    } catch {}
    $("meta[name=theme-color]")?.setAttribute(
      "content",
      next === "dark" ? "#15191b" : "#d94a32",
    );
    render();
  }
  function showDialog(el) {
    el._focus = document.activeElement;
    el.showModal();
    requestAnimationFrame(() => el.querySelector("[autofocus]")?.focus());
  }
  function closeDialog(el) {
    if (!el) return;
    el.close();
    el._focus?.isConnected && el._focus?.focus?.();
  }
  function safeLink(v) {
    try {
      const u = new URL(v);
      return u.protocol === "https:" ? u.href : "";
    } catch {
      return "";
    }
  }
  function selectOptions(values, value, blank = "请选择") {
    return `<option value="">${esc(blank)}</option>${values.map((v) => `<option value="${esc(v)}" ${v === value ? "selected" : ""}>${esc(v)}</option>`).join("")}`;
  }
  function nav() {
    const links = [
        ["recipes", "酒谱", "book"],
        ["pantry", "我的酒柜", "bottle"],
        ["settings", "同步与数据", "cloud"],
      ],
      buttons = () =>
        links
          .map(
            ([id, label, i]) =>
              `<button data-view="${id}" class="${view === id ? "active" : ""}" ${view === id ? 'aria-current="page"' : ""}>${icon(i)}<span>${label}</span></button>`,
          )
          .join("");
    return `<header class="topbar"><button class="brand" data-view="recipes" aria-label="喝了么首页"><span class="brand-icon">${icon("glass")}</span><span><strong>喝了么<span class="brand-period">.</span></strong><small>你的私人调酒手册</small></span></button><nav class="nav desktop-nav" aria-label="主要导航">${buttons()}</nav><div class="header-tools"><span class="top-status" role="status"><span class="status-dot"></span><span class="status-text">${esc(status())}</span></span><button class="icon-button theme-toggle" data-action="toggle-theme" aria-label="切换到${themeIsDark() ? "浅" : "深"}色模式">${icon(themeIsDark() ? "sun" : "moon")}</button></div></header><nav class="nav mobile-nav" aria-label="手机导航">${buttons()}</nav>`;
  }
  function heading(eyebrow, title, desc, action = "") {
    return `<div class="page-heading"><div><div class="eyebrow">${eyebrow}</div><h1>${title}</h1><p>${desc}</p></div>${action}</div>`;
  }
  function render() {
    const active = document.activeElement;
    $("#app").innerHTML =
      nav() +
      `<main id="main-content" class="shell" tabindex="-1">${storageError ? `<div class="notice" role="alert">${esc(storageError)}</div>` : ""}${view === "recipes" ? recipesPage() : view === "pantry" ? pantryPage() : settingsPage()}<footer class="footer"><span>喝了么 · 私人调酒手册</span><span>本机保存 / 离线可用 <span class="footer-version">v2.0</span></span></footer></main>`;
    if (view === "recipes") renderResults();
    if (view === "pantry") renderPantry();
  }
  function draftBanner(record, kind) {
    return record
      ? `<div class="draft-banner"><span>${icon("edit")} 上次的${kind === "recipe" ? "配方" : "酒柜"}草稿已保留${record.recipe?.name ? " · " + esc(record.recipe.name) : ""}</span><button class="link-button" data-action="resume-${kind}-draft">继续编辑 ${icon("arrow")}</button></div>`
      : "";
  }
  function recipesPage() {
    return (
      heading(
        "A LITTLE SPIRIT, A LOT OF POSSIBILITIES",
        "今晚，调一杯。",
        "发现经典，留下自己的配方。",
        `<button class="btn primary" data-action="new">${icon("plus")}新增配方</button>`,
      ) +
      draftBanner(draftRecord, "recipe") +
      `<div class="collection-bar"><div class="view-tabs" aria-label="酒谱范围">${[
        ["all", "全部酒谱"],
        ["mine", "我的配方"],
        ["favorites", "我的收藏"],
      ]
        .map(
          ([v, l]) =>
            `<button data-collection="${v}" class="${filters.collection === v ? "active" : ""}" aria-pressed="${filters.collection === v}">${l}<span>${v === "all" ? env.data.recipes.length : v === "mine" ? env.data.recipes.filter((r) => !r.catalog || r.versions.length).length : env.data.recipes.filter((r) => env.data.favorites[r.id]).length}</span></button>`,
        )
        .join(
          "",
        )}</div><span class="collection-note">${readyCount()} 份原料齐全</span></div><div class="workspace"><aside class="filter-rail ${filterOpen ? "mobile-open" : ""}" aria-label="筛选配方"><div class="filter-head"><h2>筛选酒谱</h2><button class="link-button" data-action="reset-filters">重置</button></div><div class="filter-block"><h3>基酒</h3><div class="base-filter-list">${[["", "全部基酒"], ...["金酒", "威士忌", "朗姆酒", "龙舌兰", "伏特加", "白兰地", "其他烈酒", "多种烈酒"].map((v) => [v, v])].map(([v, l]) => `<button class="filter-choice ${filters.base === v ? "active" : ""}" data-base-filter="${esc(v)}" aria-pressed="${filters.base === v}">${l}</button>`).join("")}</div></div><div class="filter-block"><h3>风味</h3><div class="chips">${env.data.options.tags.map((t) => `<button class="chip ${filters.tags.includes(t) ? "active" : ""}" data-filter-tag="${esc(t)}" aria-pressed="${filters.tags.includes(t)}">${esc(t)}</button>`).join("")}</div><p class="filter-caption">任一已选风味</p></div><div class="filter-block"><h3>我的原料</h3><label class="sr-only" for="availability-filter">原料筛选</label><select id="availability-filter">${[
        ["all", "全部配方"],
        ["ready", "原料齐全"],
        ["one", "只差一种"],
        ["alcohol", "酒类原料齐全"],
      ]
        .map(
          ([v, l]) =>
            `<option value="${v}" ${filters.availability === v ? "selected" : ""}>${l}</option>`,
        )
        .join(
          "",
        )}</select></div><div class="filter-block"><h3>来源</h3><label class="sr-only" for="source-filter">配方来源</label><select id="source-filter">${selectOptions(env.data.options.sources, filters.sourceName, "全部来源")}</select></div><div class="rail-note">${icon("bottle")}<strong>从酒柜找到灵感</strong><p>记录你已有的原料，看看今晚能调些什么。</p><button class="link-button" data-view="pantry">整理酒柜 ${icon("arrow")}</button></div></aside><section class="recipe-content" aria-label="配方列表"><div class="recipe-toolbar"><form id="recipe-search-form" role="search" class="recipe-search-form"><label class="search-field">${icon("search")}<span class="sr-only">搜索酒名、原料、风味或来源</span><input id="recipe-search" type="search" placeholder="搜索酒名、原料、风味…" value="${esc(filters.q)}" autocomplete="off"></label><button class="sr-only" type="submit">搜索</button></form><button class="btn small mobile-filter-toggle" data-action="toggle-filters" aria-expanded="${filterOpen}">${icon("filter")}筛选</button><label class="sort-control"><span class="sr-only">排序</span><select id="recipe-sort">${[
        ["recent", "最近更新"],
        ["name", "名称排序"],
        ["makeable", "缺料最少"],
        ["random", "随机灵感"],
      ]
        .map(
          ([v, l]) =>
            `<option value="${v}" ${sort === v ? "selected" : ""}>${l}</option>`,
        )
        .join(
          "",
        )}</select></label><div class="layout-toggle" aria-label="展示方式"><button data-layout="grid" class="${layout === "grid" ? "active" : ""}" aria-label="卡片视图" aria-pressed="${layout === "grid"}">${icon("grid")}</button><button data-layout="list" class="${layout === "list" ? "active" : ""}" aria-label="列表视图" aria-pressed="${layout === "list"}">${icon("list")}</button></div></div><div class="results-heading"><p id="results-summary" aria-live="polite"></p><div id="active-filters" class="chips"></div></div><div id="recipe-results" class="result-grid ${layout === "list" ? "is-list" : ""}"></div></section></div>`
    );
  }
  function photoPlaceholder(r, cls = "") {
    return `<div class="photo-placeholder ${cls}" aria-label="暂无配图">${glassIcon(r.glass)}<span>${esc(r.glass || "私人配方")}</span></div>`;
  }
  function photo(r, cls = "") {
    const url =
      safeLink(r.photoUrl) ||
      (r.image
        ? "./assets/cocktails/" + encodeURIComponent(r.image) + ".webp"
        : "");
    return url
      ? `<img class="${cls}" src="${esc(url)}" data-recipe-photo data-glass="${esc(r.glass || "")}" alt="${esc(r.name)}" loading="lazy" width="600" height="600">`
      : photoPlaceholder(r, cls);
  }
  function matchLabel(r) {
    const m = C.match(r, env.data),
      text = m.ready
        ? m.substitutions.length
          ? "可用替代原料"
          : "原料齐全"
        : m.missing.length === 1
          ? "缺 " + ingredientName(m.missing[0].id)
          : "缺 " + m.missing.length + " 种原料";
    return `<span class="match-label ${m.ready ? "ready" : m.missing.length === 1 ? "one" : ""}">${icon(m.ready ? "check" : "minus")}${esc(text)}</span>`;
  }
  function renderResults() {
    const queryData =
      filters.collection === "mine"
        ? {
            ...env.data,
            recipes: env.data.recipes.map((r) => {
              if (!r.catalog || !r.versions.length) return r;
              const v = r.versions.at(-1);
              return {
                ...r,
                ...v,
                id: r.id,
                name: r.name,
                en: r.en,
                versions: r.versions,
                versionId: v.id,
              };
            }),
          }
        : env.data;
    let result = C.query(queryData, {
      ...filters,
      availability:
        filters.availability === "alcohol" ? "all" : filters.availability,
    });
    if (filters.collection === "mine")
      result = result.filter((r) => !r.catalog || r.versions.length);
    if (filters.collection === "favorites")
      result = result.filter((r) => env.data.favorites[r.id]);
    if (filters.availability === "alcohol")
      result = result.filter((r) =>
        r.ingredients
          .filter(
            (x) =>
              !x.optional &&
              !["liquid-materials", "solid-materials"].includes(
                rootOf(x.id)?.id,
              ),
          )
          .every((x) => C.have(x, env.data)),
      );
    if (sort === "recent")
      result.sort(
        (a, b) =>
          b.updatedAt.localeCompare(a.updatedAt) ||
          a.name.localeCompare(b.name, "zh-CN"),
      );
    if (sort === "name")
      result.sort((a, b) => a.name.localeCompare(b.name, "zh-CN"));
    if (sort === "makeable")
      result.sort(
        (a, b) =>
          C.match(a, env.data).missing.length -
            C.match(b, env.data).missing.length ||
          a.name.localeCompare(b.name, "zh-CN"),
      );
    if (sort === "random") {
      if (!randomOrder.length) {
        randomOrder = env.data.recipes.map((r) => r.id);
        for (let i = randomOrder.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [randomOrder[i], randomOrder[j]] = [randomOrder[j], randomOrder[i]];
        }
      }
      result.sort(
        (a, b) => randomOrder.indexOf(a.id) - randomOrder.indexOf(b.id),
      );
    }
    $("#results-summary").textContent = result.length + " 份配方";
    $("#active-filters").innerHTML = [
      ...(filters.base ? [filters.base] : []),
      ...filters.tags,
      ...(filters.sourceName ? [filters.sourceName] : []),
    ]
      .map((t) => `<span class="chip quiet">${esc(t)}</span>`)
      .join("");
    $("#recipe-results").innerHTML = result.length
      ? result
          .map(
            (r) =>
              `<article class="recipe-card"><button class="card-visual" data-detail="${esc(r.id)}" data-detail-version="${esc(r.versionId || "")}" aria-label="查看${esc(r.name)}">${photo(r, "catalog-photo")}<span class="card-provenance">${r.versionId ? "我的版本" : r.catalog ? "经典配方" : "私人配方"}</span></button><button class="card-main" data-detail="${esc(r.id)}" data-detail-version="${esc(r.versionId || "")}"><h3>${esc(r.name)}</h3>${r.en ? `<p class="recipe-en">${esc(r.en)}</p>` : ""}<p class="card-facts">${[r.base, r.tags[0], r.method].filter(Boolean).map(esc).join(" · ")}</p>${layout === "list" ? `<p class="card-ingredients">${r.ingredients.map((x) => esc(ingredientName(x.id))).join(" / ")}</p>` : ""}</button><div class="card-bottom">${matchLabel(r)}<button class="icon-button ${env.data.favorites[r.id] ? "is-favorite" : ""}" data-favorite="${esc(r.id)}" aria-label="${env.data.favorites[r.id] ? "取消收藏" : "收藏"}${esc(r.name)}" aria-pressed="${!!env.data.favorites[r.id]}">${icon("heart")}</button></div></article>`,
          )
          .join("")
      : `<div class="empty">${icon("search")}<h3>${filters.collection === "mine" ? "留下你的第一杯。" : filters.collection === "favorites" ? "还没有收藏的配方" : "没有找到这杯酒"}</h3><p>${filters.collection === "mine" ? "新建配方，或在经典配方中添加自己的版本。" : "试着调整关键词或筛选条件。"}</p><button class="btn" data-action="${filters.collection === "mine" ? "new" : "reset-filters"}">${filters.collection === "mine" ? "新增配方" : "重置筛选"}</button></div>`;
  }

  function pantryPage() {
    const owned = env.data.pantryItems.length;
    return (
      heading(
        "GOOD DRINKS START HERE",
        "你的酒柜，更多可能。",
        `${owned} 种已有原料 · ${readyCount()} 份配方原料齐全`,
        `<button class="btn primary" data-action="${pantryTab === "owned" ? "add-stock" : "new-material"}">${icon("plus")}${pantryTab === "owned" ? "添加已有原料" : "新增原料定义"}</button>`,
      ) +
      draftBanner(stockDraftRecord, "stock") +
      `<div class="collection-bar"><div class="view-tabs"><button data-pantry-tab="owned" class="${pantryTab === "owned" ? "active" : ""}" aria-pressed="${pantryTab === "owned"}">我的酒柜<span>${owned}</span></button><button data-pantry-tab="directory" class="${pantryTab === "directory" ? "active" : ""}" aria-pressed="${pantryTab === "directory"}">原料目录<span>${env.data.ingredients.length}</span></button></div><button class="link-button" data-action="show-ready">看看能调什么 ${icon("arrow")}</button></div><div class="workspace pantry-workspace"><aside class="pantry-sidebar ${filterOpen ? "mobile-open" : ""}" aria-label="原料类别"><div class="filter-head"><h2>原料类别</h2></div><div class="pantry-category-list">${[["all", "全部原料", "grid"], ...pantryMenus.map(([id]) => [id, ingredientName(id), pantryCategoryIcon(id)])].map(([id, name, i]) => `<button data-pantry-section="${id}" class="filter-choice ${pantrySection === id ? "active" : ""}" aria-pressed="${pantrySection === id}">${icon(i)}<span>${esc(name)}</span><small>${pantryTab === "directory" ? env.data.ingredients.filter((i) => id === "all" || C.satisfies(i.id, id, env.data)).length : id === "all" ? owned : env.data.pantryItems.filter((x) => x.matches.some((m) => C.satisfies(m, id, env.data))).length}</small></button>`).join("")}</div></aside><section class="pantry-content"><div class="recipe-toolbar"><label class="search-field">${icon("search")}<span class="sr-only">搜索酒柜或原料</span><input id="pantry-search" type="search" autocomplete="off" placeholder="搜索名称、品牌或类别…" value="${esc(pantryQ)}"></label><button class="btn small mobile-filter-toggle" data-action="toggle-filters" aria-expanded="${filterOpen}">${icon("filter")}分类</button></div><div id="pantry-results"></div></section></div>`
    );
  }
  function renderPantry() {
    const terms = C.norm(pantryQ).split(/\s+/).filter(Boolean),
      title =
        pantrySection === "all"
          ? pantryTab === "owned"
            ? "全部已有原料"
            : "全部原料定义"
          : ingredientName(pantrySection);
    let items;
    if (pantryTab === "owned")
      items = env.data.pantryItems.filter(
        (x) =>
          (pantrySection === "all" ||
            x.matches.some((id) => C.satisfies(id, pantrySection, env.data))) &&
          terms.every((t) =>
            C.norm(
              [
                x.name,
                x.brand,
                ...x.matches.map((id) =>
                  C.materialText(ingredient(id), env.data),
                ),
                ...x.tags.map((id) => ingredientName(id)),
              ].join(" "),
            ).includes(t),
          ),
      );
    else
      items = env.data.ingredients.filter(
        (i) =>
          (pantrySection === "all" ||
            C.satisfies(i.id, pantrySection, env.data)) &&
          terms.every((t) => C.materialText(i, env.data).includes(t)),
      );
    $("#pantry-results").innerHTML =
      `<div class="section-heading"><h2>${esc(title)}</h2><span>${items.length} 项</span></div>${items.length ? `<div class="material-list">${items.map((item) => (pantryTab === "owned" ? stockCard(item) : directoryCard(item))).join("")}</div>` : `<div class="empty">${icon("bottle")}<h3>${pantryQ ? "没有找到匹配的原料" : "酒柜，等你来填满。"}</h3><p>${pantryQ ? "试试名称、英文名或品牌。" : "添加你已有的酒、果汁和调味材料，解锁更多配方。"}</p><button class="btn primary" data-action="add-stock">${icon("plus")}添加已有原料</button></div>`}`;
  }
  function stockCard(item) {
    const material = ingredient(item.matches[0]),
      root = rootOf(item.matches[0]),
      used = env.data.recipes.filter((r) =>
        r.ingredients.some(
          (x) => C.matches(x, { ...env.data, pantryItems: [item] }).length,
        ),
      ).length;
    return `<button class="stock-card" data-stock="${esc(item.id)}"><span class="material-avatar">${icon(pantryCategoryIcon(root?.id))}</span><span class="stock-identity"><strong>${esc(item.name)}</strong><small>${esc(item.brand || pathName(material?.id))}</small>${
      item.tags.length
        ? `<span class="mini-tags">${item.tags
            .slice(0, 3)
            .map((id) => `<span>${esc(ingredientName(id))}</span>`)
            .join("")}</span>`
        : ""
    }</span><span class="stock-usage">用于 ${used} 份配方</span><span class="stock-state">${icon("check")} 已拥有</span>${icon("chevron")}</button>`;
  }
  function directoryCard(item) {
    const owned = env.data.pantryItems.some((x) =>
      C.have({ id: item.id }, { ...env.data, pantryItems: [x] }),
    );
    return `<article class="directory-card"><span class="material-avatar">${icon(pantryCategoryIcon(rootOf(item.id)?.id))}</span><div class="stock-identity"><strong>${esc(item.name)}</strong><small>${esc(pathName(item.id))}</small></div><span class="material-kind">${item.kind === "type" ? "通用类别" : item.brand ? "具体产品" : "原料"}</span><button class="btn small ${owned ? "" : "primary"}" data-add-material-stock="${esc(item.id)}">${owned ? "再添加" : "加入酒柜"}</button>${item.customized ? `<button class="icon-button" data-edit-material="${esc(item.id)}" aria-label="修改${esc(item.name)}">${icon("edit")}</button>` : ""}</article>`;
  }

  function materialButton(id, data = env.data, action = "choose-material") {
    const item = ingredient(id, data);
    return `<button type="button" class="material-target ${item ? "" : "unselected"}" data-action="${action}"><span>${item ? `<strong>${esc(item.name)}</strong><small>${esc(item.kind === "type" ? "通用要求 · " + pathName(id, data) : pathName(id, data))}</small>` : "搜索或选择原料"}</span>${icon("search")}</button>`;
  }
  function libraryOptions(data) {
    return data.ingredients
      .filter((i) => i.kind === "type")
      .map(
        (i) =>
          `<option value="${esc(i.id)}">${esc(pathName(i.id, data))}</option>`,
      )
      .join("");
  }
  function openPicker(data, onSelect, options = {}) {
    picker = {
      data,
      onSelect,
      scope: options.scope || "recipe",
      q: "",
      category: options.category || "",
      limit: 60,
      kind: "all",
    };
    const el = $("#material-dialog");
    el.innerHTML = `<div class="dialog-top"><div><span>选择原料</span><p>搜索整个目录，也可以直接新增。</p></div><button class="icon-button" data-close="material-dialog" aria-label="关闭原料选择">${icon("close")}</button></div><div class="picker-controls"><label class="search-field">${icon("search")}<span class="sr-only">搜索原料名称、别名或品牌</span><input id="material-search" type="search" autofocus autocomplete="off" placeholder="例如：金酒、柠檬汁、Cointreau"></label><label><span class="sr-only">原料类别</span><select id="material-category"><option value="">全部类别</option>${pantryMenus.map(([id]) => `<option value="${id}" ${picker.category === id ? "selected" : ""}>${esc(ingredientName(id, data))}</option>`).join("")}</select></label></div><div class="picker-body"><div id="material-results"></div><details class="quick-new"><summary>找不到？新增原料</summary><form id="quick-material-form"><label class="field">原料名称<input name="name" required maxlength="100" autocomplete="off"></label><label class="field">所属类别<select name="parentId" required><option value="">请选择类别</option>${libraryOptions(data)}</select></label><div class="field-row"><label class="field">记录类型<select name="kind"><option value="product">原料 / 具体产品</option><option value="type">通用类别</option></select></label><label class="field">品牌（可选）<input name="brand" maxlength="100"></label></div><label class="field">英文名 / 别名（可选）<input name="aliases" maxlength="500" placeholder="多个名称用逗号分隔"></label><p class="form-error" id="quick-error" role="alert"></p><button class="btn primary" type="submit">新增并选择</button></form></details></div>`;
    renderPicker();
    showDialog(el);
  }
  function renderPicker() {
    if (!picker) return;
    const { data, q, category, limit } = picker,
      terms = C.norm(q).split(/\s+/).filter(Boolean),
      usage = new Map();
    data.recipes.forEach((r) =>
      r.ingredients.forEach((x) => usage.set(x.id, (usage.get(x.id) || 0) + 1)),
    );
    const owned = (id) => C.have({ id }, data);
    let found = data.ingredients.filter(
      (i) =>
        (!category || C.satisfies(i.id, category, data)) &&
        terms.every((t) => C.materialText(i, data).includes(t)),
    );
    found.sort((a, b) => {
      if (q) {
        const score = (i) =>
          C.norm(i.name) === C.norm(q)
            ? 4
            : C.norm(i.name).startsWith(C.norm(q))
              ? 3
              : i.aliases.some((x) => C.norm(x) === C.norm(q))
                ? 2
                : 0;
        return score(b) - score(a) || Number(owned(b.id)) - Number(owned(a.id));
      }
      return (
        Number(owned(b.id)) - Number(owned(a.id)) ||
        (recentMaterials.includes(b.id)
          ? 100 - recentMaterials.indexOf(b.id)
          : 0) -
          (recentMaterials.includes(a.id)
            ? 100 - recentMaterials.indexOf(a.id)
            : 0) ||
        (usage.get(b.id) || 0) - (usage.get(a.id) || 0) ||
        a.name.localeCompare(b.name, "zh-CN")
      );
    });
    $("#material-results").innerHTML =
      `<div class="picker-result-head"><span>${q ? "搜索结果" : "酒柜已有与常用原料"}</span><small>${found.length} 项</small></div>${
        found.length
          ? `<div class="picker-list">${found
              .slice(0, limit)
              .map(
                (i) =>
                  `<button type="button" class="picker-item" data-pick="${esc(i.id)}"><span class="material-avatar">${icon(pantryCategoryIcon(rootOf(i.id, data)?.id))}</span><span><strong>${esc(i.name)}</strong><small>${esc(pathName(i.id, data))}</small></span><span class="picker-kind">${owned(i.id) ? '<span class="owned-dot">已拥有</span>' : i.kind === "type" ? "不限品牌" : i.brand ? esc(i.brand) : "原料"}</span>${icon("plus")}</button>`,
              )
              .join(
                "",
              )}</div>${found.length > limit ? '<button class="btn picker-more" data-action="more-materials">显示更多原料</button>' : ""}`
          : '<div class="picker-empty">没有找到匹配项，可以在下方新增。</div>'
      }`;
    const quick = $("#quick-material-form");
    if (quick && quick.elements.name.value === (picker.autoName || "")) {
      quick.elements.name.value = q.trim();
      picker.autoName = q.trim();
    }
  }
  function rememberMaterial(id) {
    recentMaterials = [id, ...recentMaterials.filter((x) => x !== id)].slice(
      0,
      20,
    );
    writeLocal(recentKey, recentMaterials);
  }
  function choosePicked(id) {
    if (!picker) return;
    const item = ingredient(id, picker.data),
      callback = picker.onSelect;
    rememberMaterial(id);
    closeDialog($("#material-dialog"));
    picker = null;
    callback(item);
  }
  async function createQuick(form) {
    const f = new FormData(form),
      name = String(f.get("name") || "").trim(),
      parent = ingredient(String(f.get("parentId")), picker.data),
      kind = String(f.get("kind"));
    if (!name || !parent) {
      $("#quick-error").textContent = "请填写名称并选择所属类别。";
      return;
    }
    const existing = picker.data.ingredients.find((i) =>
      [i.name, ...i.aliases].some((x) => C.norm(x) === C.norm(name)),
    );
    if (existing) {
      choosePicked(existing.id);
      return;
    }
    const item = {
      id: C.uid(),
      name,
      parentId: parent.id,
      category: parent.category,
      kind,
      brand: kind === "product" ? String(f.get("brand")).trim() : "",
      aliases: String(f.get("aliases") || "")
        .split(/[,，]/)
        .map((x) => x.trim())
        .filter(Boolean),
      tags: [],
      image: "",
      matchParent: true,
      customized: true,
    };
    picker.data.ingredients.push(item);
    if (picker.scope === "directory") {
      if (!(await update((d) => d.ingredients.push(C.clone(item))))) return;
    }
    choosePicked(item.id);
  }

  function rowMarkup(
    row = { id: "", amount: "", unit: "ml", optional: false, alternatives: [] },
    section = "ingredients",
  ) {
    return `<div class="ingredient-edit-row" data-section="${section}"><input type="hidden" name="ingredientId" value="${esc(row.id)}"><div class="ingredient-edit-main">${materialButton(row.id, editorDraft)}<label class="amount-field"><span>用量</span><input name="amount" autocomplete="off" inputmode="decimal" required maxlength="40" value="${esc(row.amount)}" placeholder="30 / 适量"></label><label class="unit-field"><span>单位</span><input name="unit" list="unit-options" autocomplete="off" maxlength="30" value="${esc(row.unit)}" placeholder="ml"></label><button type="button" class="icon-button" data-action="remove-row" aria-label="移除这一项">${icon("close")}</button></div><div class="row-settings"><label class="optional-check"><input name="optional" type="checkbox" ${row.optional ? "checked" : ""}>可选</label>${section === "ingredients" ? `<button type="button" class="link-button alternative-add" data-action="add-alternative">添加替代原料</button>` : ""}<div class="alternative-list">${(row.alternatives || []).map((id) => alternativeMarkup(id)).join("")}</div></div><p class="row-error" role="alert"></p></div>`;
  }
  function alternativeMarkup(id) {
    return `<span class="chip" data-alternative="${esc(id)}">${esc(ingredientName(id, editorDraft))}<button type="button" data-action="remove-alternative" aria-label="移除${esc(ingredientName(id, editorDraft))}">×</button></span>`;
  }
  function readRow(el) {
    return {
      id: el.querySelector("[name=ingredientId]").value,
      amount: el.querySelector("[name=amount]").value.trim(),
      unit: el.querySelector("[name=unit]").value.trim(),
      optional: el.querySelector("[name=optional]").checked,
      alternatives: [...el.querySelectorAll("[data-alternative]")].map(
        (x) => x.dataset.alternative,
      ),
    };
  }
  function captureEditor() {
    if (!editor || !$("#recipe-form")) return;
    const form = $("#recipe-form"),
      f = new FormData(form);
    editor.recipe = {
      ...editor.recipe,
      name: String(f.get("name") || ""),
      en: String(f.get("en") || ""),
      author: String(f.get("author") || ""),
      base: String(f.get("base") || ""),
      method: String(f.get("method") || ""),
      glass: String(f.get("glass") || ""),
      source: String(f.get("source") || ""),
      sourceName: String(f.get("sourceName") || ""),
      notes: String(f.get("notes") || ""),
      image: String(f.get("image") || ""),
      photoUrl: String(f.get("photoUrl") || ""),
      parentId: String(f.get("parentId") || ""),
      tags: f.getAll("tags").map(String),
      ingredients: [
        ...form.querySelectorAll("#editor-ingredients .ingredient-edit-row"),
      ].map(readRow),
      garnishes: [
        ...form.querySelectorAll("#editor-garnishes .ingredient-edit-row"),
      ].map(readRow),
      steps: String(f.get("steps") || "").split("\n"),
    };
    editor.library = editorDraft;
  }
  async function stashEditor() {
    if (!editor) return;
    captureEditor();
    draftRecord = C.clone(editor);
    draftRecord.savedAt = C.now();
    writeLocal("mixbook.recipe-draft", draftRecord);
    try {
      await dbWrite("editor-draft", draftRecord);
      $("#draft-status") &&
        ($("#draft-status").textContent = db
          ? "草稿已保留"
          : "草稿保留在本次会话");
    } catch {
      toast("草稿暂未保存，请保持页面打开。");
    }
  }
  function queueDraft() {
    clearTimeout(draftTimer);
    draftTimer = setTimeout(() => {
      if (editor) stashEditor();
      if (stockDraft) stashStock();
    }, 350);
  }
  async function startEditor(id = null, mode = "recipe", versionId = "") {
    if (syncBusy) {
      toast("请等待同步完成。");
      return;
    }
    if (draftRecord && !editor) {
      const choice = await confirmChoice(
        "你有一份未完成的配方",
        "可以继续编辑，或放弃旧草稿后开始。",
        [
          ["resume", "继续旧草稿", "primary"],
          ["new", "开始新配方", ""],
          ["cancel", "取消", ""],
        ],
      );
      if (choice === "resume") {
        openEditorDraft(draftRecord);
        return;
      }
      if (choice !== "new") return;
      draftRecord = null;
      try {
        localStorage.removeItem("mixbook.recipe-draft");
      } catch {}
      await dbWrite("editor-draft", null);
    }
    const base = env.data.recipes.find((r) => r.id === id);
    if (base?.catalog && mode === "recipe") mode = "version";
    const v = base?.versions.find((x) => x.id === versionId);
    let recipe = C.clone(
      base || {
        name: "",
        en: "",
        base: "",
        method: "",
        glass: "",
        tags: [],
        ingredients: [{ id: "", amount: "", unit: "ml", optional: false }],
        garnishes: [],
        steps: [""],
        notes: "",
        source: "",
        sourceName: "",
        parentId: "",
        versions: [],
        image: "",
        photoUrl: "",
      },
    );
    if (mode === "version") {
      recipe = {
        ...recipe,
        ...(v || {}),
        name: v?.name || "",
        author: v?.author || "",
      };
    }
    if (mode === "duplicate") recipe.name += " · 副本";
    if (mode === "variant") {
      recipe.name = "";
      recipe.en = "";
      recipe.parentId = id;
    }
    editor = {
      id: mode === "duplicate" || mode === "variant" ? null : id,
      mode,
      versionId,
      recipe,
      original: C.clone(base),
      library: C.clone(env.data),
    };
    openEditorDraft(editor);
  }
  function openEditorDraft(record) {
    editor = C.clone(record);
    editorDraft = editor.library;
    const missing = env.data.ingredients.filter(
      (i) => !editorDraft.ingredients.some((x) => x.id === i.id),
    );
    editorDraft.ingredients.push(...C.clone(missing));
    if ($("#detail-dialog").open) closeDialog($("#detail-dialog"));
    const r = editor.recipe,
      isVersion = editor.mode === "version",
      el = $("#editor-dialog");
    el.innerHTML = `<form id="recipe-form" novalidate><div class="dialog-top"><div><span>${isVersion ? "我的配方版本" : editor.mode === "variant" ? "创建变体" : editor.id ? "编辑配方" : "新增配方"}</span><p id="draft-status">填写即保留草稿</p></div><button type="button" class="icon-button" data-close="editor-dialog" aria-label="保存草稿并关闭">${icon("close")}</button></div><div class="editor-body"><nav class="editor-sections" aria-label="编辑区域"><a href="#editor-identity">基本信息</a><a href="#editor-materials">原料组成</a><a href="#editor-method">调制步骤</a><a href="#editor-more">其他信息</a></nav><section id="editor-identity" class="editor-section"><div class="section-heading"><h2>01 <span>基本信息</span></h2></div><div class="field-row"><label class="field">${isVersion ? "版本名称" : "酒名"} <span class="required">*</span><input name="name" autofocus required maxlength="100" value="${esc(r.name)}" placeholder="${isVersion ? "例如：偏金酒的 45 / 30 / 30" : "例如：我的尼格罗尼"}"></label><label class="field">${isVersion ? "记录者（可选）" : "英文名（可选）"}<input name="${isVersion ? "author" : "en"}" maxlength="100" value="${esc(isVersion ? r.author || "" : r.en || "")}"></label></div>${isVersion ? `<p class="hint">此版本属于“${esc(env.data.recipes.find((x) => x.id === editor.id)?.name || "原配方")}”，标准配方会保留。</p>` : ""}</section><section id="editor-materials" class="editor-section"><div class="section-heading"><h2>02 <span>原料组成</span></h2><button type="button" class="link-button" data-action="toggle-paste">多行粘贴</button></div><div id="paste-panel" class="paste-panel" hidden><label class="field">每行一种原料<textarea id="paste-ingredients" rows="4" placeholder="金酒 30 ml&#10;金巴利 30 ml&#10;甜味美思 30 ml"></textarea></label><div class="row"><button type="button" class="btn small" data-action="parse-paste">添加到原料表</button><span id="paste-status" class="hint" role="status"></span></div></div><div id="editor-ingredients">${(r.ingredients.length ? r.ingredients : [{}]).map((x) => rowMarkup({ amount: "", unit: "ml", optional: false, ...x })).join("")}</div><button type="button" class="btn add-row" data-add-row="ingredients">${icon("plus")}添加原料</button><details class="garnish-editor" ${r.garnishes.length ? "open" : ""}><summary>装饰 <span>${r.garnishes.length ? "已添加 " + r.garnishes.length + " 项" : "可选填写"}</span></summary><div id="editor-garnishes">${r.garnishes.map((x) => rowMarkup(x, "garnishes")).join("")}</div><button class="link-button" type="button" data-add-row="garnishes">${icon("plus")}添加装饰</button></details><datalist id="unit-options">${["ml", "吧匙", "茶匙", "汤匙", "dash", "滴", "片", "枝", "颗", "撮", "块", "份", "补满", "冲洗"].map((x) => `<option value="${x}"></option>`).join("")}</datalist></section><section id="editor-method" class="editor-section"><div class="section-heading"><h2>03 <span>调制步骤</span></h2></div><label class="field">每行一个步骤 <span class="required">*</span><textarea name="steps" required rows="5" placeholder="材料加冰摇匀。&#10;滤入预冷鸡尾酒杯。">${esc(r.steps.join("\n"))}</textarea></label><div class="field-row"><label class="field">调制方式<select name="method">${selectOptions(["摇和", "搅拌", "直调", "捣压", "搅打", "旋调"], r.method, "暂不指定")}</select></label><label class="field">杯型<select name="glass">${selectOptions([...new Set([...env.data.options.glasses, r.glass].filter(Boolean))], r.glass, "暂不指定")}</select></label></div></section><section id="editor-more" class="editor-section"><details class="editor-advanced" ${r.notes ? "open" : ""}><summary>其他信息 <span>风味、来源与笔记</span></summary><div class="field-row"><label class="field">基酒<select name="base">${selectOptions(["金酒", "朗姆酒", "伏特加", "龙舌兰", "威士忌", "白兰地", "其他烈酒", "多种烈酒"], r.base, "保存时根据原料推断")}</select></label><label class="field">配方来源<input name="sourceName" list="source-options" maxlength="200" value="${esc(r.sourceName || "")}" placeholder="个人配方 / 书名 / 调酒师"><datalist id="source-options">${env.data.options.sources.map((x) => `<option value="${esc(x)}"></option>`).join("")}</datalist></label></div><fieldset class="tag-picker"><legend>风味标签</legend><div class="chips">${[...new Set([...env.data.options.tags, ...r.tags])].map((t) => `<label class="chip pick-chip"><input name="tags" type="checkbox" value="${esc(t)}" ${r.tags.includes(t) ? "checked" : ""}>${esc(t)}</label>`).join("")}</div></fieldset><div class="inline-tag-add"><label class="sr-only" for="new-recipe-tag">新增风味标签</label><input id="new-recipe-tag" maxlength="60" placeholder="新增风味标签"><button type="button" class="btn small" data-action="add-recipe-tag">添加</button></div><label class="field">配方笔记<textarea name="notes" maxlength="10000" rows="3" placeholder="喜欢的比例、调整原因、制作心得…">${esc(r.notes || "")}</textarea></label><label class="field">来源链接 / 书名页码<input name="source" maxlength="2000" value="${esc(r.source || "")}"></label>${
      !isVersion
        ? `<label class="field">关联原配方<select name="parentId"><option value="">独立配方</option>${env.data.recipes
            .filter(
              (x) => x.id !== editor.id && !recipeDescendant(x.id, editor.id),
            )
            .map(
              (x) =>
                `<option value="${esc(x.id)}" ${r.parentId === x.id ? "selected" : ""}>${esc(x.name)}${x.en ? " · " + esc(x.en) : ""}</option>`,
            )
            .join(
              "",
            )}</select></label><div class="field-row"><label class="field">使用已有配图<select name="image"><option value="">暂无配图</option>${window.MIX_SEED.recipes.map((x) => `<option value="${esc(x.image)}" ${r.image === x.image ? "selected" : ""}>${esc(x.name)}</option>`).join("")}</select></label><label class="field">自定义图片链接（HTTPS）<input name="photoUrl" type="url" value="${esc(r.photoUrl || "")}" maxlength="2000" placeholder="https://…"></label></div>`
        : `<input type="hidden" name="en" value="${esc(r.en || "")}"><input type="hidden" name="image" value="${esc(r.image || "")}"><input type="hidden" name="photoUrl" value="${esc(r.photoUrl || "")}"><input type="hidden" name="parentId" value="${esc(r.parentId || "")}">`
    }</details></section><div id="editor-error" class="form-error" role="alert"></div></div><div class="dialog-actions"><button type="button" class="link-button danger left" data-action="discard-editor">放弃草稿</button><button class="btn" type="button" data-close="editor-dialog">稍后继续</button><button class="btn primary" type="submit">保存${isVersion ? "版本" : "配方"}</button></div></form>`;
    showDialog(el);
    stashEditor();
  }
  function recipeDescendant(id, parent) {
    let r = env.data.recipes.find((x) => x.id === id),
      seen = new Set();
    while (r?.parentId && !seen.has(r.id)) {
      seen.add(r.id);
      if (r.parentId === parent) return true;
      r = env.data.recipes.find((x) => x.id === r.parentId);
    }
    return false;
  }
  function inferBase(rows) {
    const names = new Map([
        ["gin", "金酒"],
        ["rum", "朗姆酒"],
        ["whiskey", "威士忌"],
        ["agave", "龙舌兰"],
        ["vodka", "伏特加"],
        ["brandy-root", "白兰地"],
      ]),
      bases = [
        ...new Set(
          rows
            .map((x) => names.get(rootOf(x.id, editorDraft)?.id))
            .filter(Boolean),
        ),
      ];
    return bases.length > 1 ? "多种烈酒" : bases[0] || "";
  }
  function includeMaterials(target, library, ids) {
    const pending = [...ids],
      seen = new Set();
    while (pending.length) {
      const id = pending.pop();
      if (!id || seen.has(id)) continue;
      seen.add(id);
      if (target.ingredients.some((i) => i.id === id)) continue;
      const material = library.ingredients.find((i) => i.id === id);
      if (!material) throw Error("原料定义已移除，请重新选择原料。");
      target.ingredients.push(C.clone(material));
      pending.push(material.parentId, ...(material.tags || []));
    }
  }
  async function saveRecipe(form) {
    captureEditor();
    const r = editor.recipe;
    form
      .querySelectorAll(".invalid")
      .forEach((x) => x.classList.remove("invalid"));
    form.querySelectorAll(".row-error").forEach((x) => (x.textContent = ""));
    let first = null;
    for (const row of form.querySelectorAll(".ingredient-edit-row")) {
      const v = readRow(row),
        error = !ingredient(v.id, editorDraft)
          ? "请选择一种原料。"
          : C.amountIssue(v.amount);
      if (error) {
        row.querySelector(".row-error").textContent = error;
        row.classList.add("invalid");
        first ||= row.querySelector(
          v.id ? "[name=amount]" : ".material-target",
        );
      }
    }
    if (!r.name.trim()) {
      first ||= form.elements.name;
      $("#editor-error").textContent = "请填写名称。";
    } else if (!r.steps.some((x) => x.trim())) {
      first ||= form.elements.steps;
      $("#editor-error").textContent = "请填写至少一个调制步骤。";
    } else if (r.photoUrl && !safeLink(r.photoUrl)) {
      first ||= form.elements.photoUrl;
      $("#editor-error").textContent = "图片链接需要使用 HTTPS。";
    } else $("#editor-error").textContent = "";
    if (first) {
      first.focus();
      first.scrollIntoView({ block: "center" });
      await stashEditor();
      return;
    }
    const button = form.querySelector("button[type=submit]");
    button.disabled = true;
    try {
      await refreshState();
      const current = env.data.recipes.find((x) => x.id === editor.id);
      if (editor.id && (!current || !C.same(current, editor.original))) {
        const choice = await confirmChoice(
          "这份配方已在其他页面更新",
          "继续保存会采用本次编辑内容。其他配方和酒柜记录会保留。",
          [
            ["cancel", "返回编辑", ""],
            ["yes", "保存本次内容", "primary"],
          ],
        );
        if (choice !== "yes") return;
        if (!current) {
          $("#editor-error").textContent = "原配方已被删除，请先保留草稿。";
          return;
        }
      }
      const id = editor.id || C.uid(),
        versionId = editor.versionId || C.uid(),
        mode = editor.mode,
        record = {
          ...C.clone(r),
          name: r.name.trim(),
          steps: r.steps.map((x) => x.trim()).filter(Boolean),
          base: r.base || inferBase(r.ingredients),
          sourceName: r.sourceName.trim(),
          notes: r.notes.trim(),
          id,
          createdAt: current?.createdAt || C.now(),
          updatedAt: C.now(),
          catalog: false,
          customized: false,
          sample: false,
          versions: current?.versions || [],
        };
      const ok = await update((d) => {
        includeMaterials(
          d,
          editorDraft,
          [...record.ingredients, ...record.garnishes].flatMap((x) => [
            x.id,
            ...(x.alternatives || []),
          ]),
        );
        d.options.tags = [...new Set([...d.options.tags, ...record.tags])];
        if (record.sourceName && !d.options.sources.includes(record.sourceName))
          d.options.sources.push(record.sourceName);
        if (mode === "version") {
          const parent = d.recipes.find((x) => x.id === id);
          if (!parent) throw Error("原配方已移除。");
          const v = {
            id: versionId,
            name: record.name,
            author: r.author.trim(),
            ingredients: record.ingredients,
            garnishes: record.garnishes,
            steps: record.steps,
            notes: record.notes,
            base: record.base,
            method: record.method,
            glass: record.glass,
            tags: record.tags,
            source: record.source,
            sourceName: record.sourceName,
            createdAt:
              parent.versions.find((x) => x.id === versionId)?.createdAt ||
              C.now(),
            updatedAt: C.now(),
          };
          const n = parent.versions.findIndex((x) => x.id === versionId);
          if (n >= 0) parent.versions[n] = v;
          else parent.versions.push(v);
          parent.updatedAt = C.now();
        } else {
          const n = d.recipes.findIndex((x) => x.id === id);
          if (n >= 0) d.recipes[n] = record;
          else d.recipes.unshift(record);
        }
      });
      if (ok) {
        clearTimeout(draftTimer);
        await dbWrite("editor-draft", null);
        draftRecord = null;
        try {
          localStorage.removeItem("mixbook.recipe-draft");
        } catch {}
        closeDialog($("#editor-dialog"));
        editor = null;
        editorDraft = null;
        render();
        openDetail(id, mode === "version" ? versionId : "");
        scheduleSync();
        toast("已保存到本机。");
      }
    } catch (e) {
      $("#editor-error").textContent = e.message;
    } finally {
      button.disabled = false;
    }
  }
  function parsePaste() {
    const lines = $("#paste-ingredients")
      .value.split("\n")
      .map((x) => x.trim())
      .filter(Boolean);
    if (!lines.length) return;
    let added = 0,
      unmatched = [];
    for (const line of lines) {
      const m = line.match(
        /^(.+?)\s+(\d+(?:\.\d+)?(?:\/\d+)?|适量|少许|补满|半)(?:\s*([^\d\s].*))?$/,
      );
      if (!m) {
        unmatched.push(line);
        continue;
      }
      const name = C.norm(m[1]),
        item = editorDraft.ingredients.find((i) =>
          [i.name, ...i.aliases].some((x) => C.norm(x) === name),
        );
      if (!item) {
        unmatched.push(line);
        continue;
      }
      const container = $("#editor-ingredients"),
        empty =
          container.children.length === 1 &&
          !readRow(container.firstElementChild).id &&
          !readRow(container.firstElementChild).amount;
      if (empty) container.innerHTML = "";
      container.insertAdjacentHTML(
        "beforeend",
        rowMarkup({
          id: item.id,
          amount: m[2],
          unit: (m[3] || "ml").trim(),
          optional: false,
        }),
      );
      added++;
    }
    $("#paste-ingredients").value = unmatched.join("\n");
    $("#paste-status").textContent =
      `已添加 ${added} 项${unmatched.length ? "；还有 " + unmatched.length + " 行未识别，请检查名称与格式。" : ""}`;
    stashEditor();
  }

  function versionRecipe(base, id) {
    const v = base.versions.find((x) => x.id === id);
    return v ? { ...base, ...v, id: base.id } : base;
  }
  function detailRows(rows, section) {
    return rows
      .map((x, n) => {
        const found = C.matches(x, env.data),
          primary = C.matches({ ...x, alternatives: [] }, env.data),
          key = section + "-" + n;
        return `<div class="ingredient-row ${found.length ? "have" : "missing"} ${cookChecks.has(key) ? "used" : ""}"><button class="ingredient-state ${cooking ? "interactive" : ""}" ${cooking ? `data-cook-check="${key}" aria-pressed="${cookChecks.has(key)}" aria-label="${cookChecks.has(key) ? "取消标记" : "标记已使用"}${esc(ingredientName(x.id))}"` : 'disabled tabindex="-1"'}>${icon(cookChecks.has(key) ? "check" : found.length ? "check" : "minus")}</button><div class="ingredient-identity"><strong>${esc(ingredientName(x.id))}${x.optional ? '<small class="optional-label">可选</small>' : ""}</strong>${found.length ? `<small class="actual-match">${primary.length ? "酒柜可用" : "使用替代"}：${found.map((i) => esc(i.name)).join(" / ")}</small>` : ""}${x.alternatives?.length ? `<small>允许替代：${x.alternatives.map((id) => esc(ingredientName(id))).join(" / ")}</small>` : ""}</div><span class="amount">${esc(C.scaleAmount(x.amount, detailScale))} <small>${esc(x.unit)}</small></span>${!found.length ? `<button class="icon-button" data-add-material-stock="${esc(x.id)}" aria-label="记录已拥有${esc(ingredientName(x.id))}">${icon("plus")}</button>` : ""}</div>`;
      })
      .join("");
  }
  function openDetail(id, version = "", preserve = false) {
    const base = env.data.recipes.find((r) => r.id === id);
    if (!base) return;
    const r = versionRecipe(base, version),
      v = base.versions.find((x) => x.id === version);
    selectedVersion = v?.id || "";
    if (!preserve) {
      detailScale = 1;
      cooking = false;
      cookChecks.clear();
      cookStep = 0;
    }
    const el = $("#detail-dialog");
    el.dataset.recipe = id;
    const parent = env.data.recipes.find((x) => x.id === base.parentId),
      children = env.data.recipes.filter((x) => x.parentId === id),
      m = C.match(r, env.data);
    el.innerHTML = `<div class="dialog-top"><span>${cooking ? "正在调制" : "配方详情"}</span><button class="icon-button" data-close="detail-dialog" aria-label="关闭配方详情">${icon("close")}</button></div><div class="detail-body"><div class="detail-hero"><div class="detail-identity"><div class="eyebrow">${base.catalog ? "经典配方" : "私人配方"}${r.sourceName ? " / " + esc(r.sourceName) : ""}</div><h2>${esc(base.name)}</h2>${base.en ? `<p class="recipe-en">${esc(base.en)}</p>` : ""}<div class="detail-characteristics">${[
      [r.base, baseIcons[r.base] || "bottle"],
      [r.method, methodIcons[r.method] || "shake"],
    ]
      .filter(([name]) => name)
      .map(([name, i]) => `<span>${icon(i)}${esc(name)}</span>`)
      .join(
        "",
      )}${r.glass ? `<span>${glassIcon(r.glass)}${esc(r.glass)}</span>` : ""}</div><div class="chips">${(r.tags || []).map((t) => `<span class="chip quiet">${esc(t)}</span>`).join("")}</div></div>${photo(base, "detail-photo")}</div><section class="version-section"><div class="section-heading"><h3>配方版本</h3><button class="link-button" data-add-version="${esc(id)}">${icon("plus")}添加我的版本</button></div><div class="version-tabs"><button class="chip ${!v ? "active" : ""}" data-version="" data-recipe="${esc(id)}" aria-pressed="${!v}">${base.catalog ? "标准配方" : "基础配方"}</button>${base.versions.map((x) => `<button class="chip ${v?.id === x.id ? "active" : ""}" data-version="${esc(x.id)}" data-recipe="${esc(id)}" aria-pressed="${v?.id === x.id}">${esc(x.name)}</button>`).join("")}</div>${v ? `<div class="version-caption"><span>${esc(v.author || "我的版本")}</span><div><button class="link-button" data-edit-version="${esc(v.id)}" data-recipe="${esc(id)}">编辑版本</button><button class="link-button danger" data-delete-version="${esc(v.id)}" data-recipe="${esc(id)}">删除</button></div></div>` : ""}</section><div class="detail-status">${matchLabel(r)}${m.ready && m.garnishes.some((x) => !x.optional) ? "<small>主体原料齐全，仍缺部分装饰</small>" : ""}<label class="scale-control"><span>制作杯数</span><select id="detail-scale">${[1, 2, 3, 4, 6, 8].map((n) => `<option value="${n}" ${n === detailScale ? "selected" : ""}>${n} 杯</option>`).join("")}</select></label></div><div class="detail-columns"><section><h3>调酒原料</h3>${detailRows(r.ingredients, "main")}${r.garnishes.length ? `<h3 class="garnish-heading">装饰</h3>${detailRows(r.garnishes, "garnish")}` : ""}${detailScale > 1 ? '<p class="hint scale-hint">数值用量按杯数调整；适量、补满等说明保持原样。</p>' : ""}</section><section><div class="section-heading"><h3>调制步骤</h3>${cooking ? `<span class="step-count">${Math.min(cookStep + 1, r.steps.length)} / ${r.steps.length}</span>` : ""}</div><ol class="method-steps">${r.steps.map((s, n) => `<li class="${cooking && cookStep === n ? "current" : ""}"><span class="step-number">${String(n + 1).padStart(2, "0")}</span>${cooking ? `<button data-cook-step="${n}" aria-pressed="${cookStep === n}">${esc(s)}</button>` : `<span>${esc(s)}</span>`}</li>`).join("")}</ol>${cooking ? '<button class="btn small" data-action="next-step">下一步 ' + icon("arrow") + "</button>" : ""}</section></div>${r.notes ? `<section class="notes-box"><h3>配方笔记</h3><p>${esc(r.notes)}</p></section>` : ""}${parent || children.length ? `<section class="related-recipes"><h3>相关变体</h3><div class="chips">${[...(parent ? [parent] : []), ...children].map((x) => `<button class="chip" data-detail="${esc(x.id)}">${esc(x.name)}</button>`).join("")}</div></section>` : ""}<p class="source-line">${safeLink(r.source) ? `配方参考：<a href="${esc(safeLink(r.source))}" target="_blank" rel="noopener noreferrer">查看原文 ${icon("arrow")}</a>` : esc(r.source || "个人记录")}</p></div><div class="dialog-actions"><button class="icon-button left ${env.data.favorites[id] ? "is-favorite" : ""}" data-favorite="${esc(id)}" aria-label="收藏此配方" aria-pressed="${!!env.data.favorites[id]}">${icon("heart")}</button><details class="action-menu"><summary class="btn">更多</summary><div><button data-duplicate="${esc(id)}">复制配方</button><button data-variant="${esc(id)}">创建变体</button>${!base.catalog ? `<button class="danger" data-delete="${esc(id)}">删除配方</button>` : ""}</div></details>${!base.catalog ? `<button class="btn" data-edit="${esc(id)}">编辑</button>` : ""}<button class="btn primary" data-action="toggle-cooking">${icon(cooking ? "check" : "glass")}${cooking ? "结束调制" : "开始调制"}</button></div>`;
    if (!el.open) showDialog(el);
  }

  function captureStock() {
    if (!stockDraft || !$("#stock-form")) return;
    const f = new FormData($("#stock-form"));
    stockDraft.item = {
      ...stockDraft.item,
      name: String(f.get("name") || ""),
      brand: String(f.get("brand") || ""),
      matches: [String(f.get("materialId") || "")],
      tags: f.getAll("materialTags").map(String),
    };
  }
  async function stashStock() {
    captureStock();
    if (!stockDraft) return;
    stockDraftRecord = C.clone(stockDraft);
    stockDraftRecord.savedAt = C.now();
    writeLocal("mixbook.stock-draft", stockDraftRecord);
    try {
      await dbWrite("stock-draft", stockDraftRecord);
    } catch {
      toast("草稿暂未保存，请保持页面打开。");
    }
  }
  async function openStock(id = "", materialId = "", resume = false) {
    if (syncBusy) {
      toast("请等待同步完成。");
      return;
    }
    if (stockDraftRecord && !resume) {
      const choice = await confirmChoice(
        "你有一份未完成的酒柜草稿",
        "继续编辑旧草稿，或开始添加另一种原料。",
        [
          ["resume", "继续编辑", "primary"],
          ["new", "开始新的记录", ""],
          ["cancel", "取消", ""],
        ],
      );
      if (choice === "resume") {
        return openStock("", "", true);
      }
      if (choice !== "new") return;
      stockDraftRecord = null;
      try {
        localStorage.removeItem("mixbook.stock-draft");
      } catch {}
      await dbWrite("stock-draft", null);
    }
    const old = env.data.pantryItems.find((x) => x.id === id),
      i = ingredient(materialId);
    stockDraft = resume
      ? C.clone(stockDraftRecord)
      : {
          item: C.clone(
            old || {
              id: "",
              name: i?.name || "",
              brand: i?.brand || "",
              category: i?.category || "",
              image: "",
              matches: materialId ? [materialId] : [],
              tags: i?.tags || [],
            },
          ),
          original: C.clone(old),
          library: C.clone(env.data),
        };
    renderStockForm();
    if (!$("#item-dialog").open) showDialog($("#item-dialog"));
    stashStock();
  }
  function renderStockForm() {
    const i = stockDraft.item,
      id = i.matches[0] || "",
      material = ingredient(id, stockDraft.library),
      root = rootOf(id, stockDraft.library),
      tagChoices = stockDraft.library.ingredients.filter(
        (x) =>
          x.builtInTag &&
          rootOf(x.id, stockDraft.library)?.id === root?.id &&
          x.id !== id,
      );
    $("#item-dialog").innerHTML =
      `<form id="stock-form" novalidate><div class="dialog-top"><div><span>${i.id ? "修改酒柜记录" : "添加已有原料"}</span><p>选择原料，记录你实际拥有的材料。</p></div><button type="button" class="icon-button" data-close="item-dialog" aria-label="保存草稿并关闭">${icon("close")}</button></div><div class="editor-body"><label class="field">对应原料 <span class="required">*</span><input type="hidden" name="materialId" value="${esc(id)}">${materialButton(id, stockDraft.library, "pick-stock")}</label><label class="field">显示名称 <span class="required">*</span><input name="name" required maxlength="100" value="${esc(i.name)}" placeholder="选择原料后自动填写"></label><label class="field">品牌（可选）<input name="brand" maxlength="100" value="${esc(i.brand)}" placeholder="例如：孟买蓝宝石"></label>${tagChoices.length ? `<fieldset class="tag-picker"><legend>原料特征（可选）</legend><div class="chips">${tagChoices.map((t) => `<label class="chip pick-chip"><input name="materialTags" type="checkbox" value="${esc(t.id)}" ${(i.tags || []).includes(t.id) ? "checked" : ""}>${esc(t.name)}</label>`).join("")}</div></fieldset>` : ""}${(
        i.tags || []
      )
        .filter((t) => !tagChoices.some((x) => x.id === t))
        .map(
          (t) => `<input type="hidden" name="materialTags" value="${esc(t)}">`,
        )
        .join(
          "",
        )}<p class="hint">${material ? "将用于匹配：" + esc(pathName(id, stockDraft.library)) : "选择整个原料目录中的已有定义，或在选择器中新增。"}</p><div id="stock-error" class="form-error" role="alert"></div></div><div class="dialog-actions">${i.id ? `<button type="button" class="link-button danger left" data-delete-stock="${esc(i.id)}">删除记录</button>` : '<button type="button" class="link-button danger left" data-action="discard-stock">放弃草稿</button>'}<button type="button" class="btn" data-close="item-dialog">稍后继续</button><button type="submit" class="btn primary">保存到酒柜</button></div></form>`;
  }
  async function saveStock(form) {
    if (form.dataset.saving) return;
    form.dataset.saving = "true";
    const button = form.querySelector("button[type=submit]");
    button.disabled = true;
    try {
      captureStock();
      const i = stockDraft.item,
        material = ingredient(i.matches[0], stockDraft.library);
      if (!material || !i.name.trim()) {
        $("#stock-error").textContent = !material
          ? "请选择对应原料，类别不会自动默认。"
          : "请填写显示名称。";
        form
          .querySelector(!material ? ".material-target" : "[name=name]")
          .focus();
        return;
      }
      await refreshState();
      const current = env.data.pantryItems.find((x) => x.id === i.id);
      if (i.id && !C.same(current, stockDraft.original)) {
        if (
          (await confirmChoice(
            "这条酒柜记录已在其他页面改变",
            "保存会采用本次编辑内容。",
            [
              ["cancel", "返回编辑", ""],
              ["yes", "保存本次内容", "primary"],
            ],
          )) !== "yes"
        )
          return;
      }
      const record = {
        ...C.clone(i),
        id: i.id || C.uid(),
        name: i.name.trim(),
        brand: i.brand.trim(),
        category: material.category,
      };
      const before = readyCount(),
        ok = await update((d) => {
          includeMaterials(d, stockDraft.library, [
            ...record.matches,
            ...record.tags,
          ]);
          const n = d.pantryItems.findIndex((x) => x.id === record.id);
          if (n < 0) d.pantryItems.push(record);
          else d.pantryItems[n] = record;
        });
      if (ok) {
        await dbWrite("stock-draft", null);
        stockDraftRecord = null;
        try {
          localStorage.removeItem("mixbook.stock-draft");
        } catch {}
        stockDraft = null;
        closeDialog($("#item-dialog"));
        render();
        if ($("#detail-dialog").open)
          openDetail($("#detail-dialog").dataset.recipe, selectedVersion, true);
        const delta = readyCount() - before;
        toast(
          delta > 0
            ? `酒柜已保存，新增 ${delta} 份原料齐全的配方。`
            : "酒柜已保存。",
        );
        scheduleSync();
      }
    } catch (e) {
      $("#stock-error").textContent = e.message;
    } finally {
      delete form.dataset.saving;
      button.disabled = false;
    }
  }
  async function deleteStock(id) {
    const item = env.data.pantryItems.find((x) => x.id === id);
    if (!item) return;
    if (
      (await confirmChoice(
        "移除这条酒柜记录？",
        "原料定义和引用它的配方都会保留。",
        [
          ["cancel", "取消", ""],
          ["yes", "移除", "danger"],
        ],
      )) !== "yes"
    )
      return;
    if (
      await update(
        (d) => (d.pantryItems = d.pantryItems.filter((x) => x.id !== id)),
      )
    ) {
      await dbWrite("stock-draft", null);
      stockDraftRecord = null;
      try {
        localStorage.removeItem("mixbook.stock-draft");
      } catch {}
      stockDraft = null;
      closeDialog($("#item-dialog"));
      render();
      toast("已从酒柜移除。", async () => {
        if (
          await update((d) => {
            if (!d.pantryItems.some((x) => x.id === id))
              d.pantryItems.push(item);
          })
        )
          render();
      });
    }
  }
  function openMaterialEditor(id) {
    const material = ingredient(id);
    if (!material?.customized) {
      toast("内置原料保持标准定义。");
      return;
    }
    $("#item-dialog").innerHTML =
      `<form id="material-edit-form"><input type="hidden" name="id" value="${esc(id)}"><div class="dialog-top"><span>修改原料定义</span><button type="button" class="icon-button" data-close="item-dialog" aria-label="关闭">${icon("close")}</button></div><div class="editor-body"><label class="field">原料名称<input name="name" value="${esc(material.name)}" required maxlength="100"></label><label class="field">所属类别<select name="parentId" required><option value="">请选择</option>${env.data.ingredients
        .filter(
          (x) =>
            x.kind === "type" &&
            !C.ingredientPath(x.id, env.data).some((y) => y.id === id),
        )
        .map(
          (x) =>
            `<option value="${x.id}" ${material.parentId === x.id ? "selected" : ""}>${esc(pathName(x.id))}</option>`,
        )
        .join(
          "",
        )}</select></label><label class="field">品牌<input name="brand" value="${esc(material.brand)}" maxlength="100"></label><label class="field">英文名 / 别名<input name="aliases" value="${esc(material.aliases.join("，"))}" maxlength="500"></label><div id="material-edit-error" class="form-error" role="alert"></div></div><div class="dialog-actions"><button class="link-button danger left" type="button" data-delete-material="${id}">删除定义</button><button class="btn primary" type="submit">保存定义</button></div></form>`;
    showDialog($("#item-dialog"));
  }

  function settingsPage() {
    const connected = !!(config.owner && config.repo);
    return (
      heading(
        "KEEP YOUR RECIPES",
        "同步与数据",
        "本机保存开箱即用，也可连接私人 GitHub 仓库跨设备同步。",
      ) +
      `<div class="settings-layout"><div><section class="panel"><div class="row spread"><h2>连接 GitHub</h2><span class="sync-badge">${env.lastSync ? "已连接" : connected ? "已配置" : "尚未连接"}</span></div><p class="panel-intro">使用独立的私有仓库保存酒谱，所有设备读取同一份数据。</p><div class="connection-summary"><span class="connection-icon">${icon("cloud")}</span><div><strong>${connected ? esc(config.owner + "/" + config.repo) : "尚未配置数据仓库"}</strong><span>${connected ? esc(config.path) + " · 自动同步已" + (config.auto ? "开启" : "关闭") : "连接自己的私有仓库，跨设备保留记录"}</span></div></div><div class="status-box">${esc(status())} · ${esc(dateText(env.lastSync))}</div><div class="row wrap connection-actions"><button class="btn primary" data-action="open-sync-settings">${connected ? "管理连接" : "连接 GitHub"} ${icon("arrow")}</button>${connected ? `<button class="btn" data-action="sync-now" ${syncBusy ? "disabled" : ""}>${icon("refresh")}${syncBusy ? "正在同步" : "手动同步"}</button>` : ""}</div></section><p class="hint">手动同步默认提供合并两端修改，也可明确选择上传或下载覆盖。未连接前，配方只保存在当前浏览器中。</p></div><div><section class="panel"><h2>导入与导出</h2><p class="panel-intro">没有仓库时，也可以先保存一份完整备份。</p><div class="backup-row"><div><strong>导出全部数据</strong><p>配方、材料、酒柜和收藏</p></div><button class="btn small" data-action="export">${icon("download")}导出</button></div><div class="backup-row"><div><strong>导入已有数据</strong><p>合并记录，遇到冲突会询问</p></div><button class="btn small" data-action="import">${icon("upload")}导入</button></div><input id="import-file" type="file" accept=".json,application/json" hidden></section><section class="panel"><h2>仓库准备好后</h2><ol class="steps-list"><li>创建一个<strong>私有仓库</strong>，勾选添加 README，先保留空白即可。</li><li>创建仅限该仓库的 Fine-grained Token，授予 Contents 读写权限。</li><li>打开“连接 GitHub”填写信息并保存。</li></ol><a class="link-button" href="https://github.com/settings/personal-access-tokens/new" target="_blank" rel="noopener noreferrer">打开 GitHub 令牌设置 ${icon("arrow")}</a></section><section class="panel danger-zone"><h2>本地数据</h2><p class="hint">清空此浏览器中的配方、酒柜、收藏和同步设置。建议先导出备份。</p><button class="btn danger" data-action="clear-local-data">清空本地数据</button></section></div></div>`
    );
  }
  function openSyncSettings() {
    const el = $("#sync-dialog");
    el.innerHTML = `<form id="sync-form"><div class="dialog-top"><span>GitHub 同步设置</span><button type="button" class="icon-button" data-close="sync-dialog" aria-label="关闭同步设置">${icon("close")}</button></div><div class="editor-body"><div class="status-box">${esc(status())} · ${esc(dateText(env.lastSync))}<br><span class="muted">自动同步已${config.auto ? "开启" : "关闭"}</span>${config.repo ? `<br><span class="muted">${esc(config.owner + "/" + config.repo + "/" + config.path)}</span>` : ""}</div><div class="field-row"><label class="field">GitHub 用户名<input name="owner" autocomplete="off" placeholder="例如 vio" value="${esc(config.owner)}" required></label><label class="field">私有数据仓库名<input name="repo" autocomplete="off" placeholder="例如 mixbook-data" value="${esc(config.repo)}" required></label></div><div class="field-row"><label class="field">分支<input name="branch" placeholder="留空使用默认分支" value="${esc(config.branch)}"></label><label class="field">数据文件<input name="path" placeholder="mixbook.json" value="${esc(config.path)}" required></label></div><label class="field">访问令牌（Fine-grained Token）<input name="token" type="password" autocomplete="off" spellcheck="false" placeholder="仅授予该仓库的 Contents 读写权限" value="${esc(token)}"></label><label class="check-line"><input name="remember" type="checkbox" ${remember ? "checked" : ""}><span>在此设备记住令牌<br><span class="hint">只在自己的设备上启用；令牌不会写入仓库或导出文件。</span></span></label><label class="switch-line"><span><strong>前台自动同步</strong><span class="hint">打开应用、保存后和前台每 60 秒检查；更改开关后需保存设置才会生效。</span></span><span class="switch"><input name="auto" type="checkbox" role="switch" ${config.auto ? "checked" : ""}><span aria-hidden="true"></span></span></label><div id="sync-error" class="form-error" role="alert"></div></div><div class="dialog-actions">${config.repo ? '<button class="btn danger left" type="button" data-action="disconnect">断开连接</button>' : ""}<button class="btn" type="button" data-close="sync-dialog">取消</button><button class="btn primary" type="submit" ${syncBusy ? "disabled" : ""}>保存同步设置</button></div></form>`;
    showDialog(el);
  }

  function confirmChoice(
    title,
    message,
    choices = [
      ["yes", "确认", "primary"],
      ["cancel", "取消", ""],
    ],
  ) {
    return new Promise((resolve) => {
      const el = $("#confirm-dialog");
      el.innerHTML = `<h2>${esc(title)}</h2><p>${esc(message)}</p><div class="confirm-actions">${choices.map(([id, label, cls]) => `<button class="btn ${cls}" data-choice="${id}">${esc(label)}</button>`).join("")}</div>`;
      const handler = (e) => {
        const b = e.target.closest("[data-choice]");
        if (b) {
          el.removeEventListener("click", handler);
          el.oncancel = null;
          el.close();
          resolve(b.dataset.choice);
        }
      };
      el.addEventListener("click", handler);
      el.oncancel = () => {
        el.removeEventListener("click", handler);
        resolve("cancel");
      };
      el.showModal();
    });
  }
  function download(data) {
    const blob = new Blob([JSON.stringify(data, null, 2)], {
        type: "application/json",
      }),
      url = URL.createObjectURL(blob),
      a = document.createElement("a");
    a.href = url;
    a.download = "mixbook-" + new Date().toISOString().slice(0, 10) + ".json";
    a.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }
  function resolveConflicts(result, local, remote, choice) {
    const selected = choice === "remote" ? remote : local;
    for (const key of result.conflicts) {
      const [section, ...rest] = key.split(":"),
        id = rest.join(":");
      if (["recipes", "ingredients", "pantryItems"].includes(section)) {
        result.data[section] = result.data[section].filter((x) => x.id !== id);
        const value = selected[section].find((x) => x.id === id);
        if (value) result.data[section].push(C.clone(value));
      } else if (section === "favorites") {
        if (id in selected[section])
          Object.defineProperty(result.data[section], id, {
            value: selected[section][id],
            enumerable: true,
            writable: true,
            configurable: true,
          });
        else delete result.data[section][id];
      }
    }
    const recipeIds = new Set(result.data.recipes.map((x) => x.id));
    for (const id of Object.keys(result.data.favorites))
      if (!recipeIds.has(id)) delete result.data.favorites[id];
    return C.validate(result.data);
  }
  async function importData(file) {
    if (!file) return;
    if (file.size > 1024 * 1024) {
      toast("文件超过 1 MiB，请使用不含内嵌图片的数据备份。");
      return;
    }
    try {
      const other = C.validate(JSON.parse(await file.text()));
      const result = C.merge(C.empty(), env.data, other);
      let choice = "local";
      if (result.conflicts.length) {
        choice = await confirmChoice(
          "导入内容存在不同版本",
          `${result.conflicts.length} 项记录与本机不同。未冲突的记录会合并，选择仅影响冲突项。`,
          [
            ["local", "冲突项保留本机", ""],
            ["remote", "冲突项采用导入", "primary"],
            ["cancel", "取消", ""],
          ],
        );
        if (choice === "cancel") return;
      } else if (
        (await confirmChoice(
          "合并导入数据",
          `将合并 ${other.recipes.length} 份配方和 ${other.ingredients.length} 种材料，现有记录会保留。`,
        )) !== "yes"
      )
        return;
      const merged = resolveConflicts(result, env.data, other, choice);
      if (await update((d) => Object.assign(d, merged))) {
        render();
        toast("数据已合并并保存。");
      }
    } catch (e) {
      toast("导入失败：" + e.message);
    }
  }
  function scheduleSync(allowPantry = false) {
    clearTimeout(saveTimer);
    if (config.auto && token && navigator.onLine && (!editing() || allowPantry))
      saveTimer = setTimeout(() => {
        if (!editing() || allowPantry) sync(false, allowPantry);
      }, 1800);
  }
  function tokenStorage() {
    try {
      localStorage.setItem("mixbook.config", JSON.stringify(config));
      localStorage.removeItem("mixbook.token");
      sessionStorage.removeItem("mixbook.token");
      if (token)
        (remember ? localStorage : sessionStorage).setItem(
          "mixbook.token",
          token,
        );
    } catch {
      toast("此浏览器不能记住连接设置；本次仍可尝试连接。");
    }
  }
  function validateConfig(c) {
    if (
      !/^[A-Za-z0-9-]{1,100}$/.test(c.owner) ||
      !/^[A-Za-z0-9_.-]{1,100}$/.test(c.repo)
    )
      throw Error("请填写有效的 GitHub 用户名与仓库名。");
    if (
      !/^[A-Za-z0-9_./-]+\.json$/.test(c.path) ||
      c.path.startsWith("/") ||
      c.path.split("/").some((p) => !p || p === "." || p === "..")
    )
      throw Error("数据路径应是相对路径，以 .json 结尾，例如 mixbook.json。");
    if (c.branch.length > 200) throw Error("分支名过长。");
  }
  const repoUrl = () =>
    `https://api.github.com/repos/${encodeURIComponent(config.owner)}/${encodeURIComponent(config.repo)}`;
  const fileUrl = () =>
    repoUrl() +
    "/contents/" +
    config.path.split("/").map(encodeURIComponent).join("/");
  async function api(url, options = {}) {
    const controller = new AbortController(),
      timeout = setTimeout(() => controller.abort(), 20000);
    try {
      return await fetch(url, {
        ...options,
        signal: controller.signal,
        cache: "no-store",
        credentials: "omit",
        headers: {
          Accept: "application/vnd.github+json",
          Authorization: "Bearer " + token,
          "X-GitHub-Api-Version": "2022-11-28",
          ...(options.body ? { "Content-Type": "application/json" } : {}),
        },
      });
    } catch (e) {
      throw Error(
        e.name === "AbortError"
          ? "连接超时，请稍后重试。"
          : "无法连接 GitHub。修改仍保留在本机。",
      );
    } finally {
      clearTimeout(timeout);
    }
  }
  function apiError(res) {
    if (res.status === 401) return Error("令牌无效或已过期，请重新填写。");
    if (res.status === 403 || res.status === 429)
      return Error(
        "权限不足或 GitHub 暂时限制请求。请检查 Contents 读写权限后稍后重试。",
      );
    if (res.status === 404)
      return Error("找不到仓库或分支，请检查名称以及令牌的仓库权限。");
    if (res.status === 409)
      return Error("云端刚发生了修改，本次没有覆盖。请再次同步。");
    if (res.status === 422)
      return Error("GitHub 拒绝写入，请检查分支保护、路径或仓库初始化状态。");
    return Error("GitHub 暂时无法处理请求（" + res.status + "）。");
  }
  function decodeContent(content) {
    const bytes = Uint8Array.from(atob(content.replace(/\s/g, "")), (c) =>
      c.charCodeAt(0),
    );
    return new TextDecoder().decode(bytes);
  }
  function encodeContent(text) {
    const bytes = new TextEncoder().encode(text);
    let s = "";
    for (let i = 0; i < bytes.length; i += 8192)
      s += String.fromCharCode(...bytes.subarray(i, i + 8192));
    return btoa(s);
  }
  async function sync(
    interactive = true,
    allowPantry = false,
    direction = "merge",
  ) {
    if (syncBusy) return { ok: false, message: "同步正在进行中。" };
    if (editing() && !allowPantry) {
      const message = "请先保存或取消当前编辑，再同步。";
      if (interactive) toast(message);
      return { ok: false, message };
    }
    if (!token || !config.owner || !config.repo) {
      const message = "先填写私有仓库与访问令牌。";
      if (interactive) {
        view = "settings";
        render();
        toast(message);
      }
      return { ok: false, message };
    }
    if (!navigator.onLine) {
      const message = "当前离线，修改仍在本机。";
      if (interactive) toast(message);
      return { ok: false, message };
    }
    syncBusy = true;
    updateHeader();
    clearTimeout(saveTimer);
    let message = "";
    try {
      validateConfig(config);
      await writeQueue;
      await refreshState();
      const res = await api(repoUrl());
      if (!res.ok) throw apiError(res);
      const repo = await res.json();
      if (!repo.private)
        throw Error("请连接一个私有数据仓库，避免公开酒柜与个人笔记。");
      const branch = config.branch || repo.default_branch;
      const br = await api(
        repoUrl() + "/branches/" + encodeURIComponent(branch),
      );
      if (!br.ok) throw apiError(br);
      const syncId = [config.owner, config.repo, branch, config.path].join("/");
      const snapshot = C.clone(env.data),
        resFile = await api(fileUrl() + "?ref=" + encodeURIComponent(branch));
      let remote = null,
        remoteOriginal = null,
        sha = null;
      if (resFile.ok) {
        const file = await resFile.json();
        if (
          file.type !== "file" ||
          file.encoding !== "base64" ||
          file.size > 1024 * 1024
        )
          throw Error("云端文件不是受支持的小型 JSON 数据文件。");
        sha = file.sha;
        remoteOriginal = JSON.parse(decodeContent(file.content));
        remote = C.installCatalog(remoteOriginal, window.MIX_SEED);
      } else if (resFile.status !== 404) throw apiError(resFile);
      let target;
      if (direction === "download" && !remote) {
        message = "仓库中还没有数据文件，无法下载。本机数据没有改动。";
        return { ok: false, message };
      }
      if (direction === "upload") target = snapshot;
      else if (direction === "download") target = remote;
      else if (!remote) {
        if (!interactive) {
          message = "云端没有数据文件，请手动连接并确认首次写入。";
          return { ok: false, message };
        }
        if (
          (await confirmChoice(
            "首次写入 GitHub",
            `将把当前 ${snapshot.recipes.length} 份配方与酒柜数据保存到 ${config.repo}/${config.path}。`,
          )) !== "yes"
        )
          return { ok: false, cancelled: true };
        target = snapshot;
      } else if (!env.base || env.syncId !== syncId) {
        if (!interactive) {
          message = "首次连接需要合并确认，请前往同步与数据。";
          return { ok: false, message };
        }
        const result = C.merge(C.empty(), snapshot, remote);
        if (result.conflicts.length) {
          const choice = await confirmChoice(
            "首次同步存在不同版本",
            `两端有 ${result.conflicts.length} 项同编号记录内容不同。独立记录会合并，选择仅影响冲突项。`,
            [
              ["local", "冲突项保留本机", "primary"],
              ["remote", "冲突项采用云端", ""],
              ["cancel", "取消", ""],
            ],
          );
          if (choice === "cancel") return { ok: false, cancelled: true };
          target = resolveConflicts(result, snapshot, remote, choice);
        } else target = C.validate(result.data);
      } else {
        const result = C.merge(env.base, snapshot, remote);
        if (result.conflicts.length) {
          if (!interactive) {
            message = `有 ${result.conflicts.length} 项同步冲突，请点击立即同步处理。`;
            return { ok: false, message };
          }
          const choice = await confirmChoice(
            "两台设备修改了同一条记录",
            `检测到 ${result.conflicts.length} 项冲突。不同记录的修改会正常合并，下面的选择仅作用于冲突项。取消后可先导出备份。`,
            [
              ["local", "冲突项保留本机", ""],
              ["remote", "冲突项采用云端", "primary"],
              ["cancel", "取消", ""],
            ],
          );
          if (choice === "cancel") return { ok: false, cancelled: true };
          target = resolveConflicts(result, snapshot, remote, choice);
        } else target = C.validate(result.data);
      }
      if (
        direction !== "download" &&
        (!remote || !C.same(target, remoteOriginal))
      ) {
        if (
          new TextEncoder().encode(JSON.stringify(target, null, 2)).length >
          1024 * 1024
        )
          throw Error("同步文件上限为 1 MiB，请先导出备份并精简数据。");
        const put = await api(fileUrl(), {
          method: "PUT",
          body: JSON.stringify({
            message: "Update Mixbook recipes and pantry",
            content: encodeContent(JSON.stringify(target, null, 2)),
            branch,
            ...(sha ? { sha } : {}),
          }),
        });
        if (!put.ok) throw apiError(put);
        const saved = await put.json();
        sha = saved.content.sha;
      }
      await persist({
        ...env,
        data: C.validate(target),
        base: C.clone(target),
        syncId,
        sha,
        lastSync: C.now(),
      });
      message = "已与 GitHub 同步。";
      return { ok: true, message };
    } catch (e) {
      message = e.message || "同步失败，本地修改已保留。";
      return { ok: false, message };
    } finally {
      syncBusy = false;
      if (
        !editing() &&
        (view !== "settings" || !document.activeElement?.closest("#sync-form"))
      )
        render();
      if (message) {
        if (interactive || !message.startsWith("已与")) toast(message);
        const error = $("#sync-error");
        if (error && !message.startsWith("已与")) error.textContent = message;
      }
      updateHeader();
    }
  }
  function updateHeader() {
    const el = $(".top-status .status-text");
    if (el) el.textContent = status();
  }
  function showSyncOverlay(state = "loading", message = "") {
    const el = $("#sync-overlay"),
      card = el.querySelector(".sync-overlay-card"),
      indicator = el.querySelector(".sync-indicator"),
      actions = el.querySelector(".sync-overlay-actions");
    if (state === "hidden") {
      el.hidden = true;
      el.setAttribute("aria-hidden", "true");
      return;
    }
    el.hidden = false;
    el.setAttribute("aria-hidden", "false");
    card.dataset.syncState = state;
    indicator.className =
      "sync-indicator " +
      (state === "loading"
        ? "sync-spinner"
        : state === "success"
          ? "sync-success"
          : "sync-error");
    indicator.innerHTML =
      state === "success"
        ? icon("check")
        : state === "error"
          ? icon("close")
          : "";
    $("#sync-overlay-title").textContent =
      state === "loading"
        ? "正在同步中"
        : state === "success"
          ? "同步成功"
          : "同步失败";
    $("#sync-overlay-message").textContent =
      message ||
      (state === "loading"
        ? "正在与 GitHub 同步数据，请稍候…"
        : state === "success"
          ? "数据已安全保存到 GitHub。"
          : "本地修改仍然保留，你可以再次尝试。");
    actions.hidden = state !== "error";
  }
  async function manualSync() {
    const direction = await confirmChoice(
      "同步数据",
      "合并同步会保留两端独立改动。上传或下载会覆盖另一端的完整数据。",
      [
        ["merge", "合并两端修改", "primary"],
        ["upload", "以本机覆盖云端", ""],
        ["download", "以云端覆盖本机", ""],
        ["cancel", "取消", ""],
      ],
    );
    if (direction === "cancel") return;
    showSyncOverlay(
      "loading",
      direction === "merge"
        ? "正在合并本机与云端修改…"
        : direction === "upload"
          ? "正在上传本机数据到 GitHub…"
          : "正在从 GitHub 下载仓库数据…",
    );
    const result = await sync(true, false, direction);
    if (result?.ok) {
      showSyncOverlay(
        "success",
        direction === "merge"
          ? "本机与云端数据已同步。"
          : direction === "upload"
            ? "本机数据已上传到 GitHub。"
            : "仓库数据已下载并保存到本机。",
      );
      await new Promise((resolve) => setTimeout(resolve, 1100));
      showSyncOverlay("hidden");
    } else if (result?.cancelled) showSyncOverlay("hidden");
    else showSyncOverlay("error", result?.message);
  }

  async function closeById(id) {
    if (id === "editor-dialog") {
      clearTimeout(draftTimer);
      await stashEditor();
      editor = null;
      editorDraft = null;
      closeDialog($("#" + id));
      render();
      scheduleSync();
      return;
    }
    if (id === "item-dialog" && stockDraft) {
      clearTimeout(draftTimer);
      await stashStock();
      stockDraft = null;
      closeDialog($("#" + id));
      render();
      scheduleSync();
      return;
    }
    if (id === "item-dialog" && $("#material-edit-form")) {
      if (
        (await confirmChoice("关闭原料编辑？", "未保存的原料定义修改会丢弃。", [
          ["cancel", "继续编辑", ""],
          ["yes", "关闭", "primary"],
        ])) !== "yes"
      )
        return;
    }
    closeDialog($("#" + id));
    if (id === "material-dialog") picker = null;
    scheduleSync();
  }
  async function navigate(next) {
    if (editor) await closeById("editor-dialog");
    if (stockDraft) await closeById("item-dialog");
    view = next;
    filterOpen = false;
    render();
    window.scrollTo({ top: 0, behavior: "instant" });
  }
  document.addEventListener(
    "error",
    (e) => {
      const img = e.target;
      if (!img.matches?.("img[data-recipe-photo]")) return;
      img.outerHTML = photoPlaceholder(
        { glass: img.dataset.glass },
        img.className,
      );
    },
    true,
  );
  document.addEventListener("click", async (e) => {
    const b = e.target.closest("button");
    if (!b) return;
    if (b.dataset.close) {
      await closeById(b.dataset.close);
      return;
    }
    if (b.dataset.view) {
      await navigate(b.dataset.view);
      return;
    }
    if (b.dataset.collection) {
      filters.collection = b.dataset.collection;
      render();
      return;
    }
    if (b.dataset.pantryTab) {
      pantryTab = b.dataset.pantryTab;
      pantrySection = "all";
      pantryQ = "";
      render();
      return;
    }
    if (b.dataset.pantrySection) {
      pantrySection = b.dataset.pantrySection;
      render();
      return;
    }
    if (b.hasAttribute("data-base-filter")) {
      filters.base = b.dataset.baseFilter;
      render();
      return;
    }
    if (b.dataset.filterTag) {
      filters.tags = filters.tags.includes(b.dataset.filterTag)
        ? filters.tags.filter((x) => x !== b.dataset.filterTag)
        : [...filters.tags, b.dataset.filterTag];
      render();
      return;
    }
    if (b.dataset.layout) {
      layout = b.dataset.layout;
      writeLocal(uiKey, { layout });
      render();
      return;
    }
    if (b.dataset.detail) {
      openDetail(b.dataset.detail, b.dataset.detailVersion || "");
      return;
    }
    if (b.hasAttribute("data-version")) {
      openDetail(b.dataset.recipe, b.dataset.version);
      return;
    }
    if (b.dataset.addVersion) {
      await startEditor(b.dataset.addVersion, "version");
      return;
    }
    if (b.dataset.editVersion) {
      await startEditor(b.dataset.recipe, "version", b.dataset.editVersion);
      return;
    }
    if (b.dataset.edit) {
      await startEditor(b.dataset.edit);
      return;
    }
    if (b.dataset.duplicate) {
      await startEditor(b.dataset.duplicate, "duplicate");
      return;
    }
    if (b.dataset.variant) {
      await startEditor(b.dataset.variant, "variant");
      return;
    }
    if (b.hasAttribute("data-favorite")) {
      const id = b.dataset.favorite;
      if (await update((d) => (d.favorites[id] = !d.favorites[id]))) {
        if (view === "recipes") renderResults();
        if ($("#detail-dialog").open) openDetail(id, selectedVersion, true);
      }
      return;
    }
    if (b.dataset.stock) {
      await openStock(b.dataset.stock);
      return;
    }
    if (b.dataset.addMaterialStock) {
      await openStock("", b.dataset.addMaterialStock);
      return;
    }
    if (b.dataset.editMaterial) {
      openMaterialEditor(b.dataset.editMaterial);
      return;
    }
    if (b.dataset.deleteStock) {
      await deleteStock(b.dataset.deleteStock);
      return;
    }
    if (b.dataset.pick) {
      choosePicked(b.dataset.pick);
      return;
    }
    if (b.dataset.addRow) {
      const section = b.dataset.addRow;
      $("#editor-" + section).insertAdjacentHTML(
        "beforeend",
        rowMarkup(
          {
            id: "",
            amount: "",
            unit: section === "garnishes" ? "片" : "ml",
            optional: false,
          },
          section,
        ),
      );
      $("#editor-" + section)
        .lastElementChild.querySelector(".material-target")
        .focus();
      stashEditor();
      return;
    }
    if (b.dataset.cookCheck) {
      cookChecks.has(b.dataset.cookCheck)
        ? cookChecks.delete(b.dataset.cookCheck)
        : cookChecks.add(b.dataset.cookCheck);
      openDetail($("#detail-dialog").dataset.recipe, selectedVersion, true);
      return;
    }
    if (b.hasAttribute("data-cook-step")) {
      cookStep = Number(b.dataset.cookStep);
      openDetail($("#detail-dialog").dataset.recipe, selectedVersion, true);
      return;
    }
    if (b.dataset.deleteVersion || b.dataset.delete) {
      const isVersion = !!b.dataset.deleteVersion,
        id = isVersion ? b.dataset.recipe : b.dataset.delete,
        recipe = env.data.recipes.find((r) => r.id === id);
      if (!recipe || (!isVersion && recipe.catalog)) return;
      if (
        (await confirmChoice(
          isVersion ? "删除这个个人版本？" : "删除这份配方？",
          isVersion
            ? "标准配方与其他版本都会保留。"
            : "关联变体会成为独立配方。",
          [
            ["cancel", "取消", ""],
            ["yes", "删除", "danger"],
          ],
        )) !== "yes"
      )
        return;
      if (
        await update((d) => {
          if (isVersion) {
            const r = d.recipes.find((x) => x.id === id);
            r.versions = r.versions.filter(
              (x) => x.id !== b.dataset.deleteVersion,
            );
            r.updatedAt = C.now();
          } else {
            d.recipes = d.recipes.filter((x) => x.id !== id);
            d.recipes.forEach((x) => {
              if (x.parentId === id) x.parentId = "";
            });
            delete d.favorites[id];
          }
        })
      ) {
        if (isVersion) openDetail(id);
        else closeDialog($("#detail-dialog"));
        render();
        toast("已删除。");
      }
      return;
    }
    if (b.dataset.deleteMaterial) {
      const id = b.dataset.deleteMaterial,
        referenced =
          env.data.recipes.some((r) =>
            [
              ...r.ingredients,
              ...r.garnishes,
              ...r.versions.flatMap((v) => [...v.ingredients, ...v.garnishes]),
            ].some((x) => x.id === id || x.alternatives?.includes(id)),
          ) ||
          env.data.pantryItems.some(
            (x) => x.matches.includes(id) || x.tags.includes(id),
          ) ||
          env.data.ingredients.some(
            (x) => x.parentId === id || x.tags.includes(id),
          );
      if (referenced) {
        $("#material-edit-error").textContent =
          "这项原料仍被配方、酒柜或其他原料引用，暂时不能删除。";
        return;
      }
      if (
        (await confirmChoice(
          "删除这项原料定义？",
          "删除后，原料目录中不再显示。",
          [
            ["cancel", "取消", ""],
            ["yes", "删除", "danger"],
          ],
        )) !== "yes"
      )
        return;
      if (
        await update(
          (d) => (d.ingredients = d.ingredients.filter((x) => x.id !== id)),
        )
      ) {
        closeDialog($("#item-dialog"));
        render();
      }
      return;
    }
    switch (b.dataset.action) {
      case "new":
        await startEditor();
        break;
      case "toggle-theme":
        toggleTheme();
        break;
      case "reset-filters":
        filters = {
          q: "",
          tags: [],
          base: "",
          sourceName: "",
          availability: "all",
          collection: "all",
          favorite: false,
          hideCatalog: false,
        };
        render();
        break;
      case "toggle-filters":
        filterOpen = !filterOpen;
        render();
        break;
      case "resume-recipe-draft":
        openEditorDraft(draftRecord);
        break;
      case "resume-stock-draft":
        await openStock("", "", true);
        break;
      case "discard-editor":
        if (
          (await confirmChoice(
            "放弃这份草稿？",
            "已保存的配方不受影响，当前草稿将移除。",
            [
              ["cancel", "继续编辑", ""],
              ["yes", "放弃草稿", "danger"],
            ],
          )) === "yes"
        ) {
          clearTimeout(draftTimer);
          editor = null;
          editorDraft = null;
          draftRecord = null;
          try {
            localStorage.removeItem("mixbook.recipe-draft");
          } catch {}
          await dbWrite("editor-draft", null);
          closeDialog($("#editor-dialog"));
          render();
          scheduleSync();
        }
        break;
      case "discard-stock":
        if (
          (await confirmChoice("放弃酒柜草稿？", "已保存的记录不受影响。", [
            ["cancel", "继续编辑", ""],
            ["yes", "放弃草稿", "danger"],
          ])) === "yes"
        ) {
          clearTimeout(draftTimer);
          stockDraft = null;
          stockDraftRecord = null;
          try {
            localStorage.removeItem("mixbook.stock-draft");
          } catch {}
          try {
            localStorage.removeItem("mixbook.stock-draft");
          } catch {}
          await dbWrite("stock-draft", null);
          closeDialog($("#item-dialog"));
          render();
          scheduleSync();
        }
        break;
      case "choose-material": {
        const row = b.closest(".ingredient-edit-row");
        openPicker(editorDraft, (item) => {
          row.querySelector("[name=ingredientId]").value = item.id;
          row.querySelector(".material-target").outerHTML = materialButton(
            item.id,
            editorDraft,
          );
          row.classList.remove("invalid");
          row.querySelector(".row-error").textContent = "";
          stashEditor();
        });
        break;
      }
      case "add-alternative": {
        const row = b.closest(".ingredient-edit-row");
        openPicker(editorDraft, (item) => {
          const x = readRow(row);
          if (x.id === item.id || x.alternatives.includes(item.id)) {
            toast("这一项已经在原料行中。");
            return;
          }
          row
            .querySelector(".alternative-list")
            .insertAdjacentHTML("beforeend", alternativeMarkup(item.id));
          stashEditor();
        });
        break;
      }
      case "remove-alternative":
        b.closest("[data-alternative]").remove();
        stashEditor();
        break;
      case "remove-row": {
        const row = b.closest(".ingredient-edit-row"),
          container = row.parentElement;
        if (
          container.id === "editor-ingredients" &&
          container.children.length === 1
        )
          row.outerHTML = rowMarkup();
        else row.remove();
        stashEditor();
        break;
      }
      case "toggle-paste":
        $("#paste-panel").hidden = !$("#paste-panel").hidden;
        if (!$("#paste-panel").hidden) $("#paste-ingredients").focus();
        break;
      case "parse-paste":
        parsePaste();
        break;
      case "more-materials":
        picker.limit += 60;
        renderPicker();
        break;
      case "add-recipe-tag": {
        const input = $("#new-recipe-tag"),
          value = input.value.trim();
        if (!value) break;
        const existing = [
          ...$("#recipe-form").querySelectorAll("input[name=tags]"),
        ].find((x) => C.norm(x.value) === C.norm(value));
        if (existing) existing.checked = true;
        else
          $("#recipe-form .tag-picker .chips").insertAdjacentHTML(
            "beforeend",
            `<label class="chip pick-chip"><input name="tags" type="checkbox" checked value="${esc(value)}">${esc(value)}</label>`,
          );
        input.value = "";
        stashEditor();
        break;
      }
      case "add-stock":
        await openStock();
        break;
      case "pick-stock": {
        captureStock();
        const old = ingredient(stockDraft.item.matches[0], stockDraft.library);
        openPicker(
          stockDraft.library,
          (item) => {
            const i = stockDraft.item;
            if (!i.name || i.name === old?.name) i.name = item.name;
            if (!i.brand || i.brand === old?.brand) i.brand = item.brand || "";
            i.matches = [item.id];
            i.tags = [...(item.tags || [])];
            renderStockForm();
            stashStock();
          },
          { scope: "stock" },
        );
        break;
      }
      case "new-material":
        openPicker(
          C.clone(env.data),
          () => {
            closeDialog($("#material-dialog"));
            render();
            toast("原料定义已保存。");
          },
          { scope: "directory" },
        );
        $("#material-dialog .quick-new").open = true;
        $("#quick-material-form [name=name]").focus();
        break;
      case "show-ready":
        filters = {
          ...filters,
          q: "",
          tags: [],
          base: "",
          sourceName: "",
          availability: "ready",
          collection: "all",
        };
        await navigate("recipes");
        break;
      case "toggle-cooking":
        cooking = !cooking;
        cookChecks.clear();
        cookStep = 0;
        openDetail($("#detail-dialog").dataset.recipe, selectedVersion, true);
        break;
      case "next-step": {
        const r = versionRecipe(
          env.data.recipes.find(
            (x) => x.id === $("#detail-dialog").dataset.recipe,
          ),
          selectedVersion,
        );
        if (cookStep < r.steps.length - 1) cookStep++;
        else toast("步骤完成，享用这一杯。");
        openDetail(r.id, selectedVersion, true);
        break;
      }
      case "export":
        download(env.data);
        toast("完整备份已生成。");
        break;
      case "import":
        $("#import-file").click();
        break;
      case "open-sync-settings":
        openSyncSettings();
        break;
      case "sync-now":
      case "retry-sync":
        await manualSync();
        break;
      case "cancel-sync-result":
        showSyncOverlay("hidden");
        break;
      case "disconnect":
        if (syncBusy) break;
        if (
          (await confirmChoice(
            "断开 GitHub 连接？",
            "本机和云端数据保留，仅移除本机连接设置。",
          )) === "yes"
        ) {
          config = {
            owner: "",
            repo: "",
            branch: "",
            path: "mixbook.json",
            auto: false,
          };
          token = "";
          remember = false;
          tokenStorage();
          await persist({
            ...env,
            base: null,
            sha: null,
            syncId: "",
            lastSync: null,
          });
          closeDialog($("#sync-dialog"));
          render();
        }
        break;
      case "clear-local-data":
        if (syncBusy) break;
        if (
          (await confirmChoice(
            "清空此设备的数据？",
            "配方、酒柜、收藏和草稿将从此浏览器中移除，请先导出备份。",
            [
              ["cancel", "保留数据", ""],
              ["yes", "清空本机", "danger"],
            ],
          )) === "yes"
        ) {
          clearTimeout(saveTimer);
          clearTimeout(draftTimer);
          channel?.close();
          db?.close();
          localStorage.removeItem("mixbook.config");
          localStorage.removeItem("mixbook.recipe-draft");
          localStorage.removeItem("mixbook.stock-draft");
          localStorage.removeItem("mixbook.token");
          sessionStorage.removeItem("mixbook.token");
          await new Promise((resolve, reject) => {
            const q = indexedDB.deleteDatabase("mixbook");
            q.onsuccess = resolve;
            q.onerror = () => reject(q.error);
            q.onblocked = () =>
              reject(Error("请关闭其他 Mixbook 页面后重试。"));
          })
            .then(() => location.reload())
            .catch((e) => toast(e.message));
        }
        break;
    }
  });
  document.addEventListener("input", (e) => {
    const t = e.target;
    if (t.id === "recipe-search") {
      filters.q = t.value;
      clearTimeout(searchTimer);
      searchTimer = setTimeout(renderResults, 120);
    }
    if (t.id === "pantry-search") {
      pantryQ = t.value;
      clearTimeout(searchTimer);
      searchTimer = setTimeout(renderPantry, 120);
    }
    if (t.id === "material-search") {
      picker.q = t.value;
      picker.limit = 60;
      renderPicker();
    }
    if (t.closest("#recipe-form") || t.closest("#stock-form")) queueDraft();
  });
  document.addEventListener("change", async (e) => {
    const t = e.target;
    if (t.id === "source-filter") {
      filters.sourceName = t.value;
      renderResults();
    }
    if (t.id === "availability-filter") {
      filters.availability = t.value;
      renderResults();
    }
    if (t.id === "recipe-sort") {
      sort = t.value;
      if (sort === "random") randomOrder = [];
      renderResults();
    }
    if (t.id === "material-category") {
      picker.category = t.value;
      picker.limit = 60;
      renderPicker();
    }
    if (t.id === "detail-scale") {
      detailScale = Number(t.value);
      cookChecks.clear();
      openDetail($("#detail-dialog").dataset.recipe, selectedVersion, true);
    }
    if (t.id === "import-file") {
      await importData(t.files[0]);
      t.value = "";
    }
    if (t.closest("#recipe-form") || t.closest("#stock-form")) queueDraft();
  });
  document.addEventListener("submit", async (e) => {
    const form = e.target;
    if (
      ![
        "recipe-search-form",
        "recipe-form",
        "stock-form",
        "quick-material-form",
        "material-edit-form",
        "sync-form",
      ].includes(form.id)
    )
      return;
    e.preventDefault();
    if (form.id === "recipe-search-form") {
      clearTimeout(searchTimer);
      filters.q = form.elements["recipe-search"].value.trim();
      renderResults();
      return;
    }
    if (form.id === "recipe-form") {
      await saveRecipe(form);
      return;
    }
    if (form.id === "stock-form") {
      await saveStock(form);
      return;
    }
    if (form.id === "quick-material-form") {
      await createQuick(form);
      return;
    }
    if (form.id === "material-edit-form") {
      const f = new FormData(form),
        id = String(f.get("id")),
        name = String(f.get("name")).trim();
      if (
        env.data.ingredients.some(
          (x) => x.id !== id && C.norm(x.name) === C.norm(name),
        )
      ) {
        $("#material-edit-error").textContent =
          "已有同名原料，请使用现有定义。";
        return;
      }
      if (
        await update((d) => {
          const i = d.ingredients.find((x) => x.id === id),
            parent = d.ingredients.find((x) => x.id === f.get("parentId"));
          Object.assign(i, {
            name,
            parentId: parent.id,
            category: parent.category,
            brand: String(f.get("brand")).trim(),
            aliases: String(f.get("aliases"))
              .split(/[,，]/)
              .map((x) => x.trim())
              .filter(Boolean),
          });
          d.pantryItems.forEach((x) => {
            if (x.matches.includes(id) && x.name === ingredientName(id))
              x.name = name;
          });
        })
      ) {
        closeDialog($("#item-dialog"));
        render();
      }
      return;
    }
    if (syncBusy) return;
    const f = new FormData(form),
      next = {
        owner: String(f.get("owner")).trim(),
        repo: String(f.get("repo")).trim(),
        branch: String(f.get("branch")).trim(),
        path: String(f.get("path")).trim(),
        auto: f.has("auto"),
      };
    try {
      validateConfig(next);
      const nextToken = String(f.get("token")).trim();
      if (next.auto && !nextToken)
        throw Error("开启自动同步前，请填写访问令牌。");
      config = next;
      token = nextToken;
      remember = f.has("remember");
      clearTimeout(saveTimer);
      tokenStorage();
      closeDialog($("#sync-dialog"));
      render();
      toast("同步设置已保存。");
      if (config.auto) await sync(true);
    } catch (err) {
      $("#sync-error").textContent = err.message;
    }
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && e.target.id === "new-recipe-tag") {
      e.preventDefault();
      $("[data-action=add-recipe-tag]").click();
    }
    if (
      e.key === "Enter" &&
      e.target.matches("[name=unit]") &&
      e.target.closest("#editor-ingredients")
    ) {
      e.preventDefault();
      $("[data-add-row=ingredients]").click();
    }
  });
  for (const id of [
    "editor-dialog",
    "item-dialog",
    "material-dialog",
    "sync-dialog",
    "detail-dialog",
  ])
    $("#" + id)?.addEventListener("cancel", (e) => {
      e.preventDefault();
      closeById(id);
    });
  window.addEventListener("beforeunload", (e) => {
    if (editor || stockDraft) {
      captureEditor();
      captureStock();
      if (editor) {
        const saved = { ...C.clone(editor), savedAt: C.now() };
        writeLocal("mixbook.recipe-draft", saved);
        dbWrite("editor-draft", saved);
      }
      if (stockDraft) {
        const saved = { ...C.clone(stockDraft), savedAt: C.now() };
        writeLocal("mixbook.stock-draft", saved);
        dbWrite("stock-draft", saved);
      }
      e.preventDefault();
      e.returnValue = "";
    }
  });
  channel &&
    (channel.onmessage = async () => {
      if (editing()) {
        toast("其他页面的数据已更新，本次草稿已保留。");
        return;
      }
      await refreshState();
      render();
      if ($("#detail-dialog").open) {
        const id = $("#detail-dialog").dataset.recipe;
        if (env.data.recipes.some((r) => r.id === id))
          openDetail(id, selectedVersion, true);
        else closeDialog($("#detail-dialog"));
      }
    });
  window.addEventListener("online", () => {
    updateHeader();
    if (config.auto && !editing()) sync(false);
  });
  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "hidden") {
      if (editor) stashEditor();
      if (stockDraft) stashStock();
    } else if (config.auto && !editing()) sync(false);
  });
  setInterval(() => {
    if (document.visibilityState === "visible" && config.auto && !editing())
      sync(false);
  }, 60000);
  try {
    db = await new Promise((resolve, reject) => {
      const q = indexedDB.open("mixbook", 1);
      q.onupgradeneeded = () => q.result.createObjectStore("state");
      q.onsuccess = () => resolve(q.result);
      q.onerror = () => reject(q.error);
    });
    const stored = await dbRead("current");
    if (stored) {
      if (!(await dbRead("backup-before-v2-ui")))
        await dbWrite("backup-before-v2-ui", stored);
      env = {
        ...env,
        ...stored,
        data: C.installCatalog(stored.data, window.MIX_SEED),
      };
      if (env.base) env.base = C.installCatalog(env.base, window.MIX_SEED);
    }
    draftRecord = await dbRead("editor-draft");
    stockDraftRecord = await dbRead("stock-draft");
    await persist(env);
  } catch {
    db = null;
    storageError =
      "当前浏览器不能保存本地数据。你可以继续浏览与编辑，请及时导出本次记录。";
  }
  for (const [key, kind] of [
    ["mixbook.recipe-draft", "recipe"],
    ["mixbook.stock-draft", "stock"],
  ]) {
    const cached = readLocal(key, null),
      stored = kind === "recipe" ? draftRecord : stockDraftRecord;
    if (
      cached?.library &&
      cached.savedAt &&
      (!stored || cached.savedAt > stored.savedAt)
    ) {
      if (kind === "recipe") draftRecord = cached;
      else stockDraftRecord = cached;
    }
  }
  render();
  if (
    "serviceWorker" in navigator &&
    /^https?:$/.test(location.protocol) &&
    !window.MIX_STANDALONE
  )
    navigator.serviceWorker.register("./sw.js").catch(() => {});
  if (config.auto && token) sync(false);
})();
