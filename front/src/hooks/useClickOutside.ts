import { useEffect, useRef, RefObject } from 'react';

const useOutsideClick = (callback: () => void): RefObject<HTMLLIElement> => {
  const ref = useRef<HTMLLIElement>(null);
  const isCallbackCalled = useRef(false);

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node) && !isCallbackCalled.current) {
        callback();
      }
    };
    document.addEventListener('click', handleClick);
    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, [callback, ref]);

  useEffect(() => {
    isCallbackCalled.current = false;
  }, [ref]);
  return ref;
};

export default useOutsideClick;