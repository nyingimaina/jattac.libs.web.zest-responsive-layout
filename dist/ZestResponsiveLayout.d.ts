import React from 'react';

interface IProps {
    sidePane: {
        visible: boolean;
        widthRems?: number;
        pane: React.ReactNode;
        title?: React.ReactNode;
        onClose?: () => void;
    };
    detailPane: React.ReactNode;
    desktopSidePaneWidth?: string;
    enableBounceAnimation?: boolean;
    mobileBreakpointPx?: number;
}
declare const ZestResponsiveLayout: React.FC<IProps>;

export { ZestResponsiveLayout };
export type { IProps };
