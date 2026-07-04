'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, type RefObject } from 'react';

import { CaseStudyImagePlaceholder } from '@/components/case-study/CaseStudyImagePlaceholder';
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
        <CaseStudyImagePlaceholder variant="hero" />
      </motion.div>
    </div>
  );
}
