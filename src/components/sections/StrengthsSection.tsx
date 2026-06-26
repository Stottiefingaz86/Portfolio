'use client';

import { TableExperience } from '@/components/portfolio/TableExperience';

export function StrengthsSection() {
  return (
    <section id="table" className="section-y rule-strong site-pad">
      <div className="grid gap-8 lg:grid-cols-2 lg:items-end">
        <h2 className="type-huge">
          Froot
          <br />
          Jarz
        </h2>
        <p className="type-body">
          Co-built at Spiffing Studios. Scroll into view and the reels drop. Cluster slot, jar wilds,
          full cascade engine.
        </p>
      </div>

      <div className="mt-12 overflow-hidden border border-[var(--x-line-strong)] bg-[var(--x-ink)]">
        <TableExperience />
      </div>
    </section>
  );
}
