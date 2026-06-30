import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { SidePane } from "../UI/SidePane";

jest.mock("../hooks/useDraggable", () => ({
  useDraggable: () => ({
    position: { x: 0, y: 0 },
    isDragging: false,
    dragHandleProps: { onMouseDown: jest.fn(), style: { cursor: "grab" } },
    resetPosition: jest.fn(),
    elementRef: { current: null },
  }),
}));

const baseProps = {
  visible: true,
  pane: <div>content</div>,
  isMobile: false,
  enableBounceAnimation: false,
  enableDesktopOverlay: false,
  hydrated: true,
  sideWidth: "300px",
};

describe("SidePane — dismissOnEsc", () => {
  it("calls onClose when Escape is pressed and visible (default on)", () => {
    const onClose = jest.fn();
    render(<SidePane {...baseProps} onClose={onClose} />);
    fireEvent.keyDown(document, { key: "Escape" });
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("calls onClose when Escape is pressed and dismissOnEsc is explicitly true", () => {
    const onClose = jest.fn();
    render(<SidePane {...baseProps} onClose={onClose} dismissOnEsc={true} />);
    fireEvent.keyDown(document, { key: "Escape" });
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("does not call onClose when Escape is pressed and dismissOnEsc is false", () => {
    const onClose = jest.fn();
    render(<SidePane {...baseProps} onClose={onClose} dismissOnEsc={false} />);
    fireEvent.keyDown(document, { key: "Escape" });
    expect(onClose).not.toHaveBeenCalled();
  });

  it("does not call onClose when Escape is pressed and pane is not visible", () => {
    const onClose = jest.fn();
    render(<SidePane {...baseProps} visible={false} onClose={onClose} />);
    fireEvent.keyDown(document, { key: "Escape" });
    expect(onClose).not.toHaveBeenCalled();
  });

  it("does not throw when Escape is pressed and no onClose is provided", () => {
    render(<SidePane {...baseProps} />);
    expect(() => fireEvent.keyDown(document, { key: "Escape" })).not.toThrow();
  });
});
