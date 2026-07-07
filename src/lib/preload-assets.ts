import { ABOUT, SITE } from '@/lib/portfolio-data';

export const PRELOADER_SESSION_KEY = 'portfolio-show-preloader';

export function markPreloaderForNextPage() {
  if (typeof window === 'undefined') return;
  sessionStorage.setItem(PRELOADER_SESSION_KEY, '1');
}

export function consumePreloaderSession(): boolean {
  if (typeof window === 'undefined') return false;
  if (sessionStorage.getItem(PRELOADER_SESSION_KEY) !== '1') return false;
  sessionStorage.removeItem(PRELOADER_SESSION_KEY);
  return true;
}

export function getCriticalPreloadUrls(): string[] {
  const urls = new Set<string>([
    SITE.heroImage,
    SITE.siteLogo,
    SITE.lockupLogo,
    ABOUT.journeyFrames[0]?.src ?? ABOUT.portrait,
  ]);

  ABOUT.journeyFrames.forEach((frame) => urls.add(frame.src));

  return [...urls];
}

export function preloadImage(src: string): Promise<void> {
  return new Promise((resolve) => {
    const image = new window.Image();
    image.decoding = 'async';
    image.onload = () => resolve();
    image.onerror = () => resolve();
    image.src = src;
  });
}

export async function preloadCriticalAssets(
  onProgress?: (value: number) => void,
): Promise<void> {
  const urls = getCriticalPreloadUrls();
  if (!urls.length) {
    onProgress?.(1);
    return;
  }

  let loaded = 0;
  const report = () => {
    loaded += 1;
    onProgress?.(loaded / urls.length);
  };

  await Promise.all(
    urls.map(async (url) => {
      await preloadImage(url);
      report();
    }),
  );
}
