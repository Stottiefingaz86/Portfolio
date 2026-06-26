'use client';

import Image from 'next/image';

import { ABOUT, SITE } from '@/lib/portfolio-data';

const TITLE_LINES = ABOUT.title
  .split('. ')
  .map((line) => line.trim())
  .filter(Boolean)
  .map((line) => (line.endsWith('.') ? line : `${line}.`));

export function InterludeSection() {
  const leadParagraphs = ABOUT.lead.split('\n\n');
  const personalParagraphs = ABOUT.personal.split('\n\n');

  return (
    <section id="about" className="section-y site-pad">
      <header className="max-w-3xl">
        <h2 className="about-headline">
          {TITLE_LINES.map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
        </h2>
      </header>

      <div className="mt-10 max-w-[62ch] space-y-6 md:mt-14">
        {leadParagraphs.map((paragraph) => (
          <p key={paragraph.slice(0, 32)} className="type-body text-pretty">
            {paragraph}
          </p>
        ))}
      </div>

      <div className="mt-20 border-t border-[var(--x-line)] pt-14 md:mt-24 md:pt-16 lg:mt-32 lg:pt-20">
        <h3 className="type-huge">{ABOUT.personalTitle}</h3>

        <div className="about-me-grid mt-10 md:mt-14">
          <figure className="about-me-portrait">
            <Image
              src={ABOUT.portrait}
              alt={ABOUT.portraitAlt}
              width={640}
              height={640}
              className="about-me-portrait-image"
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 40vw, 360px"
              priority={false}
            />
            <figcaption className="type-label mt-4 text-[var(--x-muted)]">
              {SITE.legalName}
            </figcaption>
          </figure>

          <div className="space-y-6">
            {personalParagraphs.map((paragraph) => (
              <p key={paragraph.slice(0, 32)} className="type-body max-w-[62ch] text-pretty">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
