import { NextRequest, NextResponse } from 'next/server';

import {
  AUTH_COOKIE_NAME,
  isAuthEnabled,
  isAuthenticatedCookie,
} from '@/lib/site-auth';

const PUBLIC_PATHS = new Set(['/login', '/api/auth/login']);

export function middleware(request: NextRequest) {
  if (!isAuthEnabled()) {
    return NextResponse.next();
  }

  const { pathname } = request.nextUrl;

  if (PUBLIC_PATHS.has(pathname)) {
    if (pathname === '/login' && isAuthenticatedCookie(request.cookies.get(AUTH_COOKIE_NAME)?.value)) {
      return NextResponse.redirect(new URL('/', request.url));
    }

    return NextResponse.next();
  }

  if (/\.(?:ico|png|jpg|jpeg|svg|webp|pdf|woff2?|mp3|wav)$/i.test(pathname)) {
    return NextResponse.next();
  }

  if (isAuthenticatedCookie(request.cookies.get(AUTH_COOKIE_NAME)?.value)) {
    return NextResponse.next();
  }

  const loginUrl = new URL('/login', request.url);
  if (pathname !== '/') {
    loginUrl.searchParams.set('from', pathname);
  }

  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: ['/((?!_next/static|_next/image).*)'],
};
