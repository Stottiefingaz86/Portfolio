import { WHAT_I_BRING } from '@/lib/portfolio-data';

import { Reveal } from './Reveal';
import { SectionShell } from './SectionShell';

export function WhatIBring() {
  return (
    <SectionShell
      id="bring"
      display
      kicker="Expertise"
      title="What I bring"
      lead="Design leadership for gambling products: teams, systems, research and the commercial judgment to connect craft to outcomes."
    >
      <ol className="expertise-capabilities" aria-label="Core capabilities">
        {WHAT_I_BRING.map((item, index) => (
          <li key={item.id} className="expertise-capability">
            <Reveal delay={index * 0.04}>
              <h3 className="expertise-capability-title">{item.title}</h3>
              <p className="expertise-capability-body">{item.body}</p>
            </Reveal>
          </li>
        ))}
      </ol>
    </SectionShell>
  );
}
