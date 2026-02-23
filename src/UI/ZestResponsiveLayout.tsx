import React, { useRef } from "react";
import styles from "../Styles/ZestResponsiveLayout.module.css";
import { useIsMobile } from "../hooks/useIsMobile";
import { useIsHydrated } from "../hooks/useIsHydrated";
import { useOutsideClick } from "../hooks/useOutsideClick";
import { DetailPane } from "./DetailPane";
import { SidePane } from "./SidePane";

export interface IProps {
  sidePane: {
    visible: boolean;
    widthRems?: number;
    pane: React.ReactNode;
    title?: React.ReactNode;
    onClose?: () => void;
  };
  detailPane: React.ReactNode;
  desktopSidePaneWidth?: string;
  desktopDetailPaneWidth?: string;
  enableBounceAnimation?: boolean;
  mobileBreakpointPx?: number;
  enableDesktopOverlay?: boolean;
  closeOnDesktopOverlayClick?: boolean;
}

export const ZestResponsiveLayout: React.FC<IProps> = ({
  sidePane,
  detailPane,
  desktopSidePaneWidth,
  desktopDetailPaneWidth,
  enableBounceAnimation = true,
  mobileBreakpointPx = 768,
  enableDesktopOverlay = true,
  closeOnDesktopOverlayClick = true,
}) => {
  const overlayRef = useRef<HTMLDivElement>(null);
  
  const hydrated = useIsHydrated();
  const isMobile = useIsMobile(mobileBreakpointPx);
  
  useOutsideClick(
    overlayRef, 
    () => sidePane.onClose?.(), 
    sidePane.visible && isMobile
  );

  const handleOverlayClick = () => {
    if (closeOnDesktopOverlayClick) {
      sidePane.onClose?.();
    }
  };

  const sideWidth = sidePane.widthRems
    ? `${sidePane.widthRems}rem`
    : desktopSidePaneWidth || "25%";

  return (
    <div className={styles.container}>
      <DetailPane
        isMobile={isMobile}
        isSidePaneVisible={sidePane.visible}
        sideWidth={sideWidth}
        desktopDetailPaneWidth={desktopDetailPaneWidth}
        hydrated={hydrated}
        enableDesktopOverlay={enableDesktopOverlay}
        onOverlayClick={handleOverlayClick}
      >
        {detailPane}
      </DetailPane>

      <SidePane
        ref={overlayRef}
        visible={sidePane.visible}
        pane={sidePane.pane}
        title={sidePane.title}
        onClose={sidePane.onClose}
        isMobile={isMobile}
        enableBounceAnimation={enableBounceAnimation}
        hydrated={hydrated}
        sideWidth={sideWidth}
      />
    </div>
  );
};
