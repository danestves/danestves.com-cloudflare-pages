// Dependencies
import * as React from 'react'
import { Transition } from '@headlessui/react'
import { DefaultSeo } from 'next-seo'
import type { AppProps } from 'next/app'

// Internals
import { Layout, Logo, Rings } from '@/components'
import '@/styles/main.css'
import defaultSeo, { texts } from 'seoConfig'

export default function App({
  Component,
  pageProps,
  router,
}: AppProps): JSX.Element {
  const [isLoading, setIsLoading] = React.useState(true)

  React.useEffect(() => {
    setTimeout(() => {
      setIsLoading(false)
    }, 1000)
  })

  const lang = router.locale === 'es' ? '/es' : ''
  const basePath = `https://danestves.com${lang}${router.asPath}`

  return (
    <>
      <DefaultSeo
        {...defaultSeo(router.locale)}
        canonical={basePath}
        openGraph={{
          ...defaultSeo(router.locale).openGraph,
          images: [
            {
              url: `https://cdn.flyyer.io/v2/danestves-com/_/_${lang}${router.asPath}`,
              alt: texts.title[router.locale],
              height: 630,
              width: 1200,
            },
          ],
          url: basePath,
        }}
      />

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
        as="div"
        className="w-screen min-h-screen"
        enter="transform transition duration-[400ms]"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transform duration-200 transition ease-in-out"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
        show={!isLoading}
      >
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </Transition>
    </>
  )
}
