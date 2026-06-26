'use client';

import dynamic from 'next/dynamic';
import { motion, useInView, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { useEffect, useRef } from 'react';

import type { FrootJarzDemoHandle } from '@/games/frootjarz/components/FrootJarzDemo';
import { PortfolioTableCanvas } from '@/components/portfolio/PortfolioTableCanvas';

const FrootJarzDemo = dynamic(
  () =>
    import('@/games/frootjarz/components/FrootJarzDemo').then((mod) => mod.FrootJarzDemo),
  { ssr: false },
);

export function TableExperience() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const frootRef = useRef<FrootJarzDemoHandle>(null);
  const wasInViewRef = useRef(false);
  const reduced = useReducedMotion();

  const inView = useInView(sectionRef, { amount: 0.42, margin: '-8% 0px -8% 0px' });
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const shellY = useTransform(scrollYProgress, [0, 0.5, 1], reduced ? [0, 0, 0] : [72, 0, -72]);
  const shellScale = useTransform(scrollYProgress, [0, 0.45, 1], reduced ? [1, 1, 1] : [0.94, 1.05, 0.97]);
  const feltY = useTransform(scrollYProgress, [0, 1], reduced ? [0, 0] : [48, -48]);
  const feltOpacity = useTransform(scrollYProgress, [0, 0.35, 0.75, 1], [0.08, 0.22, 0.22, 0.1]);

  useEffect(() => {
    if (!inView) {
      wasInViewRef.current = false;
      return;
    }
    if (wasInViewRef.current) return;
    if (!frootRef.current?.isIdle()) return;

    wasInViewRef.current = true;
    frootRef.current.spin();
  }, [inView]);

  return (
    <div ref={sectionRef} className="relative min-h-[min(100svh,920px)] py-8 sm:py-12">
      <motion.div style={{ y: feltY, opacity: feltOpacity }} className="absolute inset-0">
        <PortfolioTableCanvas className="h-full w-full" />
      </motion.div>

      <motion.div
        style={{ y: shellY, scale: shellScale }}
        className="relative z-[1] mx-auto h-[min(78vh,760px)] w-full max-w-[min(100%,980px)]"
      >
        <FrootJarzDemo ref={frootRef} className="h-full" logoClassName="h-[clamp(4rem,14vw,7rem)]" />
      </motion.div>
    </div>
  );
}
