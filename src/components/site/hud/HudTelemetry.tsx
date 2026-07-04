'use client';

import { useReducedMotion } from 'framer-motion';
import { useEffect, useState } from 'react';

import { cn } from '@/lib/utils';

const LEFT_STREAM = [
  'PKT_DATA_ 408-805-565',
  'REPKT_DTA_ 239.113.75.113',
  'NODE_01 // SYNC_OK',
  'ELEVATION 0042.8M',
  'RANGE 18.4KM',
  'SIGNAL ████░░',
  'UX_SYS // ONLINE',
  'BUFFER 0000A7',
  'LATENCY 12MS',
] as const;

const RIGHT_STREAM = [
  'CH_HUNT // AUTH',
  'ROLE VP_UI_UX',
  'SECTOR GAMBLING',
  'STATUS NOMINAL',
  'PKT_OUT 004A7F',
  'RENDER HUD_V2',
  'BUILD 2K26',
  'MEM_HEAP OK',
  'THREADS 004',
] as const;

const BOOT_STAGES = [
  'INITIALIZING UX_SYS...',
  'LOADING PORTFOLIO MODULES...',
  'VERIFYING CH_HUNT // AUTH...',
  'SYNCING CASE STUDY DATA...',
  'RENDER PIPELINE // READY',
] as const;

function TelemetryScroll({
  items,
  align = 'left',
  className,
}: {
  items: readonly string[];
  align?: 'left' | 'right';
  className?: string;
}) {
  const loop = [...items, ...items];

  return (
    <div
      className={cn(
        'hud-telemetry-scroll',
        align === 'right' && 'hud-telemetry-scroll--right',
        className,
      )}
      aria-hidden
    >
      <div className="hud-telemetry-scroll-track">
        {loop.map((line, index) => (
          <p key={`${line}-${index}`} className="hud-telemetry-line">
            {line}
          </p>
        ))}
      </div>
    </div>
  );
}

function BootLoader({ reduced }: { reduced: boolean | null }) {
  const [stage, setStage] = useState(0);
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (reduced) {
      setVisible(false);
      return;
    }

    setStage(0);
    setProgress(6);
    setVisible(true);

    let currentStage = 0;

    const stageTimer = window.setInterval(() => {
      currentStage += 1;
      if (currentStage >= BOOT_STAGES.length) {
        window.clearInterval(stageTimer);
        window.setTimeout(() => setVisible(false), 1800);
        return;
      }
      setStage(currentStage);
    }, 3000);

    const progressTimer = window.setInterval(() => {
      setProgress((value) => Math.min(100, value + 2 + Math.random() * 3));
    }, 320);

    return () => {
      window.clearInterval(stageTimer);
      window.clearInterval(progressTimer);
    };
  }, [reduced]);

  if (!visible) return null;

  return (
    <div className="hero-hud-boot" aria-hidden>
      <p className="hero-hud-boot-line">
        SYS_BOOT // {BOOT_STAGES[stage]}
      </p>
      <div className="hero-hud-boot-bar">
        <span style={{ width: `${Math.min(progress, 100)}%` }} />
      </div>
    </div>
  );
}

export function HudTelemetry({ reduced }: { reduced?: boolean | null }) {
  return (
    <div className="hero-hud-telemetry-wrap" aria-hidden>
      <TelemetryScroll items={LEFT_STREAM} className="hero-hud-telemetry hero-hud-telemetry--left" />
      <TelemetryScroll
        items={RIGHT_STREAM}
        align="right"
        className="hero-hud-telemetry hero-hud-telemetry--right"
      />
      <BootLoader reduced={reduced ?? false} />
    </div>
  );
}
