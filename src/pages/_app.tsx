// Dependencies
import * as React from 'react'
import { I18nProvider } from 'next-rosetta'
import { DefaultSeo } from 'next-seo'
import PlausibleProvider from 'next-plausible'
import type { AppProps } from 'next/app'

// Internals
import { Layout } from '@/components/Layout/Layout'
import '@/styles/main.css'
import defaultSeo, { texts } from 'seoConfig'

export default function App({
  Component,
  pageProps,
  router,
}: AppProps): JSX.Element {
  const lang = router.locale === 'es' ? '/es' : ''
  const basePath = `https://danestves.com${lang}${router.asPath}`

  return (
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
          <Component {...pageProps} />
        </Layout>
      </I18nProvider>
    </PlausibleProvider>
  )
}
