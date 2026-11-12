'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import * as Dialog from '@radix-ui/react-dialog';
import { useEffect, useState } from 'react';
import { BookMarked, Menu, Search, X } from 'lucide-react';
import { ThemeToggle } from '@/components/common/ThemeToggle';
import { Sidebar } from '@/components/sidebar/Sidebar';
import { SearchDialog } from '@/components/search/SearchDialog';
import type { SearchDocument } from '@/lib/content';
import { cn } from '@/lib/utils';

const navLinks = [
  { href: '/', label: '首页' },
  { href: '/learn', label: '学习路线' },
  { href: '/tutorials', label: '教程目录' },
  { href: '/projects', label: '实战项目' },
  { href: '/videos', label: '视频中心' },
  { href: '/resources', label: '资源中心' },
];

export function SiteHeader({ searchIndex }: { searchIndex: SearchDocument[] }) {
  const pathname = usePathname();
  const [searchOpen, setSearchOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setSearchOpen((v) => !v);
      }
    }
    function onOpenSearch() { setSearchOpen(true); }
    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('open-global-search', onOpenSearch);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('open-global-search', onOpenSearch);
    };
  }, []);

  useEffect(() => { setMenuOpen(false); }, [pathname]);

  return (
    <>
      <header className="sticky top-0 z-50 h-14 border-b border-slate-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80 dark:border-slate-800 dark:bg-slate-900/90">
        <div className="mx-auto flex h-full max-w-[1680px] items-center gap-2 px-3 sm:px-5">
          <button
            type="button"
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-slate-600 hover:bg-slate-100 lg:hidden dark:text-slate-300 dark:hover:bg-slate-800"
            onClick={() => setMenuOpen(true)}
            aria-label="打开教程菜单"
          >
            <Menu className="h-5 w-5" />
          </button>

          <Link href="/" className="flex shrink-0 items-center gap-2.5">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-sap-500 to-sap-700 text-[11px] font-black tracking-tight text-white shadow-sm">SAP</span>
            <span className="hidden leading-tight sm:block">
              <span className="block text-[13.5px] font-bold tracking-tight text-slate-900 dark:text-slate-50">SAP BTP 中文学习中心</span>
              <span className="block text-[10px] text-slate-500 dark:text-slate-400">从零入门到企业级实战</span>
            </span>
          </Link>

          <nav className="ml-4 hidden items-center gap-0.5 lg:flex" aria-label="主导航">
            {navLinks.map((link) => {
              const active = link.href === '/' ? pathname === '/' : pathname.startsWith(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    'rounded-lg px-3 py-1.5 text-[13px] font-medium transition-colors',
                    active
                      ? 'bg-sap-50 text-sap-700 dark:bg-sap-950/60 dark:text-sap-200'
                      : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white'
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          <div className="ml-auto flex items-center gap-1">
            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              className="hidden h-9 items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 text-[12.5px] text-slate-500 transition-colors hover:border-sap-300 hover:bg-white sm:inline-flex dark:border-slate-700 dark:bg-slate-800/60 dark:text-slate-400 dark:hover:border-sap-700"
            >
              <Search className="h-3.5 w-3.5" />
              <span className="hidden xl:inline">搜索教程、命令、配置…</span>
              <kbd className="ml-2 hidden rounded border border-slate-200 bg-white px-1 py-0.5 font-mono text-[10px] xl:inline dark:border-slate-600 dark:bg-slate-900">Ctrl K</kbd>
            </button>
            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-slate-600 hover:bg-slate-100 sm:hidden dark:text-slate-300 dark:hover:bg-slate-800"
              aria-label="搜索"
            >
              <Search className="h-[18px] w-[18px]" />
            </button>
            <Link
              href="/my"
              className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
              title="我的学习（收藏 / 进度 / 最近阅读）"
              aria-label="我的学习"
            >
              <BookMarked className="h-[18px] w-[18px]" />
            </Link>
            <ThemeToggle />
          </div>
        </div>
      </header>

      <SearchDialog open={searchOpen} onOpenChange={setSearchOpen} index={searchIndex} />

      <Dialog.Root open={menuOpen} onOpenChange={setMenuOpen}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 z-[110] bg-slate-950/50 lg:hidden" />
          <Dialog.Content className="fixed inset-y-0 left-0 z-[111] flex w-[min(320px,86vw)] flex-col border-r border-slate-200 bg-white shadow-2xl outline-none lg:hidden dark:border-slate-700 dark:bg-slate-900">
            <Dialog.Title className="flex items-center justify-between border-b border-slate-200 px-4 py-3 text-sm font-semibold dark:border-slate-800">
              教程目录
              <Dialog.Close className="rounded-md p-1 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800"><X className="h-4 w-4" /></Dialog.Close>
            </Dialog.Title>
            <div className="min-h-0 flex-1">
              <Sidebar onNavigate={() => setMenuOpen(false)} />
            </div>
            <div className="grid grid-cols-2 gap-2 border-t border-slate-200 p-3 text-xs dark:border-slate-800">
              {navLinks.filter((l) => l.href !== '/tutorials').map((l) => (
                <Link key={l.href} href={l.href} onClick={() => setMenuOpen(false)} className="rounded-lg bg-slate-50 px-3 py-2 text-center font-medium text-slate-700 dark:bg-slate-800 dark:text-slate-200">
                  {l.label}
                </Link>
              ))}
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </>
  );
}
