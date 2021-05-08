/// <reference types="next" />
/// <reference types="next/types/global" />

declare module 'kwesforms'

declare module '*.graphql' {
  import { DocumentNode } from 'graphql'

  const value: DocumentNode
  export default value
}
declare module 'remark-code-titles'
declare module '@fec/remark-a11y-emoji'
declare module 'mdx-prism'
