'use client';

import { motion, useReducedMotion } from 'framer-motion';

import { TIMELINE } from '@/lib/portfolio-data';

export function ExperienceTimeline() {
  const reduced = useReducedMotion();

  return (
    <section id="experience" className="section-y invert-section site-pad">
      <header className="max-w-3xl border-b border-white/10 pb-10 lg:pb-14">
        <h2 className="type-huge text-white">Experience</h2>
        <p className="type-body-light mt-6 text-pretty">
          I design the products, systems and journeys behind modern gambling experiences, from
          hands-on game design to Head of UI/UX and founder of Jurnii AI.
        </p>
      </header>

      <ol className="experience-timeline mt-12 lg:mt-16">
        {TIMELINE.map((entry, index) => {
          const isFirst = index === 0;

          return (
            <motion.li
              key={entry.id}
              initial={reduced ? false : { opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-8%' }}
              transition={{ duration: 0.5, delay: index * 0.04, ease: [0.16, 1, 0.3, 1] }}
              className="experience-timeline-item"
            >
              <div className="experience-timeline-marker" aria-hidden>
                <span
                  className={isFirst ? 'experience-timeline-dot is-active' : 'experience-timeline-dot'}
                />
              </div>

              <article className="experience-timeline-content">
                <div className="experience-timeline-meta">
                  <p className="experience-timeline-year">{entry.phase}</p>
                  <p className="type-label text-white/45">{entry.location}</p>
                </div>

                <h3 className="experience-timeline-company">{entry.company}</h3>
                <p className="type-label mt-3 text-white/60">{entry.role}</p>
                <p className="type-body-light mt-5 max-w-[62ch] text-pretty">{entry.summary}</p>

                <ul className="mt-6 flex flex-wrap gap-2.5">
                  {entry.highlights.map((highlight) => (
                    <li
                      key={highlight}
                      className="type-label rounded-full border border-white/16 px-3 py-1.5 text-white/65"
                    >
                      {highlight}
                    </li>
                  ))}
                </ul>
              </article>
            </motion.li>
          );
        })}
      </ol>
    </section>
  );
}
