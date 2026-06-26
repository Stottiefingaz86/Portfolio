import type { Card, Rank } from '@/game/domain/card';

export interface HandTotal {
  total: number;
  soft: boolean;
  bust: boolean;
}

const RANK_VALUES: Record<Rank, number[]> = {
  A: [1, 11],
  '2': [2],
  '3': [3],
  '4': [4],
  '5': [5],
  '6': [6],
  '7': [7],
  '8': [8],
  '9': [9],
  '10': [10],
  J: [10],
  Q: [10],
  K: [10],
};

export function getVisibleCards(cards: Card[]): Card[] {
  return cards.filter((c) => c.faceUp);
}

export function scoreHand(cards: Card[]): HandTotal {
  const visible = getVisibleCards(cards);
  let min = 0;
  let max = 0;
  let acesAs11 = 0;

  for (const card of visible) {
    if (card.rank === 'A') {
      min += 1;
      max += 11;
      acesAs11 += 1;
    } else {
      const v = RANK_VALUES[card.rank][0]!;
      min += v;
      max += v;
    }
  }

  if (max > 21 && acesAs11 > 0) {
    while (max > 21 && acesAs11 > 0) {
      max -= 10;
      acesAs11 -= 1;
    }
  }

  const soft = acesAs11 > 0 && max <= 21;
  const best = max <= 21 ? max : min;
  return { total: best, soft, bust: best > 21 };
}

export function isBlackjack(cards: Card[]): boolean {
  const visible = getVisibleCards(cards);
  if (visible.length !== 2) return false;
  const { total, bust } = scoreHand(visible);
  return !bust && total === 21;
}
