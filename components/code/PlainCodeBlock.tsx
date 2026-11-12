import { CopyButton } from './CopyButton';

/**
 * 轻量代码块：用于结构化「知识速览页」。
 * 速览页数量多，避免每页都初始化 Shiki；完整教程页仍使用带语法高亮的 CodeBlock。
 */
export function PlainCodeBlock({ code, lang }: { code: string; lang: string }) {
  return (
    <div className="my-6 overflow-hidden rounded-xl border border-slate-200 bg-slate-50 dark:border-slate-700 dark:bg-[#0d1524]">
      <div className="flex items-center justify-between border-b border-slate-200 bg-white/70 px-3 py-1.5 dark:border-slate-700 dark:bg-slate-800/50">
        <span className="font-mono text-[11px] uppercase tracking-wider text-slate-500 dark:text-slate-400">{lang}</span>
        <CopyButton code={code} />
      </div>
      <pre className="scrollbar-thin overflow-x-auto px-4 py-3 font-mono text-[13px] leading-6 text-slate-800 dark:text-slate-200">
        <code>{code}</code>
      </pre>
    </div>
  );
}
