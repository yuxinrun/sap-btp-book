import type { Metadata } from 'next';
import { BookOpen, Layers3 } from 'lucide-react';
import { DocsShell } from '@/components/layout/DocsShell';
import { Breadcrumbs } from '@/components/navigation/Breadcrumbs';
import { TutorialCatalog } from '@/components/tutorials/TutorialCatalog';
import { getAllTutorials } from '@/lib/content';
import { navigation, totalTutorials } from '@/data/navigation';

export const metadata: Metadata = {
  title: '教程目录',
  description: '按 SAP BTP Cockpit 功能分组的完整中文教程目录，覆盖基础入门、Cockpit 管理、服务、Cloud Foundry、Spaces、HTML5、Connectivity、Security/XSUAA、用户角色、Entitlements 与用量分析。',
  alternates: { canonical: '/tutorials' },
};

export default function TutorialsPage() {
  const tutorials = getAllTutorials();
  return (
    <DocsShell>
      <div className="mx-auto max-w-[980px] px-4 py-8 sm:px-8">
        <Breadcrumbs items={[{ label: '教程目录' }]} />
        <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50/70 p-5 dark:border-slate-700 dark:bg-slate-800/30">
          <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-sap-600 dark:text-sap-300"><Layers3 className="h-4 w-4" /> Tutorial Catalog</div>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-50">教程目录</h1>
          <p className="mt-2 text-[13px] leading-7 text-slate-600 dark:text-slate-400">
            共 {navigation.length} 个知识模块、{totalTutorials} 个条目，其中 {tutorials.length} 篇为按 24 节模板撰写的完整长文，
            其余为包含定义、菜单位置、参数、配置、命令与排错要点的知识速览页。所有条目都有独立的真实内容，持续补充中。
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-lg bg-white px-3 py-1.5 text-xs text-slate-600 dark:bg-slate-900 dark:text-slate-300"><BookOpen className="h-3.5 w-3.5 text-sap-500" /> 三级菜单：模块 → 分类 → 条目</span>
            <span className="inline-flex items-center gap-1.5 rounded-lg bg-white px-3 py-1.5 text-xs text-slate-600 dark:bg-slate-900 dark:text-slate-300">支持按标题与说明筛选</span>
          </div>
        </div>
        <div className="mt-6">
          <TutorialCatalog longFormIds={tutorials.map((t) => t.id)} />
        </div>
      </div>
    </DocsShell>
  );
}
