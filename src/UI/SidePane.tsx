import React, { forwardRef } from "react";
import styles from "../Styles/ZestResponsiveLayout.module.css";

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

export const SidePane = forwardRef<HTMLDivElement, SidePaneProps>(
  (
    {
      visible,
      pane,
      title,
      onClose,
      keepMounted = false,
      isMobile,
      enableBounceAnimation,
      hydrated,
      sideWidth,
      className,
      style,
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={`${styles.sidePane} ${
          isMobile ? styles.mobileOverlay : styles.desktopPane
        } ${enableBounceAnimation && hydrated && visible ? styles.bounce : ""} ${
          !visible ? styles.sidePaneHidden : ""
        } ${className || ""}`}
        style={{
          ...style,
          width: isMobile ? "100%" : sideWidth,
          marginLeft: !isMobile && !visible ? `calc(-1 * (${sideWidth} + 2rem))` : "0",
          flexShrink: 0,
        }}
      >
        {(visible || keepMounted) && (
          <>
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
          </>
        )}
      </div>
    );
  }
);
SidePane.displayName = "SidePane";
