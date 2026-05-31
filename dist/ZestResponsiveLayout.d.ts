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
interface SidePaneContextValue {
    openSidePane: (config: ISidePaneConfig) => void;
    closeSidePane: () => void;
    stack: InternalConfig[];
    stackLength: number;
}
declare const SidePaneProvider: React.FC<{
    children: React.ReactNode;
}>;
declare const useSidePane: () => SidePaneContextValue;
interface WithSidePaneProps {
    openSidePane: (config: ISidePaneConfig) => void;
    closeSidePane: () => void;
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
}

declare const ZestResponsiveLayout: React.FC<IProps>;

export { SidePaneConsumer, SidePaneProvider, ZestResponsiveLayout, useSidePane, withSidePane };
export type { IProps, ISidePaneConfig, SidePaneContextValue, WithSidePaneProps };
