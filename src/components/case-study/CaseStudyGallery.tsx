'use client';

import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { X, ZoomIn } from 'lucide-react';
import Image from 'next/image';
import { Fragment, useCallback, useEffect, useState } from 'react';

import { getCaseStudyGallery, type CaseStudy, type CaseStudyImage } from '@/lib/portfolio-data';
import { cn } from '@/lib/utils';

const IMAGE_PATTERN = /\.(jpe?g|png|webp|gif|avif)$/i;
const EASE = [0.16, 1, 0.3, 1] as const;

function isDisplayableImage(src: string) {
  return IMAGE_PATTERN.test(src);
}

function isVisionGroup(group?: string) {
  const value = group?.toLowerCase();
  return value === 'after' || value === 'design vision';
}

function partitionBeforeAfter(images: CaseStudyImage[]) {
  const before = images.filter((image) => image.group?.toLowerCase() === 'before');
  const after = images.filter((image) => isVisionGroup(image.group));

  if (
    before.length === 0 ||
    after.length === 0 ||
    before.length !== after.length ||
    before.length + after.length !== images.length
  ) {
    return null;
  }

  return { before, after };
}

function partitionNarrativeGallery(images: CaseStudyImage[]) {
  const before = images.filter((image) => image.group?.toLowerCase() === 'before');
  const vision = images.filter((image) => isVisionGroup(image.group));
  const canCompare = before.length > 0 && before.length === vision.length;
  const compareCount = canCompare ? before.length + vision.length : 0;
  const tail = canCompare ? images.slice(compareCount) : images;

  if (!canCompare && tail.length === images.length) {
    return null;
  }

  const sections: Array<{
    title: string;
    lead?: string;
    images: CaseStudyImage[];
    layout: 'pair' | 'stack';
  }> = [];

  for (const image of tail) {
    const group = image.group ?? 'Project visuals';
    const last = sections[sections.length - 1];

    if (last?.title === group) {
      last.images.push(image);
    } else {
      sections.push({
        title: group,
        lead: image.groupLead,
        images: [image],
        layout: group.toLowerCase() === 'design system' ? 'pair' : 'stack',
      });
    }
  }

  return {
    canCompare,
    before,
    vision,
    compareCount,
    sections,
    indexForTail: (sectionIndex: number, imageIndex: number) => {
      let offset = compareCount;
      for (let i = 0; i < sectionIndex; i += 1) {
        offset += sections[i]?.images.length ?? 0;
      }
      return offset + imageIndex;
    },
  };
}

function GalleryLightbox({
  images,
  study,
  activeIndex,
  onClose,
  onNavigate,
}: {
  images: CaseStudyImage[];
  study: CaseStudy;
  activeIndex: number | null;
  onClose: () => void;
  onNavigate: (index: number) => void;
}) {
  const reduced = useReducedMotion();
  const image = activeIndex === null ? null : images[activeIndex];

  useEffect(() => {
    if (activeIndex === null) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.stopImmediatePropagation();
        onClose();
        return;
      }

      if (event.key === 'ArrowRight' && activeIndex < images.length - 1) {
        event.preventDefault();
        onNavigate(activeIndex + 1);
      }

      if (event.key === 'ArrowLeft' && activeIndex > 0) {
        event.preventDefault();
        onNavigate(activeIndex - 1);
      }
    };

    window.addEventListener('keydown', onKeyDown, true);
    return () => window.removeEventListener('keydown', onKeyDown, true);
  }, [activeIndex, images.length, onClose, onNavigate]);

  return (
    <AnimatePresence>
      {image && activeIndex !== null ? (
        <>
          <motion.button
            type="button"
            className="case-figure-lightbox__backdrop"
            aria-label="Close enlarged image"
            initial={reduced ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={reduced ? undefined : { opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
          />
          <motion.div
            className="case-figure-lightbox"
            role="dialog"
            aria-modal="true"
            aria-label={image.alt ?? `${study.title} visual ${activeIndex + 1}`}
            initial={reduced ? false : { opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={reduced ? undefined : { opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.24, ease: EASE }}
          >
            <button
              type="button"
              className="case-figure-lightbox__close"
              aria-label="Close enlarged image"
              onClick={onClose}
            >
              <X aria-hidden />
            </button>

            <div className="case-figure-lightbox__frame">
              <Image
                src={image.src}
                alt={image.alt ?? `${study.title} visual ${activeIndex + 1}`}
                width={2400}
                height={1350}
                unoptimized
                className="case-figure-lightbox__image"
                sizes="100vw"
                priority
              />
            </div>

            {image.caption || image.alt ? (
              <p className="case-figure-lightbox__caption">{image.caption ?? image.alt}</p>
            ) : null}

            {images.length > 1 ? (
              <div className="case-figure-lightbox__nav">
                <button
                  type="button"
                  className="case-figure-lightbox__nav-btn"
                  disabled={activeIndex === 0}
                  onClick={() => onNavigate(activeIndex - 1)}
                >
                  Previous
                </button>
                <span className="case-figure-lightbox__count">
                  {String(activeIndex + 1).padStart(2, '0')} / {String(images.length).padStart(2, '0')}
                </span>
                <button
                  type="button"
                  className="case-figure-lightbox__nav-btn"
                  disabled={activeIndex === images.length - 1}
                  onClick={() => onNavigate(activeIndex + 1)}
                >
                  Next
                </button>
              </div>
            ) : null}
          </motion.div>
        </>
      ) : null}
    </AnimatePresence>
  );
}

function GalleryFigure({
  image,
  study,
  index,
  cropped,
  intrinsic,
  sizes,
  className,
  mediaClassName,
  onOpen,
}: {
  image: CaseStudyImage;
  study: CaseStudy;
  index: number;
  cropped?: boolean;
  intrinsic?: boolean;
  sizes?: string;
  className?: string;
  mediaClassName?: string;
  onOpen: (index: number) => void;
}) {
  const label = image.alt ?? `${study.title} visual ${index + 1}`;

  return (
    <figure className={className}>
      <button
        type="button"
        className="case-figure__trigger"
        onClick={() => onOpen(index)}
        aria-label={`Enlarge ${label}`}
      >
        <div
          className={cn(
            'case-figure__media',
            cropped && 'case-figure__media--cropped',
            intrinsic && 'case-figure__media--intrinsic',
            mediaClassName,
          )}
        >
          {intrinsic ? (
            <Image
              src={image.src}
              alt=""
              width={1600}
              height={1067}
              className="case-figure__image case-figure__image--intrinsic"
              sizes={sizes ?? '(max-width: 768px) 100vw, 50vw'}
            />
          ) : cropped ? (
            <Image
              src={image.src}
              alt=""
              fill
              className="case-figure__image case-figure__image--cover"
              sizes={sizes}
            />
          ) : (
            <Image
              src={image.src}
              alt=""
              width={1600}
              height={1000}
              className="case-figure__image"
              sizes={sizes ?? '(max-width: 900px) 100vw, 56rem'}
            />
          )}
        </div>
        <span className="case-figure__zoom" aria-hidden>
          <ZoomIn />
        </span>
      </button>
      {image.caption || image.alt ? (
        <figcaption className="case-figure__caption">{image.caption ?? image.alt}</figcaption>
      ) : null}
    </figure>
  );
}

function CompareFigure({
  image,
  study,
  index,
  onOpen,
}: {
  image: CaseStudyImage;
  study: CaseStudy;
  index: number;
  onOpen: (index: number) => void;
}) {
  return (
    <GalleryFigure
      image={image}
      study={study}
      index={index}
      cropped
      sizes="(max-width: 640px) 42vw, 22rem"
      className="case-figure case-figure--compare"
      mediaClassName="case-figure__media--compare"
      onOpen={onOpen}
    />
  );
}

function BeforeAfterGallery({
  study,
  before,
  after,
  onOpen,
  afterLabel = 'After',
  lead,
  className,
}: {
  study: CaseStudy;
  before: CaseStudyImage[];
  after: CaseStudyImage[];
  onOpen: (index: number) => void;
  afterLabel?: string;
  lead?: string;
  className?: string;
}) {
  return (
    <section className={cn('case-figures__section', className)}>
      <div className="case-figures__section-head">
        <h3 className="case-figures__section-title">Before → {afterLabel.toLowerCase()}</h3>
        {lead ? <p className="case-figures__section-lead">{lead}</p> : null}
      </div>
      <div className="case-figures__stack case-figures__stack--compare">
        <div className="case-figures__compare-header" aria-hidden>
          <span className="case-figures__compare-label case-figures__compare-label--before">
            Before
          </span>
          <span className="case-figures__compare-divider" />
          <span className="case-figures__compare-label case-figures__compare-label--after">
            {afterLabel}
          </span>
        </div>

        {before.map((beforeImage, rowIndex) => (
          <div className="case-figures__compare-row" key={`${beforeImage.src}-${rowIndex}`}>
            <CompareFigure
              image={beforeImage}
              study={study}
              index={rowIndex}
              onOpen={onOpen}
            />
            <CompareFigure
              image={after[rowIndex]!}
              study={study}
              index={before.length + rowIndex}
              onOpen={onOpen}
            />
          </div>
        ))}
      </div>
    </section>
  );
}

function NarrativeCaseStudyGallery({
  study,
  images,
  onOpen,
}: {
  study: CaseStudy;
  images: CaseStudyImage[];
  onOpen: (index: number) => void;
}) {
  const narrative = partitionNarrativeGallery(images);
  if (!narrative) return null;

  const { canCompare, before, vision, sections, indexForTail } = narrative;

  return (
    <div className="case-figures case-figures--narrative" aria-label={`${study.title} product evolution`}>
      <p className="case-figures__label">Product evolution</p>

      {canCompare ? (
        <BeforeAfterGallery
          study={study}
          before={before}
          after={vision}
          onOpen={onOpen}
          afterLabel="Design vision"
          lead={before[0]?.groupLead}
        />
      ) : null}

      {sections.map((section, sectionIndex) => (
        <section className="case-figures__section" key={section.title}>
          <div className="case-figures__section-head">
            <h3 className="case-figures__section-title">{section.title}</h3>
            {section.lead ? <p className="case-figures__section-lead">{section.lead}</p> : null}
          </div>
          <div
            className={cn(
              'case-figures__stack',
              section.layout === 'pair' && 'case-figures__stack--pair',
            )}
          >
            {section.images.map((image, imageIndex) => (
              <GalleryFigure
                key={`${image.src}-${imageIndex}`}
                image={image}
                study={study}
                index={indexForTail(sectionIndex, imageIndex)}
                intrinsic={section.layout === 'pair'}
                sizes={
                  section.layout === 'pair'
                    ? '(max-width: 768px) 100vw, 50vw'
                    : undefined
                }
                className={cn(
                  'case-figure',
                  section.layout === 'pair' && 'case-figure--pair',
                )}
                onOpen={onOpen}
              />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}

function LegacyBeforeAfterGallery({
  study,
  images,
  onOpen,
}: {
  study: CaseStudy;
  images: CaseStudyImage[];
  onOpen: (index: number) => void;
}) {
  const groups = partitionBeforeAfter(images);
  if (!groups) return null;

  return (
    <div className="case-figures" aria-label={`${study.title} before and after`}>
      <p className="case-figures__label">Before &amp; after</p>
      <BeforeAfterGallery
        study={study}
        before={groups.before}
        after={groups.after}
        onOpen={onOpen}
      />
    </div>
  );
}

export function CaseStudyGallery({ study }: { study: CaseStudy }) {
  const images = getCaseStudyGallery(study).filter((image) => isDisplayableImage(image.src));
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const narrative = partitionNarrativeGallery(images);
  const useCompare = !narrative && partitionBeforeAfter(images) !== null;
  const useTrioGrid =
    !narrative &&
    !useCompare &&
    images.length === 3 &&
    images.every((image) => !image.group && image.span !== 'wide');
  const useQuadGrid =
    !narrative &&
    !useCompare &&
    !useTrioGrid &&
    images.length === 4 &&
    images.every((image) => !image.group && image.span !== 'wide');
  const cropped = useTrioGrid || useQuadGrid;

  const closeLightbox = useCallback(() => setActiveIndex(null), []);
  const openLightbox = useCallback((index: number) => setActiveIndex(index), []);

  if (!images.length) return null;

  return (
    <>
      {narrative ? (
        <NarrativeCaseStudyGallery study={study} images={images} onOpen={openLightbox} />
      ) : useCompare ? (
        <LegacyBeforeAfterGallery study={study} images={images} onOpen={openLightbox} />
      ) : (
        <div className="case-figures" aria-label={`${study.title} project images`}>
          <p className="case-figures__label">Project visuals</p>
          <div
            className={cn(
              'case-figures__stack',
              useTrioGrid && 'case-figures__stack--trio',
              useQuadGrid && 'case-figures__stack--quad',
            )}
          >
            {images.map((image, index) => {
              const previousGroup = images[index - 1]?.group;
              const showGroupHeader = Boolean(image.group && image.group !== previousGroup);

              return (
                <Fragment key={`${image.src}-${index}`}>
                  {showGroupHeader ? (
                    <p className="case-figures__group">{image.group}</p>
                  ) : null}
                  <GalleryFigure
                    image={image}
                    study={study}
                    index={index}
                    cropped={cropped}
                    sizes={
                      useTrioGrid
                        ? '(max-width: 640px) 100vw, (max-width: 900px) 50vw, 33vw'
                        : useQuadGrid
                          ? '(max-width: 640px) 50vw, (max-width: 900px) 50vw, 25vw'
                          : undefined
                    }
                    className={cn(
                      'case-figure',
                      useTrioGrid && 'case-figure--trio',
                      useQuadGrid && 'case-figure--quad',
                    )}
                    onOpen={openLightbox}
                  />
                </Fragment>
              );
            })}
          </div>
        </div>
      )}

      <GalleryLightbox
        images={images}
        study={study}
        activeIndex={activeIndex}
        onClose={closeLightbox}
        onNavigate={openLightbox}
      />
    </>
  );
}
