import type { RawGroup } from '../navigation';

export const cockpitNav: RawGroup = {
  id: 'cockpit',
  title: 'BTP Cockpit 管理',
  shortTitle: 'Cockpit 管理',
  icon: 'LayoutDashboard',
  description: '以 Subaccount Overview 为主线的 Cockpit 实操：登录、创建、配置、配额、审计与常见管理问题。',
  sections: [
    {
      title: '登录与全局视图',
      cockpitPath: '浏览器 → https://cockpit.<REGION>.hana.ondemand.com → 选择 Global Account',
      notes: [
        'Cockpit 的 URL 与所选区域相关，登录后先选择 Global Account，再进入具体 Subaccount；左侧菜单内容随 Subaccount 已启用环境而变化。',
        '本站自绘的页面结构示意图中，Subaccount Overview 的标签页为 General / Cloud Foundry Environment / Labels / Entitlements；未启用 CF 环境时可能不会出现 Cloud Foundry Environment 标签页，请以实际界面为准。',
        'Account Explorer 用于以树形视图查看 Global Account、Directory 与 Subaccount 的层级及配额使用情况。',
      ],
      docs: [
        ['SAP BTP Cockpit 官方文档入口', 'https://help.sap.com/docs/btp'],
        ['SAP BTP 官方产品页', 'https://www.sap.com/products/technology-platform.html'],
      ],
      items: [
        ['cockpit-login', 'Cockpit 登录', '使用已授权的 SAP 通用 ID / 企业身份登录区域对应的 Cockpit 地址，并确认可见的 Global Account。'],
        ['cockpit-global-account-view', 'Global Account 视图', '在全局账号层查看 Entitlements、Directory、Subaccount 列表与账号级设置。'],
        ['cockpit-directory-manage', 'Directory 管理', '创建 Directory、把 Subaccount 归入 Directory，并在 Directory 层批量分配服务配额。'],
        ['cockpit-account-explorer', 'Account Explorer', '以层级树查看 Global Account → Directory → Subaccount 及其资源与配额消费情况。'],
        ['cockpit-overview-tabs', 'Subaccount Overview 标签页', 'Overview 中的 General / Cloud Foundry Environment / Labels / Entitlements 标签分别承载基本信息、环境实例、标签与配额。'],
      ],
    },
    {
      title: 'Subaccount 生命周期',
      cockpitPath: 'BTP Cockpit → Subaccounts → Create Subaccount',
      notes: [
        '创建 Subaccount 时通常需要填写 Display Name、Subdomain（全局唯一且影响应用 URL）、Region、Provider 与用途标识。',
        'Subdomain 一经创建会用于 XSUAA 租户域名、App Router 与 CAP 服务的 URL，命名需谨慎，创建后更改受限。',
        'Environment 可在创建时或之后启用；Cloud Foundry 环境启用时会同时创建 Org，随后可创建 Space。',
        '删除 Subaccount 会连带删除其中的应用与服务实例，操作不可逆，必须先确认备份与审批。',
      ],
      docs: [
        ['SAP BTP 官方文档（搜索 Subaccount / Region）', 'https://help.sap.com/docs/btp'],
        ['SAP Discovery Center（按区域查看服务可用性）', 'https://discovery-center.cloud.sap/'],
      ],
      items: [
        ['cockpit-subaccount-create', 'Subaccount 创建', '在 Global Account 或 Directory 下新建 Subaccount，确定名称、Subdomain、Region 与 Provider，并等待实例就绪。'],
        ['cockpit-subaccount-config', 'Subaccount 配置', '修改显示名称、标签、用途标记，并配置信任、环境与 Labels 等属性。'],
        ['cockpit-subaccount-delete', 'Subaccount 删除', '停用并删除 Subaccount 前需清理绑定资源、导出配置与审计记录，操作不可撤销。'],
        ['cockpit-region-select', 'Region 选择', '依据数据驻留要求、客户所在区域与目标服务在该区域的可用性选择 Region，创建后通常无法直接迁移。'],
        ['cockpit-subaccount-types', 'Subaccount 类型', '区分用于开发、测试、生产的 Subaccount，以及 Trial / Free Tier / 商业账号下 Subaccount 的能力差异。'],
        ['cockpit-environment-config', 'Environment 配置', '在 Subaccount 中启用 Cloud Foundry、Kyma 或 ABAP 环境，并记录生成的 Org 与 API Endpoint。'],
      ],
    },
    {
      title: '配额、审计与排错',
      cockpitPath: 'Subaccount → Entitlements / Usage Analytics / Audit Log Viewer',
      notes: [
        'Entitlements 在 Global Account 层分配给 Subaccount；若目标服务显示不可用，先在 Entitlements 中确认是否分配以及 Plan 名称是否正确。',
        'Audit Log 记录管理类操作（创建实例、角色变更等），是排查「谁在什么时候改了配置」的第一手依据。',
        'Quotas 决定 Org / Space 可用内存、实例数量等，配额耗尽会直接导致 cf push 或服务创建失败。',
      ],
      docs: [
        ['SAP BTP 官方文档（搜索 Entitlements / Audit Logging）', 'https://help.sap.com/docs/btp'],
        ['SAP Community', 'https://community.sap.com/'],
      ],
      items: [
        ['cockpit-entitlements-config', 'Entitlements 配置', '从 Global Account 把服务计划配额分配到 Subaccount，必要时在多个 Subaccount 之间调整分配量。'],
        ['cockpit-quotas-config', 'Quotas 配置', '设置 Org / Space 的内存、实例数等上限，并监控实际消费。'],
        ['cockpit-audit-log', 'Audit Log', '通过 Audit Log Viewer 检索账号与安全相关事件，用于合规审计与变更追溯。'],
        ['cockpit-common-issues', '常见管理问题', '覆盖服务不显示、配额不足、无权限创建实例、Subdomain 冲突与区域服务不可用等高频问题的定位顺序。'],
      ],
    },
  ],
};
