import { useEffect, RefObject } from "react";

/**
 * Hook to detect clicks outside of a specified element.
 * 
 * @param ref React ref of the element to watch.
 * @param callback Function to call when an outside click is detected.
 * @param active Boolean to enable/disable the listener.
 */
export const useOutsideClick = (
  ref: RefObject<HTMLElement>,
  callback: () => void,
  active: boolean = true
): void => {
  useEffect(() => {
    if (!active) return;

    const handleOutsideClick = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        callback();
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [ref, callback, active]);
};
