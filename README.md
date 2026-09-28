# 喝了么 v1.0.0

个人鸡尾酒记录工具，使用纯 HTML / CSS / JavaScript，可直接部署到 GitHub Pages。

## 维护网站内容：只改 `catalog.js`

网站的全部内置内容都在仓库根目录的 **`catalog.js`**：

- `menus`：一级菜单、二级菜单和菜单顺序
- `ingredients`：目录、标签以及内置配方用到的具体材料
- `recipes`：102 条内置鸡尾酒配方
- `recipe`：可选的风味标签、杯型和来源

修改 `catalog.js` 并保存后，刷新网页即可看到变化。不需要运行生成命令，也不要再去其他文件重复修改同一份数据。

### 修改鸡尾酒中文名

在 `catalog.js` 中搜索配方 ID 或旧中文名，例如：

```js
"id": "iba-negroni",
"name": "尼格罗尼"
```

修改 `name`，保存并刷新网页。

### 修改配方材料

每个配方的 `ingredients` 是调酒材料，`garnishes` 是装饰：

```js
"ingredients": [
  { "id": "gin", "amount": "30", "unit": "ml", "optional": false }
]
```

材料 `id` 必须能在同一个 `catalog.js` 的 `ingredients` 中找到。

### 修改目录或标签

在同一个文件中修改：

- `menus` 决定一级菜单、二级菜单及显示顺序；
- `ingredients` 中 `builtInTag: true` 表示内置标签，`parentId` 决定标签属于哪个一级或二级菜单；
- `menus` 中使用的 ID 必须在 `ingredients` 中存在。

已经发布的 ID 尽量不要修改。名称可以直接修改。

### 修改图片

配方的 `image` 对应：

```text
assets/cocktails/<image>.webp
```

例如 `"image": "Negroni"` 使用 `assets/cocktails/Negroni.webp`。

## 不需要维护的数据文件

以前的 `seed.js`、`cocktail-system.js`、`data/recipes.tsv`、`data/ingredient-details.json`、`data/sources.json` 以及目录构建脚本都已删除。它们的内容已经合并进 `catalog.js`。

`tests/fixtures/legacy-seed.js` 只是自动测试旧数据升级的样本，不是当前网站内容，不需要修改。

## 本地运行

```bash
python3 -m http.server 8000
```

访问 `http://localhost:8000`。也可以直接部署到 GitHub Pages。

## 用户自己的数据

用户新增的配方、材料、酒柜、比例和收藏保存在浏览器 IndexedDB 中，也可以同步到用户自己的私有 GitHub 仓库。用户数据不会写回 `catalog.js`。

- 手动同步会先选择上传或下载方向；
- 自动同步只在保存设置后生效；
- 酒柜或配方正在编辑时暂停同步；
- 建议升级网站前先在“同步与数据”页面导出备份；
- Token 不进入导出文件或网页源码。

## 程序文件

日常维护内容时不需要修改这些文件：

| 文件 | 用途 |
|---|---|
| `index.html` / `styles.css` | 页面与样式 |
| `app.js` | 页面交互、编辑和同步 |
| `core.js` | 数据校验、匹配和迁移 |
| `hierarchy.js` / `materials.js` | 目录读取与材料选择器 |
| `sw.js` / `manifest.webmanifest` | 离线缓存和主屏幕应用 |
| `tests/` | 自动测试 |

## 验证

```bash
node --test tests/core.test.cjs tests/materials.test.cjs tests/hierarchy.test.cjs tests/startup.test.cjs
```
