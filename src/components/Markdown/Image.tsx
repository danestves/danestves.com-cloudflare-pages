// Dependencies
import * as React from 'react'

const MarkdownImage = ({ src, alt }: { src: string; alt: string }): JSX.Element => {
  return <img src={src} alt={alt} loading="lazy" height={500} />
}

export default MarkdownImage
