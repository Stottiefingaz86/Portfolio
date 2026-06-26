'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';

import { NAV_SECTIONS, SITE } from '@/lib/portfolio-data';
import { cn } from '@/lib/utils';

const MENU_LINKS = NAV_SECTIONS.map((item) =>
  item.id === 'contact' ? { ...item, label: 'Contact' } : item,
);

const menuContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.04, delayChildren: 0.08 },
  },
  exit: { opacity: 0, transition: { staggerChildren: 0.02, staggerDirection: -1 } },
};

const menuItem = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] as const },
  },
  exit: { opacity: 0, y: 10, transition: { duration: 0.18 } },
};

function MenuCloseIcon() {
  return (
    <span className="relative block size-4" aria-hidden>
      <span className="absolute left-0 top-1/2 block h-px w-4 -translate-y-1/2 rotate-45 rounded-full bg-[var(--x-ink)]" />
      <span className="absolute left-0 top-1/2 block h-px w-4 -translate-y-1/2 -rotate-45 rounded-full bg-[var(--x-ink)]" />
    </span>
  );
}

function HamburgerIcon() {
  return (
    <span className="flex flex-col gap-1.5" aria-hidden>
      <span className="block h-px w-5 rounded-full bg-[var(--x-ink)]" />
      <span className="block h-px w-5 rounded-full bg-[var(--x-ink)]" />
    </span>
  );
}

export function ExtremeNav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 48);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <>
      <header
        className={cn(
          'site-nav fixed inset-x-0 top-0 z-[var(--z-nav)] site-pad transition-[background,box-shadow,border-color] duration-300',
          scrolled || open
            ? 'border-b border-[var(--x-line)] bg-[var(--x-canvas)]/88 py-4 backdrop-blur-xl'
            : 'border-b border-transparent py-5',
        )}
      >
        <div className="relative flex items-center justify-between gap-6">
          <a
            href="#top"
            className="site-nav-brand"
            onClick={() => setOpen(false)}
          >
            {SITE.legalName}
          </a>

          <nav className="hidden items-center gap-7 lg:flex" aria-label="Primary">
            {MENU_LINKS.map((item) => (
              <a key={item.id} href={`#${item.id}`} className="site-nav-link">
                {item.label}
              </a>
            ))}
          </nav>

          <button
            type="button"
            aria-expanded={open}
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((value) => !value)}
            className={cn(
              'flex size-10 items-center justify-center rounded-full border border-[var(--x-line)] transition-opacity lg:hidden',
              open && 'opacity-0 pointer-events-none',
            )}
          >
            <HamburgerIcon />
          </button>
        </div>
      </header>

      <AnimatePresence>
        {open ? (
          <>
            <motion.button
              type="button"
              aria-label="Close menu"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-[calc(var(--z-nav)+1)] bg-[var(--x-ink)]/20 backdrop-blur-sm lg:hidden"
              onClick={() => setOpen(false)}
            />
            <motion.aside
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
              className="fixed inset-x-4 top-[4.5rem] z-[calc(var(--z-nav)+2)] overflow-hidden rounded-2xl border border-[var(--x-line)] bg-[var(--x-canvas)] shadow-[0_24px_80px_rgb(0_0_0_/_0.12)] lg:hidden"
            >
              <div className="flex items-center justify-between border-b border-[var(--x-line)] px-6 py-4">
                <span className="site-nav-menu-label">Menu</span>
                <button
                  type="button"
                  aria-label="Close menu"
                  onClick={() => setOpen(false)}
                  className="flex size-8 items-center justify-center rounded-full border border-[var(--x-line)]"
                >
                  <MenuCloseIcon />
                </button>
              </div>

              <motion.nav
                variants={menuContainer}
                initial="hidden"
                animate="show"
                exit="exit"
                className="flex flex-col px-6 py-4"
              >
                {MENU_LINKS.map((item) => (
                  <motion.a
                    key={item.id}
                    href={`#${item.id}`}
                    variants={menuItem}
                    onClick={() => setOpen(false)}
                    className="site-nav-mobile-link"
                  >
                    {item.label}
                  </motion.a>
                ))}
              </motion.nav>
            </motion.aside>
          </>
        ) : null}
      </AnimatePresence>
    </>
  );
}
