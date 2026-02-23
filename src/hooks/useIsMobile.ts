import { useState, useEffect, useCallback } from "react";

/**
 * Hook to detect if the viewport is within the mobile range.
 * Uses REM-based calculations for consistency with CSS media queries.
 * 
 * @param breakpointPx The pixel width at which to switch to mobile view.
 */
export const useIsMobile = (breakpointPx: number = 768): boolean => {
  const [isMobile, setIsMobile] = useState(false);

  const handleResize = useCallback(() => {
    // We use getComputedStyle to handle cases where the base font-size isn't 16px
    const rem = typeof window !== "undefined" 
      ? parseFloat(getComputedStyle(document.documentElement).fontSize) || 16 
      : 16;
    
    setIsMobile(window.innerWidth / rem <= breakpointPx / rem);
  }, [breakpointPx]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [handleResize]);

  return isMobile;
};
