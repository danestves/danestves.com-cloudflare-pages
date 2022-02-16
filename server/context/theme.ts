// Dependencies
import { createCookieSessionStorage } from 'remix';
import { createThemeSessionResolver } from 'remix-themes';

type ThemeFunction = ReturnType<typeof createTheme>;

function createTheme(
  _request: Request,
  env: any,
  _ctx: Omit<EventContext<any, any, any>, 'request' | 'env'>
) {
  if (!env.SESSION_SECRET) {
    throw new Error(
      'Fail initialising the session storge; SESSION_SECRET is missing'
    );
  }

  let themeStorage = createCookieSessionStorage({
    cookie: {
      name: '__danestves_theme',
      expires: new Date('2222-11-29'),
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

  return {
    resolver: themeSessionResolver,
    storage: themeStorage,
  };
}

export { createTheme };
export type { ThemeFunction };
