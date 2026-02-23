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

---

[← Previous: API Reference](./api.md) | [Next: Development →](./development.md)
