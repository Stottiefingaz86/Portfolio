import type { Card } from '@/game/domain/card';

import { buildHeroLayout, deckOrigin, type CardPlacement } from './heroLayout';

interface Flight {
  dealIn: boolean;
  delayMs: number;
  elapsedMs: number;
  durationMs: number;
  sx: number;
  sy: number;
  ex: number;
  ey: number;
  scw: number;
  sch: number;
  ecw: number;
  ech: number;
}

interface Flip {
  elapsedMs: number;
  durationMs: number;
}

const flights = new Map<string, Flight>();
const flips = new Map<string, Flip>();

const FLIP_MS = 280;
const DEAL_MS = 220;
const DEAL_STAGGER_MS = 25;
const HIT_MOVE_MS = 180;
const DEALER_MOVE_MS = 200;

function easeOutCubic(t: number): number {
  const u = 1 - t;
  return 1 - u * u * u;
}

function easeInOutBack(t: number): number {
  const c1 = 1.70158;
  const c2 = c1 * 1.525;
  return t < 0.5
    ? (Math.pow(2 * t, 2) * ((c2 + 1) * 2 * t - c2)) / 2
    : (Math.pow(2 * t - 2, 2) * ((c2 + 1) * (t * 2 - 2) + c2) + 2) / 2;
}

function allIds(dealer: Card[], player: Card[]): Set<string> {
  return new Set([...dealer, ...player].map((c) => c.id));
}

function faceMap(dealer: Card[], player: Card[]): Map<string, boolean> {
  const m = new Map<string, boolean>();
  for (const c of [...dealer, ...player]) m.set(c.id, c.faceUp);
  return m;
}

/** Blackjack deal order: player, dealer, player, dealer (per round). */
function orderedCardIds(dealer: Card[], player: Card[]): string[] {
  const out: string[] = [];
  const maxR = Math.max(dealer.length, player.length);
  for (let r = 0; r < maxR; r += 1) {
    if (player[r]) out.push(player[r]!.id);
    if (dealer[r]) out.push(dealer[r]!.id);
  }
  return out;
}

function queueLayoutTransitionFlights(
  prevDealer: Card[],
  prevPlayer: Card[],
  dealer: Card[],
  player: Card[],
  width: number,
  height: number,
  layoutNext: Map<string, CardPlacement>,
  staggerMs: number,
  durationMs: number,
  minDist: number,
): void {
  const oldLayout = buildHeroLayout(prevDealer, prevPlayer, width, height);
  let st = 0;
  for (const id of orderedCardIds(dealer, player)) {
    if (flights.has(id)) continue;
    const op = oldLayout.get(id);
    const np = layoutNext.get(id);
    if (!op || !np) continue;
    const dist = Math.hypot(np.x - op.x, np.y - op.y);
    const sizeDelta = Math.abs(np.cw - op.cw) + Math.abs(np.ch - op.ch);
    if (dist < minDist && sizeDelta < 5) continue;
    flights.set(id, {
      dealIn: false,
      delayMs: st * staggerMs,
      elapsedMs: 0,
      durationMs,
      sx: op.x,
      sy: op.y,
      ex: np.x,
      ey: np.y,
      scw: op.cw,
      sch: op.ch,
      ecw: np.cw,
      ech: np.ch,
    });
    st += 1;
  }
}

export function clearHeroFlights(): void {
  flights.clear();
  flips.clear();
}

export function areHeroFlightsActive(): boolean {
  for (const f of flights.values()) {
    if (f.delayMs > 0) return true;
    if (f.elapsedMs < f.durationMs) return true;
  }
  for (const f of flips.values()) {
    if (f.elapsedMs < f.durationMs) return true;
  }
  return false;
}

export function syncHeroFlights(
  prevDealer: Card[] | null,
  prevPlayer: Card[] | null,
  dealer: Card[],
  player: Card[],
  width: number,
  height: number,
): void {
  const nextIds = allIds(dealer, player);
  for (const id of flights.keys()) {
    if (!nextIds.has(id)) flights.delete(id);
  }
  for (const id of flips.keys()) {
    if (!nextIds.has(id)) flips.delete(id);
  }

  const layout = buildHeroLayout(dealer, player, width, height);

  if (prevDealer && prevPlayer) {
    const prevFaces = faceMap(prevDealer, prevPlayer);
    const nextFaces = faceMap(dealer, player);
    for (const [id, up] of nextFaces) {
      if (prevFaces.get(id) === false && up && !flips.has(id)) {
        flips.set(id, { elapsedMs: 0, durationMs: FLIP_MS });
      }
    }

    const prevPlayerLen = prevPlayer.length;
    const prevDealerLen = prevDealer.length;
    const playerHit =
      player.length > prevPlayerLen &&
      dealer.length === prevDealerLen &&
      player.slice(0, prevPlayerLen).every((c, i) => c.id === prevPlayer[i]?.id);

    const dealerDraw =
      dealer.length > prevDealerLen &&
      player.length === prevPlayerLen;

    if (playerHit) {
      queueLayoutTransitionFlights(
        prevDealer,
        prevPlayer,
        dealer,
        player,
        width,
        height,
        layout,
        0,
        HIT_MOVE_MS,
        2,
      );
    } else if (dealerDraw) {
      queueLayoutTransitionFlights(
        prevDealer,
        prevPlayer,
        dealer,
        player,
        width,
        height,
        layout,
        0,
        DEALER_MOVE_MS,
        2,
      );
    }
  }

  const prevIds = prevDealer && prevPlayer ? allIds(prevDealer, prevPlayer) : new Set<string>();
  const ordered = orderedCardIds(dealer, player);
  const newIds = ordered.filter((id) => !prevIds.has(id));
  let stagger = 0;
  for (const id of newIds) {
    if (flights.has(id)) continue;
    const pl = layout.get(id);
    if (!pl) continue;
    const deck = deckOrigin(width, height, pl.cw);
    flights.set(id, {
      dealIn: true,
      delayMs: stagger * DEAL_STAGGER_MS,
      elapsedMs: 0,
      durationMs: DEAL_MS,
      sx: deck.x,
      sy: deck.y,
      ex: pl.x,
      ey: pl.y,
      scw: pl.cw,
      sch: pl.ch,
      ecw: pl.cw,
      ech: pl.ch,
    });
    stagger += 1;
  }
}

export function stepHeroFlights(dtMs: number): void {
  for (const f of flights.values()) {
    if (f.delayMs > 0) {
      f.delayMs = Math.max(0, f.delayMs - dtMs);
      continue;
    }
    f.elapsedMs += dtMs;
  }
  for (const [id, f] of [...flights.entries()]) {
    if (f.delayMs === 0 && f.elapsedMs >= f.durationMs) flights.delete(id);
  }
  for (const [id, f] of [...flips.entries()]) {
    f.elapsedMs += dtMs;
    if (f.elapsedMs >= f.durationMs) flips.delete(id);
  }
}

export interface CardMotion {
  x: number;
  y: number;
  cw: number;
  ch: number;
  alpha: number;
  flipScaleX: number;
  flipShowBack: boolean;
}

export function applyHeroFlight(id: string, placement: CardPlacement): CardMotion {
  let { x, y, cw, ch } = placement;
  let alpha = 1;
  let flipScaleX = 1;
  let flipShowBack = false;

  const f = flights.get(id);
  if (f) {
    if (f.dealIn) {
      if (f.delayMs > 0) {
        x = f.sx;
        y = f.sy;
        cw = f.scw;
        ch = f.sch;
        alpha = 0;
      } else {
        const t = Math.min(1, f.elapsedMs / f.durationMs);
        const e = easeOutCubic(t);
        x = f.sx + (f.ex - f.sx) * e;
        y = f.sy + (f.ey - f.sy) * e;
        cw = f.ecw;
        ch = f.ech;
        alpha = Math.min(1, t * 3);
      }
    } else if (f.delayMs > 0) {
      x = f.sx;
      y = f.sy;
      cw = f.scw;
      ch = f.sch;
    } else {
      const t = Math.min(1, f.elapsedMs / f.durationMs);
      const e = easeInOutBack(t);
      x = f.sx + (f.ex - f.sx) * e;
      y = f.sy + (f.ey - f.sy) * e;
      cw = f.scw + (f.ecw - f.scw) * e;
      ch = f.sch + (f.ech - f.sch) * e;
    }
  }

  const fl = flips.get(id);
  if (fl) {
    const t = Math.min(1, fl.elapsedMs / fl.durationMs);
    if (t < 0.5) {
      flipScaleX = 1 - t * 2;
      flipShowBack = true;
    } else {
      flipScaleX = (t - 0.5) * 2;
      flipShowBack = false;
    }
  }

  return { x, y, cw, ch, alpha, flipScaleX, flipShowBack };
}
