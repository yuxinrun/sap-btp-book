import type { RawGroup } from '../navigation';

export const advancedNav: RawGroup = {
  id: 'advanced',
  title: '其他重要模块',
  shortTitle: '扩展模块',
  icon: 'Boxes',
  description: '按产品归属分类的运维、传输交付、数据集成、低代码与 AI 服务。均为独立产品/服务，可用性取决于账号与区域。',
  sections: [
    {
      title: '平台管理与运维',
      cockpitPath: 'Global Account / Subaccount → 相应服务订阅或实例',
      notes: [
        '本分类中的能力属于平台级管理与运维，通常需要单独订阅或创建服务实例，不随 Cloud Foundry 环境自动提供。',
        'Trial 账号下多数企业级运维服务不可用或仅提供有限体验；免费层级与商业账号能力差异较大，操作前请在 Service Marketplace 核对。',
      ],
      docs: [
        ['SAP BTP 官方文档入口', 'https://help.sap.com/docs/btp'],
        ['SAP Discovery Center', 'https://discovery-center.cloud.sap/'],
      ],
      items: [
        ['adv-administration', 'SAP BTP Administration', '指 Global Account / Subaccount 层的账号、配额、信任与环境管理职能的统称。'],
        ['adv-audit-log', 'SAP BTP Audit Log', '记录管理与安全相关事件，支持通过 Audit Log Viewer 检索与合规留存。'],
        ['adv-alert-notification', 'SAP Alert Notification', '事件告警服务，可把平台与应用事件推送到邮件、Webhook 等渠道。'],
        ['adv-app-logging', 'SAP Application Logging', '应用日志集中收集与检索服务，通常通过服务实例绑定启用。'],
      ],
    },
    {
      title: '传输与交付',
      cockpitPath: 'Global Account → 订阅 SAP Cloud Transport Management / SAP Continuous Integration and Delivery',
      notes: [
        '传输管理（cTMS）解决「把内容从 Dev 传到 Test 再到 Prod」的受控交付；CI/CD 服务解决构建、测试与自动部署。两者职责不同但常配合使用。',
        '这些是订阅式应用级服务，需要在 Global Account / Subaccount 中单独订阅并配置目标环境（含 Cloud Foundry 或 ABAP 等目标类型）。',
      ],
      docs: [
        ['SAP BTP 官方文档（搜索 Transport Management / Continuous Integration and Delivery）', 'https://help.sap.com/docs/btp'],
        ['SAP Samples on GitHub', 'https://github.com/SAP-samples'],
      ],
      items: [
        ['adv-transport-management', 'SAP BTP Transport Management', '对 BTP 内容在不同环境间做受控传输的能力统称。'],
        ['adv-ci-cd', 'SAP BTP CI/CD', '以流水线方式完成应用构建、测试与部署的实践方法。'],
        ['adv-ctms', 'SAP Cloud Transport Management', '订阅式服务，定义传输节点、传输路径与队列，追踪内容流转与审批。'],
        ['adv-cicd-service', 'SAP Continuous Integration and Delivery', 'SAP 提供的托管 CI/CD 服务，配置 Job 与凭据后执行构建与部署流水线。'],
      ],
    },
    {
      title: '数据与集成产品',
      cockpitPath: 'Subaccount → Services → Service Marketplace / Instances and Subscriptions',
      notes: [
        'SAP HANA Cloud、Integration Suite、Event Mesh 是相互独立的产品，各自有独立的订阅/实例、配额与配置流程。',
        '不要把这些产品的配置方式与 Cloud Foundry 基础服务混为一谈；例如 Integration Suite 属于订阅式应用。',
      ],
      docs: [
        ['SAP Discovery Center', 'https://discovery-center.cloud.sap/'],
        ['SAP BTP 官方文档入口', 'https://help.sap.com/docs/btp'],
      ],
      items: [
        ['adv-hana-cloud', 'SAP HANA Cloud', 'SAP 的云上数据库服务，CAP 项目通过 HDI Container 使用，需单独创建实例与配置内存/存储规格。'],
        ['adv-integration-suite', 'SAP Integration Suite', '订阅式集成平台，包含集成流程设计、API 管理等能力，按订阅与能力计划开通。'],
        ['adv-event-mesh', 'SAP Event Mesh', '事件代理服务，通过队列与主题实现异步事件驱动集成。'],
      ],
    },
    {
      title: '低代码与 AI',
      cockpitPath: 'Subaccount → Services → Instances and Subscriptions',
      notes: [
        'SAP Build 是低代码/流程自动化产品组合，SAP AI Core 与 AI Launchpad 是 AI 执行与管理服务，三者属于不同产品。',
        'AI 类服务通常按用量计量且有区域可用性限制，请在 Discovery Center 与租户 Service Marketplace 核对后再规划项目。',
      ],
      docs: [
        ['SAP Discovery Center', 'https://discovery-center.cloud.sap/'],
        ['SAP BTP 官方文档入口', 'https://help.sap.com/docs/btp'],
      ],
      items: [
        ['adv-sap-build', 'SAP Build', '低代码应用开发、流程自动化与工作台产品组合，需按具体能力单独订阅。'],
        ['adv-ai-core', 'SAP AI Core', '为 AI 场景提供训练与推理执行能力的服务，通过资源组与执行配置管理任务。'],
        ['adv-ai-launchpad', 'SAP AI Launchpad', '面向 AI Core 的管理与监控界面，用于查看资源组、执行与模型相关对象。'],
      ],
    },
  ],
};
