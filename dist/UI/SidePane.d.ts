import React from "react";
interface SidePaneProps {
    visible: boolean;
    pane: React.ReactNode;
    title?: React.ReactNode;
    onClose?: () => void;
    keepMounted?: boolean;
    isMobile: boolean;
    enableBounceAnimation: boolean;
    hydrated: boolean;
    sideWidth: string;
    className?: string;
    style?: React.CSSProperties;
}
export declare const SidePane: React.ForwardRefExoticComponent<SidePaneProps & React.RefAttributes<HTMLDivElement>>;
export {};
