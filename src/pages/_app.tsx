// Dependencies
import * as React from 'react'
import { AppProps } from 'next/app'
import { DefaultSeo, LogoJsonLd } from 'next-seo'
import Head from 'next/head'
import { motion } from 'framer-motion'
import { window } from 'browser-monads'
import { ApolloProvider } from '@apollo/client'

// Components
import { Layout } from '@/components'

// Lib
import apollo from '@/lib/apollo'

// Styles
import '@/styles/main.scss'

function MyApp({ Component, pageProps, router }: AppProps): JSX.Element | null {
  return (
    <ApolloProvider client={apollo}>
      <>
        <Head>
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link
            href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&family=Source+Code+Pro:wght@400;700&display=swap"
            rel="stylesheet"
          />
          <link rel="shortcut icon" href={`//${window.location.host}/favicon.ico`} />
        </Head>
      </>

      <DefaultSeo
        titleTemplate="%s | @danestves"
        title="Desarrollador web frontend"
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
