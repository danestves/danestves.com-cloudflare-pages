// Dependencies
import i18next from 'i18next';
import ReactDOMServer from 'react-dom/server';
import { I18nextProvider } from 'react-i18next';
import { RemixServer } from '@remix-run/react';
import type {
  EntryContext,
  HandleDataRequestFunction,
} from '@remix-run/cloudflare';

// Internals
import { initI18n } from '~/utils/i18n';
import { getCssText } from '~/stitches.config';
import { ServerStyleContext } from './contexts/server.context';
import { otherRootRouteHandlers } from './other-root-routes.server';

export default async function handleRequest(
  request: Request,
  statusCode: number,
  headers: Headers,
  context: EntryContext
) {
  let sheet = getCssText();

  for (const handler of otherRootRouteHandlers) {
    const otherRouteResponse = await handler(request, context);
    if (otherRouteResponse) return otherRouteResponse;
  }

  await initI18n();

  let markup = ReactDOMServer.renderToString(
    <I18nextProvider i18n={i18next}>
      <ServerStyleContext.Provider value={sheet}>
        <RemixServer context={context} url={request.url} />
      </ServerStyleContext.Provider>
    </I18nextProvider>
  );

  markup = markup.replace('__STYLES__', sheet);

  headers.set('Content-Type', 'text/html');
  addSecurityHeaders(headers);

  return new Response('<!DOCTYPE html>' + markup, {
    status: statusCode,
    headers,
  });
}

export let handleDataRequest: HandleDataRequestFunction = (
  response: Response
) => {
  addSecurityHeaders(response.headers);
  return response;
};

function addSecurityHeaders(headers: Headers) {
  headers.set(
    'Strict-Transport-Security',
    'max-age=31536000; includeSubDomains'
  );
  headers.set('X-Frame-Options', 'SAMEORIGIN');
  headers.set('X-Content-Type-Options', 'nosniff');
}
