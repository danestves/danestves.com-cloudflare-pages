// Dependencies
import { useEffect } from 'react'
import { AppProps } from 'next/app'
import { LogoJsonLd, SocialProfileJsonLd } from 'next-seo'
import { MDXProvider } from '@mdx-js/react'
import { MDXEmbedProvider } from 'mdx-embed'

// Components
import { Layout, SEO } from '@/components'
import MDXComponents from '@/components/MDXComponents'

// Styles
import '@/styles/main.css'

function MyApp({ Component, pageProps }: AppProps): JSX.Element | null {
  useEffect(() => {
    if (
      typeof window !== 'undefined' &&
      'serviceWorker' in navigator &&
      // eslint-disable-next-line
      // @ts-ignore
      window.workbox !== undefined
    ) {
      // eslint-disable-next-line
      // @ts-ignore
      const wb = window.workbox
      // add event listeners to handle any of PWA lifecycle event
      // https://developers.google.com/web/tools/workbox/reference-docs/latest/module-workbox-window.Workbox#events
      wb.addEventListener('installed', (event: any) => {
        console.info(`Event ${event.type} is triggered.`)
        console.info(event)
      })

      wb.addEventListener('controlling', (event: any) => {
        console.info(`Event ${event.type} is triggered.`)
        console.info(event)
      })

      wb.addEventListener('activated', (event: any) => {
        console.info(`Event ${event.type} is triggered.`)
        console.info(event)
      })

      // A common UX pattern for progressive web apps is to show a banner when a service worker has updated and waiting to install.
      // NOTE: MUST set skipWaiting to false in next.config.js pwa object
      // https://developers.google.com/web/tools/workbox/guides/advanced-recipes#offer_a_page_reload_for_users
      const promptNewVersionAvailable = () => {
        // `event.wasWaitingBeforeRegister` will be false if this is the first time the updated service worker is waiting.
        // When `event.wasWaitingBeforeRegister` is true, a previously updated service worker is still waiting.
        // You may want to customize the UI prompt accordingly.
        if (confirm('A newer version of this web app is available, reload to update?')) {
          wb.addEventListener('controlling', () => {
            window.location.reload()
          })

          // Send a message to the waiting service worker, instructing it to activate.
          wb.messageSW({ type: 'SKIP_WAITING' })
        } else {
          console.info(
            'User rejected to reload the web app, keep using old version. New version will be automatically load when user open the app next time.'
          )
        }
      }

      wb.addEventListener('waiting', promptNewVersionAvailable)
      wb.addEventListener('externalwaiting', promptNewVersionAvailable)

      // ISSUE - this is not working as expected, why?
      // I could only make message event listenser work when I manually add this listenser into sw.js file
      wb.addEventListener('message', (event: any) => {
        console.info(`Event ${event.type} is triggered.`)
        console.info(event)
      })

      /*
      wb.addEventListener('redundant', event => {
        console.info(`Event ${event.type} is triggered.`)
        console.info(event)
      })
      wb.addEventListener('externalinstalled', event => {
        console.info(`Event ${event.type} is triggered.`)
        console.info(event)
      })
      wb.addEventListener('externalactivated', event => {
        console.info(`Event ${event.type} is triggered.`)
        console.info(event)
      })
      */

      // never forget to call register as auto register is turned off in next.config.js
      wb.register()
    }
  }, [])

  return (
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
  )
}

export default MyApp
