declare module 'browser-monads-ts' {
  export const document: Document
  export const navigator: Navigator
  export const window: Window & {
    gtag?: Gtag.Gtag
  }
}
