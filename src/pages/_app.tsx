// Dependencies
import * as React from 'react'
import { AppProps } from 'next/app'
import Head from 'next/head'
import { DefaultSeo, LogoJsonLd, SocialProfileJsonLd } from 'next-seo'
import { motion } from 'framer-motion'
import SwiperCore, { Autoplay, A11y, Navigation } from 'swiper'
import { MDXProvider } from '@mdx-js/react'
import { MDXEmbedProvider } from 'mdx-embed'
import { window } from 'browser-monads'

// Components
import { Layout } from '@/components'
import MDXComponents from '@/components/MDXComponents'

// Libraries
import * as gtag from '@/lib/analytics'

// Styles
import 'swiper/swiper.scss'
import 'swiper/components/a11y/a11y.scss'
import 'swiper/components/navigation/navigation.scss'
import '@/styles/main.scss'

SwiperCore.use([Autoplay, A11y, Navigation])

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
        <Head>
          <meta
            name="viewport"
            content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, viewport-fit=cover"
          />
        </Head>

        <DefaultSeo
          titleTemplate="%s | @danestves"
          title="Desarrollador Web Frontend"
          description="Daniel Esteves desarrollador web frontend ha realizado sitios web utilizando WordPress, React, Gatsby, NextJS y mucho más. Listo para hacer tus sueños realidad."
          openGraph={{
            images: [
              {
                url: 'https://danestves.com/og.png',
                width: 1200,
                height: 630,
                alt: 'Desarrollador web fullstack en javascript | @danestves',
              },
            ],
          }}
          twitter={{
            cardType: 'summary_large_image',
            handle: '@danestves',
          }}
          additionalMetaTags={[
            {
              name: 'twitter:title',
              content: 'Desarrollador Web Frontend | @danestves',
            },
            {
              name: 'twitter:description',
              content:
                'Daniel Esteves desarrollador web frontend ha realizado sitios web utilizando WordPress, React, Gatsby, NextJS y mucho más. Listo para hacer tus sueños realidad.',
            },
            {
              name: 'twitter:image',
              content: 'https://danestves.com/og.png',
            },
            {
              name: 'twitter:image:alt',
              content: 'Desarrollador Web Frontend | @danestves',
            },
          ]}
        />

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
          <motion.div
            key={router.route}
            initial="pageInitial"
            animate="pageAnimate"
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
          </motion.div>
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
