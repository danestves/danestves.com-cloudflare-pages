import React, { useRef } from "react"
import { animated } from "react-spring"
import { useOnScrollScale } from "../hooks"

export default ({ children, ...props }) => {
  const ref = useRef()
  const scale = useOnScrollScale({
    target: ref,
    threshold: [0.5, 1],
  })

  return (
    <animated.div ref={ref} style={scale} {...props}>
      {children}
    </animated.div>
  )
}
