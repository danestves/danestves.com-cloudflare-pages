// Dependencies
import * as React from 'react'
import Image from 'next/image'

// Interfaces
import { Media as MediaInterface } from '@/interfaces'

type MediaProps = {
  media?: MediaInterface
  alt?: string
  width: number | string
  height: number | string
  layout?: 'responsive' | 'fixed' | 'intrinsic' | undefined
}

const Media: React.FC<MediaProps> = ({ media, alt, width, height, layout = 'responsive' }) => {
  // Render
  if (media && media.mime.includes('video')) {
    return (
      <>
        <></>
      </>
    )
  }

  if (media && media.mime.includes('image')) {
    return (
      <Image
        src={
          media.url ||
          media.formats?.large?.url ||
          media.formats?.medium?.url ||
          media.formats?.small?.url ||
          media.formats?.thumbnail.url ||
          ''
        }
        alt={media.alternativeText || alt || '@danestves'}
        width={width}
        height={height}
        layout={layout}
      />
    )
  }

  return null
}

export default Media
