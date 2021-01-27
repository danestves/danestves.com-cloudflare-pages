// Dependencies
import * as React from 'react'
import ReactMarkdown from 'react-markdown'
import renderA11yEmojis from 'markdown-render-a11y-emojis'
import htmlParser from 'react-markdown/plugins/html-parser'

// Components
import CodeBlock from '@/components/Markdown/CodeBlock'
import Image from '@/components/Markdown/Image'
import Link from '@/components/Markdown/Link'

type MarkdownRenderProps = {
  markdown: string
}

const renderers = {
  code: CodeBlock,
  image: Image,
  link: Link,
}

const MarkdownRender = ({ markdown }: MarkdownRenderProps): JSX.Element => {
  return (
    <ReactMarkdown
      // eslint-disable-next-line
      // @ts-ignore
      renderers={renderers}
      source={renderA11yEmojis(markdown)}
      escapeHtml={false}
      className="max-w-full prose prose-lg text-white"
      linkTarget="_blank"
      // Add this line to correct render of emojis
      astPlugins={[htmlParser()]}
    />
  )
}

export default MarkdownRender
