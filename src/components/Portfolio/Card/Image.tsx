// Dependencies
import * as React from 'react'
import { motion, useInvertedScale } from 'framer-motion'
import clsx from 'clsx'
import NextImage from 'next/image'

// Animations
import { closeSpring } from './animations'

// Types
import { ImageProps } from './types'

export const Image = ({
  image,
  title,
  isSelected,
  pointOfInterest = 0,
  backgroundColor = 'rgb(7, 29, 73)',
}: ImageProps): JSX.Element => {
  const inverted = useInvertedScale()

  return (
    <motion.div
      className="card-image-container"
      style={{
        ...inverted,
        backgroundColor,
        originX: 0,
        originY: 0,
      }}
    >
      <motion.div
        className={clsx('object-cover transition-all duration-100 relative card-image')}
        initial={false}
        animate={isSelected ? { x: 0, y: 0 } : { x: -pointOfInterest, y: 0 }}
        transition={closeSpring}
      >
        <NextImage
          src={
            image.url ||
            image.formats?.large?.url ||
            image.formats?.medium?.url ||
            image.formats?.small?.url ||
            image.formats?.thumbnail.url ||
            ''
          }
          alt={title}
          // We disable this warnings because the prop
          // `fill` it's not in TS yet
          //
          // eslint-disable-next-line
          // @ts-ignore
          layout="fill"
          objectFit="cover"
          objectPosition="top"
        />
      </motion.div>

      <div
        className="card-image-overlay"
        style={{ backdropFilter: `blur(${isSelected ? 0 : 5}px)` }}
      ></div>
    </motion.div>
  )
}
