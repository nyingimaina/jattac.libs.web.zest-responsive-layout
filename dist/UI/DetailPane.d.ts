import React from "react";
interface DetailPaneProps {
    children: React.ReactNode;
    sideWidth: string;
    desktopDetailPaneWidth?: string;
    hydrated: boolean;
    isMobile: boolean;
    isSidePaneVisible: boolean;
    enableDesktopOverlay: boolean;
}
export declare const DetailPane: React.FC<DetailPaneProps>;
export {};
