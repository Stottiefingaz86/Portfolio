'use client';

import { motion, useInView } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

import { ToolLogo } from '@/components/site/ToolLogo';
import { SectionHeader } from '@/components/site/SectionHeader';
import { CAREER_JOURNEY, CAREER_PHASES } from '@/lib/portfolio-data';
import { cn } from '@/lib/utils';

function PhaseBlock({
  phase,
  index,
  setActiveId,
}: {
  phase: (typeof CAREER_PHASES)[number];
  index: number;
  setActiveId: (id: string) => void;
}) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { margin: '-42% 0px -42% 0px' });

  useEffect(() => {
    if (inView) setActiveId(phase.id);
  }, [inView, phase.id, setActiveId]);

  return (
    <motion.article
      ref={ref}
      id={phase.id}
      initial={false}
      animate={{ opacity: inView ? 1 : 0.28 }}
      transition={{ duration: 0.4 }}
      className={cn('phase-block', inView && 'is-active')}
    >
      <p className="phase-index">{String(index + 1).padStart(2, '0')}</p>
      <h3 className="phase-title">{phase.title}</h3>
      <p className="phase-body">{phase.body}</p>
      <ul className="phase-tools" aria-label={`${phase.title} tools`}>
        {phase.tools.map((tool) => (
          <li key={`${phase.id}-${tool.id}`} className="phase-tool">
            <ToolLogo id={tool.id} wide={tool.id === 'figma'} />
            <span className="phase-tool-name">{tool.name}</span>
          </li>
        ))}
      </ul>
    </motion.article>
  );
}

export function CareerPhases() {
  const [activeId, setActiveId] = useState(CAREER_PHASES[0].id);

  return (
    <section id="journey" className="section phases-section">
      <div className="shell">
        <SectionHeader
          kicker="Career journey"
          title={CAREER_JOURNEY.title}
          lead={CAREER_JOURNEY.lead}
        />

        <div className="phases-layout">
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

          <div className="phases-stack">
            {CAREER_PHASES.map((phase, index) => (
              <PhaseBlock
                key={phase.id}
                phase={phase}
                index={index}
                setActiveId={setActiveId}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
