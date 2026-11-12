'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { BookOpen, CircleCheck, ListTree, Sparkles } from 'lucide-react';
import type { TocItem } from '@/lib/content';
import { useProgress } from '@/lib/progress';
import { totalTutorials } from '@/data/navigation';
import { cn } from '@/lib/utils';

interface TocSidebarProps {
  toc: TocItem[];
  related: { id: string; title: string; href: string }[];
  docId: string;
}

export function TocSidebar({ toc, related, docId }: TocSidebarProps) {
  const [active, setActive] = useState('');
  const { totalCompleted, isCompleted, ready } = useProgress();
  const percent = Math.round((totalCompleted / totalTutorials) * 100);

  useEffect(() => {
    const headings = toc.map((t) => document.getElementById(t.id)).filter((el): el is HTMLElement => Boolean(el));
    if (!headings.length) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: '-80px 0px -70% 0px', threshold: [0, 1] }
    );
    headings.forEach((h) => observer.observe(h));
    return () => observer.disconnect();
  }, [toc, docId]);

  return (
    <div className="space-y-7">
      <section>
        <h3 className="mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
          <ListTree className="h-3.5 w-3.5" /> 本页目录
        </h3>
        {toc.length ? (
          <ul className="scrollbar-thin max-h-[46vh] space-y-0.5 overflow-y-auto border-l border-slate-200 pr-1 dark:border-slate-700">
            {toc.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  className={cn(
                    'block border-l-2 py-1 text-[12px] leading-5 transition-colors',
                    item.level === 3 ? 'pl-6' : 'pl-3',
                    active === item.id
                      ? '-ml-px border-sap-500 font-semibold text-sap-600 dark:text-sap-300'
                      : 'border-transparent text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100'
                  )}
                >
                  {item.text}
                </a>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-xs text-slate-400">本页为知识速览，暂无章节目录。</p>
        )}
      </section>

      <section>
        <h3 className="mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
          <CircleCheck className="h-3.5 w-3.5" /> 学习进度
        </h3>
        <div className="rounded-lg border border-slate-200 bg-white p-3 dark:border-slate-700 dark:bg-slate-800/50">
          <div className="flex items-baseline justify-between">
            <span className="text-xl font-bold text-sap-600 dark:text-sap-300">{ready ? totalCompleted : 0}</span>
            <span className="text-[11px] text-slate-500 dark:text-slate-400">/ {totalTutorials} 个条目</span>
          </div>
          <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-700">
            <div className="h-full rounded-full bg-sap-500 transition-all" style={{ width: `${ready ? Math.min(percent, 100) : 0}%` }} />
          </div>
          <p className="mt-2 text-[11px] text-slate-500 dark:text-slate-400">
            本文：{ready && isCompleted(docId) ? '已完成' : '未完成'} · <Link href="/my" className="text-sap-600 hover:underline dark:text-sap-300">查看我的学习</Link>
          </p>
        </div>
      </section>

      <section>
        <h3 className="mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
          <Sparkles className="h-3.5 w-3.5" /> 相关教程
        </h3>
        <ul className="space-y-2">
          {related.map((r) => (
            <li key={r.id}>
              <Link href={r.href} className="group flex items-start gap-2 text-[12px] leading-5 text-slate-600 hover:text-sap-600 dark:text-slate-400 dark:hover:text-sap-300">
                <BookOpen className="mt-0.5 h-3 w-3 shrink-0 text-slate-400 group-hover:text-sap-500" />
                <span>{r.title}</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
