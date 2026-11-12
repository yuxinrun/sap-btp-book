import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import GithubSlugger from 'github-slugger';
import { navIndex } from '@/data/navigation';
import { stripMarkdown } from './utils';
import { projects } from '@/data/projects';
import { glossaryTerms } from '@/data/glossary';
import { errorKnowledgeBase, commandCheatsheets } from '@/data/cheatsheets';

const TUTORIAL_DIR = path.join(process.cwd(), 'content', 'tutorials');

export type Difficulty = '入门' | '进阶' | '高级';

export interface TutorialFrontmatter {
  title: string;
  description: string;
  difficulty: Difficulty;
  duration: string;
  audience: string;
  keywords: string[];
  updated: string;
  docVersion: string;
  related: string[];
  officialDocs: { title: string; url: string }[];
  objectives: string[];
  prerequisites: string[];
  cockpitPath: string;
  caveat?: string;
}

export interface TocItem {
  id: string;
  text: string;
  level: 2 | 3;
}

export interface Tutorial {
  id: string;
  frontmatter: TutorialFrontmatter;
  content: string;
  toc: TocItem[];
}

/** gray-matter 会把 YAML 中的 YYYY-MM-DD 解析成 Date，这里统一归一化为字符串 */
function asDateString(value: unknown, fallback = '2026-11-10'): string {
  if (typeof value === 'string') return value;
  if (value instanceof Date && !Number.isNaN(value.getTime())) return value.toISOString().slice(0, 10);
  return fallback;
}

function readTutorialFile(file: string): Tutorial | null {
  const raw = fs.readFileSync(path.join(TUTORIAL_DIR, file), 'utf8');
  const parsed = matter(raw);
  const fm = parsed.data as Partial<TutorialFrontmatter>;
  if (!fm.title) return null;
  return {
    id: file.replace(/\.mdx$/, ''),
    frontmatter: {
      title: fm.title,
      description: fm.description ?? '',
      difficulty: fm.difficulty ?? '入门',
      duration: fm.duration ?? '20 分钟',
      audience: fm.audience ?? 'SAP BTP 初学者',
      keywords: Array.isArray(fm.keywords) ? fm.keywords.map(String) : [],
      updated: asDateString(fm.updated),
      docVersion: fm.docVersion ?? '以 SAP Help Portal 当前版本为准',
      related: Array.isArray(fm.related) ? fm.related.map(String) : [],
      officialDocs: Array.isArray(fm.officialDocs)
        ? fm.officialDocs.filter((d): d is { title: string; url: string } => Boolean(d && typeof d.title === 'string' && typeof d.url === 'string'))
        : [],
      objectives: Array.isArray(fm.objectives) ? fm.objectives.map(String) : [],
      prerequisites: Array.isArray(fm.prerequisites) ? fm.prerequisites.map(String) : [],
      cockpitPath: typeof fm.cockpitPath === 'string' ? fm.cockpitPath : '',
      caveat: typeof fm.caveat === 'string' ? fm.caveat : undefined,
    },
    content: parsed.content,
    toc: extractToc(parsed.content),
  };
}

export function getTutorialIds(): string[] {
  if (!fs.existsSync(TUTORIAL_DIR)) return [];
  return fs.readdirSync(TUTORIAL_DIR).filter((f) => f.endsWith('.mdx')).map((f) => f.replace(/\.mdx$/, ''));
}

// 构建时会多次读取同一批 MDX（layout / sitemap / 首页 / docs），做进程内缓存
const tutorialCache = new Map<string, Tutorial | null>();

export function getTutorial(id: string): Tutorial | null {
  if (!/^[a-z0-9-]+$/.test(id)) return null;
  if (tutorialCache.has(id)) return tutorialCache.get(id) ?? null;
  const file = path.join(TUTORIAL_DIR, `${id}.mdx`);
  const result = fs.existsSync(file) ? readTutorialFile(`${id}.mdx`) : null;
  tutorialCache.set(id, result);
  return result;
}

export function getAllTutorials(): Tutorial[] {
  return getTutorialIds()
    .map((id) => getTutorial(id))
    .filter((t): t is Tutorial => Boolean(t))
    .sort((a, b) => b.frontmatter.updated.localeCompare(a.frontmatter.updated));
}

export function extractToc(source: string): TocItem[] {
  const slugger = new GithubSlugger();
  const items: TocItem[] = [];
  const lines = source.split('\n');
  let inFence = false;
  for (const line of lines) {
    if (/^\s*```/.test(line)) {
      inFence = !inFence;
      continue;
    }
    if (inFence) continue;
    const match = /^(#{2,3})\s+(.+?)\s*#*$/.exec(line);
    if (!match) continue;
    const text = match[2].replace(/[*_`]/g, '').trim();
    items.push({ id: slugger.slug(text), text, level: match[1].length as 2 | 3 });
  }
  return items;
}

// ---------------------------------------------------------------------------
// 全站搜索索引（构建时生成，交给客户端搜索组件）
// ---------------------------------------------------------------------------
export interface SearchDocument {
  id: string;
  title: string;
  brief: string;
  href: string;
  group: string;
  section: string;
  kind: '完整教程' | '知识速览' | '实战项目' | '站点页面' | '术语' | '排错';
  body: string;
  headings: string[];
}

const staticPages: SearchDocument[] = [
  { id: 'page-home', title: '首页', brief: 'SAP BTP 中文学习中心，从零入门到企业级实战。', href: '/', group: '站点', section: '导航', kind: '站点页面', body: 'SAP BTP 中文学习中心 首页 学习路线 教程目录 实战项目 视频中心 资源下载 搜索', headings: [] },
  { id: 'page-learn', title: '六阶段学习路线', brief: 'BTP 基础、BTP 管理、安全认证、应用开发、部署集成、企业级实战。', href: '/learn', group: '站点', section: '学习路线', kind: '站点页面', body: '学习路线 第一阶段 BTP 基础 第二阶段 BTP 管理 第三阶段 安全认证 第四阶段 应用开发 第五阶段 部署与集成 第六阶段 企业级实战 学习进度', headings: [] },
  { id: 'page-projects', title: '实战项目中心', brief: '六个端到端实战项目，含 XSUAA 登录、CAP + HANA、SAPUI5 与 S/4HANA 集成。', href: '/projects', group: '站点', section: '实战项目', kind: '站点页面', body: '实战项目 Node.js XSUAA CAP HANA Cloud SAPUI5 Fiori Cloud Connector S/4HANA', headings: [] },
  { id: 'page-videos', title: '视频中心', brief: 'SAP 官方视频与课程资源入口，支持响应式 YouTube 嵌入。', href: '/videos', group: '站点', section: '视频', kind: '站点页面', body: '视频 SAP Technology YouTube SAP Developers SAP Learning 官方课程', headings: [] },
  { id: 'page-resources', title: '资源中心', brief: '命令速查、配置文件速查、错误排错知识库、常见问题与官方学习资源。', href: '/resources', group: '站点', section: '资源', kind: '站点页面', body: '资源中心 命令速查 配置速查 错误代码 排错 知识库 FAQ 官方文档 图片说明', headings: [] },
  { id: 'page-glossary', title: '术语词典', brief: 'SAP BTP 常用术语的中文解释与英文对照。', href: '/glossary', group: '站点', section: '词典', kind: '站点页面', body: '术语词典 XSUAA JWT Scope Role Collection Destination Cloud Connector Entitlements', headings: [] },
];

let cachedSearchIndex: SearchDocument[] | undefined;

export function buildSearchIndex(): SearchDocument[] {
  if (cachedSearchIndex) return cachedSearchIndex;
  const tutorials = new Map(getAllTutorials().map((t) => [t.id, t]));
  const projectIds = new Set(projects.map((p) => p.id));

  const navDocs: SearchDocument[] = navIndex.leaves.map((leaf) => {
    const tutorial = tutorials.get(leaf.id);
    return {
      id: leaf.id,
      title: leaf.title,
      brief: tutorial?.frontmatter.description ?? leaf.brief,
      href: leaf.href,
      group: leaf.groupTitle,
      section: leaf.sectionTitle,
      kind: tutorial ? '完整教程' : projectIds.has(leaf.id) ? '实战项目' : '知识速览',
      body: tutorial ? stripMarkdown(tutorial.content).slice(0, 6000) : leaf.brief,
      headings: tutorial?.toc.map((t) => t.text) ?? [],
    } satisfies SearchDocument;
  });

  const glossaryDocs: SearchDocument[] = glossaryTerms.map((g) => ({
    id: `glossary-${g.en.replace(/\s+/g, '-').toLowerCase()}`,
    title: `${g.term}（${g.en}）`,
    brief: g.definition,
    href: `/glossary#${encodeURIComponent(g.term)}`,
    group: '术语词典',
    section: g.category,
    kind: '术语',
    body: `${g.term} ${g.en} ${g.definition}`,
    headings: [],
  }));

  const errorDocs: SearchDocument[] = errorKnowledgeBase.map((e) => ({
    id: e.id,
    title: e.symptom,
    brief: `${e.category}：${e.causes[0]}`,
    href: `/resources#${e.id}`,
    group: '排错知识库',
    section: e.category,
    kind: '排错',
    body: `${e.symptom} ${e.causes.join(' ')} ${e.checks.join(' ')}`,
    headings: [],
  }));

  const commandDocs: SearchDocument[] = commandCheatsheets.flatMap((group) =>
    group.entries.map((entry) => ({
      id: `cmd-${group.id}-${entry.command.replace(/[^a-z0-9]/gi, '-').slice(0, 40)}`,
      title: entry.command,
      brief: entry.description,
      href: `/resources#${group.id}`,
      group: '命令速查',
      section: group.title,
      kind: '站点页面' as const,
      body: `${entry.command} ${entry.description}`,
      headings: [],
    }))
  );

  cachedSearchIndex = [...staticPages, ...navDocs, ...glossaryDocs, ...errorDocs, ...commandDocs];
  return cachedSearchIndex;
}
