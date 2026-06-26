'use client';

import { Application, Container, type Texture } from 'pixi.js';
import { useEffect, useRef } from 'react';

import type { Card, Suit } from '@/game/domain/card';
import type { HeroTableState } from '@/game/blackjack/engine';
import { visibleScore } from '@/game/blackjack/engine';
import {
  loadCardBackTexture,
  loadDealerIconTexture,
  loadSuitTextures,
} from '@/render/pixi/cardTextures';
import {
  clearHeroFlights,
  stepHeroFlights,
  syncHeroFlights,
} from '@/render/pixi/heroCardFlights';
import { drawHeroTable, drawResultTag, drawScorePills } from '@/render/pixi/heroDraw';
import { playerCenter } from '@/render/pixi/heroLayout';
import { tablePixelRatio } from '@/render/pixi/renderQuality';
import {
  clearWinParticles,
  emitLoseParticles,
  emitWinParticles,
  initWinParticleLayer,
  tickWinParticles,
} from '@/render/pixi/winParticles';

interface HeroBlackjackCanvasProps {
  state: HeroTableState;
  className?: string;
}

export function HeroBlackjackCanvas({ state, className }: HeroBlackjackCanvasProps) {
  const hostRef = useRef<HTMLDivElement>(null);
  const stateRef = useRef(state);
  const prevDealerRef = useRef<Card[] | null>(null);
  const prevPlayerRef = useRef<Card[] | null>(null);
  const prevResultRef = useRef(state.result);
  const suitRef = useRef<Record<Suit, Texture> | null>(null);
  const cardBackRef = useRef<Texture | null>(null);
  const dealerRef = useRef<Texture | null>(null);
  const gameLayerRef = useRef<Container | null>(null);
  const uiLayerRef = useRef<Container | null>(null);

  stateRef.current = state;

  useEffect(() => {
    if (state.result && state.result !== prevResultRef.current) {
      const host = hostRef.current;
      if (host) {
        const { x, y } = playerCenter(host.clientWidth, host.clientHeight);
        if (state.result === 'win' || state.result === 'blackjack') {
          emitWinParticles(x, y, state.result === 'blackjack');
        } else if (state.result === 'lose') {
          emitLoseParticles(x, y);
        }
      }
    }
    prevResultRef.current = state.result;
  }, [state.result]);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    let cancelled = false;
    let ro: ResizeObserver | null = null;
    let app: Application | null = null;
    let raf = 0;
    let last = performance.now();
    const gameLayer = new Container();
    const uiLayer = new Container();
    gameLayerRef.current = gameLayer;
    uiLayerRef.current = uiLayer;

    const paint = (fw: number, fh: number) => {
      if (fw < 16 || fh < 16) return;
      const s = stateRef.current;

      syncHeroFlights(
        prevDealerRef.current,
        prevPlayerRef.current,
        s.dealer,
        s.player,
        fw,
        fh,
      );
      prevDealerRef.current = s.dealer.map((c) => ({ ...c }));
      prevPlayerRef.current = s.player.map((c) => ({ ...c }));

      drawHeroTable(
        gameLayer,
        s.dealer,
        s.player,
        fw,
        fh,
        suitRef.current,
        cardBackRef.current,
        dealerRef.current,
      );

      uiLayer.removeChildren();
      if (s.player.length > 0 || s.dealer.length > 0) {
        drawScorePills(
          uiLayer,
          s.dealer,
          s.player,
          fw,
          fh,
          visibleScore(s.dealer),
          visibleScore(s.player),
        );
      }

      if (s.result && s.phase === 'result') {
        drawResultTag(uiLayer, s.dealer, s.player, fw, fh, s.result);
      }
    };

    (async () => {
      const pixiApp = new Application();
      await pixiApp.init({
        width: host.clientWidth || 320,
        height: host.clientHeight || 420,
        backgroundAlpha: 0,
        antialias: true,
        resolution: tablePixelRatio(),
        autoDensity: true,
        powerPreference: 'high-performance',
      });
      if (cancelled) {
        pixiApp.destroy(true);
        return;
      }

      app = pixiApp;
      pixiApp.stage.addChild(gameLayer);
      pixiApp.stage.addChild(uiLayer);
      initWinParticleLayer(pixiApp.stage);

      const canvas = pixiApp.canvas as HTMLCanvasElement;
      canvas.style.width = '100%';
      canvas.style.height = '100%';
      canvas.style.display = 'block';
      host.appendChild(canvas);

      try {
        suitRef.current = await loadSuitTextures();
        cardBackRef.current = await loadCardBackTexture();
        dealerRef.current = await loadDealerIconTexture();
      } catch {
        suitRef.current = null;
      }

      const loop = (now: number) => {
        const dt = Math.min(48, now - last);
        last = now;
        stepHeroFlights(dt);
        tickWinParticles(dt);
        paint(host.clientWidth, host.clientHeight);
        raf = requestAnimationFrame(loop);
      };

      ro = new ResizeObserver(() => {
        const cr = host.getBoundingClientRect();
        if (!app || cr.width < 16) return;
        app.renderer.resize(Math.floor(cr.width), Math.floor(cr.height));
      });
      ro.observe(host);
      paint(host.clientWidth, host.clientHeight);
      raf = requestAnimationFrame(loop);
    })();

    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
      ro?.disconnect();
      clearHeroFlights();
      clearWinParticles();
      prevDealerRef.current = null;
      prevPlayerRef.current = null;
      gameLayerRef.current = null;
      uiLayerRef.current = null;
      app?.destroy(true);
      host.replaceChildren();
    };
  }, []);

  return <div ref={hostRef} className={className} />;
}
