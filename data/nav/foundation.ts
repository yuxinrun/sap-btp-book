import type { RawGroup } from '../navigation';

export const foundationNav: RawGroup = {
  id: 'foundation',
  title: 'SAP BTP 基础入门',
  shortTitle: '基础入门',
  icon: 'BookOpen',
  description: '建立对 SAP Business Technology Platform 的整体认知：平台定位、账号模型、区域与配额。',
  sections: [
    {
      title: '认识 SAP BTP',
      cockpitPath: 'BTP Cockpit → Global Account / Subaccount → Overview',
      notes: [
        'SAP BTP 是 SAP 的平台即服务（PaaS）产品组合，包含数据库与数据管理、应用开发与集成、分析与 AI、安全与身份管理等能力，不是单一软件。',
        '平台的典型价值是「保持核心干净（Keep the Core Clean）」：在 S/4HANA 之外做扩展、集成与创新，减少核心系统修改。',
        'BTP 有多种运行环境：Cloud Foundry、Kyma（Kubernetes）、ABAP Environment；不同环境的服务、命令与部署方式不通用。',
        '商业账号、Trial（试用）和 Free Tier（免费层级）在服务有效期、配额、可创建实例数量和生产可用性上有明确差异，教程中必须区分说明。',
      ],
      docs: [
        ['SAP BTP 官方文档入口', 'https://help.sap.com/docs/btp'],
        ['SAP BTP 产品介绍', 'https://www.sap.com/products/technology-platform.html'],
        ['SAP Discovery Center（服务与计价）', 'https://discovery-center.cloud.sap/'],
      ],
      items: [
        ['btp-what-is', 'SAP BTP 是什么', '平台即服务组合：SAP Business Technology Platform，把数据库、集成、应用开发、分析、AI 与身份安全能力统一到一个云平台上。'],
        ['btp-history', 'SAP BTP 的发展与定位', '由 SAP Cloud Platform 演进并于 2021 年统一品牌为 SAP BTP，定位为 SAP 业务应用的可扩展、可集成、可创新的企业云平台。'],
        ['btp-core-services', 'SAP BTP 核心服务', '按能力域分为应用开发（CAP、Build）、集成（Integration Suite、Event Mesh）、数据与分析（HANA Cloud）、AI（AI Core）及安全与运维基础服务。'],
        ['btp-architecture', 'SAP BTP 整体架构', '从 Global Account 到 Subaccount 再到运行环境与服务实例的分层结构，应用通过绑定服务实例获得凭据并完成认证与连通。'],
        ['btp-s4hana-relation', 'SAP BTP 与 SAP S/4HANA 的关系', 'S/4HANA 是业务核心，BTP 是扩展与创新平台；BTP 通过 API、事件与 OData 服务与 S/4HANA 松耦合集成。'],
        ['btp-use-cases', 'SAP BTP 的应用场景', '典型场景包括：核心系统旁路扩展、跨系统集成、Fiori 定制应用、数据与分析扩展、工作流自动化、AI 场景与企业统一身份认证。'],
        ['btp-environments-compare', 'Cloud Foundry / Kyma / ABAP 环境对比', '三种运行环境面向不同技术栈：CF 面向 Node.js/Java 多语言应用，Kyma 面向容器与 Kubernetes 工作负载，ABAP Environment 面向 ABAP Cloud 开发。'],
        ['btp-account-types', 'Trial、Free Tier 与商业账号差异', 'Trial 有固定有效期与配额、不可用于生产；Free Tier 是部分服务的免费计划、无统一到期但有计划限额；商业账号按 Entitlements 消费。'],
      ],
    },
    {
      title: '账号体系',
      cockpitPath: 'BTP Cockpit → Global Account → Account Explorer / Subaccounts',
      notes: [
        '账号层级为：Global Account → Directory（可选）→ Subaccount；Subaccount 下才创建 Cloud Foundry Org / Space 等运行环境资源。',
        'Region（区域）与 Provider（基础设施提供商，如 AWS、Azure、GCP、SAP 自有数据中心）在 Subaccount 创建时选定，创建后通常不可随意变更。',
        'Entitlements（配额权利）由 Global Account 分配给 Subaccount，决定该 Subaccount 能使用哪些服务的哪些 Plan 以及数量上限。',
      ],
      docs: [
        ['SAP BTP 官方文档（搜索 Account Model）', 'https://help.sap.com/docs/btp'],
        ['SAP Discovery Center', 'https://discovery-center.cloud.sap/'],
      ],
      items: [
        ['btp-account-model', 'SAP BTP 账号体系', 'Global Account → Directory → Subaccount 的三级账号模型，是理解 Cockpit 中所有管理操作的前提。'],
        ['global-account', 'Global Account', '与客户合同绑定的最顶层账号，持有全部 Entitlements，并向下级 Directory 与 Subaccount 分配配额。'],
        ['directory', 'Directory', '可选的组织分组层，用于按业务单元或环境批量组织 Subaccount 并集中分配配额，可嵌套。'],
        ['subaccount', 'Subaccount', '实际承载应用与服务的租户单元，拥有唯一的 Subdomain 和租户 ID，并在此启用 Cloud Foundry 等环境。'],
        ['region-provider', 'Region 和 Provider', 'Region 是数据中心地理区域，Provider 是底层基础设施提供方；两者决定服务可用性与数据驻留位置。'],
        ['entitlements-basics', 'Entitlements', '「有权使用多少」的服务配额权利，以服务 + Plan + 数量为单位在账号层级间分配。'],
        ['quotas-basics', 'Quotas', 'Subaccount 或 Org 级别的资源上限（如内存、实例数），与 Entitlements 共同约束可部署规模。'],
        ['btp-pricing', 'SAP BTP 定价和成本基础', '常见计量方式包含按服务计划订阅、按用量（如 Capacity Unit / Pay-as-you-go）与 Cloud Credits，实际以合同与 Discovery Center 为准。'],
      ],
    },
    {
      title: '术语与学习准备',
      cockpitPath: 'BTP Cockpit → 右上角帮助 / SAP Help Portal',
      notes: [
        '第一次接触时先区分「账号层级」「运行环境」「服务实例」「身份与授权」四条主线，避免把不同层级的概念混在一起。',
        '本网站所有命令示例中的账号、租户、区域、密钥均使用 <PLACEHOLDER> 形式的占位符，请勿在真实项目中硬编码凭据。',
      ],
      docs: [
        ['SAP Developers 教程', 'https://developers.sap.com/tutorials/'],
        ['SAP Learning', 'https://learning.sap.com/'],
      ],
      items: [
        ['btp-glossary', 'SAP BTP 常用术语', '对 Tenant、Subdomain、Org、Space、Service Instance、Binding、XSUAA、Role Collection 等高频术语建立统一理解。'],
        ['btp-doc-navigation', '如何查阅 SAP 官方文档', '以 help.sap.com/docs/btp 为入口，按产品文档版本、区域与服务计划核对配置，避免照抄旧版教程。'],
        ['btp-version-caveat', '版本差异与「待验证」标记说明', '本网站对未能通过官方文档核对的配置标注「待验证」，实际项目请以当前租户的服务计划与官方页面为准。'],
      ],
    },
  ],
};
