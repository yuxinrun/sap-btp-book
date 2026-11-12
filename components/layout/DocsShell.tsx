import { Sidebar } from '@/components/sidebar/Sidebar';

/** 三栏文档骨架：左侧固定目录 / 中间正文 / 右侧章节与学习进度 */
export function DocsShell({ children, right }: { children: React.ReactNode; right?: React.ReactNode }) {
  return (
    <div className="mx-auto flex w-full max-w-[1680px] items-start">
      <aside className="sticky top-14 hidden h-[calc(100vh-3.5rem)] w-[278px] shrink-0 self-start border-r border-slate-200 lg:block dark:border-slate-800">
        <Sidebar />
      </aside>
      <main className="min-w-0 flex-1">{children}</main>
      {right && (
        <aside className="scrollbar-thin sticky top-14 hidden h-[calc(100vh-3.5rem)] w-[264px] shrink-0 self-start overflow-y-auto border-l border-slate-200 px-4 py-6 xl:block dark:border-slate-800">
          {right}
        </aside>
      )}
    </div>
  );
}
