// Internals
import { createTheme } from './theme';
import type { Env } from '~/types';

type Context = ReturnType<typeof createContext>;

function createContext(request: Request, env: Env, ctx: ExecutionContext) {
  return {
    theme: createTheme(request, env, ctx),
  };
}

export { createContext };
export type { Context };
