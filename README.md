# SAP BTP 中文学习中心

> 从零入门到企业级实战，全面掌握 SAP Business Technology Platform。

一个基于 **Next.js 15 (App Router) + TypeScript + Tailwind CSS + shadcn/ui 风格组件（Radix 原语）+ MDX** 的中文技术文档 / 教程网站。教程内容与页面布局分离，方便持续增加文章。

本站为独立制作的中文学习网站，**不是 SAP 官方产品界面，也不是 SAP 官方网站**。

---

## 一、已实现的功能

| 能力 | 实现 |
| --- | --- |
| 布局 | 顶部导航 + 左侧三级折叠菜单（PC 固定 / 移动端抽屉）+ 正文 + 右侧章节目录与学习进度 |
| 首页 | 11 个模块：知识地图、六阶段路线、Cockpit 功能导航、热门教程、XSUAA 专题、Cloud Foundry 专题、CAP 专题、视频中心、最新教程、FAQ、官方资源 |
| 教程系统 | MDX 长文 + 结构化数据「知识速览页」，两种页面都按统一 24 节模板渲染 |
| 代码 | Shiki 服务端高亮、明暗双主题、一键复制、横向滚动 |
| 图表 | Mermaid 客户端渲染，跟随主题，明确标注为自绘示意图 |
| 图片 | 点击放大（Radix Dialog lightbox）、中文说明；站内图片均为本站自绘示意图，明确标注「非真实截图」，名称与数值均为占位符 |
| 视频 | SAP 官方站点/频道入口卡片；响应式 YouTube iframe 组件与「粘贴已核实链接嵌入」工具，不虚构视频 ID |
| 搜索 | 构建时生成全站索引（教程全文、标题、术语、命令、错误），支持全文 / 仅标题、键盘导航、`Ctrl/Cmd + K` |
| 学习功能 | 学习进度、收藏、最近阅读（LocalStorage），六阶段完成度统计 |
| 主题 | `next-themes` 明暗切换，跟随系统 |
| SEO | 每页 metadata（标题 / 描述 / 关键词 / canonical / Open Graph）、`sitemap.xml`、`robots.txt` |
| 响应式 | PC / 平板 / 手机，代码区横向滚动、表格可横滑、图片与视频自适应 |
| 其他 | 面包屑、自动生成目录、上一篇/下一篇、反馈、术语词典、命令速查、配置速查、排错知识库、FAQ |

### 内容规模

- 导航：`13` 个一级模块、`220+` 个条目，全部有独立的中文知识内容（不是相同占位文字）。
- 完整长文：`21` 篇按 24 节统一模板撰写的分步骤教程，含完整配置文件、代码、命令、预期结果与排错清单。
- 重点内容：XSUAA 完整实战（项目三）、Cloud Foundry 部署（CLI + 项目二）、CAP + HANA Cloud（项目四）、SAPUI5 部署（项目五）、S/4HANA 集成（项目六）。

---

## 二、本地运行

### 环境要求

- Node.js **>= 20.9**（推荐 20 LTS 或 22 LTS）
- npm 10+（或 pnpm / yarn，需自行调整 lockfile）

### 步骤

```bash
cd sap-btp-book
npm install
npm run dev
```

打开 `http://localhost:3000`。

### 常用脚本

```bash
npm run dev         # 开发服务器
npm run build        # 生产构建（含全部静态页面与搜索索引）
npm run start        # 启动生产构建产物
npm run typecheck    # TypeScript 类型检查
```

> 首次 `npm run build` 会静态生成 260+ 个页面，耗时约 1–3 分钟，属正常现象。

---

## 三、项目结构

```text
sap-btp-book/
├── app/                          # Next.js App Router 页面与路由
│   ├── layout.tsx                # 根布局（SEO、Provider、Header、Footer）
│   ├── page.tsx                  # 首页
│   ├── learn/                   # 六阶段学习路线
│   ├── tutorials/               # 教程目录
│   ├── projects/                 # 实战项目中心 + 项目详情
│   ├── videos/                   # 视频中心
│   ├── resources/                # 资源中心（命令/配置/排错/FAQ/官方链接/图片说明）
│   ├── glossary/                 # 术语词典
│   ├── my/                       # 我的学习（收藏/进度/最近阅读）
│   ├── docs/[id]/                # 统一教程详情页（MDX 或知识速览）
│   ├── sitemap.ts / robots.ts    # SEO
│   └── not-found.tsx
├── components/                   # UI 组件（按职责分目录）
│   ├── layout/                   # Header / Footer / DocsShell
│   ├── sidebar/                  # 三级折叠菜单
│   ├── navigation/               # 面包屑
│   ├── tutorial/                 # MDX 组件、教程元信息、目录、页脚
│   ├── code/                     # 代码高亮、复制、Mermaid
│   ├── video/                    # YouTube 播放与嵌入工具
│   ├── search/                   # 全站搜索
│   ├── home/ learn/ tutorials/ resources/ glossary/ my/
│   └── common/                   # Provider、主题切换、图片放大
├── content/tutorials/*.mdx       # 完整教程正文（内容与布局分离）
├── data/                         # 导航、学习路线、视频、术语、速查、服务详解、项目元数据
│   ├── nav/*.ts                  # 12 个功能模块 + 实战项目的导航定义
│   ├── navigation.ts             # 导航类型、构建与索引工具
│   ├── learning-path.ts / videos.ts / glossary.ts / cheatsheets.ts
│   ├── services-detail.ts / projects.ts / official.ts
├── lib/                          # content.ts（MDX 读取/TOC/搜索索引）、progress.tsx、highlight.ts、utils.ts
├── public/images/                # 本站自绘的 Cockpit 页面结构示意图（SVG，无真实数据）
├── styles/globals.css            # Tailwind、主题变量、正文排版、代码高亮双主题
└── README.md
```

---

## 四、如何新增教程内容（重要）

### 1. 已有导航条目：直接写 MDX

在 `content/tutorials/` 新建 `<id>.mdx`，`<id>` 必须与 `data/nav/*.ts` 中该条目的 id 一致。页面会自动从「知识速览」升级为「完整教程」，搜索索引与站点地图也会自动包含全文。

Frontmatter 模板：

```yaml
---
title: 教程标题
description: 用于 SEO 与卡片摘要的一句话
difficulty: 入门            # 入门 | 进阶 | 高级
duration: 30 分钟
audience: 初学者、CAP 开发者
keywords: [XSUAA, Scope]
updated: 2026-11-10
docVersion: 以 SAP Help Portal 当前版本为准
objectives:
  - 学习目标一
  - 学习目标二
prerequisites:
  - 前置知识一
cockpitPath: Subaccount → Services → Service Marketplace
related: [xsuaa-what-is, cf-push]
officialDocs:
  - title: SAP BTP 官方文档
    url: https://help.sap.com/docs/btp
caveat: 可选，版本差异或待验证说明
---
```

正文按统一 24 节模板编写。页面会渲染第 1–5、9、23、24 节，MDX 负责第 6–22 节，建议标题编号如下：

```markdown
## 6. 功能是什么？
## 7. 为什么需要这个功能？
## 8. 实际业务应用场景
## 10. 操作前需要准备什么？
## 11. 详细操作步骤
## 12. 每一步需要填写的参数
## 13. 配置截图或界面示意图
## 14. 完整配置文件
## 15. 完整代码示例
## 16. 命令行操作
## 17. 执行后的预期结果
## 18. 如何验证是否成功
## 19. 常见错误及解决方案
## 20. 安全注意事项
## 21. 本章总结
## 22. 实战练习
```

MDX 中可用组件：`<Callout type="info|warning|danger|success|verify">`、`<Figure src="" caption="" />`、`<OfficialNote />`、`<VideoCard />`、`<YouTubeEmbed id="" />`、`<Mermaid />`；` ```mermaid ` 代码块会自动渲染为架构图；普通代码块自动高亮并带复制按钮；Markdown 图片自动支持点击放大。

> MDX 正文中的占位符（如 `<SUBDOMAIN>`）请用反引号包裹，避免被解析为 JSX 标签。

### 2. 新增导航条目

在对应的 `data/nav/*.ts` 中，往 `items` 加一行：

```ts
['my-new-topic-id', '新教程标题', '一句话说明该知识点是什么、作用在哪一层'],
```

无需改任何页面代码：路由 `/docs/my-new-topic-id` 会立即生效（渲染知识速览页），搜索索引、上一篇/下一篇、站点地图也会自动更新。随后按第 1 步补写 MDX 即可。

### 3. 新增一级模块 / 二级分类

在 `data/nav/` 新建模块文件（参照现有文件的 `RawGroup` 结构），并加入 `data/nav/index.ts` 的 `rawNavigation` 数组。图标名需存在于 `components/sidebar/Sidebar.tsx` 的 `iconMap` 中。

### 4. 修改首页 / 学习路线 / 视频 / 术语 / 速查

分别编辑 `data/learning-path.ts`、`data/videos.ts`、`data/glossary.ts`、`data/cheatsheets.ts`、`data/services-detail.ts`、`data/projects.ts`、`data/official.ts`，以及 `app/page.tsx` 中的精选列表。

---

## 五、部署

### Vercel

1. 把仓库导入 Vercel，框架选择 **Next.js**（自动识别）。
2. 构建命令 `npm run build`，输出目录使用默认（`.next`）。
3. 可选环境变量：`NEXT_PUBLIC_SITE_URL`（站点规范域名，用于 canonical 与 sitemap）。未设置时使用 `https://sap-btp-cn.example.com`，**上线前请务必改成真实域名**。
4. 无需数据库：搜索索引在构建时生成，学习进度保存在浏览器 LocalStorage。

### 标准 Node.js 环境

`next.config.mjs` 已启用 `output: 'standalone'`：

```bash
npm ci
npm run build
cp -r public .next/standalone/public
cp -r .next/static .next/standalone/.next/static
node .next/standalone/server.js
```

默认监听 `3000`，可用 `PORT` / `HOSTNAME` 环境变量调整。若部署在反向代理后，请正确设置 `NEXT_PUBLIC_SITE_URL`。

### 静态托管

本站使用服务端读取 MDX 与静态生成，不建议使用纯静态文件托管；如需纯静态导出，需要改造内容读取层（当前依赖 `node:fs`）。

---

## 六、内容真实性策略（务必阅读）

1. **官方来源**：只使用已核实的 SAP 官方入口（`help.sap.com/docs/btp`、`developers.sap.com`、`learning.sap.com`、`github.com/SAP-samples`、`community.sap.com`、`discovery-center.cloud.sap`、`youtube.com/@SAPTechnology` 等），集中在 `data/official.ts`。不提供未经核实的产品深链。
2. **不编造**：不虚构 Cockpit 菜单、按钮、服务计划或参数。无法确定的内容明确标注 **待验证**，并提示以当前租户界面与官方文档核对。
3. **区分差异**：明确区分 Trial / Free Tier / 商业账号、Cloud Foundry / Kyma / ABAP 环境、IAS 与 XSUAA、Managed 与 Standalone App Router、订阅与服务实例。
4. **图片**：站内不使用真实 Cockpit 截图，也不使用第三方提供的截图。`public/images/` 下仅存放本站自绘的 SVG 示意图（菜单结构、字段位置），图中名称、ID、域名与数量全部为占位符，不含真实租户数据、企业名称与个人信息；页面图注明确标注「本站自绘、非真实截图」。所有架构图均为本站自绘 Mermaid，图注明确写「非 SAP Cockpit 截图」。
5. **视频**：不内置任何未经核实的 YouTube 视频 ID；提供官方站点/频道入口与原始链接，嵌入能力由用户粘贴已核实链接时启用。
6. **安全**：示例中的账号、密码、URL、Region、Client Secret、Token 全部使用 `<PLACEHOLDER>` 占位符；生产环境建议密钥管理、凭据轮换、最小权限与审计。
7. **版权**：不复制大段官方教程原文，使用自己的中文解释并注明来源。

---

## 七、后续扩展建议

- 把 LocalStorage 进度替换为真实用户账号 + 数据库（接口预留于 `lib/progress.tsx`）。
- 增加服务端搜索（当前为构建时静态索引，客户端过滤）。
- 增加文章版本记录与「内容核实时间」字段。
- 增加教程 PDF / 离线下载、示例代码压缩包下载。
- 接入真实且已核实的官方视频 ID，补充中文字幕说明。
- 增加多语言与术语搜索的拼音支持。

---

## 八、常见问题

**Q：为什么构建时有 260+ 个页面？**
A：每个导航条目都生成一个静态教程页，全部有真实内容；这是 `generateStaticParams` + 结构化知识页的设计结果。

**Q：搜索索引在哪里？**
A：`lib/content.ts` 的 `buildSearchIndex()` 在构建时读取 MDX 与 `data/` 生成，通过根布局传给客户端搜索组件，无需额外服务。

**Q：修改 MDX 后没生效？**
A：开发模式下热更新；生产模式需重新 `npm run build`。

**Q：中文文件名 / 路径问题？**
A：所有教程 id 使用小写英文与连字符，中文标题只在 frontmatter 与导航数据中维护，避免路由编码问题。
