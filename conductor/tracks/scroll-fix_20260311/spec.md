# Track: DetailPane Scroll Position Preservation

## Overview
Address a UX "jank" bug where triggering the SidePane on Desktop view causes the DetailPane's vertical scroll position to shift unexpectedly. This is particularly noticeable when the DetailPane contains a large, horizontally-scrollable table, leading to a loss of visual context when the SidePane is toggled.

## Functional Requirements
- **Scroll State Preservation:** The `ZestResponsiveLayout` must ensure the `DetailPane`'s vertical and horizontal scroll positions are locked and preserved when the `SidePane` state changes.
- **SidePane Toggle Integrity:** Opening or closing the `SidePane` must not trigger any layout shifts that inadvertently scroll the `DetailPane` container.

## Non-Functional Requirements
- **Visual Stability:** The transition must be seamless, without visual "whiplash" or de-contextification.
- **Performance:** Scroll locking logic must not introduce noticeable lag during SidePane animations.

## Acceptance Criteria
- [ ] **Reproduction:** Demonstrate the bug by placing a large, horizontally-scrollable table in the `DetailPane` and toggling the `SidePane` on Desktop.
- [ ] **Verification:** After the fix, toggling the `SidePane` while the `DetailPane` is scrolled (vertically or horizontally) does not alter its scroll coordinates.
- [ ] **Desktop Compatibility:** The fix is verified to work specifically for the Desktop view where the `SidePane` is triggered.

## Out of Scope
- Responsive layout changes specifically for Mobile/Tablet viewports (unless they share the underlying cause).
- General styling of the `SidePane` or `DetailPane` content.
