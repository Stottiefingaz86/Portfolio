'use client';

import Image from 'next/image';
import { Fragment } from 'react';

import { getCaseStudyGallery, type CaseStudy } from '@/lib/portfolio-data';
import { cn } from '@/lib/utils';

const IMAGE_PATTERN = /\.(jpe?g|png|webp|gif|avif)$/i;

function isDisplayableImage(src: string) {
  return IMAGE_PATTERN.test(src);
}

export function CaseStudyGallery({ study }: { study: CaseStudy }) {
  const images = getCaseStudyGallery(study).filter((image) => isDisplayableImage(image.src));
  const useQuadGrid =
    images.length === 4 && images.every((image) => !image.group && image.span !== 'wide');

  if (!images.length) return null;

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
                    <Image
                      src={image.src}
                      alt={image.alt ?? `${study.title} visual ${index + 1}`}
                      fill
                      className="case-figure__image case-figure__image--cover"
                      sizes="(max-width: 640px) 50vw, (max-width: 900px) 50vw, 25vw"
                    />
                  ) : (
                    <Image
                      src={image.src}
                      alt={image.alt ?? `${study.title} visual ${index + 1}`}
                      width={1600}
                      height={1000}
                      className="case-figure__image"
                      sizes="(max-width: 900px) 100vw, 56rem"
                    />
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
