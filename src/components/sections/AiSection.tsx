'use client';

import { AI_MILESTONES, LEADERSHIP_PHILOSOPHY, WHAT_I_BRING } from '@/lib/portfolio-data';

export function AiSection() {
  return (
    <section id="ai" className="section-y site-pad">
      <h2 className="type-huge mb-16">What I Bring</h2>

      <div className="grid gap-px bg-[var(--x-line-strong)] sm:grid-cols-2 lg:grid-cols-4">
        {WHAT_I_BRING.map((card) => (
          <div key={card.id} className="bg-[var(--x-canvas)] p-8 md:p-10">
            <h3 className="text-lg font-medium text-[var(--x-ink)]">{card.title}</h3>
            <p className="type-body mt-4 text-sm">{card.body}</p>
          </div>
        ))}
      </div>

      <div className="mt-24 border-t border-[var(--x-line)] pt-16 lg:mt-32 lg:pt-20">
        <h3 className="type-title max-w-3xl text-balance text-[clamp(1.5rem,3vw,2.5rem)]">
          {LEADERSHIP_PHILOSOPHY.title}
        </h3>
        <p className="type-body mt-8 max-w-3xl whitespace-pre-line">{LEADERSHIP_PHILOSOPHY.body}</p>
      </div>

      <div className="mt-20 space-y-0 rule-strong">
        <h3 className="type-title mb-12">Jurnii AI</h3>
        {AI_MILESTONES.map((milestone, index) => (
          <article
            key={milestone.id}
            className="grid gap-6 border-t border-[var(--x-line)] py-10 md:grid-cols-[8rem_1fr_4rem]"
          >
            <p className="type-label">{milestone.phase}</p>
            <div>
              <h4 className="type-title text-[clamp(1.5rem,3vw,2.5rem)]">{milestone.title}</h4>
              <p className="type-body mt-4">{milestone.summary}</p>
            </div>
            <p className="type-label md:text-right">{String(index + 1).padStart(2, '0')}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
