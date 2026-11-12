'use client';

import { Bookmark, Check, Clock3, GraduationCap, Signal, Users } from 'lucide-react';
import { useProgress } from '@/lib/progress';
import type { Difficulty } from '@/lib/content';
import { cn } from '@/lib/utils';

const difficultyColor: Record<Difficulty, string> = {
  入门: 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-800',
  进阶: 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/40 dark:text-amber-300 dark:border-amber-800',
  高级: 'bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-950/40 dark:text-rose-300 dark:border-rose-800',
};

export function TutorialMeta({
  id, title, href, difficulty, duration, audience, updated,
}: {
  id: string;
  title: string;
  href: string;
  difficulty: Difficulty;
  duration: string;
  audience: string;
  updated: string;
}) {
  const { isCompleted, isFavorite, toggleCompleted, toggleFavorite, markRead, ready } = useProgress();

  return (
    <div className="mb-7 rounded-xl border border-slate-200 bg-slate-50/70 px-4 py-3.5 dark:border-slate-700 dark:bg-slate-800/40">
      <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-slate-600 dark:text-slate-300">
        <span className={cn('inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 font-semibold', difficultyColor[difficulty])}>
          <Signal className="h-3.5 w-3.5" /> 难度：{difficulty}
        </span>
        <span className="inline-flex items-center gap-1.5"><Clock3 className="h-3.5 w-3.5 text-sap-500" /> 预计 {duration}</span>
        <span className="inline-flex items-center gap-1.5"><Users className="h-3.5 w-3.5 text-sap-500" /> 适用人群：{audience}</span>
        <span className="inline-flex items-center gap-1.5"><GraduationCap className="h-3.5 w-3.5 text-sap-500" /> 内容更新：{updated}</span>
      </div>
      <div className="mt-3 flex flex-wrap items-center gap-2 border-t border-slate-200 pt-3 dark:border-slate-700">
        <button
          type="button"
          onClick={() => {
            toggleCompleted(id);
            markRead({ id, title, href });
          }}
          className={cn(
            'inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-medium transition-colors',
            ready && isCompleted(id)
              ? 'border-emerald-300 bg-emerald-50 text-emerald-700 dark:border-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-300'
              : 'border-slate-200 bg-white text-slate-600 hover:border-sap-300 hover:text-sap-600 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300'
          )}
        >
          <Check className="h-3.5 w-3.5" /> {ready && isCompleted(id) ? '已完成学习' : '标记为已完成'}
        </button>
        <button
          type="button"
          onClick={() => toggleFavorite(id)}
          className={cn(
            'inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-medium transition-colors',
            ready && isFavorite(id)
              ? 'border-sap-300 bg-sap-50 text-sap-700 dark:border-sap-700 dark:bg-sap-950/40 dark:text-sap-300'
              : 'border-slate-200 bg-white text-slate-600 hover:border-sap-300 hover:text-sap-600 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300'
          )}
        >
          <Bookmark className={cn('h-3.5 w-3.5', ready && isFavorite(id) && 'fill-current')} /> {ready && isFavorite(id) ? '已收藏' : '收藏本文'}
        </button>
        <span className="ml-auto text-[11px] text-slate-400">学习进度与收藏保存在本浏览器（LocalStorage）</span>
      </div>
    </div>
  );
}
