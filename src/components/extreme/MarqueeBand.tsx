'use client';

const ITEMS = [
  'Head of Design · BetOnline',
  'Founder of Jurnii AI',
  'Casino · Sportsbook · Poker',
  'Design systems · Governance',
  'Customer research · VoC',
  'Remote · Sotogrande, Spain',
];

export function MarqueeBand() {
  const line = ITEMS.join('  ·  ');

  return (
    <div className="rule overflow-hidden bg-[var(--x-ink)] py-3 text-[var(--x-canvas)]">
      <div className="marquee-track">
        {[0, 1].map((copy) => (
          <span key={copy} className="type-label shrink-0 px-8 text-[var(--x-canvas)]">
            {line}
          </span>
        ))}
      </div>
    </div>
  );
}
