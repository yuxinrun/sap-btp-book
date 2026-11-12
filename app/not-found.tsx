import Link from 'next/link';
import { ArrowLeft, Search } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-xl flex-col items-center justify-center px-5 text-center">
      <span className="text-6xl font-black text-sap-500">404</span>
      <h1 className="mt-4 text-2xl font-bold text-slate-900 dark:text-slate-50">没有找到这个页面</h1>
      <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">教程可能已改名或尚未创建。可以从教程目录继续浏览，或使用全站搜索。</p>
      <div className="mt-6 flex gap-3">
        <Link href="/tutorials" className="inline-flex items-center gap-2 rounded-lg bg-sap-500 px-4 py-2 text-sm font-medium text-white hover:bg-sap-600">
          <ArrowLeft className="h-4 w-4" /> 教程目录
        </Link>
        <Link href="/" className="inline-flex items-center gap-2 rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800">
          <Search className="h-4 w-4" /> 返回首页
        </Link>
      </div>
    </div>
  );
}
