'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useRef } from 'react';

import { BlogModalContent } from '@/components/blog/BlogModalContent';
import { useLenis } from '@/components/portfolio/SmoothScroll';
import type { BlogPost } from '@/lib/blog-types';
import { playSiteSound } from '@/lib/site-sounds';

interface BlogModalProps {
  post: BlogPost | null;
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

export function BlogModal({ post, index, onClose }: BlogModalProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const lenis = useLenis();

  useEffect(() => {
    if (!post) return;

    playSiteSound('popupOpen');

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
  }, [post, onClose, lenis]);

  useEffect(() => {
    if (post && scrollRef.current) {
      scrollRef.current.scrollTop = 0;
    }
  }, [post]);

  return (
    <AnimatePresence>
      {post ? (
        <>
          <motion.button
            type="button"
            aria-label="Close blog post"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="case-modal-backdrop fixed inset-0 z-[var(--z-modal)]"
            onClick={onClose}
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby={`blog-title-${post.id}`}
            initial={{ opacity: 0, y: 32, scale: 0.985 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.985 }}
            transition={{ duration: 0.42, ease: [0.16, 1, 0.3, 1] }}
            className="case-modal blog-modal-shell fixed inset-x-3 top-3 bottom-3 z-[calc(var(--z-modal)+1)] flex flex-col overflow-hidden md:inset-x-8 md:top-8 md:bottom-8"
          >
            <button
              type="button"
              aria-label="Close blog post"
              onClick={onClose}
              className="case-modal-close"
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
              <div id={`blog-title-${post.id}`} className="sr-only">
                {post.title}
              </div>
              <BlogModalContent post={post} index={index} />
            </div>
          </motion.div>
        </>
      ) : null}
    </AnimatePresence>
  );
}
