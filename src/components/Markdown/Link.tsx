// Dependencies
import * as React from 'react'

interface Link {
  href: string
  children: React.ReactNode
}

const MarkdownLink = ({ href, children }: Link): JSX.Element => {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  )
}

export default MarkdownLink
