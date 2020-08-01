// Dependencies
import React from 'react';
import * as emojiTrie from 'emoji-trie';

export default ({ children }) => {
  const emoji = emojiTrie.atStart(children);

  return (
    <span aria-label={emoji.description} role="img">
      {emoji.emoji}
    </span>
  );
};
