'use client';

import { useReducedMotion } from 'framer-motion';
import Image from 'next/image';
import type { CSSProperties } from 'react';

import { cn } from '@/lib/utils';

export function SectionLockupMark({ src, alt }: { src: string; alt: string }) {
  const reduced = useReducedMotion();

  return (
    <div
      className={cn('section-lockup-mark', reduced && 'section-lockup-mark--static')}
      style={{ '--section-lockup-url': `url("${src}")` } as CSSProperties}
    >
      <Image
        src={src}
        alt={alt}
        width={40}
        height={40}
        unoptimized
        className="section-lockup-logo"
      />

      {!reduced ? (
        <>
          <span className="section-lockup-ghost section-lockup-ghost--a" aria-hidden />
          <span className="section-lockup-ghost section-lockup-ghost--b" aria-hidden />
        </>
      ) : null}

      <span className="section-lockup-grain" aria-hidden />
      <span className="section-lockup-grain section-lockup-grain--coarse" aria-hidden />
      <span className="section-lockup-scan" aria-hidden />
      <span className="section-lockup-flicker" aria-hidden />
    </div>
  );
}
