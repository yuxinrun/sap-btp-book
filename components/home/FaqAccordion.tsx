'use client';

import Link from 'next/link';
import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { faqEntries } from '@/data/cheatsheets';
import { cn } from '@/lib/utils';

export function FaqAccordion() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="divide-y divide-slate-200 overflow-hidden rounded-xl border border-slate-200 bg-white dark:divide-slate-700 dark:border-slate-700 dark:bg-slate-800/40">
      {faqEntries.map((faq, i) => (
        <div key={faq.question}>
          <button
            type="button"
            onClick={() => setOpen(open === i ? null : i)}
            aria-expanded={open === i}
            className="flex w-full items-center justify-between gap-4 px-5 py-3.5 text-left text-sm font-medium text-slate-800 hover:bg-slate-50 dark:text-slate-100 dark:hover:bg-slate-800"
          >
            <span>{faq.question}</span>
            <ChevronDown className={cn('h-4 w-4 shrink-0 text-slate-400 transition-transform', open === i && 'rotate-180')} />
          </button>
          {open === i && (
            <div className="px-5 pb-4 text-[13px] leading-7 text-slate-600 dark:text-slate-300">
              {faq.answer}
              <Link href={faq.href} className="ml-2 whitespace-nowrap font-medium text-sap-600 hover:underline dark:text-sap-300">查看详情 →</Link>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
