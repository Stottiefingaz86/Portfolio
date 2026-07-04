'use client';

import { useReducedMotion } from 'framer-motion';
import Image from 'next/image';
import type { CSSProperties } from 'react';

import { cn } from '@/lib/utils';

export function HeroLogoMark({ src, alt }: { src: string; alt: string }) {
  const reduced = useReducedMotion();

  return (
    <div
      className={cn('hero-hud-logo-mark', reduced && 'hero-hud-logo-mark--static')}
      style={{ '--hero-logo-url': `url("${src}")` } as CSSProperties}
    >
      <Image
        src={src}
        alt={alt}
        width={120}
        height={120}
        priority
        unoptimized
        className="hero-hud-logo"
      />

      {!reduced ? (
        <>
          <span className="hero-hud-logo-ghost hero-hud-logo-ghost--a" aria-hidden />
          <span className="hero-hud-logo-ghost hero-hud-logo-ghost--b" aria-hidden />
        </>
      ) : null}

      <span className="hero-hud-logo-grain" aria-hidden />
      <span className="hero-hud-logo-grain hero-hud-logo-grain--coarse" aria-hidden />
      <span className="hero-hud-logo-scan" aria-hidden />
      <span className="hero-hud-logo-flicker" aria-hidden />
    </div>
  );
}
