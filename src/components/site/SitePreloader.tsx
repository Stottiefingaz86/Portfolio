'use client';

import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

import { HeroLogoMark } from '@/components/site/hud/HeroLogoMark';
import {
  consumePreloaderSession,
  preloadCriticalAssets,
} from '@/lib/preload-assets';
import { SITE } from '@/lib/portfolio-data';

const EASE = [0.16, 1, 0.3, 1] as const;
const MIN_VISIBLE_MS = 1400;
const MAX_WAIT_MS = 4500;

const STATUS_STEPS = [
  'INITIALIZING',
  'LOADING ASSETS',
  'CALIBRATING HUD',
  'READY',
] as const;

function statusForProgress(progress: number) {
  if (progress >= 0.98) return STATUS_STEPS[3];
  if (progress >= 0.62) return STATUS_STEPS[2];
  if (progress >= 0.2) return STATUS_STEPS[1];
  return STATUS_STEPS[0];
}

export function SitePreloader() {
  const pathname = usePathname();
  const reduced = useReducedMotion();
  const [active, setActive] = useState(false);
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (pathname !== '/') return;
    if (!consumePreloaderSession()) return;

    setActive(true);
    document.documentElement.classList.add('site-preloading');

    let cancelled = false;
    const startedAt = Date.now();
    let assetProgress = 0;

    const updateProgress = (next: number) => {
      assetProgress = Math.max(assetProgress, next);
      const elapsed = Date.now() - startedAt;
      const timeProgress = Math.min(elapsed / MIN_VISIBLE_MS, 1);
      const blended = Math.min(1, assetProgress * 0.72 + timeProgress * 0.28);
      if (!cancelled) setProgress(blended);
    };

    updateProgress(0.04);

    const preloadPromise = preloadCriticalAssets((value) => updateProgress(value));
    const minDelay = new Promise<void>((resolve) => {
      window.setTimeout(resolve, MIN_VISIBLE_MS);
    });
    const maxDelay = new Promise<void>((resolve) => {
      window.setTimeout(resolve, MAX_WAIT_MS);
    });

    void Promise.race([Promise.all([preloadPromise, minDelay]), maxDelay]).then(() => {
      if (cancelled) return;
      updateProgress(1);

      window.setTimeout(() => {
        if (cancelled) return;
        setVisible(false);
        window.setTimeout(() => {
          if (cancelled) return;
          setActive(false);
          document.documentElement.classList.remove('site-preloading');
        }, reduced ? 0 : 520);
      }, reduced ? 0 : 280);
    });

    return () => {
      cancelled = true;
      document.documentElement.classList.remove('site-preloading');
    };
  }, [pathname, reduced]);

  const status = statusForProgress(progress);
  const progressPct = Math.round(progress * 100);

  return (
    <AnimatePresence>
      {active && visible ? (
        <motion.div
          className="site-preloader"
          role="status"
          aria-live="polite"
          aria-label="Loading portfolio"
          initial={reduced ? false : { opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={reduced ? undefined : { opacity: 0 }}
          transition={{ duration: 0.5, ease: EASE }}
        >
          <div className="site-preloader__grid" aria-hidden />
          <div className="site-preloader__glow" aria-hidden />

          <div className="site-preloader__panel">
            <p className="site-preloader__code" aria-hidden>
              [ BOOT // {SITE.portfolioYear} ]
            </p>

            <div className="site-preloader__logo">
              <HeroLogoMark src={SITE.siteLogo} alt={SITE.siteLogoAlt} />
            </div>

            <p className="site-preloader__name">{SITE.name}</p>

            <div className="site-preloader__track" aria-hidden>
              <motion.span
                className="site-preloader__fill"
                initial={false}
                animate={{ scaleX: progress }}
                transition={{ duration: reduced ? 0 : 0.35, ease: EASE }}
              />
              <span className="site-preloader__scan" />
            </div>

            <div className="site-preloader__meta">
              <span className="site-preloader__status">{status}</span>
              <span className="site-preloader__pct">{String(progressPct).padStart(3, '0')}%</span>
            </div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
