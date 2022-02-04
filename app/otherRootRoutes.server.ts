// Dependencies
import type { EntryContext } from 'remix';

type Handler = (
  request: Request,
  remixContext: EntryContext
) => Promise<Response | null> | null;

export let otherRootRoutes: Record<string, Handler> = {};

export let otherRootRouteHandlers: Array<Handler> = [
  ...Object.entries(otherRootRoutes).map(([path, handler]) => {
    return (request: Request, remixContext: EntryContext) => {
      if (new URL(request.url).pathname !== path) return null;
      return handler(request, remixContext);
    };
  }),
];
