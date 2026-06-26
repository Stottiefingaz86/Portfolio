'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useEffect } from 'react';

import { RingsAwayDemo } from '@/components/gallery/RingsAwayDemo';

interface RingsAwayDemoModalProps {
  open: boolean;
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

export function RingsAwayDemoModal({ open, onClose }: RingsAwayDemoModalProps) {
  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKeyDown);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open ? (
        <>
          <motion.button
            type="button"
            aria-label="Close demo"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[var(--z-modal)] bg-[var(--x-ink)]/20"
            onClick={onClose}
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="RingsAway AI agent demo"
            initial={{ opacity: 0, y: 32, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.98 }}
            transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-x-4 top-[12svh] z-[calc(var(--z-modal)+1)] mx-auto max-h-[76svh] max-w-md overflow-y-auto rounded-[1.75rem] bg-[#eceae4] p-4 shadow-[0_40px_120px_rgb(10_10_10_/_0.22)] md:inset-x-auto md:w-full md:p-6"
          >
            <button
              type="button"
              aria-label="Close demo"
              onClick={onClose}
              className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-[0_8px_30px_rgb(10_10_10_/_0.08)]"
            >
              <CloseIcon />
            </button>
            <RingsAwayDemo />
          </motion.div>
        </>
      ) : null}
    </AnimatePresence>
  );
}
