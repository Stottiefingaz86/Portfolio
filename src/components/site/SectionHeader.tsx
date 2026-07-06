'use client';

import { GlitchText } from '@/components/site/hud/GlitchText';
import { Reveal } from '@/components/site/Reveal';
import { useMobile } from '@/hooks/use-mobile';

export function SectionHeader({
  kicker,
  title,
  lead,
}: {
  kicker: string;
  title: string;
  lead?: string;
}) {
  const isMobile = useMobile();

  return (
    <Reveal className="section-header" y={isMobile ? 0 : 32}>
      <p className="section-kicker">{kicker}</p>
      <h2 className="section-title">
        <GlitchText as="span">{title}</GlitchText>
      </h2>
      {lead ? <p className="section-lead">{lead}</p> : null}
    </Reveal>
  );
}
