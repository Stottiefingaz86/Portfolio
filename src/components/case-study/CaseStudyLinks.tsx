import { ArrowUpRightIcon } from 'lucide-react';

import { getCaseStudyLinks, type CaseStudy } from '@/lib/portfolio-data';

export function CaseStudyLinks({ study }: { study: CaseStudy }) {
  const links = getCaseStudyLinks(study);

  if (!links.length) return null;

  return (
    <div className="case-links">
      <p className="case-links__label">Project links</p>
      <ul className="case-links__list">
        {links.map((link) => (
          <li key={`${link.href}-${link.label}`}>
            <a
              href={link.href}
              className="case-link"
              {...(link.external
                ? { target: '_blank', rel: 'noreferrer' }
                : link.href.endsWith('.pdf')
                  ? { target: '_blank', rel: 'noreferrer' }
                  : {})}
            >
              <span>{link.label}</span>
              <ArrowUpRightIcon className="case-link__arrow" aria-hidden />
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
