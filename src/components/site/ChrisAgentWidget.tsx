'use client';

import { usePathname } from 'next/navigation';
import { motion, useReducedMotion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import Image from 'next/image';

import { ABOUT } from '@/lib/portfolio-data';
import { scrollToSection } from '@/lib/scroll-to-section';

export function ChrisAgentWidget() {
  const pathname = usePathname();
  const reduced = useReducedMotion();

  if (pathname === '/login') return null;

  return (
    <div className="chris-agent">
      <motion.button
        type="button"
        className="chris-agent__launcher"
        onClick={() => scrollToSection('contact')}
        aria-label="Let's talk — go to contact form"
        whileTap={reduced ? undefined : { scale: 0.96 }}
      >
        <span className="chris-agent__launcher-avatar">
          <Image
            src={ABOUT.portrait}
            alt=""
            width={28}
            height={28}
            className="chris-agent__avatar"
          />
        </span>
        <span className="chris-agent__launcher-copy">
          <Sparkles aria-hidden className="chris-agent__launcher-icon" />
          <span>Let&apos;s Talk</span>
        </span>
        <span className="chris-agent__launcher-pulse" aria-hidden />
      </motion.button>
    </div>
  );
}
