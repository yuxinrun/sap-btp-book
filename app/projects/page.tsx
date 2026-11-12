import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Clock3, FolderGit2, Signal, Target, Users } from 'lucide-react';
import { Breadcrumbs } from '@/components/navigation/Breadcrumbs';
import { projects } from '@/data/projects';
import { siteUrl } from '@/lib/site';

export const metadata: Metadata = {
  title: '实战项目中心',
  description: '六个 SAP BTP 端到端实战项目：从零创建账号、Node.js 部署、XSUAA 登录认证、CAP + HANA Cloud、SAPUI5 应用部署、S/4HANA 集成。',
  keywords: ['SAP BTP 实战项目', 'XSUAA 登录', 'CAP HANA Cloud', 'SAPUI5 部署', 'Cloud Connector'],
  alternates: { canonical: siteUrl('/projects/') },
};

const difficultyCls: Record<string, string> = {
  入门: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300',
  进阶: 'bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-300',
  高级: 'bg-rose-50 text-rose-700 dark:bg-rose-950/40 dark:text-rose-300',
};

export default function ProjectsPage() {
  return (
    <main className="mx-auto max-w-[1180px] px-4 py-8 sm:px-6">
      <Breadcrumbs items={[{ label: '实战项目' }]} />
      <div className="mt-6 rounded-2xl border border-sap-200 bg-gradient-to-br from-sap-50 to-white p-6 dark:border-sap-900 dark:from-sap-950/40 dark:to-slate-900/40 sm:p-8">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-sap-600 dark:text-sap-300"><FolderGit2 className="h-4 w-4" /> Hands-on Projects</div>
        <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-50">实战项目中心</h1>
        <p className="mt-3 max-w-3xl text-[14px] leading-7 text-slate-600 dark:text-slate-400">
          实战项目是本网站的核心内容。每个项目都给出完整目录结构、可运行的配置文件、逐条命令、预期结果、验证方法与排错清单。
          建议按项目一至六顺序推进；涉及 HANA Cloud、Cloud Connector 的项目需要商业账号或相应 Entitlement，Trial 账号通常不可用。
        </p>
      </div>

      <div className="mt-8 grid gap-4 lg:grid-cols-2">
        {projects.map((p) => (
          <Link key={p.id} href={`/projects/${p.id}`} className="group flex flex-col rounded-2xl border border-slate-200 bg-white p-5 transition-all hover:-translate-y-0.5 hover:border-sap-300 hover:shadow-panel dark:border-slate-700 dark:bg-slate-800/40 dark:hover:border-sap-700">
            <div className="flex items-start justify-between gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-sap-50 text-sm font-bold text-sap-600 dark:bg-sap-950/60 dark:text-sap-300">0{p.order}</span>
              <span className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ${difficultyCls[p.difficulty]}`}>{p.difficulty}</span>
            </div>
            <h2 className="mt-4 text-lg font-bold text-slate-900 group-hover:text-sap-700 dark:text-slate-50 dark:group-hover:text-sap-300">{p.title}</h2>
            <p className="mt-1.5 text-[13px] leading-6 text-slate-600 dark:text-slate-400">{p.subtitle}</p>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {p.stack.map((s) => <span key={s} className="rounded bg-slate-100 px-2 py-0.5 text-[10px] text-slate-600 dark:bg-slate-800 dark:text-slate-400">{s}</span>)}
            </div>
            <p className="mt-3 flex items-start gap-2 text-[12px] leading-6 text-slate-500 dark:text-slate-400"><Target className="mt-1 h-3.5 w-3.5 shrink-0 text-sap-500" />{p.goal}</p>
            <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1 border-t border-slate-100 pt-3 text-[11px] text-slate-500 dark:border-slate-700 dark:text-slate-400">
              <span className="inline-flex items-center gap-1"><Clock3 className="h-3 w-3" /> {p.duration}</span>
              <span className="inline-flex items-center gap-1"><Signal className="h-3 w-3" /> {p.difficulty}</span>
              <span className="inline-flex items-center gap-1"><Users className="h-3 w-3" /> {p.audience.split('、')[0]}</span>
              <span className="ml-auto inline-flex items-center gap-1 font-medium text-sap-600 dark:text-sap-300">查看项目 <ArrowRight className="h-3 w-3" /></span>
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-8 rounded-xl border border-amber-200 bg-amber-50 p-4 text-[13px] leading-7 text-amber-900 dark:border-amber-900 dark:bg-amber-950/30 dark:text-amber-100">
        <strong>环境差异提醒：</strong>项目一、二可在 SAP BTP Trial 中完成；项目三之后涉及 XSUAA、HANA Cloud、HTML5 Application Repository 与 Cloud Connector，
        需要确认目标 Subaccount 已分配相应 Entitlement，且所选 Region 提供该服务。所有示例凭据均为占位符，生产环境请使用密钥管理与凭据轮换。
      </div>
    </main>
  );
}
