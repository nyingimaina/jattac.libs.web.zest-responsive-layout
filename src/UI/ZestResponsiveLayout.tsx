import React, { useState, useEffect, useRef } from "react";
import styles from "../Styles/ZestResponsiveLayout.module.css";

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
  enableBounceAnimation?: boolean;
  mobileBreakpointPx?: number;
}

export const ZestResponsiveLayout: React.FC<IProps> = ({
  sidePane,
  detailPane,
  desktopSidePaneWidth,
  enableBounceAnimation = true,
  mobileBreakpointPx = 768,
}) => {
  const [isMobile, setIsMobile] = useState(false);
  const [hydrated, setHydrated] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);

  const handleResize = () => {
    const rem = parseFloat(getComputedStyle(document.documentElement).fontSize);
    setIsMobile(window.innerWidth / rem <= mobileBreakpointPx / rem);
  };

  const handleOutsideClick = (e: MouseEvent) => {
    if (
      sidePane.visible &&
      isMobile &&
      overlayRef.current &&
      !overlayRef.current.contains(e.target as Node)
    ) {
      sidePane.onClose?.();
    }
  };

  useEffect(() => {
    setHydrated(true);
    handleResize();
    window.addEventListener("resize", handleResize);
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [sidePane.visible, isMobile]);

  const sideWidth = sidePane.widthRems
    ? `${sidePane.widthRems}rem`
    : desktopSidePaneWidth || "25%";

  return (
    <div className={styles.container}>
      <div
        className={styles.detailPane}
        style={{
          flex:
            !isMobile && sidePane.visible
              ? `0 0 calc(100% - ${sideWidth})`
              : "1 1 100%",
          opacity: hydrated && !isMobile ? 1 : undefined,
          transition: hydrated
            ? "flex 250ms ease, opacity 250ms ease"
            : undefined,
        }}
      >
        {detailPane}
      </div>

      {sidePane.visible && (
        <div
          ref={overlayRef}
          className={`${styles.sidePane} ${
            isMobile ? styles.mobileOverlay : styles.desktopPane
          } ${enableBounceAnimation && hydrated ? styles.bounce : ""}`}
          style={{
            width: isMobile ? "100%" : sideWidth,
          }}
        >
          {sidePane.title && (
            <div className={styles.sidePaneHeader}>
              {sidePane.title}
              {sidePane.onClose && (
                <button
                  className={styles.closeButton}
                  onClick={sidePane.onClose}
                >
                  ×
                </button>
              )}
            </div>
          )}
          {!sidePane.title && sidePane.onClose && (
            <button className={styles.closeButton} onClick={sidePane.onClose}>
              ×
            </button>
          )}
          <div className={styles.sidePaneContent}>{sidePane.pane}</div>
        </div>
      )}
    </div>
  );
};
