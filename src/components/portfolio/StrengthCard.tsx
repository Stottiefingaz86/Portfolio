'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

import type { Strength } from '@/lib/portfolio-data';
import { cn } from '@/lib/utils';

const suitPaths: Record<Strength['suit'], string> = {
  spades: '/cards/suits/spades.svg',
  hearts: '/cards/suits/hearts.svg',
  diamonds: '/cards/suits/diamonds.svg',
  clubs: '/cards/suits/clubs.svg',
};

const suitTone: Record<Strength['suit'], string> = {
  spades: 'text-neutral-900',
  clubs: 'text-neutral-900',
  hearts: 'text-[#c41e3a]',
  diamonds: 'text-[#c41e3a]',
};

interface StrengthCardProps {
  strength: Strength;
  index: number;
  flipped: boolean;
  onFlip: () => void;
  disabled?: boolean;
}

export function StrengthCard({
  strength,
  index,
  flipped,
  onFlip,
  disabled,
}: StrengthCardProps) {
  return (
    <motion.button
      type="button"
      layout
      initial={{ opacity: 0, y: -80, rotate: -6 }}
      animate={{ opacity: 1, y: 0, rotate: 0 }}
      transition={{
        type: 'spring',
        stiffness: 280,
        damping: 24,
        delay: index * 0.1,
      }}
      onClick={onFlip}
      disabled={disabled}
      className="group relative aspect-[5/7] w-[clamp(5rem,16vw,7.5rem)] cursor-pointer perspective-[1000px] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary disabled:cursor-default"
      aria-label={`${strength.title}. ${flipped ? strength.proof : 'Tap to reveal proof'}`}
    >
      <motion.div
        className="relative size-full"
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 26 }}
        style={{ transformStyle: 'preserve-3d' }}
      >
        <div
          className="absolute inset-0 flex flex-col rounded-lg border border-neutral-200/80 bg-white shadow-[0_12px_40px_rgba(0,0,0,0.35)]"
          style={{ backfaceVisibility: 'hidden' }}
        >
          <div className="flex items-start justify-between p-2">
            <span className={cn('text-sm font-bold', suitTone[strength.suit])}>
              {strength.rank}
            </span>
            <Image src={suitPaths[strength.suit]} alt="" width={14} height={14} />
          </div>
          <div className="flex flex-1 items-center justify-center px-2 text-center">
            <span className="text-balance text-[11px] font-semibold leading-snug text-neutral-900 sm:text-xs">
              {strength.title}
            </span>
          </div>
          <div className="flex items-end justify-between p-2">
            <Image
              src={suitPaths[strength.suit]}
              alt=""
              width={14}
              height={14}
              className="rotate-180 opacity-80"
            />
            <span className={cn('text-sm font-bold', suitTone[strength.suit])}>
              {strength.rank}
            </span>
          </div>
        </div>

        <div
          className="absolute inset-0 flex flex-col rounded-lg border border-primary/30 bg-[oklch(0.12_0.02_130)] p-3 text-left shadow-[0_12px_40px_rgba(0,0,0,0.5)]"
          style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
        >
          <p className="flex-1 text-[11px] leading-relaxed text-white/90 sm:text-xs">
            {strength.proof}
          </p>
        </div>
      </motion.div>
    </motion.button>
  );
}
