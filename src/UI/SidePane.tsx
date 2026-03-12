import React, { forwardRef, useEffect } from "react";
import styles from "../Styles/ZestResponsiveLayout.module.css";
import { useDraggable } from "../hooks/useDraggable";

interface SidePaneProps {
  visible: boolean;
  pane: React.ReactNode;
  title?: React.ReactNode;
  onClose?: () => void;
  keepMounted?: boolean;
  isMobile: boolean;
  enableBounceAnimation: boolean;
  enableDesktopOverlay: boolean;
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
      enableDesktopOverlay,
      hydrated,
      sideWidth,
      className,
      style,
    },
    ref
  ) => {
    const isDesktop = !isMobile;
    const { position, isDragging, dragHandleProps, resetPosition } = useDraggable(isDesktop);

    // Reset position when it closes to avoid opening in a weird place
    useEffect(() => {
      if (!visible) {
        resetPosition();
      }
    }, [visible, resetPosition]);

    const transform = isDragging 
      ? `translate(${position.x}px, ${position.y}px)` 
      : visible ? "translateX(0)" : "translateX(110%)";

    return (
      <div
        ref={ref}
        className={`${styles.sidePane} ${
          isMobile ? styles.mobileOverlay : styles.desktopPane
        } ${enableBounceAnimation && hydrated && visible && !isDragging ? styles.bounce : ""} ${
          !visible ? styles.sidePaneHidden : ""
        } ${isDragging ? styles.isDragging : ""} ${className || ""}`}
        style={{
          ...style,
          width: isMobile ? "100%" : sideWidth,
          flexShrink: 0,
          transform: isDesktop ? `translate(${position.x}px, ${position.y}px)` : undefined,
          transition: isDragging ? "none" : undefined, // Disable transition while dragging
        }}
      >
        {(visible || keepMounted) && (
          <>
            <div 
              className={styles.sidePaneHeader}
              {...dragHandleProps}
            >
              {title || <div />} {/* Ensure handle exists even without title */}
              {onClose && (
                <button 
                  className={styles.closeButton} 
                  onClick={onClose}
                  onMouseDown={(e) => e.stopPropagation()} // Prevent drag start when clicking close
                >
                  ×
                </button>
              )}
            </div>
            <div className={styles.sidePaneContent}>{pane}</div>
          </>
        )}
      </div>
    );
  }
);
SidePane.displayName = "SidePane";
