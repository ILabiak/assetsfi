import { NextResponse } from 'next/server';
import {
  withMiddlewareAuthRequired,
  getSession,
} from '@auth0/nextjs-auth0/edge';

export default withMiddlewareAuthRequired(async function middleware(req) {
  if (!req.nextUrl.pathname.includes('/api/server/')) {
    return;
  }
  const path = req.nextUrl.pathname.replace('/api/server/', '');
  const res = NextResponse.rewrite(
    `${process.env.API_LINK}/${path}${req.nextUrl.search}`,
    req.url
  );
  const user = await getSession(req, res);

  // res.headers.set('Authorization', `Bearer ${user?.accessToken}`);
  res.headers.set('x_authorization', `Bearer ${user?.accessToken}`);

  return res;
});

export const config = {
  matcher: [
    '/api/server/:path*',
    '/donations',
    '/dashboard',
    '/portfolios',
    '/settings',
    '/binance',
    '/portfolio/:path*',
  ],
};
