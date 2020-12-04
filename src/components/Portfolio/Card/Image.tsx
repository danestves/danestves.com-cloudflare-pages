// Dependencies
import * as React from 'react'
import { motion, useInvertedScale } from 'framer-motion'
import clsx from 'clsx'

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
      <motion.img
        className={clsx(
          'object-cover transition-all duration-100 relative card-image',
          isSelected ? 'object-top' : 'object-center'
        )}
        src={image}
        alt={title}
        initial={false}
        animate={isSelected ? { x: 0, y: 0 } : { x: -pointOfInterest, y: 0 }}
        transition={closeSpring}
      />

      <div
        className="card-image-overlay"
        style={{ backdropFilter: `blur(${isSelected ? 0 : 5}px)` }}
      ></div>
    </motion.div>
  )
}
