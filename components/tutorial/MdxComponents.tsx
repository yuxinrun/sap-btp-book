import React from 'react';
import { AlertTriangle, CheckCircle2, ExternalLink, Info, PlayCircle, ShieldAlert } from 'lucide-react';
import { highlightCode } from '@/lib/highlight';
import { CopyButton } from '@/components/code/CopyButton';
import { Mermaid } from '@/components/code/Mermaid';
import { ZoomableImage } from '@/components/common/ZoomableImage';
import { YouTubeEmbed } from '@/components/video/YouTubeEmbed';
import { cn } from '@/lib/utils';

function nodeToText(node: React.ReactNode): string {
  if (typeof node === 'string' || typeof node === 'number') return String(node);
  if (Array.isArray(node)) return node.map(nodeToText).join('');
  if (React.isValidElement<{ children?: React.ReactNode }>(node)) return nodeToText(node.props.children);
  return '';
}

/** MDX 中的 pre：轻量同步高亮 + 一键复制；```mermaid 则渲染为架构图 */
export async function CodeBlock({ children, className }: { children?: React.ReactNode; className?: string }) {
  const child = React.Children.toArray(children)[0];
  let code = '';
  let lang = className?.match(/language-([\w-]+)/)?.[1] ?? 'text';
  if (React.isValidElement<{ children?: React.ReactNode; className?: string }>(child)) {
    code = nodeToText(child.props.children).replace(/\n$/, '');
    lang = child.props.className?.match(/language-([\w-]+)/)?.[1] ?? lang;
  } else {
    code = nodeToText(children).replace(/\n$/, '');
  }

  if (lang === 'mermaid') return <Mermaid chart={code} />;

  const html = await highlightCode(code, lang);
  return (
    <div className="my-6 overflow-hidden rounded-xl border border-slate-200 bg-slate-50 dark:border-slate-700 dark:bg-[#0d1524]">
      <div className="flex items-center justify-between border-b border-slate-200 bg-white/70 px-3 py-1.5 dark:border-slate-700 dark:bg-slate-800/50">
        <span className="font-mono text-[11px] uppercase tracking-wider text-slate-500 dark:text-slate-400">{lang}</span>
        <CopyButton code={code} />
      </div>
      <div
        className="scrollbar-thin overflow-x-auto px-4 py-3 text-[13px] leading-6 [&_pre]:!bg-transparent"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  );
}

type CalloutType = 'info' | 'warning' | 'danger' | 'success' | 'verify';

const calloutStyles: Record<CalloutType, { icon: React.ElementType; cls: string; label: string }> = {
  info: { icon: Info, cls: 'border-sap-300 bg-sap-50 text-sap-900 dark:border-sap-800 dark:bg-sap-950/40 dark:text-sap-100', label: '说明' },
  warning: { icon: AlertTriangle, cls: 'border-amber-300 bg-amber-50 text-amber-900 dark:border-amber-800 dark:bg-amber-950/30 dark:text-amber-100', label: '注意' },
  danger: { icon: ShieldAlert, cls: 'border-rose-300 bg-rose-50 text-rose-900 dark:border-rose-900 dark:bg-rose-950/30 dark:text-rose-100', label: '安全提醒' },
  success: { icon: CheckCircle2, cls: 'border-emerald-300 bg-emerald-50 text-emerald-900 dark:border-emerald-800 dark:bg-emerald-950/30 dark:text-emerald-100', label: '验证成功' },
  verify: { icon: CheckCircle2, cls: 'border-violet-300 bg-violet-50 text-violet-900 dark:border-violet-800 dark:bg-violet-950/30 dark:text-violet-100', label: '如何验证' },
};

export function Callout({ type = 'info', title, children }: { type?: CalloutType; title?: string; children?: React.ReactNode }) {
  const style = calloutStyles[type];
  const Icon = style.icon;
  return (
    <aside className={cn('my-6 rounded-xl border px-4 py-3.5 text-[14px] leading-7', style.cls)}>
      <div className="mb-1 flex items-center gap-2 font-semibold">
        <Icon className="h-4 w-4 shrink-0" />
        <span>{title ?? style.label}</span>
      </div>
      <div className="[&>p]:my-1.5 [&>ul]:my-2 [&>ul]:list-disc [&>ul]:pl-5 [&_a]:underline">{children}</div>
    </aside>
  );
}

export function Figure({ src, caption, alt }: { src: string; caption: string; alt?: string }) {
  return <ZoomableImage src={src} alt={alt ?? caption} caption={caption} />;
}

export function OfficialNote({ children, href = 'https://help.sap.com/docs/btp' }: { children?: React.ReactNode; href?: string }) {
  return (
    <div className="my-6 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-[13px] leading-6 text-slate-600 dark:border-slate-700 dark:bg-slate-800/50 dark:text-slate-300">
      <div className="mb-1 flex items-center gap-2 font-semibold text-slate-800 dark:text-slate-100">
        <Info className="h-4 w-4" /> 内容真实性说明
      </div>
      <div className="[&>p]:my-1 [&_a]:underline">{children ?? '请以 SAP Help Portal 当前版本文档与租户实际界面为准。'}</div>
      <a href={href} target="_blank" rel="noopener noreferrer" className="mt-1.5 inline-flex items-center gap-1 font-medium text-sap-600 hover:underline dark:text-sap-300">
        打开官方文档入口 <ExternalLink className="h-3 w-3" />
      </a>
    </div>
  );
}

export function VideoCard({ title, description, href, objectives }: { title: string; description: string; href: string; objectives?: string[] }) {
  return (
    <div className="my-6 overflow-hidden rounded-xl border border-slate-200 dark:border-slate-700">
      <div className="flex items-center gap-2 border-b border-slate-200 bg-slate-50 px-4 py-2 text-sm font-semibold text-slate-800 dark:border-slate-700 dark:bg-slate-800/60 dark:text-slate-100">
        <PlayCircle className="h-4 w-4 text-sap-600" /> {title}
      </div>
      <div className="px-4 py-3 text-[14px] leading-7">
        <p className="my-1">{description}</p>
        {objectives && objectives.length > 0 && (
          <ul className="my-2 list-disc pl-5 text-slate-600 dark:text-slate-400">
            {objectives.map((o) => <li key={o}>{o}</li>)}
          </ul>
        )}
        <a href={href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 font-medium text-sap-600 hover:underline dark:text-sap-300">
          在官方站点观看 <ExternalLink className="h-3 w-3" />
        </a>
      </div>
    </div>
  );
}

function ExternalAnchor({ href, children }: { href?: string; children?: React.ReactNode }) {
  const external = href?.startsWith('http');
  return (
    <a href={href} target={external ? '_blank' : undefined} rel={external ? 'noopener noreferrer' : undefined}>
      {children}
    </a>
  );
}

export const mdxComponents = {
  pre: CodeBlock,
  img: ({ src, alt }: { src?: string; alt?: string }) => <ZoomableImage src={src ?? ''} alt={alt} caption={alt} />,
  table: ({ children }: { children?: React.ReactNode }) => (
    <div className="table-scroll"><table>{children}</table></div>
  ),
  a: ExternalAnchor,
  Callout,
  Figure,
  OfficialNote,
  VideoCard,
  YouTubeEmbed,
  Mermaid,
};
