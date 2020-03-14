// Dependencies
import React from "react"

export default ({ level, children }) => {
  switch (level) {
    case 1:
      return (
        <h1 className="mx-0 my-4 text-4xl leading-relaxed border-b border-gray-400">
          {children}
        </h1>
      )
    case 2:
      return (
        <h2 className="mx-0 my-4 text-4xl leading-relaxed border-b border-gray-400">
          {children}
        </h2>
      )
    case 3:
      return <h3 className="mx-0 my-4 text-3xl leading-relaxed">{children}</h3>
    case 4:
      return <h4 className="mx-0 my-4 text-2xl leading-relaxed">{children}</h4>
    case 5:
      return <h5 className="mx-0 my-4 text-xl leading-relaxed">{children}</h5>
    case 6:
      return <h6 className="mx-0 my-4 text-lg leading-relaxed">{children}</h6>
    default:
      break
  }
}
