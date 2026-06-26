import type { Card } from '@/game/domain/card';

export interface CardPlacement {
  x: number;
  y: number;
  cw: number;
  ch: number;
}

export interface HeroLayoutMetrics {
  cx: number;
  padTop: number;
  iconSize: number;
  iconBottom: number;
  dealerScoreY: number;
  dealerCw: number;
  dealerCh: number;
  dealerSpread: number;
  playerCw: number;
  playerCh: number;
  playerSpread: number;
  dealerY: number;
  playerY: number;
}

function rowSpread(cardCount: number, cw: number, baseSpread: number, maxRowWidth: number): number {
  if (cardCount <= 1) return 0;
  const maxSpread = (maxRowWidth - cw) / (cardCount - 1);
  return Math.min(baseSpread, Math.max(cw * 0.38, maxSpread));
}

function computeMetrics(
  width: number,
  height: number,
  playerCw: number,
  padTop: number,
  padBottom: number,
): HeroLayoutMetrics {
  const cx = width * 0.5;

  const playerCh = playerCw * 1.4;
  const playerSpread = playerCw * 0.54;

  const dealerScale = 0.8;
  const dealerCw = playerCw * dealerScale;
  const dealerCh = dealerCw * 1.4;
  const dealerSpread = dealerCw * 0.52;

  const iconSize = Math.min(32, width * 0.08);
  const iconBottom = padTop + iconSize;
  const iconToScoreGap = 10;
  const scoreToCardsGap = 18;
  const dealerScoreY = iconBottom + iconToScoreGap;
  const dealerCardTop = dealerScoreY + scoreToCardsGap;
  const dealerY = dealerCardTop + dealerCh * 0.5;
  const handGap = Math.max(playerCh * 0.22, 22);
  const playerY = dealerY + dealerCh * 0.42 + handGap + playerCh * 0.5;

  return {
    cx,
    padTop,
    iconSize,
    iconBottom,
    dealerScoreY,
    dealerCw,
    dealerCh,
    dealerSpread,
    playerCw,
    playerCh,
    playerSpread,
    dealerY,
    playerY,
  };
}

function contentBottom(metrics: HeroLayoutMetrics): number {
  return metrics.playerY + metrics.playerCh * 0.5 + 26;
}

export function getHeroLayoutMetrics(width: number, height: number): HeroLayoutMetrics {
  const padTop = Math.max(20, height * 0.04);
  const padBottom = Math.max(24, height * 0.05);

  let playerCw = Math.min(width * 0.34, 128);

  for (let attempt = 0; attempt < 12; attempt += 1) {
    const metrics = computeMetrics(width, height, playerCw, padTop, padBottom);
    if (contentBottom(metrics) <= height - padBottom) {
      return metrics;
    }
    playerCw *= 0.88;
  }

  return computeMetrics(width, height, playerCw, padTop, padBottom);
}

export function buildHeroLayout(
  dealer: Card[],
  player: Card[],
  width: number,
  height: number,
): Map<string, CardPlacement> {
  const map = new Map<string, CardPlacement>();
  const metrics = getHeroLayoutMetrics(width, height);
  const maxRowWidth = width * 0.92;

  const placeRow = (
    cards: Card[],
    y: number,
    cw: number,
    ch: number,
    baseSpread: number,
  ) => {
    const spread = rowSpread(cards.length, cw, baseSpread, maxRowWidth);
    const totalW = (cards.length - 1) * spread;
    cards.forEach((card, i) => {
      map.set(card.id, {
        x: metrics.cx - totalW / 2 + i * spread,
        y,
        cw,
        ch,
      });
    });
  };

  placeRow(dealer, metrics.dealerY, metrics.dealerCw, metrics.dealerCh, metrics.dealerSpread);
  placeRow(player, metrics.playerY, metrics.playerCw, metrics.playerCh, metrics.playerSpread);
  return map;
}

export function deckOrigin(width: number, height: number, cw = 80) {
  const compact = width < 640;
  const deckCx = compact ? width * 0.66 : width * 0.72;
  return { x: deckCx - cw / 2, y: height * 0.08 };
}

export function playerCenter(width: number, height: number) {
  const { cx, playerY } = getHeroLayoutMetrics(width, height);
  return { x: cx, y: playerY };
}
