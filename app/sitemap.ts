import type { MetadataRoute } from 'next';
import { navIndex } from '@/data/navigation';
import { projects } from '@/data/projects';
import { getAllTutorials } from '@/lib/content';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://sap-btp-cn.example.com';

export default function sitemap(): MetadataRoute.Sitemap {
  const updated = '2026-11-10';
  const staticRoutes = ['', '/learn', '/tutorials', '/projects', '/videos', '/resources', '/glossary', '/my'].map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified: updated,
    changeFrequency: 'weekly' as const,
    priority: path === '' ? 1 : 0.7,
  }));

  const tutorials = new Set(getAllTutorials().map((t) => t.id));
  const docs = navIndex.leaves.map((leaf) => ({
    url: `${SITE_URL}${leaf.href}`,
    lastModified: updated,
    changeFrequency: 'monthly' as const,
    priority: tutorials.has(leaf.id) ? 0.9 : 0.6,
  }));

  const projectPages = projects.map((p) => ({
    url: `${SITE_URL}/projects/${p.id}`,
    lastModified: updated,
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  return [...staticRoutes, ...docs, ...projectPages];
}
