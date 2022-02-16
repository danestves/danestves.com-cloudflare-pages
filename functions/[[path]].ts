// Dependencies
import { createPagesFunctionHandler } from '@remix-run/cloudflare-pages';
import * as build from '@remix-run/dev/server-build';

// Internals
import { createContext } from './context';

const handleRequest = createPagesFunctionHandler({
  build,
  getLoadContext: ({ env, request, ...ctx }) => {
    return {
      env,
      // @ts-ignore: context is well defined
      ...createContext(request, env, ctx),
    };
  },
});

export function onRequest(context: EventContext<any, any, any>) {
  return handleRequest(context);
}
