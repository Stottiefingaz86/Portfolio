'use client';

import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  type MotionValue,
} from 'framer-motion';
import Image from 'next/image';
import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

import {
  useTestimonialsCollab,
  useTestimonialsViewerActive,
} from '@/components/site/TestimonialsCollabContext';
import { TESTIMONIALS } from '@/lib/portfolio-data';
import { cn } from '@/lib/utils';

const COLLABORATOR_COLORS = ['#ff7262', '#14ae5c', '#9747ff'] as const;

function getInitials(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? '')
    .join('');
}

function randomInRange(min: number, max: number) {
  return min + Math.random() * (max - min);
}

function FigmaCursorPointer({ color }: { color: string }) {
  return (
    <svg
      className="figma-cursor__pointer"
      width="12"
      height="18"
      viewBox="0 0 12 18"
      fill="none"
      aria-hidden
    >
      <path
        d="M1 1L1 14.5L4.25 11.25L7.5 16.75L10 15.5L6.75 10.25L10.75 10.25L1 1Z"
        fill={color}
        stroke="white"
        strokeWidth="1.25"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function FigmaCursorLabel({
  name,
  color,
  avatar,
  initials,
  activity,
}: {
  name: string;
  color: string;
  avatar?: string;
  initials: string;
  activity?: string;
}) {
  return (
    <div className="figma-cursor__label" style={{ backgroundColor: color }}>
      {avatar ? (
        <Image
          src={avatar}
          alt=""
          width={18}
          height={18}
          className="figma-cursor__avatar"
        />
      ) : (
        <span className="figma-cursor__initials">{initials}</span>
      )}
      <span className="figma-cursor__name">{activity ? activity : name}</span>
    </div>
  );
}

function FigmaCursor({
  x,
  y,
  name,
  color,
  avatar,
  initials,
  visible = true,
  fixed = false,
  activity,
}: {
  x: MotionValue<number>;
  y: MotionValue<number>;
  name: string;
  color: string;
  avatar?: string;
  initials: string;
  visible?: boolean;
  fixed?: boolean;
  activity?: string;
}) {
  return (
    <motion.div
      className={cn(
        'figma-cursor',
        fixed && 'figma-cursor--fixed',
        visible && 'is-visible',
      )}
      style={{ x, y }}
      aria-hidden
    >
      <FigmaCursorPointer color={color} />
      <FigmaCursorLabel
        name={name}
        color={color}
        avatar={avatar}
        initials={initials}
        activity={activity}
      />
    </motion.div>
  );
}

function CyrusTypingCursor({
  active,
  reduced,
}: {
  active: boolean;
  reduced: boolean | null;
}) {
  const {
    cyrusName,
    cyrusColor,
    cyrusInitials,
    isTyping,
    isComplete,
    anchorRef,
    containerRef,
    typedText,
  } = useTestimonialsCollab();

  const x = useMotionValue(-120);
  const y = useMotionValue(-120);
  const springX = useSpring(x, { stiffness: 280, damping: 28, mass: 0.35 });
  const springY = useSpring(y, { stiffness: 280, damping: 28, mass: 0.35 });
  const frameRef = useRef<number | null>(null);

  useEffect(() => {
    if (!active) {
      x.set(-120);
      y.set(-120);
      return;
    }

    const updatePosition = () => {
      const container = containerRef.current;
      const card = document.querySelector<HTMLElement>('[data-collab-card="cyrus-moreno"]');
      const anchor = anchorRef.current;

      if (!container || !card) return;

      const containerRect = container.getBoundingClientRect();
      let targetX = 0;
      let targetY = 0;

      if (anchor && typedText.length > 0) {
        const anchorRect = anchor.getBoundingClientRect();
        targetX = anchorRect.left - containerRect.left + 2;
        targetY = anchorRect.top - containerRect.top + 4;
      } else {
        const quote = card.querySelector<HTMLElement>('.testimonial-card__quote');
        const quoteRect = (quote ?? card).getBoundingClientRect();
        targetX = quoteRect.left - containerRect.left + 16;
        targetY = quoteRect.top - containerRect.top + 18;
      }

      x.set(targetX);
      y.set(targetY);
    };

    updatePosition();

    const loop = () => {
      updatePosition();
      frameRef.current = window.requestAnimationFrame(loop);
    };

    if (isTyping) {
      frameRef.current = window.requestAnimationFrame(loop);
    }

    return () => {
      if (frameRef.current !== null) {
        window.cancelAnimationFrame(frameRef.current);
      }
    };
  }, [
    active,
    anchorRef,
    containerRef,
    isTyping,
    typedText.length,
    x,
    y,
  ]);

  const label = isTyping ? 'Typing…' : isComplete ? cyrusName : cyrusName;

  return (
    <FigmaCursor
      x={reduced ? x : springX}
      y={reduced ? y : springY}
      name={cyrusName}
      color={cyrusColor}
      initials={cyrusInitials}
      visible={active && (isTyping || isComplete || typedText.length === 0)}
      activity={isTyping ? label : undefined}
    />
  );
}

function RichardWanderingCursor({
  active,
  reduced,
}: {
  active: boolean;
  reduced: boolean | null;
}) {
  const { containerRef } = useTestimonialsCollab();
  const richard = TESTIMONIALS.items.find((item) => item.id === 'richard-sagman');
  const color = COLLABORATOR_COLORS[0];
  const name = richard?.name ?? 'Richard Sagman';
  const initials = getInitials(name);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 72, damping: 18, mass: 0.55 });
  const springY = useSpring(y, { stiffness: 72, damping: 18, mass: 0.55 });

  useEffect(() => {
    if (!active || reduced) return;

    const bounds = containerRef.current;
    if (!bounds) return;

    const region = { xMin: 0.42, xMax: 0.94, yMin: 0.42, yMax: 0.94 };
    const rect = bounds.getBoundingClientRect();
    x.set(rect.width * randomInRange(region.xMin, region.xMax));
    y.set(rect.height * randomInRange(region.yMin, region.yMax));

    let timeoutId = 0;

    const scheduleNext = () => {
      timeoutId = window.setTimeout(() => {
        const nextBounds = containerRef.current?.getBoundingClientRect();
        if (!nextBounds) return;

        x.set(nextBounds.width * randomInRange(region.xMin, region.xMax));
        y.set(nextBounds.height * randomInRange(region.yMin, region.yMax));
        scheduleNext();
      }, 2200 + Math.random() * 2800);
    };

    scheduleNext();

    return () => window.clearTimeout(timeoutId);
  }, [active, containerRef, reduced, x, y]);

  useEffect(() => {
    if (!active || !reduced) return;

    const bounds = containerRef.current?.getBoundingClientRect();
    if (!bounds) return;

    x.set(bounds.width * 0.68);
    y.set(bounds.height * 0.62);
  }, [active, containerRef, reduced, x, y]);

  return (
    <FigmaCursor
      x={reduced ? x : springX}
      y={reduced ? y : springY}
      name={name}
      color={color}
      initials={initials}
      visible={active}
    />
  );
}

function ViewerCursor({
  x,
  y,
  visible,
  reduced,
}: {
  x: MotionValue<number>;
  y: MotionValue<number>;
  visible: boolean;
  reduced: boolean | null;
}) {
  const springX = useSpring(x, { stiffness: 520, damping: 34, mass: 0.16 });
  const springY = useSpring(y, { stiffness: 520, damping: 34, mass: 0.16 });

  if (typeof document === 'undefined' || !visible) return null;

  return createPortal(
    <FigmaCursor
      x={reduced ? x : springX}
      y={reduced ? y : springY}
      name="You"
      color="#18a0fb"
      avatar="/images/viewer-avatar.svg"
      initials="Y"
      visible
      fixed
    />,
    document.body,
  );
}

export function TestimonialsCollaborationCursors() {
  const reduced = useReducedMotion();
  const { enabled, inView } = useTestimonialsCollab();
  const viewerActive = useTestimonialsViewerActive();

  const viewerX = useMotionValue(-120);
  const viewerY = useMotionValue(-120);

  useEffect(() => {
    if (!enabled) return;

    const updateViewer = (clientX: number, clientY: number) => {
      const section = document.getElementById('testimonials');
      if (!section) return;

      const bounds = section.getBoundingClientRect();
      const inside =
        clientX >= bounds.left &&
        clientX <= bounds.right &&
        clientY >= bounds.top &&
        clientY <= bounds.bottom;

      if (!inside) {
        viewerX.set(-120);
        viewerY.set(-120);
        return;
      }

      viewerX.set(clientX);
      viewerY.set(clientY);
    };

    const onPointerMove = (event: PointerEvent) => {
      updateViewer(event.clientX, event.clientY);
    };

    const onPointerDown = (event: PointerEvent) => {
      updateViewer(event.clientX, event.clientY);
    };

    document.addEventListener('pointermove', onPointerMove, { passive: true });
    document.addEventListener('pointerdown', onPointerDown, { passive: true });
    return () => {
      document.removeEventListener('pointermove', onPointerMove);
      document.removeEventListener('pointerdown', onPointerDown);
    };
  }, [enabled, viewerX, viewerY]);

  if (!enabled) return null;

  return (
    <>
      <ViewerCursor
        x={viewerX}
        y={viewerY}
        visible={viewerActive}
        reduced={reduced}
      />

      <div className="testimonials-collab-layer" aria-hidden>
        <CyrusTypingCursor active={inView} reduced={reduced} />
        <RichardWanderingCursor active={inView} reduced={reduced} />
      </div>
    </>
  );
}
