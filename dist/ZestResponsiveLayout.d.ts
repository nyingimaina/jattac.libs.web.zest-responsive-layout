import React from 'react';

interface ISidePaneConfig {
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
interface SidePaneCloseEvent {
    paneId: string;
    result: unknown;
}
type SidePaneListener = (event: SidePaneCloseEvent) => void;
interface SidePaneContextValue {
    openSidePane: <TResult = unknown>(config: ISidePaneConfig) => Promise<TResult>;
    closeSidePane: <TResult = unknown>(result?: TResult) => void;
    subscribe: (listener: SidePaneListener) => () => void;
    stack: InternalConfig[];
    stackLength: number;
}
declare const SidePaneProvider: React.FC<{
    children: React.ReactNode;
}>;
declare const useSidePane: () => SidePaneContextValue;
interface WithSidePaneProps {
    openSidePane: <TResult = unknown>(config: ISidePaneConfig) => Promise<TResult>;
    closeSidePane: <TResult = unknown>(result?: TResult) => void;
    subscribe: (listener: SidePaneListener) => () => void;
    stackLength: number;
}
declare function withSidePane<P extends WithSidePaneProps>(Component: React.ComponentType<P>): React.FC<Omit<P, keyof WithSidePaneProps>>;
interface SidePaneConsumerProps {
    children: (value: SidePaneContextValue) => React.ReactNode;
}
declare const SidePaneConsumer: React.FC<SidePaneConsumerProps>;

interface IProps {
    children?: React.ReactNode;
    detailPane?: React.ReactNode;
    sidePane?: {
        visible: boolean;
        content?: React.ReactNode;
        pane?: React.ReactNode;
        title?: React.ReactNode;
        onClose?: () => void;
        keepMounted?: boolean;
        widthRems?: number;
        className?: string;
        style?: React.CSSProperties;
    };
    sidePaneWidth?: string;
    desktopSidePaneWidth?: string;
    desktopDetailPaneWidth?: string;
    enableBounceAnimation?: boolean;
    mobileBreakpointPx?: number;
    enableDesktopOverlay?: boolean;
    closeOnDesktopOverlayClick?: boolean;
    className?: string;
    style?: React.CSSProperties;
    /** Suppress the dev-mode error when this layout is nested inside another layout's active sidepane stack. */
    suppressNestedStackWarning?: boolean;
}

declare const ZestResponsiveLayout: React.FC<IProps>;

export { SidePaneConsumer, SidePaneProvider, ZestResponsiveLayout, useSidePane, withSidePane };
export type { IProps, ISidePaneConfig, SidePaneCloseEvent, SidePaneContextValue, SidePaneListener, WithSidePaneProps };
