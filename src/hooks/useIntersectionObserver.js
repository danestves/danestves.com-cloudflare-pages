// Dependencies
import { useEffect } from "react"

export default ({
  root = null,
  target,
  onIntersect,
  threshold = 1.0,
  rootMargin = "0px",
}) => {
  // Effects
  useEffect(() => {
    if (!target) {
      console.error("Inteception Observer needs a target to work")
      return
    }

    const newRoot = root ? root.current : root

    const observer = new IntersectionObserver(onIntersect, {
      newRoot,
      rootMargin,
      threshold,
    })

    observer.observe(target.current)
    // eslint-disable-next-line consistent-return
    return () => observer.disconnect()
  }, [root, target, onIntersect, threshold, rootMargin])
}
