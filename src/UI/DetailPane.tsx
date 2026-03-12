import React from "react";
import styles from "../Styles/ZestResponsiveLayout.module.css";

interface DetailPaneProps {
  children: React.ReactNode;
  sideWidth: string;
  desktopDetailPaneWidth?: string;
  hydrated: boolean;
  isMobile: boolean;
  isSidePaneVisible: boolean;
  enableDesktopOverlay: boolean;
}

export const DetailPane: React.FC<DetailPaneProps> = ({
  children,
  sideWidth,
  desktopDetailPaneWidth,
  hydrated,
  isMobile,
  isSidePaneVisible,
  enableDesktopOverlay,
}) => {
  return (
    <div
      className={styles.detailPane}
      style={{
        flex: "1 1 100%",
        width: "100%",
        opacity: hydrated && !isMobile ? 1 : undefined,
        transition: hydrated
          ? "opacity 250ms ease"
          : undefined,
        overflow: "auto",
      }}
    >
      {children}
    </div>
  );
};
