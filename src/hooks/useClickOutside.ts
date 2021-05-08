// Dependencies
import { RefObject, useEffect } from 'react'
import { document } from 'browser-monads-ts'

/**
 * Execute a function after click outside of the element
 *
 * @param ref - The element to reference
 * @param callback - The function to execute when click outside
 */
const useClickOutside = (ref: RefObject<HTMLElement>, callback: () => void): void => {
  useEffect(() => {
    /**
     * @function handleClickOutside
     *
     * @description
     * Function that execute the callback only if the click is not inside the element
     *
     * @param event - The mouse event
     */
    function handleClickOutside(event: MouseEvent): void {
      if (ref.current && !ref.current.contains(event.target as HTMLElement)) {
        callback()
      }
    }

    // Bind the event listener
    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [ref, callback])
}

export default useClickOutside
