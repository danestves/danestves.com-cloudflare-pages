// Dependencies
import * as React from 'react'
import LazyLoad from 'react-lazyload'

const MarkdownImage = ({ src, alt }: { src: string; alt: string }): JSX.Element => {
  // Render
  return (
    <LazyLoad height={500}>
      <img src={src} alt={alt} />
    </LazyLoad>
  )
}

export default MarkdownImage
