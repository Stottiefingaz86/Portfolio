'use client';

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

export function MobileDock() {
  const isMobile = useMobile();
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

  return (
    <nav className="mobile-dock" aria-label="Mobile navigation">
      <ul className="mobile-dock-list">
        {DOCK_ITEMS.map(({ id, label, icon: Icon }) => {
          const isActive = activeId === id;

          return (
            <li key={id}>
              <a
                href={`#${id}`}
                className={cn('mobile-dock-link', isActive && 'is-active')}
                aria-label={label}
                aria-current={isActive ? 'location' : undefined}
              >
                <Icon aria-hidden className="mobile-dock-icon" strokeWidth={1.75} />
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
