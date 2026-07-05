import type { CareerPhase, CareerPhaseCompany } from '@/lib/portfolio-data';

function companyMeta(company: CareerPhaseCompany) {
  if (company.location && company.detail) {
    return `${company.location} · ${company.detail}`;
  }

  return company.location ?? company.detail ?? null;
}

function PhaseCompanyList({ phase }: { phase: CareerPhase }) {
  return (
    <p className="phase-companies" aria-label={`${phase.title} companies`}>
      {phase.companies.map((company, companyIndex) => (
        <span key={`${phase.id}-${company.name}`} className="phase-company">
          {companyIndex > 0 ? (
            <span className="phase-company-sep" aria-hidden>
              {' '}
              /{' '}
            </span>
          ) : null}
          <span className="phase-company-name">{company.name}</span>
        </span>
      ))}
    </p>
  );
}

function PhaseCompanyTimeline({ phase }: { phase: CareerPhase }) {
  return (
    <ol className="phase-timeline" aria-label={`${phase.title} companies`}>
      {phase.companies.map((company, index) => {
        const meta = companyMeta(company);

        return (
          <li key={`${phase.id}-${company.name}`} className="phase-timeline-item">
            {company.year ? (
              <span className="phase-timeline-year">{company.year}</span>
            ) : (
              <span className="phase-timeline-year phase-timeline-year--spacer" aria-hidden />
            )}
            <span className="phase-timeline-marker" aria-hidden>
              <span className="phase-timeline-dot" />
              <span
                className={
                  index === phase.companies.length - 1
                    ? 'phase-timeline-line phase-timeline-line--trail'
                    : 'phase-timeline-line'
                }
              />
            </span>
            <span className="phase-timeline-name">{company.name}</span>
            {meta ? (
              <span className="phase-timeline-location">{meta}</span>
            ) : (
              <span className="phase-timeline-location phase-timeline-location--spacer" aria-hidden />
            )}
          </li>
        );
      })}
    </ol>
  );
}

export function PhaseCompanies({ phase }: { phase: CareerPhase }) {
  const hasTimeline = phase.companies.some((company) => company.year);

  if (hasTimeline) {
    return <PhaseCompanyTimeline phase={phase} />;
  }

  return <PhaseCompanyList phase={phase} />;
}
