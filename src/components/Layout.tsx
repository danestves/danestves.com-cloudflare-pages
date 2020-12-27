// Dependencies
import * as React from 'react'

// Components
import { Header, Footer, CallToAction } from '@/components'

const Layout: React.FC = ({ children }) => {
  // Render
  return (
    <>
      <Header pathname="/" />

      {children}

      <CallToAction />

      <Footer />
    </>
  )
}

export default Layout
