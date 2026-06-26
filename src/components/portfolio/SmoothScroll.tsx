'use client';

import Lenis from 'lenis';
import { createContext, useContext, useEffect, useState } from 'react';

const LenisContext = createContext<Lenis | null>(null);

export function useLenis() {
  return useContext(LenisContext);
}

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const [lenis, setLenis] = useState<Lenis | null>(null);

  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const instance = new Lenis({
      lerp: reducedMotion ? 1 : 0.085,
      smoothWheel: !reducedMotion,
    });

    setLenis(instance);

    let frame = 0;
    const raf = (time: number) => {
      instance.raf(time);
      frame = requestAnimationFrame(raf);
    };

    frame = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(frame);
      instance.destroy();
      setLenis(null);
    };
  }, []);

  return <LenisContext.Provider value={lenis}>{children}</LenisContext.Provider>;
}
