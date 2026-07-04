import { SITE } from '@/lib/portfolio-data';

import { SectionLockupMark } from '@/components/site/hud/SectionLockupMark';

export function Footer() {
  return (
    <footer className="site-footer site-footer--hud">
      <div className="shell site-footer-inner">
        <p className="section-hud-code site-footer-code" aria-hidden>
          [ SYS_END // FOOTER ]
        </p>
        <div className="site-footer-lockup">
          <SectionLockupMark src={SITE.lockupLogo} alt={SITE.lockupLogoAlt} />
        </div>
        <p className="site-footer-name">
          {SITE.legalName}
        </p>
        <p className="site-footer-role">{SITE.role}</p>
        <p className="site-footer-copy">
          © {new Date().getFullYear()} {SITE.legalName} · {SITE.location}
        </p>
      </div>
    </footer>
  );
}
