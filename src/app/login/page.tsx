'use client';

import Image from 'next/image';
import { FormEvent, Suspense, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

import { GlitchText } from '@/components/site/hud/GlitchText';
import { HeroLogoMark } from '@/components/site/hud/HeroLogoMark';
import { HudFrame } from '@/components/site/hud/HudFrame';
import { SITE } from '@/lib/portfolio-data';
import { markPreloaderForNextPage } from '@/lib/preload-assets';

function LoginBackground() {
  return (
    <div className="login-gate-bg" aria-hidden>
      <div className="login-gate-bg-image">
        <Image
          src={SITE.heroImage}
          alt=""
          fill
          priority
          className="login-gate-bg-photo"
          sizes="100vw"
        />
        <div className="login-gate-bg-fx" aria-hidden>
          <span className="hero-bg-fx__grain" />
          <span className="hero-bg-fx__scanlines" />
          <span className="hero-bg-fx__tv-pulse" />
        </div>
      </div>
      <div className="login-gate-bg-scrim" />
    </div>
  );
}

function LoginPanel({ children }: { children: React.ReactNode }) {
  return (
    <div className="login-gate-shell">
      <HudFrame label={`[ AUTH // ${SITE.portfolioYear} ]`} className="login-gate-panel">
        <div className="login-gate-logo-wrap">
          <HeroLogoMark src={SITE.siteLogo} alt={SITE.siteLogoAlt} />
        </div>

        <p className="login-gate-kicker">[ PRIVATE PORTFOLIO ]</p>
        <h1 className="login-gate-title">
          <GlitchText as="span" playOnMount intensity="elevated">
            {SITE.name}
          </GlitchText>
        </h1>
        <p className="login-gate-copy">Enter password to access this site.</p>

        {children}
      </HudFrame>
    </div>
  );
}

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
      markPreloaderForNextPage();
      router.replace(nextPath);
      router.refresh();
    } catch {
      setError('Unable to sign in.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="login-gate login-gate--hud">
      <LoginBackground />

      <LoginPanel>
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

          <div className="login-gate-actions">
            <button
              className="btn btn--primary login-gate-submit"
              type="submit"
              disabled={loading}
            >
              <GlitchText glitch={false}>{loading ? 'Checking…' : 'Enter site'}</GlitchText>
            </button>
          </div>
        </form>
      </LoginPanel>
    </div>
  );
}

function LoginFallback() {
  return (
    <div className="login-gate login-gate--hud">
      <LoginBackground />
      <LoginPanel>
        <p className="login-gate-copy">Loading access panel…</p>
      </LoginPanel>
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
