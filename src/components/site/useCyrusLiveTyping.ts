'use client';

import { useEffect, useRef, useState } from 'react';

const CYRUS_ID = 'cyrus-moreno';

function getTypingDelay(char: string) {
  if (char === '.' || char === '!') return 380 + Math.random() * 180;
  if (char === ',') return 240 + Math.random() * 120;
  if (char === ' ') return 38 + Math.random() * 28;
  if (char === '&') return 160;
  return 24 + Math.random() * 26;
}

export function useCyrusLiveTyping({
  quote,
  inView,
  reduced,
}: {
  quote: string;
  inView: boolean;
  reduced: boolean | null;
}) {
  const [typedLength, setTypedLength] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const anchorRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (reduced) {
      setTypedLength(quote.length);
      setIsTyping(false);
      setIsComplete(true);
      return;
    }

    if (!inView) {
      setTypedLength(0);
      setIsTyping(false);
      setIsComplete(false);
      return;
    }

    let cancelled = false;
    let timeoutId = 0;
    let index = 0;

    setTypedLength(0);
    setIsTyping(false);
    setIsComplete(false);

    const startDelay = window.setTimeout(() => {
      if (cancelled) return;
      setIsTyping(true);

      const typeNext = () => {
        if (cancelled) return;

        if (index >= quote.length) {
          setIsTyping(false);
          setIsComplete(true);
          return;
        }

        index += 1;
        setTypedLength(index);

        const delay = getTypingDelay(quote[index - 1] ?? '');
        timeoutId = window.setTimeout(typeNext, delay);
      };

      typeNext();
    }, 900);

    return () => {
      cancelled = true;
      window.clearTimeout(startDelay);
      window.clearTimeout(timeoutId);
    };
  }, [inView, quote, reduced]);

  return {
    cyrusId: CYRUS_ID,
    typedLength,
    typedText: quote.slice(0, typedLength),
    isTyping,
    isComplete,
    anchorRef,
  };
}
