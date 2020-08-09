// Dependencies
import * as React from 'react';

type Props = {
  className?: string;
};

const Clock: React.FC<Props> = props => (
  <svg width={97.16} height={97.16} viewBox="0 0 97 97" {...props}>
    <path d="M48.58 0C21.793 0 0 21.793 0 48.58s21.793 48.58 48.58 48.58 48.58-21.793 48.58-48.58S75.367 0 48.58 0zm0 86.823c-21.087 0-38.244-17.155-38.244-38.243S27.493 10.337 48.58 10.337 86.824 27.492 86.824 48.58 69.667 86.823 48.58 86.823z" />
    <path d="M73.898 47.08H52.066V20.83a4 4 0 00-8 0v30.25a4 4 0 004 4h25.832a4 4 0 000-8z" />
  </svg>
);

export default Clock;
