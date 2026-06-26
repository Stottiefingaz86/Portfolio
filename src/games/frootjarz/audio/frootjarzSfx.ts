/**
 * Froot Jarz sound-effect manager.
 * Uses Web Audio API — same pattern as the BJ sfx module but with its own sounds.
 */

import { publicUrl } from '@/lib/publicUrl';

const SFX_FILES = {
  spin: publicUrl('frootjarz/first-spin.wav'),
  reelEnd: publicUrl('frootjarz/reelend.mp3'),
  rowClick: publicUrl('frootjarz/row-click.wav'),
  jar: publicUrl('frootjarz/jar.wav'),
  explode: publicUrl('frootjarz/explode.wav'),
  win: publicUrl('frootjarz/win.wav'),
  win2: publicUrl('frootjarz/win.wav'),
  chipStack: publicUrl('frootjarz/win.wav'),
} as const;

export type FJSfxName = keyof typeof SFX_FILES;

let ctx: AudioContext | null = null;
const buffers = new Map<FJSfxName, AudioBuffer>();
let loaded = false;
let loading = false;
let muted = false;

function getContext(): AudioContext {
  if (!ctx) {
    ctx = new (window.AudioContext || (window as unknown as Record<string, unknown>).webkitAudioContext as typeof AudioContext)();
  }
  return ctx;
}

export function unlockFJAudio(): void {
  const ac = getContext();
  if (ac.state === 'suspended') {
    ac.resume().catch(() => {});
  }
}

export async function preloadFJSfx(): Promise<void> {
  unlockFJAudio();
  if (loaded || loading) return;
  loading = true;
  const ac = getContext();

  await Promise.all(
    (Object.entries(SFX_FILES) as [FJSfxName, string][]).map(async ([name, url]) => {
      try {
        const res = await fetch(url);
        const arrayBuf = await res.arrayBuffer();
        const audioBuf = await ac.decodeAudioData(arrayBuf);
        buffers.set(name, audioBuf);
      } catch {
        // Non-critical
      }
    }),
  );

  loaded = true;
  loading = false;
}

export function setFJSfxMuted(value: boolean): void {
  muted = value;
}

export function playFJ(name: FJSfxName, volume = 0.5): void {
  if (muted) return;
  const buf = buffers.get(name);
  if (!buf) return;

  const ac = getContext();
  if (ac.state === 'suspended') ac.resume();

  const source = ac.createBufferSource();
  source.buffer = buf;

  const gain = ac.createGain();
  gain.gain.value = volume;

  source.connect(gain);
  gain.connect(ac.destination);
  source.start(0);
}

export function playFJPitched(name: FJSfxName, rate = 1, volume = 0.5): void {
  if (muted) return;
  const buf = buffers.get(name);
  if (!buf) return;

  const ac = getContext();
  if (ac.state === 'suspended') ac.resume();

  const source = ac.createBufferSource();
  source.buffer = buf;
  source.playbackRate.value = rate;

  const gain = ac.createGain();
  gain.gain.value = volume;

  source.connect(gain);
  gain.connect(ac.destination);
  source.start(0);
}

// ── Background music ──

const BGM_URL = publicUrl('frootjarz/bgm.mp3');
let bgmBuffer: AudioBuffer | null = null;
let bgmSource: AudioBufferSourceNode | null = null;
let bgmGain: GainNode | null = null;
let bgmPlaying = false;
let bgmMuted = false;

let bgmLoadingPromise: Promise<void> | null = null;

function loadBgm(): Promise<void> {
  if (bgmBuffer) return Promise.resolve();
  if (bgmLoadingPromise) return bgmLoadingPromise;
  bgmLoadingPromise = (async () => {
    const ac = getContext();
    try {
      const res = await fetch(BGM_URL);
      const arrayBuf = await res.arrayBuffer();
      bgmBuffer = await ac.decodeAudioData(arrayBuf);
    } catch {
      // Non-critical
    }
  })();
  return bgmLoadingPromise;
}

export function preloadBgm(): void {
  loadBgm();
}

export async function startFJBgm(volume = 0.04): Promise<void> {
  if (bgmPlaying) return;

  const ac = getContext();
  if (ac.state === 'suspended') {
    try { await ac.resume(); } catch { /* ignore */ }
  }

  await loadBgm();
  if (!bgmBuffer || bgmPlaying) return;

  bgmSource = ac.createBufferSource();
  bgmSource.buffer = bgmBuffer;
  bgmSource.loop = true;

  bgmGain = ac.createGain();
  bgmGain.gain.value = bgmMuted ? 0 : volume;

  bgmSource.connect(bgmGain);
  bgmGain.connect(ac.destination);
  bgmSource.start(0);
  bgmPlaying = true;
}

export function stopFJBgm(): void {
  if (bgmSource) {
    try { bgmSource.stop(); } catch { /* already stopped */ }
    bgmSource = null;
  }
  bgmPlaying = false;
}

export function setFJBgmMuted(value: boolean): void {
  bgmMuted = value;
  if (bgmGain) {
    bgmGain.gain.value = value ? 0 : 0.04;
  }
}
