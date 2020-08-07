// Dependencies
import * as React from 'react';
import * as emojiTrie from 'emoji-trie';

const Emoji: React.FC = ({ children }) => {
  const emoji = emojiTrie.atStart(children);

  return (
    <span aria-label={emoji.description} role="img">
      {emoji.emoji}
    </span>
  );
};

export default Emoji;
