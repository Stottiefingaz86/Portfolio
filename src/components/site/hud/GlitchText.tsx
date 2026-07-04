'use client';

import { useInView, useReducedMotion } from 'framer-motion';
import { useEffect, useRef, useState, type ElementType, ReactNode } from 'react';

import { cn } from '@/lib/utils';

type GlitchTextProps<T extends ElementType = 'span'> = {
  as?: T;
  children: ReactNode;
  className?: string;
  glitch?: boolean;
  playOnMount?: boolean;
  /** default = row titles; elevated = section headers — softer but visible glitch */
  intensity?: 'default' | 'elevated';
};

const SCRAMBLE = /[a-zA-Z0-9]/;
const DIGITS = '0123456789';
const CHARSET = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';

function glitchGlyph(char: string) {
  if (/[a-zA-Z]/.test(char)) {
    return DIGITS[Math.floor(Math.random() * DIGITS.length)]!;
  }
  return CHARSET[Math.floor(Math.random() * CHARSET.length)]!;
}

function scrambleAll(text: string, density = 1) {
  return text
    .split('')
    .map((char) => {
      if (char === ' ' || !SCRAMBLE.test(char)) return char;
      if (Math.random() > density) return char;
      return glitchGlyph(char);
    })
    .join('');
}

function scrambleIndices(text: string, indices: number[]) {
  const chars = text.split('');
  for (const index of indices) {
    const char = chars[index];
    if (!char || char === ' ' || !SCRAMBLE.test(char)) continue;
    chars[index] = glitchGlyph(char);
  }
  return chars.join('');
}

function pickGlitchIndexes(text: string, count: number) {
  const candidates = text
    .split('')
    .flatMap((char, index) => (SCRAMBLE.test(char) ? [index] : []));

  if (candidates.length === 0) return [];

  const picks: number[] = [];
  const pool = [...candidates];

  while (picks.length < count && pool.length > 0) {
    const slot = Math.floor(Math.random() * pool.length);
    picks.push(pool.splice(slot, 1)[0]!);
  }

  return picks;
}

function pulseCountFor(text: string, burst: boolean) {
  if (burst) {
    return Math.min(3, Math.max(1, Math.ceil(text.length * 0.03)));
  }

  return text.length > 24 ? 2 : 1;
}

export function GlitchText<T extends ElementType = 'span'>({
  as,
  children,
  className,
  glitch = true,
  playOnMount = false,
  intensity = 'default',
}: GlitchTextProps<T>) {
  const Tag = (as ?? 'span') as ElementType;
  const text = typeof children === 'string' ? children : undefined;
  const reduced = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const playedRef = useRef(false);
  const inView = useInView(ref, { once: true, margin: '-8%' });
  const [display, setDisplay] = useState(text ?? '');
  const [live, setLive] = useState(false);
  const [bursting, setBursting] = useState(false);

  useEffect(() => {
    if (!text) {
      setDisplay('');
      setLive(false);
      setBursting(false);
      return;
    }

    if (!glitch || reduced) {
      setDisplay(text);
      setLive(false);
      setBursting(false);
      return;
    }

    if (playedRef.current) {
      setDisplay(text);
      setLive(true);
      return;
    }

    const shouldPlay = playOnMount || inView;
    if (!shouldPlay) {
      setDisplay(text);
      return;
    }

    playedRef.current = true;

    if (intensity === 'elevated') {
      let cancelled = false;
      const timeouts: number[] = [];

      const schedule = (fn: () => void, delay: number) => {
        timeouts.push(window.setTimeout(fn, delay));
      };

      setBursting(true);
      setLive(false);
      setDisplay(scrambleAll(text, 0.3));

      schedule(() => {
        if (cancelled) return;
        setDisplay(scrambleAll(text, 0.1));
      }, 90);

      schedule(() => {
        if (cancelled) return;
        setDisplay(text);
        setBursting(false);
        setLive(true);
      }, 190);

      return () => {
        cancelled = true;
        timeouts.forEach((id) => window.clearTimeout(id));
      };
    }

    let cancelled = false;
    const timeouts: number[] = [];

    const schedule = (fn: () => void, delay: number) => {
      timeouts.push(window.setTimeout(fn, delay));
    };

    setBursting(true);
    setLive(false);
    setDisplay(scrambleAll(text, 0.55));

    schedule(() => {
      if (cancelled) return;
      setDisplay(scrambleAll(text, 0.22));
    }, 80);

    schedule(() => {
      if (cancelled) return;
      setDisplay(text);
      setBursting(false);
      setLive(true);
    }, 160);

    return () => {
      cancelled = true;
      timeouts.forEach((id) => window.clearTimeout(id));
    };
  }, [glitch, inView, intensity, playOnMount, reduced, text]);

  useEffect(() => {
    if (!text || !glitch || reduced || !live) return;

    let revertTimer = 0;
    let intervalTimer = 0;
    let pulseCount = 0;

    const pulse = () => {
      pulseCount += 1;
      const burst = intensity !== 'elevated' && pulseCount % 12 === 0;
      const count =
        intensity === 'elevated' ? 1 : pulseCountFor(text, burst);
      const indexes = pickGlitchIndexes(text, count);
      if (indexes.length === 0) return;

      setDisplay(scrambleIndices(text, indexes));

      window.clearTimeout(revertTimer);
      const revertMs = burst ? 130 : intensity === 'elevated' ? 75 : 90;
      revertTimer = window.setTimeout(() => {
        setDisplay(text);
      }, revertMs);
    };

    const scheduleNext = () => {
      const delay =
        intensity === 'elevated'
          ? 4800 + Math.random() * 4200
          : 3200 + Math.random() * 3600;

      intervalTimer = window.setTimeout(() => {
        pulse();
        scheduleNext();
      }, delay);
    };

    scheduleNext();

    return () => {
      window.clearTimeout(revertTimer);
      window.clearTimeout(intervalTimer);
    };
  }, [glitch, intensity, live, reduced, text]);

  const visible = glitch && text ? display : children;

  return (
    <Tag
      ref={ref}
      className={cn(
        'glitch-text',
        live && 'glitch-text--live',
        bursting && 'glitch-text--burst',
        intensity === 'elevated' && 'glitch-text--elevated',
        className,
      )}
      data-text={text}
    >
      {visible}
    </Tag>
  );
}
