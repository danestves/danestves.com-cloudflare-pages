// Dependencies
import { MDXEmbedProvider } from 'mdx-embed'
import PlausibleProvider from 'next-plausible'
import { I18nProvider } from 'next-rosetta'
import { LogoJsonLd, SocialProfileJsonLd } from 'next-seo'
import { ThemeProvider } from 'next-themes'
import type { AppProps } from 'next/app'

// Internals
import { Layout } from '@/components'
import '@/styles/main.css'

function MyApp({ Component, pageProps }: AppProps): JSX.Element | null {
  return (
    <ThemeProvider attribute="class">
      <I18nProvider table={pageProps.table}>
        <MDXEmbedProvider>
          <PlausibleProvider domain="danestves.com">
            <LogoJsonLd
              logo="https://danestves.com/logo.png"
              url="https://danestves.com"
            />
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
  )
}

export default MyApp
