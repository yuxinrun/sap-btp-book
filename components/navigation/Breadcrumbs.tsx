import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';

export interface Crumb {
  label: string;
  href?: string;
}

export function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="面包屑导航" className="flex flex-wrap items-center gap-1 text-[12px] text-slate-500 dark:text-slate-400">
      <Link href="/" className="inline-flex items-center gap-1 hover:text-sap-600 dark:hover:text-sap-300">
        <Home className="h-3.5 w-3.5" /> 首页
      </Link>
      {items.map((item, i) => (
        <span key={`${item.label}-${i}`} className="inline-flex items-center gap-1">
          <ChevronRight className="h-3 w-3 text-slate-300 dark:text-slate-600" />
          {item.href ? (
            <Link href={item.href} className="hover:text-sap-600 dark:hover:text-sap-300">{item.label}</Link>
          ) : (
            <span className="max-w-[320px] truncate font-medium text-slate-700 dark:text-slate-200">{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}
