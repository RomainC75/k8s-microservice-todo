import React, { useEffect, useRef, RefObject } from 'react';

const useOutsideClick = (callback: () => void): RefObject<HTMLLIElement> => {
  const ref = useRef<HTMLLIElement>(null);

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        callback();
      }
    };
    document.addEventListener('click', handleClick);
    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, [callback, ref]);
  return ref;
};

export default useOutsideClick;