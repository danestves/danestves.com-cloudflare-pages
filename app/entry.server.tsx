// Dependencies
import i18next from 'i18next';
import ReactDOMServer from 'react-dom/server';
import { RemixServer } from 'remix';
import type { EntryContext } from 'remix';

// Internals
import { initI18n } from '~/utils/i18n';
import { RemixI18NextProvider } from '~/lib/remix-i18n';
import { getCssText } from '~/stitches.config';
import { ServerStyleContext } from './contexts/server.context';
import { otherRootRouteHandlers } from './otherRootRoutes.server';

export default async function handleRequest(
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  remixContext: EntryContext
) {
  let sheet = getCssText();

  for (const handler of otherRootRouteHandlers) {
    const otherRouteResponse = await handler(request, remixContext);
    if (otherRouteResponse) return otherRouteResponse;
  }

  await initI18n();

  let markup = ReactDOMServer.renderToString(
    <RemixI18NextProvider i18n={i18next}>
      <ServerStyleContext.Provider value={sheet}>
        <RemixServer context={remixContext} url={request.url} />
      </ServerStyleContext.Provider>
    </RemixI18NextProvider>
  );

  markup = markup.replace('__STYLES__', sheet);

  responseHeaders.set('Content-Type', 'text/html');

  return new Response('<!DOCTYPE html>' + markup, {
    status: responseStatusCode,
    headers: responseHeaders,
  });
}
