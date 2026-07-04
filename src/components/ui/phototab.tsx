'use client';

import {
  Content as TabsContent,
  List as TabsList,
  Root as TabsRoot,
  Trigger as TabsTrigger,
} from '@radix-ui/react-tabs';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { useLayoutEffect, useRef, useState } from 'react';

import { cn } from '@/lib/utils';

export interface PhototabTab {
  icon: React.ReactNode;
  image: string;
  name: string;
}

export interface PhototabProps {
  className?: string;
  defaultTab?: string;
  height?: number;
  imageClassName?: string;
  tabListClassName?: string;
  tabs: PhototabTab[];
  tabTriggerClassName?: string;
}

export function Phototab({
  tabs,
  defaultTab,
  height = 400,
  className = '',
  tabListClassName = '',
  tabTriggerClassName = '',
  imageClassName = '',
}: PhototabProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [bgStyle, setBgStyle] = useState<{
    left: number;
    top: number;
    width: number;
    height: number;
  } | null>(null);
  const triggersRef = useRef<(HTMLButtonElement | null)[]>([]);
  const listRef = useRef<HTMLDivElement | null>(null);
  const shouldReduceMotion = useReducedMotion();

  useLayoutEffect(() => {
    if (
      hoveredIndex !== null &&
      triggersRef.current[hoveredIndex] &&
      listRef.current
    ) {
      const trigger = triggersRef.current[hoveredIndex];
      if (!trigger) {
        return;
      }
      const listRect = listRef.current.getBoundingClientRect();
      const triggerRect = trigger.getBoundingClientRect();
      setBgStyle({
        left: triggerRect.left - listRect.left,
        top: triggerRect.top - listRect.top,
        width: triggerRect.width,
        height: triggerRect.height,
      });
    } else {
      setBgStyle(null);
    }
  }, [hoveredIndex]);

  if (tabs.length === 0) {
    return null;
  }

  return (
    <TabsRoot
      className={cn(
        'group/phototab relative aspect-square w-full overflow-hidden',
        className,
      )}
      defaultValue={defaultTab || tabs[0]?.name || ''}
      orientation="horizontal"
      style={{ height: `${height}px` }}
    >
      <TabsList
        aria-label="Phototab tabs"
        className={cn(
          'absolute right-0 bottom-2 left-0 z-10 mx-auto flex w-fit min-w-28 max-w-[calc(100%-1rem)] -translate-y-2 flex-row items-center justify-between gap-0.5 rounded-full bg-primary/40 px-2 py-1.5 text-sm font-medium ring ring-border/70 backdrop-blur-sm transition hover:text-foreground md:translate-y-6 md:group-hover/phototab:translate-y-0',
          tabListClassName,
        )}
        ref={listRef}
        style={{ pointerEvents: 'auto' }}
      >
        <AnimatePresence>
          {bgStyle ? (
            <motion.span
              animate={{
                opacity: 1,
                left: bgStyle.left,
                top: bgStyle.top,
                width: bgStyle.width,
                height: bgStyle.height,
              }}
              className="absolute z-0 rounded-full bg-primary transition-colors"
              exit={{ opacity: 0 }}
              initial={{ opacity: 0 }}
              layoutId="hoverBackground"
              style={{ position: 'absolute' }}
              transition={
                shouldReduceMotion
                  ? { duration: 0 }
                  : {
                      type: 'spring' as const,
                      stiffness: 400,
                      damping: 40,
                      duration: 0.25,
                    }
              }
            />
          ) : null}
        </AnimatePresence>
        {tabs.map((tab, index) => (
          <TabsTrigger
            aria-label={tab.name}
            className={cn(
              "relative z-10 cursor-pointer rounded-full p-1.5 data-[state='active']:bg-background",
              tabTriggerClassName,
            )}
            key={tab.name}
            onMouseEnter={() => {
              setHoveredIndex(index);
            }}
            onMouseLeave={() => {
              setHoveredIndex(null);
            }}
            ref={(el) => {
              triggersRef.current[index] = el;
            }}
            value={tab.name}
          >
            <span className="relative z-10 rounded-full focus:outline-none">
              {tab.icon}
              <span className="sr-only">{tab.name}</span>
            </span>
          </TabsTrigger>
        ))}
      </TabsList>
      {tabs.map((tab) => (
        <TabsContent className="h-full w-full" key={tab.name} value={tab.name}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            alt={tab.name}
            className={cn(
              'h-full w-full rounded-none bg-primary object-cover',
              imageClassName,
            )}
            height={height}
            loading="lazy"
            src={tab.image}
            width={400}
          />
        </TabsContent>
      ))}
    </TabsRoot>
  );
}

export default Phototab;
