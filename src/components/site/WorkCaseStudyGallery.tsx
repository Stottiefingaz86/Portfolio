'use client';

import { ArrowUpRightIcon } from 'lucide-react';
import Image from 'next/image';
import { useCallback } from 'react';

import {
  WORK_FEATURED_CASE_STUDIES,
  WORK_TEXT_STACK_CASE_STUDIES,
  type CaseStudy,
} from '@/lib/portfolio-data';
import { useMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';
import { useHudHoverLight } from '@/components/site/useHudHoverLight';
import { playCaseStudyHoverSound } from '@/lib/site-sounds';
import { CaseStudyImagePlaceholder } from '@/components/case-study/CaseStudyImagePlaceholder';
import { Badge } from '@/components/ui/badge';
import { BorderBeam } from '@/components/ui/border-beam';
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

function FeaturedTile({
  study,
  index,
  onOpen,
}: {
  study: CaseStudy;
  index: number;
  onOpen: (study: CaseStudy) => void;
}) {
  const hoverLight = useHudHoverLight();
  const onHoverEnter = useCallback(() => {
    playCaseStudyHoverSound();
  }, []);

  return (
    <article className="work-featured-tile min-w-0">
      <button
        type="button"
        className="work-featured-card-trigger work-hover-surface group/work-card w-full text-left"
        onClick={() => onOpen(study)}
        onPointerEnter={onHoverEnter}
        onPointerMove={hoverLight.onPointerMove}
        onPointerLeave={hoverLight.onPointerLeave}
        aria-label={`Open case study: ${study.title}`}
      >
        <span className="work-hover-light rounded-xl" aria-hidden />
        <Card
          size="sm"
          className={cn(
            'work-featured-card relative gap-0 overflow-hidden rounded-xl py-0',
            'ring-foreground/10 transition-[box-shadow,ring-color,transform] duration-300',
            'group-hover/work-card:-translate-y-0.5 group-hover/work-card:ring-accent/35 group-hover/work-card:shadow-[0_18px_48px_oklch(0_0_0/0.28)]',
          )}
        >
          <BorderBeam
            size={72}
            duration={10}
            delay={index * 0.8}
            borderWidth={1}
            colorFrom="oklch(0.82 0.14 195)"
            colorTo="oklch(0.72 0.12 195 / 0.15)"
            className="opacity-0 transition-opacity duration-300 group-hover/work-card:opacity-100"
          />

          <div className="work-featured-card-media border-b border-border/60">
            {study.id === 'jurnii-ai' ? (
              <div className="work-featured-card-media__frame">
                <Image
                  src={study.image}
                  alt=""
                  fill
                  className="object-cover object-center"
                  sizes="(max-width: 900px) 50vw, 25vw"
                  priority={index < 2}
                />
              </div>
            ) : (
              <CaseStudyImagePlaceholder variant="tile" />
            )}
          </div>

          <div className="work-featured-card-body">
            <CardHeader className="gap-1.5 px-3 pt-3 pb-2">
              <Badge
                variant="outline"
                className="w-fit max-w-full border-foreground/12 bg-background/72 text-[0.5625rem] tracking-[0.12em] uppercase"
              >
                {study.scope}
              </Badge>
              <CardDescription className="line-clamp-1 text-[0.5625rem] tracking-[0.1em] uppercase">
                {study.client}
              </CardDescription>
              <CardTitle className="line-clamp-2 text-[0.8125rem] leading-snug font-medium tracking-[-0.015em] text-balance">
                {study.title}
              </CardTitle>
            </CardHeader>

            <CardFooter className="justify-between gap-2 border-t border-border/60 px-3 py-2">
              <span className="text-[0.5625rem] tracking-[0.12em] uppercase text-muted-foreground transition-colors duration-300 group-hover/work-card:text-accent">
                View case study
              </span>
              <ArrowUpRightIcon className="work-featured-card__arrow" aria-hidden />
            </CardFooter>
          </div>
        </Card>
      </button>
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
  const hoverLight = useHudHoverLight();
  const onHoverEnter = useCallback(() => {
    playCaseStudyHoverSound();
  }, []);

  return (
    <li className="work-text-row">
      <button
        type="button"
        className="work-text-row-inner work-hover-surface"
        onClick={() => onOpen(study)}
        onPointerEnter={onHoverEnter}
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

function MobileOnly({ children }: { children: React.ReactNode }) {
  const isMobile = useMobile();
  if (!isMobile) return null;
  return children;
}

export function WorkCaseStudyGallery({
  onOpen,
}: {
  onOpen: (study: CaseStudy) => void;
}) {
  const featuredCount = WORK_FEATURED_CASE_STUDIES.length;

  return (
    <div className="work-gallery">
      <div className="work-featured-grid" aria-label="Featured case studies">
        {WORK_FEATURED_CASE_STUDIES.map((study, index) => (
          <FeaturedTile key={study.id} study={study} index={index} onOpen={onOpen} />
        ))}
      </div>

      {WORK_TEXT_STACK_CASE_STUDIES.length > 0 ? (
        <>
          <MobileOnly>
            <div className="work-text-shell">
              <p className="work-text-kicker">
                {WORK_TEXT_STACK_CASE_STUDIES.length} more case{' '}
                {WORK_TEXT_STACK_CASE_STUDIES.length === 1 ? 'study' : 'studies'}
              </p>

              <ul className="work-text-stack" aria-label="Additional case studies">
                {WORK_TEXT_STACK_CASE_STUDIES.map((study, index) => (
                  <TextStackRow
                    key={study.id}
                    study={study}
                    index={featuredCount + index}
                    onOpen={onOpen}
                  />
                ))}
              </ul>
            </div>
          </MobileOnly>

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
                    index={featuredCount + index}
                    onOpen={onOpen}
                  />
                ))}
              </ul>
            </div>
          </DesktopOnly>
        </>
      ) : null}
    </div>
  );
}
