import { ExternalLink } from 'lucide-react';

/** 响应式 YouTube 播放器：仅在视频 ID 已核实时使用 */
export function YouTubeEmbed({ id, title = 'SAP 官方视频' }: { id: string; title?: string }) {
  return (
    <div className="my-6">
      <div className="relative aspect-video w-full overflow-hidden rounded-xl border border-slate-200 dark:border-slate-700">
        <iframe
          className="absolute inset-0 h-full w-full"
          src={`https://www.youtube-nocookie.com/embed/${encodeURIComponent(id)}`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          loading="lazy"
        />
      </div>
      <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
        {title} · 若无法播放，请打开
        <a href={`https://www.youtube.com/watch?v=${encodeURIComponent(id)}`} target="_blank" rel="noopener noreferrer" className="mx-1 inline-flex items-center gap-0.5 text-sap-600 underline dark:text-sap-300">
          原始视频链接 <ExternalLink className="h-3 w-3" />
        </a>
      </p>
    </div>
  );
}
