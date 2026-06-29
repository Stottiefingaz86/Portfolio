import { timingSafeEqual } from 'node:crypto';

import { NextResponse } from 'next/server';

import {
  AUTH_COOKIE_NAME,
  getAuthSecret,
  getSitePassword,
  isAuthEnabled,
} from '@/lib/site-auth';

function safeEqual(a: string, b: string): boolean {
  const left = Buffer.from(a);
  const right = Buffer.from(b);

  if (left.length !== right.length) {
    return false;
  }

  return timingSafeEqual(left, right);
}

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
  const secret = getAuthSecret();

  if (!expected || !secret || !safeEqual(password, expected)) {
    return NextResponse.json({ error: 'Incorrect password.' }, { status: 401 });
  }

  const response = NextResponse.json({ ok: true });
  response.cookies.set(AUTH_COOKIE_NAME, secret, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 30,
  });

  return response;
}
