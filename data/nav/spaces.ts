import type { RawGroup } from '../navigation';

export const spacesNav: RawGroup = {
  id: 'spaces',
  title: 'Spaces 空间管理',
  shortTitle: '空间管理',
  icon: 'Layers',
  description: 'Space 创建、配额、成员与角色、应用与服务清单，以及 Dev / Test / Production 多环境隔离设计。',
  sections: [
    {
      title: 'Space 对象管理',
      cockpitPath: 'Subaccount → Cloud Foundry → Spaces → 选择 Space',
      notes: [
        'Space 属于 Org，应用与服务实例都创建在 Space 中；不同 Space 之间的应用、服务实例与 Route 默认隔离。',
        '创建 Space 时需指定 Space Quota（可选），并把用户加入 Space Developer 角色后才能 cf push。',
        '删除 Space 会连带删除其中的应用与服务实例，务必先解绑、导出配置并确认备份。',
      ],
      commands: [
        ['cf create-space <SPACE> -o <ORG>', '在指定 Org 下创建 Space'],
        ['cf target -o <ORG> -s <SPACE>', '把 CLI 上下文切换到指定 Org 与 Space'],
        ['cf space-users <ORG> <SPACE>', '列出 Space 中已分配角色的用户'],
        ['cf set-space-role <USER> <ORG> <SPACE> SpaceDeveloper', '授予用户 Space Developer 角色'],
      ],
      docs: [
        ['Cloud Foundry 官方文档（Orgs, Spaces, Roles）', 'https://docs.cloudfoundry.org/concepts/roles.html'],
        ['SAP BTP 官方文档入口', 'https://help.sap.com/docs/btp'],
      ],
      items: [
        ['space-create', 'Space 创建', '在 Cockpit 的 Cloud Foundry → Spaces 中点击 Create Space，或用 cf create-space 新建并指定配额。'],
        ['space-delete', 'Space 删除', '清理应用、服务实例与绑定后删除 Space，操作会移除其中全部资源。'],
        ['space-quota', 'Space 配额', '为 Space 设置内存总量、应用实例数、服务实例数等上限，避免单一环境耗尽 Org 资源。'],
        ['space-members', 'Space Members', '在 Space 中被授予角色的用户列表，决定谁可以查看、开发或管理该 Space。'],
        ['space-developer', 'Space Developer', '允许创建、删除与管理应用及服务实例的开发角色，是 cf push 所需的最小角色。'],
        ['space-manager', 'Space Manager', '允许管理 Space 本身、成员与配额，但不等于可以直接部署应用。'],
        ['space-auditor', 'Space Auditor', '只读查看 Space 及其资源的角色，适用于审计与运维观察。'],
        ['space-applications', 'Space Applications', '列出 Space 内的应用、状态、实例数与 Route，用于容量与部署核对。'],
        ['space-service-instances', 'Space Service Instances', '列出 Space 内服务实例、计划与绑定关系，是配额与成本盘点依据。'],
        ['space-org-relation', 'Space 与 Org 的关系', 'Org 是组织与配额边界，Space 是资源隔离边界；一个 Org 下可有多个 Space。'],
      ],
    },
    {
      title: '多环境隔离实践',
      cockpitPath: 'Global Account → 多个 Subaccount / 多个 Space 的组合设计',
      notes: [
        '隔离粒度可按需选择：同一 Subaccount 多 Space（轻量、共享配额），或多个 Subaccount（强隔离、独立信任与配额）。',
        '推荐至少区分 Dev / Test / Prod，生产环境使用独立 Subaccount 与独立身份信任配置，并限制 Space Developer 人数。',
        'CI/CD 的部署凭据按环境隔离，生产凭据应存放在密钥管理服务或流水线凭据库中，禁止写入代码仓库。',
      ],
      docs: [
        ['SAP BTP 官方文档（搜索 Account Model）', 'https://help.sap.com/docs/btp'],
        ['SAP Discovery Center', 'https://discovery-center.cloud.sap/'],
      ],
      items: [
        ['space-isolation', '多环境隔离实践', '对比 Space 级与 Subaccount 级隔离在配额、身份信任、故障半径与成本上的差异。'],
        ['space-dev-test-prod', 'Dev / Test / Production 环境设计', '给出三环境的账号结构、角色分配、配额比例与部署流水线设计范例。'],
      ],
    },
  ],
};
