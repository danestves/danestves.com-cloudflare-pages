// Dependencies
import * as React from 'react'
import { window } from 'browser-monads-ts'
import { MDXEmbedProvider } from 'mdx-embed'
import { I18nProvider } from 'next-rosetta'
import { LogoJsonLd, SocialProfileJsonLd } from 'next-seo'
import { ThemeProvider } from 'next-themes'
import Script from 'next/script'
import { useCookie } from 'react-use'
import type { AppProps, NextWebVitalsMetric } from 'next/app'

// Internals
import { Layout } from '@/components'
import { GA_MEASUREMENT_ID, pageview } from '@/lib/gtag'
import '@/styles/main.css'

function MyApp({ Component, pageProps, router }: AppProps): JSX.Element | null {
  const [consent, setConsent] = useCookie('cookie_consent')

  const acceptConsent = () => {
    setConsent('CONSENT_ACCEPTED', {
      expires: new Date(Date.now() + 60 * 60 * 24 * 365 * 1000),
    })

    window.gtag?.('consent', 'update', {
      ad_storage: 'granted',
    })
  }

  React.useEffect(() => {
    const handleRouteChange = (url: string) => {
      pageview(url)
    }

    router.events.on('routeChangeComplete', handleRouteChange)

    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [router.events])

  return (
    <ThemeProvider attribute="class">
      <I18nProvider table={pageProps.table}>
        <MDXEmbedProvider>
          <>
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

              <Script
                src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
                strategy="afterInteractive"
              />
              <Script strategy="afterInteractive">
                {`
                window.dataLayer = window.dataLayer || [];

                function gtag() {
                  dataLayer.push(arguments);
                }

                gtag('consent', 'default', {
                  'ad_storage': 'denied'
                });

                gtag('js', new Date());
                gtag('config', '${GA_MEASUREMENT_ID}');
              `}
              </Script>
            </Layout>

            {consent !== 'CONSENT_ACCEPTED' && (
              <div className="fixed inset-x-0 bottom-0 pb-2 sm:pb-5">
                <div className="px-2 mx-auto max-w-7xl sm:px-6 lg:px-8">
                  <div className="p-2 bg-white rounded-lg shadow-lg sm:p-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center flex-1 w-0">
                        <p className="ml-3 text-sm font-medium text-black">
                          This site uses cookies to provide you with a better
                          user experience. For more information, refer to our{' '}
                          <a
                            className="underline"
                            href="https://www.privacypolicies.com/live/b48840a3-6609-410d-8ae9-cf75a727ff6b"
                            rel="noopener noreferrer"
                            target="_blank"
                          >
                            Cookie Policy
                          </a>
                        </p>
                      </div>
                      <div className="flex-shrink-0 order-3 w-auto mt-2 sm:order-2 sm:mt-0">
                        <button
                          className="flex items-center justify-center px-4 py-2 text-sm font-medium text-white border border-transparent rounded-md shadow-sm bg-secondary hover:bg-secondary-400"
                          onClick={acceptConsent}
                          type="button"
                        >
                          Ok
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </>
        </MDXEmbedProvider>
      </I18nProvider>
    </ThemeProvider>
  )
}

export function reportWebVitals({
  id,
  name,
  label,
  value,
}: NextWebVitalsMetric): void {
  window.gtag?.('event', name, {
    event_category:
      label === 'web-vital' ? 'Web Vitals' : 'Next.js custom metric',
    value: Math.round(name === 'CLS' ? value * 1000 : value), // values must be integers
    event_label: id, // id unique to current page load
    non_interaction: true, // avoids affecting bounce rate.
  })
}

export default MyApp
