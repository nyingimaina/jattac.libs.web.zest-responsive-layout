# Bug Fixes

Summary of bug fixes in descending order.

## [2.2.0] - 2026-02-24
- **Floating Card Design:** Reimagined the SidePane as a modern floating card with `1.25rem` rounded corners and `1rem` margins, creating a highly polished SaaS aesthetic.
- **Layout Math Refinement:** Updated responsive calculations to perfectly handle the horizontal "air" around the card during transitions.

## [2.1.1] - 2026-02-24
- **Premium Elevation:** Implemented multi-layered soft shadows on the SidePane to create a modern, high-depth "floating" effect over the global overlay.

## [2.1.0] - 2026-02-24
- **Global Overlay System:** Refactored the dimming overlay to use `position: fixed`, ensuring it covers the entire window and scrollbars for better focus.
- **Scroll Lockdown:** Implemented dynamic `overflow: hidden` on the Detail Pane when the overlay is active to prevent scroll-leakage and unintended background interactions.
- **Z-Index Optimization:** Improved stacking context to ensure the sidebar always sits cleanly above the global overlay.

## [2.0.2] - 2026-02-24
- **Sidebar Layout Space Fix:** Resolved an issue where the sidebar would reserve space in the layout even when hidden. Implemented a negative margin-left strategy on desktop to ensure the Detail Pane occupies the full width when the Side Pane is closed.
