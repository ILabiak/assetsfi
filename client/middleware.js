import { NextResponse } from 'next/server';
import {
  withMiddlewareAuthRequired,
  getSession,
} from '@auth0/nextjs-auth0/edge';

export default withMiddlewareAuthRequired(async function middleware(req) {
  const path = req.nextUrl.pathname.replace('/api/server/', '');
  const res = NextResponse.rewrite(
    `${process.env.API_LINK}/${path}${req.nextUrl.search}`,
    req.url
  );
  // console.log(`${process.env.API_LINK}/${path}${req.nextUrl.search}`)
  const user = await getSession(req, res);
  // console.log(user)
  res.headers.set('Authorization', `Bearer ${user?.accessToken}`);

  return res;
});

export const config = {
  matcher: '/api/server/:path*',
};
