// Dependencies
import * as React from 'react'
import { AppProps } from 'next/app'
import { DefaultSeo, LogoJsonLd } from 'next-seo'
import Head from 'next/head'
import { motion } from 'framer-motion'

// Components
import { Layout } from '@/components'

// Styles
import '@/styles/main.scss'

function MyApp({ Component, pageProps, router }: AppProps): JSX.Element | null {
  return (
    <>
      <Head>
        <link rel="shortcut icon" href="/favicon.ico" />
      </Head>

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
    </>
  )
}

export default MyApp
