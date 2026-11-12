import type { RawGroup } from '../navigation';

export const entitlementsNav: RawGroup = {
  id: 'entitlements',
  title: 'Entitlements',
  shortTitle: '配额权利',
  icon: 'Gauge',
  description: '服务配额权利的分配、服务计划、Subaccount 与 Cloud Foundry 配额调整及配额不足排查。',
  sections: [
    {
      title: 'Entitlements 与配额分配',
      cockpitPath: 'Global Account → Entitlements → Assign Service Plans；Subaccount → Entitlements',
      notes: [
        'Entitlements 表示「有权使用哪些服务计划以及多少数量」，由 Global Account 向下分配，Subaccount 只能使用被分配到的部分。',
        'Service Marketplace 中看不到某服务，最常见原因是该服务的 Entitlement 未分配给当前 Subaccount，或当前 Region 不提供该服务。',
        'Quotas 与 Entitlements 是两种约束：前者限制 Org / Space 的资源总量，后者限制服务计划级别的可用量。',
      ],
      docs: [
        ['SAP BTP 官方文档（搜索 Entitlements）', 'https://help.sap.com/docs/btp'],
        ['SAP Discovery Center（服务计划与计量）', 'https://discovery-center.cloud.sap/'],
      ],
      items: [
        ['ent-concept', 'Entitlements 概念', '合同赋予的服务使用权利，以「服务 + 计划 + 数量」的形式在账号层级间分配。'],
        ['ent-service-entitlements', 'Service Entitlements', '按服务维度查看已购/可用数量、已分配数量与当前消费量。'],
        ['ent-service-plans', 'Service Plans', '同一服务下不同能力与计费档位，分配 Entitlement 时必须选对 Plan。'],
        ['ent-assign', 'Entitlement 分配', '在 Global Account 的 Entitlements 页面把服务计划配额分配给 Directory 或 Subaccount。'],
        ['ent-subaccount-quota', 'Subaccount 配额分配', '在多 Subaccount 环境中按环境重要性规划配额比例，并为生产预留余量。'],
        ['ent-cf-quota', 'Cloud Foundry 配额', 'Org / Space 级别的内存、实例数、路由数等上限与 Entitlements 的关系。'],
        ['ent-adjust', '服务配额调整', '从低优先级 Subaccount 回收配额再分配给需要的环境，注意对运行中实例的影响。'],
        ['ent-insufficient', '配额不足排查', '区分「Entitlement 未分配」「配额已用完」「服务实例数超限」三类报错及处理顺序。'],
        ['ent-multi-subaccount', '多 Subaccount 配额管理', '建立配额台账，按 Dev / Test / Prod 与业务单元划分并定期核对用量。'],
      ],
    },
  ],
};

export const analyticsNav: RawGroup = {
  id: 'usage-analytics',
  title: 'Usage Analytics',
  shortTitle: '用量分析',
  icon: 'ChartNoAxesCombined',
  description: '资源使用分析、应用与服务用量、内存与实例监控、成本管理与企业资源优化。',
  sections: [
    {
      title: '用量监控与成本',
      cockpitPath: 'Subaccount → Usage Analytics；Global Account → Usage Analytics（商业账号可用能力）',
      notes: [
        '不同账号类型与合同下，Usage Analytics 可见的报表范围与粒度不同，实际以当前租户 Cockpit 显示为准。',
        '监控重点：应用实例数与内存、服务实例数、配额消费比例、异常增长趋势。',
        '成本优化通常从关停闲置应用、缩减非生产实例数、调整 Space 配额与复核服务计划入手。',
      ],
      docs: [
        ['SAP BTP 官方文档（搜索 Usage Analytics / Cost Management）', 'https://help.sap.com/docs/btp'],
        ['SAP Discovery Center', 'https://discovery-center.cloud.sap/'],
      ],
      items: [
        ['ua-concept', 'Usage Analytics 概念', '以报表形式展示账号、应用与服务的资源消费情况，用于容量规划与成本核对。'],
        ['ua-resources', '资源使用分析', '按时间维度查看内存、实例与服务消费趋势，识别异常增长。'],
        ['ua-apps', '应用使用情况', '统计应用数量、运行实例数与状态，发现长期停止或闲置的应用。'],
        ['ua-services', '服务使用情况', '按服务与计划统计实例数量，配合 Entitlements 做配额盘点。'],
        ['ua-memory', '内存使用', '监控 Org / Space 内存分配与实际占用，预防 cf push 因配额失败。'],
        ['ua-instances', '实例数量', '统计应用实例与服务实例数，核对是否触及 Space Quota 上限。'],
        ['ua-quota-monitor', '配额监控', '设置配额消费阈值并按环境建立巡检清单。'],
        ['ua-cost', '成本管理', '把用量数据与服务计划、合同条款对应起来，形成成本归因。'],
        ['ua-optimization', '资源优化', '通过缩放实例、关停非生产环境与合并低负载应用降低资源占用。'],
        ['ua-enterprise', '企业资源管理', '建立跨 Subaccount 的资源台账、审批流程与定期复核机制。'],
      ],
    },
  ],
};
