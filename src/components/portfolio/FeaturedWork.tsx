'use client';

import { useState } from 'react';

import { CaseStudyModal } from '@/components/case-study/CaseStudyModal';
import { ParallaxMedia } from '@/components/portfolio/ParallaxMedia';
import { Reveal } from '@/components/portfolio/Reveal';
import { SectionShell } from '@/components/portfolio/SectionShell';
import { FEATURED_CASE_STUDIES, type CaseStudy } from '@/lib/portfolio-data';
import { cn } from '@/lib/utils';

type LayoutVariant = 'lead' | 'side' | 'third';
type MediaVariant = 'wide' | 'landscape' | 'portrait';

const SHOWCASE_LAYOUT: { variant: LayoutVariant; media: MediaVariant }[] = [
  { variant: 'lead', media: 'wide' },
  { variant: 'side', media: 'portrait' },
  { variant: 'third', media: 'landscape' },
  { variant: 'third', media: 'landscape' },
  { variant: 'third', media: 'landscape' },
];

function WorkShowcaseCard({
  study,
  layout,
  index,
  onOpen,
}: {
  study: CaseStudy;
  layout: (typeof SHOWCASE_LAYOUT)[number];
  index: number;
  onOpen: (study: CaseStudy) => void;
}) {
  return (
    <Reveal
      delay={index * 0.06}
      className={cn('work-showcase-item', `work-showcase-item--${layout.variant}`)}
    >
      <button
        type="button"
        onClick={() => onOpen(study)}
        className="work-showcase-card group"
        aria-label={`Open case study: ${study.title}`}
      >
        <div className={cn('work-showcase-media', `work-showcase-media--${layout.media}`)}>
          <ParallaxMedia
            src={study.image}
            alt=""
            sizes={
              layout.variant === 'lead'
                ? '(max-width: 768px) 100vw, 66vw'
                : layout.variant === 'side'
                  ? '(max-width: 768px) 100vw, 33vw'
                  : '(max-width: 768px) 100vw, 33vw'
            }
            priority={index === 0}
          />
          <span className="work-showcase-media-shade" aria-hidden />
          <span className="work-showcase-open">View case study</span>
          <div className="work-showcase-media-footer">
            <p className="work-showcase-client">{study.client}</p>
            <p className="work-showcase-category">{study.category}</p>
          </div>
        </div>

        <div className="work-showcase-meta">
          <p className="work-showcase-scope">{study.scope}</p>
          <h3 className="work-showcase-title">{study.title}</h3>
          <p className="work-showcase-outcome">{study.outcome}</p>
        </div>
      </button>
    </Reveal>
  );
}

export function FeaturedWork() {
  const [activeStudy, setActiveStudy] = useState<CaseStudy | null>(null);
  const activeIndex = activeStudy
    ? FEATURED_CASE_STUDIES.findIndex((study) => study.id === activeStudy.id)
    : -1;

  return (
    <>
      <SectionShell
        id="work"
        tone="elevated"
        display
        kicker="Selected work"
        title="Case studies"
        lead="Casino, governance, systems, research and AI. Each one a real constraint, a real decision, a real outcome."
      >
        <div className="work-showcase-grid">
          {FEATURED_CASE_STUDIES.map((study, index) => (
            <WorkShowcaseCard
              key={study.id}
              study={study}
              layout={SHOWCASE_LAYOUT[index] ?? SHOWCASE_LAYOUT[2]}
              index={index}
              onOpen={setActiveStudy}
            />
          ))}
        </div>
      </SectionShell>

      <CaseStudyModal
        study={activeStudy}
        index={activeIndex}
        onClose={() => setActiveStudy(null)}
      />
    </>
  );
}
