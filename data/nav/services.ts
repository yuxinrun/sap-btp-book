import type { RawGroup } from '../navigation';

export const servicesNav: RawGroup = {
  id: 'services',
  title: 'Services 服务管理',
  shortTitle: '服务管理',
  icon: 'Blocks',
  description: 'Service Marketplace、实例与订阅、服务计划、绑定与 Service Key，以及 12 个核心 BTP 服务详解。',
  sections: [
    {
      title: '服务目录与实例',
      cockpitPath: 'Subaccount → Services → Service Marketplace / Instances and Subscriptions',
      notes: [
        '「订阅（Subscription）」通常是应用级服务（如 Integration Suite、Work Zone），在 Subaccount 层订阅一次；「实例（Instance）」是服务计划的具体运行对象，可创建多个并绑定给应用。',
        '服务实例通过 Binding 或 Service Key 暴露凭据；应用运行时从 VCAP_SERVICES 环境变量读取，切勿把凭据写进代码或提交到 Git。',
        '服务计划（Plan）决定能力、配额与计费方式；同一服务在不同账号类型（Trial / Free Tier / 商业）下可用 Plan 可能不同。',
        '创建服务实例前必须确认该服务已在 Entitlements 中分配，且当前 Region 提供该服务。',
      ],
      commands: [
        ['cf marketplace', '列出当前 Space 中可创建的所有服务与计划'],
        ['cf create-service <SERVICE> <PLAN> <INSTANCE>', '按指定计划创建服务实例'],
        ['cf create-service-key <INSTANCE> <KEY_NAME>', '为服务实例生成一组可导出的访问凭据'],
        ['cf bind-service <APP> <INSTANCE>', '把服务实例绑定到应用，凭据注入 VCAP_SERVICES'],
      ],
      docs: [
        ['SAP BTP 官方文档（搜索 Service Marketplace）', 'https://help.sap.com/docs/btp'],
        ['SAP Discovery Center（服务与计划）', 'https://discovery-center.cloud.sap/'],
        ['Cloud Foundry 官方文档', 'https://docs.cloudfoundry.org/'],
      ],
      items: [
        ['services-marketplace', 'Service Marketplace', '按 Subaccount 已分配 Entitlements 展示可订阅或可实例化的服务目录，并显示可用 Plan。'],
        ['services-instances-subscriptions', 'Instances and Subscriptions', '集中查看已创建的服务实例与已订阅的应用，并可跳转到应用入口或执行创建/删除操作。'],
        ['services-plans', 'Service Plans', '服务的具体计费与能力档位，例如 XSUAA 的 application / broker 计划、HANA Cloud 的实例规格。'],
        ['services-instance', 'Service Instance', '服务计划的一次实例化，是应用可绑定的资源对象，拥有独立生命周期与凭据。'],
        ['services-service-key', 'Service Key', '不绑定应用即可导出服务实例凭据的方式，常用于本地开发、脚本或外部系统调用。'],
        ['services-binding', 'Service Binding', '应用与服务实例之间的凭据注入关系，运行时通过 VCAP_SERVICES 提供给应用。'],
        ['services-subscription-vs-instance', '服务订阅与实例的区别', '订阅是多租户应用的一次性开通与入口获取；实例是可多次创建、可绑定的资源，两者生命周期与管理位置不同。'],
        ['services-create-delete', '服务创建和删除', '在 Cockpit 或使用 cf create-service / cf delete-service 完成实例创建与清理，删除前需先解绑。'],
        ['services-lifecycle', '服务生命周期管理', '覆盖创建、绑定、轮换凭据、升级计划、备份、解绑与删除的完整过程与影响面。'],
        ['services-quota', '服务配额管理', '在 Entitlements 与 Quotas 层面控制某服务可创建的实例数量与资源上限。'],
      ],
    },
    {
      title: '常用 BTP 服务详解',
      cockpitPath: 'Subaccount → Services → Service Marketplace → 选择具体服务',
      notes: [
        '每个服务条目在本网站都提供「用途 / 适用场景 / 开通方式 / 配置方法 / 代码示例 / 常见问题」六个固定小节。',
        '开通通用流程：Global Account 分配 Entitlement → Service Marketplace 找到服务 → 选择 Plan → 创建实例或订阅 → 绑定应用或生成 Service Key。',
        '服务名称会随产品演进调整（例如 SAP Event Mesh、SAP Build Work Zone 等），请以当前租户 Service Marketplace 中显示的名称为准。',
      ],
      docs: [
        ['SAP Discovery Center 服务目录', 'https://discovery-center.cloud.sap/'],
        ['SAP BTP 官方文档入口', 'https://help.sap.com/docs/btp'],
      ],
      items: [
        ['service-xsuaa', 'Authorization and Trust Management Service（XSUAA）', '为应用提供 OAuth 2.0 认证、Scope 与 Role 授权能力的实例服务，服务键通常为 xsuaa。'],
        ['service-destination', 'Destination Service', '集中存放后端目标地址与认证配置，应用按名称读取 Destination，避免把 URL 与凭据硬编码。'],
        ['service-connectivity', 'Connectivity Service', '配合 Cloud Connector 建立 BTP 到企业内网系统的安全通道，并提供代理访问能力。'],
        ['service-html5-repo', 'HTML5 Application Repository', '存放与托管 SAPUI5 / Fiori / 静态前端应用，分为 Host（存储）与 Runtime（运行）两种能力。'],
        ['service-hana-cloud', 'SAP HANA Cloud', '云上内存数据库服务，CAP 项目通过 HDI Container 在其中部署数据模型与表。'],
        ['service-app-logging', 'Application Logging', '集中收集应用运行日志，便于按应用与实例检索、排查部署与运行时问题。'],
        ['service-job-scheduling', 'Job Scheduling Service', '以定时或周期方式触发应用 HTTP 端点，替代在应用内部自建定时器。'],
        ['service-document-management', 'Document Management', '提供文档与附件的存储、版本与访问能力，常与业务应用的附件场景集成。'],
        ['service-event-mesh', 'SAP Event Mesh', '基于消息队列与主题的事件代理服务，用于系统间异步解耦与事件驱动集成。'],
        ['service-integration-suite', 'SAP Integration Suite', '企业级集成平台（CPI / API Management 等能力），用于跨系统接口编排与 API 治理。'],
        ['service-work-zone', 'SAP Build Work Zone', '统一工作台入口，把部署到 HTML5 Application Repository 的应用发布成业务用户可访问的内容。'],
        ['service-ai-core', 'SAP AI Core', '面向 AI 场景的模型训练与推理执行服务，配套的 AI Launchpad 用于管理与监控。'],
      ],
    },
  ],
};
