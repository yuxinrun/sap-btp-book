'use client';

import Link from 'next/link';
import { useState } from 'react';
import { ArrowLeft, ArrowRight, MessageSquareText, ThumbsDown, ThumbsUp } from 'lucide-react';

interface ArticleFooterProps {
  prev?: { title: string; href: string };
  next?: { title: string; href: string };
}

export function ArticleFooter({ prev, next }: ArticleFooterProps) {
  const [feedback, setFeedback] = useState<'up' | 'down' | null>(null);

  return (
    <div className="mt-14 border-t border-slate-200 pt-6 dark:border-slate-800">
      <div className="grid gap-3 sm:grid-cols-2">
        {prev ? (
          <Link href={prev.href} className="group rounded-xl border border-slate-200 px-4 py-3 transition-colors hover:border-sap-300 hover:bg-sap-50/50 dark:border-slate-700 dark:hover:border-sap-700 dark:hover:bg-sap-950/30">
            <span className="flex items-center gap-1 text-[11px] text-slate-400"><ArrowLeft className="h-3 w-3" /> 上一篇</span>
            <span className="mt-1 block truncate text-sm font-medium text-slate-700 group-hover:text-sap-600 dark:text-slate-200 dark:group-hover:text-sap-300">{prev.title}</span>
          </Link>
        ) : <div />}
        {next ? (
          <Link href={next.href} className="group rounded-xl border border-slate-200 px-4 py-3 text-right transition-colors hover:border-sap-300 hover:bg-sap-50/50 dark:border-slate-700 dark:hover:border-sap-700 dark:hover:bg-sap-950/30">
            <span className="flex items-center justify-end gap-1 text-[11px] text-slate-400">下一篇 <ArrowRight className="h-3 w-3" /></span>
            <span className="mt-1 block truncate text-sm font-medium text-slate-700 group-hover:text-sap-600 dark:text-slate-200 dark:group-hover:text-sap-300">{next.title}</span>
          </Link>
        ) : <div />}
      </div>

      <div className="mt-6 flex flex-col items-start justify-between gap-3 rounded-xl bg-slate-50 px-4 py-3 sm:flex-row sm:items-center dark:bg-slate-800/50">
        <div className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-300">
          <MessageSquareText className="h-4 w-4 text-sap-500" />
          {feedback ? '感谢反馈！我们会持续完善本篇内容。' : '这篇教程对你有帮助吗？'}
        </div>
        {!feedback && (
          <div className="flex items-center gap-2">
            <button type="button" onClick={() => setFeedback('up')} className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs hover:border-emerald-300 hover:text-emerald-600 dark:border-slate-700 dark:bg-slate-900">
              <ThumbsUp className="h-3.5 w-3.5" /> 有帮助
            </button>
            <button type="button" onClick={() => setFeedback('down')} className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs hover:border-amber-300 hover:text-amber-600 dark:border-slate-700 dark:bg-slate-900">
              <ThumbsDown className="h-3.5 w-3.5" /> 需要改进
            </button>
            <a href="https://community.sap.com/" target="_blank" rel="noopener noreferrer" className="text-xs text-sap-600 hover:underline dark:text-sap-300">前往官方社区提问</a>
          </div>
        )}
      </div>
    </div>
  );
}
