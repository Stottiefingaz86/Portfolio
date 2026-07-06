'use client';

import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { MessageCircle, SendHorizontal, Sparkles, X } from 'lucide-react';
import Image from 'next/image';
import { useCallback, useEffect, useRef, useState } from 'react';

import {
  CHRIS_AGENT_GREETING,
  CHRIS_AGENT_STARTER_PROMPTS,
} from '@/lib/chris-agent-knowledge';
import { ABOUT } from '@/lib/portfolio-data';
import { cn } from '@/lib/utils';

type AgentMessage = {
  id: string;
  role: 'user' | 'assistant';
  content: string;
};

const EASE = [0.16, 1, 0.3, 1] as const;

function createId() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

export function ChrisAgentWidget() {
  const reduced = useReducedMotion();
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<AgentMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasGreeted, setHasGreeted] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const scrollToBottom = useCallback(() => {
    const node = scrollRef.current;
    if (!node) return;
    node.scrollTop = node.scrollHeight;
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading, scrollToBottom]);

  useEffect(() => {
    if (!open || hasGreeted) return;

    setMessages([
      {
        id: createId(),
        role: 'assistant',
        content: CHRIS_AGENT_GREETING,
      },
    ]);
    setHasGreeted(true);
  }, [open, hasGreeted]);

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.dataset.chrisAgentOpen = 'true';

    return () => {
      document.body.removeAttribute('data-chris-agent-open');
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  const sendMessage = useCallback(
    async (rawText: string) => {
      const text = rawText.trim();
      if (!text || isLoading) return;

      setError(null);
      setInput('');

      const userMessage: AgentMessage = {
        id: createId(),
        role: 'user',
        content: text,
      };

      const assistantId = createId();
      const nextMessages = [...messages, userMessage];

      setMessages([
        ...nextMessages,
        { id: assistantId, role: 'assistant', content: '' },
      ]);
      setIsLoading(true);

      try {
        const response = await fetch('/api/chris-agent', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            messages: nextMessages.map(({ role, content }) => ({ role, content })),
          }),
        });

        if (!response.ok) {
          const payload = (await response.json().catch(() => null)) as { error?: string } | null;
          throw new Error(payload?.error ?? 'Chris Agent could not respond right now.');
        }

        if (!response.body) {
          throw new Error('Chris Agent returned an empty response.');
        }

        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        let assistantText = '';

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          assistantText += decoder.decode(value, { stream: true });
          setMessages((current) =>
            current.map((message) =>
              message.id === assistantId
                ? { ...message, content: assistantText }
                : message,
            ),
          );
        }
      } catch (caught) {
        const message =
          caught instanceof Error ? caught.message : 'Something went wrong. Try again.';
        setError(message);
        setMessages((current) => current.filter((item) => item.id !== assistantId));
      } finally {
        setIsLoading(false);
        requestAnimationFrame(() => inputRef.current?.focus());
      }
    },
    [isLoading, messages],
  );

  const onSubmit = useCallback(
    (event: React.FormEvent) => {
      event.preventDefault();
      void sendMessage(input);
    },
    [input, sendMessage],
  );

  const onKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      void sendMessage(input);
    }
  };

  return (
    <div className="chris-agent" data-open={open ? 'true' : 'false'}>
      <AnimatePresence>
        {open ? (
          <motion.div
            className="chris-agent__panel"
            initial={reduced ? false : { opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduced ? undefined : { opacity: 0, y: 12, scale: 0.98 }}
            transition={{ duration: 0.28, ease: EASE }}
            role="dialog"
            aria-label="Chris Agent"
          >
            <header className="chris-agent__header">
              <div className="chris-agent__identity">
                <div className="chris-agent__avatar-wrap">
                  <Image
                    src={ABOUT.portrait}
                    alt=""
                    width={36}
                    height={36}
                    className="chris-agent__avatar"
                  />
                  <span className="chris-agent__live-dot" aria-hidden />
                </div>
                <div>
                  <p className="chris-agent__title">Chris Agent</p>
                  <p className="chris-agent__subtitle">Ask me anything · Live knowledge</p>
                </div>
              </div>
              <button
                type="button"
                className="chris-agent__icon-btn"
                aria-label="Close Chris Agent"
                onClick={() => setOpen(false)}
              >
                <X aria-hidden />
              </button>
            </header>

            <div ref={scrollRef} className="chris-agent__messages" aria-live="polite">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={cn(
                    'chris-agent__message',
                    message.role === 'user' && 'chris-agent__message--user',
                  )}
                >
                  {message.role === 'assistant' ? (
                    <span className="chris-agent__message-label">Chris Agent</span>
                  ) : null}
                  <p>{message.content || (isLoading ? '…' : '')}</p>
                </div>
              ))}

              {!messages.some((message) => message.role === 'user') ? (
                <div className="chris-agent__starters">
                  {CHRIS_AGENT_STARTER_PROMPTS.map((prompt) => (
                    <button
                      key={prompt}
                      type="button"
                      className="chris-agent__starter"
                      onClick={() => void sendMessage(prompt)}
                      disabled={isLoading}
                    >
                      {prompt}
                    </button>
                  ))}
                </div>
              ) : null}

              {error ? <p className="chris-agent__error">{error}</p> : null}
            </div>

            <form className="chris-agent__composer" onSubmit={onSubmit}>
              <label className="sr-only" htmlFor="chris-agent-input">
                Ask Chris Agent an interview question
              </label>
              <textarea
                ref={inputRef}
                id="chris-agent-input"
                value={input}
                onChange={(event) => setInput(event.target.value)}
                onKeyDown={onKeyDown}
                placeholder="Ask an interview question…"
                rows={1}
                disabled={isLoading}
                className="chris-agent__input"
              />
              <button
                type="submit"
                className="chris-agent__send"
                disabled={isLoading || !input.trim()}
                aria-label="Send message"
              >
                <SendHorizontal aria-hidden />
              </button>
            </form>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <motion.button
        type="button"
        className="chris-agent__launcher"
        onClick={() => setOpen((current) => !current)}
        aria-expanded={open}
        aria-label={open ? 'Close Chris Agent' : 'Ask Chris Agent'}
        whileTap={reduced ? undefined : { scale: 0.96 }}
      >
        <span className="chris-agent__launcher-avatar">
          <Image
            src={ABOUT.portrait}
            alt=""
            width={28}
            height={28}
            className="chris-agent__avatar"
          />
        </span>
        <span className="chris-agent__launcher-copy">
          <Sparkles aria-hidden className="chris-agent__launcher-icon" />
          <span>Ask Chris Agent</span>
        </span>
        {!open ? <span className="chris-agent__launcher-pulse" aria-hidden /> : null}
        {open ? <MessageCircle aria-hidden className="chris-agent__launcher-open-icon" /> : null}
      </motion.button>
    </div>
  );
}
