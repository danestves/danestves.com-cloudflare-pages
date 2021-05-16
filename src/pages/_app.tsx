// Dependencies
import { AppProps } from 'next/app'
import { LogoJsonLd, SocialProfileJsonLd } from 'next-seo'
import { MDXEmbedProvider } from 'mdx-embed'
import { I18nProvider } from 'next-rosetta'
import PlausibleProvider from 'next-plausible'
import Head from 'next/head'
import { ThemeProvider } from 'next-themes'

// Components
import { Layout } from '@/components'

// Styles
import '@/styles/main.css'

function MyApp({ Component, pageProps }: AppProps): JSX.Element | null {
  return (
    <>
      <Head>
        <link crossOrigin="anonymous" href="https://fonts.gstatic.com" rel="preconnect" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300..700&family=Roboto+Slab:wght@500..700&family=Roboto:wght@400;500;700&display=swap"
          rel="stylesheet"
        />
      </Head>

      <ThemeProvider attribute="class">
        <I18nProvider table={pageProps.table}>
          <MDXEmbedProvider>
            <PlausibleProvider domain="danestves.com">
              <LogoJsonLd logo="https://danestves.com/logo.png" url="https://danestves.com" />
              <SocialProfileJsonLd
                name="Daniel Esteves"
                sameAs={[
                  'https://www.youtube.com/channel/UC6YYVDKZC3mu1iB8IOCFqcw',
                  'https://instagram.com/danestves',
                  'https://www.linkedin.com/in/danestves',
                  'https://twitter.com/danestves',
                ]}
                type="Person"
                url="https://danestves.com"
              />

              <Layout>
                <Component {...pageProps} />
              </Layout>
            </PlausibleProvider>
          </MDXEmbedProvider>
        </I18nProvider>
      </ThemeProvider>
    </>
  )
}

export default MyApp
