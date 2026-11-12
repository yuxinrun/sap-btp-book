/** 命令速查 / 配置文件速查 / 排错知识库 / FAQ */

export interface CheatGroup {
  id: string;
  title: string;
  description: string;
  entries: { command: string; description: string }[];
}

export const commandCheatsheets: CheatGroup[] = [
  {
    id: 'cf-login',
    title: 'CF 登录与目标',
    description: '所有命令中的 <API_ENDPOINT>、<ORG>、<SPACE>、<USER_EMAIL> 均为占位符。',
    entries: [
      { command: 'cf version', description: '查看 cf CLI 版本，建议使用 v8' },
      { command: 'cf api <API_ENDPOINT>', description: '设置 Cloud Foundry API Endpoint（Subaccount 概览页可查）' },
      { command: 'cf login', description: '交互式登录，按提示输入账号与密码' },
      { command: 'cf login --sso', description: '使用一次性授权码通过浏览器完成单点登录' },
      { command: 'cf login -a <API_ENDPOINT> -o <ORG> -s <SPACE>', description: '一次性指定 API、Org 与 Space 登录' },
      { command: 'cf target', description: '确认当前 API / Org / Space / 用户，部署前必查' },
      { command: 'cf orgs', description: '列出可访问的 Org' },
      { command: 'cf spaces', description: '列出当前 Org 下的 Space' },
    ],
  },
  {
    id: 'cf-apps',
    title: '应用部署与运维',
    description: 'manifest.yml 中的配置会自动被同目录下的 cf push 读取。',
    entries: [
      { command: 'cf push', description: '按当前目录 manifest.yml 部署应用' },
      { command: 'cf push <APP> -f manifest.yml', description: '指定应用名与 manifest 文件部署' },
      { command: 'cf apps', description: '列出应用、实例数与运行状态' },
      { command: 'cf app <APP>', description: '查看单个应用的路由、内存、磁盘与实例明细' },
      { command: 'cf logs <APP> --recent', description: '查看最近日志，定位启动失败' },
      { command: 'cf logs <APP>', description: '实时跟踪应用日志' },
      { command: 'cf env <APP>', description: '查看环境变量，确认 VCAP_SERVICES 是否包含预期服务' },
      { command: 'cf restart <APP>', description: '重启应用（不重新构建）' },
      { command: 'cf restage <APP>', description: '重新 staging，使绑定与依赖变更生效' },
      { command: 'cf scale <APP> -m 512M -i 2', description: '调整内存与实例数（需在配额范围内）' },
      { command: 'cf delete <APP> -r', description: '删除应用并清理 Route' },
      { command: 'cf routes', description: '列出当前 Space 的路由' },
    ],
  },
  {
    id: 'cf-services',
    title: '服务实例与绑定',
    description: '服务与计划名请以 cf marketplace 的实际输出为准。',
    entries: [
      { command: 'cf marketplace', description: '列出可创建的服务与计划' },
      { command: 'cf create-service <SERVICE> <PLAN> <INSTANCE>', description: '创建服务实例' },
      { command: 'cf services', description: '列出服务实例、计划与绑定关系' },
      { command: 'cf service <INSTANCE>', description: '查看服务实例创建进度与状态' },
      { command: 'cf bind-service <APP> <INSTANCE>', description: '绑定实例到应用' },
      { command: 'cf unbind-service <APP> <INSTANCE>', description: '解除绑定' },
      { command: 'cf create-service-key <INSTANCE> <KEY_NAME>', description: '生成可导出的服务凭据' },
      { command: 'cf service-keys <INSTANCE>', description: '列出实例的 Service Key' },
      { command: 'cf service-key <INSTANCE> <KEY_NAME>', description: '输出 Service Key 内容（含敏感凭据，注意保管）' },
      { command: 'cf delete-service-key <INSTANCE> <KEY_NAME> -f', description: '删除 Service Key' },
      { command: 'cf delete-service <INSTANCE> -f', description: '删除服务实例（需先解绑）' },
    ],
  },
  {
    id: 'cf-spaces',
    title: 'Org / Space 成员与配额',
    description: '生产环境请遵循最小权限原则分配角色。',
    entries: [
      { command: 'cf create-space <SPACE> -o <ORG>', description: '创建 Space' },
      { command: 'cf target -o <ORG> -s <SPACE>', description: '切换目标 Org / Space' },
      { command: 'cf space-users <ORG> <SPACE>', description: '列出 Space 中带角色的用户' },
      { command: 'cf set-space-role <USER_EMAIL> <ORG> <SPACE> SpaceDeveloper', description: '授予 Space Developer 角色' },
      { command: 'cf unset-space-role <USER_EMAIL> <ORG> <SPACE> SpaceDeveloper', description: '回收 Space Developer 角色' },
      { command: 'cf space-quotas', description: '列出 Space 配额定义' },
    ],
  },
  {
    id: 'mta-cap',
    title: 'MTA 与 CAP 常用命令',
    description: 'MBT（Cloud MTA Build Tool）与 CDS 开发工具需按各自官方文档安装。',
    entries: [
      { command: 'npm install -g @sap/cds-dk', description: '安装 CAP 开发工具（cds 命令）' },
      { command: 'cds init <PROJECT>', description: '初始化 CAP 项目' },
      { command: 'cds watch', description: '本地启动 CAP 服务并监听文件变更' },
      { command: 'cds add hana, xsuaa, approuter, mta', description: '为 CAP 项目追加生产部署所需配置（按项目需要选择）' },
      { command: 'mbt build -p=cf', description: '按 mta.yaml 构建 .mtar 归档' },
      { command: 'cf install-plugin multiapps', description: '安装 MultiApps CF CLI 插件（按插件仓库实际名称执行）' },
      { command: 'cf deploy mta_archives/<FILE>.mtar', description: '部署 MTA 归档' },
      { command: 'cf mtas', description: '列出已部署的 MTA' },
      { command: 'cf undeploy <MTA_ID> --delete-services', description: '卸载 MTA 并删除关联服务' },
    ],
  },
];

export interface ConfigReference {
  id: string;
  filename: string;
  title: string;
  description: string;
  language: string;
  code: string;
  tutorialId: string;
}

export const configReferences: ConfigReference[] = [
  {
    id: 'xs-security',
    filename: 'xs-security.json',
    title: 'XSUAA 安全描述',
    description: '定义应用标识、Scope 与 Role Template；xsappname 必须在同一租户中保持唯一。',
    language: 'json',
    tutorialId: 'xsuaa-xs-security-json',
    code: `{
  "xsappname": "btp-learning-<SUBDOMAIN>",
  "tenant-mode": "dedicated",
  "description": "SAP BTP 中文学习中心示例应用",
  "scopes": [
    { "name": "$XSAPPNAME.Display", "description": "查看业务数据" },
    { "name": "$XSAPPNAME.Admin", "description": "访问管理员功能" }
  ],
  "role-templates": [
    { "name": "Viewer", "description": "业务查看者", "scope-references": ["$XSAPPNAME.Display"] },
    { "name": "Administrator", "description": "管理员", "scope-references": ["$XSAPPNAME.Display", "$XSAPPNAME.Admin"] }
  ],
  "oauth2-configuration": {
    "redirect-uris": ["https://<APP_HOST>/login/callback"]
  }
}`,
  },
  {
    id: 'xs-app',
    filename: 'xs-app.json',
    title: 'App Router 路由与认证',
    description: 'routes 按顺序匹配；公开路径用 none，受保护路径用 xsuaa 并声明所需 Scope。',
    language: 'json',
    tutorialId: 'xsuaa-q11-xs-app-json',
    code: `{
  "welcomeFile": "/index.html",
  "authenticationMethod": "route",
  "logout": { "logoutEndpoint": "/do/logout", "logoutPage": "/" },
  "routes": [
    { "source": "^/admin/(.*)$", "target": "$1", "destination": "backend-api", "authenticationType": "xsuaa", "scope": "$XSAPPNAME.Admin" },
    { "source": "^/api/(.*)$", "target": "$1", "destination": "backend-api", "authenticationType": "xsuaa" },
    { "source": "^(/.*)$", "target": "$1", "service": "html5-apps-repo-rt", "authenticationType": "xsuaa" }
  ]
}`,
  },
  {
    id: 'manifest',
    filename: 'manifest.yml',
    title: 'Cloud Foundry 应用清单',
    description: 'services 中列出的实例必须已经在当前 Space 中创建，否则 push 会失败。',
    language: 'yaml',
    tutorialId: 'cf-manifest-yml',
    code: `---
applications:
  - name: btp-learning-api
    memory: 512M
    disk_quota: 512M
    instances: 1
    buildpacks:
      - nodejs_buildpack
    command: node app.js
    random-route: true
    services:
      - btp-learning-xsuaa
      - btp-learning-destination
    env:
      NODE_ENV: production`,
  },
  {
    id: 'mta',
    filename: 'mta.yaml',
    title: 'MTA 多模块部署描述',
    description: 'resources 中声明的服务实例由部署过程自动创建，模块通过 requires 引用。',
    language: 'yaml',
    tutorialId: 'cf-mta-deploy',
    code: `_schema-version: '3.1'
ID: btp-learning
version: 1.0.0

modules:
  - name: btp-learning-api
    type: nodejs
    path: .
    parameters:
      memory: 512M
      disk-quota: 512M
    provides:
      - name: api_backend
        properties:
          url: \${default-url}
    requires:
      - name: btp-learning-xsuaa
      - name: btp-learning-destination

resources:
  - name: btp-learning-xsuaa
    type: org.cloudfoundry.managed-service
    parameters:
      service: xsuaa
      service-plan: application
      path: ./xs-security.json
  - name: btp-learning-destination
    type: org.cloudfoundry.managed-service
    parameters:
      service: destination
      service-plan: lite`,
  },
  {
    id: 'package',
    filename: 'package.json',
    title: 'Node.js 应用依赖与启动脚本',
    description: 'Cloud Foundry 会按 engines 选择 Node 版本并执行 start 脚本。',
    language: 'json',
    tutorialId: 'project-nodejs-cf',
    code: `{
  "name": "btp-learning-api",
  "version": "1.0.0",
  "private": true,
  "scripts": { "start": "node app.js" },
  "engines": { "node": ">=20" },
  "dependencies": {
    "express": "^4.21.0",
    "@sap/xssec": "^4.0.0",
    "@sap-cloud-sdk/connectivity": "^3.0.0"
  }
}`,
  },
];

export interface ErrorEntry {
  id: string;
  symptom: string;
  category: string;
  causes: string[];
  checks: string[];
  relatedId: string;
}

export const errorKnowledgeBase: ErrorEntry[] = [
  {
    id: 'err-401',
    symptom: '访问应用返回 401 Unauthorized',
    category: '认证',
    causes: ['用户未完成登录', 'App Router 未绑定 XSUAA 实例', 'xs-app.json 中 authenticationType 被误设为 none 之外的错误值', '会话或 token 已过期'],
    checks: ['检查 xs-app.json 的 authenticationMethod 与目标路由的 authenticationType', '执行 cf env <APP> 确认 VCAP_SERVICES 含 xsuaa', '用无痕窗口重新登录，确认跳转到 IdP 登录页'],
    relatedId: 'xsuaa-q16-four-cases',
  },
  {
    id: 'err-403',
    symptom: '已登录但访问页面返回 403 Forbidden',
    category: '授权',
    causes: ['用户没有对应 Scope', '未分配包含目标 Role 的 Role Collection', 'xs-security.json 修改后未更新 XSUAA 实例', '路由 scope 配置与代码校验不一致'],
    checks: ['在 Cockpit → Security → Users 核对 Role Collection', '在 Role Collections 中确认包含应用生成的 Role', '执行 cf update-service <XSUAA> -c xs-security.json 并 restage 应用'],
    relatedId: 'usr-no-permission',
  },
  {
    id: 'err-404',
    symptom: 'App Router 返回 404，静态页面或后端路径找不到',
    category: '路由',
    causes: ['xs-app.json 中 routes 顺序错误（宽泛规则写在前面）', 'welcomeFile 指向不存在的文件', 'destination 名称与 Destination Service 中的 Name 不一致', 'HTML5 内容未成功部署到 Repository'],
    checks: ['把精确路径规则放在通配规则之前', '核对 xs-app.json 的 source 正则与 target 写法', '在 Cockpit 中检查 Destination 名称大小写'],
    relatedId: 'html5-common-errors',
  },
  {
    id: 'err-502',
    symptom: '通过 OnPremise Destination 调用内网系统返回 502 / 连接超时',
    category: '连接',
    causes: ['Cloud Connector 未连接 Subaccount', 'Access Control 未白名单目标主机与路径', 'Location ID 未填写或与 Cloud Connector 不一致', '内网系统本身不可达或端口错误'],
    checks: ['在 Cockpit → Connectivity → Cloud Connectors 确认隧道状态', '检查 Destination 的 ProxyType=OnPremise 与 CloudConnectorLocationId', '在 Cloud Connector 中查看该资源的访问日志'],
    relatedId: 'cc-troubleshooting',
  },
  {
    id: 'err-quota',
    symptom: 'cf push 或创建服务时报配额不足（quota / insufficient）',
    category: '资源',
    causes: ['Space Quota 内存已用尽', 'Entitlement 未分配或已分配数量为 0', '服务实例数达到上限', 'Org 内存上限不足'],
    checks: ['执行 cf apps 与 cf services 盘点现有资源', '在 Global Account → Entitlements 检查该服务计划的分配量', '在 Cockpit 中查看 Space Quota 与 Org 内存限制'],
    relatedId: 'ent-insufficient',
  },
  {
    id: 'err-staging',
    symptom: 'cf push 在 staging 阶段失败或应用很快 crashed',
    category: '部署',
    causes: ['package.json 缺少 start 脚本或依赖安装失败', 'Node 版本与 engines 不匹配', '应用未监听 PORT 环境变量指定的端口', '内存超限导致进程被杀'],
    checks: ['执行 cf logs <APP> --recent 查看具体堆栈', '确认代码使用 process.env.PORT 而非固定端口', '执行 cf app <APP> 核对内存与实例状态'],
    relatedId: 'cf-deploy-troubleshooting',
  },
  {
    id: 'err-vcap',
    symptom: '应用报错找不到服务凭据 / VCAP_SERVICES 中没有目标服务',
    category: '配置',
    causes: ['服务实例未绑定到应用', '绑定后未 restage / restart', '代码读取的服务标签名与实际不符', '部署到了错误的 Space'],
    checks: ['执行 cf services 确认实例与绑定列', '执行 cf env <APP> 检查 VCAP_SERVICES', '执行 cf restage <APP> 后重试'],
    relatedId: 'services-binding',
  },
  {
    id: 'err-token',
    symptom: 'Token 校验失败（invalid signature / invalid audience / expired）',
    category: '安全',
    causes: ['使用了错误的 XSUAA 实例凭据校验 token', 'xsappname 与 token 中的 aud 不匹配', '本地开发用了生产租户的 token', '系统时间偏差导致 exp 判断失败'],
    checks: ['使用 @sap/xssec 而不是自行解析 JWT', '确认校验所用的 XSUAA 绑定与签发 token 的实例一致', '核对 token 的 aud / iss / exp 声明（仅用于调试解码）'],
    relatedId: 'xsuaa-q14-node-token',
  },
  {
    id: 'err-marketplace',
    symptom: 'Service Marketplace 中找不到目标服务或 Plan',
    category: '账号',
    causes: ['Entitlement 未从 Global Account 分配到该 Subaccount', '当前 Region 不提供该服务', 'Trial / Free Tier 账号不支持该服务计划', '服务名称随产品版本变更'],
    checks: ['在 Global Account → Entitlements 分配对应服务计划', '在 SAP Discovery Center 核对区域可用性', '在 Cockpit 中按当前显示的服务名称搜索'],
    relatedId: 'services-marketplace',
  },
  {
    id: 'err-hdi',
    symptom: 'CAP 部署到 HANA 时 HDI Container 创建或绑定失败',
    category: '数据库',
    causes: ['未分配 SAP HANA Cloud 与 HDI 相关服务的 Entitlement', 'HANA Cloud 实例未处于运行状态', 'mta.yaml 中 resources 的 service / plan 名称与租户不一致', '数据库内存或存储规格不足'],
    checks: ['在 Cockpit 检查 HANA Cloud 实例状态', '核对 mta.yaml 中 service 与 service-plan 名称', '查看 cf deploy 的输出定位失败模块'],
    relatedId: 'project-cap-hana',
  },
];

export interface FaqEntry {
  question: string;
  answer: string;
  href: string;
}

export const faqEntries: FaqEntry[] = [
  { question: '完全没有 SAP 基础，应该从哪里开始？', answer: '建议按「第一阶段：BTP 基础」顺序学习，先理解账号层级与运行环境，再动手创建 Subaccount，最后进入 Cloud Foundry。', href: '/learn' },
  { question: 'Trial、Free Tier 和商业账号的命令一样吗？', answer: 'cf 命令基本一致，但可用服务、服务计划、配额与有效期不同。所有涉及具体 Plan 的操作都要先在租户 Service Marketplace 中核对。', href: '/docs/btp-account-types' },
  { question: 'XSUAA 和 IAS 有什么区别？', answer: 'IAS 属于身份提供方，负责用户登录与身份源；XSUAA 属于应用侧授权服务，负责 OAuth 客户端与 Scope 授权。两者配合但职责不同。', href: '/docs/sec-cloud-identity-services' },
  { question: '为什么创建服务实例时提示计划不可用？', answer: '最常见是 Entitlement 未分配、区域不提供该服务或账号类型不支持该计划，按配额不足排查清单逐项核对。', href: '/docs/ent-insufficient' },
  { question: 'Cloud Foundry 的命令能用在 Kyma 环境吗？', answer: '不能。Kyma 基于 Kubernetes，使用容器与 kubectl/Helm 等方式部署；cf CLI 只作用于 Cloud Foundry 环境。', href: '/docs/btp-environments-compare' },
  { question: '本站的图片是真实 Cockpit 界面截图吗？', answer: '不是。首页、资源中心与教程中的架构图、流程图、页面结构图均为本站自绘示意图并明确标注；图中所有名称、ID、域名与数量均为占位符，不含真实租户数据，也不是官方转载截图。', href: '/resources' },
  { question: '示例中的凭据可以直接用在生产吗？', answer: '不可以。所有示例使用占位符，生产环境必须使用密钥管理、凭据轮换与最小权限，并把凭据排除在代码仓库与日志之外。', href: '/docs/sec-best-practices' },
  { question: '如何核对某个配置参数是否仍然存在？', answer: '以 SAP Help Portal 的当前版本文档与租户 Cockpit / cf marketplace 的实际输出为准；本站对未能核实的内容标注「待验证」。', href: '/docs/btp-version-caveat' },
  { question: '文章收藏和学习进度保存在哪里？', answer: '当前版本保存在浏览器 LocalStorage 中，不上传服务器；清除浏览器数据会重置。后续可扩展为用户账号与数据库存储。', href: '/resources' },
];
