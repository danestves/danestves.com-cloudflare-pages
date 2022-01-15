// Internals
import { createI18n } from './i18n';
import { createTheme } from './theme';
import type { Env } from '~/types';

type Context = ReturnType<typeof createContext>;

function createContext(request: Request, env: Env, ctx: ExecutionContext) {
  return {
    i18n: createI18n(request, env, ctx),
    theme: createTheme(request, env, ctx),
  };
}

export { createContext };
export type { Context };
