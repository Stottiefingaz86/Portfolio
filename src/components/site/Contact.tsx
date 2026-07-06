import { ContactForm } from '@/components/site/ContactForm';
import { HudSectionShell } from '@/components/site/hud/HudSection';
import { Reveal } from '@/components/site/Reveal';
import { SectionHeader } from '@/components/site/SectionHeader';
import { SITE } from '@/lib/portfolio-data';

export function Contact() {
  return (
    <HudSectionShell id="contact" code="SEC_09 // CONTACT" className="contact-section">
      <div className="shell">
        <SectionHeader kicker="Contact" title="Let's talk about what's next" />

        <Reveal>
          <ContactForm />
        </Reveal>

        <Reveal className="contact-links" delay={0.06}>
          <a href={SITE.linkedin} className="contact-link" target="_blank" rel="noreferrer">
            LinkedIn
          </a>
          <a href={SITE.cv} className="contact-link">
            Download CV
          </a>
        </Reveal>

        <Reveal delay={0.08}>
          <p className="contact-note">{SITE.credibilityLine}</p>
        </Reveal>
      </div>
    </HudSectionShell>
  );
}
