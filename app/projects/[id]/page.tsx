import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowRight, BookOpen, CheckCircle2, Clock3, FileCode2, ListChecks, ShieldAlert, Users } from 'lucide-react';
import { Breadcrumbs } from '@/components/navigation/Breadcrumbs';
import { projectById, projects } from '@/data/projects';

interface Props { params: Promise<{ id: string }> }

export function generateStaticParams() {
  return projects.map((p) => ({ id: p.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const project = projectById.get(id);
  if (!project) return { title: '项目不存在' };
  return {
    title: project.title,
    description: `${project.subtitle}。${project.goal}`,
    keywords: [project.title, 'SAP BTP 实战', ...project.stack],
    alternates: { canonical: `/projects/${id}` },
  };
}

export default async function ProjectPage({ params }: Props) {
  const { id } = await params;
  const project = projectById.get(id);
  if (!project) notFound();
  const index = projects.findIndex((p) => p.id === id);
  const nextProject = projects[index + 1];

  return (
    <main className="mx-auto max-w-[1000px] px-4 py-8 sm:px-6">
      <Breadcrumbs items={[{ label: '实战项目', href: '/projects' }, { label: project.title }]} />

      <div className="mt-6 rounded-2xl border border-sap-200 bg-gradient-to-br from-sap-50 to-white p-6 dark:border-sap-900 dark:from-sap-950/40 dark:to-slate-900/40 sm:p-8">
        <div className="flex flex-wrap items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-sap-600 dark:text-sap-300">
          <span className="rounded bg-sap-500 px-2 py-0.5 text-white">项目 0{project.order}</span> Hands-on Project · {project.difficulty}
        </div>
        <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-50">{project.title}</h1>
        <p className="mt-2 text-[15px] text-slate-600 dark:text-slate-400">{project.subtitle}</p>
        <div className="mt-5 flex flex-wrap gap-x-6 gap-y-2 text-xs text-slate-600 dark:text-slate-300">
          <span className="inline-flex items-center gap-1.5"><Clock3 className="h-3.5 w-3.5 text-sap-500" /> 预计 {project.duration}</span>
          <span className="inline-flex items-center gap-1.5"><Users className="h-3.5 w-3.5 text-sap-500" /> {project.audience}</span>
        </div>
        <div className="mt-5 flex flex-wrap gap-1.5">
          {project.stack.map((s) => <span key={s} className="rounded-lg border border-sap-200 bg-white px-2.5 py-1 text-[11px] font-medium text-sap-700 dark:border-sap-800 dark:bg-slate-900 dark:text-sap-300">{s}</span>)}
        </div>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link href={project.href} className="inline-flex items-center gap-2 rounded-lg bg-sap-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-sap-700">
            <BookOpen className="h-4 w-4" /> 阅读完整分步教程 <ArrowRight className="h-4 w-4" />
          </Link>
          <Link href="/learn" className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50 dark:border-slate-600 dark:bg-slate-900 dark:text-slate-200">对照学习路线</Link>
        </div>
      </div>

      <div className="mt-8 grid gap-5 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="space-y-6">
          <section className="rounded-xl border border-slate-200 bg-white p-5 dark:border-slate-700 dark:bg-slate-800/40">
            <h2 className="flex items-center gap-2 text-base font-bold text-slate-900 dark:text-slate-50"><ListChecks className="h-4 w-4 text-sap-500" /> 完整实施步骤</h2>
            <ol className="mt-4 space-y-2.5">
              {project.steps.map((step, i) => (
                <li key={step} className="flex gap-3 text-[13px] leading-6 text-slate-700 dark:text-slate-300">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-sap-50 text-[10px] font-bold text-sap-600 dark:bg-sap-950/60 dark:text-sap-300">{i + 1}</span>
                  {step}
                </li>
              ))}
            </ol>
          </section>

          <section className="rounded-xl border border-slate-200 bg-white p-5 dark:border-slate-700 dark:bg-slate-800/40">
            <h2 className="flex items-center gap-2 text-base font-bold text-slate-900 dark:text-slate-50"><FileCode2 className="h-4 w-4 text-sap-500" /> 项目涉及的文件</h2>
            <ul className="mt-3 grid gap-2 sm:grid-cols-2">
              {project.files.map((f) => <li key={f} className="rounded-lg bg-slate-50 px-3 py-2 font-mono text-[11.5px] text-slate-700 dark:bg-slate-800 dark:text-slate-300">{f}</li>)}
            </ul>
            <p className="mt-3 text-xs leading-6 text-slate-500 dark:text-slate-400">完整文件内容、参数说明与部署命令见<Link href={project.href} className="mx-1 text-sap-600 hover:underline dark:text-sap-300">完整分步教程</Link>。示例中的账号、密码、URL、Region、Client Secret 均使用占位符。</p>
          </section>
        </div>

        <div className="space-y-5">
          <section className="rounded-xl border border-slate-200 bg-white p-5 dark:border-slate-700 dark:bg-slate-800/40">
            <h2 className="text-sm font-bold text-slate-900 dark:text-slate-50">项目目标</h2>
            <p className="mt-2 text-[13px] leading-7 text-slate-600 dark:text-slate-400">{project.goal}</p>
          </section>
          <section className="rounded-xl border border-slate-200 bg-white p-5 dark:border-slate-700 dark:bg-slate-800/40">
            <h2 className="text-sm font-bold text-slate-900 dark:text-slate-50">交付物</h2>
            <ul className="mt-2 space-y-1.5">
              {project.deliverables.map((d) => <li key={d} className="flex gap-2 text-[12.5px] leading-6 text-slate-600 dark:text-slate-400"><CheckCircle2 className="mt-1 h-3.5 w-3.5 shrink-0 text-emerald-500" />{d}</li>)}
            </ul>
          </section>
          <section className="rounded-xl border border-slate-200 bg-white p-5 dark:border-slate-700 dark:bg-slate-800/40">
            <h2 className="text-sm font-bold text-slate-900 dark:text-slate-50">前置条件</h2>
            <ul className="mt-2 space-y-1.5">
              {project.prerequisites.map((p) => <li key={p} className="flex gap-2 text-[12.5px] leading-6 text-slate-600 dark:text-slate-400"><span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-sap-500" />{p}</li>)}
            </ul>
          </section>
          <section className="rounded-xl border border-amber-200 bg-amber-50 p-5 text-[12.5px] leading-6 text-amber-900 dark:border-amber-900 dark:bg-amber-950/30 dark:text-amber-100">
            <h2 className="flex items-center gap-2 font-bold"><ShieldAlert className="h-4 w-4" /> 安全与版本说明</h2>
            <p className="mt-2">本项目默认使用 Cloud Foundry 环境；Kyma / ABAP 环境的部署方式不适用。服务计划名称、菜单路径与参数请以当前租户 Service Marketplace 和 SAP Help Portal 文档核对；不得在代码或仓库中写入真实凭据。</p>
          </section>
          {nextProject && (
            <Link href={`/projects/${nextProject.id}`} className="flex items-center justify-between gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm hover:border-sap-300 dark:border-slate-700 dark:bg-slate-800/40">
              <span><span className="block text-[11px] text-slate-400">下一个项目</span><span className="font-semibold text-slate-800 dark:text-slate-100">{nextProject.title}</span></span>
              <ArrowRight className="h-4 w-4 text-sap-500" />
            </Link>
          )}
        </div>
      </div>
    </main>
  );
}
