import { Container, Sprite, Text, type Texture } from 'pixi.js';

import type { Card, Suit } from '@/game/domain/card';
import type { RoundResult } from '@/game/blackjack/engine';
import { scoreHand } from '@/game/blackjack/scoring';

import { buildPlayingCard } from './cardFace';
import { applyHeroFlight } from './heroCardFlights';
import { buildHeroLayout, getHeroLayoutMetrics, type CardPlacement } from './heroLayout';
import { buildResultTag } from './heroPills';
import { tablePixelRatio } from './renderQuality';

export function drawHeroTable(
  root: Container,
  dealer: Card[],
  player: Card[],
  width: number,
  height: number,
  suitTextures: Record<Suit, Texture> | null,
  cardBack: Texture | null,
  dealerIcon: Texture | null,
): void {
  while (root.children.length > 0) {
    root.removeChildAt(0).destroy({ children: true });
  }

  const metrics = getHeroLayoutMetrics(width, height);

  if (dealerIcon) {
    const icon = new Sprite(dealerIcon);
    icon.anchor.set(0.5, 1);
    const scale = metrics.iconSize / Math.max(dealerIcon.width, dealerIcon.height);
    icon.scale.set(scale);
    icon.x = width * 0.5;
    icon.y = metrics.iconBottom;
    icon.tint = 0x0a0a0a;
    icon.alpha = 0.92;
    root.addChild(icon);
  }

  const layout = buildHeroLayout(dealer, player, width, height);

  for (const card of dealer) {
    appendCard(root, card, layout, suitTextures, cardBack);
  }
  for (const card of player) {
    appendCard(root, card, layout, suitTextures, cardBack);
  }
}

function appendCard(
  root: Container,
  card: Card,
  layout: Map<string, import('./heroLayout').CardPlacement>,
  suitTextures: Record<Suit, Texture> | null,
  cardBack: Texture | null,
): void {
  const pl = layout.get(card.id);
  if (!pl) return;

  const motion = applyHeroFlight(card.id, pl);
  const wrap = new Container();
  wrap.x = motion.x;
  wrap.y = motion.y;
  wrap.alpha = motion.alpha;

  const renderCard = motion.flipShowBack ? { ...card, faceUp: false } : card;
  const g = buildPlayingCard(renderCard, motion.cw, motion.ch, suitTextures, cardBack);
  g.scale.x = motion.flipScaleX;
  wrap.addChild(g);
  root.addChild(wrap);
}

export function drawScorePills(
  root: Container,
  dealer: Card[],
  player: Card[],
  width: number,
  height: number,
  dealerLabel: string,
  playerLabel: string,
): void {
  const fs = Math.max(10, Math.min(13, width * 0.032));
  const style = {
    fontFamily: 'var(--font-mono), ui-monospace, monospace',
    fontSize: fs,
    fontWeight: '600' as const,
    fill: 0x0a0a0a,
    letterSpacing: 1.2,
  };
  const metrics = getHeroLayoutMetrics(width, height);
  const { playerY, playerCh } = metrics;

  if (dealer.length > 0) {
    const t = new Text({
      text: dealerLabel,
      resolution: tablePixelRatio(),
      roundPixels: true,
      style,
    });
    t.anchor.set(0.5, 0);
    t.x = width * 0.5;
    t.y = metrics.dealerScoreY;
    root.addChild(t);
  }

  if (player.length > 0) {
    const t = new Text({
      text: playerLabel,
      resolution: tablePixelRatio(),
      roundPixels: true,
      style,
    });
    t.anchor.set(0.5, 0);
    t.x = width * 0.5;
    t.y = playerY + playerCh * 0.62;
    root.addChild(t);
  }
}

function playerCardBounds(
  player: Card[],
  layout: Map<string, CardPlacement>,
  fallbackX: number,
  fallbackY: number,
  fallbackCh: number,
) {
  let minX = Infinity;
  let maxX = -Infinity;
  let minY = Infinity;
  let maxY = -Infinity;

  for (const card of player) {
    const pl = layout.get(card.id);
    if (!pl) continue;
    minX = Math.min(minX, pl.x - pl.cw / 2);
    maxX = Math.max(maxX, pl.x + pl.cw / 2);
    minY = Math.min(minY, pl.y - pl.ch / 2);
    maxY = Math.max(maxY, pl.y + pl.ch / 2);
  }

  if (minX === Infinity) {
    return {
      cx: fallbackX,
      midY: fallbackY,
      maxX: fallbackX + 40,
    };
  }

  return {
    cx: (minX + maxX) / 2,
    midY: (minY + maxY) / 2,
    maxX,
  };
}

export function drawResultTag(
  root: Container,
  dealer: Card[],
  player: Card[],
  width: number,
  height: number,
  result: RoundResult,
): void {
  if (!result || player.length === 0) return;

  const metrics = getHeroLayoutMetrics(width, height);
  const layout = buildHeroLayout(dealer, player, width, height);
  const { cx, midY, maxX } = playerCardBounds(
    player,
    layout,
    metrics.cx,
    metrics.playerY,
    metrics.playerCh,
  );

  const playerBust = scoreHand(player).bust;
  const tag = buildResultTag(result, playerBust, width);
  tag.x = width < 520 ? cx : maxX + 8;
  tag.y = midY;
  root.addChild(tag);
}
