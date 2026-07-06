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

function partitionBeforeAfter(images: CaseStudyImage[]) {
  const before = images.filter((image) => image.group?.toLowerCase() === 'before');
  const after = images.filter((image) => image.group?.toLowerCase() === 'after');

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
  sizes,
  className,
  mediaClassName,
  onOpen,
}: {
  image: CaseStudyImage;
  study: CaseStudy;
  index: number;
  cropped?: boolean;
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
            mediaClassName,
          )}
        >
          {cropped ? (
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
  images,
  onOpen,
}: {
  study: CaseStudy;
  images: CaseStudyImage[];
  onOpen: (index: number) => void;
}) {
  const groups = partitionBeforeAfter(images);
  if (!groups) return null;

  const { before, after } = groups;

  return (
    <div className="case-figures" aria-label={`${study.title} before and after`}>
      <p className="case-figures__label">Before &amp; after</p>
      <div className="case-figures__stack case-figures__stack--compare">
        <div className="case-figures__compare-header" aria-hidden>
          <span className="case-figures__compare-label case-figures__compare-label--before">
            Before
          </span>
          <span className="case-figures__compare-divider" />
          <span className="case-figures__compare-label case-figures__compare-label--after">
            After
          </span>
        </div>

        {before.map((beforeImage, rowIndex) => {
          const beforeGalleryIndex = rowIndex;
          const afterGalleryIndex = before.length + rowIndex;

          return (
            <div className="case-figures__compare-row" key={`${beforeImage.src}-${rowIndex}`}>
              <CompareFigure
                image={beforeImage}
                study={study}
                index={beforeGalleryIndex}
                onOpen={onOpen}
              />
              <CompareFigure
                image={after[rowIndex]}
                study={study}
                index={afterGalleryIndex}
                onOpen={onOpen}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function CaseStudyGallery({ study }: { study: CaseStudy }) {
  const images = getCaseStudyGallery(study).filter((image) => isDisplayableImage(image.src));
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const useCompare = partitionBeforeAfter(images) !== null;
  const useTrioGrid =
    !useCompare &&
    images.length === 3 &&
    images.every((image) => !image.group && image.span !== 'wide');
  const useQuadGrid =
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
      {useCompare ? (
        <BeforeAfterGallery study={study} images={images} onOpen={openLightbox} />
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
