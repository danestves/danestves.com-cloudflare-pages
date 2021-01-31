// Dependencies
import * as React from 'react'
// import { useRouter } from 'next/dist/client/router'

// Components
import { Header, Footer } from '@/components'

const Layout: React.FC = ({ children }) => {
  //const router = useRouter()

  return (
    <>
      <Header />

      {children}

      {/* {router.pathname !== '/contacto' && <CallToAction />} */}

      <Footer />
    </>
  )
}

export default Layout
