'use client';

import { useEffect, useState } from 'react';

import { NAV_SECTIONS } from '@/lib/portfolio-data';
import { cn } from '@/lib/utils';

export function SiteNav() {
  const [open, setOpen] = useState(false);

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
      <button
        type="button"
        className={cn('menu-trigger', open && 'menu-trigger--open')}
        aria-expanded={open}
        aria-controls="site-menu"
        aria-label={open ? 'Close menu' : 'Open menu'}
        onClick={() => setOpen((value) => !value)}
      >
        <span className="menu-trigger-icon" aria-hidden>
          <span className="menu-trigger-line menu-trigger-line--a" />
          <span className="menu-trigger-line menu-trigger-line--b" />
          <span className="menu-trigger-line menu-trigger-line--c" />
        </span>
        <span className="menu-trigger-label">{open ? 'Close' : 'Menu'}</span>
      </button>

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
                  onClick={() => setOpen(false)}
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
