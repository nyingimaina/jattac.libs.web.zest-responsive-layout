import React, { PureComponent } from "react";
import styles from "../Styles/ZestResponsiveLayout.module.css";

interface IProps {
  sidePane: {
    visible: boolean;
    widthRems?: number;
    pane: React.ReactNode;
    title: React.ReactNode;
    onClose?: () => void;
  };
  detailPane: React.ReactNode;
  desktopSidePaneWidth?: string;
  enableBounceAnimation?: boolean;
  mobileBreakpointPx?: number;
}

export default class ZestResponsiveLayout extends PureComponent<IProps> {
  // SSR-safe
  get isMobile(): boolean {
    if (typeof window === "undefined") return false;
    return window.innerWidth < (this.props.mobileBreakpointPx ?? 768);
  }

  render() {
    const {
      sidePane,
      detailPane,
      desktopSidePaneWidth,
      enableBounceAnimation,
    } = this.props;

    const isMobile = this.isMobile;
    const isOpen = sidePane.visible;

    const containerStyle: React.CSSProperties = {
      ...(desktopSidePaneWidth && {
        "--sidepane-width-desktop": desktopSidePaneWidth,
      }),
    } as React.CSSProperties;

    // Classes
    let sidePaneClass = styles.sidePane;
    let detailPaneClass = styles.detailPane;

    if (isMobile) {
      sidePaneClass += isOpen
        ? ` ${styles.sidePaneOpenMobile}`
        : ` ${styles.sidePaneClosedMobile}`;

      if (isOpen) {
        detailPaneClass += ` ${styles.detailPaneHiddenMobile}`;
      }
    } else {
      sidePaneClass += isOpen
        ? ` ${styles.sidePaneOpenDesktop}`
        : ` ${styles.sidePaneClosedDesktop}`;
    }

    if (enableBounceAnimation && isMobile && isOpen) {
      sidePaneClass += ` ${styles.bounceIn}`;
    }

    return (
      <div className={styles.container} style={containerStyle}>
        {/* Main content first → ensures side pane renders on right */}
        <main className={detailPaneClass}>{detailPane}</main>

        <aside className={sidePaneClass}>
          {isOpen && (
            <>
              <div className={styles.title}>
                <div>{sidePane.title}</div>
                {sidePane.onClose && (
                  <div className={styles.closer} onClick={sidePane.onClose}>
                    X
                  </div>
                )}
              </div>
              <div className={styles.sidePaneContent}>{sidePane.pane}</div>
            </>
          )}
        </aside>
      </div>
    );
  }
}
