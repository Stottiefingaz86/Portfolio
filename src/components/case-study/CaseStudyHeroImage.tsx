'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import { useRef, type RefObject } from 'react';

import { cn } from '@/lib/utils';
import type { CaseStudy } from '@/lib/portfolio-data';

export function CaseStudyHeroImage({
  study,
  scrollContainer,
}: {
  study: Pick<CaseStudy, 'image' | 'title' | 'imageFit' | 'imagePosition'>;
  scrollContainer?: RefObject<HTMLElement | null>;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    container: scrollContainer,
    target: ref,
    offset: ['start end', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], ['-4%', '8%']);

  return (
    <div ref={ref} className="absolute inset-0 overflow-hidden bg-[var(--x-ink)]">
      <motion.div style={{ y }} className="absolute inset-0">
        <Image
          src={study.image}
          alt={study.title}
          fill
          className={cn(
            study.imageFit === 'contain' ? 'object-contain' : 'object-cover',
            study.imagePosition === 'top' ? 'object-top' : 'object-center',
          )}
          sizes="100vw"
          priority
        />
      </motion.div>
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgb(10_10_10_/_0.12),rgb(10_10_10_/_0.55))]" />
    </div>
  );
}
