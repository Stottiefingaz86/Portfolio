import { GlitchText } from '@/components/site/hud/GlitchText';
import { Reveal } from '@/components/site/Reveal';

export function SectionHeader({
  kicker,
  title,
  lead,
}: {
  kicker: string;
  title: string;
  lead?: string;
}) {
  return (
    <Reveal className="section-header">
      <p className="section-kicker">{kicker}</p>
      <h2 className="section-title">
        <GlitchText as="span">{title}</GlitchText>
      </h2>
      {lead ? <p className="section-lead">{lead}</p> : null}
    </Reveal>
  );
}
