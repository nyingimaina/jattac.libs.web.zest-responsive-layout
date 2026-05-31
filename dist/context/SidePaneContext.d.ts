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
export interface SidePaneContextValue {
    openSidePane: (config: ISidePaneConfig) => void;
    closeSidePane: () => void;
    stack: InternalConfig[];
    stackLength: number;
}
export declare const SidePaneProvider: React.FC<{
    children: React.ReactNode;
}>;
export declare const useSidePane: () => SidePaneContextValue;
export interface WithSidePaneProps {
    openSidePane: (config: ISidePaneConfig) => void;
    closeSidePane: () => void;
    stackLength: number;
}
export declare function withSidePane<P extends WithSidePaneProps>(Component: React.ComponentType<P>): React.FC<Omit<P, keyof WithSidePaneProps>>;
export interface SidePaneConsumerProps {
    children: (value: SidePaneContextValue) => React.ReactNode;
}
export declare const SidePaneConsumer: React.FC<SidePaneConsumerProps>;
export {};
