import type { RawGroup } from '../navigation';

export const projectsNav: RawGroup = {
  id: 'projects',
  title: '实战项目',
  shortTitle: '实战项目',
  icon: 'FolderGit2',
  description: '六个端到端项目：从账号创建、Node.js 部署、XSUAA 登录、CAP + HANA、SAPUI5 部署到 S/4HANA 集成。',
  sections: [
    {
      title: '基础环境项目',
      cockpitPath: 'BTP Cockpit + 本地终端',
      notes: [
        '所有项目默认使用 Cloud Foundry 环境；Kyma / ABAP 环境的部署方式不在这些项目范围内。',
        '示例中的 <SUBDOMAIN>、<REGION>、<ORG>、<SPACE>、<USER_EMAIL>、<CLIENT_SECRET> 均为占位符，请替换为自己的值。',
      ],
      docs: [
        ['SAP Developers 教程', 'https://developers.sap.com/tutorials/'],
        ['SAP BTP 官方文档入口', 'https://help.sap.com/docs/btp'],
      ],
      items: [
        ['project-btp-account', '项目一：从零创建 SAP BTP 账号', '注册 Trial 或使用商业账号，创建 Subaccount、启用 Cloud Foundry、分配 Entitlements 并验证环境。'],
        ['project-nodejs-cf', '项目二：部署第一个 Node.js 应用', '从 Node.js 与 CF CLI 安装开始，编写 Hello World、package.json、manifest.yml，cf push 并查看日志与地址。'],
      ],
    },
    {
      title: '安全与应用项目',
      cockpitPath: '本地项目 + BTP Cloud Foundry Space',
      notes: [
        '项目三是全站核心：Node.js + App Router + XSUAA + Destination + HTML5 Application Repository 的完整登录与授权应用。',
        '项目四至六涉及 HANA Cloud、SAPUI5、Cloud Connector，均需要相应服务的 Entitlement，Trial 账号可能不可用。',
      ],
      docs: [
        ['CAP 官方文档', 'https://cap.cloud.sap/docs/'],
        ['SAPUI5 SDK', 'https://ui5.sap.com/'],
        ['SAP Samples on GitHub', 'https://github.com/SAP-samples'],
      ],
      items: [
        ['project-xsuaa-login', '项目三：带登录功能的应用（XSUAA 重点）', '实现登录跳转、用户信息展示、按角色显示功能、管理员页保护、Logout 与 Token 验证。'],
        ['project-cap-hana', '项目四：CAP + HANA Cloud 完整项目', 'CDS 建模、服务实现、HDI Container、XSUAA、App Router、MTA 部署与 Postman 测试。'],
        ['project-fiori-deploy', '项目五：SAPUI5 / Fiori 应用部署', 'UI5 页面、xs-app.json、HTML5 Application Repository、mta.yaml、MTAR 构建与入口访问。'],
        ['project-s4hana-connect', '项目六：连接企业内部 SAP S/4HANA', 'Cloud Connector 隧道、Location ID、OnPremise Destination、CAP 调用 OData 与故障排查。'],
      ],
    },
  ],
};
