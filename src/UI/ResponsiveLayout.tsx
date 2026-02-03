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
}

export default class ResponsiveLayout extends PureComponent<IProps> {
  // Removed #getPixelsFromRem as it's no longer needed without Allotment

  // Determine if it's a mobile view
  get #isMobile(): boolean {
    return window.innerWidth < 768;
  }

  render() {
    const { sidePane, detailPane } = this.props;
    const isSidePaneVisible = sidePane.visible;
    const isMobile = this.#isMobile;

    // Determine classes for main container and panes
    let containerClasses = styles.container;
    let sidePaneClasses = styles.sidePane;
    let detailPaneClasses = styles.detailPane;

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
      <div className={containerClasses}>
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
