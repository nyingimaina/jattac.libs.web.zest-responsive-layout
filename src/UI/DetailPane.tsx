import React from "react";
import styles from "../Styles/ZestResponsiveLayout.module.css";

interface DetailPaneProps {
  children: React.ReactNode;
  sideWidth: string;
  desktopDetailPaneWidth?: string;
  hydrated: boolean;
  isMobile: boolean;
  isSidePaneVisible: boolean;
}

export const DetailPane: React.FC<DetailPaneProps> = ({
  children,
  sideWidth,
  desktopDetailPaneWidth,
  hydrated,
  isMobile,
  isSidePaneVisible,
}) => {
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
    </div>
  );
};
