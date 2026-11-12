'use client';

import { useEffect, useId, useState } from 'react';
import { useTheme } from 'next-themes';

interface MermaidProps {
  chart: string;
  caption?: string;
}

/** 客户端渲染 Mermaid 架构图 / 流程图，主题跟随站点明暗模式 */
export function Mermaid({ chart, caption }: MermaidProps) {
  const rawId = useId().replace(/:/g, '');
  const { resolvedTheme } = useTheme();
  const [svg, setSvg] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    let cancelled = false;
    async function render() {
      try {
        const mermaid = (await import('mermaid')).default;
        mermaid.initialize({
          startOnLoad: false,
          theme: resolvedTheme === 'dark' ? 'dark' : 'default',
          securityLevel: 'strict',
          fontFamily: 'inherit',
        });
        const result = await mermaid.render(`mmd-${rawId}`, chart);
        if (!cancelled) {
          setSvg(result.svg);
          setError('');
        }
      } catch (e) {
        if (!cancelled) setError(e instanceof Error ? e.message : '图表渲染失败');
      }
    }
    void render();
    return () => { cancelled = true; };
  }, [chart, rawId, resolvedTheme]);

  return (
    <figure className="my-7 overflow-hidden rounded-xl border border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-900/60">
      {error ? (
        <pre className="whitespace-pre-wrap p-5 text-xs text-rose-600 dark:text-rose-400">{chart}</pre>
      ) : (
        <div
          className="flex justify-center overflow-x-auto p-5 [&_svg]:max-w-full [&_svg]:h-auto"
          dangerouslySetInnerHTML={{ __html: svg }}
        />
      )}
      <figcaption className="border-t border-slate-200 bg-slate-50 px-4 py-2 text-center text-xs text-slate-500 dark:border-slate-700 dark:bg-slate-800/60 dark:text-slate-400">
        {caption ?? '示意图（本站自绘，非 SAP Cockpit 截图）'}
      </figcaption>
    </figure>
  );
}
