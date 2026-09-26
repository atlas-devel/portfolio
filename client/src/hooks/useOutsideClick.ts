import { RefObject, useEffect } from "react";

const useOutsideClick = <T extends HTMLElement>(
  ref: RefObject<T | null>,
  onOutsideClick: () => void,
) => {
  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) onOutsideClick();
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [onOutsideClick, ref]);
};

export default useOutsideClick;
