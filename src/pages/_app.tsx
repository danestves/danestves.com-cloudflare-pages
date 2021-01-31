// Dependencies
import * as React from 'react'
import { AppProps } from 'next/app'
import { LogoJsonLd, SocialProfileJsonLd } from 'next-seo'
import { MDXProvider } from '@mdx-js/react'
import { MDXEmbedProvider } from 'mdx-embed'
import { window } from 'browser-monads'

// Components
import { Layout, SEO } from '@/components'
import MDXComponents from '@/components/MDXComponents'

// Libraries
import * as gtag from '@/lib/analytics'

// Styles
import '@/styles/main.css'

function MyApp({ Component, pageProps, router }: AppProps): JSX.Element | null {
  React.useEffect(() => {
    const handleRouteChange = (url: string): void => {
      gtag.pageview(url)
    }

    router.events.on('routeChangeComplete', handleRouteChange)
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [router.events])

  return (
    <MDXProvider components={MDXComponents}>
      <MDXEmbedProvider>
        <SEO />

        <LogoJsonLd logo="https://danestves.com/logo.png" url="https://danestves.com" />
        <SocialProfileJsonLd
          type="Person"
          name="Daniel Esteves"
          url="https://danestves.com"
          sameAs={[
            'https://www.youtube.com/channel/UC6YYVDKZC3mu1iB8IOCFqcw',
            'https://instagram.com/danestves',
            'https://www.linkedin.com/in/danestves',
            'https://twitter.com/danestves',
          ]}
        />

        <Layout>
          <Component {...pageProps} />
        </Layout>
      </MDXEmbedProvider>
    </MDXProvider>
  )
}

export function reportWebVitals({
  id,
  name,
  label,
  value,
}: {
  id: string
  name: string
  label: string
  value: number
}): void {
  window.gtag('event', name, {
    event_category: label === 'web-vital' ? 'Web Vitals' : 'Next.js custom metric',
    value: Math.round(name === 'CLS' ? value * 1000 : value), // values must be integers
    event_label: id, // id unique to current page load
    non_interaction: true, // avoids affecting bounce rate.
  })
}

export default MyApp
