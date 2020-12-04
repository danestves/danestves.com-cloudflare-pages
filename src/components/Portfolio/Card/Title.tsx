import * as React from 'react'
import { motion, useInvertedScale } from 'framer-motion'

// Animations
import { closeSpring, openSpring } from './animations'

// Types
import { scale, TitleT } from './types'

/**
 * `transform` is order-dependent, so if you scale(0.5) before translateX(100px),
 * the visual translate will only be 50px.
 *
 * The intuitive pattern is to translate before doing things like scale and
 * rotate that will affect the coordinate space. So Framer Motion takes an
 * opinion on that and allows you to animate them
 * individually without having to write a whole transform string.
 *
 * However in this component we're doing something novel by inverting
 * the scale of the parent component. Because of this we want to translate
 * through scaled coordinate space, and can use the transformTemplate prop to do so.
 */
const scaleTranslate = ({ x, y, scaleX, scaleY }: scale): string => {
  return `scaleX(${scaleX}) scaleY(${scaleY}) translate(${x}, ${y}) translateZ(0)`
}

export const Title = ({ title, category, isSelected }: TitleT): JSX.Element => {
  const inverted = useInvertedScale()
  const x = isSelected ? 30 : 15
  const y = x

  return (
    <motion.div
      className="title-container"
      initial={false}
      animate={{ x, y }}
      transition={isSelected ? openSpring : closeSpring}
      transformTemplate={scaleTranslate}
      style={{ ...inverted, originX: 0, originY: 0 }}
    >
      <span className="text-sm text-white uppercase">{category}</span>
      <h2 className="text-2xl font-semibold text-white">{title}</h2>
    </motion.div>
  )
}
