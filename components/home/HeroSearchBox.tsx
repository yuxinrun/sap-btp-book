'use client';

import { Search } from 'lucide-react';

export function HeroSearchBox() {
  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new Event('open-global-search'))}
      className="mt-7 flex w-full max-w-xl items-center gap-3 rounded-xl border border-white/25 bg-white/10 px-4 py-3 text-left text-sm text-white/80 backdrop-blur transition-colors hover:bg-white/20"
    >
      <Search className="h-4.5 w-4.5 shrink-0" />
      <span className="flex-1">搜索教程、命令、配置文件与错误代码…</span>
      <kbd className="hidden rounded border border-white/30 px-1.5 py-0.5 font-mono text-[11px] sm:inline">Ctrl K</kbd>
    </button>
  );
}
