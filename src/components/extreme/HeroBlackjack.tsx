'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from 'react';

import { HeroBlackjackCanvas } from '@/components/extreme/HeroBlackjackCanvas';
import {
  dealNextCard,
  dealerDrawStep,
  dealerNeedsCard,
  hitHand,
  revealDealer,
  resolveHand,
  startDeal,
  type HeroTableState,
} from '@/game/blackjack/engine';

const DEAL_CADENCE_MS = 180;

function wait(ms: number) {
  return new Promise((resolve) => {
    window.setTimeout(resolve, ms);
  });
}

interface HeroBlackjackContextValue {
  state: HeroTableState;
  hit: () => void;
  stand: () => void;
  again: () => void;
  playing: boolean;
}

const HeroBlackjackContext = createContext<HeroBlackjackContextValue | null>(null);

function useHeroBlackjack() {
  const ctx = useContext(HeroBlackjackContext);
  if (!ctx) {
    throw new Error('HeroBlackjack components must be used within HeroBlackjackRoot');
  }
  return ctx;
}

export function HeroBlackjackRoot({ children }: { children: ReactNode }) {
  const [state, setState] = useState<HeroTableState>(() => ({
    phase: 'idle',
    result: null,
    player: [],
    dealer: [],
    dealQueue: [],
  }));
  const stateRef = useRef(state);
  const busyRef = useRef(false);

  stateRef.current = state;

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setState(startDeal());
    }, 500);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (state.phase !== 'dealing') return;
    const id = window.setTimeout(() => {
      setState((current) => dealNextCard(current));
    }, DEAL_CADENCE_MS);
    return () => window.clearTimeout(id);
  }, [state.phase, state.player.length, state.dealer.length]);

  const hit = useCallback(() => {
    if (busyRef.current || stateRef.current.phase !== 'player') return;
    setState((s) => hitHand(s));
  }, []);

  const stand = useCallback(async () => {
    if (busyRef.current) return;
    const current = stateRef.current;
    if (current.phase !== 'player') return;

    busyRef.current = true;
    let next = revealDealer(current);
    setState({ ...next, phase: 'dealer' });
    await wait(900);

    while (dealerNeedsCard(next)) {
      next = dealerDrawStep(next);
      setState({ ...next, phase: 'dealer' });
      await wait(900);
    }

    next = resolveHand(next);
    setState(next);
    busyRef.current = false;
  }, []);

  const again = useCallback(() => {
    busyRef.current = false;
    setState(startDeal());
  }, []);

  const playing = state.phase === 'player';

  return (
    <HeroBlackjackContext.Provider value={{ state, hit, stand, again, playing }}>
      {children}
    </HeroBlackjackContext.Provider>
  );
}

export function HeroBlackjackTable() {
  const { state } = useHeroBlackjack();

  return (
    <div className="hero-blackjack-table relative h-[320px] w-full overflow-hidden sm:h-[360px] lg:h-[420px]">
      <HeroBlackjackCanvas state={state} className="absolute inset-0" />
    </div>
  );
}

export function HeroBlackjackControls() {
  const { state, hit, stand, again, playing } = useHeroBlackjack();

  return (
    <div className="hero-blackjack-controls mt-4 flex min-h-[52px] flex-wrap items-center justify-center gap-3">
      {playing ? (
        <>
          <button type="button" onClick={hit} className="btn-line min-h-[52px] px-8 text-[11px]">
            Hit
          </button>
          <button
            type="button"
            onClick={() => void stand()}
            className="btn-fill min-h-[52px] px-8 text-[11px]"
          >
            Stand
          </button>
        </>
      ) : null}

      {state.phase === 'result' ? (
        <button type="button" onClick={again} className="btn-line min-h-[52px] px-8 text-[11px]">
          Again
        </button>
      ) : null}
    </div>
  );
}

/** @deprecated Use HeroBlackjackRoot + Table + Controls for layout control */
export function HeroBlackjack() {
  return (
    <HeroBlackjackRoot>
      <div className="hero-blackjack flex w-full flex-col">
        <HeroBlackjackTable />
        <HeroBlackjackControls />
      </div>
    </HeroBlackjackRoot>
  );
}
