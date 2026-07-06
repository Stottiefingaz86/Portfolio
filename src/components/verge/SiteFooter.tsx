import { SITE } from '@/lib/portfolio-data';

export function SiteFooter() {
  return (
    <footer className="border-t border-white/10 px-6 py-16 lg:px-12">
      <div className="container-verge">
        <p className="type-wordmark text-[clamp(2rem,6vw,3.5rem)]">{SITE.name}</p>
        <p className="type-body mt-5 max-w-lg">{SITE.subtitle}</p>

        <div className="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="type-mono-label">Work</p>
            <ul className="mt-4 space-y-2 type-body">
              <li>
                <a href="#gallery">Gallery</a>
              </li>
              <li>
                <a href="#use-cases">Use cases</a>
              </li>
              <li>
                <a href="#experience">Experience</a>
              </li>
            </ul>
          </div>
          <div>
            <p className="type-mono-label">Expertise</p>
            <ul className="mt-4 space-y-2 type-body">
              <li>Sportsbook UX</li>
              <li>Offshore gambling</li>
              <li>AI customer experience</li>
              <li>Design leadership</li>
            </ul>
          </div>
          <div>
            <p className="type-mono-label">Contact</p>
            <ul className="mt-4 space-y-2 type-body">
              <li>
                <a href="#contact">Contact form</a>
              </li>
              <li>
                <a href={SITE.linkedin} target="_blank" rel="noopener noreferrer">
                  LinkedIn
                </a>
              </li>
            </ul>
          </div>
          <div>
            <p className="type-mono-label">About</p>
            <p className="type-body mt-4">{SITE.role}</p>
          </div>
        </div>

        <p className="type-mono-label mt-14 text-[var(--v-secondary)]">
          © {new Date().getFullYear()} Christopher Hunt · {SITE.name}
        </p>
      </div>
    </footer>
  );
}
