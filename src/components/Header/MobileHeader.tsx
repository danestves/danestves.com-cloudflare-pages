// Dependencies
import * as React from 'react'
import { motion, useCycle } from 'framer-motion'

// Components
import Navigation from './Navigation'
import MenuToggle from './MenuToggle'

// Hooks
import { useDimensions, useClickOutside } from '@/hooks'

const sidebarContainer = {
  open: {
    height: 1000 * 1.5 + 200,
    transition: {
      type: 'spring',
      stiffness: 20,
      restDelta: 2,
    },
  },
  closed: {
    height: 80,
    transition: {
      delay: 0.5,
      type: 'spring',
      stiffness: 400,
      damping: 40,
    },
  },
}
const sidebar = {
  open: (height = 1000) => ({
    clipPath: `circle(${height * 1.5 + 200}px at 252px 38px)`,
    transition: {
      type: 'spring',
      stiffness: 20,
      restDelta: 2,
    },
  }),
  closed: {
    clipPath: 'circle(24px at 252px 38px)',
    transition: {
      delay: 0.5,
      type: 'spring',
      stiffness: 400,
      damping: 40,
    },
  },
}

const MobileHeader = (): JSX.Element => {
  const [isOpen, toggleOpen] = useCycle(false, true)
  const containerRef = React.useRef(null)
  const { height } = useDimensions(containerRef)

  useClickOutside(containerRef, toggleOpen)

  return (
    <motion.nav
      initial={false}
      animate={isOpen ? 'open' : 'closed'}
      custom={height}
      ref={containerRef}
      className="fixed top-0 bottom-0 right-0 overflow-hidden z-100 w-72 md:hidden"
      variants={sidebarContainer}
    >
      <motion.div className="absolute top-0 bottom-0 right-0 bg-white w-72" variants={sidebar} />

      <Navigation toggle={toggleOpen} />

      <MenuToggle toggle={toggleOpen} />
    </motion.nav>
  )
}

export default MobileHeader
