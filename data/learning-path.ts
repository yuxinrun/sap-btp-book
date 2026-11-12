/** 六阶段学习路线：每阶段关联真实的教程 id，进度由客户端 LocalStorage 统计 */
export interface LearningStage {
  id: number;
  title: string;
  subtitle: string;
  goal: string;
  topics: string[];
  tutorialIds: string[];
  tasks: string[];
  icon: string;
}

export const learningStages: LearningStage[] = [
  {
    id: 1,
    title: '第一阶段：BTP 基础',
    subtitle: '建立平台全局认知',
    goal: '能够说清 SAP BTP 的定位、账号层级、区域与配额，并独立完成 Subaccount 创建。',
    topics: ['了解 BTP 架构', '熟悉 Cockpit', '创建 Subaccount', '配置 Entitlements'],
    tutorialIds: ['btp-what-is', 'btp-architecture', 'btp-account-model', 'subaccount', 'cockpit-subaccount-create', 'entitlements-basics'],
    tasks: ['画出 Global Account → Directory → Subaccount 的层级图', '在 Trial 账号中创建一个 Subaccount 并记录 Subdomain', '在 Entitlements 页面找到目标服务计划'],
    icon: 'Compass',
  },
  {
    id: 2,
    title: '第二阶段：BTP 管理',
    subtitle: '掌握运行环境与资源',
    goal: '能够管理 Cloud Foundry Org / Space、服务实例、配额与用户成员关系。',
    topics: ['Cloud Foundry', 'Org 和 Space', 'Quotas', 'Services', '用户管理'],
    tutorialIds: ['cf-concepts', 'cf-cli-install', 'cf-login', 'services-marketplace', 'services-instance', 'cf-space', 'usr-overview'],
    tasks: ['用 cf login 连接自己的 Org 并截图 cf target 输出', '创建一个 Space 并为自己授予 Space Developer', '创建并绑定一个服务实例，读取 VCAP_SERVICES'],
    icon: 'Server',
  },
  {
    id: 3,
    title: '第三阶段：安全认证',
    subtitle: '打通身份与授权链路',
    goal: '能够解释认证与授权的分工，独立编写 xs-security.json 并完成 Role Collection 授权。',
    topics: ['Identity Provider', 'OAuth 2.0', 'XSUAA', 'Scopes', 'Roles', 'Role Collections', 'JWT'],
    tutorialIds: ['sec-authn-vs-authz', 'sec-oauth2', 'xsuaa-what-is', 'xsuaa-xs-security-json', 'xsuaa-scopes', 'xsuaa-role-collections', 'sec-jwt', 'xsuaa-q16-four-cases'],
    tasks: ['定义一个 Display 与 Admin Scope', '创建 Role Collection 并分配给测试用户', '完成未登录 / 已登录 / 无权限 / 有权限四种场景测试'],
    icon: 'ShieldCheck',
  },
  {
    id: 4,
    title: '第四阶段：应用开发',
    subtitle: '构建云原生应用',
    goal: '能够用 Node.js、CAP 与 SAPUI5 开发应用，并通过 App Router 与 Destination 集成后端。',
    topics: ['Node.js', 'CAP', 'SAPUI5', 'HTML5 Applications', 'App Router', 'Destinations'],
    tutorialIds: ['project-nodejs-cf', 'html5-app-router', 'destinations-overview', 'destinations-cap', 'project-cap-hana', 'project-fiori-deploy'],
    tasks: ['用 CAP 定义一个含 CRUD 的 CDS 服务', '把 SAPUI5 前端接入 App Router', '通过 Destination 调用一个外部 OData 服务'],
    icon: 'Code2',
  },
  {
    id: 5,
    title: '第五阶段：部署与集成',
    subtitle: '从本地到生产链路',
    goal: '能够使用 MTA 完成多模块部署，配置 HANA Cloud 与 Cloud Connector 集成 S/4HANA。',
    topics: ['MTA', 'Cloud Foundry 部署', 'HANA Cloud', 'Cloud Connector', 'S/4HANA 集成', 'CI/CD'],
    tutorialIds: ['cf-mta-deploy', 'cf-manifest-yml', 'service-hana-cloud', 'cc-config', 'project-s4hana-connect', 'adv-ctms'],
    tasks: ['用 mbt build 生成 MTAR 并 cf deploy 成功', '在 Cloud Connector 中暴露一条最小资源白名单', '用 CAP 通过 OnPremise Destination 读取 S/4HANA 数据'],
    icon: 'Rocket',
  },
  {
    id: 6,
    title: '第六阶段：企业级实战',
    subtitle: '架构、安全与治理',
    goal: '能够设计多环境架构、权限模型、监控与成本治理方案，形成企业项目落地能力。',
    topics: ['多环境架构', '权限管理', '应用安全', '监控与日志', '性能优化', '成本管理', '企业项目架构设计'],
    tutorialIds: ['space-dev-test-prod', 'usr-least-privilege', 'sec-best-practices', 'ua-quota-monitor', 'ua-optimization', 'ua-enterprise', 'cockpit-audit-log'],
    tasks: ['给出 Dev / Test / Prod 三环境账号与配额设计', '输出一份权限矩阵与最小权限复核清单', '制定日志、告警与成本巡检方案'],
    icon: 'Building2',
  },
];
