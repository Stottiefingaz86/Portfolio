'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useRef } from 'react';

import { CaseStudyContent } from '@/components/case-study/CaseStudyContent';
import { useLenis } from '@/components/portfolio/SmoothScroll';
import type { CaseStudy } from '@/lib/portfolio-data';

interface CaseStudyModalProps {
  study: CaseStudy | null;
  index: number;
  onClose: () => void;
}

function CloseIcon() {
  return (
    <span className="relative block h-4 w-4" aria-hidden>
      <span className="absolute left-0 top-1/2 block h-[2px] w-4 -translate-y-1/2 rotate-45 rounded-full bg-[var(--x-ink)]" />
      <span className="absolute left-0 top-1/2 block h-[2px] w-4 -translate-y-1/2 -rotate-45 rounded-full bg-[var(--x-ink)]" />
    </span>
  );
}

export function CaseStudyModal({ study, index, onClose }: CaseStudyModalProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const lenis = useLenis();

  useEffect(() => {
    if (!study) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };

    document.body.style.overflow = 'hidden';
    lenis?.stop();
    window.addEventListener('keydown', onKeyDown);

    return () => {
      document.body.style.overflow = '';
      lenis?.start();
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [study, onClose, lenis]);

  useEffect(() => {
    if (study && scrollRef.current) {
      scrollRef.current.scrollTop = 0;
    }
  }, [study]);

  return (
    <AnimatePresence>
      {study ? (
        <>
          <motion.button
            type="button"
            aria-label="Close case study"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[var(--z-modal)] bg-[var(--x-ink)]/18"
            onClick={onClose}
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby={`case-title-${study.id}`}
            initial={{ opacity: 0, y: 48, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 32, scale: 0.98 }}
            transition={{ duration: 0.42, ease: [0.16, 1, 0.3, 1] }}
            className="case-modal fixed inset-x-3 top-3 bottom-3 z-[calc(var(--z-modal)+1)] flex flex-col overflow-hidden rounded-[1.5rem] bg-[var(--x-canvas)] shadow-[0_40px_120px_rgb(10_10_10_/_0.22)] md:inset-x-8 md:top-8 md:bottom-8 md:rounded-[2rem]"
          >
            <button
              type="button"
              aria-label="Close case study"
              onClick={onClose}
              className="absolute right-5 top-5 z-20 flex h-11 w-11 items-center justify-center rounded-full border border-[var(--x-line)] bg-[var(--x-canvas-elevated)] transition-transform hover:scale-[1.03] md:right-8 md:top-8"
            >
              <CloseIcon />
            </button>

            <div
              ref={scrollRef}
              className="case-modal-scroll min-h-0 flex-1 overflow-y-auto overscroll-contain"
              data-lenis-prevent
              data-lenis-prevent-wheel
              data-lenis-prevent-touch
            >
              <div id={`case-title-${study.id}`} className="sr-only">
                {study.title}
              </div>
              <CaseStudyContent
                study={study}
                index={index}
                scrollContainer={scrollRef}
                inModal
              />
            </div>
          </motion.div>
        </>
      ) : null}
    </AnimatePresence>
  );
}
