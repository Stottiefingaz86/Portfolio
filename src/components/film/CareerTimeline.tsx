'use client';

import { Reveal } from '@/components/portfolio/Reveal';
import { CAREER_JOURNEY, CAREER_PHASES } from '@/lib/portfolio-data';

export function CareerTimeline() {
  return (
    <section
      id="journey"
      className="experience-section section-y site-pad"
      aria-label="Career journey"
    >
      <div className="p-container">
        <Reveal>
          <header className="section-head">
            <p className="section-kicker">Career journey</p>
            <h2 className="type-section-display text-balance">{CAREER_JOURNEY.title}</h2>
            <p className="section-lead">{CAREER_JOURNEY.lead}</p>
          </header>
        </Reveal>

        <ol className="experience-list">
          {CAREER_PHASES.map((phase, index) => (
            <li key={phase.id} className="experience-list-item">
              <Reveal delay={index * 0.03}>
                <div className="experience-list-row">
                  <p className="experience-list-period">{phase.title}</p>
                  <article className="experience-list-body">
                    <p className="experience-list-summary">{phase.body}</p>
                  </article>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
