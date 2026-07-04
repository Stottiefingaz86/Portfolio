export const SITE_SOUNDS = {
  menu: '/sound/menu.mp3',
  firstTime: '/sound/firsttime.mp3',
  hoverHighlight: '/sound/hover-highlight.wav',
  caseStudyHover: '/sound/case-study-hover.wav',
  popupOpen: '/sound/popup-open.mp3',
  bgMusic: '/sound/bgsound.mp3',
} as const;

export type SiteSoundKey = keyof typeof SITE_SOUNDS;

const INTRO_STORAGE_KEY = 'ch-portfolio-intro-sound-v3';
const MUTE_STORAGE_KEY = 'ch-portfolio-sound-muted-v1';
const BG_VOLUME = 0.08;
const INTRO_VOLUME = 0.52;
const HIGHLIGHT_VOLUME = 0.045;
const CASE_STUDY_HOVER_VOLUME = 0.065;
const CASE_STUDY_HOVER_COOLDOWN_MS = 200;

const audioCache = new Map<SiteSoundKey, HTMLAudioElement>();
let introPending = false;
let audioUnlocked = false;
let lastCaseStudyHoverAt = 0;
let soundMuted = false;
const muteListeners = new Set<(muted: boolean) => void>();

function canPlaySound() {
  return typeof window !== 'undefined';
}

function shouldPlaySound() {
  return canPlaySound() && !soundMuted;
}

function emitMuteChange() {
  muteListeners.forEach((listener) => listener(soundMuted));
}

function readStoredMute() {
  if (!canPlaySound()) return false;
  return localStorage.getItem(MUTE_STORAGE_KEY) === '1';
}

export function isSiteSoundMuted() {
  return soundMuted;
}

export function initSiteSoundMute() {
  if (!canPlaySound()) return;
  soundMuted = readStoredMute();
  if (soundMuted) stopBackgroundMusic();
  emitMuteChange();
}

export function setSiteSoundMuted(muted: boolean) {
  if (!canPlaySound()) return;
  soundMuted = muted;
  localStorage.setItem(MUTE_STORAGE_KEY, muted ? '1' : '0');
  if (muted) {
    stopBackgroundMusic();
  } else if (audioUnlocked) {
    startBackgroundMusic();
  }
  emitMuteChange();
}

export function toggleSiteSoundMuted() {
  setSiteSoundMuted(!soundMuted);
  return soundMuted;
}

export function subscribeSiteSoundMute(listener: (muted: boolean) => void) {
  muteListeners.add(listener);
  listener(soundMuted);
  return () => {
    muteListeners.delete(listener);
  };
}

function markAudioUnlocked() {
  audioUnlocked = true;
}

export function isSiteAudioUnlocked() {
  return audioUnlocked;
}

function getCachedAudio(key: SiteSoundKey) {
  let audio = audioCache.get(key);
  if (!audio) {
    audio = new Audio(SITE_SOUNDS[key]);
    audio.preload = 'auto';
    audioCache.set(key, audio);
  }
  return audio;
}

/** Call synchronously inside pointer / key handlers to satisfy autoplay policy. */
export function unlockSiteAudioSync() {
  if (!canPlaySound() || audioUnlocked) return;
  markAudioUnlocked();
}

export function hasPlayedIntroSound() {
  if (typeof window === 'undefined') return true;
  return sessionStorage.getItem(INTRO_STORAGE_KEY) === '1';
}

export function markIntroSoundPlayed() {
  if (typeof window === 'undefined') return;
  sessionStorage.setItem(INTRO_STORAGE_KEY, '1');
}

export function playIntroSound() {
  if (!shouldPlaySound() || hasPlayedIntroSound() || introPending) return false;

  introPending = true;
  const audio = getCachedAudio('firstTime');
  audio.volume = INTRO_VOLUME;
  audio.currentTime = 0;

  void audio
    .play()
    .then(() => {
      markAudioUnlocked();
      markIntroSoundPlayed();
      introPending = false;
    })
    .catch(() => {
      introPending = false;
    });

  return true;
}

export function playHighlightSound() {
  if (!shouldPlaySound()) return false;

  const audio = getCachedAudio('hoverHighlight');
  audio.volume = HIGHLIGHT_VOLUME;
  audio.currentTime = 0;

  void audio
    .play()
    .then(() => {
      markAudioUnlocked();
    })
    .catch(() => {});

  return true;
}

export function playCaseStudyHoverSound() {
  if (!shouldPlaySound()) return false;

  const now = Date.now();
  if (now - lastCaseStudyHoverAt < CASE_STUDY_HOVER_COOLDOWN_MS) return false;
  lastCaseStudyHoverAt = now;

  const audio = getCachedAudio('caseStudyHover');
  audio.volume = CASE_STUDY_HOVER_VOLUME;
  audio.currentTime = 0;

  void audio
    .play()
    .then(() => {
      markAudioUnlocked();
    })
    .catch(() => {});

  return true;
}

export function startBackgroundMusic() {
  if (!shouldPlaySound()) return false;

  const audio = getCachedAudio('bgMusic');
  audio.loop = true;
  audio.volume = BG_VOLUME;

  if (!audio.paused) return true;

  void audio
    .play()
    .then(() => {
      markAudioUnlocked();
    })
    .catch(() => {});

  return true;
}

/** First visit: intro SFX once + background loop. */
export function triggerSiteAmbience() {
  if (!shouldPlaySound()) return;

  if (!hasPlayedIntroSound()) {
    playIntroSound();
  }

  startBackgroundMusic();
}

/** Hover or scroll highlight: replayable tick + ensure ambience started. */
export function triggerHighlightFeedback() {
  if (!shouldPlaySound()) return;

  playHighlightSound();
  triggerSiteAmbience();
}

export function playSiteSound(key: SiteSoundKey, volume = 0.55) {
  if (!shouldPlaySound()) return;

  unlockSiteAudioSync();
  const audio = getCachedAudio(key);
  audio.volume = volume;
  audio.currentTime = 0;

  void audio
    .play()
    .then(() => {
      markAudioUnlocked();
    })
    .catch(() => {});
}

export const INTERACTIVE_SOUND_SELECTOR = [
  'a',
  'button',
  '.menu-trigger',
  '.work-hover-surface',
  '.phases-rail-item',
  '.expertise-row',
  '.expertise-row-surface',
  '.leadership-truth',
  '.principle-panel',
  '.phase-block',
  '.phase-panel',
  '.hero-scroll--hud',
  '.contact-link',
  '[data-scroll-intent="true"]',
].join(', ');

export function stopBackgroundMusic() {
  const audio = audioCache.get('bgMusic');
  if (!audio) return;
  audio.pause();
  audio.currentTime = 0;
}

export function primeSiteSounds() {
  if (!canPlaySound()) return;
  (Object.keys(SITE_SOUNDS) as SiteSoundKey[]).forEach((key) => {
    getCachedAudio(key).load();
  });
}
