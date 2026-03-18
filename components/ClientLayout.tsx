'use client';

import { ReactNode } from 'react';
import Link from 'next/link';
import { useMode } from '@/components/ModeContext';
import BottomTabBar from '@/components/BottomTabBar';

export default function ClientLayout({ children }: { children: ReactNode }) {
  const { mode, setMode } = useMode();
  const isMobile = mode === 'mobile';

  return (
    <>
      <nav className={`bg-white shadow-sm border-b border-gray-200 ${isMobile ? 'sticky top-0 z-30' : ''}`}>
        <div className="max-w-6xl mx-auto px-4">
          <div className={`flex items-center justify-between ${isMobile ? 'h-12' : 'h-16'}`}>
            <Link
              href="/"
              className={`font-bold text-primary-600 flex items-center gap-1.5 ${isMobile ? 'text-base' : 'text-xl'}`}
            >
              <svg width={isMobile ? 20 : 24} height={isMobile ? 20 : 24} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="16" cy="16" r="16" fill="#16a34a"/>
                <path d="M16 23C16 23 8 18 8 12.5C8 9.5 10.5 7.5 13 8.5C14.3 9 15.3 10 16 11C16.7 10 17.7 9 19 8.5C21.5 7.5 24 9.5 24 12.5C24 18 16 23 16 23Z" fill="white" opacity="0.95"/>
                <polyline points="9,13.5 11.5,13.5 13,10.5 15.5,17 18,11 19.5,14 22.5,14" fill="none" stroke="#16a34a" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              健康管理
            </Link>

            <div className="flex items-center gap-3">
              {!isMobile && (
                <div className="flex gap-5">
                  <Link href="/" className="text-gray-600 hover:text-primary-600 transition-colors text-sm">🏠 今日</Link>
                  <Link href="/exercise" className="text-gray-600 hover:text-primary-600 transition-colors text-sm">🏃 运动</Link>
                  <Link href="/weight" className="text-gray-600 hover:text-primary-600 transition-colors text-sm">⚖️ 体重</Link>
                  <Link href="/me" className="text-gray-600 hover:text-primary-600 transition-colors text-sm">👤 我的</Link>
                  <Link href="/diary" className="text-gray-600 hover:text-primary-600 transition-colors text-sm">📝 日志</Link>
                  <Link href="/calculator" className="text-gray-600 hover:text-primary-600 transition-colors text-sm">📊 计算</Link>
                </div>
              )}

              <button
                onClick={() => setMode(isMobile ? 'web' : 'mobile')}
                className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-600 text-xs font-medium transition-colors"
                title={isMobile ? '切换到网页端' : '切换到移动端'}
              >
                <span>{isMobile ? '🖥️' : '📱'}</span>
                <span className={isMobile ? 'hidden' : 'hidden sm:inline'}>{isMobile ? '网页端' : '移动端'}</span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className={`max-w-6xl mx-auto px-4 ${isMobile ? 'py-4 pb-24' : 'py-8'}`}>
        {children}
      </main>

      {!isMobile && (
        <footer className="bg-white border-t border-gray-200 mt-8">
          <div className="max-w-6xl mx-auto px-4 py-5 text-center text-sm text-gray-500">
            <p>数据来源：《中国食物成分表》· 各品牌官方数据 · ACSM运动指南</p>
            <p className="mt-1 text-xs text-gray-400">本工具仅供参考，不构成医学建议</p>
          </div>
        </footer>
      )}

      {isMobile && <BottomTabBar />}
    </>
  );
}
