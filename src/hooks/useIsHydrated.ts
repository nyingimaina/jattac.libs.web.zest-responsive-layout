import { useState, useEffect } from "react";

/**
 * Hook to detect if the component has hydrated on the client.
 * Useful for preventing SSR mismatches and enabling animations only after mount.
 */
export const useIsHydrated = (): boolean => {
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  return hydrated;
};
