export const AUTH_COOKIE_NAME = 'portfolio-auth';

export function isAuthEnabled(): boolean {
  return Boolean(process.env.SITE_PASSWORD?.trim() && process.env.AUTH_SECRET?.trim());
}

export function getSitePassword(): string | undefined {
  return process.env.SITE_PASSWORD?.trim();
}

export function getAuthSecret(): string | undefined {
  return process.env.AUTH_SECRET?.trim();
}

export function isAuthenticatedCookie(value: string | undefined): boolean {
  if (!isAuthEnabled()) return true;

  const secret = getAuthSecret();
  return Boolean(value && secret && value === secret);
}
