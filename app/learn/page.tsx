import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, BookOpen, CheckCircle2, Compass, Target, Wrench } from 'lucide-react';
import { Breadcrumbs } from '@/components/navigation/Breadcrumbs';
import { StageProgress } from '@/components/learn/StageProgress';
import { learningStages } from '@/data/learning-path';
import { navIndex } from '@/data/navigation';

export const metadata: Metadata = {
  title: '六阶段学习路线',
  description: 'SAP BTP 六阶段学习路线：BTP 基础、BTP 管理、安全认证、应用开发、部署与集成、企业级实战，含学习目标、推荐教程、实战任务与完成进度。',
  keywords: ['SAP BTP 学习路线', 'BTP 入门', 'XSUAA 学习', 'CAP 学习', 'Cloud Foundry 学习'],
  alternates: { canonical: '/learn' },
};

export default function LearnPage() {
  return (
    <main className="mx-auto max-w-[1180px] px-4 py-8 sm:px-6">
      <Breadcrumbs items={[{ label: '学习路线' }]} />

      <div className="mt-6 rounded-2xl border border-sap-200 bg-gradient-to-br from-sap-50 to-white p-6 dark:border-sap-900 dark:from-sap-950/40 dark:to-slate-900/40 sm:p-8">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-sap-600 dark:text-sap-300"><Compass className="h-4 w-4" /> Learning Path</div>
        <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-50">六阶段学习路线</h1>
        <p className="mt-3 max-w-3xl text-[14px] leading-7 text-slate-600 dark:text-slate-400">
          按「认知 → 管理 → 安全 → 开发 → 部署 → 架构」的顺序推进。每个阶段给出学习目标、学习内容、推荐教程与实战任务；
          学习进度会保存在浏览器本地，可随时回到 <Link href="/my" className="text-sap-600 hover:underline dark:text-sap-300">我的学习</Link> 查看。
        </p>
        <div className="mt-5 flex flex-wrap gap-2">
          {learningStages.map((s) => (
            <a key={s.id} href={`#stage-${s.id}`} className="rounded-full border border-sap-200 bg-white px-3 py-1 text-xs font-medium text-sap-700 hover:bg-sap-100 dark:border-sap-800 dark:bg-slate-900 dark:text-sap-300">
              第 {s.id} 阶段 · {s.title.replace(/^第.阶段：/, '')}
            </a>
          ))}
        </div>
      </div>

      <div className="mt-10 space-y-8">
        {learningStages.map((stage) => {
          const next = learningStages[stage.id];
          const tutorials = stage.tutorialIds.map((id) => navIndex.byId.get(id)).filter((x): x is NonNullable<typeof x> => Boolean(x));
          return (
            <section key={stage.id} id={`stage-${stage.id}`} className="scroll-mt-20 overflow-hidden rounded-2xl border border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-800/40">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 bg-slate-50/70 px-5 py-3 dark:border-slate-700 dark:bg-slate-800/60">
                <div className="flex items-center gap-3">
                  <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-sap-500 text-sm font-bold text-white">0{stage.id}</span>
                  <div>
                    <h2 className="text-lg font-bold text-slate-900 dark:text-slate-50">{stage.title}</h2>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400">{stage.subtitle}</p>
                  </div>
                </div>
                <span className="rounded-full bg-white px-3 py-1 text-[11px] font-medium text-sap-700 dark:bg-slate-900 dark:text-sap-300">{stage.tutorialIds.length} 篇推荐教程</span>
              </div>

              <div className="grid gap-6 p-5 lg:grid-cols-[1.1fr_0.9fr]">
                <div className="space-y-5">
                  <div>
                    <h3 className="flex items-center gap-2 text-sm font-semibold text-slate-800 dark:text-slate-100"><Target className="h-4 w-4 text-sap-500" /> 学习目标</h3>
                    <p className="mt-2 text-[13px] leading-7 text-slate-600 dark:text-slate-400">{stage.goal}</p>
                  </div>
                  <div>
                    <h3 className="flex items-center gap-2 text-sm font-semibold text-slate-800 dark:text-slate-100"><BookOpen className="h-4 w-4 text-sap-500" /> 学习内容</h3>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {stage.topics.map((t) => <span key={t} className="rounded-lg bg-sap-50 px-2.5 py-1 text-xs text-sap-700 dark:bg-sap-950/50 dark:text-sap-300">{t}</span>)}
                    </div>
                  </div>
                  <div>
                    <h3 className="flex items-center gap-2 text-sm font-semibold text-slate-800 dark:text-slate-100"><Wrench className="h-4 w-4 text-sap-500" /> 实战任务</h3>
                    <ul className="mt-2 space-y-1.5">
                      {stage.tasks.map((t) => <li key={t} className="flex gap-2 text-[13px] leading-6 text-slate-600 dark:text-slate-400"><CheckCircle2 className="mt-1 h-3.5 w-3.5 shrink-0 text-sap-500" />{t}</li>)}
                    </ul>
                  </div>
                </div>

                <div className="space-y-5">
                  <div>
                    <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-100">推荐教程</h3>
                    <ul className="mt-2 divide-y divide-slate-100 rounded-xl border border-slate-200 dark:divide-slate-700 dark:border-slate-700">
                      {tutorials.map((t) => (
                        <li key={t.id}>
                          <Link href={t.href} className="flex items-center justify-between gap-2 px-3 py-2 text-[12.5px] text-slate-700 hover:bg-sap-50 hover:text-sap-700 dark:text-slate-300 dark:hover:bg-sap-950/30 dark:hover:text-sap-300">
                            <span className="truncate">{t.title}</span><ArrowRight className="h-3 w-3 shrink-0 text-slate-300" />
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-800/60">
                    <StageProgress stageId={stage.id} total={stage.tutorialIds.length} />
                  </div>
                  <div className="flex items-center justify-between gap-2 text-xs">
                    <Link href={tutorials[0]?.href ?? '/tutorials'} className="inline-flex items-center gap-1 font-medium text-sap-600 hover:underline dark:text-sap-300">从第一阶段第一篇开始 <ArrowRight className="h-3 w-3" /></Link>
                    {next ? (
                      <a href={`#stage-${next.id}`} className="text-slate-500 hover:text-sap-600 dark:text-slate-400">下一阶段：{next.title.replace(/^第.阶段：/, '')} →</a>
                    ) : (
                      <Link href="/projects" className="text-slate-500 hover:text-sap-600 dark:text-slate-400">进入实战项目 →</Link>
                    )}
                  </div>
                </div>
              </div>
            </section>
          );
        })}
      </div>
    </main>
  );
}
