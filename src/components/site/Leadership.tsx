'use client';

import {
  motion,
  useInView,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from 'framer-motion';
import { useRef } from 'react';

import { GlitchText } from '@/components/site/hud/GlitchText';
import { HudRow } from '@/components/site/hud/HudRow';
import { HudSectionShell } from '@/components/site/hud/HudSection';
import { useHudHoverLight } from '@/components/site/useHudHoverLight';
import { useSiteAmbienceOnActive } from '@/components/site/useSiteAmbienceOnActive';
import { DESIGN_LEADERSHIP } from '@/lib/portfolio-data';
import { cn } from '@/lib/utils';

const EASE = [0.16, 1, 0.3, 1] as const;
const THESIS_LINES = [
  ['Design', 'is', 'how'],
  ['a', 'business'],
  ['becomes'],
  ['clearer,', 'faster'],
  ['and', 'easier'],
  ['to', 'trust.'],
] as const;

const THESIS_WORDS = THESIS_LINES.flat();
const THESIS_WORD_COUNT = THESIS_WORDS.length;

const THESIS_LINE_STARTS = THESIS_LINES.map((_, lineIndex) =>
  THESIS_LINES.slice(0, lineIndex).reduce((total, line) => total + line.length, 0),
);

const THESIS_INACTIVE = 'oklch(0.97 0.004 260 / 0.34)';
const THESIS_ACTIVE = 'var(--x-accent)';

function ThesisWord({
  word,
  index,
  wordProgress,
  reduced,
}: {
  word: string;
  index: number;
  wordProgress: MotionValue<number>;
  reduced: boolean | null;
}) {
  const color = useTransform(wordProgress, (value) => {
    if (reduced) return THESIS_ACTIVE;
    return value > index + 0.12 ? THESIS_ACTIVE : THESIS_INACTIVE;
  });

  return (
    <motion.span className="leadership-thesis-word" style={{ color }} aria-hidden={false}>
      {word}
    </motion.span>
  );
}

function ScrollThesis({ reduced }: { reduced: boolean | null }) {
  const trackRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ['start 0.82', 'end 0.28'],
  });

  const wordProgress = useTransform(
    scrollYProgress,
    [0, 1],
    reduced ? [THESIS_WORD_COUNT, THESIS_WORD_COUNT] : [0, THESIS_WORD_COUNT],
  );

  return (
    <div ref={trackRef} className="leadership-thesis-track">
      <motion.blockquote
        className="leadership-thesis"
        initial={reduced ? false : { opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-12%' }}
        transition={{ duration: 0.75, delay: 0.05, ease: EASE }}
        aria-label={DESIGN_LEADERSHIP.philosophy.lead}
      >
        {THESIS_LINES.map((line, lineIndex) => (
          <span key={lineIndex} className="leadership-thesis-line">
            {line.map((word, wordIndex) => {
              const index = THESIS_LINE_STARTS[lineIndex] + wordIndex;
              return (
                <ThesisWord
                  key={`${word}-${index}`}
                  word={word}
                  index={index}
                  wordProgress={wordProgress}
                  reduced={reduced}
                />
              );
            })}
          </span>
        ))}
      </motion.blockquote>
    </div>
  );
}

function LeadershipTruth({
  principle,
  index,
  reduced,
}: {
  principle: (typeof DESIGN_LEADERSHIP.principles)[number];
  index: number;
  reduced: boolean | null;
}) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { margin: '-42% 0px -42% 0px', amount: 0.35 });
  const hoverLight = useHudHoverLight();
  useSiteAmbienceOnActive(inView);

  return (
    <motion.article
      ref={ref}
      initial={reduced ? false : { opacity: 0, y: 20 }}
      animate={{ opacity: inView ? 1 : reduced ? 0.75 : 0.32 }}
      transition={{ duration: 0.45, ease: EASE }}
      className={cn('leadership-truth', inView && 'is-active')}
    >
      <HudRow
        code={`[ ${principle.keyword.toUpperCase()} // PRINCIPLE ]`}
        className="hud-row--principle"
      >
        <div
          className="principle-panel hud-hover-surface"
          onPointerMove={hoverLight.onPointerMove}
          onPointerLeave={hoverLight.onPointerLeave}
        >
          <span className="hud-hover-light" aria-hidden />
          <div className="principle-panel__head">
            <p className="leadership-truth-index">{String(index + 1).padStart(2, '0')}</p>
            <h3 className="leadership-truth-title">
              <GlitchText as="span" intensity="elevated">
                {principle.title}
              </GlitchText>
            </h3>
          </div>
          <p className="leadership-truth-body">{principle.body}</p>
          <p className="leadership-truth-proof">{principle.proof}</p>
        </div>
      </HudRow>
    </motion.article>
  );
}

export function Leadership() {
  const reduced = useReducedMotion();

  return (
    <HudSectionShell id="leadership" code="SEC_05 // LEADERSHIP" className="leadership-section">
      <div className="shell leadership-layout">
        <div className="leadership-essay">
          <h2 className="sr-only">{DESIGN_LEADERSHIP.title}</h2>
          <p className="section-kicker">Leadership</p>
          <ScrollThesis reduced={reduced} />
        </div>

        <div className="leadership-truths" aria-label="Leadership principles">
          {DESIGN_LEADERSHIP.principles.map((principle, index) => (
            <LeadershipTruth
              key={principle.title}
              principle={principle}
              index={index}
              reduced={reduced}
            />
          ))}
        </div>
      </div>
    </HudSectionShell>
  );
}
