let navIntentUntil = 0;

export function scrollToSection(id: string) {
  navIntentUntil = performance.now() + 1200;

  const target = document.getElementById(id);
  if (!target) return;

  const top =
    window.scrollY + target.getBoundingClientRect().top - getScrollOffset(id);

  window.scrollTo({ top: Math.max(0, top), behavior: 'smooth' });
}

export function hasRecentNavIntent() {
  return performance.now() < navIntentUntil;
}

function getScrollOffset(id: string) {
  if (id === 'top') return 0;

  if (window.matchMedia('(max-width: 767px)').matches) {
    return 16;
  }

  return 24;
}
