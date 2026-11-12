// GitHub Pages 是纯静态托管，需用 STATIC_EXPORT=1 生成 out/ 目录；
// 其余部署（Vercel / Node.js）保持原来的 standalone 产物。
const staticExport = process.env.STATIC_EXPORT === '1';
const basePath = staticExport ? (process.env.NEXT_PUBLIC_BASE_PATH ?? '').replace(/\/$/, '') : '';

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  eslint: { ignoreDuringBuilds: true },
  output: staticExport ? 'export' : 'standalone',
  ...(basePath ? { basePath, trailingSlash: true } : {}),
  // 260+ 静态页在多个构建 worker 中首次加载应用 bundle 时冷启动较慢，
  // 放宽单页超时并限制并发，避免首批页面触发 60s 重试。
  staticPageGenerationTimeout: 180,
  experimental: {
    staticGenerationMaxConcurrency: 2,
    staticGenerationMinPagesPerWorker: 50,
  },
};

export default nextConfig;
