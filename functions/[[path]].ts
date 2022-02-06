// Dependencies
import { createPagesFunctionHandler } from '@remix-run/cloudflare-pages';

// Internals
import * as build from '../build';

const handleRequest = createPagesFunctionHandler({
  // @ts-ignore
  build,
  getLoadContext: (c) => {
    return {
      env: c.env,
    };
  },
});

export function onRequest(context) {
  return handleRequest(context);
}
