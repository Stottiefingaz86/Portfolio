export const AUTH_COOKIE_NAME = 'portfolio-auth';

const AUTH_TOKEN_SALT = 'portfolio-auth-v1';

function safeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;

  let result = 0;
  for (let i = 0; i < a.length; i++) {
    result |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }

  return result === 0;
}

export function isAuthEnabled(): boolean {
  return Boolean(getSitePassword());
}

export function getSitePassword(): string | undefined {
  const password = process.env.SITE_PASSWORD?.trim();
  return password || undefined;
}

/** Signed cookie value derived from SITE_PASSWORD — works in Edge and Node runtimes. */
export async function getAuthToken(password: string): Promise<string> {
  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey(
    'raw',
    encoder.encode(AUTH_TOKEN_SALT),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign'],
  );
  const signature = await crypto.subtle.sign('HMAC', key, encoder.encode(password));

  return Array.from(new Uint8Array(signature))
    .map((byte) => byte.toString(16).padStart(2, '0'))
    .join('');
}

export async function isAuthenticatedCookie(value: string | undefined): Promise<boolean> {
  if (!isAuthEnabled()) return true;

  const password = getSitePassword();
  if (!password || !value) return false;

  const token = await getAuthToken(password);
  return safeEqual(value, token);
}

export function isValidSitePassword(password: string): boolean {
  const expected = getSitePassword();
  if (!expected) return false;
  return safeEqual(password, expected);
}
