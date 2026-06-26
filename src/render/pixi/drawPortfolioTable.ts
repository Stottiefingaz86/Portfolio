/**
 * Portfolio table atmosphere — restrained felt, no decorative rings.
 */
import { Container, Graphics, Sprite, type Texture } from 'pixi.js';

import { tablePixelRatio } from './renderQuality';

export function drawPortfolioFelt(g: Graphics, w: number, h: number): void {
  g.clear();

  const cx = w * 0.5;
  const cy = h * 0.55;
  const rx = w * 0.44;
  const ry = h * 0.32;

  g.ellipse(cx, cy, rx, ry).fill({ color: 0x0a120f, alpha: 0.65 });
  g.ellipse(cx, cy, rx, ry).stroke({ width: 1, color: 0x5eead4, alpha: 0.12 });
}

export function drawDealerZone(
  layer: Container,
  w: number,
  h: number,
  dealerIcon: Texture | null,
): void {
  layer.removeChildren();

  if (dealerIcon) {
    const icon = new Sprite(dealerIcon);
    icon.anchor.set(0.5, 0);
    const target = Math.min(28, w * 0.05);
    const scale = target / Math.max(dealerIcon.width, dealerIcon.height);
    icon.scale.set(scale);
    icon.x = w * 0.5;
    icon.y = h * 0.08;
    icon.alpha = 0.35;
    layer.addChild(icon);
  }
}
