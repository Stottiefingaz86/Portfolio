import { SITE } from '@/lib/portfolio-data';

export function ExtremeFooter() {
  return (
    <footer className="site-pad py-12">
      <div className="rule-strong flex flex-col gap-8 pt-10 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="type-mega-outline text-[clamp(2rem,8vw,5rem)] normal-case">{SITE.name}</p>
          <p className="type-body mt-4 max-w-md">{SITE.subtitle}</p>
        </div>
        <p className="type-label">© {new Date().getFullYear()} {SITE.legalName}</p>
      </div>
    </footer>
  );
}
