'use client';

import { motion, useReducedMotion } from 'framer-motion';

const EASE = [0.16, 1, 0.3, 1] as const;

function RollLetter({
  char,
  delay,
  onComplete,
}: {
  char: string;
  delay: number;
  onComplete?: () => void;
}) {
  const reduced = useReducedMotion();

  if (reduced) {
    return <span>{char}</span>;
  }

  return (
    <span className="hero-roll-cell" aria-hidden={false}>
      <motion.span
        className="inline-block"
        initial={{ y: '115%', opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.52, delay, ease: EASE }}
        onAnimationComplete={onComplete}
      >
        {char}
      </motion.span>
    </span>
  );
}

function RollOutlineWord({
  text,
  baseDelay,
  onComplete,
}: {
  text: string;
  baseDelay: number;
  onComplete?: () => void;
}) {
  const reduced = useReducedMotion();

  if (reduced) {
    return <span className="hero-chris-char hero-chris-char--locked">{text}</span>;
  }

  return (
    <span className="hero-roll-line" aria-label={text}>
      <motion.span
        className="hero-chris-char hero-chris-char--locked inline-block"
        initial={{ y: '110%', opacity: 0.55 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.62, delay: baseDelay, ease: EASE }}
        onAnimationComplete={onComplete}
      >
        {text}
      </motion.span>
    </span>
  );
}

export function RollInWord({
  text,
  outline = false,
  baseDelay = 0,
  stagger = 0.07,
  onComplete,
}: {
  text: string;
  outline?: boolean;
  baseDelay?: number;
  stagger?: number;
  onComplete?: () => void;
}) {
  const reduced = useReducedMotion();
  const letters = text.split('');

  if (reduced) {
    return (
      <span aria-label={text}>
        {outline ? (
          <span className="hero-chris-char hero-chris-char--locked">{text}</span>
        ) : (
          text
        )}
      </span>
    );
  }

  if (outline) {
    return <RollOutlineWord text={text} baseDelay={baseDelay} onComplete={onComplete} />;
  }

  return (
    <span aria-label={text}>
      {letters.map((char, index) => (
        <RollLetter
          key={`${char}-${index}`}
          char={char}
          delay={baseDelay + index * stagger}
          onComplete={index === letters.length - 1 ? onComplete : undefined}
        />
      ))}
    </span>
  );
}

export function rollInDuration(text: string, baseDelay = 0, stagger = 0.07) {
  return (baseDelay + (text.length - 1) * stagger + 0.52) * 1000;
}
