import type { Metadata, Viewport } from 'next';
import Link from 'next/link';
import './globals.css';
import { getDataVersion } from '@/lib/foods';
import Providers from '@/components/Providers';

export const metadata: Metadata = {
  title: '健身营养计算器',
  description: '面向健身人群的每日营养摄入计算与追踪工具',
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: '健身营养计算器',
  },
};

export const viewport: Viewport = {
  themeColor: '#16a34a',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const dataVersion = getDataVersion();

  return (
    <html lang="zh-CN">
      <body className="min-h-screen bg-gray-50">
      <Providers>
        {/* 导航栏 */}
        <nav className="bg-white shadow-sm border-b border-gray-200">
          <div className="max-w-6xl mx-auto px-4">
            <div className="flex items-center justify-between h-16">
              <Link href="/" className="text-xl font-bold text-primary-600">
                💪 健身营养计算器
              </Link>
              <div className="flex gap-6">
                <Link
                  href="/"
                  className="text-gray-600 hover:text-primary-600 transition-colors"
                >
                  首页
                </Link>
                <Link
                  href="/search"
                  className="text-gray-600 hover:text-primary-600 transition-colors"
                >
                  搜索食物
                </Link>
                <Link
                  href="/diary"
                  className="text-gray-600 hover:text-primary-600 transition-colors"
                >
                  饮食日志
                </Link>
                <Link
                  href="/calculator"
                  className="text-gray-600 hover:text-primary-600 transition-colors"
                >
                  TDEE计算
                </Link>
              </div>
            </div>
          </div>
        </nav>

        {/* 主内容 */}
        <main className="max-w-6xl mx-auto px-4 py-8">
          {children}
        </main>

        {/* 页脚 */}
        <footer className="bg-white border-t border-gray-200 mt-auto">
          <div className="max-w-6xl mx-auto px-4 py-6 text-center text-sm text-gray-500">
            <p>数据来源：《中国食物成分表》、各品牌官方数据、ACSM运动指南</p>
            <p className="mt-1">本工具仅供参考，不构成医学建议</p>
            <p className="mt-2 text-xs text-gray-400">
              数据版本 v{dataVersion.version} · 更新于 {dataVersion.lastUpdated}
            </p>
          </div>
        </footer>
      </Providers>
      </body>
    </html>
  );
}
