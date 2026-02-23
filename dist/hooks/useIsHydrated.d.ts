/**
 * Hook to detect if the component has hydrated on the client.
 * Useful for preventing SSR mismatches and enabling animations only after mount.
 */
export declare const useIsHydrated: () => boolean;
