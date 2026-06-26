import {
  createCardId,
  RANKS,
  SUITS,
  type Card,
} from '@/game/domain/card';

import { isBlackjack, scoreHand } from './scoring';

export type HeroPhase = 'idle' | 'dealing' | 'player' | 'dealer' | 'result';
export type RoundResult = 'win' | 'lose' | 'push' | 'blackjack' | null;

type DealStep = { target: 'player' | 'dealer'; faceUp: boolean };

export interface HeroTableState {
  phase: HeroPhase;
  result: RoundResult;
  player: Card[];
  dealer: Card[];
  dealQueue: DealStep[];
}

let shoe: Card[] = [];
let cardSeq = 0;

const INITIAL_DEAL_QUEUE: DealStep[] = [
  { target: 'player', faceUp: true },
  { target: 'dealer', faceUp: true },
  { target: 'player', faceUp: true },
  { target: 'dealer', faceUp: false },
];

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j]!, a[i]!];
  }
  return a;
}

function buildShoe(): Card[] {
  const deck: Card[] = [];
  for (const suit of SUITS) {
    for (const rank of RANKS) {
      deck.push({
        id: createCardId('hero', cardSeq++),
        rank,
        suit,
        faceUp: true,
      });
    }
  }
  return shuffle(deck);
}

function drawCard(faceUp = true): Card {
  if (shoe.length < 15) shoe = buildShoe();
  const card = shoe.pop()!;
  return { ...card, faceUp };
}

function applyDealStep(state: HeroTableState, step: DealStep): HeroTableState {
  const card = drawCard(step.faceUp);
  if (step.target === 'player') {
    return { ...state, player: [...state.player, card] };
  }
  return { ...state, dealer: [...state.dealer, card] };
}

function finishInitialDeal(state: HeroTableState): HeroTableState {
  if (isBlackjack(state.player)) {
    const dealer = state.dealer.map((c) => ({ ...c, faceUp: true }));
    const dealerBj = isBlackjack(dealer);
    return {
      phase: 'result',
      result: dealerBj ? 'push' : 'blackjack',
      player: state.player,
      dealer,
      dealQueue: [],
    };
  }
  return { ...state, phase: 'player', dealQueue: [] };
}

export function createIdleState(): HeroTableState {
  return { phase: 'idle', result: null, player: [], dealer: [], dealQueue: [] };
}

export function startDeal(): HeroTableState {
  shoe = buildShoe();
  const queue = [...INITIAL_DEAL_QUEUE];
  const first = queue.shift();
  const base: HeroTableState = {
    phase: 'dealing',
    result: null,
    player: [],
    dealer: [],
    dealQueue: queue,
  };
  if (!first) return base;
  return applyDealStep(base, first);
}

export function dealNextCard(state: HeroTableState): HeroTableState {
  if (state.phase !== 'dealing') return state;
  const queue = [...state.dealQueue];
  const step = queue.shift();
  if (!step) return finishInitialDeal({ ...state, dealQueue: [] });
  return applyDealStep({ ...state, dealQueue: queue }, step);
}

export function hitHand(state: HeroTableState): HeroTableState {
  if (state.phase !== 'player') return state;
  const player = [...state.player, drawCard()];
  if (scoreHand(player).bust) {
    const dealer = state.dealer.map((c) => ({ ...c, faceUp: true }));
    return { phase: 'result', result: 'lose', player, dealer, dealQueue: [] };
  }
  return { ...state, player, dealQueue: [] };
}

export function revealDealer(state: HeroTableState): HeroTableState {
  return {
    ...state,
    dealer: state.dealer.map((c) => ({ ...c, faceUp: true })),
    dealQueue: [],
  };
}

export function dealerDrawStep(state: HeroTableState): HeroTableState {
  const dealer = [...state.dealer];
  const total = scoreHand(dealer);
  if (total.total >= 17 && !total.bust) return state;
  dealer.push(drawCard());
  return { ...state, dealer, dealQueue: [] };
}

export function resolveHand(state: HeroTableState): HeroTableState {
  const playerScore = scoreHand(state.player);
  const dealerScore = scoreHand(state.dealer);

  if (playerScore.bust) {
    return { ...state, phase: 'result', result: 'lose', dealQueue: [] };
  }
  if (dealerScore.bust) {
    return { ...state, phase: 'result', result: 'win', dealQueue: [] };
  }
  if (playerScore.total > dealerScore.total) {
    return { ...state, phase: 'result', result: 'win', dealQueue: [] };
  }
  if (playerScore.total < dealerScore.total) {
    return { ...state, phase: 'result', result: 'lose', dealQueue: [] };
  }
  return { ...state, phase: 'result', result: 'push', dealQueue: [] };
}

export function dealerNeedsCard(state: HeroTableState): boolean {
  const { total, bust } = scoreHand(state.dealer);
  return !bust && total < 17;
}

export function visibleScore(cards: Card[]): string {
  const { total, bust, soft } = scoreHand(cards);
  if (cards.some((c) => !c.faceUp) && cards.length > 0) {
    const up = scoreHand(cards.filter((c) => c.faceUp));
    return up.total > 0 ? String(up.total) : '?';
  }
  if (bust) return 'Bust';
  return soft ? `${total}` : String(total);
}
