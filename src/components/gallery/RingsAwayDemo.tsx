'use client';

import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { useCallback, useEffect, useState } from 'react';

import { SiriOrb } from '@/components/gallery/SiriOrb';
import {
  RINGSAWAY_CALL_LINES,
  RINGSAWAY_PHONE,
  RINGSAWAY_PROMPTS,
} from '@/components/gallery/ringsaway/data';
import { cn } from '@/lib/utils';

function PhoneIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M8.5 4.5c.6-.9 1.8-1.1 2.7-.5l1.6 1.1c.7.5.9 1.4.5 2.1l-.9 1.4c-.3.5-.2 1.1.2 1.5.9.9 2.2 2.2 3.1 3.1.4.4 1 .5 1.5.2l1.4-.9c.7-.4 1.6-.2 2.1.5l1.1 1.6c.6.9.4 2.1-.5 2.7l-1.3.8c-1.2.8-2.7.6-3.9-.2-1.8-1.2-3.9-3.3-5.1-5.1-.8-1.2-1-2.7-.2-3.9l.8-1.3Z"
        fill="currentColor"
      />
    </svg>
  );
}

interface RingsAwayDemoProps {
  compact?: boolean;
  className?: string;
}

export function RingsAwayDemo({ compact, className }: RingsAwayDemoProps) {
  const reduced = useReducedMotion();
  const [activePrompt, setActivePrompt] = useState<string | null>(null);
  const [response, setResponse] = useState<string | null>(null);
  const [calling, setCalling] = useState(false);
  const [callLine, setCallLine] = useState(0);
  const [orbActive, setOrbActive] = useState(false);

  useEffect(() => {
    if (!calling) return;

    if (callLine >= RINGSAWAY_CALL_LINES.length - 1) {
      const end = window.setTimeout(() => {
        setCalling(false);
        setCallLine(0);
      }, 2400);
      return () => window.clearTimeout(end);
    }

    const next = window.setTimeout(() => setCallLine((line) => line + 1), 2200);
    return () => window.clearTimeout(next);
  }, [calling, callLine]);

  const handlePrompt = useCallback((id: string, reply: string) => {
    setActivePrompt(id);
    setResponse(reply);
    setOrbActive(true);
    window.setTimeout(() => setOrbActive(false), 1200);
  }, []);

  const startCall = useCallback(() => {
    setCalling(true);
    setCallLine(0);
    setResponse(null);
    setActivePrompt(null);
    setOrbActive(true);
  }, []);

  const endCall = useCallback(() => {
    setCalling(false);
    setCallLine(0);
    setOrbActive(false);
  }, []);

  return (
    <div className={cn('ra-demo', compact && 'ra-demo--compact', className)}>
      <div className="ra-demo-grid" aria-hidden />

      <div className="ra-demo-card">
        <div className="ra-demo-orb-wrap">
          <motion.div
            animate={
              orbActive && !reduced
                ? { scale: [1, 1.06, 1] }
                : calling && !reduced
                  ? { scale: [1, 1.03, 1] }
                  : { scale: 1 }
            }
            transition={
              calling
                ? { duration: 1.6, repeat: Infinity, ease: 'easeInOut' }
                : { duration: 0.5, ease: [0.16, 1, 0.3, 1] }
            }
          >
            <SiriOrb
              size={compact ? '112px' : '148px'}
              animationDuration={calling ? 8 : 16}
              colors={{
                bg: 'oklch(22% 0.04 250)',
                c1: 'oklch(62% 0.2 245)',
                c2: 'oklch(78% 0.14 210)',
                c3: 'oklch(68% 0.16 275)',
              }}
            />
          </motion.div>
        </div>

        <AnimatePresence mode="wait">
          {calling ? (
            <motion.div
              key="call"
              initial={reduced ? false : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduced ? undefined : { opacity: 0, y: -8 }}
              className="ra-call-panel"
            >
              <p className="ra-call-status">Live call</p>
              <p className="ra-call-line">{RINGSAWAY_CALL_LINES[callLine]}</p>
              <button type="button" className="ra-end-call" onClick={endCall}>
                End call
              </button>
            </motion.div>
          ) : (
            <motion.div
              key="prompts"
              initial={false}
              animate={{ opacity: 1 }}
              exit={reduced ? undefined : { opacity: 0 }}
            >
              <p className="ra-try-label">Try saying</p>
              <div className="ra-prompt-grid">
                {RINGSAWAY_PROMPTS.map((prompt) => (
                  <button
                    key={prompt.id}
                    type="button"
                    className={cn('ra-prompt', activePrompt === prompt.id && 'is-active')}
                    onClick={() => handlePrompt(prompt.id, prompt.response)}
                  >
                    {prompt.label}
                  </button>
                ))}
              </div>

              <AnimatePresence>
                {response ? (
                  <motion.p
                    initial={reduced ? false : { opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={reduced ? undefined : { opacity: 0 }}
                    className="ra-response"
                  >
                    {response}
                  </motion.p>
                ) : null}
              </AnimatePresence>

              <button type="button" className="ra-start-call" onClick={startCall}>
                <PhoneIcon className="h-4 w-4" />
                Start a call
              </button>

              <p className="ra-phone-line">
                or call{' '}
                <a href={`tel:${RINGSAWAY_PHONE.replace(/\s/g, '')}`} className="ra-phone-link">
                  {RINGSAWAY_PHONE}
                </a>{' '}
                to talk to the AI Agent
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
