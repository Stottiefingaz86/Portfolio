'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { useEffect, useState } from 'react';

import {
  BriefcaseBusinessIcon,
  CompassIcon,
  HomeIcon,
  LayersIcon,
  MailIcon,
  RouteIcon,
  UserIcon,
} from 'lucide-react';

import { useMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';

const DOCK_ITEMS = [
  { id: 'top', icon: HomeIcon },
  { id: 'journey', icon: RouteIcon },
  { id: 'expertise', icon: LayersIcon },
  { id: 'work', icon: BriefcaseBusinessIcon },
  { id: 'leadership', icon: CompassIcon },
  { id: 'about', icon: UserIcon },
  { id: 'contact', icon: MailIcon },
] as const;

const SECTION_IDS = DOCK_ITEMS.map((item) => item.id);
const SLOT_COUNT = DOCK_ITEMS.length;

const INDICATOR_SPRING = { type: 'spring', stiffness: 300, damping: 32, mass: 0.82 } as const;

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
    DOCK_ITEMS.findIndex((item) => item.id === activeId),
  );
  const slotWidth = 100 / SLOT_COUNT;

  return (
    <div className="mobile-dock" aria-hidden="true">
      <div className="mobile-dock-bar">
        <motion.span
          className="mobile-dock-indicator"
          initial={false}
          animate={{
            left: `calc(${activeIndex * slotWidth}% + 3px)`,
            width: `calc(${slotWidth}% - 6px)`,
          }}
          transition={reduced ? { duration: 0 } : INDICATOR_SPRING}
        />

        <ul className="mobile-dock-list">
          {DOCK_ITEMS.map(({ id, icon: Icon }, index) => (
            <li key={id} className="mobile-dock-item">
              <Icon
                aria-hidden
                className={cn('mobile-dock-icon', index === activeIndex && 'is-active')}
                strokeWidth={index === activeIndex ? 2 : 1.65}
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
