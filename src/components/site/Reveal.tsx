'use client';

import { motion, useReducedMotion } from 'framer-motion';

import { cn } from '@/lib/utils';

const EASE = [0.16, 1, 0.3, 1] as const;

export function Reveal({
  children,
  className,
  delay = 0,
  y = 32,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  y?: number;
}) {
  const reduced = useReducedMotion();

  return (
    <motion.div
      initial={reduced ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-12%' }}
      transition={{ duration: 0.7, delay, ease: EASE }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
}
