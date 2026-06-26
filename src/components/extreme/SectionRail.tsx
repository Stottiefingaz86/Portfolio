'use client';

import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import { useCallback, useEffect, useRef, useState } from 'react';

import { SIDE_NAV, type SideNavItem } from '@/lib/portfolio-data';
import { cn } from '@/lib/utils';

export function SectionRail() {
  const [activeId, setActiveId] = useState(SIDE_NAV[0].id);
  const [hovered, setHovered] = useState<SideNavItem | null>(null);
  const [previewTop, setPreviewTop] = useState(0);
  const [visible, setVisible] = useState(false);
  const itemRefs = useRef<Map<string, HTMLAnchorElement>>(new Map());

  useEffect(() => {
    const sections = SIDE_NAV.map((item) => document.getElementById(item.id)).filter(
      Boolean,
    ) as HTMLElement[];

    const onScroll = () => setVisible(window.scrollY > 120);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });

    if (!sections.length) {
      return () => window.removeEventListener('scroll', onScroll);
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const intersecting = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (intersecting[0]?.target.id) {
          setActiveId(intersecting[0].target.id);
        }
      },
      { rootMargin: '-42% 0px -42% 0px', threshold: [0, 0.15, 0.35, 0.55] },
    );

    sections.forEach((section) => observer.observe(section));

    return () => {
      window.removeEventListener('scroll', onScroll);
      observer.disconnect();
    };
  }, []);

  const onItemEnter = useCallback((item: SideNavItem) => {
    const node = itemRefs.current.get(item.id);
    if (!node) return;
    const rect = node.getBoundingClientRect();
    setPreviewTop(rect.top + rect.height / 2);
    setHovered(item);
  }, []);

  return (
    <>
      <aside
        aria-label="Page sections"
        className={cn(
          'section-index pointer-events-none fixed right-0 top-1/2 z-[calc(var(--z-nav)-2)] hidden -translate-y-1/2 transition-opacity duration-300 xl:block',
          visible ? 'opacity-100' : 'opacity-0',
        )}
      >
        <div className="section-index-glass pointer-events-auto rounded-l-2xl border border-[var(--x-line-strong)] border-r-0 bg-[rgb(8_9_13_/_0.92)] py-4 pl-3 pr-3 shadow-[-8px_0_32px_rgb(0_0_0_/_0.35)]">
          <nav className="flex flex-col gap-1">
            {SIDE_NAV.map((item, index) => {
              const isActive = activeId === item.id;

              return (
                <a
                  key={item.id}
                  ref={(node) => {
                    if (node) itemRefs.current.set(item.id, node);
                    else itemRefs.current.delete(item.id);
                  }}
                  href={`#${item.id}`}
                  title={item.label}
                  onMouseEnter={() => onItemEnter(item)}
                  onMouseLeave={() => setHovered(null)}
                  onFocus={() => onItemEnter(item)}
                  onBlur={() => setHovered(null)}
                  className={cn(
                    'group flex items-center gap-2 rounded-md py-1.5 pl-1 pr-2 outline-none transition-colors',
                    'focus-visible:bg-[rgb(255_255_255_/_0.04)]',
                    isActive && 'bg-[rgb(255_255_255_/_0.05)]',
                  )}
                  aria-current={isActive ? 'location' : undefined}
                  aria-label={`${String(index + 1).padStart(2, '0')} ${item.label}`}
                >
                  <span
                    className={cn(
                      'h-px shrink-0 transition-all duration-300 ease-out',
                      isActive
                        ? 'w-5 bg-[var(--x-ink)]'
                        : 'w-2.5 bg-[var(--x-line-strong)] group-hover:w-3.5 group-hover:bg-[var(--x-ink-soft)]',
                    )}
                    aria-hidden
                  />
                  <span
                    className={cn(
                      'font-[family-name:var(--font-mono)] text-[10px] tabular-nums leading-none',
                      isActive
                        ? 'text-[var(--x-ink)]'
                        : 'text-[var(--x-muted)] group-hover:text-[var(--x-ink-soft)]',
                    )}
                  >
                    {String(index + 1).padStart(2, '0')}
                  </span>
                </a>
              );
            })}
          </nav>
        </div>
      </aside>

      <AnimatePresence>
        {hovered ? (
          <motion.div
            key={hovered.id}
            initial={{ opacity: 0, x: 8 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 6 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="pointer-events-none fixed z-[calc(var(--z-nav)-1)] hidden w-[min(240px,calc(100vw-4rem))] -translate-y-1/2 overflow-hidden rounded-lg border border-[var(--x-line)] bg-[var(--x-canvas-elevated)] shadow-[0_16px_48px_rgb(0_0_0_/_0.4)] xl:block"
            style={{
              right: '4.5rem',
              top: previewTop,
            }}
          >
            <div className="relative aspect-[4/5] w-full">
              <Image
                src={hovered.preview}
                alt={hovered.previewAlt}
                fill
                className="object-cover object-top"
                sizes="240px"
              />
            </div>
            <p className="border-t border-[var(--x-line)] px-3 py-2 font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-[0.12em] text-[var(--x-ink-soft)]">
              {hovered.label}
            </p>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
