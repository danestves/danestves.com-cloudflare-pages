// Dependencies
import * as React from 'react'
import { I18nProvider } from 'next-rosetta'
import { DefaultSeo } from 'next-seo'
import Script from 'next/script'
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

  return (
    <I18nProvider table={pageProps.table}>
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

      <Layout>
        <Component {...pageProps} />
      </Layout>

      <Script
        async
        data-website-id="2449233b-a011-4a8b-af21-1fe1af5f6b29"
        defer
        src="https://analytics.danestves.com/umami.js"
      />
    </I18nProvider>
  )
}
