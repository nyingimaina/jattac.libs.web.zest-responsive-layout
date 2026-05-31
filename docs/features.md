# Features

Comprehensive feature descriptions for the `ZestResponsiveLayout` component.

---

## Table of Contents

- [GPU-Accelerated Animations](#gpu-accelerated-animations)
- [Responsive Breakpoints](#responsive-breakpoints)
- [Desktop Overlay System](#desktop-overlay-system)
- [Side Pane Stacking](#side-pane-stacking)
- [State Preservation](#state-preservation)
- [Hydration Awareness](#hydration-awareness)

---

## GPU-Accelerated Animations

The side pane uses CSS `transform` and `opacity` transitions, which are handled by the GPU compositor thread and do not trigger browser layout recalculations. This ensures consistent 60fps animation performance across devices.

- The opening animation uses a spring-style cubic bezier curve for a natural feel.
- All transitions respect the user's `prefers-reduced-motion` requirements when disabled.

---

## Responsive Breakpoints

The layout adapts to the viewport width using a single configurable breakpoint (default 768px).

- **Desktop mode (above breakpoint):** The side pane renders as a floating card with rounded corners, a configurable width, and a dimming overlay over the main content. The pane is draggable by its header.
- **Mobile mode (below or at breakpoint):** The side pane renders as a full-screen overlay that slides in from the right edge, respecting safe-area insets on modern devices.

---

## Desktop Overlay System

When the side pane is open on desktop, an optional overlay dims the main content area to focus user attention on the side pane.

- The overlay covers the full viewport.
- The overlay can be disabled (`enableDesktopOverlay={false}`) when the main content must remain interactive.
- When enabled, clicking the overlay can optionally close the side pane (`closeOnDesktopOverlayClick={true}`).

---

## Side Pane Stacking

For applications that require nested or drill-down views within a side pane, Zest provides a context-driven stacking mechanism. This replaces the anti-pattern of nesting side pane components inside one another.

- The stack is managed via the `useSidePane()` hook, which provides `openSidePane()` and `closeSidePane()` methods.
- Only the topmost (most recently pushed) side pane is visible at any time.
- When the topmost pane is closed, the pane beneath it is displayed automatically.
- An unlimited number of panes can be stacked.
- The stack uses stable React keys, ensuring component identity is preserved across show and hide cycles.

---

## State Preservation

All side panes within the stack remain mounted in the DOM. Hidden panes are concealed through CSS only (`opacity: 0`, `pointer-events: none`, `transform: translateX(110%)`). They are never unmounted, which guarantees that:

- Form input values are retained.
- Scroll positions within each pane are preserved.
- Component state (timers, subscriptions, animation progress) continues uninterrupted.
- Re-opening a previously closed pane restores its exact visual and interactive state.

This behavior applies to all side panes managed through the stack API.

---

## Hydration Awareness

The layout is compatible with server-side rendering (SSR). An internal `useIsHydrated` hook prevents animation-related visual artifacts during the initial page load, ensuring that CSS transitions do not fire prematurely before the client-side JavaScript has fully initialized.
