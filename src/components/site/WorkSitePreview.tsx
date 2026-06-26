'use client';

import { useLayoutEffect, useRef, useState } from 'react';

import { cn } from '@/lib/utils';

const DESKTOP_WIDTH = 1440;
const MOBILE_WIDTH = 390;

type PreviewViewport = 'desktop' | 'mobile';

function getSourceWidth(viewport: PreviewViewport) {
  return viewport === 'mobile' ? MOBILE_WIDTH : DESKTOP_WIDTH;
}

function getInitialLayout(viewport: PreviewViewport) {
  const sourceWidth = getSourceWidth(viewport);

  if (typeof window === 'undefined') {
    return {
      scale: viewport === 'mobile' ? 0.72 : 0.35,
      frameHeight: viewport === 'mobile' ? 720 : 900,
      panX: 0,
      ready: false,
    };
  }

  const width = Math.max(280, Math.min(window.innerWidth, viewport === 'mobile' ? 320 : 960));
  const scale = width / sourceWidth;

  return {
    scale,
    frameHeight: (viewport === 'mobile' ? 560 : 640) / scale,
    panX: 0,
    ready: false,
  };
}

export function WorkSitePreview({
  url,
  title,
  focus,
  viewport = 'desktop',
}: {
  url: string;
  title: string;
  focus?: 'vip-hub';
  viewport?: PreviewViewport;
}) {
  const sourceWidth = getSourceWidth(viewport);
  const hostRef = useRef<HTMLDivElement>(null);
  const [layout, setLayout] = useState(() => getInitialLayout(viewport));

  useLayoutEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    let rafId = 0;

    const measure = () => {
      const parent = host.parentElement;
      const width = host.clientWidth || parent?.clientWidth || 0;
      const height = host.clientHeight || parent?.clientHeight || 0;
      return { width, height };
    };

    const update = () => {
      const { width, height } = measure();
      if (!width || !height) {
        rafId = requestAnimationFrame(update);
        return;
      }

      const scale = width / sourceWidth;
      const visibleSourceWidth = width / scale;
      const panX =
        focus === 'vip-hub'
          ? Math.max(0, (sourceWidth - visibleSourceWidth) * 0.5)
          : 0;

      setLayout({ scale, frameHeight: height / scale, panX, ready: true });
    };

    update();
    const observer = new ResizeObserver(update);
    observer.observe(host);
    if (host.parentElement) observer.observe(host.parentElement);
    window.addEventListener('resize', update);

    return () => {
      cancelAnimationFrame(rafId);
      observer.disconnect();
      window.removeEventListener('resize', update);
    };
  }, [focus, sourceWidth]);

  const supportsZoom =
    typeof CSS !== 'undefined' && CSS.supports('zoom', '1');

  const scalerStyle = supportsZoom
    ? {
        width: sourceWidth,
        height: layout.frameHeight,
        zoom: layout.scale,
        marginLeft: focus === 'vip-hub' ? -layout.panX : 0,
      }
    : {
        width: sourceWidth,
        height: layout.frameHeight,
        transform: `scale(${layout.scale})`,
        transformOrigin: 'top left',
        marginLeft: focus === 'vip-hub' ? -layout.panX * layout.scale : 0,
      };

  return (
    <div
      ref={hostRef}
      className={cn(
        'work-site-preview',
        viewport === 'mobile' && 'work-site-preview--mobile',
        !layout.ready && 'work-site-preview--pending',
        focus === 'vip-hub' && 'work-site-preview--hub-focus',
      )}
    >
      <div className="work-site-preview-scaler" style={scalerStyle}>
        <iframe
          src={url}
          title={title}
          className="work-site-preview-frame"
          loading="lazy"
        />
      </div>
      {focus === 'vip-hub' ? <div className="work-site-preview-shade" aria-hidden /> : null}
    </div>
  );
}
