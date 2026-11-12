import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { compileMDX } from 'next-mdx-remote/rsc';
import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';
import { BookOpen, ExternalLink, MapPin, Target, CheckSquare } from 'lucide-react';
import { DocsShell } from '@/components/layout/DocsShell';
import { Breadcrumbs } from '@/components/navigation/Breadcrumbs';
import { TutorialMeta } from '@/components/tutorial/TutorialMeta';
import { TocSidebar } from '@/components/tutorial/TocSidebar';
import { ArticleFooter } from '@/components/tutorial/ArticleFooter';
import { MarkReadEffect } from '@/components/tutorial/MarkReadEffect';
import { KnowledgeArticle } from '@/components/tutorial/KnowledgeArticle';
import { mdxComponents } from '@/components/tutorial/MdxComponents';
import { getTutorial, type Difficulty, type TocItem, type TutorialFrontmatter } from '@/lib/content';
import { getAdjacent, getBreadcrumb, navIndex } from '@/data/navigation';
import { officialSources } from '@/data/official';
import { siteUrl } from '@/lib/site';

interface PageProps {
  params: Promise<{ id: string }>;
}

export function generateStaticParams() {
  return navIndex.leaves.map((leaf) => ({ id: leaf.id }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const crumb = getBreadcrumb(navIndex, id);
  if (!crumb) return { title: '教程不存在' };
  const tutorial = getTutorial(id);
  return {
    title: crumb.leaf.title,
    description: tutorial?.frontmatter.description ?? crumb.leaf.brief,
    keywords: tutorial?.frontmatter.keywords ?? [crumb.leaf.title, 'SAP BTP', crumb.group?.title ?? ''],
    alternates: { canonical: siteUrl(`/docs/${id}/`) },
    openGraph: {
      title: crumb.leaf.title,
      description: tutorial?.frontmatter.description ?? crumb.leaf.brief,
      type: 'article',
    },
  };
}

export default async function DocPage({ params }: PageProps) {
  const { id } = await params;
  const crumb = getBreadcrumb(navIndex, id);
  if (!crumb || !crumb.group || !crumb.section) notFound();

  const { group, section, leaf } = crumb;
  const tutorial = getTutorial(id);
  const { prev, next } = getAdjacent(navIndex, id);

  let body: React.ReactNode;
  let toc: TocItem[] = [];
  let frontmatter: TutorialFrontmatter;

  if (tutorial) {
    frontmatter = tutorial.frontmatter;
    const { content } = await compileMDX({
      source: tutorial.content,
      components: mdxComponents,
      options: {
        mdxOptions: {
          remarkPlugins: [remarkGfm],
          rehypePlugins: [rehypeSlug],
        },
      },
    });
    body = (
      <div className="article-prose">
        {content}
        <h2 id="sec-23" className="mt-12 mb-4 scroll-mt-24 border-b border-slate-200 pb-2 text-[22px] font-bold text-slate-900 dark:border-slate-700 dark:text-slate-50">23. 相关官方文档</h2>
        <ul>
          {frontmatter.officialDocs.map((doc) => (
            <li key={doc.url}><a href={doc.url} target="_blank" rel="noopener noreferrer">{doc.title} <ExternalLink className="inline h-3 w-3" /></a></li>
          ))}
          {officialSources.slice(0, 3).map((s) => (
            <li key={s.id}><a href={s.url} target="_blank" rel="noopener noreferrer">{s.title} <ExternalLink className="inline h-3 w-3" /></a></li>
          ))}
        </ul>
        <p className="text-xs text-slate-500 dark:text-slate-400">适用版本：{frontmatter.docVersion}。具体配置参数请以当前租户 Cockpit / Service Marketplace 显示为准。</p>

        <h2 id="sec-24" className="mt-12 mb-4 scroll-mt-24 border-b border-slate-200 pb-2 text-[22px] font-bold text-slate-900 dark:border-slate-700 dark:text-slate-50">24. 下一篇推荐教程</h2>
        {next ? (
          <p><Link href={next.href} className="inline-flex items-center gap-1"><BookOpen className="inline h-4 w-4" /> {next.title}</Link>（{next.groupTitle} / {next.sectionTitle}）。也可以按<Link href="/learn">六阶段学习路线</Link>系统学习。</p>
        ) : <p>本条目已是目录末尾，建议返回<Link href="/tutorials">教程目录</Link>复习。</p>}
      </div>
    );
    toc = [
      ...tutorial.toc,
      { id: 'sec-23', text: '23. 相关官方文档', level: 2 },
      { id: 'sec-24', text: '24. 下一篇推荐教程', level: 2 },
    ];
  } else {
    const knowledge = KnowledgeArticle({ leaf, section, group });
    body = knowledge.content;
    toc = knowledge.toc;
    frontmatter = {
      title: leaf.title,
      description: leaf.brief,
      difficulty: (group.id === 'security' || group.id === 'projects' || group.id === 'advanced' ? '进阶' : '入门') as Difficulty,
      duration: '10–15 分钟（速览）',
      audience: 'SAP BTP 初学者、ABAP / Fiori / CAP 开发者与管理员',
      keywords: [leaf.title, group.title, 'SAP BTP'],
      updated: '2026-11-10',
      docVersion: '以 SAP Help Portal 当前版本为准',
      related: section.items.filter((i) => i.id !== id).slice(0, 4).map((i) => i.id),
      officialDocs: section.docs,
      objectives: [],
      prerequisites: [],
      cockpitPath: section.cockpitPath,
    };
  }

  const relatedLinks = frontmatter.related
    .map((rid) => navIndex.byId.get(rid))
    .filter((r): r is NonNullable<typeof r> => Boolean(r))
    .slice(0, 6);
  const related = relatedLinks.length
    ? relatedLinks.map((r) => ({ id: r.id, title: r.title, href: r.href }))
    : section.items.filter((i) => i.id !== id).slice(0, 6).map((i) => ({ id: i.id, title: i.title, href: i.href }));

  return (
    <DocsShell right={<TocSidebar toc={toc} related={related} docId={id} />}>
      <MarkReadEffect id={id} title={leaf.title} href={leaf.href} />
      <div className="mx-auto max-w-[900px] px-4 py-7 sm:px-8 sm:py-9">
        <Breadcrumbs items={[
          { label: '教程目录', href: '/tutorials' },
          { label: group.title, href: `/tutorials#${group.id}` },
          { label: section.title },
          { label: leaf.title },
        ]} />

        <div className="mt-6">
          <div className="mb-2 flex flex-wrap items-center gap-2 text-[11px]">
            <span className="rounded-full bg-sap-50 px-2.5 py-1 font-medium text-sap-700 dark:bg-sap-950/50 dark:text-sap-300">{group.title}</span>
            <span className="rounded-full bg-slate-100 px-2.5 py-1 font-medium text-slate-600 dark:bg-slate-800 dark:text-slate-300">{section.title}</span>
            <span className={`rounded-full px-2.5 py-1 font-medium ${tutorial ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300' : 'bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400'}`}>
              {tutorial ? '完整教程' : '知识速览'}
            </span>
          </div>
          <h1 className="text-balance text-[28px] font-bold leading-tight tracking-tight text-slate-900 sm:text-[34px] dark:text-slate-50">{frontmatter.title}</h1>
          <p className="mt-3 text-[15px] leading-7 text-slate-600 dark:text-slate-400">{frontmatter.description}</p>
        </div>

        <div className="mt-6">
          <TutorialMeta
            id={id}
            title={leaf.title}
            href={leaf.href}
            difficulty={frontmatter.difficulty}
            duration={frontmatter.duration}
            audience={frontmatter.audience}
            updated={frontmatter.updated}
          />
        </div>

        {tutorial && (
          <>
            {(frontmatter.objectives.length > 0 || frontmatter.prerequisites.length > 0) && (
              <div className="mb-8 grid gap-3 sm:grid-cols-2">
                {frontmatter.objectives.length > 0 && (
                  <div className="rounded-xl border border-sap-200 bg-sap-50/60 p-4 dark:border-sap-900 dark:bg-sap-950/30">
                    <h2 className="mb-2 flex items-center gap-2 text-sm font-semibold text-sap-800 dark:text-sap-200"><Target className="h-4 w-4" /> 2. 学习目标</h2>
                    <ul className="space-y-1 text-[13px] leading-6 text-slate-700 dark:text-slate-300">
                      {frontmatter.objectives.map((o) => <li key={o} className="flex gap-2"><span className="text-sap-500">•</span>{o}</li>)}
                    </ul>
                  </div>
                )}
                {frontmatter.prerequisites.length > 0 && (
                  <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-800/40">
                    <h2 className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-800 dark:text-slate-100"><CheckSquare className="h-4 w-4" /> 5. 前置知识</h2>
                    <ul className="space-y-1 text-[13px] leading-6 text-slate-600 dark:text-slate-300">
                      {frontmatter.prerequisites.map((p) => <li key={p} className="flex gap-2"><span className="text-sap-500">•</span>{p}</li>)}
                    </ul>
                  </div>
                )}
              </div>
            )}
            {frontmatter.cockpitPath && (
              <div className="mb-8 flex items-start gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-[13px] dark:border-slate-700 dark:bg-slate-800/40">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-sap-500" />
                <div>
                  <span className="font-semibold text-slate-800 dark:text-slate-100">9. SAP BTP Cockpit 菜单位置：</span>
                  <code className="ml-1 text-sap-700 dark:text-sap-300">{frontmatter.cockpitPath}</code>
                  <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">菜单名称随账号类型、区域与产品版本可能变化，请以实际租户界面为准。</p>
                </div>
              </div>
            )}
          </>
        )}

        {frontmatter.caveat && (
          <div className="mb-6 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-[13px] leading-6 text-amber-900 dark:border-amber-900 dark:bg-amber-950/30 dark:text-amber-100">
            <strong>版本与适用性说明：</strong>{frontmatter.caveat}
          </div>
        )}

        {body}

        <ArticleFooter
          prev={prev ? { title: prev.title, href: prev.href } : undefined}
          next={next ? { title: next.title, href: next.href } : undefined}
        />
      </div>
    </DocsShell>
  );
}
