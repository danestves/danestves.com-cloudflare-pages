// Dependencies
import { RefObject, useRef, useEffect } from 'react'

/**
 * Naive implementation - in reality would want to attach
 * a window or resize listener. Also use state/layoutEffect instead of ref/effect
 * if this is important to know on initial client render.
 * It would be safer to  return null for unmeasured states.
 *
 * @param ref - The element to reference
 */
const useDimensions = (ref: RefObject<HTMLElement>): { width: number; height: number } => {
  const dimensions = useRef({ width: 0, height: 0 })

  useEffect(() => {
    dimensions.current.width = ref?.current?.offsetWidth || 0
    dimensions.current.height = ref?.current?.offsetHeight || 0
  }, [ref])

  return dimensions.current
}

export default useDimensions
