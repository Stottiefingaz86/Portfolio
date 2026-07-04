'use client';

import { Volume2Icon, VolumeXIcon } from 'lucide-react';
import { useEffect, useState } from 'react';

import { useSiteSoundMuted } from '@/components/site/useSiteSoundMuted';
import { playSiteSound, triggerSiteAmbience } from '@/lib/site-sounds';
import { NAV_SECTIONS } from '@/lib/portfolio-data';
import { scrollToSection } from '@/lib/scroll-to-section';
import { cn } from '@/lib/utils';

export function SiteNav() {
  const [open, setOpen] = useState(false);
  const { muted, toggle: toggleSound } = useSiteSoundMuted();

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  return (
    <>
      <div className="site-nav-controls site-nav-controls--float">
        <button
          type="button"
          className={cn('menu-trigger menu-trigger--icon-only', muted && 'menu-trigger--muted')}
          aria-pressed={muted}
          aria-label={muted ? 'Unmute site sounds' : 'Mute site sounds'}
          onClick={toggleSound}
        >
          <span className="menu-trigger-icon menu-trigger-icon--sound" aria-hidden>
            {muted ? <VolumeXIcon /> : <Volume2Icon />}
          </span>
        </button>

        <button
          type="button"
          className={cn('menu-trigger', open && 'menu-trigger--open')}
          aria-expanded={open}
          aria-controls="site-menu"
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => {
            setOpen((value) => {
              if (!value) {
                playSiteSound('menu');
                triggerSiteAmbience();
              }
              return !value;
            });
          }}
        >
          <span className="menu-trigger-icon" aria-hidden>
            <span className="menu-trigger-line menu-trigger-line--a" />
            <span className="menu-trigger-line menu-trigger-line--b" />
            <span className="menu-trigger-line menu-trigger-line--c" />
          </span>
          <span className="menu-trigger-label">{open ? 'Close' : 'Menu'}</span>
        </button>
      </div>

      <div
        id="site-menu"
        className={cn('menu-overlay', open && 'menu-overlay--open')}
        aria-hidden={!open}
      >
        <nav className="menu-overlay-nav" aria-label="Primary">
          <ol className="menu-overlay-list">
            {NAV_SECTIONS.map((item, index) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  className="menu-overlay-link"
                  data-scroll-intent="true"
                  onClick={(event) => {
                    event.preventDefault();
                    setOpen(false);
                    scrollToSection(item.id);
                  }}
                >
                  <span className="menu-overlay-index">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <span className="menu-overlay-label">{item.label}</span>
                </a>
              </li>
            ))}
          </ol>
        </nav>
      </div>
    </>
  );
}
