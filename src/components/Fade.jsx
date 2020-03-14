// Dependencies
import React, { useRef } from "react"
import { animated } from "react-spring"

// Hooks
import { useOnScrollFade } from "../hooks"

export default ({ children, ...props }) => {
  // States and refs
  const ref = useRef()
  const fade = useOnScrollFade({
    target: ref,
    threshold: [0, 1],
  })

  return (
    <animated.div ref={ref} style={fade} {...props}>
      {children}
    </animated.div>
  )
}
