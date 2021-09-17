// Dependencies
import * as React from 'react'
import { useLocalStorageValue } from '@react-hookz/web'
import { LazyMotion, domAnimation, m } from 'framer-motion'
import { I18nProvider } from 'next-rosetta'
import { DefaultSeo } from 'next-seo'
import PlausibleProvider from 'next-plausible'
import { ThemeProvider } from 'next-themes'
import type { AppProps } from 'next/app'

// Internals
import { Layout } from '@/components'
import '@/styles/main.css'
import defaultSeo, { texts } from 'seoConfig'

export default function App({
  Component,
  pageProps,
  router,
}: AppProps): JSX.Element {
  const lang = router.locale === 'es' ? '/es' : ''
  const basePath = `https://danestves.com${lang}${router.asPath}`

  const [language, setLanguage] = useLocalStorageValue<string>('lang')

  React.useEffect(() => {
    if (!language) {
      setLanguage(router.locale)
    } else {
      router.push(router.asPath, undefined, {
        locale: language,
      })
    }
  }, [language, router, setLanguage])

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      themes={['dark', 'light']}
    >
      <PlausibleProvider domain="danestves.com">
        <I18nProvider table={pageProps.table}>
          <Layout>
            <DefaultSeo
              {...defaultSeo(router.locale)}
              canonical={basePath}
              openGraph={{
                ...defaultSeo(router.locale).openGraph,
                images: [
                  {
                    url: `https://cdn.flyyer.io/v2/danestves-preview/_/_${lang}${router.asPath}`,
                    alt: texts.title[router.locale],
                    height: 630,
                    width: 1200,
                  },
                ],
                url: basePath,
              }}
            />
            <LazyMotion features={domAnimation}>
              <m.div
                animate="pageAnimate"
                initial="pageInitial"
                key={router.route}
                variants={{
                  pageInitial: {
                    opacity: 0,
                  },
                  pageAnimate: {
                    opacity: 1,
                  },
                }}
              >
                <Component {...pageProps} />
              </m.div>
            </LazyMotion>
          </Layout>
        </I18nProvider>
      </PlausibleProvider>
    </ThemeProvider>
  )
}
