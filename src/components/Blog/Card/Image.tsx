// Dependencies
import * as React from 'react'
import { motion, useInvertedScale } from 'framer-motion'

// Animations
import { closeSpring } from './animations'

// Types
import { ImageProps } from './types'

export const Image = ({
  isSelected,
  pointOfInterest = 0,
  backgroundColor,
}: ImageProps): JSX.Element => {
  const inverted = useInvertedScale()

  return (
    <motion.div
      className="card-image-container"
      style={{ ...inverted, backgroundColor, originX: 0, originY: 0 }}
    >
      <motion.img
        className="card-image"
        src=""
        alt=""
        initial={false}
        animate={isSelected ? { x: -20, y: -20 } : { x: -pointOfInterest, y: 0 }}
        transition={closeSpring}
      />
    </motion.div>
  )
}
