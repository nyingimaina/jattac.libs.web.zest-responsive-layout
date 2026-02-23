import React from "react";
export interface IProps {
    sidePane: {
        visible: boolean;
        widthRems?: number;
        pane: React.ReactNode;
        title?: React.ReactNode;
        onClose?: () => void;
        keepMounted?: boolean;
    };
    detailPane: React.ReactNode;
    desktopSidePaneWidth?: string;
    desktopDetailPaneWidth?: string;
    enableBounceAnimation?: boolean;
    mobileBreakpointPx?: number;
    enableDesktopOverlay?: boolean;
    closeOnDesktopOverlayClick?: boolean;
}
export declare const ZestResponsiveLayout: React.FC<IProps>;
