'use client';

import Image from 'next/image';
import { useState } from 'react';

import { RingsAwayDemo } from '@/components/gallery/RingsAwayDemo';
import { RingsAwayDemoModal } from '@/components/gallery/RingsAwayDemoModal';
import { GALLERY } from '@/lib/portfolio-data';

function GalleryFrame({
  item,
  index,
  onOpenDemo,
}: {
  item: (typeof GALLERY)[number];
  index: number;
  onOpenDemo?: () => void;
}) {
  if (item.kind === 'orb') {
    return (
      <figure className="scroll-item group">
        <div className="relative aspect-[4/5] overflow-hidden">
          <RingsAwayDemo compact className="h-full" />
          <button
            type="button"
            onClick={onOpenDemo}
            className="absolute right-3 top-3 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white/95 text-[var(--x-ink)] shadow-[0_4px_16px_rgb(10_10_10_/_0.12)] transition-transform hover:scale-105"
            aria-label="Expand RingsAway demo"
          >
            ↗
          </button>
        </div>
        <figcaption className="mt-4 space-y-1">
          <div className="flex items-baseline justify-between gap-4">
            <span className="type-label">{String(index + 1).padStart(2, '0')}</span>
            <span className="type-label text-[var(--x-muted)]">{item.category}</span>
          </div>
          <p className="type-label text-[var(--x-ink)]">{item.project}</p>
          <p className="text-sm font-medium text-[var(--x-ink-soft)]">{item.title}</p>
        </figcaption>
      </figure>
    );
  }

  return (
    <figure className="scroll-item group">
      <div className="relative aspect-[4/5] overflow-hidden bg-[var(--x-ink)]">
        {item.image ? (
          <Image
            src={item.image}
            alt={`${item.title}, ${item.project}`}
            fill
            className="object-cover object-top transition-transform duration-500 ease-out group-hover:scale-[1.03]"
            sizes="(max-width: 768px) 70vw, 480px"
          />
        ) : null}
        <div className="absolute inset-0 bg-[var(--x-accent)] mix-blend-multiply opacity-0 transition-opacity duration-300 group-hover:opacity-30" />
      </div>
      <figcaption className="mt-4 space-y-1">
        <div className="flex items-baseline justify-between gap-4">
          <span className="type-label">{String(index + 1).padStart(2, '0')}</span>
          <span className="type-label text-[var(--x-muted)]">{item.category}</span>
        </div>
        <p className="type-label text-[var(--x-ink)]">{item.project}</p>
        <p className="text-sm font-medium text-[var(--x-ink-soft)]">{item.title}</p>
      </figcaption>
    </figure>
  );
}

export function GalleryScroll() {
  const [demoOpen, setDemoOpen] = useState(false);

  return (
    <>
      <section id="gallery" className="section-y rule-strong border-b-0 pt-0">
        <div className="site-pad mb-10 flex flex-col gap-4 md:mb-14 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="type-huge">Gallery</h2>
            <p className="type-body mt-4 max-w-lg">
              Selected product surfaces from BetOnline and RingsAway: betslip, VIP hub, casino and
              a live AI receptionist you can try.
            </p>
          </div>
          <p className="type-label">Drag →</p>
        </div>

        <div className="scroll-row site-pad pb-4">
          {GALLERY.map((item, index) => (
            <GalleryFrame
              key={item.id}
              item={item}
              index={index}
              onOpenDemo={item.kind === 'orb' ? () => setDemoOpen(true) : undefined}
            />
          ))}
        </div>
      </section>

      <RingsAwayDemoModal open={demoOpen} onClose={() => setDemoOpen(false)} />
    </>
  );
}
