// Dependencies
import { findByEmoji } from 'markdown-render-a11y-emojis'

type Props = React.DetailedHTMLProps<React.HTMLAttributes<HTMLSpanElement>, HTMLSpanElement> & {
  emoji: string
}

/**
 * Render accessible emoji following a11y
 *
 * @param {string} emoji - An example emoji like 🙂
 */
const Emoji = ({ emoji, ...props }: Props): JSX.Element => {
  const emojiFound = findByEmoji(emoji)

  return (
    <span aria-label={emojiFound?.description} role="img" {...props}>
      {emojiFound?.emoji}
    </span>
  )
}

export default Emoji
