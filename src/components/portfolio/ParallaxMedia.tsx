'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

import { useMediaParallax } from '@/hooks/useParallax';
import { cn } from '@/lib/utils';

export function ParallaxMedia({
  src,
  alt,
  sizes,
  priority,
  className,
}: {
  src: string;
  alt: string;
  sizes: string;
  priority?: boolean;
  className?: string;
}) {
  const { ref, y, scale } = useMediaParallax(0.1);

  return (
    <div ref={ref} className={cn('parallax-media', className)}>
      <motion.div className="parallax-media-inner" style={{ y, scale }}>
        <Image src={src} alt={alt} fill className="parallax-media-image" sizes={sizes} priority={priority} />
      </motion.div>
    </div>
  );
}
