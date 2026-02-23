import { RefObject } from "react";
/**
 * Hook to detect clicks outside of a specified element.
 *
 * @param ref React ref of the element to watch.
 * @param callback Function to call when an outside click is detected.
 * @param active Boolean to enable/disable the listener.
 */
export declare const useOutsideClick: (ref: RefObject<HTMLElement>, callback: () => void, active?: boolean) => void;
