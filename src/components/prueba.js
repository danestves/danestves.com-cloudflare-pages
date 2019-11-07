import React, { useState } from "react"
import PropTypes from "prop-types"
import { Link } from "gatsby"
import { Navbar } from "."

const Header = ({ open, children, ...props }) => {
  const [isOpen, setIsOpen] = useState(false)

  return <Navbar />
}

export default Header
