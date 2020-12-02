// Dependencies
import * as React from 'react'

// Components
import { Header, Footer } from '@/components'

const Layout: React.FC = ({ children }) => {
  // Render
  return (
    <>
      <Header pathname="/" />

      {children}

      <Footer />
    </>
  )
}

export default Layout
