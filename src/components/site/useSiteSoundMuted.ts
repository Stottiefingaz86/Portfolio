'use client';

import { useCallback, useEffect, useState } from 'react';

import {
  setSiteSoundMuted,
  subscribeSiteSoundMute,
  toggleSiteSoundMuted,
} from '@/lib/site-sounds';

export function useSiteSoundMuted() {
  const [muted, setMuted] = useState(false);

  useEffect(() => subscribeSiteSoundMute(setMuted), []);

  const toggle = useCallback(() => {
    toggleSiteSoundMuted();
  }, []);

  const setMutedState = useCallback((value: boolean) => {
    setSiteSoundMuted(value);
  }, []);

  return { muted, toggle, setMuted: setMutedState };
}
