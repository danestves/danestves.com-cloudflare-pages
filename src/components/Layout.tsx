// Dependencies
import { useEffect } from 'react'
import { useRouter } from 'next/dist/client/router'
import { window } from 'browser-monads'

// Components
import { Header, Footer, CallToAction } from '@/components'

const Layout: React.FC = ({ children }) => {
  const router = useRouter()

  useEffect(() => {
    if (
      typeof window !== 'undefined' &&
      'serviceWorker' in navigator &&
      window.workbox !== undefined
    ) {
      const wb = window.workbox

      // A common UX pattern for progressive web apps is to show a banner when a service worker has updated and waiting to install.
      // NOTE: MUST set skipWaiting to false in next.config.js pwa object
      // https://developers.google.com/web/tools/workbox/guides/advanced-recipes#offer_a_page_reload_for_users
      const promptNewVersionAvailable = () => {
        // `event.wasWaitingBeforeRegister` will be false if this is the first time the updated service worker is waiting.
        // When `event.wasWaitingBeforeRegister` is true, a previously updated service worker is still waiting.
        // You may want to customize the UI prompt accordingly.
        if (window.confirm('Hay una nueva versión del sitio 🎉')) {
          wb.addEventListener('controlling', () => {
            window.location.reload()
          })

          // Send a message to the waiting service worker, instructing it to activate.
          wb.messageSW({ type: 'SKIP_WAITING' })
        } else {
          // eslint-disable-next-line
          console.log(
            'User rejected to reload the web app, keep using old version. New version will be automatically load when user open the app next time.'
          )
        }
      }

      wb.addEventListener('waiting', promptNewVersionAvailable)
      wb.addEventListener('externalwaiting', promptNewVersionAvailable)

      // never forget to call register as auto register is turned off in next.config.js
      wb.register()
    }
  }, [])

  return (
    <>
      <Header />

      {children}

      {router.pathname !== '/contacto' && <CallToAction />}

      <Footer />
    </>
  )
}

export default Layout
