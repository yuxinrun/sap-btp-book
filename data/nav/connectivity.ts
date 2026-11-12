import type { RawGroup } from '../navigation';

export const connectivityNav: RawGroup = {
  id: 'connectivity',
  title: 'Connectivity 连接管理',
  shortTitle: '连接管理',
  icon: 'Cable',
  description: 'Destinations 全部认证类型、Cloud Connector、内部 S/4HANA 连接、证书与连接故障排查。',
  sections: [
    {
      title: 'Destinations 目标配置',
      cockpitPath: 'Subaccount → Connectivity → Destinations；或 Destination Service 实例中的目标配置',
      notes: [
        'Destination 是一条命名的连接配置，包含 URL、认证类型、用户凭据或 OAuth 参数以及附加属性；应用按名称读取，不硬编码后端地址。',
        'Cockpit 中 Connectivity 分组常见子项为 Destinations、Destination Certificates、Destination Trust、Cloud Connectors。',
        '常见认证类型：NoAuthentication、BasicAuthentication、OAuth2ClientCredentials、OAuth2UserTokenExchange、OAuth2SAMLBearerAssertion、PrincipalPropagation。',
        '连接内网系统时需在 Destination 中设置 ProxyType=OnPremise，并填写 Cloud Connector 的 Location ID（若配置了非空 Location ID）。',
      ],
      commands: [
        ['cf create-service destination lite <DESTINATION_INSTANCE>', '创建 Destination 服务实例（Plan 名称以租户 Service Marketplace 实际显示为准）'],
        ['cf bind-service <APP> <DESTINATION_INSTANCE>', '把 Destination 服务绑定到应用，运行时通过 VCAP_SERVICES 获取凭据'],
        ['cf env <APP>', '检查应用是否拿到 destination 与 connectivity 服务凭据'],
      ],
      docs: [
        ['SAP BTP 官方文档（搜索 Destination Service）', 'https://help.sap.com/docs/btp'],
        ['CAP 官方文档（Consuming Services）', 'https://cap.cloud.sap/docs/'],
      ],
      items: [
        ['destinations-overview', 'Destinations', '集中配置后端 URL 与认证方式的命名对象，支持在运行时按名称解析并注入请求头。'],
        ['destinations-create', 'Destination 创建', '在 Cockpit 或 Destination Service 中新建目标，填写 Name、URL、ProxyType、Authentication 与附加属性。'],
        ['destinations-http', 'HTTP Destination', '面向通用 HTTP / REST 后端的目标类型，配合认证类型与附加属性完成调用。'],
        ['destinations-rfc', 'RFC Destination', '面向 SAP 系统 RFC 调用的连接配置，通常经 Cloud Connector 访问内网 ABAP 系统。'],
        ['destinations-odata', 'OData Destination', '面向 S/4HANA 或其他 OData 服务的目标配置，CAP 可直接以服务方式消费。'],
        ['destinations-basic-auth', 'Basic Authentication', '使用 User 与 Password 的基础认证，仅建议在受控测试场景使用，生产应使用 OAuth 类方式。'],
        ['destinations-oauth2-client-credentials', 'OAuth2ClientCredentials', '以客户端 ID 与 Client Secret 换取 token 的系统到系统调用模式，不涉及业务用户身份。'],
        ['destinations-oauth2-user-token-exchange', 'OAuth2UserTokenExchange', '把当前登录用户的 JWT 按 OAuth2 Token Exchange 换取后端 token，保持用户上下文。'],
        ['destinations-oauth2-saml-bearer', 'OAuth2SAMLBearerAssertion', '基于 SAML 2.0 Bearer Assertion 换取 OAuth token 的认证方式，依赖信任配置。'],
        ['destinations-principal-propagation', 'Principal Propagation', '把 BTP 登录用户身份一路传递到内网 SAP 系统，依赖 Cloud Connector 与证书信任链。'],
        ['destinations-configuration', 'Destination Configuration', '说明 Name、Type、URL、ProxyType、Authentication 及 Additional Properties 的填写规则。'],
        ['destinations-service', 'Destination Service', '以服务实例形式提供 Destination 读取能力，应用通过绑定获取 clientid / clientsecret / uri。'],
        ['destinations-app-router', 'Destination 与 App Router 集成', 'xs-app.json 路由中用 destination 字段引用目标名，由 App Router 完成认证与转发。'],
        ['destinations-cap', 'Destination 与 CAP 集成', 'CAP 通过 @sap-cloud-sdk / CDS service 读取 Destination 并调用远端 OData 服务。'],
      ],
    },
    {
      title: 'Cloud Connector 与内网连接',
      cockpitPath: 'Subaccount → Connectivity → Cloud Connectors；本地 Cloud Connector 管理界面',
      notes: [
        'Cloud Connector 安装在企业内网，主动向 BTP Subaccount 建立 TLS 隧道，无需在防火墙开放入站端口。',
        '在 Cloud Connector 中通过 Access Control（资源映射）显式声明允许被访问的主机、端口与路径，遵循最小暴露原则。',
        'Location ID 用于区分连接到同一 Subaccount 的多个 Cloud Connector；未配置时可留空，配置后 Destination 必须填写相同值。',
        '内部系统调用链：应用 → Connectivity Service（代理）→ Cloud Connector → 内网 SAP 系统。',
      ],
      commands: [
        ['cf create-service connectivity lite <CONNECTIVITY_INSTANCE>', '创建 Connectivity 服务实例（Plan 以租户实际可选项为准）'],
        ['cf bind-service <APP> <CONNECTIVITY_INSTANCE>', '把 Connectivity 服务绑定到需要访问内网的应用'],
      ],
      docs: [
        ['SAP BTP 官方文档（搜索 Cloud Connector / Connectivity）', 'https://help.sap.com/docs/btp'],
        ['SAP Community（Cloud Connector 专题）', 'https://community.sap.com/'],
      ],
      items: [
        ['cc-overview', 'Cloud Connector', '部署在内网的反向隧道代理，把 BTP 的请求安全转发到企业内部系统，不开放入站端口。'],
        ['cc-install', 'Cloud Connector 安装', '在内网主机安装 Cloud Connector，完成初始管理员登录与系统证书初始化。'],
        ['cc-config', 'Cloud Connector 配置', '建立到 Subaccount 的连接、配置 Subaccount 信息并维护 Access Control 资源白名单。'],
        ['cc-location-id', 'Cloud Connector Location ID', '多 Cloud Connector 场景下的路由标识，必须与 Destination 中的 CloudConnectorLocationId 一致。'],
        ['cc-onpremise-resources', '内部 SAP 系统连接', '按主机、端口、协议与路径白名单暴露内网资源，避免整网开放。'],
        ['cc-s4hana', 'SAP S/4HANA 连接', '通过 OnPremise Destination 调用 S/4HANA OData API，并配置认证与 Principal Propagation。'],
        ['cc-connectivity-service', 'Connectivity Service', 'BTP 侧提供代理地址与客户端证书的配套服务，应用通过其代理访问 Cloud Connector。'],
        ['cc-proxy', 'Proxy 配置', '解释 ProxyType=Internet / OnPremise 的选择及 HTTP 代理相关附加属性。'],
        ['cc-tls-ssl', 'TLS / SSL', 'Cloud Connector 与 BTP 之间、以及到内网系统之间的加密通道与信任配置。'],
        ['cc-certificates', '证书管理', '系统证书、客户端证书与 Destination Certificates 的用途、更新与 Principal Propagation 信任链。'],
        ['cc-troubleshooting', '常见连接问题排查', '覆盖 403 资源未白名单、502 隧道不可达、Location ID 不匹配、证书过期与用户映射失败。'],
      ],
    },
  ],
};
