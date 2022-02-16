// Dependencies
import { createCookie } from 'remix';
import { RemixI18Next } from 'remix-i18next';
import { FetchBackend } from 'remix-i18next/build/backends/fetch';

let backend = new FetchBackend({
  // I use a service that I deploy on Vercel to server the translations
  baseUrl: new URL('https://danestves-locales.vercel.app/'),
  pathPattern: '/locales/:locale/:namespace.json',
});

type I18n = ReturnType<typeof createI18n>;

function createI18n(
  _request: Request,
  env: any,
  _ctx: Omit<EventContext<any, any, any>, 'request' | 'env'>
) {
  if (!env.SESSION_SECRET) {
    throw new Error(
      'Fail initialising the session storge; SESSION_SECRET is missing'
    );
  }

  let i18nStorage = createCookie('__danestves_locale', {
    expires: new Date('2222-11-29'),
    httpOnly: true,
    path: '/',
    sameSite: 'lax',
    secrets: [env.SESSION_SECRET],
    // normally you want this to be `secure: true`
    // but that doesn't work on localhost for Safari
    // https://web.dev/when-to-use-local-https/
    secure: process.env.NODE_ENV === 'production',
  });

  let i18nInstance = new RemixI18Next(backend, {
    fallbackLng: 'en',
    supportedLanguages: ['en', 'es'],
    cookie: i18nStorage,
  });

  return {
    lib: i18nInstance,
    storage: i18nStorage,
  };
}

export { createI18n };
export type { I18n };
