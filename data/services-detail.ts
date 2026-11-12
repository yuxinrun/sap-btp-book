/**
 * 12 个常用 BTP 服务的「用途 / 场景 / 开通 / 配置 / 代码 / 常见问题」六小节详解。
 * 服务名与计划名请以当前租户 `cf marketplace` 和 Service Marketplace 的实际输出为准。
 */
export interface ServiceDetail {
  id: string;
  name: string;
  catalogName: string;
  purpose: string;
  scenarios: string[];
  provision: string[];
  configuration: string[];
  code: { label: string; language: string; content: string }[];
  faq: { question: string; answer: string }[];
  caveat: string;
}

const placeholderNote = '示例中的 <PLACEHOLDER> 均为占位符，禁止在示例中填入真实密码、Client Secret 或 Token。';

export const serviceDetails: ServiceDetail[] = [
  {
    id: 'service-xsuaa',
    name: 'Authorization and Trust Management Service（XSUAA）',
    catalogName: 'xsuaa（Service Marketplace 中显示为 Authorization and Trust Management Service）',
    purpose: '为 Cloud Foundry 应用生成 OAuth 2.0 客户端，承担用户认证跳转与基于 Scope 的授权，是应用安全的基础服务。',
    scenarios: ['需要登录的企业应用', '按角色区分功能菜单与接口', '把用户身份传递给后端 CAP 服务', '与 App Router 配合实现单点登录'],
    provision: [
      'Global Account → Entitlements 确认已分配该服务配额',
      '在项目根目录编写 xs-security.json',
      'Cockpit → Services → Service Marketplace 选择该服务创建实例并上传安全描述，或执行 cf create-service',
      '把实例绑定给 App Router 与后端应用，随后 restage',
    ],
    configuration: ['xsappname 全局唯一且与租户绑定', 'scopes 定义权限点', 'role-templates 组合 Scope', '在 Cockpit → Security → Role Collections 中把生成的 Role 分配给用户'],
    code: [
      {
        label: '创建实例（CF CLI）',
        language: 'bash',
        content: 'cf create-service xsuaa application <XSUAA_INSTANCE> -c xs-security.json\ncf bind-service <APP> <XSUAA_INSTANCE>\ncf restage <APP>',
      },
      {
        label: '最小 xs-security.json',
        language: 'json',
        content: '{\n  "xsappname": "btp-learning-<SUBDOMAIN>",\n  "tenant-mode": "dedicated",\n  "scopes": [\n    { "name": "$XSAPPNAME.Display", "description": "查看数据" }\n  ],\n  "role-templates": [\n    { "name": "Viewer", "scope-references": ["$XSAPPNAME.Display"] }\n  ]\n}',
      },
      {
        label: 'Express 中间件校验 Scope（App Router 之后的后端应用）',
        language: 'javascript',
        content: "const express = require('express');\nconst app = express();\n\n// req.authInfo 由 App Router / @sap/xssec 完成 JWT 签名校验后注入，\n// 应用不要自行 base64 解码 token 后直接信任其中的内容。\nfunction requireScope(scope) {\n  return (req, res, next) => {\n    if (!req.authInfo || typeof req.authInfo.checkScope !== 'function') {\n      return res.status(401).json({ error: 'Unauthorized' });\n    }\n    if (!req.authInfo.checkScope(scope)) {\n      return res.status(403).json({ error: 'Forbidden', requiredScope: scope });\n    }\n    next();\n  };\n}\n\nconst adminScope = process.env.ADMIN_SCOPE || '<XSAPPNAME>.Admin';\napp.get('/admin', requireScope(adminScope), (req, res) => {\n  res.json({ message: 'admin area', user: req.user && req.user.id });\n});\n\napp.listen(process.env.PORT || 3000);",
      },
    ],
    faq: [
      { question: 'XSUAA 和 IAS 是一个东西吗？', answer: '不是。IAS 是身份提供方，XSUAA 是应用侧授权服务，两者在登录链路中前后衔接。' },
      { question: '修改 xs-security.json 后为什么看不到新 Role？', answer: '需要 cf update-service 更新实例并重新部署应用，之后在 Cockpit 中刷新 Roles 列表。' },
      { question: '本地开发能用云上的 XSUAA 吗？', answer: '可以通过 Service Key 把凭据放到本地环境变量中调试，但凭据必须排除在 Git 仓库之外。' },
    ],
    caveat: 'Kyma 环境与 ABAP Environment 的授权实现方式不同，本条仅适用于 Cloud Foundry 环境。' + placeholderNote,
  },
  {
    id: 'service-destination',
    name: 'Destination Service',
    catalogName: 'destination',
    purpose: '集中存储后端目标地址与认证配置，应用按名称读取 Destination，避免在代码里硬编码 URL 与凭据。',
    scenarios: ['CAP 调用 S/4HANA OData', 'App Router 转发请求到后端', '多环境使用不同后端地址', '统一维护 OAuth 参数'],
    provision: [
      '确认 Subaccount 已分配 destination 服务配额',
      '在 Service Marketplace 创建实例，或使用 cf create-service destination <PLAN> <INSTANCE>',
      '绑定到需要读取目标的应用并 restage',
    ],
    configuration: ['在 Cockpit → Connectivity → Destinations 新建目标', '填写 Name、Type=HTTP、URL、ProxyType、Authentication', '内网目标设置 ProxyType=OnPremise 并填写 Location ID', '测试连接确认返回成功'],
    code: [
      { label: '创建与绑定', language: 'bash', content: 'cf create-service destination lite <DESTINATION_INSTANCE>\ncf bind-service <APP> <DESTINATION_INSTANCE>\ncf restage <APP>' },
      { label: 'Destination 关键字段（示意，非可直接导入的 JSON）', language: 'json', content: '{\n  "Name": "S4HANA_ODATA",\n  "Type": "HTTP",\n  "URL": "https://<INTERNAL_HOST>:<PORT>",\n  "ProxyType": "OnPremise",\n  "Authentication": "PrincipalPropagation",\n  "CloudConnectorLocationId": "<LOCATION_ID>"\n}' },
      { label: 'CAP 中通过 Destination 调用远端服务', language: 'javascript', content: "const { executeHttpRequest } = require('@sap-cloud-sdk/http-client');\n\nasync function readBusinessPartners(destinationName) {\n  const response = await executeHttpRequest(\n    { destinationName },\n    { method: 'get', url: '/sap/opu/odata/sap/API_BUSINESS_PARTNER/A_BusinessPartner?$top=5' }\n  );\n  return response.data;\n}" },
    ],
    faq: [
      { question: '为什么应用读不到 Destination？', answer: '检查应用是否绑定了 destination 实例、cf env 中是否存在凭据，以及目标名大小写是否一致。' },
      { question: 'Destination 可以存密码吗？', answer: '可以但不推荐；生产应优先使用 OAuth 类认证或 Principal Propagation，并对凭据访问做审计。' },
      { question: 'Subaccount 级 Destination 与实例级有什么区别？', answer: 'Cockpit 中的目标是 Subaccount 范围配置，Destination Service 实例是应用读取这些配置的凭据通道，两者配套使用。' },
    ],
    caveat: '服务计划名称（如 lite）在不同账号类型下可能不同，请以 cf marketplace 输出为准。' + placeholderNote,
  },
  {
    id: 'service-connectivity',
    name: 'Connectivity Service',
    catalogName: 'connectivity',
    purpose: '为 BTP 应用提供访问企业内网系统的代理通道，与安装在内网的 Cloud Connector 配对使用。',
    scenarios: ['访问内网 S/4HANA OData / SOAP 服务', '调用内网 RFC 或自定义 HTTP 服务', 'Principal Propagation 场景'],
    provision: ['创建 connectivity 服务实例', '绑定到需要出内网的应用', '在 Subaccount → Connectivity → Cloud Connectors 中确认 Cloud Connector 已连接'],
    configuration: ['设置 Destination 的 ProxyType 为 OnPremise', '配置 Location ID（若使用）', '在 Cloud Connector 中配置 Access Control 资源白名单'],
    code: [
      { label: '创建实例', language: 'bash', content: 'cf create-service connectivity lite <CONNECTIVITY_INSTANCE>\ncf bind-service <APP> <CONNECTIVITY_INSTANCE>\ncf restage <APP>' },
      { label: '检查代理相关环境变量', language: 'bash', content: 'cf env <APP> | findstr /C:"connectivity" /C:"onpremise_proxy" ' },
    ],
    faq: [
      { question: '只创建 Connectivity 实例就能访问内网吗？', answer: '不能，必须同时安装并连接 Cloud Connector，且目标资源已被白名单允许。' },
      { question: '502 错误一般是什么原因？', answer: '隧道断开、Location ID 不匹配、白名单路径不完整或内网系统不可达。' },
    ],
    caveat: '该服务仅在需要访问内网的场景使用；访问公网 API 通常设置 ProxyType=Internet。',
  },
  {
    id: 'service-html5-repo',
    name: 'HTML5 Application Repository',
    catalogName: 'html5-apps-repo（Host / Runtime 为不同服务计划能力）',
    purpose: '托管 SAPUI5、Fiori 或静态前端构建产物，并向 App Router 提供内容。',
    scenarios: ['部署 Fiori / SAPUI5 应用', '多前端模块统一托管', '通过 Work Zone 发布应用入口'],
    provision: ['创建 html5-apps-repo 的 Host 与 Runtime 相关服务实例（通常由 mta.yaml 自动创建）', '构建前端模块', '通过 MTA 部署上传内容'],
    configuration: ['前端模块包含 xs-app.json', 'mta.yaml 中声明 UI 模块与 Repository 资源', 'App Router 通过 service: html5-apps-repo-rt 引用静态内容'],
    code: [
      { label: 'App Router 引用 Repository', language: 'json', content: '{\n  "welcomeFile": "/index.html",\n  "authenticationMethod": "route",\n  "routes": [\n    { "source": "^(/.*)$", "target": "$1", "service": "html5-apps-repo-rt", "authenticationType": "xsuaa" }\n  ]\n}' },
      { label: '构建与部署', language: 'bash', content: 'mbt build -p=cf\ncf deploy mta_archives/<FILE>.mtar' },
    ],
    faq: [
      { question: '部署后访问 404 怎么排查？', answer: '确认内容已上传、welcomeFile 路径正确、App Router 的 service 名称与绑定的 Runtime 实例一致。' },
      { question: 'Managed 与 Standalone App Router 都要创建 Host 实例吗？', answer: '两种方案的 MTA 描述不同，Managed App Router 方案由订阅提供入口，具体资源以官方示例与当前租户的服务计划为准。' },
    ],
    caveat: 'Host / Runtime 的服务计划名称在不同账号类型与版本下存在差异，请以 Service Marketplace 显示为准。',
  },
  {
    id: 'service-hana-cloud',
    name: 'SAP HANA Cloud',
    catalogName: 'hana-cloud / hana（HDI Container 由 hdi-shared 类服务提供）',
    purpose: 'SAP 的云上数据库服务，CAP 项目通过 HDI Container 在其中部署 CDS 数据模型与表。',
    scenarios: ['CAP 生产持久化', '企业级数据分析', '多模块共享数据库'],
    provision: ['确认 Entitlement 已分配 HANA Cloud 与 HDI 相关服务', '在 Service Marketplace 创建 HANA Cloud 实例并配置规格', '通过 MTA 部署自动创建 HDI Container'],
    configuration: ['设置数据库内存、存储与可用区参数', '在 mta.yaml 中声明 hdi-shared 资源', '部署时使用 HDI Deployer 模块把 CDS 模型转换为数据库对象'],
    code: [
      { label: 'CAP 添加 HANA 支持', language: 'bash', content: 'cds add hana\ncds add mta\nmbt build -p=cf\ncf deploy mta_archives/<FILE>.mtar' },
      { label: 'mta.yaml 中的 HDI 资源（节选）', language: 'yaml', content: 'resources:\n  - name: btp-learning-db\n    type: org.cloudfoundry.managed-service\n    parameters:\n      service: hana\n      service-plan: hdi-shared' },
    ],
    faq: [
      { question: 'Trial 账号能用 HANA Cloud 吗？', answer: '通常不可用或能力受限，请以当前租户 Entitlements 与 Discovery Center 为准，本地可先用 SQLite 开发。' },
      { question: 'HDI Container 和 HANA Cloud 实例是什么关系？', answer: 'HANA Cloud 是数据库实例，HDI Container 是其中的隔离部署容器，CAP 应用绑定的是后者。' },
    ],
    caveat: 'HANA Cloud 规格、可用区与计费方式按合同与区域不同，创建前请在 Discovery Center 核对。',
  },
  {
    id: 'service-app-logging',
    name: 'Application Logging',
    catalogName: 'application-logs',
    purpose: '集中收集与检索应用日志，支持按应用、实例与时间范围定位问题。',
    scenarios: ['部署失败排查', '生产异常追踪', '多实例日志聚合'],
    provision: ['创建 application-logs 服务实例', '绑定到应用并 restage', '在 Cockpit 的日志视图或订阅入口检索'],
    configuration: ['确认日志级别与输出格式', '避免在日志中打印 token 与密码', '为生产环境设置合理的保留周期'],
    code: [
      { label: '创建并绑定', language: 'bash', content: 'cf create-service application-logs <PLAN> <LOGGING_INSTANCE>\ncf bind-service <APP> <LOGGING_INSTANCE>\ncf restage <APP>' },
      { label: '应用侧输出结构化日志', language: 'javascript', content: "console.log(JSON.stringify({\n  level: 'info',\n  event: 'order_read',\n  requestId: '<REQUEST_ID>'\n}));" },
    ],
    faq: [
      { question: 'cf logs 和 Application Logging 有什么区别？', answer: 'cf logs 是实时/最近的流式日志，Application Logging 服务提供集中留存与检索能力。' },
      { question: '日志里能输出 JWT 吗？', answer: '绝对不要，token 属于敏感凭据，泄露后可被冒用。' },
    ],
    caveat: '不同账号类型下日志服务的名称、计划与保留策略可能不同，请以租户显示为准。',
  },
  {
    id: 'service-job-scheduling',
    name: 'Job Scheduling Service',
    catalogName: 'jobscheduler',
    purpose: '按时间计划触发应用的 HTTP 端点，把定时任务从应用进程中解耦出来。',
    scenarios: ['夜间数据同步', '定期报表生成', '批量清理任务'],
    provision: ['创建 jobscheduler 服务实例', '绑定到应用并保护回调端点', '在 Cockpit 或通过 API 定义 Job 与 Schedule'],
    configuration: ['回调端点必须校验来自调度服务的 token', '定义 cron 表达式与重试策略', '为失败任务配置告警'],
    code: [
      { label: '创建实例', language: 'bash', content: 'cf create-service jobscheduler <PLAN> <JOBSCHEDULER_INSTANCE>\ncf bind-service <APP> <JOBSCHEDULER_INSTANCE>\ncf restage <APP>' },
      { label: '受保护的回调端点（示意）', language: 'javascript', content: "app.post('/jobs/sync', (req, res) => {\n  // 必须校验请求方身份与 token，禁止公开无认证端点\n  if (!req.headers['x-sap-job-token']) return res.status(401).end();\n  res.status(202).json({ accepted: true });\n});" },
    ],
    faq: [
      { question: '可以在应用里用 setInterval 代替吗？', answer: '多实例部署时会重复执行且随重启丢失，生产环境应使用调度服务。' },
      { question: '任务端点需要登录吗？', answer: '需要由服务签发的 token 做校验，不能是公开端点。' },
    ],
    caveat: '服务计划与 API 细节按版本不同，请以官方文档与租户实例凭据为准。',
  },
  {
    id: 'service-document-management',
    name: 'Document Management',
    catalogName: 'sap-document-management / cmis 相关服务（按租户显示为准）',
    purpose: '为业务应用提供文档与附件的存储、版本管理与访问控制能力。',
    scenarios: ['合同与发票附件', '审批流附件归档', '跨应用文档共享'],
    provision: ['确认服务 Entitlement 与区域可用性', '创建服务实例或订阅', '绑定到应用并按官方 API 集成'],
    configuration: ['规划仓库（Repository）与权限模型', '配置文档类型与元数据', '设置生命周期与保留策略'],
    code: [
      { label: '绑定实例', language: 'bash', content: 'cf create-service <DOCUMENT_SERVICE> <PLAN> <DOC_INSTANCE>\ncf bind-service <APP> <DOC_INSTANCE>\ncf restage <APP>' },
    ],
    faq: [
      { question: '能直接把附件存到应用文件系统吗？', answer: 'Cloud Foundry 应用文件系统是临时的，重启即丢失，持久化附件必须使用外部存储服务。' },
      { question: '访问文档需要额外授权吗？', answer: '需要，应结合应用 Scope 与文档服务自身权限，避免越权下载。' },
    ],
    caveat: '该能力在不同产品版本中有不同的服务名称与集成方式，配置前请以当前租户 Service Marketplace 与官方文档核对，本站标记为待验证。',
  },
  {
    id: 'service-event-mesh',
    name: 'SAP Event Mesh',
    catalogName: 'enterprise-messaging / SAP Event Mesh（按租户显示为准）',
    purpose: '基于队列与主题的事件代理服务，用于系统间异步解耦与事件驱动集成。',
    scenarios: ['S/4HANA 业务事件广播', '微服务异步通信', '削峰与重试隔离'],
    provision: ['分配 Entitlement 并创建服务实例', '在实例配置中定义队列与主题订阅规则', '绑定应用到生产者与消费者'],
    configuration: ['规划 topic 命名与消息格式', '配置队列订阅与死信处理', '实现幂等消费与错误重试'],
    code: [
      { label: '创建实例', language: 'bash', content: 'cf create-service enterprise-messaging <PLAN> <MESH_INSTANCE> -c <CONFIG_JSON_FILE>\ncf bind-service <APP> <MESH_INSTANCE>\ncf restage <APP>' },
      { label: '消息处理函数（示意）', language: 'javascript', content: "async function handleMessage(message) {\n  // 必须实现幂等：同一消息可能重复投递\n  const eventId = message.headers && message.headers.eventId;\n  if (!eventId) throw new Error('missing eventId');\n  await processOnce(eventId, message.payload);\n}" },
    ],
    faq: [
      { question: '消息会重复投递吗？', answer: '会，消费者必须实现幂等处理。' },
      { question: '事件代理能替代同步 API 调用吗？', answer: '不能简单替代，它适用于异步通知与解耦，需要结果即时返回的场景仍应使用同步调用。' },
    ],
    caveat: '产品名称与实例配置格式随版本演进，具体参数（如 queue / topic 规则）请以官方文档与租户实例配置界面为准。',
  },
  {
    id: 'service-integration-suite',
    name: 'SAP Integration Suite',
    catalogName: 'Integration Suite（订阅式应用）',
    purpose: '企业级集成平台，提供集成流程设计、API 管理、消息与事件能力，用于跨系统接口编排与治理。',
    scenarios: ['跨系统接口编排', 'API 统一发布与治理', '与 S/4HANA 及第三方系统集成'],
    provision: ['在 Global Account / Subaccount 订阅 Integration Suite', '按向导完成能力激活（不同能力需分别启用）', '为开发人员分配相应 Role Collection'],
    configuration: ['在集成设计器中创建 iFlow', '配置适配器、凭据材料与端点', '部署并通过监控视图检查消息状态'],
    code: [
      { label: '从 BTP 应用调用已发布的 API 端点（示意）', language: 'javascript', content: "const response = await fetch('https://<API_HOST>/<API_PATH>', {\n  headers: { Authorization: 'Bearer <ACCESS_TOKEN>' }\n});\nif (!response.ok) throw new Error(`API call failed: ${response.status}`);\nconst data = await response.json();" },
    ],
    faq: [
      { question: 'Integration Suite 是创建服务实例吗？', answer: '它属于订阅式应用，通过 Instances and Subscriptions 订阅并激活能力，与 cf create-service 的实例模型不同。' },
      { question: '可以在 Trial 里完整体验吗？', answer: '通常能力受限，请以当前账号的可用订阅与 Discovery Center 为准。' },
    ],
    caveat: 'Integration Suite 各能力（集成流程、API 管理等）为独立组件，启用步骤与计划按版本不同，本站不混用不同产品的配置方式。',
  },
  {
    id: 'service-work-zone',
    name: 'SAP Build Work Zone',
    catalogName: 'SAP Build Work Zone（订阅式应用）',
    purpose: '统一工作台入口，把已部署的 HTML5 应用、集成内容发布为业务用户可访问的工作台站点。',
    scenarios: ['企业门户与统一入口', '按角色发布应用内容', 'Fiori 应用集中访问'],
    provision: ['订阅 SAP Build Work Zone（标准版或高级版，按合同）', '配置与 HTML5 Application Repository 的内容提供者连接', '创建站点并把应用加入内容'],
    configuration: ['配置内容提供者（Content Provider）', '为站点分配角色与用户组', '核对应用的 xs-app.json 与认证设置'],
    code: [
      { label: '前端暴露给工作台的路由（示意）', language: 'json', content: '{\n  "welcomeFile": "/index.html",\n  "authenticationMethod": "route",\n  "routes": [\n    { "source": "^(/.*)$", "target": "$1", "service": "html5-apps-repo-rt", "authenticationType": "xsuaa" }\n  ]\n}' },
    ],
    faq: [
      { question: '不用 Work Zone 能访问 HTML5 应用吗？', answer: '可以，通过 Managed 或 Standalone App Router 的入口访问，取决于项目采用的方案。' },
      { question: '应用已部署但工作台看不到？', answer: '检查内容提供者同步状态、应用是否暴露为内容、以及用户是否具备相应角色。' },
    ],
    caveat: 'Work Zone 版本（标准版 / 高级版）能力与订阅方式不同，请以当前租户显示为准。',
  },
  {
    id: 'service-ai-core',
    name: 'SAP AI Core',
    catalogName: 'aicore / SAP AI Core（按租户显示为准）',
    purpose: '为 AI 场景提供可编排的训练与推理执行能力，AI Launchpad 提供配套管理与监控界面。',
    scenarios: ['模型训练与批量推理', '与业务应用集成的智能服务', 'AI 资源组隔离'],
    provision: ['确认 AI Core Entitlement 与区域可用性', '创建服务实例与 Service Key', '配置资源组与对象存储（按官方文档要求）', '通过 API 或 AI Launchpad 提交执行'],
    configuration: ['定义资源组（Resource Group）', '配置执行模板与镜像', '安全管理访问凭据与 token 获取'],
    code: [
      { label: '创建实例与凭据', language: 'bash', content: 'cf create-service aicore <PLAN> <AICORE_INSTANCE>\ncf create-service-key <AICORE_INSTANCE> <KEY_NAME>\ncf service-key <AICORE_INSTANCE> <KEY_NAME>' },
      { label: '使用凭据换取访问令牌（示意，参数以官方文档为准）', language: 'javascript', content: "async function getToken(serviceKey) {\n  const body = new URLSearchParams({\n    grant_type: 'client_credentials',\n    client_id: serviceKey.clientid,\n    client_secret: serviceKey.clientsecret\n  });\n  const res = await fetch(`${serviceKey.url}/oauth/token`, {\n    method: 'POST',\n    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },\n    body\n  });\n  if (!res.ok) throw new Error(`token request failed: ${res.status}`);\n  return (await res.json()).access_token;\n}" },
    ],
    faq: [
      { question: 'AI Core 与 AI Launchpad 是同一个服务吗？', answer: '不是。AI Core 提供执行能力，AI Launchpad 是管理与监控界面，通常配套使用。' },
      { question: 'Trial 能用 AI Core 吗？', answer: '通常不可用或受限，请在 Discovery Center 与租户 Service Marketplace 核对。' },
    ],
    caveat: 'AI 服务的 API 路径、认证参数与资源组配置随版本演进，本站示例为结构示意，实际参数请以当前官方文档核对（标记为待验证）。' + placeholderNote,
  },
];

export const serviceDetailById = new Map(serviceDetails.map((s) => [s.id, s]));
