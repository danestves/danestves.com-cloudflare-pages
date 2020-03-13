import React from "react"

export default ({ href, children }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="font-bold text-indigo-700 underline hover:text-indigo-600 dark:text-white dark:hover:text-gray-300 transition-all duration-200"
  >
    {children}
  </a>
)
