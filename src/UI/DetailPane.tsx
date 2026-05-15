import React, { useRef, useEffect } from "react";
import styles from "../Styles/ZestResponsiveLayout.module.css";

interface DetailPaneProps {
  children: React.ReactNode;
  sideWidth: string;
  desktopDetailPaneWidth?: string;
  hydrated: boolean;
  isMobile: boolean;
  isSidePaneVisible: boolean;
  enableDesktopOverlay: boolean;
}

export const DetailPane: React.FC<DetailPaneProps> = ({
  children,
  sideWidth,
  desktopDetailPaneWidth,
  hydrated,
  isMobile,
  isSidePaneVisible,
  enableDesktopOverlay,
}) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (isSidePaneVisible) {
      el.setAttribute("inert", "");
      el.setAttribute("aria-hidden", "true");
    } else {
      el.removeAttribute("inert");
      el.removeAttribute("aria-hidden");
    }
  }, [isSidePaneVisible]);

  return (
    <div
      ref={ref}
      className={styles.detailPane}
      style={{
        flex: "1 1 100%",
        width: "100%",
        opacity: hydrated && !isMobile ? 1 : undefined,
        transition: hydrated
          ? "opacity 250ms ease"
          : undefined,
        overflow: "auto",
      }}
    >
      {children}
    </div>
  );
};
