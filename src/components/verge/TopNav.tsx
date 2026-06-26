'use client';

import { NAV_SECTIONS, SITE } from '@/lib/portfolio-data';

export function TopNav() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[var(--v-canvas)]/95 backdrop-blur-sm">
      <div className="container-verge flex h-16 items-center justify-between gap-4">
        <a
          href="#top"
          className="type-mono-label text-[var(--v-text)] hover:text-[var(--v-link-hover)]"
        >
          {SITE.name}
        </a>

        <nav className="hidden items-center gap-5 lg:flex">
          {NAV_SECTIONS.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className="nav-link type-mono-label text-[var(--v-secondary)] hover:text-[var(--v-link-hover)]"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href={SITE.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="type-mono-label hidden text-[var(--v-secondary)] sm:inline hover:text-[var(--v-link-hover)]"
          >
            LinkedIn
          </a>
          <a href="#contact" className="btn-mint">
            Hire me
          </a>
        </div>
      </div>
    </header>
  );
}
