'use client';

import Image from 'next/image';
import { Fragment } from 'react';

import { getCaseStudyGallery, type CaseStudy } from '@/lib/portfolio-data';

const IMAGE_PATTERN = /\.(jpe?g|png|webp|gif|avif)$/i;

function isDisplayableImage(src: string) {
  return IMAGE_PATTERN.test(src);
}

export function CaseStudyGallery({ study }: { study: CaseStudy }) {
  const images = getCaseStudyGallery(study).filter((image) => isDisplayableImage(image.src));

  if (!images.length) return null;

  return (
    <div className="case-figures" aria-label={`${study.title} project images`}>
      <p className="case-figures__label">Project visuals</p>
      <div className="case-figures__stack">
        {images.map((image, index) => {
          const previousGroup = images[index - 1]?.group;
          const showGroupHeader = Boolean(image.group && image.group !== previousGroup);

          return (
            <Fragment key={`${image.src}-${index}`}>
              {showGroupHeader ? (
                <p className="case-figures__group">{image.group}</p>
              ) : null}
              <figure className="case-figure">
                <div className="case-figure__media">
                  <Image
                    src={image.src}
                    alt={image.alt ?? `${study.title} visual ${index + 1}`}
                    width={1600}
                    height={1000}
                    className="case-figure__image"
                    sizes="(max-width: 900px) 100vw, 56rem"
                  />
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
