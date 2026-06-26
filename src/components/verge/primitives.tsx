import type { ReactNode } from 'react';

import { cn } from '@/lib/utils';

export function Panel({
  children,
  className,
  featured,
}: {
  children: ReactNode;
  className?: string;
  featured?: boolean;
}) {
  return (
    <div className={cn('panel', featured && 'panel-featured', className)}>{children}</div>
  );
}

export function AccentTag({ children }: { children: ReactNode }) {
  return <span className="accent-tag">{children}</span>;
}

export function SectionIntro({
  title,
  lead,
  kicker,
}: {
  title: string;
  lead?: string;
  kicker?: string;
}) {
  return (
    <header className="max-w-3xl">
      {kicker ? <p className="type-mono-kicker">{kicker}</p> : null}
      <h2 className={cn('type-display', kicker ? 'mt-3' : '')}>{title}</h2>
      {lead ? <p className="type-body mt-5">{lead}</p> : null}
    </header>
  );
}
