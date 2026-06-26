'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { useEffect, useState } from 'react';

import { useMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';

const TRACKER_SECTIONS = [
  { id: 'top' },
  { id: 'journey' },
  { id: 'expertise' },
  { id: 'work' },
  { id: 'leadership' },
  { id: 'about' },
  { id: 'contact' },
] as const;

const SECTION_IDS = TRACKER_SECTIONS.map((section) => section.id);

const LINE_SPRING = { type: 'spring', stiffness: 340, damping: 30, mass: 0.75 } as const;

function getActiveSectionId() {
  const marker = window.innerHeight * 0.32;
  let activeId: (typeof SECTION_IDS)[number] = SECTION_IDS[0];

  for (const id of SECTION_IDS) {
    const section = document.getElementById(id);
    if (!section) continue;
    if (section.getBoundingClientRect().top <= marker) activeId = id;
  }

  return activeId;
}

export function MobileDock() {
  const isMobile = useMobile();
  const reduced = useReducedMotion();
  const [activeId, setActiveId] = useState<(typeof SECTION_IDS)[number]>('top');

  useEffect(() => {
    if (!isMobile) return;

    const update = () => setActiveId(getActiveSectionId());

    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);

    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, [isMobile]);

  if (!isMobile) return null;

  const activeIndex = Math.max(
    0,
    TRACKER_SECTIONS.findIndex((section) => section.id === activeId),
  );

  return (
    <div className="mobile-tracker" aria-hidden="true">
      <ul className="mobile-tracker-list">
        {TRACKER_SECTIONS.map(({ id }, index) => {
          const isActive = index === activeIndex;

          return (
            <li key={id} className="mobile-tracker-item">
              <motion.span
                className={cn('mobile-tracker-line', isActive && 'is-active')}
                initial={false}
                animate={{
                  height: isActive ? 18 : 10,
                  opacity: isActive ? 1 : 0.28,
                }}
                transition={reduced ? { duration: 0 } : LINE_SPRING}
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
}
