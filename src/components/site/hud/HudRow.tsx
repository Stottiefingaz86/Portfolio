import type { ReactNode } from 'react';

import { cn } from '@/lib/utils';

export function HudRow({
  code,
  className,
  children,
}: {
  code?: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={cn('hud-row', className)}>
      {code ? <p className="hud-row__code">{code}</p> : null}
      <div className="hud-row__body">{children}</div>
    </div>
  );
}
