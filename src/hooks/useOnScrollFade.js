import { useState } from "react"
import { useSpring, config } from "react-spring"
import { useIntersectionObserver } from "."

export default ({
  root = null,
  target,
  threshold = 0.5,
  rootMargin = "0px",
}) => {
  const [isIntersected, toggle] = useState()

  const fade = useSpring({
    opacity: isIntersected ? 1 : 0,
    config: {
      ...config.wobbly,
      clamp: true,
    },
  })

  const handleObserver = entries => {
    entries.map(entry => (entry.isIntersecting ? toggle(true) : toggle(false)))
  }

  useIntersectionObserver({
    root,
    target,
    onIntersect: handleObserver,
    threshold,
    rootMargin,
  })

  return fade
}
