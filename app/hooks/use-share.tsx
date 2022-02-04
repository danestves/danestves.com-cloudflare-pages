// Dependencies
import * as React from 'react';
import copyToClipboard from 'copy-to-clipboard';

/**
 * Hook that lets you trigger the Web Share API.
 *
 * If the Web Share API is not supported, it copies the content to clipboard.
 *
 * @see https://web.dev/web-share/
 */
function useShare(shareData: ShareData): {
  canShare: boolean;
  hasShared: boolean;
  share: () => void;
} {
  let [hasShared, setShared] = React.useState(false);
  let [canShare, setCanShare] = React.useState(false);

  React.useEffect(() => {
    let canShare = 'share' in navigator;

    setCanShare(canShare);
  }, []);

  React.useEffect(() => {
    if (hasShared) {
      const timeoutId = setTimeout(() => setShared(false), 3000);

      return () => clearTimeout(timeoutId);
    }

    return;
  }, [hasShared]);

  /**
   * Triggers the Share functionality of your device if available.
   * Falls back to copying the content to the clipboard if not supported
   */
  let share = () => {
    let fallbackCopyText =
      shareData.url || shareData.text || shareData.title || '';

    if (navigator.share) {
      navigator
        .share(shareData)
        .then(() => setShared(true))
        .catch(() => {
          const hasCopied = copyToClipboard(fallbackCopyText);
          setShared(hasCopied);
        });
    } else {
      let hasCopied = copyToClipboard(fallbackCopyText);

      setShared(hasCopied);
    }
  };

  return { canShare, hasShared, share };
}

export { useShare };
