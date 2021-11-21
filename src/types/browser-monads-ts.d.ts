declare module "browser-monads-ts" {
  export type PlausibleRest = {
    props: any
  }

  export const document: Document;
  export const navigator: Navigator;
  export const window: Window & {
    plausible?: (event: string | number | symbol, rest?: PlausibleRest) => void
  };
}