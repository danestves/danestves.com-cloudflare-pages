declare module '@fec/remark-a11y-emoji'
declare module 'kwesforms'
declare module 'remark-code-titles'

declare module '*.graphql' {
  import { DocumentNode } from 'graphql'

  export default typeof DocumentNode
}

declare module 'browser-monads-ts' {
  export const document: Document
  export const navigator: Navigator
  export const window: Window & {
    gtag?: Gtag.Gtag
  }
}
