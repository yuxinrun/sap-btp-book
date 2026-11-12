'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import { BookOpen, Search, Sparkles } from 'lucide-react';
import { navigation } from '@/data/navigation';
import { cn } from '@/lib/utils';

export function TutorialCatalog({ longFormIds }: { longFormIds: string[] }) {
  const [query, setQuery] = useState('');
  const [onlyLong, setOnlyLong] = useState(false);
  const longSet = useMemo(() => new Set(longFormIds), [longFormIds]);

  const groups = useMemo(() => {
    const q = query.trim().toLowerCase();
    return navigation.map((group) => ({
      ...group,
      sections: group.sections
        .map((section) => ({
          ...section,
          items: section.items.filter((item) => {
            if (onlyLong && !longSet.has(item.id)) return false;
            if (!q) return true;
            return `${item.title}${item.brief}${section.title}${group.title}`.toLowerCase().includes(q);
          }),
        }))
        .filter((s) => s.items.length > 0),
    })).filter((g) => g.sections.length > 0);
  }, [query, onlyLong, longSet]);

  const matched = groups.reduce((n, g) => n + g.sections.reduce((m, s) => m + s.items.length, 0), 0);

  return (
    <>
      <div className="sticky top-14 z-20 -mx-4 mb-6 border-b border-slate-200 bg-white/95 px-4 py-3 backdrop-blur dark:border-slate-800 dark:bg-slate-900/95 sm:-mx-8 sm:px-8">
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex min-w-[220px] flex-1 items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 dark:border-slate-700 dark:bg-slate-800">
            <Search className="h-4 w-4 text-slate-400" />
            <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="在目录内筛选教程标题或说明…" className="min-w-0 flex-1 bg-transparent text-[13px] outline-none placeholder:text-slate-400 dark:text-slate-100" />
          </div>
          <button
            type="button"
            onClick={() => setOnlyLong((v) => !v)}
            className={cn(
              'inline-flex items-center gap-1.5 rounded-lg border px-3 py-2 text-xs font-medium transition-colors',
              onlyLong ? 'border-sap-300 bg-sap-50 text-sap-700 dark:border-sap-700 dark:bg-sap-950/50 dark:text-sap-300' : 'border-slate-200 bg-white text-slate-600 hover:border-sap-300 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300'
            )}
          >
            <Sparkles className="h-3.5 w-3.5" /> 仅看完整长文
          </button>
          <span className="text-xs text-slate-400">匹配 {matched} 条</span>
        </div>
      </div>

      <div className="space-y-7">
        {groups.length === 0 && <p className="py-12 text-center text-sm text-slate-500">没有匹配的条目，试试其他关键词。</p>}
        {groups.map((group) => (
          <section key={group.id} id={group.id} className="scroll-mt-28">
            <div className="flex flex-wrap items-baseline justify-between gap-2 border-b border-slate-200 pb-2 dark:border-slate-700">
              <h2 className="text-lg font-bold text-slate-900 dark:text-slate-50">{group.title}</h2>
              <span className="text-xs text-slate-400">{group.description}</span>
            </div>
            <div className="mt-3 space-y-4">
              {group.sections.map((section) => (
                <div key={section.id}>
                  <h3 className="mb-2 flex items-center gap-2 text-[13px] font-semibold text-sap-700 dark:text-sap-300">
                    <span className="h-1.5 w-1.5 rounded-full bg-sap-500" /> {section.title}
                  </h3>
                  <ul className="grid gap-1.5 sm:grid-cols-2">
                    {section.items.map((item) => (
                      <li key={item.id}>
                        <Link href={item.href} className="group flex items-start gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 transition-colors hover:border-sap-300 hover:bg-sap-50/40 dark:border-slate-700 dark:bg-slate-800/40 dark:hover:border-sap-700">
                          <BookOpen className="mt-0.5 h-3.5 w-3.5 shrink-0 text-slate-400 group-hover:text-sap-500" />
                          <span className="min-w-0">
                            <span className="flex items-center gap-1.5">
                              <span className="truncate text-[12.5px] font-medium text-slate-800 group-hover:text-sap-700 dark:text-slate-100 dark:group-hover:text-sap-300">{item.title}</span>
                              {longSet.has(item.id) && <span className="shrink-0 rounded bg-emerald-50 px-1 py-0.5 text-[9px] font-medium text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300">长文</span>}
                            </span>
                            <span className="mt-0.5 line-clamp-1 block text-[11px] text-slate-500 dark:text-slate-400">{item.brief}</span>
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>
    </>
  );
}
