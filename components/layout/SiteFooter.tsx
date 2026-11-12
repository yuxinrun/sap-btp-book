import Link from 'next/link';

const links = [
  { href: '/learn', label: '学习路线' },
  { href: '/tutorials', label: '教程目录' },
  { href: '/projects', label: '实战项目' },
  { href: '/videos', label: '视频中心' },
  { href: '/resources', label: '资源中心' },
  { href: '/glossary', label: '术语词典' },
  { href: '/my', label: '我的学习' },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-900/60">
      <div className="mx-auto max-w-[1680px] px-5 py-10">
        <div className="flex flex-col justify-between gap-8 md:flex-row">
          <div className="max-w-md">
            <div className="flex items-center gap-2.5">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-sap-500 to-sap-700 text-[11px] font-black text-white">SAP</span>
              <span className="text-sm font-bold text-slate-900 dark:text-slate-50">SAP BTP 中文学习中心</span>
            </div>
            <p className="mt-3 text-xs leading-6 text-slate-500 dark:text-slate-400">
              从零入门到企业级实战，系统掌握 SAP Business Technology Platform。本站为独立制作的中文学习网站，非 SAP 官方网站；所有重要技术结论请以 SAP Help Portal 当前版本文档与实际租户界面为准。
            </p>
          </div>
          <div className="grid grid-cols-2 gap-x-10 gap-y-2 text-xs sm:grid-cols-3">
            {links.map((l) => (
              <Link key={l.href} href={l.href} className="text-slate-600 hover:text-sap-600 dark:text-slate-400 dark:hover:text-sap-300">{l.label}</Link>
            ))}
          </div>
        </div>
        <div className="mt-8 flex flex-col gap-2 border-t border-slate-200 pt-5 text-[11px] text-slate-400 dark:border-slate-800 sm:flex-row sm:items-center sm:justify-between">
          <span>SAP、SAP BTP、SAPUI5、Fiori、HANA 等为 SAP SE 或其关联公司的商标，本站仅用于技术教学说明。</span>
          <span>内容更新：2026-11-10 · 示意图均为本站自绘</span>
        </div>
      </div>
    </footer>
  );
}
