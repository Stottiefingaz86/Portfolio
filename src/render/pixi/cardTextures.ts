/**
 * Loads suit SVGs from `/public/cards/suits/*.svg`.
 * Replace those files with your studio artwork — same filenames & viewBox 0 0 64 64 recommended.
 */
import { Assets, Texture } from 'pixi.js';

import type { Suit } from '@/game/domain/card';

import { chipTexturePixelRatio, suitTexturePixelRatio, tablePixelRatio } from './renderQuality';

function tuneRasterTexture(tex: Texture): void {
  tex.source.autoGenerateMipmaps = true;
  tex.source.style.scaleMode = 'linear';
  tex.source.antialias = true;
}

/** Suits: higher raster res, no mipmaps (mip blur when scaled up on cards). */
function tuneSuitTexture(tex: Texture): void {
  tex.source.autoGenerateMipmaps = false;
  tex.source.style.scaleMode = 'linear';
  tex.source.antialias = true;
}

async function loadSvgTexture(url: string, resolution: number): Promise<Texture> {
  const tex = await Assets.load<Texture>({
    alias: `${url}@r${resolution}`,
    src: url,
    data: { resolution },
  });
  tuneRasterTexture(tex);
  return tex;
}

async function loadSuitSvgTexture(url: string): Promise<Texture> {
  const res = suitTexturePixelRatio();
  const tex = await Assets.load<Texture>({
    alias: `${url}@suit${res}`,
    src: url,
    data: { resolution: res },
  });
  tuneSuitTexture(tex);
  return tex;
}

import { publicUrl } from '@/lib/publicUrl';

const BASE = publicUrl('');

const SUIT_URLS: Record<Suit, string> = {
  spades: `${BASE}cards/suits/spades.svg`,
  hearts: `${BASE}cards/suits/hearts.svg`,
  diamonds: `${BASE}cards/suits/diamonds.svg`,
  clubs: `${BASE}cards/suits/clubs.svg`,
};

let cache: Record<Suit, Texture> | null = null;
let inflight: Promise<Record<Suit, Texture>> | null = null;

export async function loadSuitTextures(): Promise<Record<Suit, Texture>> {
  if (cache) return cache;
  if (inflight) return inflight;

  inflight = (async () => {
    const suits = Object.keys(SUIT_URLS) as Suit[];
    const loaded = await Promise.all(
      suits.map(async (suit) => {
        const url = SUIT_URLS[suit];
        const texture = await loadSuitSvgTexture(url);
        return [suit, texture] as const;
      }),
    );
    cache = Object.fromEntries(loaded) as Record<Suit, Texture>;
    return cache;
  })();

  try {
    return await inflight;
  } finally {
    inflight = null;
  }
}

let cardBackCache: Texture | null | undefined;

/** Portrait photo for hero blackjack card backs (`public/cards/card-back.png`). */
export async function loadCardBackTexture(): Promise<Texture | null> {
  if (cardBackCache !== undefined) return cardBackCache;
  try {
    const url = `${BASE}cards/card-back.png`;
    const tex = await Assets.load<Texture>({
      alias: `${url}@back${tablePixelRatio()}`,
      src: url,
      data: { resolution: tablePixelRatio() },
    });
    tuneRasterTexture(tex);
    cardBackCache = tex;
    return cardBackCache;
  } catch {
    cardBackCache = null;
    return null;
  }
}

let dealerIconCache: Texture | null | undefined;

export async function loadDealerIconTexture(): Promise<Texture | null> {
  if (dealerIconCache !== undefined) return dealerIconCache;
  try {
    const url = `${BASE}dealer_icon.svg`;
    const ratio = Math.min(4, Math.max(2, Math.ceil((window.devicePixelRatio || 1) * 2)));
    dealerIconCache = await loadSvgTexture(url, ratio);
    return dealerIconCache;
  } catch {
    dealerIconCache = null;
    return null;
  }
}

const CHIP_URLS = [1, 2, 3, 4, 5].map((n) => `${BASE}cards/chips/${n}.svg`);

let chipCache: (Texture | null)[] | null = null;
let chipInflight: Promise<(Texture | null)[]> | null = null;

/** One texture per `TABLE_CHIP_DENOMS` row (1, 5, 25, 100, 500). */
export async function loadChipTextures(): Promise<(Texture | null)[]> {
  if (chipCache) return chipCache;
  if (chipInflight) return chipInflight;

  chipInflight = (async () => {
    const loaded = await Promise.all(
      CHIP_URLS.map(async (url) => {
        try {
          return await loadSvgTexture(url, chipTexturePixelRatio());
        } catch {
          return null;
        }
      }),
    );
    chipCache = loaded;
    return loaded;
  })();

  try {
    return await chipInflight;
  } finally {
    chipInflight = null;
  }
}

/** For tests / hot reload */
export function clearSuitTextureCache(): void {
  cache = null;
  cardBackCache = undefined;
  chipCache = null;
}
