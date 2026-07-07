'use client';

import { useRef } from 'react';

import { AboutJourneyPortrait } from '@/components/site/AboutJourneyPortrait';
import { GlitchText } from '@/components/site/hud/GlitchText';
import { HudSectionShell } from '@/components/site/hud/HudSection';
import { Reveal } from '@/components/site/Reveal';
import { useMobile } from '@/hooks/use-mobile';
import { ABOUT, SITE } from '@/lib/portfolio-data';

const LEAD_PARAGRAPHS = ABOUT.lead.split('\n\n');
const PERSONAL_PARAGRAPHS = ABOUT.personal.split('\n\n');

export function AboutSection() {
  const isMobile = useMobile();
  const journeyRef = useRef<HTMLDivElement>(null);

  return (
    <HudSectionShell id="about" code="SEC_07 // ABOUT" className="about-section">
      <div className="shell about-shell">
        <Reveal className="about-intro" y={isMobile ? 0 : 32}>
          <p className="section-kicker">{ABOUT.personalTitle}</p>
          <h2 className="about-headline">
            <GlitchText as="span">{ABOUT.title}</GlitchText>
          </h2>
          <p className="about-meta">
            {SITE.role} · {ABOUT.persona.location}
          </p>
        </Reveal>

        <div className="about-layout">
          <Reveal className="about-story about-layout__story">
            {LEAD_PARAGRAPHS.map((paragraph) => (
              <p key={paragraph.slice(0, 28)}>{paragraph}</p>
            ))}
          </Reveal>

          <Reveal className="about-portrait-wrap about-layout__portrait">
            <figure className="about-portrait">
              <div className="about-portrait-stage" aria-hidden>
                <span className="about-portrait-orb" />
                <span className="about-portrait-grid" />
              </div>
              <AboutJourneyPortrait
                frames={ABOUT.journeyFrames}
                progressRef={journeyRef}
              />
              <div className="about-portrait-shade" aria-hidden />
            </figure>
          </Reveal>

          <div ref={journeyRef} className="about-journey about-layout__journey" aria-label="Personal journey">
            <p className="about-personal-label">The journey</p>
            {ABOUT.journeyFrames.map((frame, index) => (
              <article className="about-journey-beat expertise-row-surface" key={frame.label}>
                <span className="expertise-row-index" aria-hidden>
                  {String(index + 1).padStart(2, '0')}
                </span>
                <div className="expertise-row-main">
                  <h3 className="expertise-row-title">{frame.label}</h3>
                  <p className="expertise-row-body">{frame.beat}</p>
                </div>
              </article>
            ))}
          </div>

          <Reveal delay={0.08} className="about-personal about-layout__personal">
            <p className="about-personal-label">Personal</p>
            {PERSONAL_PARAGRAPHS.map((paragraph) => (
              <p key={paragraph.slice(0, 28)}>{paragraph}</p>
            ))}
          </Reveal>
        </div>
      </div>
    </HudSectionShell>
  );
}
