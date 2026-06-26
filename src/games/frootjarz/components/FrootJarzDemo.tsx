'use client';

import Image from 'next/image';
import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';

import { FrootJarzSession, GamePhase } from '@/games/frootjarz/engine/session';
import { FrootJarzCanvas } from '@/games/frootjarz/render/FrootJarzCanvas';
import { unlockFJAudio, playFJ, preloadFJSfx } from '@/games/frootjarz/audio/frootjarzSfx';
import { publicUrl } from '@/lib/publicUrl';
import { cn } from '@/lib/utils';

export interface FrootJarzDemoHandle {
  spin: () => boolean;
  isIdle: () => boolean;
}

interface FrootJarzDemoProps {
  className?: string;
  logoClassName?: string;
  onSpinComplete?: () => void;
}

export const FrootJarzDemo = forwardRef<FrootJarzDemoHandle, FrootJarzDemoProps>(
  function FrootJarzDemo({ className, logoClassName, onSpinComplete }, ref) {
    const sessionRef = useRef<FrootJarzSession | null>(null);
    if (!sessionRef.current) {
      sessionRef.current = new FrootJarzSession();
    }
    const session = sessionRef.current;

    const [snap, setSnap] = useState(() => session.getSnapshot());
    const onSpinCompleteRef = useRef(onSpinComplete);
    onSpinCompleteRef.current = onSpinComplete;

    const refresh = useCallback(() => {
      setSnap(session.getSnapshot());
    }, [session]);

    const finishSpin = useCallback(() => {
      onSpinCompleteRef.current?.();
    }, []);

    const handleDropComplete = useCallback(() => {
      const phase = session.getSnapshot().phase;
      if (phase === GamePhase.Dropping) {
        session.dropComplete();
      } else if (phase === GamePhase.FreeSpinDropping) {
        session.freeSpinDropComplete();
      }

      const next = session.getSnapshot().phase;
      if (next === GamePhase.ShowWin) {
        session.dismissWin();
        finishSpin();
      } else if (next === GamePhase.Idle) {
        finishSpin();
      } else if (next === GamePhase.FreeSpinIntro || next === GamePhase.FreeSpinOutro) {
        session.forceIdle();
        finishSpin();
      }
      refresh();
    }, [finishSpin, refresh, session]);

    const handleCascadeStepComplete = useCallback(() => {
      const phase = session.getSnapshot().phase;
      if (phase === GamePhase.Cascading) {
        session.nextCascade();
      } else if (phase === GamePhase.FreeSpinCascading) {
        session.freeSpinNextCascade();
      }

      const next = session.getSnapshot().phase;
      if (next === GamePhase.ShowWin) {
        session.dismissWin();
        finishSpin();
      } else if (next === GamePhase.FreeSpinIntro || next === GamePhase.FreeSpinOutro) {
        session.forceIdle();
        finishSpin();
      } else if (next === GamePhase.Idle) {
        finishSpin();
      }
      refresh();
    }, [finishSpin, refresh, session]);

    useImperativeHandle(
      ref,
      () => ({
        spin: () => {
          unlockFJAudio();
          preloadFJSfx();
          if (session.getSnapshot().phase !== GamePhase.Idle) return false;
          playFJ('spin', 0.12);
          session.spin();
          refresh();
          return true;
        },
        isIdle: () => session.getSnapshot().phase === GamePhase.Idle,
      }),
      [refresh, session],
    );

    useEffect(() => {
      preloadFJSfx();
    }, []);

    return (
      <div className={cn('relative flex h-full min-h-[420px] flex-col', className)}>
        <div className="pointer-events-none absolute left-0 right-0 top-3 z-10 flex justify-center sm:top-4">
          <Image
            src={publicUrl('frootjarz/LOGO.png')}
            alt="Froot Jarz"
            width={640}
            height={240}
            priority
            className={cn(
              'w-auto drop-shadow-[0_16px_40px_rgb(0_0_0_/_0.45)]',
              logoClassName ?? 'h-[clamp(3.5rem,12vw,5.5rem)]',
            )}
          />
        </div>

        <FrootJarzCanvas
          snapshot={snap}
          onDropComplete={handleDropComplete}
          onCascadeStepComplete={handleCascadeStepComplete}
          className="min-h-[360px] flex-1 pt-[clamp(3.5rem,10vw,5rem)]"
        />
      </div>
    );
  },
);
