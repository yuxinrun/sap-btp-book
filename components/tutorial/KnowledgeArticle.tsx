import Link from 'next/link';
import { AlertTriangle, BookOpen, ExternalLink, Info } from 'lucide-react';
import type { NavGroup, NavLeaf, NavSection } from '@/data/navigation';
import { navIndex, getAdjacent } from '@/data/navigation';
import { configReferences, errorKnowledgeBase } from '@/data/cheatsheets';
import { serviceDetailById } from '@/data/services-detail';
import { officialSources } from '@/data/official';
import { PlainCodeBlock } from '@/components/code/PlainCodeBlock';
import { Mermaid } from '@/components/code/Mermaid';
import type { TocItem } from '@/lib/content';

interface KnowledgeArticleProps {
  leaf: NavLeaf;
  section: NavSection;
  group: NavGroup;
}

const diagramsByGroup: Record<string, string> = {
  foundation: 'flowchart TB\n  GA[Global Account] --> D[Directory 可选]\n  D --> SA[Subaccount]\n  GA --> SA\n  SA --> ENV[运行环境 CF / Kyma / ABAP]\n  SA --> ENT[Entitlements 配额权利]',
  cockpit: 'flowchart LR\n  U[管理员] --> C[BTP Cockpit]\n  C --> GA[Global Account]\n  C --> SA[Subaccount]\n  SA --> OV[Overview / Cloud Foundry Environment]\n  SA --> ENT[Entitlements]\n  SA --> AUD[Audit Log]',
  services: 'flowchart LR\n  E[Entitlements 已分配] --> M[Service Marketplace]\n  M --> I[Service Instance]\n  I -->|bind-service| A[应用 VCAP_SERVICES]\n  I -->|create-service-key| K[Service Key]',
  'cloud-foundry': 'flowchart LR\n  DEV[cf push] --> CC[Cloud Controller]\n  CC --> ST[Staging / Buildpack]\n  ST --> APP[应用实例]\n  R[Router / Route] --> APP\n  SI[Service Instance] -->|绑定| APP',
  spaces: 'flowchart TB\n  ORG[Org] --> S1[Space: Dev]\n  ORG --> S2[Space: Test]\n  ORG --> S3[Space: Prod]\n  S1 --> A1[应用 + 服务实例]\n  S2 --> A2[应用 + 服务实例]\n  S3 --> A3[应用 + 服务实例]',
  'html5-applications': 'flowchart LR\n  B[浏览器] --> AR[App Router]\n  AR --> XU[XSUAA 登录]\n  AR --> REPO[HTML5 Repo Runtime]\n  AR -->|Destination| API[后端 API]',
  connectivity: 'flowchart LR\n  APP[BTP 应用] --> DEST[Destination]\n  DEST --> CONN[Connectivity Service]\n  CONN -->|TLS 隧道| CC[Cloud Connector]\n  CC --> SAP[内网 SAP 系统]',
  security: 'flowchart LR\n  U[用户] --> IDP[身份提供方 IAS]\n  IDP --> AR[App Router]\n  AR --> XSUAA[XSUAA / JWT]\n  XSUAA --> SCOPE[Scope 校验]\n  SCOPE --> API[后端服务]',
  'users-roles': 'flowchart LR\n  USER[用户] --> RC[Role Collection]\n  RC --> ROLE[Role]\n  ROLE --> SCOPE[Scope]\n  SCOPE --> APP[应用功能]',
  entitlements: 'flowchart TB\n  CONTRACT[合同 / 服务权利] --> GA[Global Account Entitlements]\n  GA --> D[Directory 可选]\n  GA --> SA[Subaccount 分配量]\n  SA --> SI[服务实例消费]',
  'usage-analytics': 'flowchart LR\n  APP[应用 / 服务实例] --> M[Usage Analytics]\n  M --> R[资源用量报表]\n  R --> C[成本归因]\n  R --> O[资源优化决策]',
  advanced: 'flowchart LR\n  DEV[开发] --> TMS[Transport Management]\n  TMS --> TEST[测试]\n  TMS --> PROD[生产]\n  CI[CI/CD 流水线] --> DEV',
  projects: 'flowchart LR\n  LOCAL[本地开发] --> BUILD[mbt build / npm]\n  BUILD --> DEPLOY[cf push / cf deploy]\n  DEPLOY --> CF[Cloud Foundry Space]\n  CF --> VERIFY[验证与排错]',
};

const paramsByGroup: Record<string, [string, string, string][]> = {
  foundation: [['Subdomain', '全局唯一子域名，如 <SUBDOMAIN>', '影响应用 URL 与 XSUAA 租户域名'], ['Region', '如 <REGION>，按数据驻留选择', '创建后通常不可直接迁移'], ['Provider', '按区域可选的底层基础设施', '以创建界面显示为准']],
  cockpit: [['Display Name', '便于识别的显示名称', '可后续修改'], ['Subdomain', '<SUBDOMAIN>，全局唯一', '创建后更改受限'], ['Region / Provider', '<REGION> / 该区域可用 Provider', '决定服务可用性'], ['Used for Production', '按用途选择', '影响治理与合规要求']],
  services: [['Service', 'cf marketplace 输出的服务名', '与实际显示保持一致'], ['Plan', 'cf marketplace 输出的服务计划', '不同账号类型可用计划不同'], ['Instance Name', '<INSTANCE>，自定义实例名', '绑定与 Service Key 时引用']],
  'cloud-foundry': [['API Endpoint', '<API_ENDPOINT>', 'Subaccount → Cloud Foundry Environment 中查看'], ['Org / Space', '<ORG> / <SPACE>', 'cf target 可确认当前目标'], ['memory / instances', '512M / 1', '受 Space Quota 限制']],
  spaces: [['Space Name', '<SPACE>', '建议使用 dev / test / prod 命名'], ['Space Quota', '按环境分配内存与实例数', '可选但生产环境建议配置'], ['Role', 'SpaceDeveloper / SpaceManager / SpaceAuditor', '按最小权限分配']],
  'html5-applications': [['welcomeFile', '/index.html', 'App Router 默认入口文件'], ['authenticationType', 'xsuaa / none', '决定路由是否需要登录'], ['service', 'html5-apps-repo-rt', '引用 HTML5 Runtime 服务实例']],
  connectivity: [['Name', '如 S4HANA_ODATA', '应用按此名称读取目标'], ['URL', 'https://<HOST>:<PORT>', '内网目标地址'], ['ProxyType', 'Internet / OnPremise', '内网系统选 OnPremise'], ['Authentication', '按后端支持选择', '生产优先 OAuth 类或 PrincipalPropagation'], ['CloudConnectorLocationId', '<LOCATION_ID>', '使用 Location ID 时必填且需一致']],
  security: [['xsappname', 'btp-learning-<SUBDOMAIN>', '同一租户中必须唯一'], ['scopes', '$XSAPPNAME.Display / .Admin', '最小权限点'], ['role-templates', 'Viewer / Administrator', '组合 Scope 生成 Role'], ['redirect-uris', 'https://<APP_HOST>/login/callback', '需与实际访问域名一致']],
  'users-roles': [['Role Collection', '<ROLE_COLLECTION_NAME>', '授权给用户的最小容器'], ['User', '<USER_EMAIL>', '用户来自已配置的 IdP'], ['Group / Attribute', '<IDP_GROUP>', '用于自动映射']],
  entitlements: [['Service + Plan', '按 Service Marketplace 显示', '分配前确认区域可用'], ['Assigned Amount', '分配给 Subaccount 的数量', '不能超过 Global Account 可用量'], ['Quota', '内存 / 实例数', 'Org 与 Space 层独立约束']],
  'usage-analytics': [['时间范围', '按周 / 月', '识别趋势而非单点'], ['环境维度', 'Dev / Test / Prod', '归因到具体 Subaccount'], ['阈值', '如配额消费 80%', '触发告警与扩容评估']],
  advanced: [['服务计划', '按 Discovery Center 核对', '不同产品独立订阅'], ['目标环境', 'CF / ABAP 等', '传输目标类型需分别配置'], ['凭据', '<CLIENT_SECRET>', '存放在流水线凭据库']],
  projects: [['Subdomain / Region', '<SUBDOMAIN> / <REGION>', '所有部署配置的基础'], ['Org / Space', '<ORG> / <SPACE>', 'cf target 确认'], ['App Host', '<APP_HOST>', '回调地址与应用访问地址']],
};

function difficultyFor(group: NavGroup) {
  if (group.id === 'projects' || group.id === 'security' || group.id === 'advanced') return '进阶';
  if (group.id === 'cloud-foundry' || group.id === 'connectivity' || group.id === 'html5-applications') return '进阶';
  return '入门';
}

export function KnowledgeArticle({ leaf, section, group }: KnowledgeArticleProps) {
  const detail = serviceDetailById.get(leaf.id);
  const { next } = getAdjacent(navIndex, leaf.id);
  const params = paramsByGroup[group.id] ?? paramsByGroup.foundation;
  const diagram = diagramsByGroup[group.id] ?? diagramsByGroup.foundation;
  const configRefs = configReferences.filter((c) => {
    if (group.id === 'security') return ['xs-security', 'xs-app'].includes(c.id);
    if (group.id === 'cloud-foundry' || group.id === 'spaces' || group.id === 'projects') return ['manifest', 'mta'].includes(c.id);
    if (group.id === 'connectivity') return ['xs-app', 'mta'].includes(c.id);
    return c.id === 'xs-security';
  });
  const configRef = configRefs[0] ?? configReferences[0];
  const errors = errorKnowledgeBase
    .map((e) => ({ e, hit: `${e.symptom}${e.causes.join('')}${e.checks.join('')}`.toLowerCase().includes(
      group.id === 'security' ? '权限' : group.id === 'connectivity' ? '内网' : group.id === 'cloud-foundry' ? '部署' : '服务'
    ) ? 1 : 0 }))
    .filter((x) => x.hit)
    .slice(0, 2)
    .map((x) => x.e);
  const fallbackErrors = errors.length ? errors : errorKnowledgeBase.slice(0, 2);

  const commands = section.commands.length
    ? section.commands.map((c) => `// ${c.description}\n${c.command}`).join('\n\n')
    : `// 确认当前目标 Org / Space，避免把资源部署到错误环境\ncf target\n\n// 查看当前 Space 中的应用与服务实例\ncf apps\ncf services`;

  const codeForExample = detail?.code[0] ?? {
    label: '读取绑定服务凭据（Node.js 示例）',
    language: 'javascript',
    content: "// Cloud Foundry 通过 VCAP_SERVICES 注入已绑定服务的凭据\nconst services = JSON.parse(process.env.VCAP_SERVICES || '{}');\nconst credentials = services[process.env.SERVICE_LABEL]?.[0]?.credentials;\n\nif (!credentials) {\n  console.error('缺少服务绑定，请执行 cf bind-service 并 restage 应用');\n  process.exit(1);\n}\nconsole.log('服务实例已绑定，凭据键数量：', Object.keys(credentials).length);",
  };

  const toc: TocItem[] = Array.from({ length: 24 }, (_, i) => ({
    id: `sec-${String(i + 1).padStart(2, '0')}`,
    text: `${i + 1}. ${[
      '教程标题', '学习目标', '难度等级', '预计学习时间', '前置知识', '功能是什么？', '为什么需要这个功能？',
      '实际业务应用场景', 'SAP BTP Cockpit 菜单位置', '操作前需要准备什么？', '详细操作步骤', '每一步需要填写的参数',
      '配置截图或界面示意图', '完整配置文件', '完整代码示例', '命令行操作', '执行后的预期结果',
      '如何验证是否成功', '常见错误及解决方案', '安全注意事项', '本章总结', '实战练习', '相关官方文档', '下一篇推荐教程',
    ][i]}`,
    level: 2,
  }));

  const commandBlock = <PlainCodeBlock code={commands} lang="bash" />;
  const configBlock = <PlainCodeBlock code={configRef.code} lang={configRef.language} />;
  const exampleBlock = <PlainCodeBlock code={codeForExample.content} lang={codeForExample.language} />;

  const H = ({ no, children }: { no: number; children: React.ReactNode }) => (
    <h2 id={`sec-${String(no).padStart(2, '0')}`} className="mt-12 mb-4 scroll-mt-24 border-b border-slate-200 pb-2 text-[22px] font-bold tracking-tight text-slate-900 dark:border-slate-700 dark:text-slate-50">
      {no}. {children}
    </h2>
  );

  return {
    toc,
    content: (
      <div className="article-prose">
        <div className="my-6 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-[13px] leading-6 text-amber-900 dark:border-amber-900 dark:bg-amber-950/30 dark:text-amber-100">
          <div className="mb-1 flex items-center gap-2 font-semibold"><Info className="h-4 w-4" /> 知识速览版</div>
          本页按统一教程模板提供该知识点的核心结论、菜单位置、参数、配置、命令与排错要点。本站正在持续补充分步长文；涉及具体界面与参数时，请以当前租户 Cockpit 与 SAP Help Portal 文档核对。
        </div>

        <H no={1}>教程标题</H>
        <p className="text-lg font-semibold text-slate-900 dark:text-slate-100">{leaf.title}</p>
        <p>所属模块：{group.title} / {section.title}。{leaf.brief}</p>

        <H no={2}>学习目标</H>
        <ul>
          <li>准确说出「{leaf.title}」的定义、作用边界与所属账号或运行层级。</li>
          <li>能够在 SAP BTP Cockpit 中找到对应功能位置，并说明每一步要填写的参数。</li>
          <li>能够独立完成一次基础配置或命令操作，并按验证清单确认结果。</li>
        </ul>

        <H no={3}>难度等级</H>
        <p><strong>{difficultyFor(group)}</strong>：本条目属于「{group.shortTitle}」模块，面向初学者到进阶开发者。{group.description} 阅读时建议按顺序掌握前置概念。</p>

        <H no={4}>预计学习时间</H>
        <p>速览约 <strong>10–15 分钟</strong>；若跟随操作步骤在实际租户中动手实践，建议预留 30–45 分钟。</p>

        <H no={5}>前置知识</H>
        <ul>
          <li>了解 Global Account → Directory → Subaccount 的账号层级。</li>
          <li>能区分账号层级、运行环境与服务实例三个不同概念。</li>
          <li>已安装终端工具，并能访问目标 Subaccount（推荐先在 Trial 或非生产环境练习）。</li>
        </ul>

        <H no={6}>功能是什么？</H>
        <p>{leaf.brief}</p>
        <p>在 SAP BTP 的对象模型中，它位于「{group.title} → {section.title}」这一组能力内。理解它的关键是先明确它作用于哪个层级：账号、运行环境、服务实例，还是应用代码。</p>

        <H no={7}>为什么需要这个功能？</H>
        <p>{section.notes[0] ?? '企业应用需要可管理、可审计、可隔离的云平台能力，缺少这一层配置会导致资源、权限或连接关系不可控。'}</p>

        <H no={8}>实际业务应用场景</H>
        <ul>
          {section.notes.slice(0, 4).map((n) => <li key={n}>{n}</li>)}
          <li>在 Dev / Test / Prod 多环境中保持配置一致，并通过配额与权限控制风险。</li>
        </ul>

        <H no={9}>SAP BTP Cockpit 菜单位置</H>
        <p><code>{section.cockpitPath || 'BTP Cockpit → Subaccount → 对应功能分组'}</code></p>
        <p>不同账号类型（Trial / Free Tier / 商业账号）与不同区域的菜单项可能略有差异。本站自绘的 Cockpit 页面结构示意图仅用于菜单结构对照，图中数值均为占位符：</p>
        <p><Link href="/resources#cockpit-reference">查看页面结构示意图与说明 →</Link></p>

        <H no={10}>操作前需要准备什么？</H>
        <ul>
          <li>一个具备相应权限的账号（至少需要目标 Subaccount 与 Space 的操作权限）。</li>
          <li>在 Global Account → Entitlements 中确认相关服务计划已分配到该 Subaccount。</li>
          <li>本地安装 CF CLI v8，并已执行 <code>cf login</code> 与 <code>cf target</code> 确认目标环境。</li>
          <li>准备占位符的实际取值：<code>&lt;SUBDOMAIN&gt;</code>、<code>&lt;REGION&gt;</code>、<code>&lt;ORG&gt;</code>、<code>&lt;SPACE&gt;</code>、<code>&lt;APP_HOST&gt;</code>。</li>
        </ul>

        <H no={11}>详细操作步骤</H>
        <ol>
          {(section.notes.length ? section.notes : ['先在 Cockpit 中定位功能入口并阅读当前页面说明。']).map((n) => <li key={n}>{n}</li>)}
          <li>按第 12 节的参数表填写配置，注意服务与计划名称必须与 <code>cf marketplace</code> 输出一致。</li>
          <li>执行第 16 节的命令，并保存输出结果用于核对。</li>
          <li>按第 18 节的验证清单确认配置生效，未生效时转第 19 节排查。</li>
        </ol>

        <H no={12}>每一步需要填写的参数</H>
        <div className="table-scroll"><table>
          <thead><tr><th>参数</th><th>示例值 / 占位符</th><th>说明与注意事项</th></tr></thead>
          <tbody>{params.map(([name, value, note]) => <tr key={name}><td><code>{name}</code></td><td>{value}</td><td>{note}</td></tr>)}</tbody>
        </table></div>
        <p>所有占位符都需要替换为实际值；请勿在配置文件中写入真实密码、Client Secret 或 Token。</p>

        <H no={13}>配置截图或界面示意图</H>
        <p>下图为本站自绘的<strong>流程示意图</strong>，用于说明对象关系与操作顺序，并非 SAP Cockpit 真实截图。</p>
        <Mermaid chart={diagram} caption={`${group.shortTitle} 流程示意图（本站自绘，非 SAP Cockpit 截图）`} />

        <H no={14}>完整配置文件</H>
        <p>以下是与本模块最相关的 <code>{configRef.filename}</code> 完整示例（{configRef.description}）。更多配置模板见<Link href="/resources#configs">配置文件速查</Link>。</p>
        {configBlock}

        <H no={15}>完整代码示例</H>
        <p>{codeForExample.label}。代码中的账号、密钥与地址均使用占位符，可直接作为理解结构的参考。</p>
        {exampleBlock}

        <H no={16}>命令行操作</H>
        <p>下面每条命令都附带作用说明。执行前请用 <code>cf target</code> 确认目标 Org / Space。</p>
        {commandBlock}

        <H no={17}>执行后的预期结果</H>
        <ul>
          <li>命令返回成功状态，且 <code>cf apps</code> / <code>cf services</code> 中能看到预期的对象。</li>
          <li>Cockpit 对应页面显示新建或修改的对象，状态为可用（无持续进行的异步操作）。</li>
          <li>应用日志中没有认证失败、配额不足或服务凭据缺失相关错误。</li>
        </ul>

        <H no={18}>如何验证是否成功</H>
        <ol>
          <li>执行 <code>cf target</code> 与 <code>cf env &lt;APP&gt;</code>，确认环境变量中包含预期服务凭据。</li>
          <li>在 Cockpit 中打开对应功能页面，核对名称、计划、状态与所属 Space。</li>
          <li>从应用端发一次真实请求，检查返回状态码与日志（401 属认证问题，403 属授权问题）。</li>
        </ol>

        <H no={19}>常见错误及解决方案</H>
        <ul>
          {fallbackErrors.map((e) => (
            <li key={e.id}><strong>{e.symptom}</strong>：常见原因 {e.causes[0]}。排查：{e.checks[0]}。<Link href={`/resources#${e.id}`}>查看完整排错清单 →</Link></li>
          ))}
        </ul>

        <H no={20}>安全注意事项</H>
        <ul>
          <li>凭据（Service Key、Client Secret、JWT）不得写入代码仓库、前端文件或日志。</li>
          <li>生产与测试环境使用不同的身份信任配置与服务实例，避免越权与数据混淆。</li>
          <li>按最小权限原则分配 Role Collection 与 Space Developer 角色，并定期复核。</li>
          <li>涉及内网连接时，Cloud Connector 的资源白名单只开放必需的主机、端口与路径。</li>
        </ul>

        <H no={21}>本章总结</H>
        <p>{leaf.title}：{leaf.brief}</p>
        <p>请记住它在「{group.title}」中的位置，以及配置前必须确认的 Entitlements、Region 与目标 Org / Space 三项前置条件。</p>

        <H no={22}>实战练习</H>
        <ol>
          <li>在自己的 Trial 或非生产 Subaccount 中找到本条目对应的功能页面，记录完整菜单路径。</li>
          <li>用占位符替换为实际值，完整执行一次第 16 节的命令并保存输出。</li>
          <li>故意制造一个常见错误（例如解除服务绑定），按第 19 节顺序排查并恢复。</li>
        </ol>

        <H no={23}>相关官方文档</H>
        <ul>
          {section.docs.map((d) => <li key={d.url}><a href={d.url} target="_blank" rel="noopener noreferrer">{d.title} <ExternalLink className="inline h-3 w-3" /></a></li>)}
          {officialSources.slice(0, 3).map((s) => <li key={s.id}><a href={s.url} target="_blank" rel="noopener noreferrer">{s.title} <ExternalLink className="inline h-3 w-3" /></a></li>)}
        </ul>
        <p className="text-xs text-slate-500 dark:text-slate-400">在官方文档站内建议检索关键词：<code>{leaf.title}</code>、<code>{group.shortTitle}</code>。具体页面路径随文档版本变化，本站不提供未经核实的产品深链。</p>

        <H no={24}>下一篇推荐教程</H>
        {next ? (
          <p><Link href={next.href} className="inline-flex items-center gap-1"><BookOpen className="inline h-4 w-4" /> {next.title}</Link> —— 继续按目录顺序学习，可以保持概念链条完整。</p>
        ) : <p>已是目录最后一个条目，建议返回<Link href="/learn">六阶段学习路线</Link>做系统复习。</p>}

        <div className="mt-10 flex items-start gap-2 rounded-xl border border-slate-200 bg-slate-50 p-4 text-[13px] text-slate-600 dark:border-slate-700 dark:bg-slate-800/50 dark:text-slate-300">
          <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-amber-500" />
          <span>内容真实性：本页引用的是 SAP 官方入口文档与通用产品概念；凡涉及具体菜单项、服务计划或参数的差异，均以当前租户实际界面为准。未能核实的内容在本站统一标注为「待验证」。</span>
        </div>
      </div>
    ),
  };
}
