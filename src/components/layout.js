/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import Helmet from "react-helmet"
import "./styles.css"

import { Header } from "./"

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <Helmet
        bodyAttributes={{
          class: "bg-gray-200",
        }}
      />
      <main className="container mx-auto px-2 md:px-0">{children}</main>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
