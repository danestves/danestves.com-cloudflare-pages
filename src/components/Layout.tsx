// Dependencies
import { useState } from 'react'
import { useRouter } from 'next/dist/client/router'

// Components
import { Header, Footer, CallToAction, Notification } from '@/components'

const Layout: React.FC = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false)

  const router = useRouter()

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
