# Configuration Guide ⚙️

Learn how to fine-tune Zest to match your application's design system.

### Table of Contents
*   [Layout Proportions](#layout-proportions)
*   [Responsive Breakpoints](#responsive-breakpoints)
*   [Interaction Behavior](#interaction-behavior)

---

[← Previous: API Reference](./api.md) | [Next: Development →](./development.md)

---

### Layout Proportions
Zest uses Flexbox under the hood. You can control exactly how much space each pane takes on desktop using CSS units.

```tsx
<ZestResponsiveLayout
  desktopSidePaneWidth="400px"
  desktopDetailPaneWidth="calc(100% - 400px)"
  // ...
/>
```

**Precedence:**
1. If `sidePane.widthRems` is provided, it calculates `rem` units (legacy).
2. Otherwise, it uses `desktopSidePaneWidth` (default `25%`).
3. The Detail Pane automatically occupies the remaining space unless `desktopDetailPaneWidth` is explicitly set.

---

### Responsive Breakpoints
The `mobileBreakpointPx` prop determines when the UI switches from "Side-by-Side" to "Overlay Modal".

*   **Default:** `768` (Standard Tablets).
*   **For Enterprise Apps:** Consider `1024` to ensure complex sidebars don't feel cramped on small laptops.

---

### Interaction Behavior
You can customize how users interact with the layout through several boolean flags:

*   **`enableDesktopOverlay`**: Controls the visual dimming. Use `false` if the user needs to reference information in the main pane while using the sidebar.
*   **`closeOnDesktopOverlayClick`**: Set to `false` for "Drawer-style" sidebars where accidental clicks shouldn't close the pane.
*   **`enableBounceAnimation`**: Set to `false` for high-density, serious enterprise applications where utility is prioritized over "delight".

#### Advanced State Management: `sidePane.keepMounted`
By default, Zest is designed to be **stateless and clean**. When `sidePane.visible` is `false`, the children of the sidebar are completely unmounted from the DOM. This ensures that:
1.  **No Stale Data:** Re-opening the sidebar always shows the latest state.
2.  **Performance:** Background processes (like timers or data polling) in hidden components are stopped.

**When to use `keepMounted: true`:**
*   **Forms:** If a user is filling out a multi-step form and closes the sidebar to check something in the main pane, you want their input to be there when they return.
*   **Heavy Components:** If your sidebar contains a component that is expensive to initialize (like a 3D model or a large data grid), keeping it mounted avoids the "loading" flicker on re-open.

**When to avoid it:**
*   **Simple Navigations:** For basic menus or lists, unloading ensures a fresh UI every time.
*   **Resource Heavy Pages:** If you have many sidebars with heavy content, keeping them all mounted can lead to high memory usage.

---

[← Previous: API Reference](./api.md) | [Next: Development →](./development.md)
