'use client';

import { useEffect, useRef, useState, type ElementType } from 'react';

import { cn } from '@/lib/utils';

const SCRAMBLE = /[a-zA-Z0-9]/;
const SLOT_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

type SlotFrame = {
  chars: string;
  locked: boolean[];
  tick: number;
};

function isScrambleable(char: string) {
  return char !== ' ' && SCRAMBLE.test(char);
}

function randomSlotChar() {
  return SLOT_CHARS[Math.floor(Math.random() * SLOT_CHARS.length)]!;
}

function buildStopSchedule(text: string, totalTicks: number) {
  const reelIndices = text
    .split('')
    .map((char, index) => (isScrambleable(char) ? index : -1))
    .filter((index) => index >= 0);

  const stops = text.split('').map((char, index) => {
    if (!isScrambleable(char)) return 0;
    const reelOrder = reelIndices.indexOf(index);
    const reelCount = Math.max(reelIndices.length, 1);
    const start = Math.floor(totalTicks * 0.28);
    const span = Math.max(1, totalTicks - start - 1);
    const offset = Math.floor((span * reelOrder) / reelCount);
    return Math.min(totalTicks - 1, start + offset);
  });

  return stops;
}

function slotFrame(text: string, tick: number, stops: number[]): SlotFrame {
  const chars: string[] = [];
  const locked: boolean[] = [];

  for (let i = 0; i < text.length; i++) {
    const target = text[i]!;

    if (!isScrambleable(target)) {
      chars.push(target);
      locked.push(true);
      continue;
    }

    if (tick >= stops[i]!) {
      chars.push(target);
      locked.push(true);
    } else {
      chars.push(randomSlotChar());
      locked.push(false);
    }
  }

  return { chars: chars.join(''), locked, tick };
}

function lockedFrame(text: string): SlotFrame {
  return {
    chars: text,
    locked: text.split('').map(() => true),
    tick: 0,
  };
}

export function GlitchTextSwap<T extends ElementType = 'span'>({
  as,
  text,
  className,
  delay = 0,
  steps = 18,
  stepMs = 40,
  reduced = false,
  playOnMount = false,
}: {
  as?: T;
  text: string;
  className?: string;
  delay?: number;
  steps?: number;
  stepMs?: number;
  reduced?: boolean | null;
  playOnMount?: boolean;
}) {
  const Tag = (as ?? 'span') as ElementType;
  const [frame, setFrame] = useState<SlotFrame>(() => lockedFrame(text));
  const [bursting, setBursting] = useState(false);
  const targetRef = useRef(text);
  const isFirstRun = useRef(true);

  useEffect(() => {
    if (reduced) {
      setFrame(lockedFrame(text));
      targetRef.current = text;
      setBursting(false);
      return;
    }

    const changed = text !== targetRef.current;
    const shouldPlay = changed || (playOnMount && isFirstRun.current);
    if (!shouldPlay) return;

    isFirstRun.current = false;
    targetRef.current = text;
    let cancelled = false;
    const timeouts: number[] = [];
    const stops = buildStopSchedule(text, steps);

    const run = () => {
      setBursting(true);
      setFrame(slotFrame(text, 0, stops));

      for (let tick = 1; tick <= steps; tick++) {
        timeouts.push(
          window.setTimeout(() => {
            if (cancelled) return;
            setFrame(slotFrame(text, tick, stops));
            if (tick === steps) setBursting(false);
          }, tick * stepMs),
        );
      }
    };

    if (delay > 0) {
      timeouts.push(window.setTimeout(run, delay));
    } else {
      run();
    }

    return () => {
      cancelled = true;
      timeouts.forEach((id) => window.clearTimeout(id));
    };
  }, [delay, playOnMount, reduced, stepMs, steps, text]);

  return (
    <Tag
      className={cn(
        'glitch-text-swap',
        'glitch-text glitch-text--elevated',
        bursting && 'glitch-text--burst',
        className,
      )}
      data-text={text}
      aria-label={text}
    >
      {frame.chars.split('').map((char, index) => {
        const locked = frame.locked[index];

        if (locked) {
          return (
            <span
              key={index}
              className="glitch-text-swap__char glitch-text-swap__char--locked"
              aria-hidden
            >
              {char}
            </span>
          );
        }

        return (
          <span key={index} className="glitch-text-swap__reel" aria-hidden>
            <span
              key={`${index}-${frame.tick}`}
              className="glitch-text-swap__reel-char glitch-text-swap__char glitch-text-swap__char--scramble"
            >
              {char}
            </span>
          </span>
        );
      })}
    </Tag>
  );
}
