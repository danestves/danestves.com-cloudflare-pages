// Dependencies
import { useState, useEffect } from 'react'
import { useRouter } from 'next/dist/client/router'
import { window } from 'browser-monads'

// Components
import { Header, Footer, CallToAction, Notification } from '@/components'

const Layout: React.FC = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false)

  const router = useRouter()

  // const updateWorkbox = () => {
  //   const wb = window.workbox

  //   // A common UX pattern for progressive web apps is to show a banner when a service worker has updated and waiting to install.
  //   // NOTE: MUST set skipWaiting to false in next.config.js pwa object
  //   // https://developers.google.com/web/tools/workbox/guides/advanced-recipes#offer_a_page_reload_for_users

  //   // `event.wasWaitingBeforeRegister` will be false if this is the first time the updated service worker is waiting.
  //   // When `event.wasWaitingBeforeRegister` is true, a previously updated service worker is still waiting.
  //   // You may want to customize the UI prompt accordingly.
  //   wb.addEventListener('controlling', () => {
  //     // eslint-disable-next-line
  //     console.info('Updating PWA 🚀')

  //     window.location.reload()
  //   })

  //   // Send a message to the waiting service worker, instructing it to activate.
  //   wb.messageSW({ type: 'SKIP_WAITING' })
  // }

  useEffect(() => {
    if (
      typeof window !== 'undefined' &&
      'serviceWorker' in navigator &&
      window.workbox !== undefined
    ) {
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
    <>
      <Header />

      {children}

      {router.pathname !== '/contacto' && <CallToAction />}

      <Footer />

      <Notification
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        onClose={() => {
          // eslint-disable-next-line
          console.info(
            'User rejected to reload the web app, keep using old version. New version will be automatically load when user open the app next time.'
          )
        }}
      >
        <p className="flex-1 w-0 text-sm font-medium text-gray-900">
          Hay una nueva versión del sitio 🎉
        </p>

        <button
          type="button"
          className="px-4 py-2 text-sm text-white rounded-lg bg-primary focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-white focus:outline-none"
          // onClick={updateWorkbox}
        >
          Actualizar
        </button>
      </Notification>
    </>
  )
}

export default Layout
