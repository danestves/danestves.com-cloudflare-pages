// Dependencies
import * as React from 'react'
import { Transition } from '@headlessui/react'
import type { AppProps } from 'next/app'

// Internals
import { Logo, Rings } from '@/components'
import '@/styles/main.css'

export default function App({ Component, pageProps }: AppProps): JSX.Element {
  const [isLoading, setIsLoading] = React.useState(true)

  React.useEffect(() => {
    setTimeout(() => {
      setIsLoading(false)
    }, 1000)
  })

  return (
    <>
      <Transition
        as="div"
        className="flex items-center justify-center w-screen h-screen"
        enter="transform transition duration-[400ms]"
        enterFrom="opacity-0 scale-50"
        enterTo="opacity-100 scale-100"
        leave="transform duration-200 transition ease-in-out"
        leaveFrom="opacity-100 scale-100"
        leaveTo="opacity-0 scale-95"
        show={isLoading}
      >
        <Logo className="absolute mt-px -ml-px" />
        <Rings />
      </Transition>

      <Transition
        className="w-screen min-h-screen"
        enter="transform transition duration-[400ms]"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transform duration-200 transition ease-in-out"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
        show={!isLoading}
      >
        <Component {...pageProps} />
      </Transition>
    </>
  )
}
