'use client';

import { motion, useInView, useReducedMotion } from 'framer-motion';
import { useCallback, useEffect, useRef, useState } from 'react';

import { GlitchText } from '@/components/site/hud/GlitchText';
import { GlitchTextSwap } from '@/components/site/hud/GlitchTextSwap';
import { HudRow } from '@/components/site/hud/HudRow';
import { HudSectionShell } from '@/components/site/hud/HudSection';
import { useHudHoverLight } from '@/components/site/useHudHoverLight';
import { useSiteAmbienceOnActive } from '@/components/site/useSiteAmbienceOnActive';
import { useMobile } from '@/hooks/use-mobile';
import { WHAT_I_BRING, type WhatIBringCard } from '@/lib/portfolio-data';
import { playExpertiseSelectSound } from '@/lib/site-sounds';
import { cn } from '@/lib/utils';

const EASE = [0.16, 1, 0.3, 1] as const;
const SCROLL_MARGIN = '-42% 0px -42% 0px';
const ACTIVE_INDEX_SETTLE_MS = 420;

function ExpertiseStickyIntro({
  item,
  index,
  reduced,
}: {
  item: WhatIBringCard;
  index: number;
  reduced: boolean | null;
}) {
  const code = `[ CAP_${String(index + 1).padStart(2, '0')} ]`;
  const prevIndexRef = useRef(index);

  useEffect(() => {
    if (prevIndexRef.current === index) return;
    prevIndexRef.current = index;

    const timer = window.setTimeout(() => {
      playExpertiseSelectSound();
    }, 140);

    return () => window.clearTimeout(timer);
  }, [index]);

  return (
    <div className="expertise-intro-stage">
      <p className="expertise-intro-code">
        <GlitchTextSwap as="span" text={code} reduced={reduced} delay={80} steps={14} stepMs={34} />
      </p>
      <h2 className="expertise-headline">
        <GlitchTextSwap
          as="span"
          text={item.stickyIntro.headline}
          reduced={reduced}
          playOnMount
          delay={140}
          steps={22}
          stepMs={38}
        />
      </h2>
      <p className="expertise-deck">
        <GlitchTextSwap
          as="span"
          text={item.stickyIntro.deck}
          reduced={reduced}
          delay={220}
          steps={18}
          stepMs={34}
        />
      </p>
      <p className="expertise-intro-callout">
        <GlitchTextSwap
          as="span"
          text={item.stickyIntro.callout}
          reduced={reduced}
          delay={300}
          steps={16}
          stepMs={32}
        />
      </p>
    </div>
  );
}

function ExpertiseRow({
  item,
  index,
  setActiveIndex,
}: {
  item: WhatIBringCard;
  index: number;
  setActiveIndex: (index: number) => void;
}) {
  const ref = useRef<HTMLLIElement>(null);
  const reduced = useReducedMotion();
  const inView = useInView(ref, { margin: SCROLL_MARGIN, amount: 0.35 });
  const hoverLight = useHudHoverLight();
  useSiteAmbienceOnActive(inView);

  useEffect(() => {
    if (inView) setActiveIndex(index);
  }, [inView, index, setActiveIndex]);

  return (
    <motion.li
      ref={ref}
      initial={false}
      animate={{ opacity: inView ? 1 : reduced ? 0.72 : 0.34 }}
      transition={{ duration: 0.45, ease: EASE }}
      className={cn('expertise-row', inView && 'expertise-row--active')}
    >
      <HudRow code={`[ CAP_${String(index + 1).padStart(2, '0')} ]`}>
        <div
          className="expertise-row-surface hud-hover-surface"
          onPointerMove={hoverLight.onPointerMove}
          onPointerLeave={hoverLight.onPointerLeave}
        >
          <span className="hud-hover-light" aria-hidden />
          <span className="expertise-row-index" aria-hidden>
            {String(index + 1).padStart(2, '0')}
          </span>

          <div className="expertise-row-main">
            <h3 className="expertise-row-title">
              <GlitchText as="span">{item.title}</GlitchText>
            </h3>
            <p className="expertise-row-body">{item.body}</p>
            <ul className="expertise-row-focus" aria-label={`${item.title} focus areas`}>
              {item.focus.map((tag) => (
                <li key={tag}>{tag}</li>
              ))}
            </ul>
          </div>
        </div>
      </HudRow>
    </motion.li>
  );
}

export function Expertise() {
  const reduced = useReducedMotion();
  const isMobile = useMobile();
  const [activeIndex, setActiveIndex] = useState(0);
  const activeIndexRef = useRef(0);
  const settleTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const activeItem = WHAT_I_BRING[activeIndex] ?? WHAT_I_BRING[0];

  const onActiveIndex = useCallback((index: number) => {
    if (index === activeIndexRef.current) return;

    if (settleTimerRef.current) {
      clearTimeout(settleTimerRef.current);
    }

    settleTimerRef.current = setTimeout(() => {
      activeIndexRef.current = index;
      setActiveIndex(index);
      settleTimerRef.current = null;
    }, ACTIVE_INDEX_SETTLE_MS);
  }, []);

  useEffect(() => {
    return () => {
      if (settleTimerRef.current) clearTimeout(settleTimerRef.current);
    };
  }, []);

  return (
    <HudSectionShell id="expertise" code="SEC_04 // EXPERTISE" className="expertise-section">
      <div className="shell expertise-layout">
        <div className="expertise-intro">
          <div className="expertise-intro-backdrop" aria-hidden />
          <motion.div
            className="expertise-intro-inner"
            initial={reduced || isMobile ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-10%' }}
            transition={{ duration: 0.65, ease: EASE }}
          >
            <p className="section-kicker">Expertise</p>
            <div className="expertise-intro-panel" aria-live="polite">
              <ExpertiseStickyIntro item={activeItem} index={activeIndex} reduced={reduced} />
            </div>
          </motion.div>
        </div>

        <ul className="expertise-list" aria-label="Core capabilities">
          {WHAT_I_BRING.map((item, index) => (
            <ExpertiseRow key={item.id} item={item} index={index} setActiveIndex={onActiveIndex} />
          ))}
        </ul>
      </div>
    </HudSectionShell>
  );
}
