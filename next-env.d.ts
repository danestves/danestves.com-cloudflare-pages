/// <reference types="next" />
/// <reference types="next/types/global" />
/// <reference types="next/image-types/global" />

declare module '@fec/remark-a11y-emoji'
declare module 'kwesforms'
declare module 'remark-code-titles'

declare module '*.graphql' {
  import { DocumentNode } from 'graphql'

  const value: DocumentNode
  export = value
}
