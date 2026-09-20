# 一杯手记 · Mixbook v0.1

个人鸡尾酒工具。纯 HTML / CSS / JavaScript，无构建依赖，无服务器，无付费数据库。

## 现在可以用什么

- 8 份可编辑示例配方（酒柜初始为空）；中文 / 英文 / 材料别名搜索。
- 基酒、风味、制作方式、收藏、材料可用性筛选；同一维度多选取并集，不同维度取交集。
- 配方详情、新增、编辑、复制、删除、个人笔记、来源；自动收录新材料。
- 酒柜“有 / 没有”勾选，显示材料齐全与只差一种。可选配料不阻挡匹配；不计算剩余用量，不自动替换材料。
- IndexedDB 本地保存，JSON 导入 / 导出。
- GitHub Contents API 同步：首次连接确认、私有仓库校验、三方合并、冲突项人工选择、旧 SHA 写入保护。
- PWA 清单与离线应用外壳缓存；静态部署后可添加到 iPhone 主屏幕。

## 先试用

本交付另附 `Mixbook-preview.html` 单文件预览。用浏览器打开即可试用；部分文件预览器会禁用本地数据库，页面会明确提示“临时会话”，此时请导出备份。

GitHub 可部署文件在此压缩包根目录，包含 `index.html`、`app.js` 等。第一次访问需要网络；离线仅能使用已缓存的应用与本机数据。

在电脑上使用本地服务测试（需要 Python 3）：

```bash
python3 -m http.server 8000
```

浏览器打开 `http://localhost:8000`。预览文件、本地服务、部署网址是不同来源，本地数据不会自动互通；可通过导入 / 导出或 GitHub 同步迁移。

## 免费部署到 GitHub Pages

1. 创建公开仓库，例如 `mixbook`。
2. 把本压缩包根目录里的网页文件上传到仓库根目录（确保根目录有 `index.html`）。不要上传任何 Token 或私有数据备份。
3. Settings → Pages → Deploy from a branch → main → `/ (root)`。
4. 等待 Pages 给出网址，再通过 Safari 的分享菜单添加到主屏幕。

网页程序公开，不包含你录入的配方与库存。数据仓库单独保持私有。

## 配置 GitHub 数据同步

1. 再创建一个**私有仓库**，例如 `mixbook-data`，勾选添加 README 以初始化默认分支。
2. GitHub Settings → Developer settings → Personal access tokens → Fine-grained tokens。
3. 只选择 `mixbook-data` 仓库，Repository permissions → Contents → Read and write；Metadata 为 GitHub 必需的自动只读权限。无需 Actions / Administration / Workflows 权限。
4. 在网页“同步与数据”填用户名、仓库名、Token。分支留空即可，文件默认 `mixbook.json`。
5. 点击“连接并同步”。新文件创建前会提示确认；已有数据时可选择采用云端或合并。

Token 默认只保存在当前浏览器会话。勾选“在此设备记住”后存于当前来源的浏览器本地存储，它不是系统钥匙串；只在自己的设备使用。令牌不进入数据文件、备份、网页源码或日志。到期、撤销或清理浏览器后，需要重新配置。不要将令牌发到聊天里。

自动同步默认关闭。开启后，在保存后、返回前台和前台每 60 秒尝试同步；不承诺 iOS 后台定时同步。打开编辑表单时暂停自动同步，避免干扰编辑。

## 同步与备份边界

- 本地可修改时立即保存；网络不可用时保留本地修改。
- 配方以稳定 ID 标识。三方合并比较“上次同步版本 / 本机 / 云端”，不同配方可合并，同一配方的双端变化（包括删除对编辑）会提示冲突。
- 冲突选择只作用于冲突项，不覆盖整份酒谱。处理重要冲突前可取消并导出备份。
- 写入使用远端文件 SHA；同步过程中远端若再次变化，写入失败后提示重试，不强行覆盖。
- 已实现 GitHub API 调用，但本交付没有访问令牌或真实数据仓库，**未进行真实 GitHub 读写验收**。
- 初版不建议多标签页同时编辑；每台设备一次使用一个标签页。
- 导入文件上限 4 MiB；GitHub 标准 Base64 Contents 读取适合 1 MiB 以下文件。大量照片不应内嵌到 JSON 中。
- 清理网站数据可能移除本机记录与连接信息，请定期导出备份。

## 文件结构

| 文件 | 职责 |
|---|---|
| `index.html` | 页面入口、对话框容器、PWA 元信息 |
| `styles.css` | 桌面与手机布局、视觉规范 |
| `app.js` | 界面、IndexedDB、导入导出、GitHub 同步 |
| `core.js` | 数据校验、筛选、材料匹配、三方合并 |
| `seed.js` | 内置示例配方与材料 |
| `sw.js` | 离线外壳缓存；不缓存 GitHub API 请求 |
| `manifest.webmanifest` | 添加到主屏幕所需元信息 |
| `assets/` | 站点图标与示意图 |
| `tests/core.test.cjs` | 匹配、合并、校验等核心行为测试 |

当前版本没有外部字体、统计脚本或第三方前端依赖。示例文字只通过转义后进入页面；导入字段使用白名单校验。WebMCP 若浏览器支持，会提供只读酒谱搜索；支持环境下的实际注册验收未执行，不影响正常网页使用。

## 示例来源

四份示例参考 IBA 官方材料比例与方法，中文步骤为整理表达，装饰按本工具用途标记为可选或省略：

- [Negroni](https://iba-world.com/iba-cocktail/negroni/)
- [Daiquiri](https://iba-world.com/iba-cocktail/daiquiri/)
- [Margarita](https://iba-world.com/iba-cocktail/margarita/)
- [Whiskey Sour](https://iba-world.com/iba-cocktail/whiskey-sour/)

金汤力、威士忌嗨棒、伏特加苏打、柠檬苏打为练习用示例比例，不声明为 IBA 配方。尼格罗尼图片为 AI 生成示意，装饰与配方可能不同。

## 已完成验证

JavaScript 语法检查、静态资源引用检查，以及 12 项自动化验证（包括启动检查）（匹配、筛选、合并、删除冲突、导入校验与危险编号校验）。尚未做真实 iPhone 安装、云端 GitHub 读写和完整浏览器界面验收。

开发者可在根目录运行：

```bash
node --test tests/*.test.cjs
```

后续可以继续细化视觉、配方字段、材料层级和上传照片。这一版先保持数据模型与免费部署路径简单。
