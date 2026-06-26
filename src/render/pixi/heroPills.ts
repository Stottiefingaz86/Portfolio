import { Container, Graphics, Text } from 'pixi.js';

import type { RoundResult } from '@/game/blackjack/engine';
import { tablePixelRatio } from './renderQuality';

function borderedPill(
  text: string,
  bg: number,
  fg: number,
  borderColor: number,
  fontSize: number,
): Container {
  const wrap = new Container();
  const t = new Text({
    text,
    resolution: tablePixelRatio(),
    roundPixels: true,
    style: {
      fontFamily: 'var(--font-mono), ui-monospace, monospace',
      fontSize,
      fontWeight: '700',
      fill: fg,
      letterSpacing: 1.4,
    },
  });
  const padX = 12;
  const padY = 5;
  const bw = Math.max(t.width + padX * 2, 44);
  const bh = t.height + padY * 2;
  const cr = bh / 2;
  const g = new Graphics();
  g.roundRect(-bw / 2, -bh / 2, bw, bh, cr).fill({ color: bg, alpha: 0.94 });
  g.roundRect(-bw / 2, -bh / 2, bw, bh, cr).stroke({ width: 1.5, color: borderColor, alpha: 0.9 });
  wrap.addChild(g);
  t.anchor.set(0.5, 0.5);
  wrap.addChild(t);
  return wrap;
}

export function resultTagLabel(result: Exclude<RoundResult, null>, playerBust: boolean): string {
  if (playerBust) return 'BUST';
  if (result === 'blackjack') return 'BLACKJACK';
  if (result === 'win') return 'WIN';
  if (result === 'push') return 'PUSH';
  return 'LOSE';
}

export function buildResultTag(
  result: Exclude<RoundResult, null>,
  playerBust: boolean,
  width: number,
): Container {
  const fs = Math.max(9, Math.min(11, width * 0.026));
  const label = resultTagLabel(result, playerBust);

  if (result === 'win' || result === 'blackjack') {
    return borderedPill(label, 0x14532d, 0xbbf7d0, 0x22c55e, fs);
  }
  if (result === 'push') {
    return borderedPill(label, 0x374151, 0xffffff, 0x6b7280, fs);
  }
  return borderedPill(label, 0x7f1d1d, 0xfecaca, 0xef4444, fs);
}
