import React from "react";
interface DetailPaneProps {
    children: React.ReactNode;
    isMobile: boolean;
    isSidePaneVisible: boolean;
    sideWidth: string;
    desktopDetailPaneWidth?: string;
    hydrated: boolean;
    enableDesktopOverlay?: boolean;
    onOverlayClick?: () => void;
}
export declare const DetailPane: React.FC<DetailPaneProps>;
export {};
