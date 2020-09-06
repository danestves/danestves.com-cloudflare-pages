// Dependencies
import { useState, useEffect } from 'react';
import { debounce } from 'lodash';
import { window } from 'browser-monads';

// Types
import { ArgsUseDocumentType } from '../types';

// eslint-disable-next-line
const useDocumentScrollThrottled = (callback: (...args: Array<ArgsUseDocumentType>) => void) => {
  const [, setScrollPosition] = useState(0);
  let previousScrollTop = 0;

  const handleDocumentScroll = () => {
    const { scrollTop: currentScrollTop } = document.documentElement || document.body;

    setScrollPosition(previousPosition => {
      previousScrollTop = previousPosition;
      return currentScrollTop;
    });

    callback({ previousScrollTop, currentScrollTop });
  };

  const handleDocumentScrollThrottled = debounce(handleDocumentScroll, 0);

  useEffect(() => {
    window.addEventListener(`scroll`, handleDocumentScrollThrottled);

    return () => window.removeEventListener(`scroll`, handleDocumentScrollThrottled);
  }, []);
};

export default useDocumentScrollThrottled;
