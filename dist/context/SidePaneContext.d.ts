import React from "react";
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
export declare const SidePaneProvider: React.FC<{
    children: React.ReactNode;
}>;
export declare const useSidePane: () => SidePaneContextValue;
export interface WithSidePaneProps {
    openSidePane: <TResult = unknown>(config: ISidePaneConfig) => Promise<TResult>;
    closeSidePane: <TResult = unknown>(result?: TResult) => void;
    subscribe: (listener: SidePaneListener) => () => void;
    stackLength: number;
}
export declare function withSidePane<P extends WithSidePaneProps>(Component: React.ComponentType<P>): React.FC<Omit<P, keyof WithSidePaneProps>>;
export interface SidePaneConsumerProps {
    children: (value: SidePaneContextValue) => React.ReactNode;
}
export declare const SidePaneConsumer: React.FC<SidePaneConsumerProps>;
export {};
