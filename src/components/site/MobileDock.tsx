'use client';

import { motion, useReducedMotion } from 'framer-motion';
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
} from 'react';

import { useMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';

const TRACKER_SECTIONS = [
  { id: 'top', label: 'Top' },
  { id: 'journey', label: 'Journey' },
  { id: 'work', label: 'Work' },
  { id: 'expertise', label: 'Expertise' },
  { id: 'leadership', label: 'Leadership' },
  { id: 'testimonials', label: 'Testimonials' },
  { id: 'about', label: 'About' },
  { id: 'blog', label: 'Blog' },
  { id: 'contact', label: 'Contact' },
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

function clamp01(value: number) {
  return Math.min(1, Math.max(0, value));
}

export function MobileDock() {
  const isMobile = useMobile();
  const reduced = useReducedMotion();
  const [activeId, setActiveId] = useState<(typeof SECTION_IDS)[number]>('top');
  const [dragging, setDragging] = useState(false);

  const listRef = useRef<HTMLUListElement>(null);
  const draggingRef = useRef(false);
  const movedRef = useRef(false);
  const startXRef = useRef(0);

  useEffect(() => {
    if (!isMobile) return;

    let ticking = false;

    const update = () => {
      setActiveId(getActiveSectionId());
      ticking = false;
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', update);

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', update);
    };
  }, [isMobile]);

  const ratioForClientX = useCallback((clientX: number) => {
    const list = listRef.current;
    if (!list) return 0;
    const rect = list.getBoundingClientRect();
    if (rect.width === 0) return 0;
    return clamp01((clientX - rect.left) / rect.width);
  }, []);

  const scrollToProgress = useCallback((ratio: number) => {
    const doc = document.documentElement;
    const max = doc.scrollHeight - window.innerHeight;
    window.scrollTo({ top: max * clamp01(ratio), behavior: 'auto' });
  }, []);

  const scrollToSection = useCallback(
    (index: number) => {
      const id = SECTION_IDS[Math.min(SECTION_IDS.length - 1, Math.max(0, index))];
      const el = document.getElementById(id);
      if (!el) return;
      el.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' });
    },
    [reduced],
  );

  const onPointerDown = useCallback((event: ReactPointerEvent<HTMLDivElement>) => {
    draggingRef.current = true;
    movedRef.current = false;
    startXRef.current = event.clientX;
    setDragging(true);
    event.currentTarget.setPointerCapture(event.pointerId);
  }, []);

  const onPointerMove = useCallback(
    (event: ReactPointerEvent<HTMLDivElement>) => {
      if (!draggingRef.current) return;
      if (Math.abs(event.clientX - startXRef.current) > 4) {
        movedRef.current = true;
      }
      if (movedRef.current) {
        scrollToProgress(ratioForClientX(event.clientX));
      }
    },
    [ratioForClientX, scrollToProgress],
  );

  const endDrag = useCallback(
    (event: ReactPointerEvent<HTMLDivElement>) => {
      if (!draggingRef.current) return;
      draggingRef.current = false;
      setDragging(false);
      try {
        event.currentTarget.releasePointerCapture(event.pointerId);
      } catch {
        /* pointer already released */
      }

      if (!movedRef.current) {
        const ratio = ratioForClientX(event.clientX);
        scrollToSection(Math.round(ratio * (SECTION_IDS.length - 1)));
      }
    },
    [ratioForClientX, scrollToSection],
  );

  if (!isMobile) return null;

  const activeIndex = Math.max(
    0,
    TRACKER_SECTIONS.findIndex((section) => section.id === activeId),
  );
  const activeLabel = TRACKER_SECTIONS[activeIndex]?.label ?? '';

  return (
    <div className="mobile-tracker">
      <div
        className={cn('mobile-tracker-shell', dragging && 'is-dragging')}
        role="slider"
        tabIndex={0}
        aria-label="Drag to scroll through sections"
        aria-valuemin={0}
        aria-valuemax={SECTION_IDS.length - 1}
        aria-valuenow={activeIndex}
        aria-valuetext={activeLabel}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
      >
        <span
          className={cn('mobile-tracker-label', dragging && 'is-visible')}
          aria-hidden
        >
          {activeLabel}
        </span>
        <ul className="mobile-tracker-list" ref={listRef}>
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
    </div>
  );
}
