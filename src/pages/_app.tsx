// Dependencies
import { AppProps } from 'next/app'
import { LogoJsonLd, SocialProfileJsonLd } from 'next-seo'
import { MDXEmbedProvider } from 'mdx-embed'
import { I18nProvider } from 'next-rosetta'
import PlausibleProvider from 'next-plausible'

// Components
import { Layout } from '@/components'

// Styles
import '@/styles/main.css'

function MyApp({ Component, pageProps }: AppProps): JSX.Element | null {
  return (
    <I18nProvider table={pageProps.table}>
      <MDXEmbedProvider>
        <PlausibleProvider domain="danestves.com">
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
        </PlausibleProvider>
      </MDXEmbedProvider>
    </I18nProvider>
  )
}

export default MyApp
