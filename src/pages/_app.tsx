// Dependencies
import * as React from 'react'
import { AppProps } from 'next/app'

// Components
import { Layout } from '@/components'

// Styles
import '@/styles/main.scss'

function MyApp({ Component, pageProps }: AppProps): JSX.Element | null {
  return (
    <>
      {/* Favicon
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
      /> */}

      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  )
}

export default MyApp
