'use client';

import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from 'framer-motion';
import Image from 'next/image';
import { useState, type RefObject } from 'react';

import type { AboutJourneyFrame } from '@/lib/portfolio-data';

function JourneyLayer({
  frame,
  opacity,
  priority,
}: {
  frame: AboutJourneyFrame;
  opacity: MotionValue<number>;
  priority?: boolean;
}) {
  return (
    <motion.div className="about-journey-layer" style={{ opacity }} aria-hidden>
      <Image
        src={frame.src}
        alt=""
        fill
        priority={priority}
        className="about-portrait-image"
        sizes="(min-width: 1024px) 46vw, 100vw"
      />
    </motion.div>
  );
}

function useLayerOpacity(
  index: number,
  total: number,
  progress: MotionValue<number>,
) {
  const step = 1 / (total - 1);
  const start = (index - 1) * step;
  const peak = index * step;
  const end = (index + 1) * step;

  if (index === 0) {
    return useTransform(progress, [0, 0, end], [1, 1, 0]);
  }

  if (index === total - 1) {
    return useTransform(progress, [start, peak, 1], [0, 1, 1]);
  }

  return useTransform(progress, [start, peak, end], [0, 1, 0]);
}

function JourneyLayerItem({
  frame,
  index,
  total,
  progress,
}: {
  frame: AboutJourneyFrame;
  index: number;
  total: number;
  progress: MotionValue<number>;
}) {
  const opacity = useLayerOpacity(index, total, progress);

  return <JourneyLayer frame={frame} opacity={opacity} priority={index === 0} />;
}

export function AboutJourneyPortrait({
  frames,
  progressRef,
}: {
  frames: readonly AboutJourneyFrame[];
  progressRef: RefObject<HTMLElement | null>;
}) {
  const reducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: progressRef,
    offset: ['start 0.82', 'end 0.18'],
  });
  const [activeIndex, setActiveIndex] = useState(0);
  const activeFrame = frames[activeIndex] ?? frames[0];

  useMotionValueEvent(scrollYProgress, 'change', (value) => {
    const next = Math.round(value * (frames.length - 1));
    setActiveIndex(next);
  });

  if (reducedMotion) {
    const frame = frames[frames.length - 1] ?? frames[0];

    return (
      <>
        <div className="about-portrait-media">
          <Image
            src={frame.src}
            alt={frame.alt}
            fill
            className="about-portrait-image"
            sizes="(min-width: 1024px) 46vw, 100vw"
          />
        </div>
        <figcaption className="about-journey-caption" aria-live="polite">
          <span className="expertise-row-index about-journey-caption__index">
            {String(frames.length).padStart(2, '0')}
          </span>
          <span className="expertise-row-title about-journey-caption__title">{frame.label}</span>
          <span className="expertise-row-body about-journey-caption__detail">{frame.detail}</span>
        </figcaption>
      </>
    );
  }

  return (
    <>
      <div className="about-portrait-media about-portrait-media--journey">
        {frames.map((frame, index) => (
          <JourneyLayerItem
            key={frame.src}
            frame={frame}
            index={index}
            total={frames.length}
            progress={scrollYProgress}
          />
        ))}
      </div>
      <figcaption className="about-journey-caption" aria-live="polite">
        <motion.span
          key={`${activeFrame.label}-index`}
          className="expertise-row-index about-journey-caption__index"
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
        >
          {String(activeIndex + 1).padStart(2, '0')}
        </motion.span>
        <motion.span
          key={`${activeFrame.label}-label`}
          className="expertise-row-title about-journey-caption__title"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.04 }}
        >
          {activeFrame.label}
        </motion.span>
        <motion.span
          key={`${activeFrame.label}-detail`}
          className="expertise-row-body about-journey-caption__detail"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.08 }}
        >
          {activeFrame.detail}
        </motion.span>
      </figcaption>
    </>
  );
}
