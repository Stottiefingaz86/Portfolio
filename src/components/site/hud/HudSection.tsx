import type { ReactNode } from 'react';

import { cn } from '@/lib/utils';

import { HudFrame } from './HudFrame';

type HudSectionShellProps = {
  id: string;
  code: string;
  className?: string;
  children: ReactNode;
};

export function HudSectionShell({ id, code, className, children }: HudSectionShellProps) {
  return (
    <section id={id} className={cn('section section--hud', className)}>
      <div className="section-hud-bg" aria-hidden />
      <p className="section-hud-code" aria-hidden>
        [ {code} ]
      </p>
      {children}
    </section>
  );
}

export function HudPanel({
  label,
  className,
  children,
}: {
  label?: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <HudFrame label={label} className={cn('hud-panel', className)}>
      {children}
    </HudFrame>
  );
}
