'use client';

import Image from 'next/image';
import { useLayoutEffect, useRef, useState } from 'react';

import { cn } from '@/lib/utils';

const DESKTOP_WIDTH = 1440;
const MOBILE_WIDTH = 390;

type PreviewViewport = 'desktop' | 'mobile';

function getSourceWidth(viewport: PreviewViewport) {
  return viewport === 'mobile' ? MOBILE_WIDTH : DESKTOP_WIDTH;
}

export function WorkSitePreview({
  url,
  title,
  focus,
  viewport = 'desktop',
  fallbackImage,
}: {
  url: string;
  title: string;
  focus?: 'vip-hub';
  viewport?: PreviewViewport;
  fallbackImage?: string;
}) {
  const sourceWidth = getSourceWidth(viewport);
  const hostRef = useRef<HTMLDivElement>(null);
  const scalerRef = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);

  useLayoutEffect(() => {
    const host = hostRef.current;
    const scaler = scalerRef.current;
    if (!host || !scaler) return;

    let rafId = 0;

    const measureTarget = () =>
      host.closest<HTMLElement>('.work-stack-media') ??
      host.parentElement ??
      host;

    const applyLayout = (width: number, height: number) => {
      const scale = width / sourceWidth;
      const frameHeight = height / scale;
      const visibleSourceWidth = width / scale;
      const panX =
        focus === 'vip-hub'
          ? Math.max(0, (sourceWidth - visibleSourceWidth) * 0.5)
          : 0;

      host.style.setProperty('--preview-scale', String(scale));
      scaler.style.width = `${sourceWidth}px`;
      scaler.style.height = `${frameHeight}px`;
      scaler.style.marginLeft = focus === 'vip-hub' ? `${-panX * scale}px` : '0px';
      setReady(true);
    };

    const update = () => {
      const target = measureTarget();
      const width = target.clientWidth;
      const height = target.clientHeight;

      if (!width || !height) {
        rafId = requestAnimationFrame(update);
        return;
      }

      applyLayout(width, height);
    };

    update();

    const observer = new ResizeObserver(update);
    observer.observe(measureTarget());
    window.addEventListener('resize', update);

    return () => {
      cancelAnimationFrame(rafId);
      observer.disconnect();
      window.removeEventListener('resize', update);
    };
  }, [focus, sourceWidth]);

  return (
    <div
      ref={hostRef}
      className={cn(
        'work-site-preview',
        viewport === 'mobile' && 'work-site-preview--mobile',
        !ready && 'work-site-preview--pending',
        focus === 'vip-hub' && 'work-site-preview--hub-focus',
      )}
    >
      {fallbackImage ? (
        <Image
          src={fallbackImage}
          alt=""
          fill
          className="work-site-preview-fallback object-cover object-top"
          sizes="(min-width: 900px) 60vw, 100vw"
          priority
        />
      ) : null}

      <div ref={scalerRef} className="work-site-preview-scaler">
        {ready ? (
          <iframe
            src={url}
            title={title}
            className="work-site-preview-frame"
            loading="lazy"
          />
        ) : null}
      </div>

      {focus === 'vip-hub' ? <div className="work-site-preview-shade" aria-hidden /> : null}
    </div>
  );
}
