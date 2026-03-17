'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type DisplayMode = 'web' | 'mobile';

interface ModeContextType {
  mode: DisplayMode;
  setMode: (mode: DisplayMode) => void;
  isAutoDetected: boolean;
}

const ModeContext = createContext<ModeContextType>({
  mode: 'web',
  setMode: () => {},
  isAutoDetected: true,
});

export function ModeProvider({ children }: { children: ReactNode }) {
  const [mode, setModeState] = useState<DisplayMode>('web');
  const [isAutoDetected, setIsAutoDetected] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem('health_display_mode');
    if (saved === 'web' || saved === 'mobile') {
      setModeState(saved);
      setIsAutoDetected(false);
    } else {
      const isMobile = window.innerWidth < 768;
      setModeState(isMobile ? 'mobile' : 'web');
      setIsAutoDetected(true);
    }
  }, []);

  const setMode = (newMode: DisplayMode) => {
    setModeState(newMode);
    setIsAutoDetected(false);
    localStorage.setItem('health_display_mode', newMode);
  };

  if (!mounted) return <>{children}</>;

  return (
    <ModeContext.Provider value={{ mode, setMode, isAutoDetected }}>
      {children}
    </ModeContext.Provider>
  );
}

export function useMode() {
  return useContext(ModeContext);
}
