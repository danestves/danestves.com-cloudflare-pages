// Dependencies
import * as React from 'react'
import ReactMarkdown from 'react-markdown'

// Components
import CodeBlock from '@/components/Markdown/CodeBlock'
import Image from '@/components/Markdown/Image'

type MarkdownRenderProps = {
  markdown: string
}

const renderers = {
  code: CodeBlock,
  image: Image,
}

const MarkdownRender = ({ markdown }: MarkdownRenderProps): JSX.Element => {
  // Render
  return (
    <ReactMarkdown
      renderers={renderers}
      source={markdown}
      escapeHtml={false}
      className="max-w-full prose prose-lg text-white"
    />
  )
}

export default MarkdownRender
