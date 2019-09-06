import React from 'react'
import { LazyLoadImage } from 'react-lazy-load-image-component'

export default ({ alt, src }) => (
  <LazyLoadImage
    src={src}
    alt={`${alt} | Daniel Esteves`}
    effect='blur'
  />
)
