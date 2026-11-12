/**
 * 官方来源清单
 * 说明：为了避免编造不存在的文档深链，本站统一使用已核实的官方入口 URL，
 * 并在每条说明中给出在该站点内应检索的关键词。页面中会明确提示读者
 * 以当前租户的 Service Marketplace 与官方文档版本为准。
 */
export interface OfficialSource {
  id: string;
  title: string;
  url: string;
  description: string;
  hint?: string;
}

export const officialSources: OfficialSource[] = [
  {
    id: 'help-btp',
    title: 'SAP BTP 官方文档（SAP Help Portal）',
    url: 'https://help.sap.com/docs/btp',
    description: '查询账号模型、服务配置、安全与运行环境的权威依据；文档按产品与版本组织，搜索时请留意版本筛选。',
    hint: '站内检索关键词：Account Model、Entitlements、Authorization and Trust Management、Destination、Cloud Connector',
  },
  {
    id: 'sap-product',
    title: 'SAP BTP 官方产品页',
    url: 'https://www.sap.com/products/technology-platform.html',
    description: '平台定位、能力域与产品组合的官方介绍，适合初学者建立整体认知。',
  },
  {
    id: 'developers',
    title: 'SAP Developers',
    url: 'https://developers.sap.com/tutorials/',
    description: 'SAP 官方分步教程与动手练习，包含 BTP、CAP、SAPUI5 与集成主题。',
  },
  {
    id: 'learning',
    title: 'SAP Learning',
    url: 'https://learning.sap.com/',
    description: 'SAP 官方学习课程与认证路径，可用于系统性补充理论知识。',
  },
  {
    id: 'samples',
    title: 'SAP Samples（GitHub）',
    url: 'https://github.com/SAP-samples',
    description: 'SAP 官方开源示例仓库集合，包含 CAP、App Router、XSUAA、MTA 等可运行示例。',
  },
  {
    id: 'community',
    title: 'SAP Community',
    url: 'https://community.sap.com/',
    description: '官方社区问答与博客，适合核对具体错误的社区已知解法（需自行判断时效性）。',
  },
  {
    id: 'youtube',
    title: 'SAP Technology 官方 YouTube 频道',
    url: 'https://www.youtube.com/@SAPTechnology',
    description: 'SAP 官方技术视频频道，本站视频中心仅提供可核实的官方频道/页面入口，不虚构视频 ID。',
  },
  {
    id: 'discovery',
    title: 'SAP Discovery Center',
    url: 'https://discovery-center.cloud.sap/',
    description: '查询服务、服务计划、区域可用性与计价模型的官方入口，配置前应先在此核对可用性。',
  },
  {
    id: 'cap-docs',
    title: 'SAP CAP 官方文档',
    url: 'https://cap.cloud.sap/docs/',
    description: 'CDS 建模、服务实现、认证授权与部署的权威文档。',
  },
  {
    id: 'ui5-sdk',
    title: 'SAPUI5 SDK',
    url: 'https://ui5.sap.com/',
    description: 'SAPUI5 / OpenUI5 控件、API 与开发指南。',
  },
  {
    id: 'cf-docs',
    title: 'Cloud Foundry 官方文档',
    url: 'https://docs.cloudfoundry.org/',
    description: 'cf CLI、manifest、buildpack 与角色模型的上游权威文档。',
  },
  {
    id: 'identity-docs',
    title: 'SAP Cloud Identity Services 文档',
    url: 'https://help.sap.com/docs/cloud-identity-services',
    description: 'IAS / IPS 与身份提供方、用户同步相关配置说明。',
  },
];

export const sourceById = new Map(officialSources.map((s) => [s.id, s]));
