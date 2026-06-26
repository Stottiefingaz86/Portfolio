'use client';

import { ArrowUpRightIcon } from 'lucide-react';
import Image from 'next/image';

import {
  WORK_CASE_STUDIES,
  WORK_SPOTLIGHT_CASE_STUDIES,
  WORK_TEXT_STACK_CASE_STUDIES,
  type CaseStudy,
} from '@/lib/portfolio-data';
import { useMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';
import { WorkSitePreview } from '@/components/site/WorkSitePreview';
import { useWorkHoverLight } from '@/components/site/useWorkHoverLight';

function caseStudyImageClassName(study: CaseStudy) {
  return cn(
    'work-stack-image',
    study.imageFit === 'contain' && 'work-stack-image--contain',
    study.imagePosition === 'top' && 'work-stack-image--top',
  );
}

function CaseStudyMedia({ study, priority }: { study: CaseStudy; priority?: boolean }) {
  if (study.previewUrl) {
    return (
      <div className="work-site-preview-desktop">
        <WorkSitePreview
          url={study.previewUrl}
          title={study.title}
          fallbackImage={study.image}
        />
      </div>
    );
  }

  return (
    <Image
      src={study.image}
      alt=""
      fill
      className={caseStudyImageClassName(study)}
      sizes="(min-width: 900px) 60vw, 100vw"
      priority={priority}
    />
  );
}

function SpotlightCard({
  study,
  index,
  onOpen,
}: {
  study: CaseStudy;
  index: number;
  onOpen: (study: CaseStudy) => void;
}) {
  const hoverLight = useWorkHoverLight();
  const hasPreview = Boolean(study.previewUrl);

  return (
    <article className="work-stack-card">
      <div className="work-stack-card-inner">
        <div className="work-stack-media">
          <CaseStudyMedia study={study} priority={index < 2} />
          {!hasPreview ? <div className="work-stack-media-shade" aria-hidden /> : null}
        </div>

        <button
          type="button"
          className="work-stack-body work-hover-surface"
          onClick={() => onOpen(study)}
          onPointerMove={hoverLight.onPointerMove}
          onPointerLeave={hoverLight.onPointerLeave}
          aria-label={`Open case study: ${study.title}`}
        >
          <span className="work-hover-light" aria-hidden />
          <span className="work-stack-client">{study.client}</span>
          <h3 className="work-stack-title">{study.title}</h3>
          <p className="work-stack-outcome">{study.outcome}</p>
          <span className="work-stack-scope">{study.scope}</span>
          <span className="work-stack-cta">
            View case study
            <ArrowUpRightIcon data-icon="inline-end" />
          </span>
        </button>
      </div>
    </article>
  );
}

function TextStackRow({
  study,
  index,
  onOpen,
}: {
  study: CaseStudy;
  index: number;
  onOpen: (study: CaseStudy) => void;
}) {
  const hoverLight = useWorkHoverLight();

  return (
    <li className="work-text-row">
      <button
        type="button"
        className="work-text-row-inner work-hover-surface"
        onClick={() => onOpen(study)}
        onPointerMove={hoverLight.onPointerMove}
        onPointerLeave={hoverLight.onPointerLeave}
        aria-label={`Open case study: ${study.title}`}
      >
        <span className="work-hover-light" aria-hidden />
        <span className="work-text-row-index">{String(index + 1).padStart(2, '0')}</span>
        <span className="work-text-row-main">
          <span className="work-text-row-title">{study.title}</span>
          <span className="work-text-row-outcome">{study.outcome}</span>
        </span>
        <span className="work-text-row-scope">{study.scope}</span>
        <ArrowUpRightIcon className="work-text-row-arrow" aria-hidden />
      </button>
    </li>
  );
}

function DesktopOnly({ children }: { children: React.ReactNode }) {
  const isMobile = useMobile();
  if (isMobile) return null;
  return children;
}

export function WorkCaseStudyGallery({
  onOpen,
}: {
  onOpen: (study: CaseStudy) => void;
}) {
  const textStackOffset = WORK_SPOTLIGHT_CASE_STUDIES.length;

  return (
    <div className="shell work-gallery-shell">
      <DesktopOnly>
        <div className="work-stack work-gallery-desktop" aria-label="Featured case study">
          {WORK_SPOTLIGHT_CASE_STUDIES.map((study, index) => (
            <SpotlightCard key={study.id} study={study} index={index} onOpen={onOpen} />
          ))}
        </div>
      </DesktopOnly>

      <ul className="work-text-stack work-text-stack--mobile" aria-label="Case studies">
        {WORK_CASE_STUDIES.map((study, index) => (
          <TextStackRow key={study.id} study={study} index={index} onOpen={onOpen} />
        ))}
      </ul>

      {WORK_TEXT_STACK_CASE_STUDIES.length > 0 ? (
        <DesktopOnly>
          <div className="work-text-shell work-gallery-desktop">
          <p className="work-text-kicker">
            {WORK_TEXT_STACK_CASE_STUDIES.length} more case{' '}
            {WORK_TEXT_STACK_CASE_STUDIES.length === 1 ? 'study' : 'studies'}
          </p>

          <ul className="work-text-stack" aria-label="Additional case studies">
            {WORK_TEXT_STACK_CASE_STUDIES.map((study, index) => (
              <TextStackRow
                key={study.id}
                study={study}
                index={textStackOffset + index}
                onOpen={onOpen}
              />
            ))}
          </ul>
          </div>
        </DesktopOnly>
      ) : null}
    </div>
  );
}
