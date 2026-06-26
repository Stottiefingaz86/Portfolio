import { CAREER_JOURNEY } from '@/lib/portfolio-data';

import { Reveal } from './Reveal';
import { SectionShell } from './SectionShell';

export function CareerJourney() {
  return (
    <SectionShell
      id="journey"
      tone="elevated"
      title={CAREER_JOURNEY.title}
      lead={CAREER_JOURNEY.lead}
    >
      <div className="journey-layout">
        <Reveal>
          <p className="journey-prose whitespace-pre-line">{CAREER_JOURNEY.body}</p>
        </Reveal>

        <ol className="journey-track" aria-label="Career phases">
          {CAREER_JOURNEY.phases.map((phase) => (
            <li key={phase.id} className="journey-step">
              <p className="journey-step-label">{phase.label}</p>
              <p className="journey-step-detail">{phase.detail}</p>
            </li>
          ))}
        </ol>
      </div>
    </SectionShell>
  );
}
