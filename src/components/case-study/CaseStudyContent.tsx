'use client';

import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import { type RefObject, useRef } from 'react';

import { CaseStudyGallery } from '@/components/case-study/CaseStudyGallery';
import { CaseStudyHeroImage } from '@/components/case-study/CaseStudyHeroImage';
import { CaseStudyLinks } from '@/components/case-study/CaseStudyLinks';
import { CaseStudyPdfViewer } from '@/components/case-study/CaseStudyPdfViewer';
import { getCaseStudyGallery, getCaseStudyLinks, type CaseStudy } from '@/lib/portfolio-data';
import { cn } from '@/lib/utils';

interface CaseStudyContentProps {
  study: CaseStudy;
  index: number;
  scrollContainer?: RefObject<HTMLElement | null>;
  inModal?: boolean;
}

function CaseStudyMeta({ study, className }: { study: CaseStudy; className?: string }) {
  return (
    <dl className={cn('case-meta', className)}>
      <div className="case-meta-item">
        <dt>Context</dt>
        <dd>{study.client}</dd>
      </div>
      <div className="case-meta-item">
        <dt>Scope</dt>
        <dd>{study.scope}</dd>
      </div>
      <div className="case-meta-item">
        <dt>Focus</dt>
        <dd>{study.tags.slice(0, 3).join(' · ')}</dd>
      </div>
      <div className="case-meta-item">
        <dt>Outcome</dt>
        <dd>{study.outcome}</dd>
      </div>
    </dl>
  );
}

function CaseStudyArticle({ study }: { study: CaseStudy }) {
  return (
    <div className="case-article-grid">
      <h4 className="case-article-rail">Case study</h4>
      <div className="case-article-sections">
        <section className="case-article-block">
          <p className="case-article-label">My role</p>
          <p className="case-article-copy">{study.myRole}</p>
        </section>
        <section className="case-article-block">
          <p className="case-article-label">Context</p>
          <p className="case-article-copy">{study.context}</p>
        </section>
        <section className="case-article-block">
          <p className="case-article-label">The problem</p>
          <p className="case-article-copy">{study.problem}</p>
        </section>
        <section className="case-article-block">
          <p className="case-article-label">What I changed</p>
          <p className="case-article-copy">{study.whatChanged}</p>
        </section>
        {study.document && !getCaseStudyLinks(study).some((link) => link.href === study.document) ? (
          <section className="case-article-block">
            <p className="case-article-label">{study.documentLabel ?? 'Document'}</p>
            <CaseStudyPdfViewer
              src={study.document}
              title={study.documentLabel ?? study.title}
              inline
            />
          </section>
        ) : null}
        <section className="case-article-block">
          <p className="case-article-label">Product & design decisions</p>
          <p className="case-article-copy">{study.decisions}</p>
        </section>
        <section className="case-article-block">
          <p className="case-article-label">Impact</p>
          <p className="case-article-copy">{study.impact}</p>
        </section>
        {study.stages?.map((stage) => (
          <section key={stage.title} className="case-article-block">
            <p className="case-article-label">{stage.title}</p>
            <ul className="case-article-list">
              {stage.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>
        ))}
        <section className="case-article-block case-article-block--leadership">
          <p className="case-article-label">What it shows about how I lead</p>
          <p className="case-article-copy">{study.leadership}</p>
        </section>
      </div>
    </div>
  );
}

function CaseStudyIntro({
  study,
  index,
  className,
}: {
  study: CaseStudy;
  index: number;
  className?: string;
}) {
  return (
    <div className={cn('case-study-intro', className)}>
      <div className="case-study-intro-copy">
        <p className="case-modal-kicker type-label mb-4 text-[var(--x-muted)]">
          {String(index + 1).padStart(2, '0')} · {study.category}
        </p>
        <h3 className="case-modal-title type-huge max-w-4xl text-balance">{study.title}</h3>
        {study.subtitle ? (
          <p className="case-modal-subtitle mt-4 max-w-2xl text-lg leading-snug text-[var(--x-muted)]">
            {study.subtitle}
          </p>
        ) : null}
        <p className="case-modal-summary type-body mt-5 max-w-2xl text-[var(--x-ink-soft)]">
          {study.summary}
        </p>
        <CaseStudyMeta study={study} className="case-meta--modal mt-10" />
      </div>
    </div>
  );
}

function CaseStudyModalLayout({
  study,
  index,
}: {
  study: CaseStudy;
  index: number;
}) {
  const hasLinks = getCaseStudyLinks(study).length > 0;
  const hasGallery = getCaseStudyGallery(study).length > 0;
  const bannerFit = study.bannerImageFit ?? 'cover';
  const bannerPosition =
    study.imagePosition === 'top'
      ? 'object-top'
      : study.imagePosition === 'center'
        ? 'object-center'
        : 'object-center';

  return (
    <section className="case-modal-layout">
      <header className="case-modal-head">
        <p className="case-modal-kicker">
          {String(index + 1).padStart(2, '0')} · {study.category}
        </p>
        <p className="case-modal-scope">{study.scope}</p>
      </header>

      <div className="case-modal-hero">
        <Image
          src={study.bannerImage ?? study.image}
          alt=""
          fill
          priority
          className={cn(
            'case-modal-hero__image',
            bannerFit === 'contain' ? 'object-contain' : 'object-cover',
            bannerPosition,
          )}
          sizes="100vw"
        />
        <div className="case-modal-hero__shade" aria-hidden />
      </div>

      <div className="case-modal-content">
        <div className="case-modal-lead">
          <h2 className="case-modal-title">{study.title}</h2>
          {study.subtitle ? <p className="case-modal-subtitle">{study.subtitle}</p> : null}
          <p className="case-modal-summary">{study.summary}</p>
          <CaseStudyMeta study={study} className="case-meta--modal" />
        </div>

        {hasLinks ? (
          <div className="case-modal-section case-modal-section--links">
            <CaseStudyLinks study={study} />
          </div>
        ) : null}

        {hasGallery ? (
          <div className="case-modal-section case-modal-section--figures">
            <CaseStudyGallery study={study} />
          </div>
        ) : null}

        <div className="case-modal-section case-modal-section--article">
          <CaseStudyArticle study={study} />
        </div>
      </div>
    </section>
  );
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

  const overviewY = useTransform(scrollYProgress, [0.12, 0.48], reduced ? [0, 0] : [160, 0]);

  if (inModal) {
    return <CaseStudyModalLayout study={study} index={index} />;
  }

  return (
    <section ref={ref} className="case-module relative">
      <div className="relative min-h-[42vh] md:min-h-[50vh]">
        <CaseStudyHeroImage study={study} scrollContainer={scrollContainer} />
      </div>

      <div className="relative z-20 -mt-24 site-pad md:-mt-28">
        <div className="case-module-card rounded-[1.75rem] border border-[var(--x-line)] bg-[var(--x-canvas)] p-6 md:rounded-[2rem] md:p-8">
          <CaseStudyIntro study={study} index={index} />
        </div>
      </div>

      <motion.div
        style={{ y: reduced ? 0 : overviewY }}
        className="relative z-20 mt-2 rounded-t-[2rem] bg-[var(--x-canvas)] site-pad pb-16 pt-12 md:rounded-t-[2.5rem] md:pb-20 md:pt-14"
      >
        <CaseStudyArticle study={study} />
      </motion.div>
    </section>
  );
}
