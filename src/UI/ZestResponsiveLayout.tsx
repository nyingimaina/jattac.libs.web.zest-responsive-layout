import React, { useRef, useEffect } from "react";
import styles from "../Styles/ZestResponsiveLayout.module.css";
import { useIsMobile } from "../hooks/useIsMobile";
import { useIsHydrated } from "../hooks/useIsHydrated";
import { useOutsideClick } from "../hooks/useOutsideClick";
import { DetailPane } from "./DetailPane";
import { SidePane } from "./SidePane";

export interface IProps {
  /** 
   * Main content area. 
   * @preferred Use children instead of detailPane. 
   */
  children?: React.ReactNode;
  /** @deprecated Use children. */
  detailPane?: React.ReactNode;

  sidePane: {
    visible: boolean;
    /** Sidebar content. @preferred Use content instead of pane. */
    content?: React.ReactNode;
    /** @deprecated Use content. */
    pane?: React.ReactNode;
    title?: React.ReactNode;
    onClose?: () => void;
    keepMounted?: boolean;
    dismissOnEsc?: boolean;
    dismissOnBack?: boolean;
    nonModal?: boolean;
    /** @legacy Use sidePaneWidth. */
    widthRems?: number;
    className?: string;
    style?: React.CSSProperties;
  };

  /** Preferred way to set sidebar width (e.g., '300px', '25%'). */
  sidePaneWidth?: string;
  /** @deprecated Use sidePaneWidth. */
  desktopSidePaneWidth?: string;
  /** @deprecated Use Flexbox properties or container styling instead. */
  desktopDetailPaneWidth?: string;

  enableBounceAnimation?: boolean;
  mobileBreakpointPx?: number;
  enableDesktopOverlay?: boolean;
  closeOnDesktopOverlayClick?: boolean;
  
  /** Custom class for the root container. */
  className?: string;
  /** Custom style for the root container. */
  style?: React.CSSProperties;
}

/**
 * ZestResponsiveLayout (v2.0.0)
 * A highly performant responsive layout with a dynamic side pane.
 * Now supports standard React 'children' and improved styling hooks.
 */
export const ZestResponsiveLayout: React.FC<IProps> = ({
  children,
  detailPane,
  sidePane,
  sidePaneWidth,
  desktopSidePaneWidth,
  desktopDetailPaneWidth,
  enableBounceAnimation = true,
  mobileBreakpointPx = 768,
  enableDesktopOverlay = true,
  closeOnDesktopOverlayClick = false,
  className,
  style,
}) => {
  const overlayRef = useRef<HTMLDivElement>(null);
  const hydrated = useIsHydrated();
  const isMobile = useIsMobile(mobileBreakpointPx);

  // --- Compat Layer / Deprecation Warnings ---
  useEffect(() => {
    if (process.env.NODE_ENV !== "production") {
      if (detailPane) console.warn("[Zest] 'detailPane' is deprecated. Use 'children' instead.");
      if (sidePane.pane) console.warn("[Zest] 'sidePane.pane' is deprecated. Use 'sidePane.content' instead.");
      if (desktopSidePaneWidth) console.warn("[Zest] 'desktopSidePaneWidth' is deprecated. Use 'sidePaneWidth' instead.");
      if (sidePane.widthRems) console.warn("[Zest] 'sidePane.widthRems' is deprecated. Use 'sidePaneWidth' instead.");
    }
  }, [detailPane, sidePane.pane, desktopSidePaneWidth, sidePane.widthRems]);

  // --- Prop Aliasing (Polyfill) ---
  const finalContent = children || detailPane;
  const sideContent = sidePane.content || sidePane.pane;
  const sideWidth = sidePane.widthRems
    ? `${sidePane.widthRems}rem`
    : (sidePaneWidth || desktopSidePaneWidth || "25%");

  useOutsideClick(
    overlayRef, 
    () => sidePane.onClose?.(), 
    sidePane.visible && isMobile
  );

  const handleOverlayClick = () => {
    if (!sidePane.nonModal) {
      sidePane.onClose?.();
    }
  };

  const showOverlay = !isMobile && sidePane.visible && enableDesktopOverlay && !sidePane.nonModal;

  useEffect(() => {
    if (process.env.NODE_ENV !== "production" && sidePane.visible && !isMobile && !enableDesktopOverlay) {
      console.warn(
        "[Zest] SidePane is visible on desktop but `enableDesktopOverlay` is false. " +
        "The main pane overlay will not render. Pass `enableDesktopOverlay={true}` (the default) to restore it."
      );
    }
  }, [sidePane.visible, isMobile, enableDesktopOverlay]);

  return (
    <div 
      className={`${styles.container} ${className || ""}`} 
      style={style}
    >
      <DetailPane
        isMobile={isMobile}
        isSidePaneVisible={sidePane.visible}
        sideWidth={sideWidth}
        desktopDetailPaneWidth={desktopDetailPaneWidth}
        hydrated={hydrated}
        enableDesktopOverlay={enableDesktopOverlay}
        nonModal={sidePane.nonModal}
      >
        {finalContent}
      </DetailPane>

      <div 
        className={`${styles.detailOverlay} ${showOverlay ? styles.detailOverlayVisible : ""}`} 
        onClick={handleOverlayClick} 
        aria-hidden="true"
      />

      <SidePane
        ref={overlayRef}
        visible={sidePane.visible}
        pane={sideContent}
        title={sidePane.title}
        onClose={sidePane.onClose}
        keepMounted={sidePane.keepMounted}
        dismissOnEsc={sidePane.dismissOnEsc}
        dismissOnBack={sidePane.dismissOnBack}
        isMobile={isMobile}
        enableBounceAnimation={enableBounceAnimation}
        enableDesktopOverlay={enableDesktopOverlay}
        hydrated={hydrated}
        sideWidth={sideWidth}
        className={sidePane.className}
        style={sidePane.style}
      />
    </div>
  );
};
