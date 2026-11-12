'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import { Search } from 'lucide-react';
import { glossaryTerms } from '@/data/glossary';

const categories = ['全部', '账号与环境', '服务与部署', '身份与安全', '开发与集成'] as const;

export function GlossaryList() {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState<(typeof categories)[number]>('全部');

  const filtered = useMemo(() => glossaryTerms.filter((g) => {
    if (category !== '全部' && g.category !== category) return false;
    if (!query.trim()) return true;
    const q = query.trim().toLowerCase();
    return `${g.term}${g.en}${g.definition}`.toLowerCase().includes(q);
  }), [query, category]);

  return (
    <>
      <div className="sticky top-14 z-20 -mx-4 mb-5 border-b border-slate-200 bg-white/95 px-4 py-3 backdrop-blur dark:border-slate-800 dark:bg-slate-900/95 sm:-mx-6">
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex min-w-[200px] flex-1 items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 dark:border-slate-700 dark:bg-slate-800">
            <Search className="h-4 w-4 text-slate-400" />
            <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="搜索中文术语或英文缩写…" className="min-w-0 flex-1 bg-transparent text-[13px] outline-none placeholder:text-slate-400 dark:text-slate-100" />
          </div>
          <div className="flex flex-wrap gap-1.5">
            {categories.map((c) => (
              <button key={c} type="button" onClick={() => setCategory(c)} className={`rounded-lg px-2.5 py-1.5 text-xs font-medium transition-colors ${category === c ? 'bg-sap-500 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300'}`}>
                {c}
              </button>
            ))}
          </div>
        </div>
      </div>

      <p className="mb-4 text-xs text-slate-500 dark:text-slate-400">共 {filtered.length} 条术语</p>
      <div className="grid gap-3 md:grid-cols-2">
        {filtered.map((g) => (
          <div key={g.term} id={encodeURIComponent(g.term)} className="scroll-mt-24 rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-800/40">
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h3 className="text-[14px] font-bold text-slate-900 dark:text-slate-50">{g.term}</h3>
              <span className="font-mono text-[11px] text-sap-600 dark:text-sap-300">{g.en}</span>
            </div>
            <p className="mt-2 text-[12.5px] leading-6 text-slate-600 dark:text-slate-400">{g.definition}</p>
            <div className="mt-3 flex items-center justify-between gap-2">
              <span className="rounded bg-slate-100 px-2 py-0.5 text-[10px] text-slate-500 dark:bg-slate-800 dark:text-slate-400">{g.category}</span>
              {g.relatedId && <Link href={`/docs/${g.relatedId}`} className="text-xs text-sap-600 hover:underline dark:text-sap-300">查看相关教程 →</Link>}
            </div>
          </div>
        ))}
      </div>
      {filtered.length === 0 && <p className="py-12 text-center text-sm text-slate-500">没有匹配的术语。</p>}
    </>
  );
}
