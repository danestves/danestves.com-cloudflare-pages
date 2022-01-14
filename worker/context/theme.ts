// Dependencies
import { createCookieSessionStorage } from 'remix';
import { createThemeSessionResolver } from 'remix-themes';

// Internals
import { Env } from '~/types';

function createTheme(_request: Request, env: Env, _context: ExecutionContext) {
  let themeStorage = createCookieSessionStorage({
    cookie: {
      name: '__danestves_theme',
      expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 365),
      httpOnly: true,
      path: '/',
      sameSite: 'lax',
      secrets: [env.SESSION_SECRET],
      // normally you want this to be `secure: true`
      // but that doesn't work on localhost for Safari
      // https://web.dev/when-to-use-local-https/
      secure: process.env.NODE_ENV === 'production',
    },
  });

  let themeSessionResolver = createThemeSessionResolver(themeStorage);

  return themeSessionResolver;
}

export { createTheme };
