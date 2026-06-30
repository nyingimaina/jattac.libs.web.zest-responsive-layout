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

export interface SidePaneCloseEvent {
  paneId: string;
  result: unknown;
}

export type SidePaneListener = (event: SidePaneCloseEvent) => void;

export interface SidePaneContextValue {
  openSidePane: <TResult = unknown>(config: ISidePaneConfig) => Promise<TResult>;
  closeSidePane: <TResult = unknown>(result?: TResult) => void;
  subscribe: (listener: SidePaneListener) => () => void;
  stack: InternalConfig[];
  stackLength: number;
}

const SidePaneContext = createContext<SidePaneContextValue | null>(null);

export const SidePaneProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const idCounterRef = useRef(0);
  const [stack, setStack] = useState<InternalConfig[]>([]);
  const pendingResolvesRef = useRef<Map<string, (result: unknown) => void>>(new Map());
  const listenersRef = useRef<Set<SidePaneListener>>(new Set());

  const openSidePane = useCallback(<TResult,>(config: ISidePaneConfig): Promise<TResult> => {
    const id = `zest-sidepane-${++idCounterRef.current}`;
    return new Promise<TResult>((resolve) => {
      pendingResolvesRef.current.set(id, resolve as (result: unknown) => void);
      const internal: InternalConfig = { ...config, _id: id };
      setStack(prev => [...prev, internal]);
    });
  }, []);

  const closeSidePane = useCallback(<TResult,>(result?: TResult) => {
    setStack(prev => {
      if (prev.length === 0) return prev;
      const top = prev[prev.length - 1];
      top.onClose?.();
      const resolve = pendingResolvesRef.current.get(top._id);
      resolve?.(result);
      pendingResolvesRef.current.delete(top._id);
      const event: SidePaneCloseEvent = { paneId: top._id, result };
      listenersRef.current.forEach(l => l(event));
      return prev.slice(0, -1);
    });
  }, []);

  const subscribe = useCallback((listener: SidePaneListener): () => void => {
    listenersRef.current.add(listener);
    return () => {
      listenersRef.current.delete(listener);
    };
  }, []);

  return (
    <SidePaneContext.Provider
      value={{
        openSidePane,
        closeSidePane,
        subscribe,
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
    return {
      openSidePane: <TResult,>(_config: ISidePaneConfig) => Promise.resolve<TResult>(undefined as unknown as TResult),
      closeSidePane: <TResult,>(_result?: TResult) => {},
      subscribe: (_listener: SidePaneListener) => () => {},
      stack: [],
      stackLength: 0,
    };
  }
  return ctx;
};

export interface WithSidePaneProps {
  openSidePane: <TResult = unknown>(config: ISidePaneConfig) => Promise<TResult>;
  closeSidePane: <TResult = unknown>(result?: TResult) => void;
  subscribe: (listener: SidePaneListener) => () => void;
  stackLength: number;
}

export function withSidePane<P extends WithSidePaneProps>(
  Component: React.ComponentType<P>
): React.FC<Omit<P, keyof WithSidePaneProps>> {
  const displayName = Component.displayName || Component.name || "Component";
  const Wrapped: React.FC<Omit<P, keyof WithSidePaneProps>> = (props) => {
    const sidePane = useSidePane();
    return <Component {...(props as P)} {...(sidePane as unknown as WithSidePaneProps)} />;
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
