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

  /** Suppress the dev-mode error when this layout is nested inside another layout's active sidepane stack. */
  suppressNestedStackWarning?: boolean;
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
  suppressNestedStackWarning = false,
}) => {
  const overlayRef = useRef<HTMLDivElement>(null);
  const hydrated = useIsHydrated();
  const isMobile = useIsMobile(mobileBreakpointPx);
  const { stack, stackLength, closeSidePane } = useSidePane();
  const hasStack = stackLength > 0;
  const layoutDepth = useZestLayoutDepth();
  const hasLocalSidePane = sidePane != null;

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

  if (process.env.NODE_ENV !== "production") {
    const isNestedAntiPattern = layoutDepth > 0 && stackLength > 0;
    if (isNestedAntiPattern && !suppressNestedStackWarning) {
      throw new Error(
        `[Zest] Nested ZestResponsiveLayout detected inside an active sidepane context stack.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

WHAT HAPPENED:

This ZestResponsiveLayout is rendered inside content that belongs to a sidepane
opened via the programmatic context stack (openSidePane / SidePaneProvider).

Because all ZestResponsiveLayout instances share a single global SidePaneContext,
this nested layout reads the same stack entries and re-renders them — including
the sidepane that contains this very component — creating a self-referential
render loop that causes a stack overflow.

WHY THIS IS AN ANTI-PATTERN:

The SidePaneContext stack is designed to be consumed by the layout that hosts
the SidePaneProvider. Nested layouts should manage their own sidepanes
independently via the \`sidePane\` prop instead of reading the ancestor's context
stack. Even a sidepane with \`visible: false\` is sufficient to break the cycle.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

HOW TO FIX (pick one, Option A is recommended):

  Option A — Give this layout its own sidePane prop:

    <ZestResponsiveLayout
      sidePane={{ visible: false }}   // ← invisible, but breaks the cycle
    >
      {children}
    </ZestResponsiveLayout>

    If you need this layout to show a sidepane, configure \`sidePane.visible\`
    dynamically based on your state.

  Option B — Restructure the component tree:

    Move this ZestResponsiveLayout outside of the sidepane content that wraps it.

  Option C — Use separate SidePaneProvider boundaries:

    Wrap the nested subtree in its own <SidePaneProvider> if you truly need
    independent programmatic sidepanes.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

TEMPORARY WORKAROUND:

  Add \`suppressNestedStackWarning\` to this component:

    <ZestResponsiveLayout suppressNestedStackWarning>
      {children}
    </ZestResponsiveLayout>

  This suppresses the error and falls through to the safe rendering path (your
  own sidePane prop takes priority). Do NOT rely on this permanently — restructure
  your code following Option A, B, or C above.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

For more details, see:
https://github.com/nyingimaina/jattac.libs.web.zest-responsive-layout/blob/main/docs/faq.md`
      );
    }
  }

  const sidePaneVisible = hasLocalSidePane
    ? (sidePane?.visible ?? false)
    : hasStack;

  const handleCloseTop = () => {
    if (hasLocalSidePane) {
      sidePane?.onClose?.();
    } else if (hasStack) {
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

      {hasLocalSidePane ? (
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
      ) : hasStack ? (
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
      ) : null}
    </div>
    </ZestLayoutDepthProvider>
  );
};


