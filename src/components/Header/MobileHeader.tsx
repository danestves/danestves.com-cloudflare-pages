// Dependencies
import { useState, useRef } from 'react'
import clsx from 'clsx'

// Components
import Navigation from './Navigation'
import MenuToggle from './MenuToggle'

// Hooks
import { useClickOutside } from '@/hooks'

const MobileHeader = (): JSX.Element => {
  const [isOpen, toggleOpen] = useState(false)
  const containerRef = useRef(null)

  useClickOutside(containerRef, () => toggleOpen(false))

  return (
    <div
      ref={containerRef}
      className={clsx(
        'fixed top-0 bottom-0 right-0 overflow-hidden z-100 w-72 md:hidden transition-all duration-300',
        isOpen ? 'h-screen' : 'h-20'
      )}
    >
      <div
        className="absolute top-0 bottom-0 right-0 transition-all duration-300 bg-white w-72"
        style={{
          clipPath: `circle(${isOpen ? 1000 * 1.5 + 200 : 24}px at 248px 44px)`,
        }}
      />

      <Navigation toggle={toggleOpen} />

      <MenuToggle isOpen={isOpen} toggle={toggleOpen} />
    </div>
  )
}

export default MobileHeader
