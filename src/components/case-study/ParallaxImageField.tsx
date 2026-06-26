'use client';

import { motion, useScroll, useTransform, type MotionValue } from 'framer-motion';
import Image from 'next/image';
import { useRef, type RefObject } from 'react';

const TILES = [
  { x: '-28%', y: '-12%', rotate: -14, scale: 0.72, speed: 0.35 },
  { x: '-8%', y: '18%', rotate: -6, scale: 0.82, speed: 0.5 },
  { x: '18%', y: '-18%', rotate: 8, scale: 0.88, speed: 0.65 },
  { x: '32%', y: '10%', rotate: 12, scale: 0.78, speed: 0.45 },
  { x: '0%', y: '4%', rotate: -2, scale: 1, speed: 0.85 },
] as const;

function ParallaxTile({
  src,
  alt,
  tile,
  progress,
}: {
  src: string;
  alt: string;
  tile: (typeof TILES)[number];
  progress: MotionValue<number>;
}) {
  const y = useTransform(progress, [0, 1], [0, 140 * tile.speed]);
  const rotate = useTransform(progress, [0, 1], [tile.rotate, tile.rotate + 6 * tile.speed]);

  return (
    <motion.div
      style={{ y, rotate, left: tile.x, top: tile.y, scale: tile.scale }}
      className="absolute w-[46%] max-w-[340px] aspect-[4/5] overflow-hidden rounded-xl shadow-[0_24px_60px_rgb(10_10_10_/_0.28)]"
    >
      <Image src={src} alt={alt} fill className="object-cover" sizes="(min-width: 768px) 340px, 46vw" />
    </motion.div>
  );
}

export function ParallaxImageField({
  image,
  title,
  scrollContainer,
}: {
  image: string;
  title: string;
  scrollContainer?: RefObject<HTMLElement | null>;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    container: scrollContainer,
    target: ref,
    offset: ['start end', 'end start'],
  });
  const fieldY = useTransform(scrollYProgress, [0, 1], ['-6%', '14%']);
  const fieldScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.12, 1.04, 1]);

  return (
    <div ref={ref} className="absolute inset-0 overflow-hidden bg-[var(--x-ink)]">
      <motion.div
        style={{ y: fieldY, scale: fieldScale }}
        className="absolute inset-[-10%] flex items-center justify-center"
      >
        <div className="relative h-[115%] w-[115%]">
          {TILES.map((tile, index) => (
            <ParallaxTile
              key={index}
              src={image}
              alt={title}
              tile={tile}
              progress={scrollYProgress}
            />
          ))}
        </div>
      </motion.div>
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgb(10_10_10_/_0.15),rgb(10_10_10_/_0.55))]" />
    </div>
  );
}
