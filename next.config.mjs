/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  eslint: { ignoreDuringBuilds: true },
  output: 'standalone',
  // 260+ 静态页在多个构建 worker 中首次加载应用 bundle 时冷启动较慢，
  // 放宽单页超时并限制并发，避免首批页面触发 60s 重试。
  staticPageGenerationTimeout: 180,
  experimental: {
    staticGenerationMaxConcurrency: 2,
    staticGenerationMinPagesPerWorker: 50,
  },
};

export default nextConfig;
