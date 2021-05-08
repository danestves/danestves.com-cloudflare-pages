/// <reference types="next" />
/// <reference types="next/types/global" />

declare module 'kwesforms'

declare module 'browser-monads' {
  export const window: Window & {
    workbox: any
  }
  export const document: Document
  export function exists(variable: any): boolean
}
declare module '*.graphql' {
  import { DocumentNode } from 'graphql'

  const value: DocumentNode
  export default value
}
declare module 'remark-code-titles'
declare module '@fec/remark-a11y-emoji'
declare module 'mdx-prism'
