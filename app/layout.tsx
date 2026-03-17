import type { Metadata, Viewport } from 'next';
import './globals.css';
import Providers from '@/components/Providers';
import ClientLayout from '@/components/ClientLayout';

export const metadata: Metadata = {
  title: '健康管理',
  description: '科学记录每日营养摄入与运动消耗，助您实现健康目标',
  manifest: '/manifest.json',
  icons: {
    icon: '/favicon.svg',
    apple: '/favicon.svg',
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: '健康管理',
  },
};

export const viewport: Viewport = {
  themeColor: '#16a34a',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN">
      <body className="min-h-screen bg-gray-50">
        <Providers>
          <ClientLayout>{children}</ClientLayout>
        </Providers>
      </body>
    </html>
  );
}
