import { Reveal } from '@/components/portfolio/Reveal';
import { SectionShell } from '@/components/portfolio/SectionShell';
import { SITE } from '@/lib/portfolio-data';

export function Contact() {
  return (
    <SectionShell
      id="contact"
      loose
      display
      kicker="Contact"
      title="Let's talk about what's next"
      lead="I'm open to Head of Design, Design Director, Creative Director and senior product design leadership roles across online gambling, digital product, AI and design-to-dev workflows."
    >
      <Reveal>
        <div className="contact-panel">
          <div className="contact-links-stack">
            <a href={`mailto:${SITE.email}`} className="contact-link">
              {SITE.email}
            </a>
            <a href={SITE.linkedin} className="contact-link" target="_blank" rel="noreferrer">
              LinkedIn
            </a>
            <a href={SITE.cv} className="contact-link">
              Download CV
            </a>
          </div>
          <p className="contact-credibility">{SITE.credibilityLine}</p>
        </div>
      </Reveal>
    </SectionShell>
  );
}
