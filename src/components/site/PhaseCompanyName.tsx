'use client';

import { ArrowUpRightIcon } from 'lucide-react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { useCallback, useEffect, useRef, useState, type PointerEvent as ReactPointerEvent } from 'react';
import { createPortal } from 'react-dom';

import type { CareerPhaseCompany } from '@/lib/portfolio-data';
import { playJourneyHoverSound } from '@/lib/site-sounds';
import { cn } from '@/lib/utils';

function companyMeta(company: CareerPhaseCompany) {
  const parts = [company.year, company.location, company.detail].filter(Boolean);
  return parts.length > 0 ? parts.join(' · ') : null;
}

type CardPosition = {
  left: number;
  top: number;
};

function PhaseCompanyCard({
  company,
  position,
  reduced,
}: {
  company: CareerPhaseCompany;
  position: CardPosition;
  reduced: boolean | null;
}) {
  const meta = companyMeta(company);

  return (
    <span
      className="phase-company-card-anchor"
      style={{ left: position.left, top: position.top }}
    >
      <motion.span
        role="tooltip"
        className="phase-company-card"
        initial={reduced ? false : { opacity: 0, y: 6, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={reduced ? undefined : { opacity: 0, y: 4, scale: 0.98 }}
        transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
      >
        {company.role ? <span className="phase-company-card__role">{company.role}</span> : null}
        {company.summary ? (
          <span className="phase-company-card__summary">{company.summary}</span>
        ) : null}
        {meta ? <span className="phase-company-card__meta">{meta}</span> : null}
      </motion.span>
    </span>
  );
}

export function PhaseCompanyTrigger({
  company,
  className,
  location,
}: {
  company: CareerPhaseCompany;
  className?: string;
  location?: string | null;
}) {
  const reduced = useReducedMotion();
  const triggerRef = useRef<HTMLSpanElement>(null);
  const [open, setOpen] = useState(false);
  const [position, setPosition] = useState<CardPosition | null>(null);
  const [mounted, setMounted] = useState(false);
  const [canHover, setCanHover] = useState(false);
  const hasCard = Boolean(company.role || company.summary);

  const updatePosition = useCallback(() => {
    const trigger = triggerRef.current;
    if (!trigger) return;

    const rect = trigger.getBoundingClientRect();
    setPosition({
      left: rect.left,
      top: rect.top,
    });
  }, []);

  useEffect(() => {
    setMounted(true);
    setCanHover(window.matchMedia('(hover: hover) and (pointer: fine)').matches);
  }, []);

  useEffect(() => {
    if (!open) return;

    updatePosition();

    // On hover-capable devices, keep the card pinned to the trigger as the
    // page moves. On touch, any scroll or outside tap dismisses it.
    const onScroll = () => {
      if (canHover) {
        updatePosition();
      } else {
        setOpen(false);
      }
    };
    const onOutsidePointerDown = (event: PointerEvent) => {
      if (canHover) return;
      const trigger = triggerRef.current;
      if (trigger && event.target instanceof Node && trigger.contains(event.target)) {
        return;
      }
      setOpen(false);
    };

    window.addEventListener('scroll', onScroll, true);
    window.addEventListener('resize', updatePosition);
    document.addEventListener('pointerdown', onOutsidePointerDown, true);

    return () => {
      window.removeEventListener('scroll', onScroll, true);
      window.removeEventListener('resize', updatePosition);
      document.removeEventListener('pointerdown', onOutsidePointerDown, true);
    };
  }, [open, updatePosition, canHover]);

  const onEnter = useCallback(
    (event: ReactPointerEvent) => {
      if (!hasCard || event.pointerType !== 'mouse') return;
      updatePosition();
      setOpen(true);
      playJourneyHoverSound();
    },
    [hasCard, updatePosition],
  );

  const onLeave = useCallback(
    (event: ReactPointerEvent) => {
      if (event.pointerType !== 'mouse') return;
      setOpen(false);
    },
    [],
  );

  const onFocus = useCallback(() => {
    if (!hasCard) return;
    updatePosition();
    setOpen(true);
  }, [hasCard, updatePosition]);

  const onBlur = useCallback(() => {
    setOpen(false);
  }, []);

  // Tap-to-toggle on touch/pen. A horizontal swipe on the scroller never
  // fires click, so this only responds to a deliberate tap.
  const onClick = useCallback(() => {
    if (!hasCard || canHover) return;
    updatePosition();
    setOpen((value) => !value);
  }, [hasCard, canHover, updatePosition]);

  if (!hasCard) {
    return (
      <span className={className}>
        <span className="phase-company-trigger__label">{company.name}</span>
        {location ? <span className="phase-company-trigger__location">{location}</span> : null}
      </span>
    );
  }

  return (
    <>
      <span
        ref={triggerRef}
        className={cn('phase-company-trigger', open && 'is-open', className)}
        onPointerEnter={onEnter}
        onPointerLeave={onLeave}
        onFocus={onFocus}
        onBlur={onBlur}
        onClick={onClick}
        tabIndex={0}
      >
        <span className="phase-company-trigger__head">
          <span className="phase-company-trigger__label">{company.name}</span>
          <ArrowUpRightIcon className="phase-company-trigger__arrow" aria-hidden />
        </span>
        {location ? <span className="phase-company-trigger__location">{location}</span> : null}
      </span>

      {mounted && position
        ? createPortal(
            <AnimatePresence>
              {open ? (
                <PhaseCompanyCard company={company} position={position} reduced={reduced} />
              ) : null}
            </AnimatePresence>,
            document.body,
          )
        : null}
    </>
  );
}
