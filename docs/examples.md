# Zest Cookbook 🍳

Welcome to the Zest Cookbook (v2.0.0)! This guide is designed to take you from "Zero to Expert" by solving real-world layout challenges.

### Table of Contents
*   [The Basic Layout](#the-basic-layout)
*   [Customizing Desktop Widths](#customizing-desktop-widths)
*   [Adjusting the Mobile Experience](#adjusting-the-mobile-experience)
*   [Mastering Animations](#mastering-animations)
*   [Configuring the Desktop Overlay](#configuring-the-desktop-overlay)
*   [Persisting Sidebar State](#persisting-sidebar-state)
*   [Custom Styling Hooks](#custom-styling-hooks)

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
        content: <ul><li>Home</li><li>Profile</li></ul>,
        onClose: () => setIsOpen(false)
      }}
    >
      <div>
        <button onClick={() => setIsOpen(true)}>Open Menu</button>
        <p>Main content goes here.</p>
      </div>
    </ZestResponsiveLayout>
  );
};
```

---

### Customizing Desktop Widths
**Problem:** My sidebar needs to be exactly 300px, or a specific percentage of the screen.

**Solution:** Use `sidePaneWidth`.

```tsx
<ZestResponsiveLayout
  sidePaneWidth="300px"
  sidePane={{
    visible: true,
    content: <nav>Fixed Width Sidebar</nav>
  }}
>
  <main>Dynamic Content</main>
</ZestResponsiveLayout>
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
    content: <nav>Responsive Menu</nav>
  }}
>
  <main>Content</main>
</ZestResponsiveLayout>
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
    content: <nav>Sidebar</nav>
  }}
>
  <main>Content</main>
</ZestResponsiveLayout>
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
    content: <nav>Settings</nav>,
    onClose: () => handleClose()
  }}
>
  <main>Settings Dashboard</main>
</ZestResponsiveLayout>
```

---

### Persisting Sidebar State
**Problem:** I have a complex form or a map in my sidebar. When the user closes and re-opens the sidebar, I don't want them to lose their progress or have the component re-initialize.

**Solution:** Use the `keepMounted` flag in the `sidePane` configuration.

```tsx
<ZestResponsiveLayout
  sidePane={{
    visible: isOpen,
    keepMounted: true, // Content stays in DOM even when hidden
    title: "Edit Profile",
    content: <MyComplexForm />, // Form state is preserved
    onClose: () => setIsOpen(false)
  }}
>
  <main>Main Content Area</main>
</ZestResponsiveLayout>
```

---

### Custom Styling Hooks
**Problem:** I need to integrate Zest into my specific design system with custom classes.

**Solution:** Use the `className` and `style` props on both the root layout and the side pane.

```tsx
<ZestResponsiveLayout 
  className="my-app-layout"
  style={{ background: "#f0f0f0" }}
  sidePane={{ 
    visible: true, 
    content: <Sidebar />, 
    className: "my-custom-sidebar" 
  }}
>
  <Content />
</ZestResponsiveLayout>
```

---

[← Previous: README](../README.md) | [Next: Features Showcase →](./features.md)
