'use client';

import {
  BriefcaseBusinessIcon,
  CompassIcon,
  HomeIcon,
  LayersIcon,
  MailIcon,
  RouteIcon,
  UserIcon,
} from 'lucide-react';

const DOCK_ITEMS = [
  { id: 'top', label: 'Home', icon: HomeIcon },
  { id: 'journey', label: 'Journey', icon: RouteIcon },
  { id: 'expertise', label: 'Expertise', icon: LayersIcon },
  { id: 'work', label: 'Work', icon: BriefcaseBusinessIcon },
  { id: 'leadership', label: 'Leadership', icon: CompassIcon },
  { id: 'about', label: 'About', icon: UserIcon },
  { id: 'contact', label: 'Contact', icon: MailIcon },
] as const;

export function MobileDock() {
  return (
    <nav className="mobile-dock" aria-label="Mobile navigation">
      <ul className="mobile-dock-list">
        {DOCK_ITEMS.map(({ id, label, icon: Icon }) => (
          <li key={id}>
            <a href={`#${id}`} className="mobile-dock-link" aria-label={label}>
              <Icon aria-hidden className="mobile-dock-icon" strokeWidth={1.75} />
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
