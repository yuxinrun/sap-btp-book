import type { Metadata } from 'next';
import { BookMarked } from 'lucide-react';
import { Breadcrumbs } from '@/components/navigation/Breadcrumbs';
import { Dashboard } from '@/components/my/Dashboard';

export const metadata: Metadata = {
  title: '我的学习',
  description: '查看本地保存的学习进度、收藏文章与最近阅读记录。',
  robots: { index: false, follow: true },
};

export default function MyPage() {
  return (
    <main className="mx-auto max-w-[1080px] px-4 py-8 sm:px-6">
      <Breadcrumbs items={[{ label: '我的学习' }]} />
      <div className="mt-6 rounded-2xl border border-sap-200 bg-gradient-to-br from-sap-50 to-white p-6 dark:border-sap-900 dark:from-sap-950/40 dark:to-slate-900/40 sm:p-8">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-sap-600 dark:text-sap-300"><BookMarked className="h-4 w-4" /> My Learning</div>
        <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-50">我的学习</h1>
        <p className="mt-3 text-[14px] leading-7 text-slate-600 dark:text-slate-400">学习进度、收藏文章与最近阅读都保存在当前浏览器中，无需登录即可使用。</p>
      </div>
      <Dashboard />
    </main>
  );
}
