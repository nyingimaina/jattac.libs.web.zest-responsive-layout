import React, { PureComponent } from 'react';

interface IProps {
    sidePane: {
        visible: boolean;
        /** Defaults to 30 if not provided by developer */
        widthRems?: number;
        pane: React.ReactNode;
        title: React.ReactNode;
        onClose?: () => void;
    };
    detailPane: React.ReactNode;
    /** Custom width for the side pane in desktop view, e.g., "300px" or "30vw" */
    desktopSidePaneWidth?: string;
    /** Custom width for the detail pane in desktop view, e.g., "700px" or "70vw" */
    desktopDetailPaneWidth?: string;
    /** Enables a bounce animation for the side pane transitions. */
    enableBounceAnimation?: boolean;
    /** Custom pixel width for the mobile breakpoint. Defaults to 768px if not provided. */
    mobileBreakpointPx?: number;
}
declare class ResponsiveLayout extends PureComponent<IProps> {
    #private;
    render(): React.JSX.Element;
}

export { ResponsiveLayout as default };
