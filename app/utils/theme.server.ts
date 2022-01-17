// Dependencies
import { createCookieSessionStorage } from 'remix';
import { createThemeSessionResolver } from 'remix-themes';

declare var SESSION_SECRET: string;

let themeStorage = createCookieSessionStorage({
  cookie: {
    name: '__danestves_theme',
    expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 365),
    httpOnly: true,
    path: '/',
    sameSite: 'lax',
    secrets: [SESSION_SECRET],
    // normally you want this to be `secure: true`
    // but that doesn't work on localhost for Safari
    // https://web.dev/when-to-use-local-https/
    secure: process.env.NODE_ENV === 'production',
  },
});

let themeSessionResolver = createThemeSessionResolver(themeStorage);

export { themeSessionResolver, themeStorage };
