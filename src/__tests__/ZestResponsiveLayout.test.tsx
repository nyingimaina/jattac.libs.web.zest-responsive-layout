import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { ZestResponsiveLayout } from "../UI/ZestResponsiveLayout";

jest.mock("../hooks/useIsMobile", () => ({ useIsMobile: () => false }));
jest.mock("../hooks/useIsHydrated", () => ({ useIsHydrated: () => true }));
jest.mock("../hooks/useOutsideClick", () => ({ useOutsideClick: () => {} }));
jest.mock("../hooks/useDraggable", () => ({
  useDraggable: () => ({
    position: { x: 0, y: 0 },
    isDragging: false,
    dragHandleProps: { onMouseDown: jest.fn(), style: { cursor: "grab" } },
    resetPosition: jest.fn(),
    elementRef: { current: null },
  }),
}));

const baseSidePane = {
  visible: true,
  content: <div>side content</div>,
};

describe("ZestResponsiveLayout — overlay click dismiss", () => {
  it("calls onClose when the overlay is clicked in modal mode (default)", () => {
    const onClose = jest.fn();
    const { container } = render(
      <ZestResponsiveLayout sidePane={{ ...baseSidePane, onClose }}>
        <div>main</div>
      </ZestResponsiveLayout>
    );
    const overlay = container.querySelector(".detailOverlay") as HTMLElement;
    fireEvent.click(overlay);
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("does not call onClose when overlay is clicked in nonModal mode", () => {
    const onClose = jest.fn();
    const { container } = render(
      <ZestResponsiveLayout sidePane={{ ...baseSidePane, onClose, nonModal: true }}>
        <div>main</div>
      </ZestResponsiveLayout>
    );
    const overlay = container.querySelector(".detailOverlay") as HTMLElement;
    fireEvent.click(overlay);
    expect(onClose).not.toHaveBeenCalled();
  });
});
