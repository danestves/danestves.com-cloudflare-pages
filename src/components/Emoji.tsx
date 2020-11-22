// Dependencies
import * as React from 'react'
import * as emojiTrie from 'emoji-trie'

type EmojiProps = React.DetailedHTMLProps<React.HTMLAttributes<HTMLSpanElement>, HTMLSpanElement>

const Emoji: React.FC<EmojiProps> = ({ children, ...props }) => {
  const emoji = emojiTrie.atStart(children)

  return (
    <span aria-label={emoji.description} role="img" {...props}>
      {emoji.emoji}
    </span>
  )
}

export default Emoji
