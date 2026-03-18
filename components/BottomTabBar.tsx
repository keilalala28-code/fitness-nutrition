'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const TABS = [
  { href: '/', label: '今日', icon: '🏠' },
  { href: '/exercise', label: '运动', icon: '🏃' },
  { href: '/weight', label: '体重/维度', icon: '⚖️' },
  { href: '/me', label: '我的', icon: '👤' },
];

export default function BottomTabBar() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-40">
      <div className="flex h-16">
        {TABS.map(tab => {
          const isActive =
            tab.href === '/'
              ? pathname === '/' || pathname === ''
              : pathname.startsWith(tab.href);
          return (
            <Link
              key={tab.href}
              href={tab.href}
              className={`flex-1 flex flex-col items-center justify-center gap-0.5 transition-colors ${
                isActive ? 'text-primary-600' : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              <span className="text-2xl leading-none">{tab.icon}</span>
              <span className={`text-xs font-medium ${isActive ? 'text-primary-600' : ''}`}>
                {tab.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
