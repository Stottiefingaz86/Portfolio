'use client';

import { useCallback, useState } from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';

type FormState = 'idle' | 'submitting' | 'success' | 'error';

export function ContactForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [company, setCompany] = useState('');
  const [state, setState] = useState<FormState>('idle');
  const [feedback, setFeedback] = useState<string | null>(null);

  const onSubmit = useCallback(
    async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      if (state === 'submitting') return;

      setState('submitting');
      setFeedback(null);

      try {
        const response = await fetch('/api/contact', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name, email, message, company }),
        });

        const payload = (await response.json().catch(() => null)) as { error?: string } | null;

        if (!response.ok) {
          throw new Error(payload?.error ?? 'Something went wrong. Please try again.');
        }

        setName('');
        setEmail('');
        setMessage('');
        setState('success');
        setFeedback('Message sent — I will get back to you soon.');
      } catch (caught) {
        setState('error');
        setFeedback(
          caught instanceof Error ? caught.message : 'Something went wrong. Please try again.',
        );
      }
    },
    [company, email, message, name, state],
  );

  return (
    <form className="contact-form" onSubmit={onSubmit} noValidate>
      <div className="contact-form__grid">
        <label className="contact-form__field">
          <span className="contact-form__label">Name</span>
          <Input
            className="contact-form__input"
            name="name"
            type="text"
            autoComplete="name"
            required
            maxLength={120}
            value={name}
            onChange={(event) => setName(event.target.value)}
            disabled={state === 'submitting'}
          />
        </label>

        <label className="contact-form__field">
          <span className="contact-form__label">Email</span>
          <Input
            className="contact-form__input"
            name="email"
            type="email"
            autoComplete="email"
            inputMode="email"
            required
            maxLength={254}
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            disabled={state === 'submitting'}
          />
        </label>

        <label className={cn('contact-form__field', 'contact-form__field--full')}>
          <span className="contact-form__label">Message</span>
          <Textarea
            className="contact-form__textarea"
            name="message"
            required
            minLength={10}
            maxLength={5000}
            rows={5}
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            disabled={state === 'submitting'}
          />
        </label>
      </div>

      <input
        className="contact-form__honeypot"
        type="text"
        name="company"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden
        value={company}
        onChange={(event) => setCompany(event.target.value)}
      />

      <div className="contact-form__actions">
        <Button
          type="submit"
          variant="outline"
          className="contact-form__submit"
          disabled={state === 'submitting'}
        >
          {state === 'submitting' ? 'Sending…' : 'Send message'}
        </Button>

        {feedback ? (
          <p
            className={cn(
              'contact-form__feedback',
              state === 'success' && 'is-success',
              state === 'error' && 'is-error',
            )}
            role="status"
            aria-live="polite"
          >
            {feedback}
          </p>
        ) : null}
      </div>
    </form>
  );
}
