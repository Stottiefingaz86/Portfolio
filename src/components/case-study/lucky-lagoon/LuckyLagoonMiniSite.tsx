'use client';

import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import Image from 'next/image';
import { useCallback, useState } from 'react';

import {
  GAME_CATEGORIES,
  LAGOON_GAMES,
  LL_COLORS,
  POPULAR_GAMES,
  PROVIDERS,
  type AppScreen,
  type GameCategory,
  type MiniSiteMode,
} from '@/components/case-study/lucky-lagoon/data';
import { cn } from '@/lib/utils';

const MODES: { id: MiniSiteMode; label: string }[] = [
  { id: 'app', label: 'Product' },
  { id: 'mascot', label: 'Mascot' },
  { id: 'brand', label: 'Brand book' },
];

const NAV_ITEMS: { id: AppScreen | 'support'; label: string; icon: string }[] = [
  { id: 'games', label: 'Menu', icon: '☰' },
  { id: 'home', label: 'Casino', icon: '◆' },
  { id: 'promos', label: 'Live', icon: '▶' },
  { id: 'support', label: 'Support', icon: '?' },
];

function GameTile({ title, hue, compact }: { title: string; hue: number; compact?: boolean }) {
  return (
    <button
      type="button"
      className={cn(
        'll-game-tile shrink-0 text-left transition-transform duration-200 hover:scale-[1.03] active:scale-[0.98]',
        compact ? 'w-[72px]' : 'w-full',
      )}
      style={{
        background: `linear-gradient(145deg, oklch(0.72 0.16 ${hue}), oklch(0.52 0.18 ${hue}))`,
      }}
    >
      <span className="ll-game-tile-title">{title}</span>
    </button>
  );
}

function Toast({ message, onDone }: { message: string; onDone: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -8 }}
      onAnimationComplete={() => window.setTimeout(onDone, 2200)}
      className="ll-toast"
    >
      {message}
    </motion.div>
  );
}

function AppHeader({ onAction }: { onAction: (msg: string) => void }) {
  return (
    <header className="ll-app-header">
      <span className="ll-wordmark">Lucky Lagoon</span>
      <div className="flex gap-2">
        <button type="button" className="ll-btn-ghost" onClick={() => onAction('Welcome back, log in flow')}>
          Log in
        </button>
        <button type="button" className="ll-btn-primary" onClick={() => onAction('Join flow, 200% welcome offer applied')}>
          Join Now
        </button>
      </div>
    </header>
  );
}

function HomeScreen({ onAction }: { onAction: (msg: string) => void }) {
  return (
    <div className="ll-screen-scroll space-y-3 p-3">
      <div className="ll-hero-card ll-hero-pink">
        <div className="relative z-10 max-w-[70%]">
          <p className="ll-kicker">Welcome</p>
          <p className="ll-offer">200% up to $5,000 + 50 free spins</p>
          <button type="button" className="ll-btn-primary mt-3" onClick={() => onAction('Welcome offer claimed')}>
            Join Now
          </button>
        </div>
        <div className="ll-parrot-wrap" aria-hidden>
          <Image
            src="/case-studies/lucky-lagoon-mascot.png"
            alt=""
            width={200}
            height={200}
            className="ll-parrot-crop"
          />
        </div>
      </div>

      <div className="ll-deposit-card">
        <p className="ll-section-title text-white">Easy & safe deposits</p>
        <div className="mt-2 flex gap-2">
          {['Visa', 'MC', 'BTC'].map((method) => (
            <span key={method} className="ll-pay-pill">
              {method}
            </span>
          ))}
        </div>
        <button type="button" className="ll-btn-success mt-3" onClick={() => onAction('Deposit flow opened')}>
          Deposit Now
        </button>
      </div>

      <div>
        <div className="mb-2 flex items-center justify-between px-1">
          <p className="ll-section-title text-[var(--ll-ink)]">Popular games</p>
          <button type="button" className="ll-link" onClick={() => onAction('View all games')}>
            View all
          </button>
        </div>
        <div className="flex gap-2 overflow-x-auto pb-1">
          {POPULAR_GAMES.map((game) => (
            <GameTile key={game.id} title={game.title} hue={game.hue} compact />
          ))}
        </div>
      </div>
    </div>
  );
}

function PromosScreen({ onAction }: { onAction: (msg: string) => void }) {
  return (
    <div className="ll-screen-scroll space-y-3 p-3">
      <div className="ll-hero-card ll-hero-mint">
        <p className="ll-kicker text-[var(--ll-ink)]">Why play at Lucky Lagoon?</p>
        <p className="ll-body mt-2 text-[var(--ll-ink)]">
          We are an undisputed king of chill. Everything else is busy compared to us.
        </p>
        <div className="ll-parrot-wrap ll-parrot-wrap-sm" aria-hidden>
          <Image
            src="/case-studies/lucky-lagoon-mascot.png"
            alt=""
            width={160}
            height={160}
            className="ll-parrot-crop"
          />
        </div>
      </div>

      {[1, 2, 3].map((item) => (
        <button
          key={item}
          type="button"
          className="ll-promo-card w-full text-left"
          onClick={() => onAction('Weekly 10% cashback activated')}
        >
          <p className="ll-promo-title">Weekly 10% cashback</p>
          <p className="ll-body mt-1 text-[var(--ll-muted)]">Receive the waves of fortune faster.</p>
        </button>
      ))}
    </div>
  );
}

function GamesScreen({
  category,
  onCategory,
  onAction,
}: {
  category: GameCategory;
  onCategory: (cat: GameCategory) => void;
  onAction: (msg: string) => void;
}) {
  const filtered =
    category === 'Discover'
      ? LAGOON_GAMES
      : LAGOON_GAMES.filter((game) => game.category === category);

  return (
    <div className="ll-screen-scroll space-y-3 p-3">
      <div className="ll-search">
        <span aria-hidden>⌕</span>
        <input type="search" placeholder="Search games…" aria-label="Search games" />
      </div>

      <div className="flex gap-2 overflow-x-auto pb-1">
        {GAME_CATEGORIES.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => onCategory(cat)}
            className={cn('ll-category-pill', category === cat && 'is-active')}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="ll-provider-bar">
        {PROVIDERS.map((provider) => (
          <span key={provider}>{provider}</span>
        ))}
      </div>

      <div>
        <div className="mb-2 flex items-center justify-between px-1">
          <p className="ll-section-title text-[var(--ll-ink)]">
            {category === 'Discover' ? 'Featured' : category}
          </p>
          <button type="button" className="ll-link" onClick={() => onAction(`View all ${category}`)}>
            View all
          </button>
        </div>
        <div className="grid grid-cols-3 gap-2">
          {filtered.map((game) => (
            <GameTile key={game.id} title={game.title} hue={game.hue} />
          ))}
        </div>
      </div>
    </div>
  );
}

function PhoneApp({ onAction }: { onAction: (msg: string) => void }) {
  const reduced = useReducedMotion();
  const [screen, setScreen] = useState<AppScreen>('home');
  const [category, setCategory] = useState<GameCategory>('Discover');

  const navTo = (id: AppScreen | 'support') => {
    if (id === 'support') {
      onAction('Support chat opened');
      return;
    }
    if (id === 'home') setScreen('home');
    if (id === 'promos') setScreen('promos');
    if (id === 'games') setScreen('games');
  };

  return (
    <div className="ll-phone">
      <div className="ll-phone-notch" aria-hidden />
      <AppHeader onAction={onAction} />
      <div className="ll-phone-body">
        <AnimatePresence mode="wait">
          <motion.div
            key={screen}
            initial={reduced ? false : { opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            exit={reduced ? undefined : { opacity: 0, x: -16 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="h-full"
          >
            {screen === 'home' ? <HomeScreen onAction={onAction} /> : null}
            {screen === 'promos' ? <PromosScreen onAction={onAction} /> : null}
            {screen === 'games' ? (
              <GamesScreen category={category} onCategory={setCategory} onAction={onAction} />
            ) : null}
          </motion.div>
        </AnimatePresence>
      </div>
      <nav className="ll-bottom-nav" aria-label="App navigation">
        {NAV_ITEMS.map((item) => {
          const active =
            (item.id === 'home' && screen === 'home') ||
            (item.id === 'promos' && screen === 'promos') ||
            (item.id === 'games' && screen === 'games');

          return (
            <button
              key={item.id}
              type="button"
              aria-current={active ? 'page' : undefined}
              onClick={() => navTo(item.id)}
              className={cn('ll-nav-item', active && 'is-active')}
            >
              <span aria-hidden>{item.icon}</span>
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>
    </div>
  );
}

function MascotView({ onAction }: { onAction: (msg: string) => void }) {
  const reduced = useReducedMotion();
  const [wiggle, setWiggle] = useState(false);

  return (
    <div className="ll-mascot-view">
      <div className="ll-mascot-copy">
        <p className="ll-display">Meet Lucky, our mascot</p>
        <p className="ll-body mt-4 text-white/90">
          Lucky is the heart and soul of Lucky Lagoon, the friendly, playful ambassador of the
          brand. With bright turquoise feathers and energetic charm, he embodies relaxation, fun and
          big rewards.
        </p>
        <p className="ll-body mt-3 font-semibold text-white">
          Wherever Lucky goes, adventure, excitement and paradise follow.
        </p>
        <button
          type="button"
          className="ll-btn-download mt-6"
          onClick={() => onAction('Lucky asset pack downloaded')}
        >
          Download Lucky
        </button>
      </div>
      <motion.button
        type="button"
        aria-label="Animate Lucky"
        className="ll-mascot-figure"
        onClick={() => {
          setWiggle(true);
          onAction('Lucky says: Welcome to paradise!');
          window.setTimeout(() => setWiggle(false), 600);
        }}
        animate={wiggle && !reduced ? { rotate: [0, -4, 4, -2, 0], scale: [1, 1.04, 1] } : {}}
        transition={{ duration: 0.5 }}
        whileHover={reduced ? undefined : { scale: 1.02 }}
      >
        <Image
          src="/case-studies/lucky-lagoon-mascot.png"
          alt="Lucky the parrot mascot"
          width={480}
          height={360}
          className="h-auto w-full max-w-[420px] object-contain object-bottom"
          priority
        />
      </motion.button>
    </div>
  );
}

function BrandView({ onAction }: { onAction: (msg: string) => void }) {
  const [copied, setCopied] = useState<string | null>(null);

  const copyColor = useCallback(
    async (hex: string) => {
      try {
        await navigator.clipboard.writeText(hex);
        setCopied(hex);
        onAction(`${hex} copied to clipboard`);
        window.setTimeout(() => setCopied(null), 1500);
      } catch {
        onAction(hex);
      }
    },
    [onAction],
  );

  return (
    <div className="ll-brand-view">
      <p className="ll-display text-white">Brand system</p>
      <p className="ll-body mt-3 max-w-md text-white/75">
        Purpose, values, tone of voice and visual identity. Click a swatch to copy its token.
      </p>

      <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {LL_COLORS.map((color) => (
          <button
            key={color.hex}
            type="button"
            className="ll-color-card"
            onClick={() => copyColor(color.hex)}
          >
            <span className="ll-color-swatch" style={{ background: color.hex }} />
            <span className="text-left">
              <span className="block text-sm font-semibold text-white">{color.name}</span>
              <span className="block font-mono text-xs text-white/60">{color.hex}</span>
              <span className="block text-xs text-white/45">{color.role}</span>
            </span>
            {copied === color.hex ? <span className="ll-copied">Copied</span> : null}
          </button>
        ))}
      </div>

      <div className="mt-10 grid gap-6 lg:grid-cols-2">
        <div className="ll-brand-panel">
          <p className="ll-kicker text-white/50">Typography</p>
          <p className="ll-wordmark mt-3 scale-90 origin-left">Lucky Lagoon</p>
          <p className="ll-display mt-4 text-2xl">Every spin is an adventure</p>
          <p className="ll-body mt-3 text-white/70">
            Bold rounded display for heroes. Clean sans for product UI and body copy.
          </p>
        </div>
        <div className="ll-brand-panel">
          <p className="ll-kicker text-white/50">Tone of voice</p>
          <ul className="mt-4 space-y-2 text-sm text-white/80">
            <li>Playful, not childish</li>
            <li>Tropical escape, not generic casino</li>
            <li>Welcoming ambassador energy via Lucky</li>
            <li>Clear CTAs with confident offers</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export function LuckyLagoonMiniSite({ compact }: { compact?: boolean }) {
  const reduced = useReducedMotion();
  const [mode, setMode] = useState<MiniSiteMode>('app');
  const [toast, setToast] = useState<string | null>(null);

  const showToast = useCallback((message: string) => {
    setToast(message);
  }, []);

  return (
    <div className={cn('lucky-lagoon-mini', compact && 'lucky-lagoon-mini--compact')}>
      <div className="ll-wave-bg" aria-hidden />

      <div className="relative z-10 flex h-full flex-col">
        <div className="ll-mode-bar">
          <p className="ll-mode-label">Explore the brand</p>
          <div className="ll-mode-tabs" role="tablist" aria-label="Lucky Lagoon views">
            {MODES.map((item) => (
              <button
                key={item.id}
                type="button"
                role="tab"
                aria-selected={mode === item.id}
                onClick={() => setMode(item.id)}
                className={cn('ll-mode-tab', mode === item.id && 'is-active')}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        <div className="ll-stage flex-1">
          <AnimatePresence mode="wait">
            <motion.div
              key={mode}
              initial={reduced ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduced ? undefined : { opacity: 0, y: -8 }}
              transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
              className="h-full w-full"
            >
              {mode === 'app' ? <PhoneApp onAction={showToast} /> : null}
              {mode === 'mascot' ? <MascotView onAction={showToast} /> : null}
              {mode === 'brand' ? <BrandView onAction={showToast} /> : null}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <AnimatePresence>{toast ? <Toast message={toast} onDone={() => setToast(null)} /> : null}</AnimatePresence>
    </div>
  );
}

export function LuckyLagoonWorkPreview() {
  return (
    <div className="ll-work-preview">
      <div className="ll-work-preview-bg" />
      <p className="ll-work-preview-logo">Lucky Lagoon</p>
      <p className="ll-work-preview-hint">Interactive →</p>
    </div>
  );
}
