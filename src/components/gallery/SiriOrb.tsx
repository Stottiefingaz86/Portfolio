'use client';

import { cn } from '@/lib/utils';

export interface SiriOrbProps {
  animationDuration?: number;
  className?: string;
  colors?: {
    bg?: string;
    c1?: string;
    c2?: string;
    c3?: string;
  };
  size?: string;
}

export function SiriOrb({
  size = '192px',
  className,
  colors,
  animationDuration = 20,
}: SiriOrbProps) {
  const finalColors = {
    bg: 'oklch(97% 0.01 264)',
    c1: 'oklch(62% 0.16 250)',
    c2: 'oklch(78% 0.12 210)',
    c3: 'oklch(72% 0.14 280)',
    ...colors,
  };

  const sizeValue = Number.parseInt(size.replace('px', ''), 10);
  const blurAmount = Math.max(sizeValue * 0.015, 4);
  const contrastAmount = Math.max(sizeValue * 0.008, 1.5);
  const dotSize = Math.max(sizeValue * 0.008, 0.1);
  const shadowSpread = Math.max(sizeValue * 0.008, 2);

  return (
    <div
      className={cn('siri-orb', className)}
      style={
        {
          width: size,
          height: size,
          '--bg': finalColors.bg,
          '--c1': finalColors.c1,
          '--c2': finalColors.c2,
          '--c3': finalColors.c3,
          '--animation-duration': `${animationDuration}s`,
          '--blur-amount': `${blurAmount}px`,
          '--contrast-amount': contrastAmount,
          '--dot-size': `${dotSize}px`,
          '--shadow-spread': `${shadowSpread}px`,
        } as React.CSSProperties
      }
    />
  );
}
