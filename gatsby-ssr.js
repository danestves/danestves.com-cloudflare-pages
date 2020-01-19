import React from "react"
import { StaticKitProvider } from "@statickit/react"

export const wrapRootElement = ({ element }) => (
  <StaticKitProvider site={process.env.GATSBY_SITE}>
    {element}
  </StaticKitProvider>
)
