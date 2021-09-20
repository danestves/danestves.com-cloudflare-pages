// Dependencies
import * as React from 'react'
import { navigator } from 'browser-monads-ts'
import copyToClipboard from 'copy-to-clipboard'

export type ShareData = {
  /** A title that describes your content */
  title?: string
  /** A text describing what your sharing, or the content itself. */
  text?: string
  /** A URL to the content you're sharing */
  url?: string
}
/**
 * Hook that lets you trigger the Web Share API.
 *
 * If the Web Share API is not supported, it copies the content to clipboard.
 *
 * @see https://web.dev/web-share/
 */
export default function useShare(shareData: ShareData): {
  canShare: boolean
  hasShared: boolean
  share: () => void
} {
  const [hasShared, setShared] = React.useState(false)
  const canShare = 'share' in navigator

  React.useEffect(() => {
    if (hasShared) {
      const timeoutId = setTimeout(() => setShared(false), 3000)

      return () => clearTimeout(timeoutId)
    }

    return
  }, [hasShared])

  /**
   * Triggers the Share functionality of your device if available.
   * Falls back to copying the content to the clipboard if not supported
   */
  const share = () => {
    const fallbackCopyText =
      shareData.url || shareData.text || shareData.title || ''
    if (navigator.share) {
      navigator
        .share(shareData)
        .then(() => setShared(true))
        .catch(() => {
          const hasCopied = copyToClipboard(fallbackCopyText)
          setShared(hasCopied)
        })
    } else {
      const hasCopied = copyToClipboard(fallbackCopyText)

      setShared(hasCopied)
    }
  }

  return { canShare, hasShared, share }
}
