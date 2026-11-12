'use client';

import { useProgress } from '@/lib/progress';

export function StageProgress({ stageId, total }: { stageId: number; total: number }) {
  const { stageProgress, ready } = useProgress();
  const { done, percent } = stageProgress(stageId);
  return (
    <div>
      <div className="flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400">
        <span>完成进度</span>
        <span className="font-semibold text-sap-600 dark:text-sap-300">{ready ? `${done}/${total} · ${percent}%` : `0/${total}`}</span>
      </div>
      <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-700">
        <div className="h-full rounded-full bg-sap-500 transition-all duration-500" style={{ width: `${ready ? percent : 0}%` }} />
      </div>
      <p className="mt-1.5 text-[10px] text-slate-400">在教程页点击「标记为已完成」即可更新</p>
    </div>
  );
}
