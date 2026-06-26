import { Reveal } from '@/components/portfolio/Reveal';
import { cn } from '@/lib/utils';

export function SectionShell({
  id,
  title,
  lead,
  kicker,
  aside,
  children,
  className,
  tone = 'default',
  loose = false,
  display = false,
}: {
  id: string;
  title: string;
  lead?: string;
  kicker?: string;
  aside?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  tone?: 'default' | 'elevated';
  loose?: boolean;
  display?: boolean;
}) {
  return (
    <section
      id={id}
      className={cn(
        loose ? 'section-y-loose' : 'section-y',
        tone === 'elevated' && 'section-tone-elevated',
        className,
      )}
    >
      <div className="p-container site-pad">
        <Reveal>
          <header className="section-head">
            <div className="section-head-grid">
              <div className="section-head-primary">
                {kicker ? <p className="section-kicker">{kicker}</p> : null}
                <h2
                  className={cn(
                    'text-balance',
                    display ? 'type-section-display' : 'type-section-title',
                  )}
                >
                  {title}
                </h2>
                {lead ? <p className="section-lead">{lead}</p> : null}
              </div>
              {aside ? <div className="section-head-aside">{aside}</div> : null}
            </div>
          </header>
        </Reveal>
        {children}
      </div>
    </section>
  );
}
