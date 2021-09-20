// Dependencies
import * as React from 'react'

interface IGeneralObserverProps {
  /** Fires when IntersectionObserver enters viewport */
  onEnter?: (id?: string) => void
  /** The height of the placeholder div before the component renders in */
  height?: number
}

export const GeneralObserver: React.FunctionComponent<IGeneralObserverProps> =
  ({ children, height = 0, ...props }) => {
    const ref = React.useRef<HTMLElement>(null)
    const [isChildVisible, setIsChildVisible] = React.useState(false)

    const onEnter = React.useCallback(() => {
      props.onEnter?.()
    }, [props])

    React.useEffect(() => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.intersectionRatio > 0) {
            setIsChildVisible(true)

            if (onEnter) {
              onEnter()
            }
          }
        },
        {
          root: null,
          rootMargin: '400px',
          threshold: 0,
        }
      )

      if (ref && ref.current) {
        observer.observe(ref.current)
      }
    }, [ref, onEnter])

    return (
      <div
        className="mdx-embed"
        data-testid="general-observer"
        ref={ref as React.RefObject<HTMLDivElement>}
      >
        {isChildVisible ? children : <div style={{ height, width: '100%' }} />}
      </div>
    )
  }

export default GeneralObserver
