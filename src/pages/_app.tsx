// Dependencies
import * as React from 'react'
import { AppProps } from 'next/app'
import { DefaultSeo, LogoJsonLd, SocialProfileJsonLd } from 'next-seo'
import Head from 'next/head'
import GoogleFonts from 'next-google-fonts'
import { motion } from 'framer-motion'
import { ApolloProvider } from '@apollo/client'
import SwiperCore, { Autoplay, A11y, Navigation } from 'swiper'

// Components
import { Layout } from '@/components'

// Lib
import apollo from '@/lib/apollo'

// Styles
import 'swiper/swiper.scss'
import 'swiper/components/a11y/a11y.scss'
import 'swiper/components/navigation/navigation.scss'
import '@/styles/main.scss'

SwiperCore.use([Autoplay, A11y, Navigation])

function MyApp({ Component, pageProps, router }: AppProps): JSX.Element | null {
  return (
    <ApolloProvider client={apollo}>
      <React.Fragment>
        <Head>
          <meta charSet="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <link rel="shortcut icon" href="/favicon.ico" />
        </Head>
        <GoogleFonts href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&family=Source+Code+Pro:wght@400;700&display=swap" />
      </React.Fragment>

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
    </ApolloProvider>
  )
}

export default MyApp
