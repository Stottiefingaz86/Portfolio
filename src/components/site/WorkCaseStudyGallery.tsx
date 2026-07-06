'use client';

import { ArrowUpRightIcon } from 'lucide-react';
import Image from 'next/image';
import { useCallback } from 'react';

import { WORK_FEATURED_CASE_STUDIES, type CaseStudy } from '@/lib/portfolio-data';
import { cn } from '@/lib/utils';
import { playCaseStudyHoverSound } from '@/lib/site-sounds';
import { CaseStudyImagePlaceholder } from '@/components/case-study/CaseStudyImagePlaceholder';
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
  const onHoverEnter = useCallback(() => {
    playCaseStudyHoverSound();
  }, []);

  return (
    <article className="work-featured-tile min-w-0">
      <button
        type="button"
        className="work-featured-card-trigger group/work-card w-full text-left"
        onClick={() => onOpen(study)}
        onPointerEnter={onHoverEnter}
        aria-label={`Open case study: ${study.title}`}
      >
        <Card
          size="sm"
          className={cn(
            'work-featured-card relative gap-0 overflow-hidden rounded-xl py-0',
            'ring-foreground/10 transition-[box-shadow,ring-color,transform] duration-300',
            'group-hover/work-card:-translate-y-0.5 group-hover/work-card:ring-accent/35 group-hover/work-card:shadow-[0_18px_48px_oklch(0_0_0/0.28)]',
          )}
        >
          <div className="work-featured-card-media border-b border-border/60">
            {study.tileVideo ? (
              <div className="work-featured-card-media__frame">
                <video
                  className="work-featured-card-media__video"
                  src={study.tileVideo}
                  poster={study.tileVideoPoster ?? study.tileImage}
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload="metadata"
                  aria-hidden
                />
              </div>
            ) : study.tileImage ? (
              <div className="work-featured-card-media__frame">
                <Image
                  src={study.tileImage}
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
              <CardDescription className="line-clamp-1 text-[0.5625rem] tracking-[0.1em] uppercase">
                {study.client}
              </CardDescription>
              <CardTitle className="line-clamp-2 text-[0.8125rem] leading-snug font-medium tracking-[-0.015em] text-balance">
                {study.title}
              </CardTitle>
            </CardHeader>

            <CardFooter className="border-t-0 justify-between gap-2 px-3 py-2">
              <span className="text-[0.5625rem] tracking-[0.12em] uppercase text-muted-foreground transition-colors duration-300 group-hover/work-card:text-accent">
                View case study
              </span>
              <ArrowUpRightIcon className="work-featured-card__arrow" aria-hidden />
            </CardFooter>
          </div>

          <div className="work-featured-card-beam pointer-events-none absolute inset-0 z-20 rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover/work-card:opacity-100">
            <BorderBeam
              size={72}
              duration={10}
              delay={index * 0.8}
              borderWidth={1}
              colorFrom="oklch(0.82 0.14 195)"
              colorTo="oklch(0.72 0.12 195 / 0.15)"
            />
          </div>
        </Card>
      </button>
    </article>
  );
}

export function WorkCaseStudyGallery({
  onOpen,
}: {
  onOpen: (study: CaseStudy) => void;
}) {
  return (
    <div className="work-gallery">
      <div className="work-featured-grid" aria-label="Featured case studies">
        {WORK_FEATURED_CASE_STUDIES.map((study, index) => (
          <FeaturedTile key={study.id} study={study} index={index} onOpen={onOpen} />
        ))}
      </div>
    </div>
  );
}
