/**
 * 站点部署路径工具。
 *
 * GitHub Pages 项目页位于子路径（如 /sap-btp-book/）下：next/link 与 router.push
 * 会自动附加 basePath，但原生 <a> / <img> 不会，需要走 withBasePath 补齐。
 */
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? 'https://sap-btp-cn.example.com').replace(/\/$/, '');
export const BASE_PATH = (process.env.NEXT_PUBLIC_BASE_PATH ?? '').replace(/\/$/, '');

/** canonical / sitemap / Open Graph 使用的绝对地址 */
export function siteUrl(path: string): string {
  return `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`;
}

/** 站内绝对路径 → 带部署子路径的 URL；外部链接、纯锚点等原样返回 */
export function withBasePath(href: string): string {
  if (!href || !href.startsWith('/') || href.startsWith('//')) return href;
  if (!BASE_PATH || href === BASE_PATH || href.startsWith(`${BASE_PATH}/`)) return href;

  const cut = Math.min(href.length, ...[href.indexOf('#'), href.indexOf('?')].filter((i) => i !== -1));
  const pathname = href.slice(0, cut);
  const suffix = href.slice(cut);
  const normalized = pathname.endsWith('/') || /\.[a-z0-9]+$/i.test(pathname) ? pathname : `${pathname}/`;
  return `${BASE_PATH}${normalized}${suffix}`;
}
