# Zest Cookbook 🍳

Welcome to the Zest Cookbook! This guide is designed to take you from "Zero to Expert" by solving real-world layout challenges.

### Table of Contents
*   [The Basic Layout](#the-basic-layout)
*   [Customizing Desktop Widths](#customizing-desktop-widths)
*   [Adjusting the Mobile Experience](#adjusting-the-mobile-experience)
*   [Mastering Animations](#mastering-animations)
*   [Configuring the Desktop Overlay](#configuring-the-desktop-overlay)

---

[← Previous: README](../README.md) | [Next: Features Showcase →](./features.md)

---

### The Basic Layout
**Problem:** I need a standard sidebar + content layout that automatically handles mobile devices.

**Solution:** Use the default configuration. On mobile (under 768px), the sidebar will become a full-screen overlay.

```tsx
import { ZestResponsiveLayout } from 'jattac.libs.web.zest-responsive-layout';
import { useState } from 'react';

const BasicApp = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <ZestResponsiveLayout
      sidePane={{
        visible: isOpen,
        title: "Menu",
        pane: <ul><li>Home</li><li>Profile</li></ul>,
        onClose: () => setIsOpen(false)
      }}
      detailPane={
        <div>
          <button onClick={() => setIsOpen(true)}>Open Menu</button>
          <p>Main content goes here.</p>
        </div>
      }
    />
  );
};
```

---

### Customizing Desktop Widths
**Problem:** My sidebar needs to be exactly 300px, or a specific percentage of the screen.

**Solution:** Use `desktopSidePaneWidth` and `desktopDetailPaneWidth`.

```tsx
<ZestResponsiveLayout
  desktopSidePaneWidth="300px"
  desktopDetailPaneWidth="calc(100% - 300px)"
  sidePane={{
    visible: true,
    pane: <nav>Fixed Width Sidebar</nav>
  }}
  detailPane={<main>Dynamic Content</main>}
/>
```
*Learn more about width calculations in the [API Reference](./api.md).*

---

### Adjusting the Mobile Experience
**Problem:** I want the layout to switch to mobile mode earlier (or later) than the default 768px.

**Solution:** Override the `mobileBreakpointPx` prop.

```tsx
<ZestResponsiveLayout
  mobileBreakpointPx={1024} // Tablet landscape and below
  sidePane={{
    visible: true,
    pane: <nav>Responsive Menu</nav>
  }}
  detailPane={<main>Content</main>}
/>
```

---

### Mastering Animations
**Problem:** I want a more static feel, or I need to disable animations for accessibility.

**Solution:** Toggle the `enableBounceAnimation` prop.

```tsx
<ZestResponsiveLayout
  enableBounceAnimation={false} // Clean, instant transitions
  sidePane={{
    visible: true,
    pane: <nav>Sidebar</nav>
  }}
  detailPane={<main>Content</main>}
/>
```

---

### Configuring the Desktop Overlay
**Problem:** On desktop, I want the sidebar to push content rather than having a dimming overlay, or I want to prevent closing by clicking the overlay.

**Solution:** Use `enableDesktopOverlay` and `closeOnDesktopOverlayClick`.

```tsx
<ZestResponsiveLayout
  enableDesktopOverlay={false} // Content remains fully interactive
  closeOnDesktopOverlayClick={false} // User must click the close button
  sidePane={{
    visible: true,
    pane: <nav>Settings</nav>,
    onClose: () => handleClose()
  }}
  detailPane={<main>Settings Dashboard</main>}
/>
```
*For a full list of interaction props, see the [Configuration Guide](./configuration.md).*

---

[← Previous: README](../README.md) | [Next: Features Showcase →](./features.md)
