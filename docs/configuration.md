# Configuration Guide

Fine-tuning the `ZestResponsiveLayout` component for application-specific requirements.

---

## Table of Contents

- [Layout Proportions](#layout-proportions)
- [Responsive Breakpoints](#responsive-breakpoints)
- [Interaction Behavior](#interaction-behavior)
- [Side Pane Stack Configuration](#side-pane-stack-configuration)

---

## Layout Proportions

The side pane width on desktop is controlled via the `sidePaneWidth` prop. The main content area automatically occupies the remaining horizontal space.

```tsx
<ZestResponsiveLayout
  sidePaneWidth="400px"
  sidePane={{ visible: true, content: <Sidebar /> }}
>
  <Content />
</ZestResponsiveLayout>
```

**Prop Precedence:**

1. `sidePane.widthRems` (deprecated) — calculates `rem` units from a numeric value; overrides other width props.
2. `sidePaneWidth` (preferred) — accepts any valid CSS length (`"300px"`, `"30%"`, `"20vw"`).
3. `desktopSidePaneWidth` (deprecated) — fallback if `sidePaneWidth` is not set.
4. Default value of `"25%"` is used when none of the above are specified.

---

## Responsive Breakpoints

The `mobileBreakpointPx` prop determines the viewport width at which the layout transitions from desktop mode to mobile mode.

- **Default:** `768` pixels, matching standard tablet widths.
- **Enterprise Applications:** Consider `1024` pixels to prevent complex side panes from appearing cramped on smaller laptop screens.

```tsx
<ZestResponsiveLayout
  mobileBreakpointPx={1024}
  sidePane={{ visible: true, content: <Sidebar /> }}
>
  <Content />
</ZestResponsiveLayout>
```

---

## Interaction Behavior

Several boolean props control how users interact with the layout:

### enableDesktopOverlay

Controls whether a dimming overlay is rendered over the main content area when the side pane is open on desktop.

- Default: `true`
- Set to `false` when users need to reference main content while interacting with the side pane.

### closeOnDesktopOverlayClick

Controls whether clicking the dimming overlay dismisses the side pane.

- Default: `false`
- Set to `true` for drawer-style side panes where a click outside should close the pane.

### enableBounceAnimation

Controls the opening bounce animation of the side pane.

- Default: `true`
- Set to `false` for applications that require a restrained aesthetic or must respect `prefers-reduced-motion` user preferences.

---

## Side Pane Stack Configuration

The side pane stack API does not require configuration props on the layout component itself. Since v2.4.0, you must wrap a `SidePaneProvider` at the application root to use `useSidePane()`, `withSidePane()`, or `SidePaneConsumer`.

### Usage

```tsx
const MyComponent = () => {
  const { openSidePane, closeSidePane, stackLength } = useSidePane();

  const handleDrillIn = () => {
    openSidePane({
      title: "Detail View",
      content: <DetailView />,
      onClose: () => console.log("Detail view closed")
    });
  };

  return <button onClick={handleDrillIn}>Open Detail</button>;
};
```

### Key Details

- The `useSidePane()` hook must be called within a descendant of `SidePaneProvider`.
- Each call to `openSidePane()` appends one entry to the stack. Calling it from within a stacked side pane is the intended pattern for nested navigation.
- The `closeSidePane()` method pops the topmost entry. The close button (x) in the side pane header invokes this method automatically.
- The `stackLength` value can be used to display a "back" indicator or to conditionally render navigation controls.
