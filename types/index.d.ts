/// <reference types="@remix-run/dev" />
/// <reference types="@remix-run/cloudflare-workers/globals" />
/// <reference types="@cloudflare/workers-types" />

import type { LinkProps } from 'remix';

type DLink = LinkProps & {
  name: string;
};

interface Env {
  NODE_ENV: 'production' | 'development';
  SESSION_SECRET: string;
}

type Handler = {
  /** this just allows us to identify routes more directly rather than relying on pathnames */
  id?: string;
};

export { Env, DLink, Handler };
export * from './youtube';
