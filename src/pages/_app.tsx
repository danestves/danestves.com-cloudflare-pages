// Dependencies
import * as React from 'react'
import App, { AppProps, AppContext } from 'next/app'
import { useRouter } from 'next/router'
import ErrorPage from 'next/error'
import Head from 'next/head'
import { DefaultSeo } from 'next-seo'

// Components
import { Layout } from '@/components'

// Interfaces
import { Global } from '@/interfaces'

// Styles
import '@/styles/main.scss'

// Utils
import { getGlobalData } from '@/utils/api'

function MyApp({ Component, pageProps }: AppProps): JSX.Element | null {
  // Hooks
  const router = useRouter()

  // Render

  /**
   * Prevent Next bug when it tries to render the [[...slug]] route
   */
  if (router.asPath === '/[[...slug]]' || router.asPath === '/[...slug]') {
    return null
  }

  /**
   * Extract the data we need
   */
  const { global } = pageProps

  if (global == null) {
    return <ErrorPage statusCode={404} />
  }

  const { metadata } = global as Global

  return (
    <>
      {/* Favicon */}
      <Head>
        <link rel="shortcut icon" href={metadata.favicon.url} />
      </Head>

      <DefaultSeo
        titleTemplate={`%s | ${metadata.suffix}`}
        title={metadata.title}
        description={metadata.description}
        openGraph={{
          images:
            metadata.shareImage.formats &&
            Object.values(metadata.shareImage.formats).map((image) => {
              return {
                url: image.url,
                width: image.width,
                height: image.height,
              }
            }),
        }}
        twitter={{
          cardType: metadata.twitterCardType,
          handle: metadata.twitterUsername,
        }}
      />

      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  )
}

// getInitialProps disables automatic static optimization for pages that don't
// have getStaticProps. So [[...slug]] pages still get SSG.
// Hopefully we can replace this with getStaticProps once this issue is fixed:
// https://github.com/vercel/next.js/discussions/10949
MyApp.getInitialProps = async (ctx: AppContext) => {
  // Calls page's `getInitialProps` and fills `appProps.pageProps`
  const appProps = await App.getInitialProps(ctx)
  // Fetch global site settings from Strapi
  const global = await getGlobalData()
  // Pass the data to our page via props
  return { ...appProps, pageProps: { global, path: ctx.router.pathname } }
}

export default MyApp
