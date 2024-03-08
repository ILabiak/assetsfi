import { handleLogin } from '@auth0/nextjs-auth0';

// export default async function registerHandler(req, res,) {
//     return handleLogin(req, res, {
//         returnTo: 'http://localhost:3000/',
//         authorizationParams: {
//             screen_hint: 'signup',
//         },
//     });
// }
export default registerHandler({
    login: handleLogin((req) => {
        return {
            authorizationParams: { screen_hint: 'signup' }
        }
    })
});