import type { Metadata, Viewport } from 'next';
import '@/styles/globals.css';
import { Providers } from '@/components/common/Providers';
import { SiteHeader } from '@/components/layout/SiteHeader';
import { SiteFooter } from '@/components/layout/SiteFooter';
import { buildSearchIndex } from '@/lib/content';
import { siteUrl, SITE_URL } from '@/lib/site';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'SAP BTP 中文学习中心 | 从零入门到企业级实战',
    template: '%s | SAP BTP 中文学习中心',
  },
  description: '系统学习 SAP Business Technology Platform：BTP 基础、Cockpit 管理、Cloud Foundry、XSUAA 安全认证、Destinations、CAP + HANA Cloud、SAPUI5 部署与企业级实战项目。',
  keywords: ['SAP BTP', 'SAP Business Technology Platform', 'BTP 中文教程', 'XSUAA', 'Cloud Foundry', 'CAP', 'HANA Cloud', 'Destination', 'Role Collection', 'App Router', 'SAPUI5', 'S/4HANA 集成'],
  authors: [{ name: 'SAP BTP 中文学习中心' }],
  openGraph: {
    type: 'website',
    locale: 'zh_CN',
    siteName: 'SAP BTP 中文学习中心',
    title: 'SAP BTP 中文学习中心 | 从零入门到企业级实战',
    description: '全面掌握 SAP BTP，掌握云平台管理、应用开发、安全认证、服务集成和企业级部署。',
    url: SITE_URL,
  },
  twitter: { card: 'summary_large_image' },
  robots: { index: true, follow: true },
  alternates: { canonical: siteUrl('/') },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#0a6ed1' },
    { media: '(prefers-color-scheme: dark)', color: '#0d1524' },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const searchIndex = buildSearchIndex();

  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <body className="min-h-screen">
        <Providers>
          <SiteHeader searchIndex={searchIndex} />
          {children}
          <SiteFooter />
        </Providers>
      </body>
    </html>
  );
}
