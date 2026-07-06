'use client';

const STREAM = [
  '408-805-565',
  '239.113.75.113',
  'OFFSHORE_UX',
  'JURNII_AI_SYS',
  'CASINO_SBK_POKER',
  'DS_GOVERNANCE',
  'AI_DESIGN_DEV',
  'SOTOGRANDE_ES',
  'VP_UI_UX',
  'CREATIVE_DIR',
] as const;

export function Marquee() {
  const line = STREAM.map((item) => `PKT_DATA_ ${item}`).join('   ·   ');

  return (
    <div className="marquee marquee--hud" aria-hidden>
      <div className="marquee-track">
        {[0, 1, 2].map((copy) => (
          <span key={copy} className="marquee-item">
            {line}
          </span>
        ))}
      </div>
    </div>
  );
}
