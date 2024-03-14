import { handleAuth, handleLogin, handleCallback } from '@auth0/nextjs-auth0';

export const GET = handleAuth({
  signup: handleLogin({
    authorizationParams: {
      screen_hint: 'signup',
      audience: 'https://assetsfi.onrender.com/',
    },
  }),
  login: handleLogin({
    authorizationParams: {
      audience: 'https://assetsfi.onrender.com/',
    },
  }),
});
