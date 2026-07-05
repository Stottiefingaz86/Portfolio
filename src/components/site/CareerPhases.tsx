'use client';

import { motion, useInView } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

import { GlitchText } from '@/components/site/hud/GlitchText';
import { HudRow } from '@/components/site/hud/HudRow';
import { HudSectionShell } from '@/components/site/hud/HudSection';
import { SectionHeader } from '@/components/site/SectionHeader';
import { PhaseCompanies } from '@/components/site/PhaseCompanies';
import { useHudHoverLight } from '@/components/site/useHudHoverLight';
import { useSiteAmbienceOnActive } from '@/components/site/useSiteAmbienceOnActive';
import { CAREER_JOURNEY, CAREER_PHASES } from '@/lib/portfolio-data';
import { cn } from '@/lib/utils';

function PhaseBlock({
  phase,
  index,
  detail,
  setActiveId,
}: {
  phase: (typeof CAREER_PHASES)[number];
  index: number;
  detail: string;
  setActiveId: (id: string) => void;
}) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { margin: '-40% 0px -40% 0px' });
  const hoverLight = useHudHoverLight();
  useSiteAmbienceOnActive(inView);

  useEffect(() => {
    if (inView) setActiveId(phase.id);
  }, [inView, phase.id, setActiveId]);

  const code = `PHASE_${String(index + 1).padStart(2, '0')} // ${phase.title.replace(/\s+/g, '_').toUpperCase()}`;

  return (
    <motion.article
      ref={ref}
      id={phase.id}
      initial={false}
      animate={{ opacity: inView ? 1 : 0.32 }}
      transition={{ duration: 0.35 }}
      className={cn('phase-block', inView && 'is-active')}
    >
      <HudRow code={`[ ${code} ]`} className="hud-row--phase">
        <div
          className="phase-panel hud-hover-surface"
          onPointerMove={hoverLight.onPointerMove}
          onPointerLeave={hoverLight.onPointerLeave}
        >
          <span className="hud-hover-light" aria-hidden />
          <div className="phase-panel__head">
            <p className="phase-index">{String(index + 1).padStart(2, '0')}</p>
            <h3 className="phase-title">
              <GlitchText as="span">{phase.title}</GlitchText>
            </h3>
          </div>
          <p className="phase-body">{detail}</p>
          <PhaseCompanies phase={phase} />
        </div>
      </HudRow>
    </motion.article>
  );
}

export function CareerPhases() {
  const [activeId, setActiveId] = useState(CAREER_PHASES[0].id);
  const phaseDetails = Object.fromEntries(
    CAREER_JOURNEY.phases.map((entry) => [entry.id, entry.detail]),
  ) as Record<string, string>;

  return (
    <HudSectionShell id="journey" code="SEC_02 // JOURNEY" className="phases-section">
      <div className="shell">
        <SectionHeader kicker="Career journey" title={CAREER_JOURNEY.title} />

        <div className="phases-layout">
          <div className="phases-sidebar">
            <aside className="phases-rail" aria-label="Career phases">
              {CAREER_PHASES.map((phase, index) => (
                <a
                  key={phase.id}
                  href={`#${phase.id}`}
                  className={cn('phases-rail-item', activeId === phase.id && 'is-active')}
                >
                  <span className="phases-rail-num">{String(index + 1).padStart(2, '0')}</span>
                  <span className="phases-rail-label">{phase.title}</span>
                </a>
              ))}
            </aside>
          </div>

          <div className="phases-stack">
            {CAREER_PHASES.map((phase, index) => (
              <PhaseBlock
                key={phase.id}
                phase={phase}
                index={index}
                detail={phaseDetails[phase.id] ?? phase.body}
                setActiveId={setActiveId}
              />
            ))}
          </div>
        </div>
      </div>
    </HudSectionShell>
  );
}
