'use client';

import { motion, useReducedMotion } from 'framer-motion';
import Image from 'next/image';

import { GlitchText } from '@/components/site/hud/GlitchText';
import { HeroHudAtmosphere } from '@/components/site/hud/HeroHudAtmosphere';
import { HeroLogoMark } from '@/components/site/hud/HeroLogoMark';
import { HudTelemetry } from '@/components/site/hud/HudTelemetry';
import { SITE } from '@/lib/portfolio-data';
import { scrollToSection } from '@/lib/scroll-to-section';

const EASE = [0.16, 1, 0.3, 1] as const;

export function Hero() {
  const reduced = useReducedMotion();
  const enterMotion = !reduced;

  return (
    <section id="top" className="hero hero--hud" aria-label="Introduction">
      <div className="hero-bg" aria-hidden>
        <div className="hero-bg-image">
          <Image
            src={SITE.heroImage}
            alt=""
            fill
            priority
            className="hero-bg-photo"
            sizes="100vw"
          />
          <div className="hero-bg-fx" aria-hidden>
            <span className="hero-bg-fx__grain" />
            <span className="hero-bg-fx__scanlines" />
            <span className="hero-bg-fx__tv-pulse" />
          </div>
        </div>
      </div>

      <HeroHudAtmosphere />
      <HudTelemetry reduced={reduced} />

      <div className="hero-hud-layout shell">
        <div className="hero-hud-stack">
          <motion.div
            initial={enterMotion ? { opacity: 0, scale: 0.92, y: 12 } : false}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1, ease: EASE }}
            className="hero-hud-logo-wrap"
          >
            <HeroLogoMark src={SITE.siteLogo} alt={SITE.siteLogoAlt} />
          </motion.div>

          <motion.p
            initial={enterMotion ? { opacity: 0, y: 16 } : false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE }}
            className="hero-hud-tag"
          >
            <span className="hero-hud-tag-code">[ {SITE.portfolioYear} // PORTFOLIO ]</span>
            {SITE.heroKickerMobile}
          </motion.p>

          <motion.h1
            initial={enterMotion ? { opacity: 0, y: 28 } : false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.95, delay: 0.06, ease: EASE }}
            className="hero-hud-title"
          >
              <GlitchText
                as="span"
                className="hero-title-line hero-title-line--given"
                playOnMount
              >
                Christopher
              </GlitchText>
              <GlitchText
                as="span"
                className="hero-title-line hero-title-line--surname"
                playOnMount
              >
                Hunt
              </GlitchText>
          </motion.h1>

          <motion.p
            initial={enterMotion ? { opacity: 0, y: 20 } : false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.14, ease: EASE }}
            className="hero-hud-lead"
          >
            {SITE.heroLeadMobile}
          </motion.p>

          <motion.div
            initial={enterMotion ? { opacity: 0, y: 12 } : false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.2, ease: EASE }}
            className="hero-hud-actions"
          >
            <button
              type="button"
              className="btn btn--primary btn--hero"
              data-scroll-intent="true"
              onClick={() => scrollToSection('work')}
            >
                <GlitchText glitch={false}>View work</GlitchText>
            </button>
          </motion.div>
        </div>
      </div>

      <button
        type="button"
        className="hero-scroll hero-scroll--hud"
        aria-label="Scroll to journey"
        data-scroll-intent="true"
        onClick={() => scrollToSection('journey')}
      >
        <span className="hero-scroll-text">Scroll</span>
        <span className="hero-scroll-track" aria-hidden>
          <span className="hero-scroll-line" />
          <span className="hero-scroll-dot" />
        </span>
        <span className="hero-scroll-chevron" aria-hidden />
      </button>
    </section>
  );
}
