import type { RawGroup } from '../navigation';

export const usersNav: RawGroup = {
  id: 'users-roles',
  title: 'Users / Roles / Role Collections',
  shortTitle: '用户与角色',
  icon: 'UsersRound',
  description: '用户管理、角色模型、Role Collection 分配、IAS 用户同步与三种典型企业权限配置案例。',
  sections: [
    {
      title: '用户管理',
      cockpitPath: 'Subaccount → Security → Users',
      notes: [
        '在 Cockpit 的 Users 页面可以看到身份提供方中的用户（取决于信任配置），并为其分配 Role Collection。',
        '用户本身不直接持有 Role；授权路径为 User → Role Collection → Role → Scope。',
        '权限不足时先检查：用户是否被分配到 Role Collection、Role Collection 是否包含目标 Role、应用实例是否已更新到最新 xs-security.json。',
      ],
      docs: [
        ['SAP BTP 官方文档（搜索 Users / Role Collections）', 'https://help.sap.com/docs/btp'],
        ['SAP Cloud Identity Services 文档', 'https://help.sap.com/docs/cloud-identity-services'],
      ],
      items: [
        ['usr-overview', '用户管理', '在 Subaccount → Security → Users 中查看用户、来源 IdP 与已分配的 Role Collection。'],
        ['usr-create', '用户创建', '用户通常在身份提供方（IAS 或企业 IdP）中创建，Cockpit 中完成的是授权而非密码管理。'],
        ['usr-authorize', '用户授权', '按 User → Role Collection → Role → Scope 的链路为用户赋予应用权限。'],
        ['usr-groups', '用户组', '在 IdP 侧维护用户组，并通过组映射简化大规模授权。'],
        ['usr-ias-sync', 'IAS 用户同步', '通过 Identity Provisioning 把企业目录用户同步到 IAS，保持账号生命周期一致。'],
        ['usr-corporate-auth', '企业身份认证', '企业 IdP 与 IAS / Subaccount 建立信任后，员工可用企业账号单点登录 BTP 应用。'],
        ['usr-login-troubleshooting', '用户登录排查', '按 IdP 信任、用户属性、重定向 URI、Role Collection 与应用日志顺序定位登录问题。'],
        ['usr-no-permission', '权限不足排查', '区分未认证（401）与已认证但无权限（403），逐层核对 Role 与 Scope。'],
        ['usr-least-privilege', '最小权限原则', '仅授予完成工作所需的最小 Scope，定期复核生产环境的 Role Collection 分配。'],
      ],
    },
    {
      title: '角色模型',
      cockpitPath: 'Subaccount → Security → Roles / Role Collections',
      notes: [
        'Role 来自应用（XSUAA 实例）发布的安全描述，管理员可以在 Cockpit 中看到但不能随意修改其 Scope 集合。',
        'Role Template 是 xs-security.json 中的定义，用于生成可被加入 Role Collection 的 Role。',
        'Role Collection 是跨应用打包权限的容器，一个用户可被分配多个 Role Collection。',
      ],
      docs: [
        ['SAP BTP 官方文档（搜索 Role Collection）', 'https://help.sap.com/docs/btp'],
      ],
      items: [
        ['usr-role', 'Role', '由应用安全描述生成的具体角色，包含一个或多个 Scope。'],
        ['usr-role-template', 'Role Template', 'xs-security.json 中定义的可实例化角色模板，声明 Scope 与 Attribute 引用。'],
        ['usr-role-collection', 'Role Collection', '把多个应用的 Role 组合在一起并分配给用户的授权容器。'],
        ['usr-role-collection-mapping', 'Role Collection Mapping', '依据 IdP 组或断言属性自动把用户关联到 Role Collection 的规则。'],
        ['usr-user-assignment', '用户角色分配', '在 Users 页面勾选 Role Collection 完成授权，并说明生效时机与缓存。'],
      ],
    },
    {
      title: '典型权限配置案例',
      cockpitPath: 'Subaccount → Security → Role Collections / Users',
      notes: [
        '以下三个案例均为配置范式示例，具体 Role 名称取决于应用 xs-security.json 中的定义。',
        '生产环境应把管理员权限分配给极少数账号，并开启审计日志以记录授权变更。',
      ],
      docs: [
        ['SAP BTP 官方文档入口', 'https://help.sap.com/docs/btp'],
      ],
      items: [
        ['usr-case-admin', '案例：管理员权限配置', '为平台管理员分配 Subaccount / Org 管理角色与应用的 Admin Scope，配合审计与双人复核。'],
        ['usr-case-developer', '案例：开发人员权限配置', '授予 Space Developer 与应用 Display / Write Scope，但不授予生产环境管理员权限。'],
        ['usr-case-business', '案例：业务用户权限配置', '仅授予前端应用入口与业务读取 Scope，隐藏管理与调试接口。'],
      ],
    },
  ],
};
