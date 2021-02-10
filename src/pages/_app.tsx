// Dependencies
import { AppProps } from 'next/app'
import { LogoJsonLd, SocialProfileJsonLd } from 'next-seo'
import { MDXProvider } from '@mdx-js/react'
import { MDXEmbedProvider } from 'mdx-embed'
import { I18nProvider } from 'next-rosetta'

// Components
import { Layout, SEO } from '@/components'
import MDXComponents from '@/components/MDXComponents'

// Styles
import '@/styles/main.css'

function MyApp({ Component, pageProps }: AppProps): JSX.Element | null {
  return (
    <I18nProvider table={pageProps.table}>
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
    </I18nProvider>
  )
}

export default MyApp
