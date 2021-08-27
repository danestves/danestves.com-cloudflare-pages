// Internals
import Header from './Header'
import Footer from './Footer'

export const Layout: React.FC = ({ children }) => {
  return (
    <>
      <Header />

      {children}

      <Footer />
    </>
  )
}

export default Layout
