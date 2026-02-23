import React, { forwardRef } from "react";
import styles from "../Styles/ZestResponsiveLayout.module.css";

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

export const SidePane = forwardRef<HTMLDivElement, SidePaneProps>(
  (
    {
      visible,
      pane,
      title,
      onClose,
      isMobile,
      enableBounceAnimation,
      hydrated,
      sideWidth,
    },
    ref
  ) => {
    if (!visible) return null;

    return (
      <div
        ref={ref}
        className={`${styles.sidePane} ${
          isMobile ? styles.mobileOverlay : styles.desktopPane
        } ${enableBounceAnimation && hydrated ? styles.bounce : ""}`}
        style={{
          width: isMobile ? "100%" : sideWidth,
        }}
      >
        {title && (
          <div className={styles.sidePaneHeader}>
            {title}
            {onClose && (
              <button className={styles.closeButton} onClick={onClose}>
                ×
              </button>
            )}
          </div>
        )}
        {!title && onClose && (
          <button className={styles.closeButton} onClick={onClose}>
            ×
          </button>
        )}
        <div className={styles.sidePaneContent}>{pane}</div>
      </div>
    );
  }
);

SidePane.displayName = "SidePane";
