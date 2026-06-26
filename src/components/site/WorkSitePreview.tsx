'use client';

import { useLayoutEffect, useRef, useState } from 'react';

import { cn } from '@/lib/utils';

const DESKTOP_WIDTH = 1440;

export function WorkSitePreview({
  url,
  title,
  focus,
}: {
  url: string;
  title: string;
  focus?: 'vip-hub';
}) {
  const hostRef = useRef<HTMLDivElement>(null);
  const [layout, setLayout] = useState({ scale: 1, frameHeight: 900, panX: 0 });

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

      const scale = width / DESKTOP_WIDTH;
      const visibleDesktopWidth = width / scale;
      const panX =
        focus === 'vip-hub'
          ? Math.max(0, (DESKTOP_WIDTH - visibleDesktopWidth) * 0.5)
          : 0;

      setLayout({ scale, frameHeight: height / scale, panX });
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
  }, [focus]);

  const supportsZoom =
    typeof CSS !== 'undefined' && CSS.supports('zoom', '1');

  const scalerStyle = supportsZoom
    ? {
        width: DESKTOP_WIDTH,
        height: layout.frameHeight,
        zoom: layout.scale,
        marginLeft: focus === 'vip-hub' ? -layout.panX : 0,
      }
    : {
        width: DESKTOP_WIDTH,
        height: layout.frameHeight,
        transform: `scale(${layout.scale})`,
        transformOrigin: 'top left',
        marginLeft: focus === 'vip-hub' ? -layout.panX * layout.scale : 0,
      };

  return (
    <div
      ref={hostRef}
      className={cn('work-site-preview', focus === 'vip-hub' && 'work-site-preview--hub-focus')}
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
