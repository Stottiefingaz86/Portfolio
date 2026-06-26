'use client';

import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

import { useMobile } from '@/hooks/use-mobile';
import { SITE } from '@/lib/portfolio-data';

const EASE = [0.16, 1, 0.3, 1] as const;

const HERO_PILLS = ['BetOnline', 'Jurnii AI', 'Design systems'] as const;

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const isMobile = useMobile();
  const parallaxEnabled = !reduced && !isMobile;
  const enterMotion = !reduced;
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], parallaxEnabled ? [0, 96] : [0, 0], {
    clamp: true,
  });

  return (
    <section ref={ref} id="top" className="hero" aria-label="Introduction">
      <div className="hero-bg" aria-hidden>
        <div className="hero-bg-spotlight" />
        <div className="hero-bg-orb hero-bg-orb--a" />
        <div className="hero-bg-orb hero-bg-orb--b" />
        <div className="hero-bg-grid" />
      </div>

      <aside className="hero-side-mark" aria-hidden>
        <span className="hero-side-mark-year">{SITE.portfolioYear}</span>
        <span className="hero-side-mark-rule" />
        <span className="hero-side-mark-vertical">/ PORTFOLIO</span>
      </aside>

      <motion.div style={parallaxEnabled ? { y } : undefined} className="hero-content">
        <motion.p
          initial={enterMotion ? { opacity: 0, y: 20 } : false}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE }}
          className="hero-kicker"
        >
          <span className="hero-copy-desktop">{SITE.role}</span>
          <span className="hero-copy-mobile">{SITE.heroKickerMobile}</span>
        </motion.p>

        <motion.h1
          initial={enterMotion ? { opacity: 0, y: 40 } : false}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.95, delay: 0.06, ease: EASE }}
          className="hero-title"
        >
          <span className="hero-title-line">Christopher</span>
          <span className="hero-title-line hero-title-line--surname">Hunt</span>
        </motion.h1>

        <motion.p
          initial={enterMotion ? { opacity: 0, y: 24 } : false}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.14, ease: EASE }}
          className="hero-lead"
        >
          {SITE.heroLead}
        </motion.p>

        <motion.ul
          initial={enterMotion ? { opacity: 0, y: 16 } : false}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.18, ease: EASE }}
          className="hero-pills"
          aria-label="Current focus"
        >
          {HERO_PILLS.map((pill) => (
            <li key={pill}>{pill}</li>
          ))}
        </motion.ul>

        <motion.p
          initial={enterMotion ? { opacity: 0, y: 20 } : false}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: EASE }}
          className="hero-body hero-copy-desktop"
        >
          {SITE.heroBody}
        </motion.p>

        <motion.div
          initial={enterMotion ? { opacity: 0, y: 16 } : false}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.24, ease: EASE }}
          className="hero-actions"
        >
          <a href="#work" className="btn btn--primary btn--hero">
            <span className="hero-copy-desktop">View transformation work</span>
            <span className="hero-copy-mobile">View work</span>
            <span className="hero-btn-arrow hero-copy-mobile" aria-hidden>
              →
            </span>
          </a>
          <a href="#journey" className="btn btn--ghost hero-copy-desktop">
            Career phases
          </a>
        </motion.div>
      </motion.div>

      <div className="hero-scroll" aria-hidden>
        <span className="hero-scroll-text">Scroll</span>
        <span className="hero-scroll-line">
          <span className="hero-scroll-dot" />
        </span>
      </div>
    </section>
  );
}
