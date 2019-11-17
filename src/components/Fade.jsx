import React, { useRef } from "react"
import { animated } from "react-spring"
import { useOnScrollFade } from "../hooks"

export default ({ children, ...props }) => {
  const ref = useRef()
  const fade = useOnScrollFade({
    target: ref,
    threshold: [0.3, 1],
  })

  return (
    <animated.div ref={ref} style={fade} {...props}>
      {children}
    </animated.div>
  )
}
