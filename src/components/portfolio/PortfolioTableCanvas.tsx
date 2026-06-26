'use client';

import { Application, Container, Graphics } from 'pixi.js';
import { useEffect, useRef } from 'react';

import { loadDealerIconTexture } from '@/render/pixi/cardTextures';
import { drawDealerZone, drawPortfolioFelt } from '@/render/pixi/drawPortfolioTable';
import { tablePixelRatio } from '@/render/pixi/renderQuality';

interface PortfolioTableCanvasProps {
  className?: string;
}

export function PortfolioTableCanvas({ className }: PortfolioTableCanvasProps) {
  const hostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    let cancelled = false;
    let ro: ResizeObserver | null = null;
    let app: Application | null = null;
    const felt = new Graphics();
    const overlay = new Container();
    const dealerIconRef = { current: null as Awaited<ReturnType<typeof loadDealerIconTexture>> };

    const paint = (fw: number, fh: number) => {
      if (fw < 16 || fh < 16) return;
      drawPortfolioFelt(felt, fw, fh);
      drawDealerZone(overlay, fw, fh, dealerIconRef.current);
    };

    (async () => {
      const pixiApp = new Application();
      await pixiApp.init({
        width: host.clientWidth || 360,
        height: host.clientHeight || 480,
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
      pixiApp.stage.addChild(felt);
      pixiApp.stage.addChild(overlay);

      const canvas = pixiApp.canvas as HTMLCanvasElement;
      canvas.style.width = '100%';
      canvas.style.height = '100%';
      canvas.style.display = 'block';
      host.appendChild(canvas);

      try {
        dealerIconRef.current = await loadDealerIconTexture();
      } catch {
        dealerIconRef.current = null;
      }

      ro = new ResizeObserver((entries) => {
        const cr = entries[0]?.contentRect;
        if (!cr || !app) return;
        app.renderer.resize(Math.floor(cr.width), Math.floor(cr.height));
        paint(cr.width, cr.height);
      });
      ro.observe(host);
      paint(host.clientWidth, host.clientHeight);
    })();

    return () => {
      cancelled = true;
      ro?.disconnect();
      app?.destroy(true);
      host.replaceChildren();
    };
  }, []);

  return (
    <div
      ref={hostRef}
      className={className}
      style={{ touchAction: 'none' }}
      aria-hidden
    />
  );
}
