// Dependencies
import { createPagesFunctionHandler } from '@remix-run/cloudflare-pages';
import * as build from '@remix-run/dev/server-build';

// Internals
import { createContext } from './context';

const handleRequest = createPagesFunctionHandler({
  // @ts-ignore
  build,
  getLoadContext: ({ env, request, ...ctx }) => {
    return {
      env,
      ...createContext(request, env, ctx),
    };
  },
  mode: process.env.NODE_ENV,
});

export function onRequest(context: EventContext<any, any, any>) {
  return handleRequest(context);
}
