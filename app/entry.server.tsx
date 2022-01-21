// Dependencies
import i18next from 'i18next';
import ReactDOMServer from 'react-dom/server';
import { RemixServer } from 'remix';
import type { EntryContext } from 'remix';

// Internals
import { initI18n } from '~/utils/i18n';
import { RemixI18NextProvider } from '~/lib/remix-i18n';
import { getCssText } from '~/stitches.config';

export default async function handleRequest(
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  remixContext: EntryContext
) {
  await initI18n();

  let markup = ReactDOMServer.renderToString(
    <RemixI18NextProvider i18n={i18next}>
      <RemixServer context={remixContext} url={request.url} />
    </RemixI18NextProvider>
  ).replace(/<\/head>/, `<style id="stitches">${getCssText()}</style></head>`);

  // Response with status (101, 204, 205, or 304) cannot have a body
  if ([101, 204, 205, 304].includes(responseStatusCode)) {
    return new Response(null, {
      status: responseStatusCode,
      headers: responseHeaders,
    });
  }

  responseHeaders.set('Content-Type', 'text/html');

  return new Response('<!DOCTYPE html>' + markup, {
    status: responseStatusCode,
    headers: responseHeaders,
  });
}
