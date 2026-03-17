'use client';

import { ReactNode } from 'react';
import { ToastProvider } from '@/components/Toast';
import { ModeProvider } from '@/components/ModeContext';

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <ToastProvider>
      <ModeProvider>{children}</ModeProvider>
    </ToastProvider>
  );
}
