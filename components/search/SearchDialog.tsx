'use client';

import * as Dialog from '@radix-ui/react-dialog';
import { useRouter } from 'next/navigation';
import { useEffect, useMemo, useRef, useState } from 'react';
import { ArrowRight, CornerDownLeft, FileText, Search, X } from 'lucide-react';
import type { SearchDocument } from '@/lib/content';
import { cn } from '@/lib/utils';

interface SearchDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  index: SearchDocument[];
}

type SearchMode = 'all' | 'title';

function scoreDocument(doc: SearchDocument, query: string, mode: SearchMode) {
  const terms = query.toLowerCase().split(/\s+/).filter(Boolean);
  if (!terms.length) return 0;
  const title = doc.title.toLowerCase();
  const brief = doc.brief.toLowerCase();
  const headings = doc.headings.join(' ').toLowerCase();
  const body = doc.body.toLowerCase();
  let total = 0;
  for (const q of terms) {
    let best = 0;
    if (title === q) best = 1000;
    else if (title.startsWith(q)) best = 500;
    else if (title.includes(q)) best = 300;
    else if (mode === 'all' && headings.includes(q)) best = 150;
    else if (mode === 'all' && brief.includes(q)) best = 100;
    else if (mode === 'all' && body.includes(q)) best = 50;
    else return 0;
    total += best;
  }
  return total;
}

export function SearchDialog({ open, onOpenChange, index }: SearchDialogProps) {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [mode, setMode] = useState<SearchMode>('all');
  const [active, setActive] = useState(0);
  const listRef = useRef<HTMLDivElement>(null);

  const results = useMemo(() => {
    if (!query.trim()) {
      return index.filter((d) => d.kind === '完整教程').slice(0, 8).map((doc) => ({ doc, score: 0 }));
    }
    return index
      .map((doc) => ({ doc, score: scoreDocument(doc, query.trim(), mode) }))
      .filter((r) => r.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 30);
  }, [index, query, mode]);

  useEffect(() => { setActive(0); }, [query, mode]);
  useEffect(() => { if (!open) setQuery(''); }, [open]);

  function go(href: string) {
    onOpenChange(false);
    router.push(href);
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActive((a) => Math.min(a + 1, results.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActive((a) => Math.max(a - 1, 0));
    } else if (e.key === 'Enter' && results[active]) {
      e.preventDefault();
      go(results[active].doc.href);
    }
  }

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-[120] bg-slate-950/60 backdrop-blur-sm data-[state=open]:animate-in" />
        <Dialog.Content className="fixed left-1/2 top-[12vh] z-[121] w-[min(680px,92vw)] -translate-x-1/2 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-float outline-none dark:border-slate-700 dark:bg-slate-900">
          <Dialog.Title className="sr-only">全站搜索</Dialog.Title>
          <div className="flex items-center gap-3 border-b border-slate-200 px-4 py-3 dark:border-slate-700">
            <Search className="h-4.5 w-4.5 shrink-0 text-sap-600" />
            <input
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={onKeyDown}
              placeholder="搜索教程标题、命令、配置文件、错误代码…"
              className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-slate-400 dark:text-slate-100"
            />
            <button type="button" onClick={() => onOpenChange(false)} className="rounded-md p-1 text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800" aria-label="关闭搜索">
              <X className="h-4 w-4" />
            </button>
          </div>

          <div className="flex items-center gap-2 border-b border-slate-100 px-4 py-2 text-xs dark:border-slate-800">
            <span className="text-slate-500 dark:text-slate-400">搜索范围</span>
            {(['all', 'title'] as SearchMode[]).map((m) => (
              <button
                key={m}
                type="button"
                onClick={() => setMode(m)}
                className={cn(
                  'rounded-full px-2.5 py-0.5 font-medium transition-colors',
                  mode === m ? 'bg-sap-500 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300'
                )}
              >
                {m === 'all' ? '全文 + 标题' : '仅标题'}
              </button>
            ))}
            <span className="ml-auto text-slate-400">共 {results.length} 条结果</span>
          </div>

          <div ref={listRef} className="scrollbar-thin max-h-[52vh] overflow-y-auto p-2">
            {results.length === 0 ? (
              <div className="py-12 text-center text-sm text-slate-500">
                没有匹配结果。试试 <code className="rounded bg-slate-100 px-1 dark:bg-slate-800">cf push</code>、<code className="rounded bg-slate-100 px-1 dark:bg-slate-800">xs-security</code> 或 <code className="rounded bg-slate-100 px-1 dark:bg-slate-800">403</code>
              </div>
            ) : results.map(({ doc }, i) => (
              <button
                key={doc.id}
                type="button"
                onMouseEnter={() => setActive(i)}
                onClick={() => go(doc.href)}
                className={cn(
                  'flex w-full items-start gap-3 rounded-lg px-3 py-2.5 text-left transition-colors',
                  i === active ? 'bg-sap-50 dark:bg-sap-950/50' : 'hover:bg-slate-50 dark:hover:bg-slate-800/60'
                )}
              >
                <FileText className="mt-0.5 h-4 w-4 shrink-0 text-sap-500" />
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-[13.5px] font-medium text-slate-800 dark:text-slate-100">{doc.title}</span>
                  <span className="mt-0.5 block line-clamp-1 text-xs text-slate-500 dark:text-slate-400">{doc.brief}</span>
                  <span className="mt-1 flex items-center gap-1.5 text-[11px] text-slate-400">
                    <span className="rounded bg-slate-100 px-1.5 py-0.5 dark:bg-slate-800">{doc.kind}</span>
                    {doc.group} / {doc.section}
                  </span>
                </span>
                {i === active ? <CornerDownLeft className="mt-1 h-3.5 w-3.5 text-sap-500" /> : <ArrowRight className="mt-1 h-3.5 w-3.5 text-slate-300" />}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-4 border-t border-slate-100 bg-slate-50 px-4 py-2 text-[11px] text-slate-500 dark:border-slate-800 dark:bg-slate-800/50 dark:text-slate-400">
            <span>↑↓ 选择</span><span>Enter 打开</span><span>Esc 关闭</span>
            <span className="ml-auto">索引涵盖 {index.length} 个条目</span>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
