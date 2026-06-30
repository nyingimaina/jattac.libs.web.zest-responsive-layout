import React, { createContext, useContext } from "react";

const ZestLayoutDepthContext = createContext<number>(0);

export const useZestLayoutDepth = (): number => useContext(ZestLayoutDepthContext);

export const ZestLayoutDepthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const depth = useZestLayoutDepth();
  return (
    <ZestLayoutDepthContext.Provider value={depth + 1}>
      {children}
    </ZestLayoutDepthContext.Provider>
  );
};
