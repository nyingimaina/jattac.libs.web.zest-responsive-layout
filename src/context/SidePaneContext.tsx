import React, { createContext, useContext, useState, useCallback, useRef } from "react";

export interface ISidePaneConfig {
  content: React.ReactNode;
  title?: React.ReactNode;
  onClose?: () => void;
  keepMounted?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

interface InternalConfig extends ISidePaneConfig {
  _id: string;
}

export interface SidePaneContextValue {
  openSidePane: (config: ISidePaneConfig) => void;
  closeSidePane: () => void;
  stack: InternalConfig[];
  stackLength: number;
}

const SidePaneContext = createContext<SidePaneContextValue | null>(null);

export const SidePaneProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const idCounterRef = useRef(0);
  const [stack, setStack] = useState<InternalConfig[]>([]);

  const openSidePane = useCallback((config: ISidePaneConfig) => {
    const id = `zest-sidepane-${++idCounterRef.current}`;
    const internal: InternalConfig = { ...config, _id: id };
    setStack(prev => [...prev, internal]);
  }, []);

  const closeSidePane = useCallback(() => {
    setStack(prev => {
      if (prev.length === 0) return prev;
      const top = prev[prev.length - 1];
      top.onClose?.();
      return prev.slice(0, -1);
    });
  }, []);

  return (
    <SidePaneContext.Provider
      value={{
        openSidePane,
        closeSidePane,
        stack,
        stackLength: stack.length,
      }}
    >
      {children}
    </SidePaneContext.Provider>
  );
};

export const useSidePane = (): SidePaneContextValue => {
  const ctx = useContext(SidePaneContext);
  if (!ctx) {
    return { openSidePane: () => {}, closeSidePane: () => {}, stack: [], stackLength: 0 };
  }
  return ctx;
};

export interface WithSidePaneProps {
  openSidePane: (config: ISidePaneConfig) => void;
  closeSidePane: () => void;
  stackLength: number;
}

export function withSidePane<P extends WithSidePaneProps>(
  Component: React.ComponentType<P>
): React.FC<Omit<P, keyof WithSidePaneProps>> {
  const displayName = Component.displayName || Component.name || "Component";
  const Wrapped: React.FC<Omit<P, keyof WithSidePaneProps>> = (props) => {
    const sidePane = useSidePane();
    return <Component {...(props as P)} {...(sidePane as WithSidePaneProps)} />;
  };
  Wrapped.displayName = `withSidePane(${displayName})`;
  return Wrapped;
}

export interface SidePaneConsumerProps {
  children: (value: SidePaneContextValue) => React.ReactNode;
}

export const SidePaneConsumer: React.FC<SidePaneConsumerProps> = ({ children }) => {
  const value = useSidePane();
  return <>{children(value)}</>;
};
