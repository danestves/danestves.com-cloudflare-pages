/// <reference types="@remix-run/dev" />
/// <reference types="@remix-run/cloudflare-pages/globals" />
/// <reference types="@cloudflare/workers-types" />

interface Env {
  NODE_ENV: 'production' | 'development';
  SESSION_SECRET: string;
}

export { Env };
export { Context } from '../worker/context';
