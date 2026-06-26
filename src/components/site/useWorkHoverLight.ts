'use client';

import { useCallback } from 'react';

export function useWorkHoverLight() {
  const onPointerMove = useCallback((event: React.PointerEvent<HTMLElement>) => {
    const surface = event.currentTarget;
    const rect = surface.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;

    surface.style.setProperty('--light-x', `${x}%`);
    surface.style.setProperty('--light-y', `${y}%`);
  }, []);

  const onPointerLeave = useCallback((event: React.PointerEvent<HTMLElement>) => {
    event.currentTarget.style.setProperty('--light-x', '22%');
    event.currentTarget.style.setProperty('--light-y', '50%');
  }, []);

  return { onPointerMove, onPointerLeave };
}
