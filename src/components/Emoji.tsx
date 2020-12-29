// Dependencies
import * as React from 'react'
import * as emojiTrie from 'emoji-trie'

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
  // Methods
  const emojiFound = emojiTrie.atStart(emoji)

  return (
    <span aria-label={emojiFound.description} role="img" {...props}>
      {emojiFound.emoji}
    </span>
  )
}

export default Emoji
