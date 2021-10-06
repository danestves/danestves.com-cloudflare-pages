// Dependencies
import * as React from 'react'
import { window } from 'browser-monads-ts'

function on<T extends Window | Document | HTMLElement | EventTarget>(
  obj: T | null,
  ...args:
    | Parameters<T['addEventListener']>
    | [string, () => void | null, ...any]
): void {
  if (obj && obj.addEventListener) {
    obj.addEventListener(
      ...(args as Parameters<HTMLElement['addEventListener']>)
    )
  }
}

function off<T extends Window | Document | HTMLElement | EventTarget>(
  obj: T | null,
  ...args:
    | Parameters<T['removeEventListener']>
    | [string, () => void | null, ...any]
): void {
  if (obj && obj.removeEventListener) {
    obj.removeEventListener(
      ...(args as Parameters<HTMLElement['removeEventListener']>)
    )
  }
}

export interface State {
  x: number
  y: number
}

export const useWindowScroll = (): State => {
  const [state, setState] = React.useState<State>(() => ({
    x: window ? window.scrollX : 0,
    y: window ? window.scrollY : 0,
  }))

  React.useEffect(() => {
    const handler = () => {
      setState((state) => {
        const { scrollX, scrollY } = window
        //Check state for change, return same state if no change happened to prevent rerender
        //(see useState/setState documentation). useState/setState is used internally in useRafState/setState.
        return state.x !== scrollX || state.y !== scrollY
          ? {
              x: scrollX,
              y: scrollY,
            }
          : state
      })
    }

    //We have to update window scroll at mount, before subscription.
    //Window scroll may be changed between render and effect handler.
    handler()

    on(window, 'scroll', handler, {
      capture: false,
      passive: true,
    })

    return () => {
      off(window, 'scroll', handler)
    }
  }, [])

  return state
}
