// Dependencies
import * as React from 'react'
import { LazyMotion, domAnimation, m } from 'framer-motion'
import { I18nProvider } from 'next-rosetta'
import { DefaultSeo, LogoJsonLd, SocialProfileJsonLd } from 'next-seo'
import PlausibleProvider from 'next-plausible'
import { ThemeProvider } from 'next-themes'
import type { NextComponentType } from 'next'
import type { AppContext, AppInitialProps, AppLayoutProps } from 'next/app'

// Internals
import { Layout } from '@/components'
import '@/styles/main.css'
import defaultSeo, { texts } from 'seoConfig'

export const App: NextComponentType<
  AppContext,
  AppInitialProps,
  AppLayoutProps
> = ({ Component, pageProps, router }: AppLayoutProps) => {
  const lang = router.locale === 'es' ? '/es' : ''
  const basePath = `https://danestves.com${lang}${router.asPath}`

  const getLayout =
    Component.getLayout ||
    ((page: React.ReactElement<any, any> | null) => <Layout>{page}</Layout>)

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      disableTransitionOnChange
      enableSystem
      themes={['dark', 'light']}
    >
      <PlausibleProvider domain="danestves.com">
        <I18nProvider table={pageProps.table}>
          {getLayout(
            <>
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
                  <DefaultSeo
                    {...defaultSeo(router.locale)}
                    canonical={basePath}
                    defaultOpenGraphImageHeight={630}
                    defaultOpenGraphImageWidth={1200}
                    openGraph={{
                      ...defaultSeo(router.locale).openGraph,
                      images: [
                        {
                          url: `https://cdn.flyyer.io/v2/danestves/_/_${lang}${router.asPath}`,
                          alt: texts.title[router.locale],
                          height: 630,
                          width: 1200,
                        },
                      ],
                      url: basePath,
                    }}
                  />
                  <LogoJsonLd
                    logo="https://danestves.com/static/logo.png"
                    url="https://danestves.com"
                  />
                  <SocialProfileJsonLd
                    name="Daniel Esteves"
                    sameAs={[
                      'https://twitter.com/danestves',
                      'https://instagram.com/danestves',
                      'https://www.linkedin.com/in/danestves',
                      'https://www.youtube.com/channel/UC6YYVDKZC3mu1iB8IOCFqcw',
                    ]}
                    type="Person"
                    url="https://danestves.com"
                  />
                  <Component {...pageProps} />
                </m.div>
              </LazyMotion>
            </>
          )}
        </I18nProvider>
      </PlausibleProvider>
    </ThemeProvider>
  )
}

export default App
