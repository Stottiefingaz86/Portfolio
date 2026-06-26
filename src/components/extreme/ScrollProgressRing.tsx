'use client';

import NumberFlow from '@number-flow/react';
import { motion, useMotionValueEvent, useScroll, useTransform } from 'motion/react';
import { useState } from 'react';

const SVG_RADIUS = 18;
const CIRCUMFERENCE = 2 * Math.PI * SVG_RADIUS;

export function ScrollProgressRing() {
  const { scrollYProgress } = useScroll();
  const [progressPercent, setProgressPercent] = useState(0);

  const clampedProgress = useTransform(scrollYProgress, (value) =>
    Math.min(Math.max(value, 0), 1),
  );
  const progressAsPercent = useTransform(clampedProgress, (value) =>
    Math.round(value * 100),
  );

  useMotionValueEvent(progressAsPercent, 'change', (value) => {
    setProgressPercent(value);
  });

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed bottom-5 right-5 z-[calc(var(--z-nav)-1)] hidden sm:block"
    >
      <div className="group relative">
        <NumberFlow
          value={progressPercent}
          suffix="%"
          className="absolute -top-7 left-1/2 flex h-7 -translate-x-1/2 items-center text-[10px] font-medium tabular-nums text-[var(--x-muted)] opacity-0 transition-opacity group-hover:opacity-100"
        />
        <div className="flex size-11 items-center justify-center rounded-full border border-[var(--x-line)] bg-[var(--x-canvas)]/80 backdrop-blur-sm">
          <svg className="size-9 text-[var(--x-ink)]" viewBox="0 0 48 48" role="presentation">
            <circle
              cx="24"
              cy="24"
              r={SVG_RADIUS}
              stroke="currentColor"
              strokeWidth="3"
              className="opacity-20"
              fill="none"
            />
            <motion.circle
              cx="24"
              cy="24"
              r={SVG_RADIUS}
              stroke="currentColor"
              strokeWidth="3"
              fill="none"
              strokeLinecap="round"
              strokeDasharray={`${CIRCUMFERENCE}`}
              style={{
                pathLength: clampedProgress,
                rotate: -90,
                transformOrigin: '50% 50%',
              }}
            />
          </svg>
        </div>
      </div>
    </div>
  );
}
