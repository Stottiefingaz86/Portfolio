'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';
import { useCallback, useEffect, useRef, useState } from 'react';

import { GlitchText } from '@/components/site/hud/GlitchText';
import { HudSectionShell } from '@/components/site/hud/HudSection';
import {
  TestimonialsCollabProvider,
  useTestimonialsCollabOptional,
} from '@/components/site/TestimonialsCollabContext';
import { TestimonialsCollaborationCursors } from '@/components/site/TestimonialsCollaborationCursors';
import { useHudHoverLight } from '@/components/site/useHudHoverLight';
import { TESTIMONIALS } from '@/lib/portfolio-data';
import { cn } from '@/lib/utils';

const EASE = [0.16, 1, 0.3, 1] as const;

function getInitials(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? '')
    .join('');
}

function TestimonialCard({
  testimonial,
  index,
  active,
}: {
  testimonial: (typeof TESTIMONIALS.items)[number];
  index: number;
  active: boolean;
}) {
  const hoverLight = useHudHoverLight();
  const collab = useTestimonialsCollabOptional();
  const isCyrusLive = collab?.enabled && testimonial.id === collab.cyrusId;
  const showLiveQuote = isCyrusLive && !collab.isComplete;
  const quoteText = isCyrusLive ? collab.typedText : testimonial.quote;

  return (
    <article
      className={cn(
        'testimonial-card hud-hover-surface',
        active && 'is-active',
        isCyrusLive && collab.isTyping && 'testimonial-card--live',
      )}
      data-collab-card={testimonial.id}
      aria-current={active ? 'true' : undefined}
      onPointerMove={hoverLight.onPointerMove}
      onPointerLeave={hoverLight.onPointerLeave}
    >
      <span className="hud-hover-light" aria-hidden />
      {isCyrusLive && collab.isTyping ? (
        <p className="testimonial-card__live-badge" aria-hidden>
          <span className="testimonial-card__live-dot" />
          Cyrus is typing
        </p>
      ) : null}
      <p className="testimonial-card__index">{String(index + 1).padStart(2, '0')}</p>
      <blockquote className="testimonial-card__quote">
        <p>
          &ldquo;{quoteText}
          {showLiveQuote ? (
            <>
              <span ref={collab.anchorRef} className="testimonial-live-anchor" aria-hidden />
              <span className="testimonial-live-caret" aria-hidden />
            </>
          ) : null}
          {!showLiveQuote ? '\u201D' : null}
        </p>
      </blockquote>
      <footer className="testimonial-card__author">
        <span className="testimonial-card__avatar" aria-hidden>
          {getInitials(testimonial.name)}
        </span>
        <div className="testimonial-card__identity">
          <cite className="testimonial-card__name">{testimonial.name}</cite>
          <p className="testimonial-card__role">
            {testimonial.role} · {testimonial.company}
          </p>
          {testimonial.context ? (
            <p className="testimonial-card__context">{testimonial.context}</p>
          ) : null}
        </div>
      </footer>
    </article>
  );
}

function TestimonialsContent() {
  const reduced = useReducedMotion();
  const items = TESTIMONIALS.items;
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const total = items.length;

  const scrollToIndex = useCallback((index: number) => {
    const track = trackRef.current;
    if (!track) return;

    const card = track.children.item(index) as HTMLElement | null;
    if (!card) return;

    track.scrollTo({
      left: card.offsetLeft,
      behavior: reduced ? 'auto' : 'smooth',
    });
  }, [reduced]);

  const goTo = useCallback(
    (index: number) => {
      const next = (index + total) % total;
      setActiveIndex(next);
      scrollToIndex(next);
    },
    [scrollToIndex, total],
  );

  const goPrev = useCallback(() => goTo(activeIndex - 1), [activeIndex, goTo]);
  const goNext = useCallback(() => goTo(activeIndex + 1), [activeIndex, goTo]);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const onScroll = () => {
      const cards = Array.from(track.children) as HTMLElement[];
      if (!cards.length) return;

      const trackLeft = track.scrollLeft;
      let closest = 0;
      let closestDistance = Number.POSITIVE_INFINITY;

      cards.forEach((card, index) => {
        const distance = Math.abs(card.offsetLeft - trackLeft);
        if (distance < closestDistance) {
          closestDistance = distance;
          closest = index;
        }
      });

      setActiveIndex(closest);
    };

    track.addEventListener('scroll', onScroll, { passive: true });
    return () => track.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const section = document.getElementById('testimonials');
      if (!section) return;

      const rect = section.getBoundingClientRect();
      const inSection =
        rect.top < window.innerHeight * 0.75 && rect.bottom > window.innerHeight * 0.25;
      if (!inSection) return;

      if (event.key === 'ArrowLeft') {
        event.preventDefault();
        goPrev();
      }

      if (event.key === 'ArrowRight') {
        event.preventDefault();
        goNext();
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [goNext, goPrev]);

  return (
    <>
      <TestimonialsCollaborationCursors />

      <div className="testimonials-header">
        <motion.div
          className="testimonials-intro"
          initial={reduced ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-10%' }}
          transition={{ duration: 0.65, ease: EASE }}
        >
          <p className="section-kicker">{TESTIMONIALS.kicker}</p>
          <h2 className="section-title">
            <GlitchText as="span">{TESTIMONIALS.title}</GlitchText>
          </h2>
          <p className="section-lead">{TESTIMONIALS.lead}</p>
        </motion.div>

        {total > 1 ? (
          <div className="testimonials-controls">
            <button
              type="button"
              className="testimonials-controls__btn"
              aria-label="Previous testimonial"
              onClick={goPrev}
            >
              <ChevronLeftIcon aria-hidden />
            </button>
            <p className="testimonials-controls__counter" aria-live="polite">
              {String(activeIndex + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
            </p>
            <button
              type="button"
              className="testimonials-controls__btn"
              aria-label="Next testimonial"
              onClick={goNext}
            >
              <ChevronRightIcon aria-hidden />
            </button>
          </div>
        ) : null}
      </div>

      <div className="testimonials-carousel" aria-label="Testimonials carousel">
        <div ref={trackRef} className="testimonials-track">
          {items.map((testimonial, index) => (
            <TestimonialCard
              key={testimonial.id}
              testimonial={testimonial}
              index={index}
              active={index === activeIndex}
            />
          ))}
        </div>
      </div>
    </>
  );
}

export function Testimonials() {
  return (
    <HudSectionShell
      id="testimonials"
      code="SEC_06 // TESTIMONIALS"
      className="testimonials-section"
    >
      <div className="shell testimonials-layout testimonials-layout--collab">
        <TestimonialsCollabProvider>
          <TestimonialsContent />
        </TestimonialsCollabProvider>
      </div>
    </HudSectionShell>
  );
}
