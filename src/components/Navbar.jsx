import React from "react"

export default ({ children }) => {
  return (
    <nav className="relative flex flex-wrap items-center justify-between md:py-4 container mx-auto">
      {children}
    </nav>
  )
}
