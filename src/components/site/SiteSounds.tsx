'use client';

import { useEffect } from 'react';

import {
  initSiteSoundMute,
  isSiteSoundMuted,
  primeSiteSounds,
  triggerSiteAmbience,
  unlockSiteAudioSync,
} from '@/lib/site-sounds';

export function SiteSounds() {
  useEffect(() => {
    primeSiteSounds();
    initSiteSoundMute();

    const onUserGesture = () => {
      unlockSiteAudioSync();
      if (!isSiteSoundMuted()) {
        triggerSiteAmbience();
      }
    };

    document.addEventListener('pointerdown', onUserGesture, true);
    window.addEventListener('keydown', onUserGesture, { capture: true });
    window.addEventListener('touchstart', onUserGesture, { capture: true, passive: true });

    return () => {
      document.removeEventListener('pointerdown', onUserGesture, true);
      window.removeEventListener('keydown', onUserGesture, { capture: true });
      window.removeEventListener('touchstart', onUserGesture, { capture: true });
    };
  }, []);

  return null;
}
