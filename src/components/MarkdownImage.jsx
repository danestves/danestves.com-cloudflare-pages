import React, { useEffect } from "react"
import { document } from "browser-monads"

export default ({ alt, src }) => {
  // useEffect(() => {
  // if ("loading" in HTMLImageElement.prototype) {
  //  const images = document.querySelectorAll('img[loading="lazy"]')
  //  images.forEach(img => {
  //    img.src = img.dataset.src
  //  })
  //} else {
  //  // Dynamically import the LazySizes library
  //  const script = document.createElement("script")
  //  script.src =
  //    "https://cdnjs.cloudflare.com/ajax/libs/lazysizes/4.1.8/lazysizes.min.js"
  //  document.body.appendChild(script)
  //}
  //}, [])

  useEffect(() => {
    const script = document.createElement("script")
    script.src= "https://cdnjs.cloudflare.com/ajax/libs/lazysizes/4.1.8/lazysizes.min.js"
    document.body.appendChild(script)
  }, [])

  return <img src={src} loading="lazy" alt={`${alt} | Daniel Esteves`} />
}
