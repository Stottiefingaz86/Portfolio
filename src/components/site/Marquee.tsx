'use client';

const ITEMS = [
  'Head of Design · BetOnline',
  'Founder · Jurnii AI',
  'Casino · Sportsbook · Poker',
  'Design systems · Governance',
  'AI design-to-dev',
  'Remote · Sotogrande',
];

export function Marquee() {
  const line = ITEMS.join('   ·   ');

  return (
    <div className="marquee" aria-hidden>
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
