'use client';

import * as Dialog from '@radix-ui/react-dialog';
import { X, ZoomIn } from 'lucide-react';
import { useState } from 'react';

interface ZoomableImageProps {
  src: string;
  alt?: string;
  caption?: string;
}

export function ZoomableImage({ src, alt = '', caption }: ZoomableImageProps) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <figure className="my-7">
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="group relative block w-full cursor-zoom-in overflow-hidden rounded-lg border border-slate-200 bg-slate-50 dark:border-slate-700 dark:bg-slate-800/50"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={src} alt={alt} loading="lazy" className="mx-auto max-h-[520px] w-auto max-w-full object-contain" />
          <span className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-md bg-white/90 px-2 py-1 text-xs text-slate-600 opacity-0 shadow transition-opacity group-hover:opacity-100 dark:bg-slate-900/90 dark:text-slate-300">
            <ZoomIn className="h-3.5 w-3.5" /> 点击放大
          </span>
        </button>
        {(caption || alt) && (
          <figcaption className="mt-2 text-center text-xs text-slate-500 dark:text-slate-400">
            {caption ?? alt}
          </figcaption>
        )}
      </figure>

      <Dialog.Root open={open} onOpenChange={setOpen}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 z-[100] bg-slate-950/80 backdrop-blur-sm" />
          <Dialog.Content className="fixed inset-0 z-[101] flex items-center justify-center p-4 outline-none">
            <Dialog.Title className="sr-only">{alt || '图片预览'}</Dialog.Title>
            <Dialog.Close className="absolute right-5 top-5 rounded-full bg-white/10 p-2 text-white hover:bg-white/20">
              <X className="h-5 w-5" />
            </Dialog.Close>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={src} alt={alt} className="max-h-[88vh] max-w-[94vw] rounded-lg object-contain shadow-2xl" />
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </>
  );
}
