'use client';

import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { type RefObject, useRef } from 'react';

import { CaseStudyHeroImage } from '@/components/case-study/CaseStudyHeroImage';
import { CaseStudyPdfViewer } from '@/components/case-study/CaseStudyPdfViewer';
import { CaseStudySitePreview } from '@/components/case-study/CaseStudySitePreview';
import type { CaseStudy } from '@/lib/portfolio-data';

interface CaseStudyContentProps {
  study: CaseStudy;
  index: number;
  scrollContainer?: RefObject<HTMLElement | null>;
  inModal?: boolean;
}

export function CaseStudyContent({
  study,
  index,
  scrollContainer,
  inModal = false,
}: CaseStudyContentProps) {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    container: scrollContainer,
    target: ref,
    offset: ['start start', 'end end'],
  });

  const introY = useTransform(scrollYProgress, [0, 0.32], reduced ? [0, 0] : [100, 0]);
  const overviewY = useTransform(scrollYProgress, [0.12, 0.48], reduced ? [0, 0] : [160, 0]);

  const heroClassName = inModal
    ? 'relative h-[min(46vh,400px)] min-h-[240px] overflow-hidden'
    : 'sticky top-0 h-[72svh] min-h-[420px] overflow-hidden md:h-[78svh]';

  return (
    <section ref={ref} className="case-module relative">
      <div className={heroClassName}>
        <CaseStudyHeroImage study={study} scrollContainer={scrollContainer} />
      </div>

      <div className="relative z-10 site-pad">
        <motion.div
          style={{ y: inModal || reduced ? 0 : introY }}
          className={
            inModal
              ? 'case-module-card relative z-10 -mt-20 rounded-[1.75rem] bg-[var(--x-canvas)] p-8 md:-mt-24 md:rounded-[2rem] md:p-12 lg:p-16'
              : 'case-module-card -mt-[28vh] rounded-[1.75rem] bg-[var(--x-canvas)] p-8 md:rounded-[2rem] md:p-12 lg:p-16'
          }
        >
          <p className="type-label mb-4 text-[var(--x-muted)]">
            {String(index + 1).padStart(2, '0')} · {study.category}
          </p>
          <h3 className="type-huge max-w-4xl text-balance">{study.title}</h3>
          {study.subtitle ? (
            <p className="mt-4 max-w-2xl text-lg leading-snug text-[var(--x-muted)]">{study.subtitle}</p>
          ) : null}
          <p className="type-body mt-5 max-w-2xl text-[var(--x-ink-soft)]">{study.summary}</p>

          <dl className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
            <div>
              <dt className="type-label mb-2 text-[var(--x-ink)]">Context</dt>
              <dd className="text-sm leading-snug text-[var(--x-ink-soft)] md:text-base">
                {study.client}
              </dd>
            </div>
            <div>
              <dt className="type-label mb-2 text-[var(--x-ink)]">Scope</dt>
              <dd className="text-sm leading-snug text-[var(--x-ink-soft)] md:text-base">
                {study.scope}
              </dd>
            </div>
            <div>
              <dt className="type-label mb-2 text-[var(--x-ink)]">Focus</dt>
              <dd className="text-sm leading-snug text-[var(--x-ink-soft)] md:text-base">
                {study.tags.slice(0, 3).join(' · ')}
              </dd>
            </div>
            <div>
              <dt className="type-label mb-2 text-[var(--x-ink)]">Outcome</dt>
              <dd className="text-sm leading-snug text-[var(--x-ink-soft)] md:text-base">
                {study.outcome}
              </dd>
            </div>
          </dl>
        </motion.div>
      </div>

      <motion.div
        style={{ y: inModal || reduced ? 0 : overviewY }}
        className="relative z-20 mt-2 rounded-t-[2rem] bg-[var(--x-canvas)] site-pad pb-16 pt-12 md:rounded-t-[2.5rem] md:pb-20 md:pt-14"
      >
        <div className="grid gap-10 lg:grid-cols-[minmax(0,220px)_minmax(0,1fr)] lg:gap-16">
          <h4 className="type-title lg:sticky lg:top-28 lg:self-start">Case study</h4>
          <div className="space-y-8">
            {study.previewUrl ? (
              <div>
                <p className="type-label mb-3 text-[var(--x-ink)]">
                  {study.previewLabel ?? 'Live preview'}
                </p>
                <CaseStudySitePreview
                  url={study.previewUrl}
                  title={study.title}
                  focus={study.previewFocus}
                />
              </div>
            ) : null}
            <div>
              <p className="type-label mb-3 text-[var(--x-ink)]">My role</p>
              <p className="type-body text-[var(--x-ink-soft)]">{study.myRole}</p>
            </div>
            <div>
              <p className="type-label mb-3 text-[var(--x-ink)]">Context</p>
              <p className="type-body text-[var(--x-ink-soft)]">{study.context}</p>
            </div>
            <div>
              <p className="type-label mb-3 text-[var(--x-ink)]">The problem</p>
              <p className="type-body text-[var(--x-ink-soft)]">{study.problem}</p>
            </div>
            <div>
              <p className="type-label mb-3 text-[var(--x-ink)]">What I changed</p>
              <p className="type-body text-[var(--x-ink-soft)]">{study.whatChanged}</p>
            </div>
            {study.document ? (
              <div>
                <p className="type-label mb-3 text-[var(--x-ink)]">
                  {study.documentLabel ?? 'Document'}
                </p>
                <CaseStudyPdfViewer
                  src={study.document}
                  title={study.documentLabel ?? study.title}
                  inline
                />
              </div>
            ) : null}
            <div>
              <p className="type-label mb-3 text-[var(--x-ink)]">Product & design decisions</p>
              <p className="type-body text-[var(--x-ink-soft)]">{study.decisions}</p>
            </div>
            <div>
              <p className="type-label mb-3 text-[var(--x-ink)]">Impact</p>
              <p className="type-body text-[var(--x-ink-soft)]">{study.impact}</p>
            </div>
            {study.stages?.map((stage) => (
              <div key={stage.title}>
                <p className="type-label mb-3 text-[var(--x-ink)]">{stage.title}</p>
                <ul className="space-y-2">
                  {stage.items.map((item) => (
                    <li key={item} className="type-body text-[var(--x-ink-soft)]">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            <div className="border-t border-[var(--x-line)] pt-8">
              <p className="type-label mb-3 text-[var(--x-ink)]">What it shows about how I lead</p>
              <p className="type-body text-[var(--x-ink-soft)]">{study.leadership}</p>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
