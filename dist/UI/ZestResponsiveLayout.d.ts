import React from "react";
import { SidePaneProvider, useSidePane, ISidePaneConfig, withSidePane, SidePaneConsumer } from "../context/SidePaneContext";
import type { SidePaneContextValue, WithSidePaneProps, SidePaneCloseEvent, SidePaneListener } from "../context/SidePaneContext";
export interface IProps {
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
export { ISidePaneConfig, useSidePane, SidePaneProvider, withSidePane, SidePaneConsumer };
export type { SidePaneContextValue, WithSidePaneProps, SidePaneCloseEvent, SidePaneListener };
export declare const ZestResponsiveLayout: React.FC<IProps>;
