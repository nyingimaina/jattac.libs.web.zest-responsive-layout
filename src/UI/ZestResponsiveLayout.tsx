import React, { useRef, useEffect } from "react";
import styles from "../Styles/ZestResponsiveLayout.module.css";
import { useIsMobile } from "../hooks/useIsMobile";
import { useIsHydrated } from "../hooks/useIsHydrated";

import { DetailPane } from "./DetailPane";
import { SidePane } from "./SidePane";
import { SidePaneProvider, useSidePane, ISidePaneConfig, withSidePane, SidePaneConsumer } from "../context/SidePaneContext";
import type { SidePaneContextValue, WithSidePaneProps, SidePaneCloseEvent, SidePaneListener } from "../context/SidePaneContext";

export interface IProps {
  children?: React.ReactNode;
  detailPane?: React.ReactNode;

  sidePane?: {
    visible: boolean;
    content?: React.ReactNode;
    pane?: React.ReactNode;
    title?: React.ReactNode;
    onClose?: () => void;
    keepMounted?: boolean;
    widthRems?: number;
    className?: string;
    style?: React.CSSProperties;
  };

  sidePaneWidth?: string;
  desktopSidePaneWidth?: string;
  desktopDetailPaneWidth?: string;

  enableBounceAnimation?: boolean;
  mobileBreakpointPx?: number;
  enableDesktopOverlay?: boolean;
  closeOnDesktopOverlayClick?: boolean;

  className?: string;
  style?: React.CSSProperties;
}

export { ISidePaneConfig, useSidePane, SidePaneProvider, withSidePane, SidePaneConsumer };
export type { SidePaneContextValue, WithSidePaneProps, SidePaneCloseEvent, SidePaneListener };

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
  const { stack, stackLength, closeSidePane } = useSidePane();
  const hasStack = stackLength > 0;

  // --- Compat Layer / Deprecation Warnings ---
  useEffect(() => {
    if (process.env.NODE_ENV !== "production") {
      if (detailPane) console.warn("[Zest] 'detailPane' is deprecated. Use 'children' instead.");
      if (sidePane?.pane) console.warn("[Zest] 'sidePane.pane' is deprecated. Use 'sidePane.content' instead.");
      if (desktopSidePaneWidth) console.warn("[Zest] 'desktopSidePaneWidth' is deprecated. Use 'sidePaneWidth' instead.");
      if (sidePane?.widthRems) console.warn("[Zest] 'sidePane.widthRems' is deprecated. Use 'sidePaneWidth' instead.");
    }
  }, [detailPane, sidePane?.pane, desktopSidePaneWidth, sidePane?.widthRems]);

  // --- Prop Aliasing (Polyfill) ---
  const finalContent = children || detailPane;
  const sideContent = sidePane?.content || sidePane?.pane;
  const sideWidth = sidePane?.widthRems
    ? `${sidePane.widthRems}rem`
    : (sidePaneWidth || desktopSidePaneWidth || "25%");

  const sidePaneVisible = hasStack || (sidePane?.visible ?? false);

  const handleCloseTop = () => {
    if (hasStack) {
      closeSidePane();
    } else {
      sidePane?.onClose?.();
    }
  };

  const handleOverlayClick = () => {
    if (closeOnDesktopOverlayClick) {
      handleCloseTop();
    }
  };

  const showOverlay = !isMobile && sidePaneVisible && enableDesktopOverlay;

  useEffect(() => {
    if (process.env.NODE_ENV !== "production" && sidePaneVisible && !isMobile && !enableDesktopOverlay) {
      console.warn(
        "[Zest] SidePane is visible on desktop but `enableDesktopOverlay` is false. " +
        "The main pane overlay will not render. Pass `enableDesktopOverlay={true}` (the default) to restore it."
      );
    }
  }, [sidePaneVisible, isMobile, enableDesktopOverlay]);

  return (
    <div
      className={`${styles.container} ${className || ""}`}
      style={style}
    >
      <DetailPane
        isMobile={isMobile}
        isSidePaneVisible={sidePaneVisible}
        sideWidth={sideWidth}
        desktopDetailPaneWidth={desktopDetailPaneWidth}
        hydrated={hydrated}
        enableDesktopOverlay={enableDesktopOverlay}
      >
        {finalContent}
      </DetailPane>

      <div
        className={`${styles.detailOverlay} ${showOverlay ? styles.detailOverlayVisible : ""}`}
        onClick={handleOverlayClick}
        aria-hidden="true"
      />

      {hasStack ? (
        stack.map((config, index) => {
          const isTop = index === stackLength - 1;
          return (
            <SidePane
              key={config._id}
              ref={isTop ? overlayRef : undefined}
              visible={isTop}
              pane={config.content}
              title={config.title}
              onClose={closeSidePane}
              keepMounted={true}
              isMobile={isMobile}
              enableBounceAnimation={enableBounceAnimation}
              enableDesktopOverlay={enableDesktopOverlay}
              hydrated={hydrated}
              sideWidth={sideWidth}
              preservePositionOnHide={true}
              className={config.className}
              style={config.style}
            />
          );
        })
      ) : sidePane ? (
        <SidePane
          ref={overlayRef}
          visible={sidePane.visible}
          pane={sideContent}
          title={sidePane.title}
          onClose={sidePane.onClose}
          keepMounted={sidePane.keepMounted}
          isMobile={isMobile}
          enableBounceAnimation={enableBounceAnimation}
          enableDesktopOverlay={enableDesktopOverlay}
          hydrated={hydrated}
          sideWidth={sideWidth}
          className={sidePane.className}
          style={sidePane.style}
        />
      ) : null}
    </div>
  );
};


