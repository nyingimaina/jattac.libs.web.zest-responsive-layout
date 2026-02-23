import React from "react";
export interface IProps {
    /**
     * Main content area.
     * @preferred Use children instead of detailPane.
     */
    children?: React.ReactNode;
    /** @deprecated Use children. */
    detailPane?: React.ReactNode;
    sidePane: {
        visible: boolean;
        /** Sidebar content. @preferred Use content instead of pane. */
        content?: React.ReactNode;
        /** @deprecated Use content. */
        pane?: React.ReactNode;
        title?: React.ReactNode;
        onClose?: () => void;
        keepMounted?: boolean;
        /** @legacy Use sidePaneWidth. */
        widthRems?: number;
        className?: string;
        style?: React.CSSProperties;
    };
    /** Preferred way to set sidebar width (e.g., '300px', '25%'). */
    sidePaneWidth?: string;
    /** @deprecated Use sidePaneWidth. */
    desktopSidePaneWidth?: string;
    /** @deprecated Use Flexbox properties or container styling instead. */
    desktopDetailPaneWidth?: string;
    enableBounceAnimation?: boolean;
    mobileBreakpointPx?: number;
    enableDesktopOverlay?: boolean;
    closeOnDesktopOverlayClick?: boolean;
    /** Custom class for the root container. */
    className?: string;
    /** Custom style for the root container. */
    style?: React.CSSProperties;
}
/**
 * ZestResponsiveLayout (v2.0.0)
 * A highly performant responsive layout with a dynamic side pane.
 * Now supports standard React 'children' and improved styling hooks.
 */
export declare const ZestResponsiveLayout: React.FC<IProps>;
