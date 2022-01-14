/// <reference types="@remix-run/dev" />
/// <reference types="@remix-run/cloudflare-pages/globals" />

export {};

interface Env {
  NODE_ENV: string;
  SESSION_SECRET: string;
}

declare global {
  var process: { env: Partial<Env> };
}
