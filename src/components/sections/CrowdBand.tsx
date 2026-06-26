'use client';

import { CrowdCanvas } from '@/components/ui/skiper-ui/skiper39';

export function CrowdBand() {
  return (
    <section
      aria-hidden
      className="relative h-[min(90vh,640px)] w-full overflow-hidden bg-[var(--x-canvas)]"
    >
      <div className="absolute inset-0">
        <CrowdCanvas src="/images/peeps/all-peeps.png" rows={15} cols={7} />
      </div>
    </section>
  );
}
