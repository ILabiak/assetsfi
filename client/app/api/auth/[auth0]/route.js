import { handleAuth, handleLogin, handleCallback } from '@auth0/nextjs-auth0';

export const GET = handleAuth({
  signup: handleLogin({
    authorizationParams: { screen_hint: 'signup' },
  })
});
