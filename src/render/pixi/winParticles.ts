import { Container, Graphics } from 'pixi.js';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  w: number;
  h: number;
  color: number;
  rotation: number;
  rotSpeed: number;
}

const particles: Particle[] = [];
let container: Container | null = null;

const WIN_COLORS = [0xff5500, 0xffd700, 0xffffff, 0x9333ea, 0xf472b6];
const LOSE_COLORS = [0xef4444, 0x7f1d1d, 0xffffff, 0x450a0a];

export function initWinParticleLayer(stage: Container): Container {
  container = new Container();
  stage.addChild(container);
  return container;
}

export function emitWinParticles(cx: number, cy: number, isBlackjack: boolean): void {
  const count = isBlackjack ? 48 : 28;
  for (let i = 0; i < count; i += 1) {
    const angle = -Math.PI / 2 + (Math.random() - 0.5) * Math.PI * 1.1;
    const speed = 1.5 + Math.random() * (isBlackjack ? 7 : 5);
    const size = 2.5 + Math.random() * 4;
    particles.push({
      x: cx + (Math.random() - 0.5) * 30,
      y: cy + (Math.random() - 0.5) * 10,
      vx: Math.cos(angle) * speed * (0.6 + Math.random() * 0.8),
      vy: Math.sin(angle) * speed - Math.random() * 2,
      life: 0,
      maxLife: 700 + Math.random() * 700,
      w: size,
      h: size * (0.4 + Math.random() * 0.4),
      color: WIN_COLORS[Math.floor(Math.random() * WIN_COLORS.length)]!,
      rotation: Math.random() * Math.PI * 2,
      rotSpeed: (Math.random() - 0.5) * 0.25,
    });
  }
}

export function emitLoseParticles(cx: number, cy: number): void {
  for (let i = 0; i < 18; i += 1) {
    const angle = Math.random() * Math.PI * 2;
    const speed = 1 + Math.random() * 3;
    particles.push({
      x: cx,
      y: cy,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      life: 0,
      maxLife: 500 + Math.random() * 400,
      w: 2 + Math.random() * 3,
      h: 2 + Math.random() * 2,
      color: LOSE_COLORS[Math.floor(Math.random() * LOSE_COLORS.length)]!,
      rotation: Math.random() * Math.PI * 2,
      rotSpeed: (Math.random() - 0.5) * 0.2,
    });
  }
}

export function tickWinParticles(dtMs: number): boolean {
  if (particles.length === 0) return false;

  const gravity = 0.12 * (dtMs / 16);
  const drag = Math.pow(0.985, dtMs / 16);

  for (let i = particles.length - 1; i >= 0; i -= 1) {
    const p = particles[i]!;
    p.life += dtMs;
    if (p.life >= p.maxLife) {
      particles.splice(i, 1);
      continue;
    }
    p.vy += gravity;
    p.x += p.vx * (dtMs / 16);
    p.y += p.vy * (dtMs / 16);
    p.vx *= drag;
    p.rotation += p.rotSpeed * (dtMs / 16);
  }

  if (!container) return particles.length > 0;

  while (container.children.length > 0) {
    container.removeChildAt(0).destroy({ children: true });
  }

  for (const p of particles) {
    const t = p.life / p.maxLife;
    const alpha = t < 0.1 ? t / 0.1 : t > 0.6 ? 1 - (t - 0.6) / 0.4 : 1;
    const g = new Graphics();
    g.roundRect(-p.w / 2, -p.h / 2, p.w, p.h, 1);
    g.fill({ color: p.color, alpha: Math.max(0, alpha) });
    g.x = p.x;
    g.y = p.y;
    g.rotation = p.rotation;
    container.addChild(g);
  }

  return particles.length > 0;
}

export function areWinParticlesActive(): boolean {
  return particles.length > 0;
}

export function clearWinParticles(): void {
  particles.length = 0;
  if (container) {
    while (container.children.length > 0) {
      container.removeChildAt(0).destroy({ children: true });
    }
  }
}
