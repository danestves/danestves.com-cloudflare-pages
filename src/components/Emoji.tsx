// Dependencies
import * as React from 'react'
import { findByEmoji } from 'markdown-render-a11y-emojis'

type EmojiProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLSpanElement>,
  HTMLSpanElement
> & {
  emoji: string
}

/**
 * Render accessible emoji following a11y
 *
 * @param {string} emoji - An example emoji like 🙂
 */
const Emoji = ({ emoji, ...props }: EmojiProps): JSX.Element => {
  const emojiFound = findByEmoji(emoji)

  return (
    <span aria-label={emojiFound?.description} role="img" {...props}>
      {emojiFound?.emoji}
    </span>
  )
}

export default Emoji
