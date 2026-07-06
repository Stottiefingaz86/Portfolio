import { GlitchText } from '@/components/site/hud/GlitchText';
import { HudSectionShell } from '@/components/site/hud/HudSection';
import { Reveal } from '@/components/site/Reveal';
import { ABOUT, SITE } from '@/lib/portfolio-data';
import { getAge } from '@/lib/utils';
import Image from 'next/image';

const LEAD_PARAGRAPHS = ABOUT.lead.split('\n\n');
const PERSONAL_PARAGRAPHS = ABOUT.personal.split('\n\n');

export function AboutSection() {
  return (
    <HudSectionShell id="about" code="SEC_07 // ABOUT" className="about-section">
      <div className="shell about-shell">
        <Reveal className="about-intro">
          <p className="section-kicker">{ABOUT.personalTitle}</p>
          <h2 className="about-headline">
            <GlitchText as="span">{ABOUT.title}</GlitchText>
          </h2>
          <p className="about-meta">
            {SITE.role} · {ABOUT.persona.location} · {ABOUT.birthDateLabel} ·{' '}
            {getAge(ABOUT.birthDate)}
          </p>
        </Reveal>

        <div className="about-layout">
          <Reveal className="about-portrait-wrap">
            <figure className="about-portrait">
              <div className="about-portrait-stage" aria-hidden>
                <span className="about-portrait-orb" />
                <span className="about-portrait-grid" />
              </div>
              <div className="about-portrait-media">
                <Image
                  src={ABOUT.portrait}
                  alt={ABOUT.portraitAlt}
                  fill
                  className="about-portrait-image"
                  sizes="(min-width: 1024px) 50vw, 100vw"
                />
              </div>
              <div className="about-portrait-shade" aria-hidden />
            </figure>
          </Reveal>

          <div className="about-copy">
            <Reveal className="about-story">
              {LEAD_PARAGRAPHS.map((paragraph) => (
                <p key={paragraph.slice(0, 28)}>{paragraph}</p>
              ))}
            </Reveal>

            <Reveal delay={0.08} className="about-personal">
              <p className="about-personal-label">Personal</p>
              {PERSONAL_PARAGRAPHS.map((paragraph) => (
                <p key={paragraph.slice(0, 28)}>{paragraph}</p>
              ))}
            </Reveal>
          </div>
        </div>
      </div>
    </HudSectionShell>
  );
}
