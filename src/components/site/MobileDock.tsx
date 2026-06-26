'use client';

import { LayoutGroup, motion, useReducedMotion } from 'framer-motion';
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
  { id: 'top', label: 'Home', icon: HomeIcon },
  { id: 'journey', label: 'Journey', icon: RouteIcon },
  { id: 'expertise', label: 'Expertise', icon: LayersIcon },
  { id: 'work', label: 'Work', icon: BriefcaseBusinessIcon },
  { id: 'leadership', label: 'Leadership', icon: CompassIcon },
  { id: 'about', label: 'About', icon: UserIcon },
  { id: 'contact', label: 'Contact', icon: MailIcon },
] as const;

const SECTION_IDS = DOCK_ITEMS.map((item) => item.id);

const BLOB_SPRING = { type: 'spring', stiffness: 420, damping: 34, mass: 0.85 } as const;
const ICON_SPRING = { type: 'spring', stiffness: 380, damping: 30, mass: 0.72 } as const;

function getActiveSectionId() {
  const marker = window.innerHeight * 0.3;
  let activeId: (typeof SECTION_IDS)[number] = SECTION_IDS[0];

  for (const id of SECTION_IDS) {
    const section = document.getElementById(id);
    if (!section) continue;
    if (section.getBoundingClientRect().top <= marker) activeId = id;
  }

  return activeId;
}

function getIconMotion(id: (typeof SECTION_IDS)[number], activeId: (typeof SECTION_IDS)[number]) {
  const isActive = id === activeId;

  if (isActive) {
    return {
      scale: id === 'top' ? 1.42 : 1.18,
      opacity: 1,
    };
  }

  return {
    scale: id === 'top' && activeId === 'top' ? 1.42 : 0.56,
    opacity: 0.16,
  };
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

  return (
    <nav className="mobile-dock" aria-label="Scroll progress">
      <div className="mobile-dock-shell">
        <LayoutGroup id="mobile-dock">
          <ul className="mobile-dock-list">
          {DOCK_ITEMS.map(({ id, label, icon: Icon }) => {
            const isActive = activeId === id;
            const motionState = getIconMotion(id, activeId);

            return (
              <li
                key={id}
                className={cn('mobile-dock-item', isActive && 'mobile-dock-item--active')}
              >
                <a
                  href={`#${id}`}
                  className="mobile-dock-link"
                  aria-label={label}
                  aria-current={isActive ? 'location' : undefined}
                >
                  {isActive ? (
                    <motion.span
                      layoutId="mobile-dock-blob"
                      className="mobile-dock-blob"
                      transition={reduced ? { duration: 0 } : BLOB_SPRING}
                    />
                  ) : null}

                  <motion.span
                    className="mobile-dock-icon-wrap"
                    animate={
                      reduced
                        ? { scale: isActive ? 1 : 0.72, opacity: isActive ? 1 : 0.35 }
                        : motionState
                    }
                    transition={reduced ? { duration: 0 } : ICON_SPRING}
                  >
                    <Icon
                      aria-hidden
                      className={cn('mobile-dock-icon', isActive && 'mobile-dock-icon--active')}
                      strokeWidth={isActive ? 2 : 1.5}
                    />
                  </motion.span>
                </a>
              </li>
            );
          })}
          </ul>
        </LayoutGroup>
      </div>
    </nav>
  );
}
