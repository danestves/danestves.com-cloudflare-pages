import React from "react"

export default ({ href, children }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="text-indigo-700"
  >
    {children}
  </a>
)
