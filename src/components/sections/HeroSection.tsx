'use client';

import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';

import { HeroLogo } from '@/components/extreme/HeroLogo';
import { HeroWebGL } from '@/components/extreme/HeroWebGL';
import { SITE } from '@/lib/portfolio-data';

const HeroBlackjackRoot = dynamic(
  () => import('@/components/extreme/HeroBlackjack').then((m) => m.HeroBlackjackRoot),
  { ssr: false },
);

const HeroBlackjackTable = dynamic(
  () => import('@/components/extreme/HeroBlackjack').then((m) => m.HeroBlackjackTable),
  { ssr: false },
);

const HeroBlackjackControls = dynamic(
  () => import('@/components/extreme/HeroBlackjack').then((m) => m.HeroBlackjackControls),
  { ssr: false },
);

export function HeroExtreme() {
  return (
    <section
      id="top"
      className="hero-stage relative overflow-x-clip pb-12 pt-[5.25rem] site-pad lg:pb-16 lg:pt-[5.75rem]"
    >
      <HeroWebGL />
      <div className="hero-grain pointer-events-none absolute inset-0 z-0" aria-hidden />

      <HeroBlackjackRoot>
        <div className="relative z-10 mx-auto grid w-full max-w-[1240px] gap-8 lg:grid-cols-[minmax(0,1fr)_380px] lg:items-stretch lg:gap-x-14">
          <div className="flex min-w-0 flex-col">
            <HeroLogo />

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="type-label type-hero-kicker mt-6 text-[var(--x-muted)] lg:mt-8"
            >
              {SITE.role}
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.32, ease: [0.16, 1, 0.3, 1] }}
              className="type-body type-hero-body mt-5 max-w-[38ch] text-pretty lg:mt-6"
            >
              {SITE.heroLead}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.42, ease: [0.16, 1, 0.3, 1] }}
              className="mt-8 flex flex-wrap gap-3 border-t border-[var(--x-line)] pt-8 lg:mt-auto lg:border-0 lg:pt-0"
            >
              <a href="#work" className="btn-fill">
                View work
              </a>
              <a
                href={SITE.cv}
                download={SITE.cvDownloadName}
                className="btn-line"
              >
                Download CV
              </a>
            </motion.div>
          </div>

          <aside
            className="hero-blackjack-panel mx-auto flex w-full max-w-[340px] flex-col sm:max-w-[360px] lg:mx-0 lg:max-w-none lg:justify-self-end"
            aria-label="Play blackjack"
          >
            <HeroBlackjackTable />
            <HeroBlackjackControls />
          </aside>
        </div>
      </HeroBlackjackRoot>
    </section>
  );
}
