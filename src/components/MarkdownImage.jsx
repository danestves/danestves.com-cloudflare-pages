// Dependencies
import React, { useEffect } from "react"
import { document } from "browser-monads"

export default ({ alt, src }) => {
  // Effects
  useEffect(() => {
    const script = document.createElement("script")
    script.src =
      "https://cdnjs.cloudflare.com/ajax/libs/lazysizes/4.1.8/lazysizes.min.js"
    document.body.appendChild(script)
  }, [])

  // Render
  return <img data-src={src} alt={`${alt} | Daniel Esteves`} className="lazy" />
}
