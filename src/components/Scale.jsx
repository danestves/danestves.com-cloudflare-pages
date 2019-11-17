import React, { useRef } from "react"
import { animated } from "react-spring"
import { useOnScrollScale } from "../hooks"

export default ({ children, ...props }) => {
  const ref = useRef()
  const fade = useOnScrollScale({
    target: ref,
    threshold: [0, 1],
  })

  return (
    <animated.div ref={ref} style={fade} {...props}>
      {children}
    </animated.div>
  )
}
