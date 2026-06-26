'use client';

import { useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

export function useHeroParallax() {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], reduced ? [0, 0] : [0, 140]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return { ref, y, opacity };
}

export function useMediaParallax(speed = 0.12) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(
    scrollYProgress,
    [0, 1],
    reduced ? ['0%', '0%'] : [`${speed * 100}%`, `-${speed * 100}%`],
  );
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], reduced ? [1, 1, 1] : [1.12, 1.04, 1.08]);

  return { ref, y, scale };
}
