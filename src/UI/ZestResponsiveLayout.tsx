import React, { useRef, useEffect } from "react";
import styles from "../Styles/ZestResponsiveLayout.module.css";
import { useIsMobile } from "../hooks/useIsMobile";
import { useIsHydrated } from "../hooks/useIsHydrated";

import { DetailPane } from "./DetailPane";
import { SidePane } from "./SidePane";
import { SidePaneProvider, useSidePane, ISidePaneConfig, withSidePane, SidePaneConsumer } from "../context/SidePaneContext";
import { ZestLayoutDepthProvider, useZestLayoutDepth } from "../context/ZestLayoutDepthContext";

import type { SidePaneContextValue, WithSidePaneProps, SidePaneCloseEvent, SidePaneListener } from "../context/SidePaneContext";

export interface IProps {
  children?: React.ReactNode;

  sidePane?: {
    visible: boolean;
    content?: React.ReactNode;
    title?: React.ReactNode;
    onClose?: () => void;
    keepMounted?: boolean;
    className?: string;
    style?: React.CSSProperties;
  };

  sidePaneWidth?: string;
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
  sidePane,
  sidePaneWidth = "25%",
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
  const hasLocalSidePane = sidePane != null;
  const layoutDepth = useZestLayoutDepth();
  const showOwnSidePane = hasLocalSidePane && ((sidePane?.visible ?? false) || layoutDepth > 0);

  const sidePaneVisible = showOwnSidePane
    ? (sidePane?.visible ?? false)
    : layoutDepth === 0 && hasStack;

  const handleCloseTop = () => {
    if (showOwnSidePane) {
      sidePane?.onClose?.();
    } else if (layoutDepth === 0 && hasStack) {
      closeSidePane();
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
    <ZestLayoutDepthProvider>
    <div
      className={`${styles.container} ${className || ""}`}
      style={style}
    >
      <DetailPane
        isMobile={isMobile}
        isSidePaneVisible={sidePaneVisible}
        sideWidth={sidePaneWidth}
        desktopDetailPaneWidth={desktopDetailPaneWidth}
        hydrated={hydrated}
        enableDesktopOverlay={enableDesktopOverlay}
      >
        {children}
      </DetailPane>

      <div
        className={`${styles.detailOverlay} ${showOverlay ? styles.detailOverlayVisible : ""}`}
        onClick={handleOverlayClick}
        aria-hidden="true"
      />

      {showOwnSidePane ? (
        <SidePane
          ref={overlayRef}
          visible={sidePane.visible}
          pane={sidePane.content}
          title={sidePane.title}
          onClose={sidePane.onClose}
          keepMounted={sidePane.keepMounted}
          isMobile={isMobile}
          enableBounceAnimation={enableBounceAnimation}
          enableDesktopOverlay={enableDesktopOverlay}
          hydrated={hydrated}
          sideWidth={sidePaneWidth}
          className={sidePane.className}
          style={sidePane.style}
        />
      ) : layoutDepth === 0 && hasStack ? (
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
              sideWidth={sidePaneWidth}
              preservePositionOnHide={true}
              className={config.className}
              style={config.style}
            />
          );
        })
      ) : null}
    </div>
    </ZestLayoutDepthProvider>
  );
};


