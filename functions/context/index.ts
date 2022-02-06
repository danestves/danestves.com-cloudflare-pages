// Internals
import { createI18n } from './i18n';

type Context = ReturnType<typeof createContext>;

function createContext(request: Request, env: any, ctx: ExecutionContext) {
  return {
    i18n: createI18n(request, env, ctx),
  };
}

export { createContext };
export type { Context };
