# Track: Floating Zest Architecture (Scroll Fix Pivot)

## Overview
Refactor the `ZestResponsiveLayout` from a "Flex-Push" model to a "Floating-Layer" model. This architectural shift ensures the `DetailPane` always maintains 100% width, eliminating layout reflows and "scroll whiplash" when the `SidePane` is toggled. It also introduces a "Quiet Luxury" aesthetic with draggable components and premium animations.

## Functional Requirements
- **Layered Layout:** The `DetailPane` remains at 100% width/height. The `SidePane` floats on top as an absolute-positioned layer.
- **Draggable SidePane:** On Desktop, users can drag the `SidePane` to reposition it.
- **Magnetic Snapping:** The `SidePane` snaps to edges (top/bottom/right) when dragged close.
- **Scroll Preservation:** Opening/Closing the sidebar must have zero impact on the `DetailPane`'s scroll coordinates.

## Visual & Animation Requirements ("Quiet Luxury")
- **Spring Animations:** Use physics-based springs for opening/closing transitions.
- **Glassmorphism:** The desktop overlay uses `backdrop-filter: blur()` for a premium feel.
- **Micro-interactions:** Elevation changes (shadows) and subtle scaling during drag operations.

## Acceptance Criteria
- [ ] **No Reflow:** Toggling the SidePane causes zero width change to the `DetailPane`.
- [ ] **Absolute Positioning:** SidePane overlays content on Desktop instead of pushing it.
- [ ] **Draggability:** Users can move the SidePane on Desktop via a handle or header.
- [ ] **Mobile Stability:** Mobile behavior remains a full-screen or standard overlay (as currently implemented).

## Out of Scope
- Full-screen "Push" mode (deprecated in favor of Floating mode).
- Resizing the SidePane (only dragging is required for now).
