import React from "react"

export default ({ children }) => {
  return (
    <nav className="container relative flex flex-wrap items-center justify-between mx-auto md:py-4">
      {children}
    </nav>
  )
}
