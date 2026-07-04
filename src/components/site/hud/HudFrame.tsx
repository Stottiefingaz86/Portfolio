import type { ReactNode } from 'react';

import { cn } from '@/lib/utils';

export function HudFrame({
  label,
  children,
  className,
}: {
  label?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn('hud-frame', className)}>
      <span className="hud-frame__corner hud-frame__corner--tl" aria-hidden />
      <span className="hud-frame__corner hud-frame__corner--tr" aria-hidden />
      <span className="hud-frame__corner hud-frame__corner--bl" aria-hidden />
      <span className="hud-frame__corner hud-frame__corner--br" aria-hidden />
      <span className="hud-frame__rail hud-frame__rail--top" aria-hidden />
      <span className="hud-frame__rail hud-frame__rail--bottom" aria-hidden />

      {label ? <p className="hud-frame__label">{label}</p> : null}
      <div className="hud-frame__body">{children}</div>
    </div>
  );
}
