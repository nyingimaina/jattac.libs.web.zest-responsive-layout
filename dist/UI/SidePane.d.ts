import React from "react";
interface SidePaneProps {
    visible: boolean;
    pane: React.ReactNode;
    title?: React.ReactNode;
    onClose?: () => void;
    isMobile: boolean;
    enableBounceAnimation: boolean;
    hydrated: boolean;
    sideWidth: string;
}
export declare const SidePane: React.ForwardRefExoticComponent<SidePaneProps & React.RefAttributes<HTMLDivElement>>;
export {};
