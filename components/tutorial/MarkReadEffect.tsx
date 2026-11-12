'use client';

import { useEffect } from 'react';
import { useProgress } from '@/lib/progress';

/** 打开教程时写入最近阅读（LocalStorage） */
export function MarkReadEffect({ id, title, href }: { id: string; title: string; href: string }) {
  const { markRead, ready } = useProgress();
  useEffect(() => {
    if (ready) markRead({ id, title, href });
  }, [ready, id, title, href, markRead]);
  return null;
}
