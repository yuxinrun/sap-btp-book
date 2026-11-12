'use client';

import { useState } from 'react';
import { PlayCircle, ShieldCheck } from 'lucide-react';
import { YouTubeEmbed } from '@/components/video/YouTubeEmbed';

function extractId(input: string): string | null {
  const value = input.trim();
  if (/^[a-zA-Z0-9_-]{11}$/.test(value)) return value;
  try {
    const url = new URL(value);
    if (url.hostname.endsWith('youtube.com') || url.hostname.endsWith('youtube-nocookie.com')) {
      const v = url.searchParams.get('v');
      if (v && /^[a-zA-Z0-9_-]{11}$/.test(v)) return v;
      const embed = /\/embed\/([a-zA-Z0-9_-]{11})/.exec(url.pathname);
      if (embed) return embed[1];
    }
    if (url.hostname === 'youtu.be') {
      const short = /^\/([a-zA-Z0-9_-]{11})/.exec(url.pathname);
      if (short) return short[1];
    }
  } catch {
    return null;
  }
  return null;
}

export function VideoEmbedTool() {
  const [input, setInput] = useState('');
  const [id, setId] = useState<string | null>(null);
  const [error, setError] = useState('');

  function apply() {
    const parsed = extractId(input);
    if (!parsed) {
      setId(null);
      setError('未能识别有效的 YouTube 视频 ID。请粘贴完整 youtube.com/watch?v=… 链接或 11 位视频 ID。');
      return;
    }
    setError('');
    setId(parsed);
  }

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-700 dark:bg-slate-800/40">
      <h2 className="flex items-center gap-2 text-base font-bold text-slate-900 dark:text-slate-50"><PlayCircle className="h-4 w-4 text-sap-500" /> 嵌入已核实的 SAP 官方视频</h2>
      <p className="mt-2 text-[13px] leading-6 text-slate-600 dark:text-slate-400">
        本站不内置任何未经核实的视频 ID。若你从 SAP 官方 YouTube 频道找到具体视频，可把链接粘贴到下方，播放器会以响应式 16:9 iframe 嵌入，并同时提供原始视频链接。
      </p>
      <div className="mt-4 flex flex-col gap-2 sm:flex-row">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => { if (e.key === 'Enter') apply(); }}
          placeholder="https://www.youtube.com/watch?v=…（SAP 官方频道视频链接）"
          className="min-w-0 flex-1 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-[13px] outline-none focus:border-sap-400 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
        />
        <button type="button" onClick={apply} className="rounded-lg bg-sap-600 px-4 py-2 text-sm font-semibold text-white hover:bg-sap-700">生成播放器</button>
      </div>
      {error && <p className="mt-2 text-xs text-rose-600 dark:text-rose-400">{error}</p>}
      <p className="mt-2 flex items-center gap-1.5 text-[11px] text-slate-400"><ShieldCheck className="h-3.5 w-3.5" /> 请自行确认视频来源为 SAP 官方频道，本站不校验视频内容的真实性与版权。</p>
      {id && <YouTubeEmbed id={id} title="YouTube 视频预览" />}
    </div>
  );
}
