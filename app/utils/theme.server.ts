// Dependencies
import { createCookieSessionStorage } from 'remix';
import { createThemeSessionResolver } from 'remix-themes';

let themeStorage = createCookieSessionStorage({
  cookie: {
    name: '__danestves_theme',
    expires: new Date('2222-11-29'),
    httpOnly: true,
    path: '/',
    sameSite: 'lax',
    secrets: ['SESSION_SECRET'],
    // normally you want this to be `secure: true`
    // but that doesn't work on localhost for Safari
    // https://web.dev/when-to-use-local-https/
    secure: process.env.NODE_ENV === 'production',
  },
});

let themeSessionResolver = createThemeSessionResolver(themeStorage);

export { themeSessionResolver, themeStorage };
