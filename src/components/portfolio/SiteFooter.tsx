import { SITE } from '@/lib/portfolio-data';

export function SiteFooter() {
  return (
    <footer className="site-pad border-t border-[var(--x-line)] py-12">
      <div className="p-container flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
        <div>
          <p className="font-[family-name:var(--font-display)] text-lg font-medium tracking-[-0.025em] text-[var(--x-ink)]">
            {SITE.legalName}
          </p>
          <p className="type-body mt-2 max-w-md text-sm">{SITE.role}</p>
        </div>
        <p className="type-label text-[var(--x-muted)]">
          © {new Date().getFullYear()} {SITE.legalName} · {SITE.location}
        </p>
      </div>
    </footer>
  );
}
