import React from "react"
import tw from "tailwind.macro"

const Nav = tw.nav`relative flex flex-wrap items-center justify-between md:py-4`

export default ({ children }) => {
  return <Nav className="container mx-auto">{children}</Nav>
}
