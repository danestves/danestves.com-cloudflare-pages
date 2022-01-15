/// <reference types="@remix-run/dev" />
/// <reference types="@remix-run/cloudflare-pages/globals" />

interface Env {
  SESSION_SECRET: string;
}

export { Env };
export { Context } from '../worker/context';
