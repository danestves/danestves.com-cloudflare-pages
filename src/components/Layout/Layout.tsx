// Dependencies
import * as React from 'react'
import { Transition } from '@headlessui/react'

// Internals
import Header from './Header'
import Footer from './Footer'
import { Logo, Rings } from '../Logo'

export const Layout: React.FC = ({ children }) => {
  const [isLoading, setIsLoading] = React.useState(true)

  React.useEffect(() => {
    setTimeout(() => {
      setIsLoading(false)
    }, 500)
  }, [])

  return (
    <>
      <Transition
        as="div"
        className="fixed z-50 flex items-center justify-center w-screen h-screen bg-white dark:bg-[#292929]"
        enter="transform transition duration-[400ms]"
        enterFrom="opacity-0 scale-50"
        enterTo="opacity-100 scale-100"
        leave="transform duration-200 transition ease-in-out"
        leaveFrom="opacity-100 scale-100"
        leaveTo="opacity-0 scale-95"
        show={isLoading}
      >
        <Logo className="absolute mt-1 -ml-px" />
        <Rings animateRings className="w-[177px]" />
      </Transition>

      <Header />

      {children}

      <Footer />
    </>
  )
}

export default Layout
