'use client';

import { motion, useReducedMotion } from 'framer-motion';

const EASE = [0.16, 1, 0.3, 1] as const;

export function HeroLogo() {
  const reduced = useReducedMotion();

  return (
    <h1 className="hero-wordmark max-w-full">
      <motion.span
        initial={reduced ? false : { opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: EASE }}
        className="type-mega block"
      >
        I&apos;m
      </motion.span>
      <motion.span
        initial={reduced ? false : { opacity: 0, y: 32 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.75, delay: 0.12, ease: EASE }}
        className="type-mega type-mega-outline -mt-[0.05em] block"
      >
        Chris
      </motion.span>
    </h1>
  );
}
