'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
  type RefObject,
} from 'react';
import { useReducedMotion } from 'framer-motion';

import { TESTIMONIALS } from '@/lib/portfolio-data';

import { useCyrusLiveTyping } from './useCyrusLiveTyping';

type TestimonialsCollabContextValue = {
  enabled: boolean;
  inView: boolean;
  cyrusId: string;
  cyrusColor: string;
  cyrusName: string;
  cyrusInitials: string;
  typedText: string;
  isTyping: boolean;
  isComplete: boolean;
  anchorRef: RefObject<HTMLSpanElement | null>;
  containerRef: RefObject<HTMLDivElement | null>;
};

const TestimonialsCollabContext = createContext<TestimonialsCollabContextValue | null>(null);

const CYRUS_COLOR = '#a259ff';

function getInitials(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? '')
    .join('');
}

export function TestimonialsCollabProvider({ children }: { children: ReactNode }) {
  const reduced = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const enabled = true;
  const [inView, setInView] = useState(false);

  const cyrus = TESTIMONIALS.items.find((item) => item.id === 'cyrus-moreno');
  const cyrusQuote = cyrus?.quote ?? '';

  const typing = useCyrusLiveTyping({
    quote: cyrusQuote,
    inView: inView && enabled,
    reduced,
  });

  useEffect(() => {
    const section = document.getElementById('testimonials');
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView(Boolean(entry?.isIntersecting));
      },
      { threshold: 0.28 },
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  const value = useMemo(
    () => ({
      enabled,
      inView,
      cyrusId: typing.cyrusId,
      cyrusColor: CYRUS_COLOR,
      cyrusName: cyrus?.name ?? 'Cyrus Moreno',
      cyrusInitials: getInitials(cyrus?.name ?? 'CM'),
      typedText: typing.typedText,
      isTyping: typing.isTyping,
      isComplete: typing.isComplete,
      anchorRef: typing.anchorRef,
      containerRef,
    }),
    [cyrus?.name, enabled, inView, typing],
  );

  return (
    <TestimonialsCollabContext.Provider value={value}>
      <div ref={containerRef} className="testimonials-collab-root">
        {children}
      </div>
    </TestimonialsCollabContext.Provider>
  );
}

export function useTestimonialsCollab() {
  const context = useContext(TestimonialsCollabContext);
  if (!context) {
    throw new Error('useTestimonialsCollab must be used within TestimonialsCollabProvider');
  }
  return context;
}

export function useTestimonialsCollabOptional() {
  return useContext(TestimonialsCollabContext);
}

export function useTestimonialsViewerActive() {
  const [active, setActive] = useState(false);

  const isInsideSection = useCallback((clientX: number, clientY: number) => {
    const section = document.getElementById('testimonials');
    if (!section) return false;

    const bounds = section.getBoundingClientRect();
    return (
      clientX >= bounds.left &&
      clientX <= bounds.right &&
      clientY >= bounds.top &&
      clientY <= bounds.bottom
    );
  }, []);

  useEffect(() => {
    const onPointerMove = (event: PointerEvent) => {
      setActive(isInsideSection(event.clientX, event.clientY));
    };

    const onPointerDown = (event: PointerEvent) => {
      setActive(isInsideSection(event.clientX, event.clientY));
    };

    document.addEventListener('pointermove', onPointerMove, { passive: true });
    document.addEventListener('pointerdown', onPointerDown, { passive: true });
    return () => {
      document.removeEventListener('pointermove', onPointerMove);
      document.removeEventListener('pointerdown', onPointerDown);
    };
  }, [isInsideSection]);

  return active;
}
