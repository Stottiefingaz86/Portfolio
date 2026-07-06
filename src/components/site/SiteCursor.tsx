'use client';

import { AnimatePresence, motion, useMotionValue, useReducedMotion, useSpring } from 'framer-motion';
import { useCallback, useEffect, useState } from 'react';

import { cn } from '@/lib/utils';

const INTERACTIVE_SELECTOR = [
  'a[href]',
  'button',
  'input:not([type="hidden"])',
  'textarea',
  'select',
  'summary',
  '[role="button"]',
  '[role="link"]',
  '[role="menuitem"]',
  '[role="tab"]',
  'label[for]',
  '.menu-trigger',
  '.menu-overlay-link',
  '.contact-link',
  '.work-text-row-inner',
  '.testimonials-controls__btn',
  '.testimonial-card',
  '.blog-row__inner',
  '.hud-hover-surface',
  '.btn',
  '[data-scroll-intent="true"]',
].join(', ');

const TEXT_SELECTOR = 'input:not([type="hidden"]), textarea, [contenteditable="true"]';

type Pulse = {
  id: number;
  hover: boolean;
};

function getCursorState(target: EventTarget | null) {
  if (!(target instanceof Element)) {
    return { hover: false, text: false };
  }

  if (target.closest(TEXT_SELECTOR)) {
    return { hover: false, text: true };
  }

  return {
    hover: Boolean(target.closest(INTERACTIVE_SELECTOR)),
    text: false,
  };
}

export function SiteCursor() {
  const reduced = useReducedMotion();
  const [enabled, setEnabled] = useState(false);
  const [visible, setVisible] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [pressing, setPressing] = useState(false);
  const [hiddenForText, setHiddenForText] = useState(false);
  const [pulses, setPulses] = useState<Pulse[]>([]);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);

  const cursorScale = useSpring(
    hovering ? (pressing ? 4.4 : 3.75) : pressing ? 2.1 : 1,
    reduced
      ? { stiffness: 700, damping: 42, mass: 0.2 }
      : { stiffness: 520, damping: 32, mass: 0.22 },
  );

  const removePulse = useCallback((id: number) => {
    setPulses((current) => current.filter((pulse) => pulse.id !== id));
  }, []);

  useEffect(() => {
    const coarsePointer = window.matchMedia('(pointer: coarse)').matches;
    const noHover = window.matchMedia('(hover: none)').matches;

    if (coarsePointer || noHover) return;

    setEnabled(true);
    document.body.classList.add('site-cursor-active');

    let visibleRef = false;
    let hoveringRef = false;
    let hiddenForTextRef = false;

    const applyCursorState = (target: EventTarget | null) => {
      const state = getCursorState(target);

      if (hoveringRef !== state.hover) {
        hoveringRef = state.hover;
        setHovering(state.hover);
      }

      if (hiddenForTextRef !== state.text) {
        hiddenForTextRef = state.text;
        setHiddenForText(state.text);
      }
    };

    const onMove = (event: PointerEvent) => {
      x.set(event.clientX);
      y.set(event.clientY);

      if (!visibleRef) {
        visibleRef = true;
        setVisible(true);
      }

      applyCursorState(event.target);
    };

    const onOver = (event: MouseEvent) => {
      applyCursorState(event.target);
    };

    const onLeave = () => {
      visibleRef = false;
      setVisible(false);
    };
    const onDown = (event: PointerEvent) => {
      setPressing(true);
      setPulses((current) => [
        ...current.slice(-2),
        { id: event.timeStamp, hover: getCursorState(event.target).hover },
      ]);
    };
    const onUp = () => setPressing(false);

    document.addEventListener('pointermove', onMove, { passive: true });
    document.addEventListener('mouseover', onOver, { passive: true });
    document.addEventListener('pointerdown', onDown, { passive: true });
    document.addEventListener('pointerup', onUp, { passive: true });
    document.documentElement.addEventListener('mouseleave', onLeave);

    return () => {
      document.body.classList.remove('site-cursor-active');
      document.removeEventListener('pointermove', onMove);
      document.removeEventListener('mouseover', onOver);
      document.removeEventListener('pointerdown', onDown);
      document.removeEventListener('pointerup', onUp);
      document.documentElement.removeEventListener('mouseleave', onLeave);
    };
  }, [x, y]);

  if (!enabled) return null;

  return (
    <motion.div
      className={cn('site-cursor-wrap', visible && 'is-visible', hiddenForText && 'is-hidden')}
      aria-hidden
      style={{ x, y }}
    >
      <AnimatePresence>
        {!reduced &&
          pulses.map((pulse) => (
            <motion.span
              key={pulse.id}
              className={cn('site-cursor-pulse', pulse.hover && 'is-hover')}
              initial={{ scale: 1, opacity: 0.55 }}
              animate={{ scale: pulse.hover ? 5.5 : 4.25, opacity: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              onAnimationComplete={() => removePulse(pulse.id)}
            />
          ))}
      </AnimatePresence>

      <motion.div
        className={cn(
          'site-cursor',
          hovering && 'is-hover',
          pressing && 'is-pressing',
        )}
        style={{ scale: cursorScale }}
      />
    </motion.div>
  );
}
