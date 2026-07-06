import { createHmac, timingSafeEqual } from 'node:crypto';

export const AUTH_COOKIE_NAME = 'portfolio-auth';

const AUTH_TOKEN_SALT = 'portfolio-auth-v1';

function safeEqual(a: string, b: string): boolean {
  const left = Buffer.from(a);
  const right = Buffer.from(b);

  if (left.length !== right.length) {
    return false;
  }

  return timingSafeEqual(left, right);
}

export function isAuthEnabled(): boolean {
  return Boolean(getSitePassword());
}

export function getSitePassword(): string | undefined {
  const password = process.env.SITE_PASSWORD?.trim();
  return password || undefined;
}

/** Signed cookie value derived from SITE_PASSWORD — no second secret env var needed. */
export function getAuthToken(password: string): string {
  return createHmac('sha256', AUTH_TOKEN_SALT).update(password).digest('hex');
}

export function isAuthenticatedCookie(value: string | undefined): boolean {
  if (!isAuthEnabled()) return true;

  const password = getSitePassword();
  if (!password || !value) return false;

  return safeEqual(value, getAuthToken(password));
}

export function isValidSitePassword(password: string): boolean {
  const expected = getSitePassword();
  if (!expected) return false;
  return safeEqual(password, expected);
}
