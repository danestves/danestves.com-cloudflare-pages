import React, { useEffect } from "react"
import PropTypes from "prop-types"
import Helmet from "react-helmet"
import useDarkMode from "use-dark-mode"
import { document } from "browser-monads"

import { Header } from "."
import "./styles.css"

const Layout = ({ children }) => {
  const darkmode = useDarkMode()
  
  useEffect(() => {
    document.getElementById("year").innerHTML = new Date().getFullYear();
  }, [])

  return (
    <>
      <Header />
      <Helmet
        htmlAttributes={{
          class: darkmode.value ? "dark-mode" : "light-mode",
        }}
        bodyAttributes={{
          class:
            "bg-gray-200 dark:bg-gray-900 dark:text-white transition-all transition-250",
        }}
      />
      <main className="container px-5 mx-auto xl:px-0">{children}</main>
      <footer className="py-5 mt-5 bg-white shadow dark:bg-indigo-900">
        <div className="container">
          <p className="text-sm">
            Daniel Esteves © <span id="year" /> - Todos los derechos reservados
          </p>
        </div>
      </footer>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
