import React, { PureComponent } from "react";
// import HorizontalDivider from "../../Divider/UI/HorizontalDivider";
import styles from "../Styles/ResponsiveLayout.module.css";

interface IProps {
  sidePane: {
    visible: boolean;
    /** Defaults to 30 if not provided by developer */
    widthRems?: number;
    pane: React.ReactNode;
    title: React.ReactNode;
    onClose?: () => void;
  };

  detailPane: React.ReactNode;
  /** Custom width for the side pane in desktop view, e.g., "300px" or "30vw" */
  desktopSidePaneWidth?: string;
  /** Custom width for the detail pane in desktop view, e.g., "700px" or "70vw" */
  desktopDetailPaneWidth?: string;
  /** Enables a bounce animation for the side pane transitions. */
  enableBounceAnimation?: boolean;
  /** Custom pixel width for the mobile breakpoint. Defaults to 768px if not provided. */
  mobileBreakpointPx?: number;
}

export default class ZestResponsiveLayout extends PureComponent<IProps> {
  // Removed #getPixelsFromRem as it's no longer needed without Allotment

  // Determine if it's a mobile view
  get #isMobile(): boolean {
    const breakpoint = this.props.mobileBreakpointPx || 768;
    return window.innerWidth < breakpoint;
  }

  render() {
    const {
      sidePane,
      detailPane,
      desktopSidePaneWidth,
      desktopDetailPaneWidth,
      enableBounceAnimation,
    } = this.props;
    const isSidePaneVisible = sidePane.visible;
    const isMobile = this.#isMobile;

    // Create inline styles for CSS variables
    const containerStyle: React.CSSProperties = {
      ...(desktopSidePaneWidth && {
        "--sidepane-width-desktop": desktopSidePaneWidth,
      }),
      ...(desktopDetailPaneWidth && {
        "--detailpane-width-desktop": desktopDetailPaneWidth,
      }),
    } as React.CSSProperties; // Type assertion to handle custom CSS properties

    // Determine classes for main container and panes
    let containerClasses = styles.container;
    let sidePaneClasses = styles.sidePane;
    let detailPaneClasses = styles.detailPane;

    if (enableBounceAnimation) {
      sidePaneClasses += ` ${styles.noTransition}`;
      detailPaneClasses += ` ${styles.detailPaneNoTransition}`;

      if (isSidePaneVisible) {
        sidePaneClasses += ` ${styles.sidePaneBounceIn}`;
      } else {
        sidePaneClasses += ` ${styles.sidePaneBounceOut}`;
      }
    }

    if (isMobile) {
      if (isSidePaneVisible) {
        sidePaneClasses += ` ${styles.sidePaneOpenMobile}`;
        // On mobile, detail pane is obscured, not shrunk
        detailPaneClasses += ` ${styles.detailPaneHiddenMobile}`;
      } else {
        sidePaneClasses += ` ${styles.sidePaneClosedMobile}`;
      }
    } else {
      // Desktop
      if (isSidePaneVisible) {
        sidePaneClasses += ` ${styles.sidePaneOpenDesktop}`;
        detailPaneClasses += ` ${styles.detailPaneShrunkDesktop}`;
      } else {
        sidePaneClasses += ` ${styles.sidePaneClosedDesktop}`;
      }
    }

    return (
      <div className={containerClasses} style={containerStyle}>
        <div className={sidePaneClasses}>
          {isSidePaneVisible && (
            <>
              <div className={styles.title}>
                <div>{sidePane.title}</div>
                {sidePane.onClose && (
                  <div
                    className={styles.closer}
                    onClick={() => sidePane.onClose?.()}
                  >
                    X
                  </div>
                )}
              </div>
              {/* <HorizontalDivider />  Placeholder for the divider */}
              {sidePane.pane}
            </>
          )}
        </div>
        <div className={detailPaneClasses}>{detailPane}</div>
      </div>
    );
  }
}
