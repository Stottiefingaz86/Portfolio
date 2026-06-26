/**
 * Playing-card renderer matching the Spiffing Studios visual style.
 */
import { Container, FillGradient, Graphics, Sprite, Text, Texture } from 'pixi.js';

import type { Card, Suit } from '@/game/domain/card';

import { tablePixelRatio } from './renderQuality';

const CARD_FACE = 0xffffff;

const LABEL_RES = (): number => tablePixelRatio();

function suitColor(suit: Suit): number {
  return suit === 'hearts' || suit === 'diamonds' ? 0xe6315f : 0x231f20;
}

export function buildPlayingCard(
  card: Card,
  cw: number,
  ch: number,
  suitTextures: Record<Suit, Texture> | null,
  cardBack: Texture | null,
): Container {
  const root = new Container();
  const r = Math.min(10, cw * 0.11);

  const shadow = new Graphics();
  shadow
    .roundRect(-cw / 2 + 0.5, -ch / 2 + 2, cw, ch, r)
    .fill({ color: 0x000000, alpha: 0.18 });
  root.addChild(shadow);

  if (!card.faceUp) {
    drawCardBack(root, cw, ch, r, cardBack);
    return root;
  }

  const body = new Graphics();
  body.roundRect(-cw / 2, -ch / 2, cw, ch, r).fill({ color: CARD_FACE });
  body.roundRect(-cw / 2, -ch / 2, cw, ch, r).stroke({
    width: 0.7,
    color: 0xd1d5db,
    alpha: 0.6,
  });
  root.addChild(body);

  const col = suitColor(card.suit);
  const padX = Math.max(3, cw * 0.11);
  const padY = Math.max(4, ch * 0.075);
  const rankFs = Math.max(12, Math.min(cw * 0.26, 34));
  const tRank = new Text({
    text: card.rank,
    resolution: LABEL_RES(),
    roundPixels: true,
    style: {
      fontFamily: 'system-ui, -apple-system, sans-serif',
      fontSize: rankFs,
      fontWeight: '800',
      fill: col,
      letterSpacing: card.rank === '10' ? -0.8 : 0,
    },
  });
  tRank.anchor.set(0, 0);
  tRank.x = -cw / 2 + padX;
  tRank.y = -ch / 2 + padY;
  root.addChild(tRank);

  const suitSize = Math.max(28, cw * 0.55);
  addSuitSprite(root, card.suit, col, 0, ch * 0.18, suitSize, suitTextures);

  return root;
}

function addSuitSprite(
  parent: Container,
  suit: Suit,
  col: number,
  x: number,
  y: number,
  size: number,
  suitTextures: Record<Suit, Texture> | null,
): void {
  if (suitTextures?.[suit]) {
    const sp = new Sprite(suitTextures[suit]);
    sp.anchor.set(0.5, 0.5);
    const sc = size / Math.max(sp.texture.width, sp.texture.height);
    sp.scale.set(sc);
    sp.x = x;
    sp.y = y;
    parent.addChild(sp);
  }
}

function drawCardBack(
  root: Container,
  cw: number,
  ch: number,
  r: number,
  cardBack: Texture | null,
): void {
  const border = new Graphics();
  border.roundRect(-cw / 2, -ch / 2, cw, ch, r).fill({ color: CARD_FACE });
  root.addChild(border);

  const pad = Math.max(2, cw * 0.055);
  const innerW = cw - pad * 2;
  const innerH = ch - pad * 2;
  const innerR = Math.max(2, r - 2);
  const ix = -innerW / 2;
  const iy = -innerH / 2;

  const mask = new Graphics();
  mask.roundRect(ix, iy, innerW, innerH, innerR).fill(0xffffff);

  const inner = new Container();
  inner.mask = mask;

  if (cardBack) {
    const photo = new Sprite(cardBack);
    const scale = Math.max(innerW / cardBack.width, innerH / cardBack.height);
    photo.scale.set(scale);
    photo.anchor.set(0.5, 0.5);
    photo.alpha = 0.9;
    inner.addChild(photo);

    const depth = new Graphics();
    depth.roundRect(ix, iy, innerW, innerH, innerR).fill({ color: 0x12080a, alpha: 0.22 });
    inner.addChild(depth);

    const brandWash = new Graphics();
    brandWash.roundRect(ix, iy, innerW, innerH, innerR).fill(
      new FillGradient({
        type: 'linear',
        colorStops: [
          { offset: 0, color: 0xff5500 },
          { offset: 0.48, color: 0x9333ea },
          { offset: 1, color: 0xf472b6 },
        ],
        start: { x: ix, y: iy },
        end: { x: ix + innerW, y: iy + innerH },
      }),
    );
    brandWash.alpha = 0.44;
    inner.addChild(brandWash);

    const vignette = new Graphics();
    vignette.roundRect(ix, iy, innerW, innerH, innerR).fill(
      new FillGradient({
        type: 'linear',
        colorStops: [
          { offset: 0, color: 0x000000 },
          { offset: 0.32, color: 0x000000 },
          { offset: 0.55, color: 0x1a1020 },
          { offset: 1, color: 0x000000 },
        ],
        start: { x: ix, y: iy },
        end: { x: ix, y: iy + innerH },
      }),
    );
    vignette.alpha = 0.38;
    inner.addChild(vignette);

    const grain = new Graphics();
    for (let g = iy - innerH; g < ix + innerW + innerH; g += 3.5) {
      grain
        .moveTo(g, iy)
        .lineTo(g - innerH * 0.55, iy + innerH)
        .stroke({ width: 0.45, color: 0xffffff, alpha: 0.035 });
    }
    for (let g = iy; g < iy + innerH; g += 4) {
      grain
        .moveTo(ix, g)
        .lineTo(ix + innerW, g)
        .stroke({ width: 0.35, color: 0xffffff, alpha: 0.025 });
    }
    grain.alpha = 0.85;
    inner.addChild(grain);
  } else {
    const fallback = new Graphics();
    fallback.roundRect(ix, iy, innerW, innerH, innerR).fill(
      new FillGradient({
        type: 'linear',
        colorStops: [
          { offset: 0, color: 0xf5a06a },
          { offset: 1, color: 0xe87a5a },
        ],
        start: { x: ix, y: iy },
        end: { x: ix, y: iy + innerH },
      }),
    );
    inner.addChild(fallback);
  }

  root.addChild(mask);
  root.addChild(inner);

  const frame = new Graphics();
  frame.roundRect(ix, iy, innerW, innerH, innerR).stroke({ width: 0.6, color: 0xd1d5db, alpha: 0.55 });
  root.addChild(frame);
}
