'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import { BookMarked, Clock3, History, RotateCcw, Trash2, Trophy } from 'lucide-react';
import { useProgress } from '@/lib/progress';
import { navIndex, totalTutorials } from '@/data/navigation';
import { learningStages } from '@/data/learning-path';

export function Dashboard() {
  const { favorites, completed, recent, stageProgress, ready, toggleFavorite, markRead, toggleCompleted } = useProgress();
  const [confirmReset, setConfirmReset] = useState(false);

  const favoriteItems = useMemo(() => favorites.map((id) => navIndex.byId.get(id)).filter((x): x is NonNullable<typeof x> => Boolean(x)), [favorites]);
  const percent = Math.round((completed.length / totalTutorials) * 100);

  function resetAll() {
    if (!confirmReset) { setConfirmReset(true); return; }
    try { window.localStorage.removeItem('sap-btp-cn:learning-progress:v1'); } catch { /* ignore */ }
    window.location.reload();
  }

  return (
    <>
      <div className="mt-7 grid gap-3 sm:grid-cols-3">
        <StatCard icon={<Trophy className="h-5 w-5" />} value={ready ? String(completed.length) : '0'} label={`已完成教程 / 共 ${totalTutorials} 条`} extra={`${ready ? Math.min(percent, 100) : 0}%`} />
        <StatCard icon={<BookMarked className="h-5 w-5" />} value={ready ? String(favorites.length) : '0'} label="收藏文章" />
        <StatCard icon={<History className="h-5 w-5" />} value={ready ? String(recent.length) : '0'} label="最近阅读（最多 20 条）" />
      </div>

      <div className="mt-7 grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-5">
          <section className="rounded-xl border border-slate-200 bg-white p-5 dark:border-slate-700 dark:bg-slate-800/40">
            <h2 className="flex items-center gap-2 text-base font-bold text-slate-900 dark:text-slate-50"><Clock3 className="h-4 w-4 text-sap-500" /> 最近阅读</h2>
            {recent.length === 0 ? (
              <p className="mt-3 text-sm text-slate-500 dark:text-slate-400">还没有阅读记录。打开任意教程后会自动出现在这里。</p>
            ) : (
              <ul className="mt-3 divide-y divide-slate-100 dark:divide-slate-700">
                {recent.map((r) => (
                  <li key={r.id} className="flex items-center justify-between gap-3 py-2">
                    <Link href={r.href} className="min-w-0 flex-1 truncate text-[13px] text-slate-700 hover:text-sap-600 dark:text-slate-300">{r.title}</Link>
                    <span className="shrink-0 text-[11px] text-slate-400">{new Date(r.at).toLocaleDateString('zh-CN')}</span>
                    <button type="button" onClick={() => markRead({ id: r.id, title: r.title, href: r.href })} className="sr-only">再次记录</button>
                  </li>
                ))}
              </ul>
            )}
            <Link href="/tutorials" className="mt-3 inline-block text-xs font-medium text-sap-600 hover:underline dark:text-sap-300">去教程目录 →</Link>
          </section>

          <section className="rounded-xl border border-slate-200 bg-white p-5 dark:border-slate-700 dark:bg-slate-800/40">
            <h2 className="flex items-center gap-2 text-base font-bold text-slate-900 dark:text-slate-50"><BookMarked className="h-4 w-4 text-sap-500" /> 我的收藏</h2>
            {favoriteItems.length === 0 ? (
              <p className="mt-3 text-sm text-slate-500 dark:text-slate-400">还没有收藏。在教程页点击「收藏本文」即可加入。</p>
            ) : (
              <ul className="mt-3 space-y-2">
                {favoriteItems.map((f) => (
                  <li key={f.id} className="flex items-center justify-between gap-2 rounded-lg border border-slate-200 px-3 py-2 dark:border-slate-700">
                    <Link href={f.href} className="min-w-0 flex-1 truncate text-[13px] text-slate-700 hover:text-sap-600 dark:text-slate-300">{f.title}</Link>
                    <button type="button" onClick={() => toggleFavorite(f.id)} className="rounded p-1 text-slate-400 hover:text-rose-500" aria-label="取消收藏"><Trash2 className="h-3.5 w-3.5" /></button>
                  </li>
                ))}
              </ul>
            )}
          </section>
        </div>

        <div className="space-y-5">
          <section className="rounded-xl border border-slate-200 bg-white p-5 dark:border-slate-700 dark:bg-slate-800/40">
            <h2 className="text-base font-bold text-slate-900 dark:text-slate-50">六阶段完成度</h2>
            <ul className="mt-3 space-y-3">
              {learningStages.map((s) => {
                const p = stageProgress(s.id);
                return (
                  <li key={s.id}>
                    <div className="flex items-center justify-between text-[12px]">
                      <Link href={`/learn#stage-${s.id}`} className="text-slate-700 hover:text-sap-600 dark:text-slate-300">{s.title}</Link>
                      <span className="text-slate-500 dark:text-slate-400">{ready ? `${p.done}/${p.total}` : `0/${p.total}`}</span>
                    </div>
                    <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-700">
                      <div className="h-full rounded-full bg-sap-500" style={{ width: `${ready ? p.percent : 0}%` }} />
                    </div>
                  </li>
                );
              })}
            </ul>
          </section>

          <section className="rounded-xl border border-slate-200 bg-white p-5 dark:border-slate-700 dark:bg-slate-800/40">
            <h2 className="text-base font-bold text-slate-900 dark:text-slate-50">已完成的教程</h2>
            {completed.length === 0 ? (
              <p className="mt-3 text-sm text-slate-500 dark:text-slate-400">在教程页点击「标记为已完成」后，会显示在这里。</p>
            ) : (
              <ul className="mt-3 max-h-64 space-y-1.5 overflow-y-auto">
                {completed.slice().reverse().map((id) => {
                  const item = navIndex.byId.get(id);
                  if (!item) return null;
                  return (
                    <li key={id} className="flex items-center justify-between gap-2 text-[12.5px]">
                      <Link href={item.href} className="min-w-0 flex-1 truncate text-slate-700 hover:text-sap-600 dark:text-slate-300">{item.title}</Link>
                      <button type="button" onClick={() => toggleCompleted(id)} className="text-[11px] text-slate-400 hover:text-rose-500">撤销</button>
                    </li>
                  );
                })}
              </ul>
            )}
          </section>

          <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-xs leading-6 text-slate-600 dark:border-slate-700 dark:bg-slate-800/60 dark:text-slate-400">
            <p><strong>数据说明：</strong>当前版本的进度、收藏与最近阅读保存在浏览器 LocalStorage，不上传服务器；清除浏览器数据会重置。后续可扩展为用户账号与数据库存储。</p>
            <button type="button" onClick={resetAll} className="mt-3 inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 font-medium text-slate-600 hover:border-rose-300 hover:text-rose-600 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300">
              <RotateCcw className="h-3.5 w-3.5" /> {confirmReset ? '再次点击确认清空' : '清空本地学习数据'}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

function StatCard({ icon, value, label, extra }: { icon: React.ReactNode; value: string; label: string; extra?: string }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-800/40">
      <div className="flex items-center justify-between text-sap-500">{icon}{extra && <span className="text-xs font-semibold">{extra}</span>}</div>
      <div className="mt-2 text-2xl font-bold text-slate-900 dark:text-slate-50">{value}</div>
      <div className="mt-0.5 text-[11px] text-slate-500 dark:text-slate-400">{label}</div>
    </div>
  );
}
