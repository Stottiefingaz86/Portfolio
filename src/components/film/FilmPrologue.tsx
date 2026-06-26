'use client';

import { motion, useReducedMotion } from 'framer-motion';

import { useHeroParallax } from '@/hooks/useParallax';
import { SITE } from '@/lib/portfolio-data';

const EASE = [0.16, 1, 0.3, 1] as const;

export function FilmPrologue() {
  const reduced = useReducedMotion();
  const { ref, y, opacity } = useHeroParallax();

  return (
    <section ref={ref} id="top" className="hero-rebirth site-pad" aria-label="Introduction">
      <motion.div
        style={{ y, opacity }}
        className="hero-rebirth-content p-container"
      >
        <motion.p
          initial={reduced ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE }}
          className="hero-rebirth-label"
        >
          {SITE.role}
        </motion.p>

        <motion.h1
          initial={reduced ? false : { opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, delay: 0.05, ease: EASE }}
          className="hero-rebirth-title"
        >
          {SITE.name}
        </motion.h1>

        <motion.p
          initial={reduced ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.12, ease: EASE }}
          className="hero-rebirth-lead"
        >
          {SITE.heroLead}
        </motion.p>

        <motion.p
          initial={reduced ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.18, ease: EASE }}
          className="hero-rebirth-body"
        >
          {SITE.heroBody}
        </motion.p>

        <motion.div
          initial={reduced ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.24, ease: EASE }}
          className="hero-rebirth-actions"
        >
          <a href="#work" className="btn-fill">
            View selected work
          </a>
          <a href="#journey" className="btn-line">
            Career journey
          </a>
        </motion.div>
      </motion.div>

      <div className="hero-rebirth-scroll" aria-hidden>
        <span className="hero-rebirth-scroll-label">Scroll</span>
        <span className="hero-rebirth-scroll-track">
          <span className="hero-rebirth-scroll-thumb" />
        </span>
      </div>
    </section>
  );
}
