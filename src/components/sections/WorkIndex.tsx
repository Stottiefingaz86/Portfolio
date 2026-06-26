'use client';

import Image from 'next/image';
import { useState } from 'react';

import { CaseStudyModal } from '@/components/case-study/CaseStudyModal';
import { CASE_STUDIES, type CaseStudy } from '@/lib/portfolio-data';
import { cn } from '@/lib/utils';

function WorkCard({
  study,
  index,
  onOpen,
}: {
  study: CaseStudy;
  index: number;
  onOpen: (study: CaseStudy) => void;
}) {
  return (
    <button
      type="button"
      onClick={() => onOpen(study)}
      aria-label={`Open case study: ${study.title}`}
      className={cn(
        'group work-row block w-full text-left',
        'hover:bg-[rgb(10_10_10_/_0.04)] focus-visible:bg-[rgb(10_10_10_/_0.04)]',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgb(10_10_10_/_0.08)]',
      )}
    >
      <div className="grid min-w-0 items-start gap-6 md:grid-cols-[minmax(0,1fr)_220px] md:gap-10">
        <div className="min-w-0">
          <p className="type-label text-[var(--x-muted)]">
            {String(index + 1).padStart(2, '0')} · {study.category}
          </p>
          <h3 className="type-title work-card-title mt-3 max-w-3xl transition-colors group-hover:text-[var(--x-accent-hot)]">
            {study.title}
          </h3>
          <p className="type-body mt-4 max-w-2xl text-pretty text-[var(--x-ink-soft)]">{study.summary}</p>
          <p className="type-label mt-5 text-[var(--x-ink)]">{study.outcome}</p>
        </div>

        <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-[var(--x-ink)]/5 md:justify-self-end">
          <Image
            src={study.image}
            alt=""
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            sizes="220px"
          />
        </div>
      </div>

      <span className="work-row-arrow" aria-hidden>
        →
      </span>
    </button>
  );
}

export function WorkIndex() {
  const [activeStudy, setActiveStudy] = useState<CaseStudy | null>(null);
  const activeIndex = activeStudy
    ? CASE_STUDIES.findIndex((study) => study.id === activeStudy.id)
    : -1;

  return (
    <>
      <section id="work" className="section-y overflow-visible">
        <div className="site-pad mb-10 md:mb-14">
          <h2 className="type-huge">Work</h2>
          <p className="type-body mt-5 max-w-xl">
            Selected case studies on how I&apos;ve helped gambling products move from fragmented
            experiences to clearer systems, stronger governance and better customer insight.
          </p>
        </div>

        <div className="site-pad space-y-1 overflow-visible pb-2">
          {CASE_STUDIES.map((study, index) => (
            <WorkCard
              key={study.id}
              study={study}
              index={index}
              onOpen={setActiveStudy}
            />
          ))}
        </div>
      </section>

      <CaseStudyModal
        study={activeStudy}
        index={activeIndex}
        onClose={() => setActiveStudy(null)}
      />
    </>
  );
}
