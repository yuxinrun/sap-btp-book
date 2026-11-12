import type { Metadata } from 'next';
import { BookOpenText } from 'lucide-react';
import { Breadcrumbs } from '@/components/navigation/Breadcrumbs';
import { GlossaryList } from '@/components/glossary/GlossaryList';
import { glossaryTerms } from '@/data/glossary';
import { siteUrl } from '@/lib/site';

export const metadata: Metadata = {
  title: '术语词典',
  description: 'SAP BTP 常用术语的中文解释与英文对照，覆盖账号与环境、服务与部署、身份与安全、开发与集成四大类。',
  keywords: ['SAP BTP 术语', 'XSUAA 是什么', 'Entitlements', 'Role Collection', 'VCAP_SERVICES'],
  alternates: { canonical: siteUrl('/glossary/') },
};

export default function GlossaryPage() {
  return (
    <main className="mx-auto max-w-[1080px] px-4 py-8 sm:px-6">
      <Breadcrumbs items={[{ label: '术语词典' }]} />
      <div className="mt-6 rounded-2xl border border-sap-200 bg-gradient-to-br from-sap-50 to-white p-6 dark:border-sap-900 dark:from-sap-950/40 dark:to-slate-900/40 sm:p-8">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-sap-600 dark:text-sap-300"><BookOpenText className="h-4 w-4" /> Glossary</div>
        <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-50">SAP BTP 术语词典</h1>
        <p className="mt-3 max-w-3xl text-[14px] leading-7 text-slate-600 dark:text-slate-400">
          第一次出现的专业术语都可以在这里查到中文解释、英文原文与相关教程。共收录 {glossaryTerms.length} 条，按账号与环境、服务与部署、身份与安全、开发与集成分类。
        </p>
      </div>
      <div className="mt-6"><GlossaryList /></div>
    </main>
  );
}
