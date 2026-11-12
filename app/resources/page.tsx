import type { Metadata } from 'next';
import Link from 'next/link';
import { AlertTriangle, BookOpen, ExternalLink, FileCode2, Image as ImageIcon, Terminal, Wrench } from 'lucide-react';
import { Breadcrumbs } from '@/components/navigation/Breadcrumbs';
import { CopyButton } from '@/components/code/CopyButton';
import { ZoomableImage } from '@/components/common/ZoomableImage';
import { Mermaid } from '@/components/code/Mermaid';
import { CodeBlock } from '@/components/tutorial/MdxComponents';
import { commandCheatsheets, configReferences, errorKnowledgeBase, faqEntries } from '@/data/cheatsheets';
import { officialSources } from '@/data/official';
import { siteUrl } from '@/lib/site';

export const metadata: Metadata = {
  title: '资源中心',
  description: 'SAP BTP 常用命令速查、配置文件速查、错误代码与排错知识库、FAQ、官方学习资源与图片示意图说明。',
  keywords: ['CF CLI 命令速查', 'xs-security.json 示例', 'manifest.yml', 'mta.yaml', 'SAP BTP 排错'],
  alternates: { canonical: siteUrl('/resources/') },
};

const anchors = [
  { href: '#commands', label: '命令速查' },
  { href: '#configs', label: '配置速查' },
  { href: '#errors', label: '排错知识库' },
  { href: '#faq', label: '常见问题' },
  { href: '#official', label: '官方资源' },
  { href: '#cockpit-reference', label: '图片说明' },
];

const architectureDiagram = `flowchart TB
  U[业务用户] --> WZ[Work Zone / App Router]
  WZ --> XSUAA[XSUAA 认证与授权]
  XSUAA --> CAP[CAP 后端服务]
  CAP --> HDI[(HANA Cloud / HDI Container)]
  CAP --> DEST[Destination Service]
  DEST --> CC[Cloud Connector]
  CC --> S4[内网 SAP S/4HANA]
  CAP --> LOG[Application Logging]`;

export default async function ResourcesPage() {
  const configBlocks = await Promise.all(
    configReferences.map((ref) => CodeBlock({ children: <code className={`language-${ref.language}`}>{ref.code}</code> }))
  );

  return (
    <main className="mx-auto max-w-[1000px] px-4 py-8 sm:px-6">
      <Breadcrumbs items={[{ label: '资源中心' }]} />

      <div className="mt-6 rounded-2xl border border-sap-200 bg-gradient-to-br from-sap-50 to-white p-6 dark:border-sap-900 dark:from-sap-950/40 dark:to-slate-900/40 sm:p-8">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-sap-600 dark:text-sap-300"><Wrench className="h-4 w-4" /> Resource Center</div>
        <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-50">资源中心</h1>
        <p className="mt-3 text-[14px] leading-7 text-slate-600 dark:text-slate-400">日常查阅用的命令、配置、排错与官方资源索引。所有代码块支持一键复制，示例中的账号与密钥均为占位符。</p>
        <div className="mt-5 flex flex-wrap gap-2">
          {anchors.map((a) => <a key={a.href} href={a.href} className="rounded-lg border border-sap-200 bg-white px-3 py-1.5 text-xs font-medium text-sap-700 hover:bg-sap-100 dark:border-sap-800 dark:bg-slate-900 dark:text-sap-300">{a.label}</a>)}
        </div>
      </div>

      {/* 命令速查 */}
      <section id="commands" className="mt-10 scroll-mt-20">
        <SectionHeading icon={<Terminal className="h-4 w-4" />} title="SAP 常用命令速查" description="按使用场景分组的 cf CLI、MTA 与 CAP 命令。执行前务必用 cf target 确认目标 Org / Space。" />
        <div className="mt-5 space-y-5">
          {commandCheatsheets.map((group) => (
            <div key={group.id} id={group.id} className="scroll-mt-20 overflow-hidden rounded-xl border border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-800/40">
              <div className="border-b border-slate-200 bg-slate-50 px-4 py-2.5 dark:border-slate-700 dark:bg-slate-800/70">
                <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100">{group.title}</h3>
                <p className="mt-0.5 text-[11px] text-slate-500 dark:text-slate-400">{group.description}</p>
              </div>
              <ul className="divide-y divide-slate-100 dark:divide-slate-700/60">
                {group.entries.map((entry) => (
                  <li key={entry.command} className="flex flex-wrap items-center gap-x-3 gap-y-1 px-4 py-2">
                    <code className="min-w-0 flex-1 font-mono text-[12.5px] text-sap-700 dark:text-sap-300">{entry.command}</code>
                    <span className="w-full text-[11.5px] text-slate-500 sm:w-auto sm:flex-1 dark:text-slate-400">{entry.description}</span>
                    <CopyButton code={entry.command} label="复制命令" />
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* 配置速查 */}
      <section id="configs" className="mt-12 scroll-mt-20">
        <SectionHeading icon={<FileCode2 className="h-4 w-4" />} title="配置文件速查" description="完整可运行的最小配置示例。服务与计划名称请以 cf marketplace 的实际输出为准。" />
        <div className="mt-5 space-y-6">
          {configReferences.map((ref, i) => (
            <div key={ref.id} className="rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-800/40">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h3 className="font-mono text-sm font-bold text-sap-700 dark:text-sap-300">{ref.filename}</h3>
                <Link href={`/docs/${ref.tutorialId}`} className="text-xs text-sap-600 hover:underline dark:text-sap-300">查看完整教程 →</Link>
              </div>
              <p className="mt-1.5 text-[12.5px] leading-6 text-slate-600 dark:text-slate-400">{ref.title} —— {ref.description}</p>
              {configBlocks[i]}
            </div>
          ))}
        </div>
      </section>

      {/* 排错知识库 */}
      <section id="errors" className="mt-12 scroll-mt-20">
        <SectionHeading icon={<AlertTriangle className="h-4 w-4" />} title="错误代码与排错知识库" description="按现象 → 可能原因 → 排查顺序组织，覆盖认证、授权、路由、连接、配额与部署六类高频问题。" />
        <div className="mt-5 grid gap-3 md:grid-cols-2">
          {errorKnowledgeBase.map((e) => (
            <div key={e.id} id={e.id} className="scroll-mt-20 rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-800/40">
              <div className="flex items-start justify-between gap-2">
                <h3 className="text-[13.5px] font-bold text-slate-900 dark:text-slate-50">{e.symptom}</h3>
                <span className="shrink-0 rounded bg-slate-100 px-2 py-0.5 text-[10px] text-slate-500 dark:bg-slate-800 dark:text-slate-400">{e.category}</span>
              </div>
              <p className="mt-3 text-[11px] font-semibold text-slate-700 dark:text-slate-200">可能原因</p>
              <ul className="mt-1 space-y-0.5">
                {e.causes.map((c) => <li key={c} className="text-[11.5px] leading-5 text-slate-500 dark:text-slate-400">• {c}</li>)}
              </ul>
              <p className="mt-2 text-[11px] font-semibold text-slate-700 dark:text-slate-200">排查顺序</p>
              <ol className="mt-1 space-y-0.5">
                {e.checks.map((c, i) => <li key={c} className="text-[11.5px] leading-5 text-slate-500 dark:text-slate-400">{i + 1}. {c}</li>)}
              </ol>
              <Link href={`/docs/${e.relatedId}`} className="mt-3 inline-block text-xs font-medium text-sap-600 hover:underline dark:text-sap-300">相关教程 →</Link>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="mt-12 scroll-mt-20">
        <SectionHeading icon={<BookOpen className="h-4 w-4" />} title="常见问题 FAQ" description="关于学习顺序、账号差异、认证服务与内容真实性的高频疑问。" />
        <div className="mt-5 grid gap-3 md:grid-cols-2">
          {faqEntries.map((faq) => (
            <div key={faq.question} className="rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-800/40">
              <h3 className="text-[13.5px] font-semibold text-slate-900 dark:text-slate-50">{faq.question}</h3>
              <p className="mt-2 text-[12.5px] leading-6 text-slate-600 dark:text-slate-400">{faq.answer}</p>
              <Link href={faq.href} className="mt-2 inline-block text-xs text-sap-600 hover:underline dark:text-sap-300">查看详情 →</Link>
            </div>
          ))}
        </div>
      </section>

      {/* 官方资源 */}
      <section id="official" className="mt-12 scroll-mt-20">
        <SectionHeading icon={<ExternalLink className="h-4 w-4" />} title="官方学习资源" description="本站重要技术结论的核对来源。为避免编造不存在的文档深链，统一提供官方入口并注明检索关键词。" />
        <div className="mt-5 grid gap-3 md:grid-cols-2">
          {officialSources.map((s) => (
            <a key={s.id} href={s.url} target="_blank" rel="noopener noreferrer" className="group rounded-xl border border-slate-200 bg-white p-4 hover:border-sap-300 dark:border-slate-700 dark:bg-slate-800/40">
              <div className="flex items-start justify-between gap-2">
                <h3 className="text-[13.5px] font-semibold text-slate-900 group-hover:text-sap-700 dark:text-slate-50">{s.title}</h3>
                <ExternalLink className="h-3.5 w-3.5 shrink-0 text-slate-400 group-hover:text-sap-500" />
              </div>
              <p className="mt-2 text-[12px] leading-6 text-slate-600 dark:text-slate-400">{s.description}</p>
              {s.hint && <p className="mt-2 rounded-lg bg-slate-50 px-2.5 py-1.5 text-[11px] leading-5 text-slate-500 dark:bg-slate-800 dark:text-slate-400">{s.hint}</p>}
              <p className="mt-2 truncate font-mono text-[10.5px] text-sap-600 dark:text-sap-300">{s.url}</p>
            </a>
          ))}
        </div>
      </section>

      {/* 图片与示意图 */}
      <section id="cockpit-reference" className="mt-12 scroll-mt-20">
        <SectionHeading icon={<ImageIcon className="h-4 w-4" />} title="图片与示意图说明" description="本站严格遵守「示意图不伪装成真实截图」的原则；所有图片可点击放大，并附中文说明。" />
        <div className="mt-5 rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-800/40">
          <h3 className="text-sm font-bold text-slate-900 dark:text-slate-50">Subaccount Overview 页面结构示意图（本站自绘）</h3>
          <p className="mt-2 text-[12.5px] leading-6 text-slate-600 dark:text-slate-400">
            下图为本站自绘的结构示意图，用于说明 Cockpit 常见菜单分组与 Subaccount Overview 的标签页结构：左侧为 Overview、Services、
            Cloud Foundry、HTML5 Applications、Connectivity、Security、Entitlements、Usage Analytics 等分组，右侧为 General /
            Cloud Foundry Environment / Labels / Entitlements 标签页。图中所有名称、ID、域名与数量均为占位符，不含任何真实租户数据、
            企业名称或个人信息，也不是 SAP Cockpit 截图或官方转载内容。
          </p>
          <ZoomableImage src="/images/btp-cockpit-subaccount-overview.svg" alt="本站自绘的 Subaccount Overview 页面结构示意图，所有名称与 ID 均为占位符" caption="Subaccount Overview 页面结构示意图（本站自绘、非真实截图；数值与名称均为占位符）" />
        </div>

        <div id="diagrams" className="mt-5 scroll-mt-20 rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-800/40">
          <h3 className="text-sm font-bold text-slate-900 dark:text-slate-50">自绘企业级架构示意图（Mermaid）</h3>
          <p className="mt-2 text-[12.5px] leading-6 text-slate-600 dark:text-slate-400">下图为本站自绘的 BTP 应用典型架构，用于说明组件关系，不是 SAP Cockpit 截图，也不代表某一特定产品版本的强制实现方式。</p>
          <Mermaid chart={architectureDiagram} caption="SAP BTP 企业级应用架构示意图（本站自绘，非 SAP Cockpit 截图）" />
        </div>
      </section>
    </main>
  );
}

function SectionHeading({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="border-b border-slate-200 pb-3 dark:border-slate-700">
      <h2 className="flex items-center gap-2 text-xl font-bold text-slate-900 dark:text-slate-50"><span className="text-sap-500">{icon}</span>{title}</h2>
      <p className="mt-1.5 text-[13px] leading-6 text-slate-600 dark:text-slate-400">{description}</p>
    </div>
  );
}
