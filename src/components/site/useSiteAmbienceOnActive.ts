'use client';

import { useEffect, useRef } from 'react';

import { triggerHighlightFeedback } from '@/lib/site-sounds';

/** Play highlight SFX each time a scroll-spied row becomes active. */
export function useSiteAmbienceOnActive(active: boolean) {
  const wasActive = useRef(false);

  useEffect(() => {
    if (active && !wasActive.current) {
      triggerHighlightFeedback();
    }
    wasActive.current = active;
  }, [active]);
}
