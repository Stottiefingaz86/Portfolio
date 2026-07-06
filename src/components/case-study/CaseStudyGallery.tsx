'use client';

import Image from 'next/image';
import { Fragment } from 'react';

import { getCaseStudyGallery, type CaseStudy, type CaseStudyImage } from '@/lib/portfolio-data';
import { cn } from '@/lib/utils';
import { RetroMediaFx } from '@/components/case-study/RetroMediaFx';

const IMAGE_PATTERN = /\.(jpe?g|png|webp|gif|avif)$/i;

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

function CompareFigure({
  image,
  study,
  index,
}: {
  image: CaseStudyImage;
  study: CaseStudy;
  index: number;
}) {
  return (
    <figure className="case-figure case-figure--compare">
      <div className="case-figure__media case-figure__media--compare">
        <Image
          src={image.src}
          alt={image.alt ?? `${study.title} visual ${index + 1}`}
          fill
          className="case-figure__image case-figure__image--cover"
          sizes="(max-width: 640px) 42vw, 22rem"
        />
        <RetroMediaFx />
      </div>
      {image.caption || image.alt ? (
        <figcaption className="case-figure__caption case-figure__caption--compare">
          {image.caption ?? image.alt}
        </figcaption>
      ) : null}
    </figure>
  );
}

function BeforeAfterGallery({ study, images }: { study: CaseStudy; images: CaseStudyImage[] }) {
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

        {before.map((beforeImage, index) => (
          <div className="case-figures__compare-row" key={`${beforeImage.src}-${index}`}>
            <CompareFigure image={beforeImage} study={study} index={index} />
            <CompareFigure image={after[index]} study={study} index={index} />
          </div>
        ))}
      </div>
    </div>
  );
}

export function CaseStudyGallery({ study }: { study: CaseStudy }) {
  const images = getCaseStudyGallery(study).filter((image) => isDisplayableImage(image.src));
  const useCompare = partitionBeforeAfter(images) !== null;
  const useQuadGrid =
    !useCompare &&
    images.length === 4 &&
    images.every((image) => !image.group && image.span !== 'wide');

  if (!images.length) return null;

  if (useCompare) {
    return <BeforeAfterGallery study={study} images={images} />;
  }

  return (
    <div className="case-figures" aria-label={`${study.title} project images`}>
      <p className="case-figures__label">Project visuals</p>
      <div className={cn('case-figures__stack', useQuadGrid && 'case-figures__stack--quad')}>
        {images.map((image, index) => {
          const previousGroup = images[index - 1]?.group;
          const showGroupHeader = Boolean(image.group && image.group !== previousGroup);

          return (
            <Fragment key={`${image.src}-${index}`}>
              {showGroupHeader ? (
                <p className="case-figures__group">{image.group}</p>
              ) : null}
              <figure className={cn('case-figure', useQuadGrid && 'case-figure--quad')}>
                <div className="case-figure__media">
                  {useQuadGrid ? (
                    <>
                      <Image
                        src={image.src}
                        alt={image.alt ?? `${study.title} visual ${index + 1}`}
                        fill
                        className="case-figure__image case-figure__image--cover"
                        sizes="(max-width: 640px) 50vw, (max-width: 900px) 50vw, 25vw"
                      />
                      <RetroMediaFx />
                    </>
                  ) : (
                    <>
                      <Image
                        src={image.src}
                        alt={image.alt ?? `${study.title} visual ${index + 1}`}
                        width={1600}
                        height={1000}
                        className="case-figure__image"
                        sizes="(max-width: 900px) 100vw, 56rem"
                      />
                      <RetroMediaFx />
                    </>
                  )}
                </div>
                {image.caption || image.alt ? (
                  <figcaption className="case-figure__caption">
                    {image.caption ?? image.alt}
                  </figcaption>
                ) : null}
              </figure>
            </Fragment>
          );
        })}
      </div>
    </div>
  );
}
