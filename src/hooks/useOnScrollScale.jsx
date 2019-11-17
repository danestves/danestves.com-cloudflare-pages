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

  const scale = useSpring({
    transform: isIntersected
      ? `translateY(${0}%) scale(${1})`
      : `translateY(${100}%) scale(${0})`,
    config: {
      ass: 1,
      tension: 200,
      friction: 30,
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

  return scale
}
