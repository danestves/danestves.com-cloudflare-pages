// Dependencies
import { generateRobotsTxt, generateSitemap } from '@balavishnuvj/remix-seo';
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
  '/robots.txt': async () => {
    return generateRobotsTxt([
      { type: 'disallow', value: '/maria-quieres-ser-mi-novia' },
      { type: 'sitemap', value: 'https://danestves.com/sitemap.xml' },
    ]);
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
