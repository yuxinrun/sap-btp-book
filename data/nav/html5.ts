import type { RawGroup } from '../navigation';

export const html5Nav: RawGroup = {
  id: 'html5-applications',
  title: 'HTML5 Applications',
  shortTitle: 'HTML5 应用',
  icon: 'AppWindow',
  description: 'HTML5 Application Repository、App Router（托管 / 独立）、SAPUI5 与 Fiori 应用部署及常见错误。',
  sections: [
    {
      title: '概念与仓库',
      cockpitPath: 'Subaccount → HTML5 Applications；Subaccount → Services → Instances and Subscriptions',
      notes: [
        'HTML5 Application Repository 分为 Host（存储静态内容）与 Runtime（对外提供内容）两类能力，MTA 部署时通常分别创建对应服务实例。',
        '部署后的应用需通过 App Router 或 SAP Build Work Zone 暴露入口；直接访问 Repository 内容并不是标准的业务访问方式。',
        '应用的 xs-app.json 定义路由、认证方式与 Destination 映射，是前端请求转发规则的核心文件。',
      ],
      docs: [
        ['SAPUI5 SDK', 'https://ui5.sap.com/'],
        ['SAP BTP 官方文档（搜索 HTML5 Application Repository）', 'https://help.sap.com/docs/btp'],
      ],
      items: [
        ['html5-concepts', 'HTML5 Applications 概念', '把 SAPUI5 / Fiori / 任意静态前端托管在 BTP 中，并由 App Router 统一处理认证与路由转发。'],
        ['html5-repo', 'HTML5 Application Repository', 'BTP 中存放前端静态资源的服务，支持按应用名与版本管理内容。'],
        ['html5-repo-host', 'HTML5 Apps Repository Host', '负责接收并存储部署产物的服务实例能力，MTA 中常作为资源被 UI 模块引用。'],
        ['html5-repo-runtime', 'HTML5 Apps Repository Runtime', '负责在运行时读取并向 App Router 提供静态内容的服务实例能力。'],
      ],
    },
    {
      title: '部署与访问',
      cockpitPath: 'Subaccount → HTML5 Applications → 应用列表 / Subscribe',
      notes: [
        '部署前端模块通常以 MTA 的 `com.sap.portal.site-content` 或 HTML5 模块类型上传内容，并配置 xs-app.json。',
        'Managed App Router 由 SAP 提供共享实例，适合标准场景；Standalone App Router 由项目自行部署，可完全控制路由与中间件。',
        '访问入口可能在 Subaccount 的 HTML5 Applications 列表、Managed App Router 的订阅 URL，或 Work Zone 站点中，取决于采用的方案。',
      ],
      commands: [
        ['mbt build -p=cf', '构建含 UI 模块的 MTA 项目，生成 .mtar 归档'],
        ['cf deploy mta_archives/<FILE>.mtar', '部署前端模块与 Repository 服务实例'],
        ['cf html5-list', '通过 HTML5 Repository 插件列出已部署的前端应用（需安装对应插件）'],
      ],
      docs: [
        ['SAPUI5 SDK', 'https://ui5.sap.com/'],
        ['SAP Samples（官方示例仓库）', 'https://github.com/SAP-samples'],
      ],
      items: [
        ['html5-deploy', 'HTML5 Application 部署', '把构建后的前端产物上传到 HTML5 Application Repository，并配置应用名与访问路径。'],
        ['html5-subscribe', 'HTML5 Application 订阅', '订阅应用级入口（如 Managed App Router），获取可供业务用户访问的 URL。'],
        ['html5-ui5-deploy', 'SAPUI5 应用部署', '构建 UI5 项目、编写 xs-app.json 与 mta.yaml，部署到 BTP 并通过 App Router 访问。'],
        ['html5-fiori-deploy', 'Fiori 应用部署', 'Fiori 应用（自由式或扩展项目）部署与发布到 Work Zone 内容提供者的完整链路。'],
        ['html5-access', 'HTML5 应用访问', '说明应用 URL 组成、Subdomain、App Router 与 Route 之间的关系，以及常见 404 原因。'],
      ],
    },
    {
      title: 'App Router 与集成',
      cockpitPath: '项目 xs-app.json / manifest.yml / mta.yaml',
      notes: [
        'App Router 是 Node.js 组件（@sap/approuter），负责会话、登录跳转、把请求按 xs-app.json 路由规则转发到后端或静态资源。',
        '"authenticationType": "xsuaa" 让路由要求用户登录；"none" 用于公开路径（如健康检查或静态资源）。',
        '路由的 destination 字段引用 Destination Service 中的目标名，service 字段引用绑定的服务实例名。',
      ],
      commands: [
        ['npm install @sap/approuter', '在本地项目中引入 SAP Approuter 依赖'],
        ['cf push -f manifest.yml', '部署独立 App Router 应用'],
      ],
      docs: [
        ['@sap/approuter（npm）', 'https://www.npmjs.com/package/@sap/approuter'],
        ['SAP BTP 官方文档（搜索 Application Router）', 'https://help.sap.com/docs/btp'],
      ],
      items: [
        ['html5-app-router', 'App Router', 'BTP 前端统一入口组件，处理登录会话、路由转发与静态资源代理。'],
        ['html5-managed-router', 'Managed App Router', '由 SAP 托管与维护的共享 App Router，项目只需订阅并配置内容，无需自行部署 Node.js 应用。'],
        ['html5-standalone-router', 'Standalone App Router', '项目自行部署的 @sap/approuter 应用，可定制扩展中间件与路由逻辑。'],
        ['html5-destination-integration', 'HTML5 应用与 Destination 集成', '在 xs-app.json 中按 destination 名称转发请求，由 Destination Service 提供目标地址与认证。'],
        ['html5-xsuaa-integration', 'HTML5 应用与 XSUAA 集成', 'App Router 绑定 XSUAA 实例完成登录跳转，并把 JWT 传递给后端服务。'],
        ['html5-common-errors', 'HTML5 应用常见错误', '覆盖 404 / 403 / 401、xs-app.json 路由顺序错误、Repository 服务未绑定与缓存问题。'],
      ],
    },
  ],
};
