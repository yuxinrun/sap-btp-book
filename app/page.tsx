import Link from 'next/link';
import {
  AppWindow, ArrowRight, Blocks, BookOpen, Boxes, Cable, ChartNoAxesCombined,
  CheckCircle2, Cloud, Compass, Database, ExternalLink, FolderGit2, Gauge,
  Layers, LayoutDashboard, PlayCircle, Rocket, Server, ShieldCheck, Sparkles,
  Terminal, UsersRound, Building2, Code2, KeyRound, MapPin, BookMarked,
  type LucideIcon,
} from 'lucide-react';
import { HeroSearchBox } from '@/components/home/HeroSearchBox';
import { FaqAccordion } from '@/components/home/FaqAccordion';
import { ZoomableImage } from '@/components/common/ZoomableImage';
import { navigation, navIndex, totalTutorials } from '@/data/navigation';
import { learningStages } from '@/data/learning-path';
import { projects } from '@/data/projects';
import { videoResources } from '@/data/videos';
import { officialSources } from '@/data/official';
import { getAllTutorials } from '@/lib/content';

const iconMap: Record<string, LucideIcon> = {
  BookOpen, LayoutDashboard, Blocks, Cloud, Layers, AppWindow, Cable,
  ShieldCheck, UsersRound, Gauge, ChartNoAxesCombined, Boxes, FolderGit2,
};
const stageIcons: Record<string, LucideIcon> = { Compass, Server, ShieldCheck, Code2, Rocket, Building2 };

const featuredIds = [
  'btp-what-is', 'btp-account-model', 'cockpit-subaccount-create', 'services-marketplace',
  'cf-cli-install', 'cf-push', 'destinations-overview', 'xsuaa-what-is',
  'xsuaa-xs-security-json', 'xsuaa-role-collections', 'project-nodejs-cf', 'project-xsuaa-login',
];

const hotKeywords = [
  { label: 'XSUAA', href: '/docs/xsuaa-what-is' },
  { label: 'Cloud Foundry', href: '/docs/cf-concepts' },
  { label: 'CAP', href: '/docs/project-cap-hana' },
  { label: 'Destination', href: '/docs/destinations-overview' },
  { label: 'Role Collections', href: '/docs/xsuaa-role-collections' },
  { label: 'App Router', href: '/docs/html5-app-router' },
  { label: 'HANA Cloud', href: '/docs/service-hana-cloud' },
  { label: 'Cloud Connector', href: '/docs/cc-overview' },
];

const cockpitMenu = [
  { label: 'Overview', href: '/docs/cockpit-overview-tabs' },
  { label: 'Services · Service Marketplace', href: '/docs/services-marketplace' },
  { label: 'Cloud Foundry · Spaces', href: '/docs/cf-space' },
  { label: 'HTML5 Applications', href: '/docs/html5-concepts' },
  { label: 'Connectivity · Destinations', href: '/docs/destinations-overview' },
  { label: 'Security · Role Collections', href: '/docs/xsuaa-role-collections' },
  { label: 'Entitlements', href: '/docs/ent-concept' },
  { label: 'Usage Analytics', href: '/docs/ua-concept' },
];

export default function HomePage() {
  const tutorials = getAllTutorials();
  const featured = featuredIds.map((id) => navIndex.byId.get(id)).filter((x): x is NonNullable<typeof x> => Boolean(x));

  return (
    <main>
      {/* ---------------- Hero ---------------- */}
      <section className="relative overflow-hidden border-b border-sap-900/20 bg-gradient-to-br from-sap-800 via-sap-700 to-sap-950 text-white">
        <div className="pointer-events-none absolute inset-0 opacity-20" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,.12) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.12) 1px, transparent 1px)', backgroundSize: '38px 38px' }} />
        <div className="relative mx-auto grid max-w-[1680px] gap-10 px-5 py-14 lg:grid-cols-[1.15fr_0.85fr] lg:py-20">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-3 py-1 text-[11px] font-medium tracking-wide">
              <Sparkles className="h-3.5 w-3.5" /> SAP BTP 中文学习中心 · 系统化教程
            </span>
            <h1 className="text-balance mt-5 text-[34px] font-bold leading-[1.25] tracking-tight sm:text-[44px] lg:text-[50px]">
              全面掌握 SAP BTP，<br />从入门到企业级实战
            </h1>
            <p className="mt-5 max-w-2xl text-[15px] leading-8 text-white/85 sm:text-[16px]">
              系统学习 SAP Business Technology Platform，掌握云平台管理、应用开发、安全认证、服务集成和企业级部署。
              从 Global Account 到 XSUAA 权限闭环，从 cf push 到 CAP + HANA Cloud，每一步都有可运行的代码与验证清单。
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link href="/learn" className="inline-flex items-center gap-2 rounded-lg bg-white px-5 py-2.5 text-sm font-semibold text-sap-700 shadow-sm transition-transform hover:-translate-y-0.5">
                开始学习 <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/projects" className="inline-flex items-center gap-2 rounded-lg border border-white/40 bg-white/10 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-white/20">
                查看实战项目 <FolderGit2 className="h-4 w-4" />
              </Link>
            </div>
            <HeroSearchBox />
            <div className="mt-8 flex flex-wrap gap-x-8 gap-y-3 text-sm">
              {[
                [`${totalTutorials}`, '教程条目'],
                [`${tutorials.length}`, '完整长文'],
                [`${projects.length}`, '实战项目'],
                ['6', '学习阶段'],
                ['12', '知识模块'],
              ].map(([num, label]) => (
                <div key={label}>
                  <span className="text-xl font-bold">{num}</span>
                  <span className="ml-1.5 text-xs text-white/70">{label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Cockpit 菜单结构示意（自绘，明确非截图） */}
          <div className="hidden lg:block">
            <div className="overflow-hidden rounded-2xl border border-white/20 bg-white shadow-2xl dark:bg-slate-900">
              <div className="flex items-center justify-between border-b border-slate-200 bg-slate-50 px-4 py-2.5 dark:border-slate-700 dark:bg-slate-800">
                <div className="flex items-center gap-2">
                  <span className="flex h-6 w-6 items-center justify-center rounded bg-sap-500 text-[9px] font-black text-white">SAP</span>
                  <span className="text-[12px] font-semibold text-slate-700 dark:text-slate-200">BTP Cockpit 功能导航</span>
                </div>
                <span className="text-[10px] text-slate-400">结构示意图</span>
              </div>
              <div className="grid grid-cols-[176px_1fr] text-[11.5px]">
                <div className="border-r border-slate-200 bg-slate-50/70 py-3 dark:border-slate-700 dark:bg-slate-800/40">
                  {['Overview', 'Services', 'Cloud Foundry', 'HTML5 Applications', 'Connectivity', 'Security', 'Entitlements', 'Usage Analytics'].map((m, i) => (
                    <div key={m} className={`px-3 py-[7px] ${i === 5 ? 'border-l-[3px] border-sap-500 bg-sap-50 font-semibold text-sap-700 dark:bg-sap-950/50 dark:text-sap-300' : 'text-slate-600 dark:text-slate-400'}`}>
                      {m}
                    </div>
                  ))}
                </div>
                <div className="p-4">
                  <div className="text-[13px] font-bold text-slate-800 dark:text-slate-100">Subaccount: &lt;YOUR_SUBACCOUNT&gt; - Overview</div>
                  <div className="mt-2 flex gap-3 border-b border-slate-200 pb-1.5 text-[11px] text-sap-600 dark:border-slate-700 dark:text-sap-300">
                    <span className="border-b-2 border-sap-500 pb-1 font-semibold">General</span>
                    <span>Cloud Foundry Environment</span><span>Entitlements</span>
                  </div>
                  <div className="mt-3 grid grid-cols-2 gap-2">
                    <div className="rounded-lg border border-slate-200 p-2 dark:border-slate-700"><div className="text-[10px] text-slate-400">Entitlements</div><div className="text-lg font-bold text-sap-600">40</div></div>
                    <div className="rounded-lg border border-slate-200 p-2 dark:border-slate-700"><div className="text-[10px] text-slate-400">Instances &amp; Subscriptions</div><div className="text-lg font-bold text-sap-600">53</div></div>
                  </div>
                  <div className="mt-3 space-y-1.5 text-[11px] text-slate-600 dark:text-slate-400">
                    <div>Region: <span className="font-medium text-slate-800 dark:text-slate-200">&lt;REGION&gt;</span></div>
                    <div>Provider: <span className="font-medium text-slate-800 dark:text-slate-200">&lt;PROVIDER&gt;</span></div>
                    <div>API Endpoint: <span className="font-medium text-sap-600">&lt;API_ENDPOINT&gt;</span></div>
                  </div>
                  <p className="mt-3 rounded-md bg-amber-50 px-2 py-1.5 text-[10px] leading-4 text-amber-800 dark:bg-amber-950/40 dark:text-amber-200">本站自绘结构示意图，非 SAP Cockpit 真实截图；占位符需替换为实际值。</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- 核心关键词 ---------------- */}
      <section className="border-b border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900/60">
        <div className="mx-auto flex max-w-[1680px] flex-wrap items-center gap-2 px-5 py-3.5">
          <span className="mr-1 text-xs font-semibold text-slate-500 dark:text-slate-400">核心主题速达</span>
          {hotKeywords.map((k) => (
            <Link key={k.label} href={k.href} className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-medium text-slate-700 transition-colors hover:border-sap-300 hover:bg-sap-50 hover:text-sap-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:border-sap-700 dark:hover:text-sap-300">
              {k.label}
            </Link>
          ))}
        </div>
      </section>

      <div className="mx-auto max-w-[1680px] space-y-16 px-5 py-14">
        {/* ---------------- 1. 核心知识地图 ---------------- */}
        <section>
          <SectionTitle eyebrow="Knowledge Map" title="SAP BTP 核心知识地图" description="按照 SAP BTP Cockpit Subaccount 的功能分组组织，从平台基础到企业级扩展，共 12 个知识模块。" href="/tutorials" hrefLabel="查看完整教程目录" />
          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {navigation.map((group) => {
              const Icon = iconMap[group.icon] ?? BookOpen;
              return (
                <Link key={group.id} href={`/tutorials#${group.id}`} className="group rounded-xl border border-slate-200 bg-white p-4 transition-all hover:-translate-y-0.5 hover:border-sap-300 hover:shadow-panel dark:border-slate-700 dark:bg-slate-800/40 dark:hover:border-sap-700">
                  <div className="flex items-start justify-between">
                    <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-sap-50 text-sap-600 group-hover:bg-sap-500 group-hover:text-white dark:bg-sap-950/60 dark:text-sap-300"><Icon className="h-[18px] w-[18px]" /></span>
                    <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-medium text-slate-500 dark:bg-slate-800 dark:text-slate-400">{group.leafCount} 条</span>
                  </div>
                  <h3 className="mt-3 text-[14px] font-semibold text-slate-800 group-hover:text-sap-700 dark:text-slate-100 dark:group-hover:text-sap-300">{group.title}</h3>
                  <p className="mt-1.5 line-clamp-2 text-xs leading-5 text-slate-500 dark:text-slate-400">{group.description}</p>
                </Link>
              );
            })}
          </div>
        </section>

        {/* ---------------- 2. 六阶段学习路线 ---------------- */}
        <section>
          <SectionTitle eyebrow="Learning Path" title="六阶段学习路线" description="从平台认知到企业架构设计，逐步完成从「看得懂」到「能落地」的能力跃迁。" href="/learn" hrefLabel="查看阶段详情与进度" />
          <div className="mt-6 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
            {learningStages.map((stage) => {
              const Icon = stageIcons[stage.icon] ?? Compass;
              return (
                <Link key={stage.id} href={`/learn#stage-${stage.id}`} className="group relative overflow-hidden rounded-xl border border-slate-200 bg-white p-5 transition-all hover:border-sap-300 hover:shadow-panel dark:border-slate-700 dark:bg-slate-800/40">
                  <span className="absolute right-4 top-3 text-4xl font-black text-slate-100 group-hover:text-sap-50 dark:text-slate-700/60 dark:group-hover:text-sap-950">0{stage.id}</span>
                  <div className="flex items-center gap-2">
                    <Icon className="h-4 w-4 text-sap-500" />
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-sap-600 dark:text-sap-300">{stage.subtitle}</span>
                  </div>
                  <h3 className="mt-2 text-[15px] font-bold text-slate-800 dark:text-slate-100">{stage.title}</h3>
                  <p className="mt-2 line-clamp-2 text-xs leading-6 text-slate-500 dark:text-slate-400">{stage.goal}</p>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {stage.topics.slice(0, 4).map((t) => <span key={t} className="rounded bg-slate-100 px-2 py-0.5 text-[10px] text-slate-600 dark:bg-slate-800 dark:text-slate-400">{t}</span>)}
                  </div>
                  <span className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-sap-600 dark:text-sap-300">进入阶段 <ArrowRight className="h-3 w-3" /></span>
                </Link>
              );
            })}
          </div>
        </section>

        {/* ---------------- 3. Cockpit 功能导航 ---------------- */}
        <section className="rounded-2xl border border-slate-200 bg-slate-50/70 p-5 sm:p-7 dark:border-slate-700 dark:bg-slate-800/30">
          <SectionTitle eyebrow="Cockpit Navigation" title="Cockpit 功能导航" description="把 Subaccount 左侧菜单与本站教程模块一一对应，遇到 Cockpit 中的功能项，能立刻找到中文解释与操作步骤。" />
          <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_1.1fr]">
            <div className="rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-900/60">
              <p className="mb-3 text-xs font-semibold text-slate-500 dark:text-slate-400">Subaccount 左侧菜单 → 教程入口（结构示意）</p>
              <ul className="space-y-1">
                {cockpitMenu.map((m) => (
                  <li key={m.label}>
                    <Link href={m.href} className="flex items-center justify-between rounded-lg border border-transparent px-3 py-2 text-[13px] text-slate-700 transition-colors hover:border-sap-200 hover:bg-sap-50 hover:text-sap-700 dark:text-slate-300 dark:hover:border-sap-800 dark:hover:bg-sap-950/40 dark:hover:text-sap-300">
                      <span>{m.label}</span><ArrowRight className="h-3.5 w-3.5 text-slate-300" />
                    </Link>
                  </li>
                ))}
              </ul>
              <p className="mt-3 border-t border-slate-100 pt-3 text-[11px] leading-5 text-slate-500 dark:border-slate-800 dark:text-slate-400">说明：不同账号类型、区域与产品版本的菜单项可能不同；本站按 Cockpit 常见分组归类，不照搬官方 UI。</p>
            </div>
            <div>
              <ZoomableImage src="/images/btp-cockpit-subaccount-overview.svg" alt="本站自绘的 Subaccount Overview 页面结构示意图，所有名称与 ID 均为占位符" caption="Subaccount Overview 页面结构示意图（本站自绘、非真实截图；图中名称、ID、域名与数量均为占位符）" />
              <div className="mt-3 grid gap-2 sm:grid-cols-2">
                <Link href="/docs/cockpit-overview-tabs" className="flex items-start gap-2 rounded-lg border border-slate-200 bg-white p-3 text-xs leading-5 dark:border-slate-700 dark:bg-slate-900/60">
                  <LayoutDashboard className="mt-0.5 h-4 w-4 shrink-0 text-sap-500" /><span><strong>Overview 标签页</strong><br /><span className="text-slate-500 dark:text-slate-400">General / Cloud Foundry Environment / Labels / Entitlements</span></span>
                </Link>
                <Link href="/docs/cockpit-subaccount-create" className="flex items-start gap-2 rounded-lg border border-slate-200 bg-white p-3 text-xs leading-5 dark:border-slate-700 dark:bg-slate-900/60">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-sap-500" /><span><strong>Region 与 Provider</strong><br /><span className="text-slate-500 dark:text-slate-400">创建时选定，决定服务可用性与数据驻留</span></span>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ---------------- 4. 热门教程 ---------------- */}
        <section>
          <SectionTitle eyebrow="Popular Tutorials" title="热门教程" description="初学者最常访问的入口：账号模型、服务实例、CF CLI、Destination 与 XSUAA。" href="/tutorials" hrefLabel="浏览全部教程" />
          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((item, i) => {
              const hasLong = tutorials.some((t) => t.id === item.id);
              return (
                <Link key={item.id} href={item.href} className="group flex items-start gap-3 rounded-xl border border-slate-200 bg-white p-4 transition-colors hover:border-sap-300 hover:bg-sap-50/40 dark:border-slate-700 dark:bg-slate-800/40 dark:hover:border-sap-700">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-xs font-bold text-slate-500 group-hover:bg-sap-500 group-hover:text-white dark:bg-slate-800 dark:text-slate-400">{String(i + 1).padStart(2, '0')}</span>
                  <span className="min-w-0">
                    <span className="flex items-center gap-2">
                      <span className="truncate text-[13.5px] font-semibold text-slate-800 group-hover:text-sap-700 dark:text-slate-100 dark:group-hover:text-sap-300">{item.title}</span>
                      {hasLong && <span className="shrink-0 rounded bg-emerald-50 px-1.5 py-0.5 text-[9px] font-medium text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300">长文</span>}
                    </span>
                    <span className="mt-1 line-clamp-2 block text-xs leading-5 text-slate-500 dark:text-slate-400">{item.brief}</span>
                    <span className="mt-1.5 block text-[10px] text-slate-400">{item.groupTitle} / {item.sectionTitle}</span>
                  </span>
                </Link>
              );
            })}
          </div>
        </section>

        {/* ---------------- 5. XSUAA 专题 ---------------- */}
        <section className="overflow-hidden rounded-2xl border border-sap-200 bg-gradient-to-br from-sap-50 to-white dark:border-sap-900 dark:from-sap-950/50 dark:to-slate-900/50">
          <div className="grid gap-6 p-6 lg:grid-cols-[1.2fr_0.8fr] sm:p-8">
            <div>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-sap-500 px-2.5 py-1 text-[11px] font-semibold text-white"><ShieldCheck className="h-3.5 w-3.5" /> 全站重点专题</span>
              <h2 className="mt-4 text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-50">XSUAA 从零到权限闭环</h2>
              <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">
                从「什么是 XSUAA」到 xs-security.json、Scope、Role Template、Role Collection、用户映射，再到 App Router / CAP / Node.js / Java 的完整实现，
                最后用未登录、已登录、无权限、有权限四种场景验证。这是企业应用上线前必须打通的一条链路。
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                {['xsuaa-what-is', 'xsuaa-xs-security-json', 'xsuaa-scopes', 'xsuaa-role-collections', 'xsuaa-q16-four-cases', 'project-xsuaa-login'].map((id) => {
                  const item = navIndex.byId.get(id);
                  return item ? <Link key={id} href={item.href} className="rounded-lg border border-sap-200 bg-white px-3 py-1.5 text-xs font-medium text-sap-700 hover:bg-sap-100 dark:border-sap-800 dark:bg-slate-900 dark:text-sap-300">{item.title} →</Link> : null;
                })}
              </div>
              <Link href="/docs/project-xsuaa-login" className="mt-6 inline-flex items-center gap-2 rounded-lg bg-sap-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-sap-700">
                进入项目三：带登录功能的应用 <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="rounded-xl border border-sap-200 bg-white p-4 dark:border-sap-900 dark:bg-slate-900">
              <p className="mb-3 text-xs font-semibold text-slate-500 dark:text-slate-400">授权链路示意（本站自绘）</p>
              <div className="space-y-2">
                {[
                  ['1', 'xs-security.json', '定义 Scope 与 Role Template'],
                  ['2', 'XSUAA 实例', '生成 OAuth Client 与 Role'],
                  ['3', 'Role Collection', '把 Role 打包分配给用户'],
                  ['4', 'App Router', '登录跳转并传递 JWT'],
                  ['5', '后端 /admin', '校验 Scope，返回 200 或 403'],
                ].map(([n, title, desc]) => (
                  <div key={n} className="flex items-start gap-3 rounded-lg bg-slate-50 px-3 py-2 dark:bg-slate-800/60">
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-sap-500 text-[10px] font-bold text-white">{n}</span>
                    <span><span className="block text-xs font-semibold text-slate-800 dark:text-slate-100">{title}</span><span className="block text-[11px] text-slate-500 dark:text-slate-400">{desc}</span></span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ---------------- 6 & 7. CF / CAP 专题 ---------------- */}
        <section className="grid gap-4 lg:grid-cols-2">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-700 dark:bg-slate-800/40">
            <div className="flex items-center gap-2"><Cloud className="h-5 w-5 text-sap-500" /><h2 className="text-lg font-bold text-slate-900 dark:text-slate-50">Cloud Foundry 专题</h2></div>
            <p className="mt-2 text-[13px] leading-6 text-slate-600 dark:text-slate-400">从 Org / Space 模型到 cf CLI 全命令手册，含真实命令输出示例、manifest.yml、MTA / MTAR 部署与失败排查。</p>
            <div className="mt-4 overflow-hidden rounded-lg bg-slate-900 p-3 font-mono text-[11.5px] leading-6 text-slate-200">
              <div><span className="text-slate-500">$</span> cf api &lt;API_ENDPOINT&gt;</div>
              <div><span className="text-slate-500">$</span> cf login --sso</div>
              <div><span className="text-slate-500">$</span> cf target -o &lt;ORG&gt; -s &lt;SPACE&gt;</div>
              <div><span className="text-slate-500">$</span> cf push</div>
              <div className="text-emerald-400">name: btp-learning-api   state: started   instances: 1/1</div>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              <Link href="/docs/cf-cli-install" className="inline-flex items-center gap-1 rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-medium hover:border-sap-300 hover:text-sap-600 dark:border-slate-700"><Terminal className="h-3.5 w-3.5" /> CLI 安装与登录</Link>
              <Link href="/docs/project-nodejs-cf" className="inline-flex items-center gap-1 rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-medium hover:border-sap-300 hover:text-sap-600 dark:border-slate-700"><Rocket className="h-3.5 w-3.5" /> Node.js 部署实战</Link>
              <Link href="/resources#commands" className="inline-flex items-center gap-1 rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-medium hover:border-sap-300 hover:text-sap-600 dark:border-slate-700"><KeyRound className="h-3.5 w-3.5" /> 命令速查</Link>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-700 dark:bg-slate-800/40">
            <div className="flex items-center gap-2"><Database className="h-5 w-5 text-sap-500" /><h2 className="text-lg font-bold text-slate-900 dark:text-slate-50">CAP + HANA Cloud 专题</h2></div>
            <p className="mt-2 text-[13px] leading-6 text-slate-600 dark:text-slate-400">CDS 建模、Service 实现、HDI Container、XSUAA 权限、MTA 部署与 Postman 测试的完整项目链路。</p>
            <div className="mt-4 overflow-hidden rounded-lg bg-slate-900 p-3 font-mono text-[11.5px] leading-6 text-slate-200">
              <div><span className="text-slate-500">//</span> db/schema.cds</div>
              <div><span className="text-sky-300">namespace</span> sap.btp.learning;</div>
              <div><span className="text-sky-300">entity</span> Books {'{'} key ID : UUID; title : String; {'}'}</div>
              <div><span className="text-slate-500">$</span> cds add hana, xsuaa, mta</div>
              <div><span className="text-slate-500">$</span> mbt build -p=cf &amp;&amp; cf deploy mta_archives/*.mtar</div>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              <Link href="/docs/project-cap-hana" className="inline-flex items-center gap-1 rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-medium hover:border-sap-300 hover:text-sap-600 dark:border-slate-700"><Code2 className="h-3.5 w-3.5" /> CAP 完整项目</Link>
              <Link href="/docs/project-s4hana-connect" className="inline-flex items-center gap-1 rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-medium hover:border-sap-300 hover:text-sap-600 dark:border-slate-700"><Cable className="h-3.5 w-3.5" /> S/4HANA 集成</Link>
              <Link href="/docs/project-fiori-deploy" className="inline-flex items-center gap-1 rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-medium hover:border-sap-300 hover:text-sap-600 dark:border-slate-700"><AppWindow className="h-3.5 w-3.5" /> SAPUI5 部署</Link>
            </div>
          </div>
        </section>

        {/* ---------------- 8. 视频中心 ---------------- */}
        <section>
          <SectionTitle eyebrow="Video Center" title="SAP BTP 视频中心" description="只收录可核实的 SAP 官方站点与频道入口；本站不虚构视频 ID，播放失败时可直接打开官方原始页面。" href="/videos" hrefLabel="进入视频中心" />
          <div className="mt-6 grid gap-3 md:grid-cols-3">
            {videoResources.slice(0, 3).map((v) => (
              <a key={v.id} href={v.sourceUrl} target="_blank" rel="noopener noreferrer" className="group rounded-xl border border-slate-200 bg-white p-4 transition-colors hover:border-sap-300 dark:border-slate-700 dark:bg-slate-800/40">
                <div className="flex h-24 items-center justify-center rounded-lg bg-gradient-to-br from-sap-100 to-slate-100 dark:from-sap-950 dark:to-slate-800">
                  <PlayCircle className="h-9 w-9 text-sap-500 transition-transform group-hover:scale-110" />
                </div>
                <h3 className="mt-3 text-sm font-semibold text-slate-800 group-hover:text-sap-700 dark:text-slate-100">{v.title}</h3>
                <p className="mt-1.5 line-clamp-2 text-xs leading-5 text-slate-500 dark:text-slate-400">{v.description}</p>
                <span className="mt-2 inline-flex items-center gap-1 text-xs font-medium text-sap-600 dark:text-sap-300">{v.provider} <ExternalLink className="h-3 w-3" /></span>
              </a>
            ))}
          </div>
        </section>

        {/* ---------------- 9. 最新教程 ---------------- */}
        <section>
          <SectionTitle eyebrow="Latest" title="最新完整教程" description="按统一 24 节模板撰写的分步长文，含完整配置文件、命令、预期结果、验证方法与排错清单。" href="/tutorials" hrefLabel="全部教程" />
          <div className="mt-6 grid gap-3 md:grid-cols-2">
            {tutorials.slice(0, 8).map((t) => (
              <Link key={t.id} href={`/docs/${t.id}`} className="group flex items-start gap-3 rounded-xl border border-slate-200 bg-white p-4 hover:border-sap-300 dark:border-slate-700 dark:bg-slate-800/40">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-sap-50 text-sap-600 dark:bg-sap-950/60 dark:text-sap-300"><BookOpen className="h-4 w-4" /></span>
                <span className="min-w-0">
                  <span className="block text-sm font-semibold text-slate-800 group-hover:text-sap-700 dark:text-slate-100">{t.frontmatter.title}</span>
                  <span className="mt-1 line-clamp-1 block text-xs text-slate-500 dark:text-slate-400">{t.frontmatter.description}</span>
                  <span className="mt-2 flex flex-wrap gap-2 text-[10px] text-slate-400">
                    <span className="rounded bg-slate-100 px-1.5 py-0.5 dark:bg-slate-800">{t.frontmatter.difficulty}</span>
                    <span className="rounded bg-slate-100 px-1.5 py-0.5 dark:bg-slate-800">{t.frontmatter.duration}</span>
                    <span>{t.frontmatter.updated}</span>
                  </span>
                </span>
              </Link>
            ))}
          </div>
        </section>

        {/* ---------------- 10. FAQ ---------------- */}
        <section className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <SectionTitle eyebrow="FAQ" title="常见问题" description="关于学习顺序、账号差异、认证服务与内容真实性的高频疑问。" href="/resources#faq" hrefLabel="更多问题" />
            <div className="mt-5 rounded-xl border border-slate-200 bg-sap-50/60 p-4 dark:border-slate-700 dark:bg-slate-800/40">
              <div className="flex items-center gap-2 text-sm font-semibold text-slate-800 dark:text-slate-100"><BookMarked className="h-4 w-4 text-sap-500" /> 学习记录在本地</div>
              <p className="mt-2 text-xs leading-6 text-slate-600 dark:text-slate-400">学习进度、收藏文章与最近阅读保存在浏览器 LocalStorage，不需要登录；后续可扩展为账号与数据库存储。</p>
              <Link href="/my" className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-sap-600 dark:text-sap-300">查看我的学习 <ArrowRight className="h-3 w-3" /></Link>
            </div>
          </div>
          <FaqAccordion />
        </section>

        {/* ---------------- 11. 官方学习资源 ---------------- */}
        <section>
          <SectionTitle eyebrow="Official Resources" title="官方学习资源" description="所有重要技术结论均应以 SAP 官方文档与实际租户界面核对；以下为可核实的官方入口。" href="/resources#official" hrefLabel="资源中心" />
          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {officialSources.map((s) => (
              <a key={s.id} href={s.url} target="_blank" rel="noopener noreferrer" className="group rounded-xl border border-slate-200 bg-white p-4 transition-colors hover:border-sap-300 dark:border-slate-700 dark:bg-slate-800/40">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="text-[13px] font-semibold text-slate-800 group-hover:text-sap-700 dark:text-slate-100">{s.title}</h3>
                  <ExternalLink className="h-3.5 w-3.5 shrink-0 text-slate-400 group-hover:text-sap-500" />
                </div>
                <p className="mt-2 line-clamp-2 text-[11.5px] leading-5 text-slate-500 dark:text-slate-400">{s.description}</p>
              </a>
            ))}
          </div>
        </section>
      </div>

      {/* ---------------- CTA ---------------- */}
      <section className="border-t border-slate-200 bg-sap-50/60 dark:border-slate-800 dark:bg-sap-950/20">
        <div className="mx-auto flex max-w-[1680px] flex-col items-start justify-between gap-5 px-5 py-10 sm:flex-row sm:items-center">
          <div>
            <h2 className="flex items-center gap-2 text-xl font-bold text-slate-900 dark:text-slate-50"><CheckCircle2 className="h-5 w-5 text-sap-500" /> 准备好动手了吗？</h2>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">从第一个 Subaccount 开始，按六阶段路线逐步完成六个可交付的实战项目。</p>
          </div>
          <div className="flex gap-3">
            <Link href="/docs/project-btp-account" className="rounded-lg bg-sap-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-sap-700">项目一：创建账号</Link>
            <Link href="/learn" className="rounded-lg border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50 dark:border-slate-600 dark:bg-slate-900 dark:text-slate-200">查看学习路线</Link>
          </div>
        </div>
      </section>
    </main>
  );
}

function SectionTitle({ eyebrow, title, description, href, hrefLabel }: { eyebrow: string; title: string; description: string; href?: string; hrefLabel?: string }) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-3">
      <div>
        <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-sap-600 dark:text-sap-400">{eyebrow}</p>
        <h2 className="mt-1.5 text-[22px] font-bold tracking-tight text-slate-900 sm:text-[26px] dark:text-slate-50">{title}</h2>
        <p className="mt-2 max-w-3xl text-[13px] leading-6 text-slate-600 dark:text-slate-400">{description}</p>
      </div>
      {href && <Link href={href} className="inline-flex shrink-0 items-center gap-1 text-[13px] font-medium text-sap-600 hover:underline dark:text-sap-300">{hrefLabel ?? '查看全部'} <ArrowRight className="h-3.5 w-3.5" /></Link>}
    </div>
  );
}
