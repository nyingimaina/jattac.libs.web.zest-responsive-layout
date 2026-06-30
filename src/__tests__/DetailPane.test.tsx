import React from "react";
import { render, act } from "@testing-library/react";
import { DetailPane } from "../UI/DetailPane";

const baseProps = {
  sideWidth: "300px",
  hydrated: true,
  isMobile: false,
  enableDesktopOverlay: true,
};

describe("DetailPane — modal/nonModal inert behaviour", () => {
  it("sets inert on detail pane when visible (modal default)", () => {
    const { container } = render(
      <DetailPane {...baseProps} isSidePaneVisible={true}>
        <div>content</div>
      </DetailPane>
    );
    expect(container.firstChild).toHaveAttribute("inert");
  });

  it("does not set inert when visible and nonModal is true", () => {
    const { container } = render(
      <DetailPane {...baseProps} isSidePaneVisible={true} nonModal={true}>
        <div>content</div>
      </DetailPane>
    );
    expect(container.firstChild).not.toHaveAttribute("inert");
  });

  it("does not set inert when not visible regardless of nonModal", () => {
    const { container } = render(
      <DetailPane {...baseProps} isSidePaneVisible={false} nonModal={true}>
        <div>content</div>
      </DetailPane>
    );
    expect(container.firstChild).not.toHaveAttribute("inert");
  });
});
