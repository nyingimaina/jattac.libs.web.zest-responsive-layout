# Breaking Changes ⚠️

A history of changes that may require manual intervention when upgrading.

### Table of Contents
*   [Version 1.1.0](#version-110)

---

[← Previous: Development](./development.md) | [Next: README →](../README.md)

---

### Version 1.1.0

#### Introduction of Desktop Overlay
In version 1.1.0, we introduced a default desktop overlay to improve focus when the side pane is open.

**Before (1.0.x):**
The side pane would open, but the main content area remained fully interactive and bright.

**After (1.1.0):**
The main content area is now dimmed by default, and clicking it closes the sidebar.

**How to revert to old behavior:**
If you prefer the non-overlay style, set the following props:
```tsx
<ZestResponsiveLayout
  enableDesktopOverlay={false}
  closeOnDesktopOverlayClick={false}
  // ...
/>
```

---

[← Previous: Development](./development.md) | [Next: README →](../README.md)
