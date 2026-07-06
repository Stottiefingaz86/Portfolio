import { NextResponse } from 'next/server';

import {
  AUTH_COOKIE_NAME,
  getAuthToken,
  getSitePassword,
  isAuthEnabled,
  isValidSitePassword,
} from '@/lib/site-auth';

export async function POST(request: Request) {
  if (!isAuthEnabled()) {
    return NextResponse.json({ error: 'Password protection is not configured.' }, { status: 503 });
  }

  let password = '';

  try {
    const body = (await request.json()) as { password?: string };
    password = typeof body.password === 'string' ? body.password : '';
  } catch {
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400 });
  }

  const expected = getSitePassword();

  if (!expected || !isValidSitePassword(password)) {
    return NextResponse.json({ error: 'Incorrect password.' }, { status: 401 });
  }

  const response = NextResponse.json({ ok: true });
  response.cookies.set(AUTH_COOKIE_NAME, getAuthToken(expected), {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 30,
  });

  return response;
}
