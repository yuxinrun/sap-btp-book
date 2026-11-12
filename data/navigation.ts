/**
 * 全站导航数据模型
 * ------------------------------------------------------------------
 * 内容与布局分离：本文件只定义「结构」，具体教程正文放在 content/tutorials/*.mdx，
 * 尚未编写长文的条目由 data/knowledge.ts + 条目的 brief 渲染为「知识速览页」。
 * 新增教程：在对应模块的 items 中加一行 [id, 标题, 一句话定义]，
 * 再到 content/tutorials/<id>.mdx 撰写长文即可自动升级为完整教程页。
 */

export type RawLeaf = [id: string, title: string, brief: string];
export type RawCommand = [command: string, description: string];
export type RawDoc = [title: string, url: string];

export interface RawSection {
  title: string;
  /** 该功能在 SAP BTP Cockpit 中的实际菜单位置 */
  cockpitPath?: string;
  /** 该分类下所有条目共享的真实知识要点 */
  notes?: string[];
  commands?: RawCommand[];
  docs?: RawDoc[];
  items: RawLeaf[];
}

export interface RawGroup {
  id: string;
  title: string;
  shortTitle: string;
  icon: string;
  description: string;
  sections: RawSection[];
}

export interface NavLeaf {
  id: string;
  title: string;
  brief: string;
  href: string;
  groupId: string;
  groupTitle: string;
  sectionId: string;
  sectionTitle: string;
}

export interface NavSection {
  id: string;
  title: string;
  cockpitPath: string;
  notes: string[];
  commands: { command: string; description: string }[];
  docs: { title: string; url: string }[];
  items: NavLeaf[];
}

export interface NavGroup {
  id: string;
  title: string;
  shortTitle: string;
  icon: string;
  description: string;
  sections: NavSection[];
  leafCount: number;
}

function slugify(value: string) {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9\u4e00-\u9fff]+/g, '-')
    .replace(/^-|-$/g, '');
}

export function buildNavigation(specs: RawGroup[]): NavGroup[] {
  return specs.map((group) => {
    const sections: NavSection[] = group.sections.map((section) => ({
      id: `${group.id}/${slugify(section.title)}`,
      title: section.title,
      cockpitPath: section.cockpitPath ?? '',
      notes: section.notes ?? [],
      commands: (section.commands ?? []).map(([command, description]) => ({ command, description })),
      docs: (section.docs ?? []).map(([title, url]) => ({ title, url })),
      items: section.items.map(([id, title, brief]) => ({
        id,
        title,
        brief,
        href: `/docs/${id}`,
        groupId: group.id,
        groupTitle: group.title,
        sectionId: `${group.id}/${slugify(section.title)}`,
        sectionTitle: section.title,
      })),
    }));

    return {
      id: group.id,
      title: group.title,
      shortTitle: group.shortTitle,
      icon: group.icon,
      description: group.description,
      sections,
      leafCount: sections.reduce((sum, s) => sum + s.items.length, 0),
    };
  });
}

export type FlatNavigation = ReturnType<typeof createNavigationIndex>;

export function createNavigationIndex(nav: NavGroup[]) {
  const leaves: NavLeaf[] = nav.flatMap((g) => g.sections.flatMap((s) => s.items));
  const byId = new Map(leaves.map((leaf) => [leaf.id, leaf]));
  return { leaves, byId, nav };
}

export function getBreadcrumb(index: FlatNavigation, id: string) {
  const leaf = index.byId.get(id);
  if (!leaf) return null;
  const group = index.nav.find((g) => g.id === leaf.groupId);
  const section = group?.sections.find((s) => s.id === leaf.sectionId);
  return { leaf, group, section };
}

export function getAdjacent(index: FlatNavigation, id: string) {
  const i = index.leaves.findIndex((l) => l.id === id);
  if (i < 0) return { prev: undefined, next: undefined };
  return {
    prev: i > 0 ? index.leaves[i - 1] : undefined,
    next: i < index.leaves.length - 1 ? index.leaves[i + 1] : undefined,
  };
}

// ---------------------------------------------------------------------------
// 全站导航单例
// ---------------------------------------------------------------------------
import { rawNavigation } from './nav';

export const navigation = buildNavigation(rawNavigation);
export const navIndex = createNavigationIndex(navigation);

export const totalTutorials = navIndex.leaves.length;

