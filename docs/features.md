# Features Showcase ✨

Zest Responsive Layout is packed with features to make your application feel high-end and polished.

### Table of Contents
*   [GPU-Accelerated Animations](#gpu-accelerated-animations)
*   [Intelligent Breakpoints](#intelligent-breakpoints)
*   [Desktop Overlay System](#desktop-overlay-system)
*   [Hydration Awareness](#hydration-awareness)

---

[← Previous: Cookbook](./examples.md) | [Next: API Reference →](./api.md)

---

### GPU-Accelerated Animations
Zest uses `transform` and `flex-basis` transitions that are designed to avoid browser layout thrashing. This ensures that even on lower-end devices, the sidebar feels snappy and smooth.

*   **Zesty Bounce:** A signature slight bounce effect when opening.
*   **Performance:** Zero jank during window resizing.

[See Animation Recipe →](./examples.md#mastering-animations)

---

### Intelligent Breakpoints
The layout doesn't just hide things; it transforms.
*   **Desktop:** Side-by-side layout with configurable proportions.
*   **Mobile:** Full-screen modal overlay with "Click Outside to Close" built-in.

[See Breakpoint Recipe →](./examples.md#adjusting-the-mobile-experience)

---

### Desktop Overlay System
Control the focus of your application. The desktop overlay helps users concentrate on the sidebar task while subtly dimming the main content.

*   **Fixed Global Focus:** The overlay now covers the entire browser window and scrollbars, preventing accidental interactions outside the layout.
*   **Scroll Lockdown:** Automatically prevents background scrolling in the detail pane while the overlay is active, ensuring a consistent user experience.
*   **Configurable:** Turn it on/off per view.
*   **Interactive:** Decide if clicking the overlay should dismiss the sidebar.

[See Overlay Recipe →](./examples.md#configuring-the-desktop-overlay)

---

### Hydration Awareness
Zest is SSR-friendly. It includes internal logic (`useIsHydrated`) to ensure that animations don't fire prematurely during the initial page load, preventing "flash of unstyled content" (FOUC).

---

[← Previous: Cookbook](./examples.md) | [Next: API Reference →](./api.md)
