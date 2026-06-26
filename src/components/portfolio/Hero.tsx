'use client';

import { motion, useReducedMotion } from 'framer-motion';

import { SITE } from '@/lib/portfolio-data';

const EASE = [0.16, 1, 0.3, 1] as const;

export function Hero() {
  const reduced = useReducedMotion();

  return (
    <section id="top" className="hero-stage section-y-loose relative overflow-hidden site-pad">
      <div
        className="pointer-events-none absolute inset-0 z-0"
        aria-hidden
        style={{
          background:
            'radial-gradient(ellipse 60% 50% at 90% -5%, var(--x-accent-glow), transparent 50%)',
        }}
      />

      <div className="p-container hero-inner relative z-10">
        <motion.div
          initial={reduced ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE }}
        >
          <h1 className="hero-wordmark">
            <span className="type-mega block text-[var(--x-ink)]">Christopher</span>
            <span className="type-mega type-mega-outline -mt-[0.06em] block">Hunt</span>
          </h1>
          <p className="hero-role">{SITE.role}</p>
        </motion.div>

        <motion.div
          initial={reduced ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.12, ease: EASE }}
          className="hero-body"
        >
          <p className="hero-lead">{SITE.heroLead}</p>
          <p className="hero-support">{SITE.heroBody}</p>

          <div className="hero-actions">
            <a href="#work" className="btn-fill">
              View case studies
            </a>
            <a href={SITE.cv} download={SITE.cvDownloadName} className="btn-line">
              Download CV
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
