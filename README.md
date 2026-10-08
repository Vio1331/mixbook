# 喝了么 v2.0.0

个人鸡尾酒记录工具，使用纯 HTML / CSS / JavaScript，可直接部署到 GitHub Pages。

## v2 使用方式

- 酒谱分为全部、我的配方和收藏，可切换卡片 / 列表，并按基酒、风味、来源和缺料筛选。
- 酒柜保存实际拥有的记录；原料目录维护可被配方引用的原料定义，两者分别显示。
- 配方逐行选择原料、填写用量，支持多行粘贴、可选原料、装饰和明确的替代项。
- 内置配方可以添加个人版本；复制保留来源和图片，变体用稳定的配方 ID 关联。
- 详情页支持制作杯数换算与逐步调制。数值及分数可以换算，“适量”等文本保持原样。
- 手机导航固定在底部，手机编辑器全屏；浅色 / 深色模式覆盖所有表单与选择器。

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

- 手动同步支持合并两端独立改动，以及明确的上传 / 下载覆盖；
- 自动同步只在保存设置后生效；
- 酒柜或配方正在编辑时暂停同步，填写过程中自动保留草稿，关闭后可继续；
- 建议升级网站前先在“同步与数据”页面导出备份；
- Token 不进入导出文件或网页源码。

## 程序文件

日常维护内容时不需要修改这些文件：

| 文件                             | 用途                   |
| -------------------------------- | ---------------------- |
| `index.html` / `styles.css`      | 页面与样式             |
| `app.js`                         | 页面交互、编辑和同步   |
| `core.js`                        | 数据校验、匹配和迁移   |
| `hierarchy.js`                   | 从内置目录读取导航层级 |
| `sw.js` / `manifest.webmanifest` | 离线缓存和主屏幕应用   |
| `tests/`                         | 自动测试               |

## 验证

```bash
node --test tests/core.test.cjs tests/materials.test.cjs tests/hierarchy.test.cjs tests/startup.test.cjs tests/icons.test.cjs
```

浏览器回归需安装 Python Playwright 和 Chromium：

```bash
python3 -m pip install playwright
CHROMIUM_PATH=/usr/bin/chromium python3 tests/browser.test.py
```

脚本自行启动本机 HTTP 服务。覆盖录入、原料匹配、替代项、版本、复制、草稿恢复、旧数据迁移、导出、多页面冲突、320–1440 px 布局、深色表单以及模拟 GitHub 合并和 409 写入失败。云端测试使用模拟响应，不会写入真实数据仓库。

用户数据继续采用 `schemaVersion: 4`、原数据库和稳定编号。首次更新时在 IndexedDB 的 `backup-before-v2-ui` 键保留原记录；草稿同时写入 IndexedDB 与本机恢复缓存。旧版 JSON 导入保持兼容。修改内置目录不会覆盖用户已标记的自定义定义、配方版本与个人笔记。

缓存只保证已经加载的配图可离线显示；外部 HTTPS 图片依赖网络。正常浏览器可持久保存，禁用本地存储时界面明确标记临时会话，并仍支持导出。
