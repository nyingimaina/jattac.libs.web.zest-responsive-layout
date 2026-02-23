/**
 * Hook to detect if the viewport is within the mobile range.
 * Uses REM-based calculations for consistency with CSS media queries.
 *
 * @param breakpointPx The pixel width at which to switch to mobile view.
 */
export declare const useIsMobile: (breakpointPx?: number) => boolean;
