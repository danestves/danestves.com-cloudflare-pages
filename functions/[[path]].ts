// Dependencies
import { createPagesFunctionHandler } from '@remix-run/cloudflare-pages';

// Internals
import { createContext } from './context';
import * as build from '../build';

const handleRequest = createPagesFunctionHandler({
  // @ts-ignore
  build,
  getLoadContext: ({ env, request, ...ctx }) => {
    return {
      env,
      ...createContext(request, env, ctx),
    };
  },
});

export function onRequest(context) {
  return handleRequest(context);
}
