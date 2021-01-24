// Dependencies
import * as React from 'react'
import { motion, MotionProps } from 'framer-motion'

const Path = (props: { d?: string } & MotionProps): JSX.Element => (
  <motion.path
    fill="transparent"
    strokeWidth="3"
    stroke="hsl(0, 0%, 18%)"
    strokeLinecap="round"
    {...props}
  />
)

const MenuToggle = ({
  isOpen,
  toggle,
}: {
  isOpen: boolean
  toggle: (arg0: boolean) => void
}): JSX.Element => (
  <button
    type="button"
    className="absolute flex items-center justify-center w-10 h-10 rounded-full z-100 top-5 right-4 focus:outline-none"
    onClick={() => toggle(!isOpen)}
    aria-label="Open/Close Menu"
  >
    <svg className="w-5 h-5" width="23" height="23" viewBox="0 0 23 23">
      <Path
        variants={{
          closed: { d: 'M 2 2.5 L 20 2.5' },
          open: { d: 'M 3 16.5 L 17 2.5' },
        }}
      />
      <Path
        d="M 2 9.423 L 20 9.423"
        variants={{
          closed: { opacity: 1 },
          open: { opacity: 0 },
        }}
        transition={{ duration: 0.1 }}
      />
      <Path
        variants={{
          closed: { d: 'M 2 16.346 L 20 16.346' },
          open: { d: 'M 3 2.5 L 17 16.346' },
        }}
      />
    </svg>
  </button>
)

export default MenuToggle
