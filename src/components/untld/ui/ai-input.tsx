"use client";

import * as React from "react";
import { ArrowUp, Paperclip } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useTransform,
} from "motion/react";

export interface AIInputProps {
  value?: string;
  onChange?: (value: string) => void;
  onSubmit?: (value: string) => void;
  onFileAttach?: () => void;
  placeholder?: string;
  disabled?: boolean;
  loading?: boolean;
  maxLength?: number;
  background?: string;
  className?: string;
}

function AnimatedBorder({ children }: { children: React.ReactNode }) {
  const angle = useMotionValue(0);

  useAnimationFrame((_, delta) => {
    angle.set((angle.get() + delta * 0.1) % 360);
  });

  const conicGradient = useTransform(angle, (a) => {
    const deg = a % 360;
    return `conic-gradient(from ${deg}deg, transparent 0deg, transparent 270deg, #a855f7 290deg, #22d3ee 320deg, #f472b6 340deg, transparent 360deg)`;
  });

  return (
    <>
      <motion.div
        aria-hidden="true"
        suppressHydrationWarning
        style={{
          background: conicGradient,
          position: "absolute",
          inset: -10,
          borderRadius: 22,
          filter: "blur(16px)",
          zIndex: 0,
          pointerEvents: "none",
        }}
        className="opacity-70"
      />

      <motion.div
        suppressHydrationWarning
        style={{
          background: conicGradient,
          borderRadius: 16,
          padding: 1.5,
          position: "relative",
          zIndex: 10,
        }}
      >
        {children}
      </motion.div>
    </>
  );
}

export function AIInput({
  value: controlledValue,
  onChange,
  onSubmit,
  onFileAttach,
  placeholder = "Ask anything…",
  disabled = false,
  loading = false,
  maxLength,
  background,
  className,
}: AIInputProps) {
  const [internalValue, setInternalValue] = React.useState("");
  const isControlled = controlledValue !== undefined;
  const value = isControlled ? controlledValue : internalValue;

  const textareaRef = React.useRef<HTMLTextAreaElement>(null);

  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const resizeTextarea = React.useCallback(() => {
    const el = textareaRef.current;
    if (!el) return;

    requestAnimationFrame(() => {
      el.style.height = "auto";
      el.style.height = `${el.scrollHeight}px`;
    });
  }, []);

  React.useEffect(() => {
    resizeTextarea();
  }, [value, resizeTextarea]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const next = e.target.value;

    if (!isControlled) {
      setInternalValue(next);
    }

    onChange?.(next);
    resizeTextarea();
  };

  const handleSubmit = React.useCallback(() => {
    const trimmed = value.trim();

    if (!trimmed || disabled || loading) return;

    onSubmit?.(trimmed);

    if (!isControlled) {
      setInternalValue("");

      requestAnimationFrame(() => {
        if (textareaRef.current) {
          textareaRef.current.style.height = "auto";
        }
      });
    }
  }, [value, disabled, loading, isControlled, onSubmit]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const canSend = value.trim().length > 0 && !disabled && !loading;

  const defaultBg = background ?? undefined;

  const inner = (
    <div
      style={
        defaultBg
          ? {
              background: defaultBg,
              borderRadius: "14.5px",
            }
          : {
              borderRadius: "14.5px",
            }
      }
      className={cn(
        "flex flex-col p-1.5",
        !defaultBg &&
          "bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800"
      )}
    >
      <Textarea
        ref={textareaRef}
        value={value}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        disabled={disabled}
        maxLength={maxLength}
        rows={1}
        aria-label="AI chat input"
        aria-multiline="true"
        className={cn(
          "w-full resize-none border-0 shadow-none",
          "bg-white dark:bg-neutral-950",
          "rounded-[10px]",
          "px-3 pt-3 pb-2 min-h-0 max-h-48 overflow-y-auto",
          "text-[15px] leading-relaxed",
          "text-neutral-900 dark:text-neutral-100",
          "placeholder:text-neutral-500 dark:placeholder:text-neutral-500",
          "focus-visible:ring-0 focus-visible:ring-offset-0",
          "font-light tracking-[-0.01em]",
          "disabled:opacity-40 disabled:cursor-not-allowed"
        )}
      />

      <div className="flex items-center justify-between pt-1 pb-0">
        <Button
          type="button"
          variant="ghost"
          size="icon"
          aria-label="Attach file"
          disabled={disabled || loading}
          onClick={onFileAttach}
          className={cn(
            "h-8 w-8 rounded-full transition-colors duration-200",
            "text-neutral-500 hover:text-neutral-700 hover:bg-neutral-200",
            "dark:text-neutral-400 dark:hover:text-neutral-200 dark:hover:bg-neutral-800",
            "disabled:opacity-40 disabled:cursor-not-allowed"
          )}
        >
          <Paperclip className="h-[15px] w-[15px]" />
        </Button>

        <Button
          type="button"
          size="icon"
          aria-label={loading ? "Sending…" : "Send message"}
          disabled={!canSend}
          onClick={handleSubmit}
          className={cn(
            "h-8 w-8 rounded-full transition-all duration-200 active:scale-95",
            "bg-neutral-900 text-white hover:bg-black",
            "dark:bg-neutral-100 dark:text-black dark:hover:bg-white",
            "disabled:opacity-25 disabled:cursor-not-allowed"
          )}
        >
          {loading ? (
            <svg
              className="h-[15px] w-[15px] animate-spin"
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden="true"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v4l3-3-3-3V0a12 12 0 00-12 12h4z"
              />
            </svg>
          ) : (
            <ArrowUp className="h-[15px] w-[15px]" />
          )}
        </Button>
      </div>
    </div>
  );

  const staticBorder = (
    <div
      style={{
        borderRadius: 16,
        padding: 1.5,
        position: "relative",
        zIndex: 10,
        background:
          "conic-gradient(from 0deg, transparent 0deg, transparent 270deg, #a855f7 290deg, #22d3ee 320deg, #f472b6 340deg, transparent 360deg)",
      }}
    >
      {inner}
    </div>
  );

  return (
    <div
      className={cn(
        "relative w-full max-w-xl mx-auto px-2 sm:px-0",
        className
      )}
    >
      {mounted ? <AnimatedBorder>{inner}</AnimatedBorder> : staticBorder}
    </div>
  );
}

export default AIInput;