// Dependencies
import { generateSitemap } from './lib/sitemap.xml';
import type { EntryContext } from 'remix';

type Handler = (
  request: Request,
  remixContext: EntryContext
) => Promise<Response | null> | null;

export let otherRootRoutes: Record<string, Handler> = {
  '/sitemap.xml': async (request, remixContext) => {
    return generateSitemap(request, remixContext, {
      siteUrl: 'https://danestves.com',
    });
  },
};

export let otherRootRouteHandlers: Array<Handler> = [
  ...Object.entries(otherRootRoutes).map(([path, handler]) => {
    return (request: Request, remixContext: EntryContext) => {
      if (new URL(request.url).pathname !== path) return null;
      return handler(request, remixContext);
    };
  }),
];
