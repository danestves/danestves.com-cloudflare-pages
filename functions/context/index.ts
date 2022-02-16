// Internals
import { createI18n } from './i18n';
import { createTheme } from './theme';

type Context = ReturnType<typeof createContext>;

function createContext(
  request: Request,
  env: any,
  ctx: Omit<EventContext<any, any, any>, 'request' | 'env'>
) {
  return {
    i18n: createI18n(request, env, ctx),
    theme: createTheme(request, env, ctx),
  };
}

export { createContext };
export type { Context };
