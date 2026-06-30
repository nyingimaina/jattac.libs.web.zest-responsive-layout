import React from "react";
import { render, fireEvent, act } from "@testing-library/react";
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

describe("SidePane — dismissOnBack", () => {
  let pushStateSpy: jest.SpyInstance;
  let backSpy: jest.SpyInstance;

  beforeEach(() => {
    pushStateSpy = jest.spyOn(window.history, "pushState").mockImplementation(() => {});
    backSpy = jest.spyOn(window.history, "back").mockImplementation(() => {});
  });

  afterEach(() => {
    pushStateSpy.mockRestore();
    backSpy.mockRestore();
  });

  const mobileProps = { ...baseProps, isMobile: true };

  it("calls onClose when popstate fires on mobile (default on)", () => {
    const onClose = jest.fn();
    render(<SidePane {...mobileProps} onClose={onClose} />);
    act(() => { window.dispatchEvent(new PopStateEvent("popstate")); });
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("does not call onClose when popstate fires and dismissOnBack is false", () => {
    const onClose = jest.fn();
    render(<SidePane {...mobileProps} onClose={onClose} dismissOnBack={false} />);
    act(() => { window.dispatchEvent(new PopStateEvent("popstate")); });
    expect(onClose).not.toHaveBeenCalled();
  });

  it("does not call onClose when popstate fires on desktop (isMobile=false)", () => {
    const onClose = jest.fn();
    render(<SidePane {...baseProps} isMobile={false} onClose={onClose} />);
    act(() => { window.dispatchEvent(new PopStateEvent("popstate")); });
    expect(onClose).not.toHaveBeenCalled();
  });

  it("pushes a history entry when pane becomes visible on mobile", () => {
    render(<SidePane {...mobileProps} />);
    expect(pushStateSpy).toHaveBeenCalledTimes(1);
  });

  it("calls history.back() to clean up when pane closes via other means", () => {
    const { rerender } = render(<SidePane {...mobileProps} />);
    rerender(<SidePane {...mobileProps} visible={false} />);
    expect(backSpy).toHaveBeenCalledTimes(1);
  });
});
