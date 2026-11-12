import type { Metadata } from 'next';
import Link from 'next/link';
import { ExternalLink, Info, PlayCircle, Target } from 'lucide-react';
import { Breadcrumbs } from '@/components/navigation/Breadcrumbs';
import { VideoEmbedTool } from '@/components/video/VideoEmbedTool';
import { videoResources } from '@/data/videos';
import { officialSources } from '@/data/official';

export const metadata: Metadata = {
  title: '视频中心',
  description: 'SAP BTP 官方视频与课程资源入口：SAP Technology YouTube 频道、SAP Developers、SAP Learning、SAP Community 与官方示例仓库。',
  alternates: { canonical: '/videos' },
};

export default function VideosPage() {
  return (
    <main className="mx-auto max-w-[1180px] px-4 py-8 sm:px-6">
      <Breadcrumbs items={[{ label: '视频中心' }]} />
      <div className="mt-6 rounded-2xl border border-sap-200 bg-gradient-to-br from-sap-50 to-white p-6 dark:border-sap-900 dark:from-sap-950/40 dark:to-slate-900/40 sm:p-8">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-sap-600 dark:text-sap-300"><PlayCircle className="h-4 w-4" /> Video Center</div>
        <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-50">SAP BTP 视频中心</h1>
        <p className="mt-3 max-w-3xl text-[14px] leading-7 text-slate-600 dark:text-slate-400">
          优先使用 SAP 官方频道与学习平台的内容。每个资源都提供中文标题、简介与学习目标，并在视频无法播放时给出官方原始链接。
          本站不虚构任何视频 ID 或嵌入地址；下方工具可供你嵌入已亲自核实的官方视频。
        </p>
      </div>

      <div className="mt-7 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-[13px] leading-6 text-amber-900 dark:border-amber-900 dark:bg-amber-950/30 dark:text-amber-100">
        <strong className="inline-flex items-center gap-1.5"><Info className="h-4 w-4" /> 资源策略说明：</strong>
        SAP 官方视频的具体 ID 会随频道调整而变化，未经核实直接嵌入容易造成失效或误导。因此本站以官方站点 / 频道入口的形式提供资源，
        并保留标准 YouTube iframe 播放能力，供已核实 ID 的场景使用。
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {videoResources.map((v) => (
          <article key={v.id} className="flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-800/40">
            <div className="flex h-28 items-center justify-center bg-gradient-to-br from-sap-100 via-white to-slate-100 dark:from-sap-950 dark:via-slate-900 dark:to-slate-800">
              <PlayCircle className="h-10 w-10 text-sap-500" />
            </div>
            <div className="flex flex-1 flex-col p-4">
              <div className="flex items-center gap-2 text-[10px] font-medium text-sap-600 dark:text-sap-300">
                <span className="rounded bg-sap-50 px-1.5 py-0.5 dark:bg-sap-950/60">{v.topic}</span>
                <span className="text-slate-400">{v.duration}</span>
              </div>
              <h2 className="mt-2 text-[15px] font-bold text-slate-900 dark:text-slate-50">{v.title}</h2>
              <p className="mt-2 flex-1 text-[12.5px] leading-6 text-slate-600 dark:text-slate-400">{v.description}</p>
              <div className="mt-3">
                <p className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-700 dark:text-slate-200"><Target className="h-3.5 w-3.5 text-sap-500" /> 学习目标</p>
                <ul className="mt-1 space-y-0.5">
                  {v.objectives.map((o) => <li key={o} className="text-[11.5px] leading-5 text-slate-500 dark:text-slate-400">• {o}</li>)}
                </ul>
              </div>
              <a href={v.sourceUrl} target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex items-center justify-center gap-1.5 rounded-lg border border-sap-200 bg-sap-50 px-3 py-2 text-xs font-semibold text-sap-700 hover:bg-sap-100 dark:border-sap-800 dark:bg-sap-950/40 dark:text-sap-300">
                在 {v.provider} 打开原始页面 <ExternalLink className="h-3 w-3" />
              </a>
            </div>
          </article>
        ))}
      </div>

      <div className="mt-8"><VideoEmbedTool /></div>

      <div className="mt-8 rounded-xl border border-slate-200 bg-white p-5 dark:border-slate-700 dark:bg-slate-800/40">
        <h2 className="text-base font-bold text-slate-900 dark:text-slate-50">官方来源清单</h2>
        <div className="mt-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {officialSources.map((s) => (
            <a key={s.id} href={s.url} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between gap-2 rounded-lg border border-slate-200 px-3 py-2 text-xs text-slate-700 hover:border-sap-300 hover:text-sap-700 dark:border-slate-700 dark:text-slate-300">
              <span className="truncate">{s.title}</span><ExternalLink className="h-3 w-3 shrink-0" />
            </a>
          ))}
        </div>
        <p className="mt-3 text-xs text-slate-500 dark:text-slate-400">更多说明见 <Link href="/resources#official" className="text-sap-600 hover:underline dark:text-sap-300">资源中心</Link>。</p>
      </div>
    </main>
  );
}
