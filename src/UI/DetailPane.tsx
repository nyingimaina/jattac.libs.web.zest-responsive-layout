import React from "react";
import styles from "../Styles/ZestResponsiveLayout.module.css";

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

export const DetailPane: React.FC<DetailPaneProps> = ({
  children,
  isMobile,
  isSidePaneVisible,
  sideWidth,
  desktopDetailPaneWidth,
  hydrated,
  enableDesktopOverlay = true,
  onOverlayClick,
}) => {
  const showOverlay = !isMobile && isSidePaneVisible && enableDesktopOverlay;

  return (
    <div
      className={styles.detailPane}
      style={{
        flex:
          !isMobile && isSidePaneVisible && desktopDetailPaneWidth
            ? `0 0 ${desktopDetailPaneWidth}`
            : "1 1 100%",
        opacity: hydrated && !isMobile ? 1 : undefined,
        transition: hydrated
          ? "flex 250ms ease, opacity 250ms ease"
          : undefined,
      }}
    >
      {children}
      <div 
        className={`${styles.detailOverlay} ${showOverlay ? styles.detailOverlayVisible : ""}`} 
        onClick={onOverlayClick} 
        aria-hidden="true"
      />
    </div>
  );
};
