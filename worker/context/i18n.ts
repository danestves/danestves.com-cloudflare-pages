// Dependencies
import { createCookie } from 'remix';
import { RemixI18Next } from 'remix-i18next';
import { FetchBackend } from 'remix-i18next/build/backends/fetch';

// Internals
import { Env } from '~/types';

let backend = new FetchBackend({
  // I use a service that I deploy on Vercel to server the translations
  baseUrl: new URL('https://danestves-locales.vercel.app/'),
  pathPattern: '/locales/:locale/:namespace.json',
});

function createI18n(_request: Request, env: Env, _context: ExecutionContext) {
  let i18nStorage = createCookie('__danestves_locale', {
    expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 365),
    httpOnly: true,
    path: '/',
    sameSite: 'lax',
    secrets: [env.SESSION_SECRET],
    // normally you want this to be `secure: true`
    // but that doesn't work on localhost for Safari
    // https://web.dev/when-to-use-local-https/
    secure: env.NODE_ENV === 'production',
  });

  let i18n = new RemixI18Next(backend, {
    fallbackLng: 'en',
    supportedLanguages: ['en', 'es'],
    cookie: i18nStorage,
  });

  return {
    i18next: i18n,
    cookie: i18nStorage,
  };
}

export { createI18n };
