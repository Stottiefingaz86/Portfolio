'use client';

import { FormEvent, Suspense, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

import { SITE } from '@/lib/portfolio-data';

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });

      if (!response.ok) {
        const data = (await response.json().catch(() => null)) as { error?: string } | null;
        setError(data?.error ?? 'Unable to sign in.');
        return;
      }

      const nextPath = searchParams.get('from') || '/';
      router.replace(nextPath);
      router.refresh();
    } catch {
      setError('Unable to sign in.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="login-gate">
      <div className="login-gate-bg" aria-hidden>
        <div className="login-gate-orb" />
        <div className="login-gate-grid" />
      </div>

      <div className="login-gate-card">
        <p className="login-gate-kicker">Private portfolio</p>
        <h1 className="login-gate-title">{SITE.name}</h1>
        <p className="login-gate-copy">Enter the password to view this site.</p>

        <form className="login-gate-form" onSubmit={onSubmit}>
          <label className="login-gate-label" htmlFor="site-password">
            Password
          </label>
          <input
            id="site-password"
            className="login-gate-input"
            type="password"
            name="password"
            autoComplete="current-password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Enter password"
            required
          />

          {error ? <p className="login-gate-error">{error}</p> : null}

          <button className="btn btn--primary login-gate-submit" type="submit" disabled={loading}>
            {loading ? 'Checking…' : 'Enter site'}
          </button>
        </form>
      </div>
    </div>
  );
}

function LoginFallback() {
  return (
    <div className="login-gate">
      <div className="login-gate-card">
        <p className="login-gate-kicker">Private portfolio</p>
        <h1 className="login-gate-title">{SITE.name}</h1>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<LoginFallback />}>
      <LoginForm />
    </Suspense>
  );
}
