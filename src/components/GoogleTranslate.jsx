import React, { useEffect } from "react"
import { document, window } from "browser-monads"

export default () => {
  useEffect(() => {
    const mutationObserver = new MutationObserver(mutations => {
      mutations.forEach(mutation => {
        console.log("MUTATION > ", mutation)

        const iframeGoogle = document.querySelector(".goog-te-banner-frame")

        if (iframeGoogle) {
          console.log("iframe")

          const innerDoc =
            iframeGoogle.contentDocument || iframeGoogle.contentWindow.document
          const translateCloseBtn = innerDoc.querySelector(".goog-close-link")

          if (translateCloseBtn) {
            translateCloseBtn.addEventListener("click", () => {
              console.log("click!!")

              window.location.reload()
            })
          }
        }
      })
    })

    if (!window.googleTranslateElementInit) {
      window.googleTranslateElementInit = googleTranslateElementInit.bind(this)
    }

    const scriptLoaded = document.querySelector("#gtranslate-script")

    if (scriptLoaded) scriptLoaded.remove()

    const googleTranslateScript = document.createElement("script")
    googleTranslateScript.id = "gtranslate-script"
    googleTranslateScript.type = "text/javascript"
    googleTranslateScript.async = true
    googleTranslateScript.src =
      "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
    ;(
      document.getElementsByTagName("head")[0] ||
      document.getElementsByTagName("body")[0]
    ).appendChild(googleTranslateScript)

    mutationObserver.observe(document.documentElement, {
      attributes: true,
    })

    return () => {
      if (mutationObserver) mutationObserver.disconnect()
    }
  }, [])

  const googleTranslateElementInit = () => {
    if (!document.querySelector(".goog-te-banner-frame")) {
      new window.google.translate.TranslateElement(
        {
          pageLanguage: "es",
        },
        "google_translate_element"
      )
    }
  }

  return <div id="google_translate_element" />
}
