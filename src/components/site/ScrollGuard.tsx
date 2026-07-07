'use client';

import { useEffect, useRef } from 'react';

import { hasRecentNavIntent } from '@/lib/scroll-to-section';

const WORK_ID = 'work';
const INIT_LOCK_MS = 1500;

function stripHash() {
  if (!window.location.hash) return;
  history.replaceState(null, '', `${window.location.pathname}${window.location.search}`);
}

function scrollToWorkTop() {
  const work = document.getElementById(WORK_ID);
  if (!work) return false;
  const top = work.getBoundingClientRect().top;
  return top >= -80 && top <= window.innerHeight * 0.55;
}

export function ScrollGuard() {
  const userIntentRef = useRef(false);
  const navIntentRef = useRef(false);
  const lastYRef = useRef(0);

  useEffect(() => {
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }

    stripHash();

    const lockToTop = () => {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    };

    lockToTop();
    requestAnimationFrame(lockToTop);
    window.setTimeout(lockToTop, 0);
    window.setTimeout(lockToTop, 120);
    window.setTimeout(lockToTop, 320);

    lastYRef.current = window.scrollY;
    const mountedAt = Date.now();

    const markUserIntent = () => {
      userIntentRef.current = true;
    };

    const markNavIntent = (event: Event) => {
      const target = event.target;
      if (!(target instanceof Element)) return;
      if (target.closest('[data-scroll-intent="true"]')) {
        navIntentRef.current = true;
      }
    };

    window.addEventListener('wheel', markUserIntent, { passive: true });
    window.addEventListener('touchstart', markUserIntent, { passive: true });
    window.addEventListener('touchmove', markUserIntent, { passive: true });
    window.addEventListener('keydown', (event) => {
      if (
        ['ArrowDown', 'ArrowUp', 'PageDown', 'PageUp', ' ', 'Home', 'End'].includes(
          event.key,
        )
      ) {
        markUserIntent();
      }
    });
    document.addEventListener('click', markNavIntent, true);

    const onHashChange = () => {
      const hash = window.location.hash.slice(1);
      stripHash();

      if (hash === WORK_ID && !navIntentRef.current) {
        window.scrollTo({ top: lastYRef.current, behavior: 'instant' });
      }
    };

    window.addEventListener('hashchange', onHashChange);

    const onScroll = () => {
      const currentY = window.scrollY;
      const delta = currentY - lastYRef.current;

      // Only the cheap checks run on every scroll frame. The layout-reading
      // scrollToWorkTop() (getBoundingClientRect) is deferred until a large
      // downward jump with no user/nav intent could actually be a spurious
      // auto-scroll worth cancelling — avoiding forced reflow while scrolling.
      const suspiciousJump =
        delta > 100 &&
        !userIntentRef.current &&
        !navIntentRef.current &&
        !hasRecentNavIntent() &&
        Date.now() - mountedAt >= INIT_LOCK_MS;

      if (suspiciousJump && scrollToWorkTop()) {
        window.scrollTo({ top: lastYRef.current, behavior: 'instant' });
        return;
      }

      lastYRef.current = currentY;
      userIntentRef.current = false;
      navIntentRef.current = false;
    };

    window.addEventListener('scroll', onScroll, { passive: true });

    const blockIframeFocusScroll = (event: FocusEvent) => {
      const target = event.target;
      if (!(target instanceof HTMLIFrameElement)) return;

      const scrollY = window.scrollY;
      target.blur();

      requestAnimationFrame(() => {
        if (window.scrollY !== scrollY) {
          window.scrollTo({ top: scrollY, behavior: 'instant' });
        }
      });
    };

    document.addEventListener('focusin', blockIframeFocusScroll);

    return () => {
      window.removeEventListener('wheel', markUserIntent);
      window.removeEventListener('touchstart', markUserIntent);
      window.removeEventListener('touchmove', markUserIntent);
      document.removeEventListener('click', markNavIntent, true);
      window.removeEventListener('hashchange', onHashChange);
      window.removeEventListener('scroll', onScroll);
      document.removeEventListener('focusin', blockIframeFocusScroll);
    };
  }, []);

  return null;
}
