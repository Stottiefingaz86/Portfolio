import { SITE } from '@/lib/portfolio-data';

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="shell site-footer-inner">
        <p className="site-footer-name">{SITE.legalName}</p>
        <p className="site-footer-role">{SITE.role}</p>
        <p className="site-footer-copy">
          © {new Date().getFullYear()} {SITE.legalName} · {SITE.location}
        </p>
      </div>
    </footer>
  );
}
