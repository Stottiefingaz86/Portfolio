'use client';

import { motion, useInView, useReducedMotion } from 'framer-motion';
import { useRef } from 'react';

import { GlitchText } from '@/components/site/hud/GlitchText';
import { HudRow } from '@/components/site/hud/HudRow';
import { HudSectionShell } from '@/components/site/hud/HudSection';
import { useHudHoverLight } from '@/components/site/useHudHoverLight';
import { useSiteAmbienceOnActive } from '@/components/site/useSiteAmbienceOnActive';
import { WHAT_I_BRING } from '@/lib/portfolio-data';
import { cn } from '@/lib/utils';

const EASE = [0.16, 1, 0.3, 1] as const;
const SCROLL_MARGIN = '-42% 0px -42% 0px';

function ExpertiseRow({
  item,
  index,
}: {
  item: (typeof WHAT_I_BRING)[number];
  index: number;
}) {
  const ref = useRef<HTMLLIElement>(null);
  const reduced = useReducedMotion();
  const inView = useInView(ref, { margin: SCROLL_MARGIN, amount: 0.35 });
  const hoverLight = useHudHoverLight();
  useSiteAmbienceOnActive(inView);

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

  return (
    <HudSectionShell id="expertise" code="SEC_03 // EXPERTISE" className="expertise-section">
      <div className="shell expertise-layout">
        <div className="expertise-intro">
          <motion.div
            className="expertise-intro-inner"
            initial={reduced ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-10%' }}
            transition={{ duration: 0.65, ease: EASE }}
          >
            <p className="section-kicker">Expertise</p>
            <h2 className="expertise-headline">
              <GlitchText as="span" intensity="elevated">
                Design leadership for products that have to work at scale.
              </GlitchText>
            </h2>
            <p className="expertise-deck">
              Teams, systems, research and product judgment at scale.
            </p>
          </motion.div>
        </div>

        <ul className="expertise-list" aria-label="Core capabilities">
          {WHAT_I_BRING.map((item, index) => (
            <ExpertiseRow key={item.id} item={item} index={index} />
          ))}
        </ul>
      </div>
    </HudSectionShell>
  );
}
