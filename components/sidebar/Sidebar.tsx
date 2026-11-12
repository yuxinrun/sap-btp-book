'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import {
  AppWindow, Blocks, BookOpen, Boxes, Cable, ChartNoAxesCombined, ChevronRight,
  CircleDot, Cloud, FolderGit2, Gauge, Layers, Layers3, LayoutDashboard,
  ShieldCheck, UsersRound, type LucideIcon,
} from 'lucide-react';
import { navigation, totalTutorials } from '@/data/navigation';
import { cn } from '@/lib/utils';

interface SidebarProps {
  onNavigate?: () => void;
  className?: string;
}

const STORAGE_KEY = 'sap-btp-cn:sidebar-expanded:v1';

const iconMap: Record<string, LucideIcon> = {
  BookOpen, LayoutDashboard, Blocks, Cloud, Layers, AppWindow, Cable,
  ShieldCheck, UsersRound, Gauge, ChartNoAxesCombined, Boxes, FolderGit2,
};

function GroupIcon({ name, className }: { name: string; className?: string }) {
  const Icon = iconMap[name] ?? Layers3;
  return <Icon className={className} />;
}

export function Sidebar({ onNavigate, className }: SidebarProps) {
  const pathname = usePathname();
  const [expanded, setExpanded] = useState<string[]>([]);

  const activeId = useMemo(() => {
    const match = /^\/docs\/([^/]+)$/.exec(pathname);
    return match ? decodeURIComponent(match[1]) : '';
  }, [pathname]);

  const activeLeaf = useMemo(
    () => navigation.flatMap((g) => g.sections.flatMap((s) => s.items)).find((l) => l.id === activeId),
    [activeId]
  );

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      const saved: string[] = raw ? JSON.parse(raw) : [];
      const initial = saved.length ? saved : [navigation[0].id];
      const auto = activeLeaf ? [activeLeaf.groupId, activeLeaf.sectionId] : [];
      setExpanded(Array.from(new Set([...initial, ...auto])));
    } catch {
      setExpanded(activeLeaf ? [activeLeaf.groupId, activeLeaf.sectionId] : [navigation[0].id]);
    }
    // 仅在路径变化时同步自动展开
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  function toggle(key: string) {
    setExpanded((prev) => {
      const next = prev.includes(key) ? prev.filter((x) => x !== key) : [...prev, key];
      try { window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next)); } catch { /* ignore */ }
      return next;
    });
  }

  const isOpen = (key: string) => expanded.includes(key);

  return (
    <nav aria-label="教程目录" className={cn('flex h-full flex-col bg-white dark:bg-slate-900/40', className)}>
      <div className="flex items-center justify-between border-b border-slate-200 px-4 py-3 dark:border-slate-800">
        <div>
          <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">教程目录</p>
          <p className="text-[11px] text-slate-500 dark:text-slate-400">按 BTP Cockpit 功能分组 · 共 {totalTutorials} 个条目</p>
        </div>
        <Link
          href="/tutorials"
          onClick={onNavigate}
          className="rounded-md px-2 py-1 text-xs font-medium text-sap-600 hover:bg-sap-50 dark:text-sap-300 dark:hover:bg-sap-950/50"
        >
          全部
        </Link>
      </div>

      <div className="scrollbar-thin flex-1 overflow-y-auto px-2 py-3">
        {navigation.map((group) => {
          const groupOpen = isOpen(group.id);
          const groupActive = activeLeaf?.groupId === group.id;
          return (
            <div key={group.id} className="mb-1">
              <button
                type="button"
                onClick={() => toggle(group.id)}
                aria-expanded={groupOpen}
                className={cn(
                  'flex w-full items-center gap-2 rounded-lg px-2.5 py-2 text-left text-[13px] font-semibold transition-colors',
                  groupActive
                    ? 'bg-sap-50 text-sap-700 dark:bg-sap-950/50 dark:text-sap-200'
                    : 'text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800'
                )}
              >
                <GroupIcon name={group.icon} className="h-4 w-4 shrink-0" />
                <span className="min-w-0 flex-1 truncate">{group.title}</span>
                <span className="text-[10px] font-normal text-slate-400">{group.leafCount}</span>
                <ChevronRight className={cn('h-3.5 w-3.5 shrink-0 text-slate-400 transition-transform', groupOpen && 'rotate-90')} />
              </button>

              {groupOpen && (
                <div className="ml-3 border-l border-slate-200 pl-1 dark:border-slate-700">
                  {group.sections.map((section) => {
                    const sectionOpen = isOpen(section.id);
                    const sectionActive = activeLeaf?.sectionId === section.id;
                    return (
                      <div key={section.id} className="mb-0.5">
                        <button
                          type="button"
                          onClick={() => toggle(section.id)}
                          aria-expanded={sectionOpen}
                          className={cn(
                            'flex w-full items-center gap-1.5 rounded-md px-2 py-1.5 text-left text-[12.5px] font-medium transition-colors',
                            sectionActive ? 'text-sap-700 dark:text-sap-300' : 'text-slate-600 hover:bg-slate-50 dark:text-slate-400 dark:hover:bg-slate-800/60'
                          )}
                        >
                          <ChevronRight className={cn('h-3 w-3 shrink-0 transition-transform', sectionOpen && 'rotate-90')} />
                          <span className="min-w-0 flex-1 truncate">{section.title}</span>
                          <span className="text-[10px] font-normal text-slate-400">{section.items.length}</span>
                        </button>

                        {sectionOpen && (
                          <ul className="mb-1 ml-3 border-l border-slate-100 pl-1 dark:border-slate-800">
                            {section.items.map((leaf) => {
                              const active = leaf.id === activeId;
                              return (
                                <li key={leaf.id}>
                                  <Link
                                    href={leaf.href}
                                    onClick={onNavigate}
                                    aria-current={active ? 'page' : undefined}
                                    className={cn(
                                      'flex items-start gap-1.5 rounded-md px-2 py-1.5 text-[12.5px] leading-5 transition-colors',
                                      active
                                        ? 'bg-sap-500 font-semibold text-white shadow-sm'
                                        : 'text-slate-600 hover:bg-slate-100 hover:text-sap-700 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-sap-300'
                                    )}
                                  >
                                    <CircleDot className={cn('mt-1 h-2.5 w-2.5 shrink-0', active ? 'text-white' : 'text-slate-300 dark:text-slate-600')} />
                                    <span className="min-w-0 flex-1">{leaf.title}</span>
                                  </Link>
                                </li>
                              );
                            })}
                          </ul>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="border-t border-slate-200 px-4 py-3 text-[11px] leading-5 text-slate-500 dark:border-slate-800 dark:text-slate-400">
        菜单结构参考 SAP BTP Cockpit Subaccount 页面分组；本站为独立中文学习网站，不是 SAP 官方产品界面。
      </div>
    </nav>
  );
}
