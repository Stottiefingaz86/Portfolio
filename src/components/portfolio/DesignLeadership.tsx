import { DESIGN_LEADERSHIP } from '@/lib/portfolio-data';

import { Reveal } from './Reveal';
import { SectionShell } from './SectionShell';

export function DesignLeadership() {
  return (
    <SectionShell
      id="leadership"
      display
      kicker="Leadership"
      title={DESIGN_LEADERSHIP.title}
      lead={DESIGN_LEADERSHIP.intro}
    >
      <Reveal>
        <figure className="leadership-thesis">
          <blockquote className="leadership-thesis-quote">
            <p>{DESIGN_LEADERSHIP.philosophy.lead}</p>
          </blockquote>
          <figcaption className="leadership-thesis-caption">
            {DESIGN_LEADERSHIP.philosophy.body}
          </figcaption>
        </figure>
      </Reveal>

      <ul className="leadership-list" aria-label="Leadership principles">
        {DESIGN_LEADERSHIP.principles.map((principle, index) => (
          <li key={principle.title} className="leadership-item">
            <Reveal delay={index * 0.04}>
              <h3 className="leadership-item-title">{principle.title}</h3>
              <p className="leadership-item-body">{principle.body}</p>
            </Reveal>
          </li>
        ))}
      </ul>
    </SectionShell>
  );
}
