'use client';

import { motion, useReducedMotion } from 'framer-motion';

import { SectionShell } from '@/components/portfolio/SectionShell';
import { TIMELINE } from '@/lib/portfolio-data';

export function Experience() {
  const reduced = useReducedMotion();

  return (
    <SectionShell
      id="experience"
      title="Gambling product design leadership"
      lead="From hands-on game design to Head of UI/UX and founder of Jurnii AI, building products, teams and systems across regulated gambling."
    >
      <ol className="experience-timeline">
        {TIMELINE.map((entry, index) => {
          const isFirst = index === 0;

          return (
            <motion.li
              key={entry.id}
              initial={reduced ? false : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-8%' }}
              transition={{ duration: 0.45, delay: index * 0.04, ease: [0.16, 1, 0.3, 1] }}
              className="experience-timeline-item"
            >
              <div className="experience-timeline-marker" aria-hidden>
                <span
                  className={
                    isFirst ? 'experience-timeline-dot is-active' : 'experience-timeline-dot'
                  }
                />
              </div>

              <article className="experience-timeline-content">
                <p className="experience-timeline-period">
                  <span>{entry.phase}</span>
                  <span className="experience-timeline-period-sep" aria-hidden>
                    ·
                  </span>
                  <span>{entry.location}</span>
                </p>

                <h3 className="experience-timeline-company">{entry.company}</h3>
                <p className="experience-timeline-role">{entry.role}</p>
                <p className="experience-timeline-summary">{entry.summary}</p>

                <ul className="experience-timeline-tags">
                  {entry.highlights.map((highlight) => (
                    <li key={highlight} className="experience-timeline-tag">
                      {highlight}
                    </li>
                  ))}
                </ul>
              </article>
            </motion.li>
          );
        })}
      </ol>
    </SectionShell>
  );
}
