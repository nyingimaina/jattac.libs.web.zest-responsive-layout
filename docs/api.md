# API Reference 📐

Technical specifications for the `ZestResponsiveLayout` component (v2.0.0).

### Table of Contents
*   [ZestResponsiveLayout (IProps)](#zestresponsivelayout-iprops)
*   [sidePane Configuration](#sidepane-configuration)
*   [Types](#types)

---

[← Previous: Features Showcase](./features.md) | [Next: Configuration →](./configuration.md)

---

### ZestResponsiveLayout (IProps)

| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `children` | `React.ReactNode` | **Required** | The primary content area. Replaces `detailPane`. |
| `sidePane` | `IProps.sidePane` | **Required** | Configuration for the collapsible pane. |
| `sidePaneWidth` | `string` | `"25%"` | Width of sidebar on desktop (e.g., `300px`, `25%`). |
| `className` | `string` | `undefined` | Custom CSS class for the root container. |
| `style` | `React.CSSProperties` | `undefined` | Custom inline styles for the root container. |
| `enableBounceAnimation` | `boolean` | `true` | Enables the "Zesty" bounce effect. |
| `mobileBreakpointPx` | `number` | `768` | Screen width where layout switches to mobile mode. |
| `enableDesktopOverlay` | `boolean` | `true` | Show a dimming overlay on desktop when open. |
| `closeOnDesktopOverlayClick` | `boolean` | `true` | Close the sidebar when clicking the desktop overlay. |
| `detailPane` | `React.ReactNode` | `undefined` | **(Deprecated)** Use `children` instead. |
| `desktopSidePaneWidth` | `string` | `undefined` | **(Deprecated)** Use `sidePaneWidth` instead. |

---

### sidePane Configuration

| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `visible` | `boolean` | **Required** | Controls if the sidebar is open. |
| `content` | `React.ReactNode` | **Required** | The content to render inside the sidebar. |
| `title` | `React.ReactNode` | `undefined` | Header title for the sidebar. |
| `onClose` | `() => void` | `undefined` | Callback triggered by close button or overlay click. |
| `keepMounted` | `boolean` | `false` | When `true`, the sidebar's content remains in the DOM even when hidden (`visible={false}`). |
| `className` | `string` | `undefined` | Custom CSS class for the sidebar element. |
| `style` | `React.CSSProperties` | `undefined` | Custom inline styles for the sidebar element. |
| `pane` | `React.ReactNode` | `undefined` | **(Deprecated)** Use `content` instead. |
| `widthRems` | `number` | `undefined` | **(Deprecated)** Use `sidePaneWidth` instead. |

---

### Types

#### `IProps`
```tsx
export interface IProps {
  children?: React.ReactNode;
  sidePane: {
    visible: boolean;
    content?: React.ReactNode;
    title?: React.ReactNode;
    onClose?: () => void;
    keepMounted?: boolean;
    className?: string;
    style?: React.CSSProperties;
    // ... legacy props
  };
  sidePaneWidth?: string;
  className?: string;
  style?: React.CSSProperties;
  enableBounceAnimation?: boolean;
  mobileBreakpointPx?: number;
  enableDesktopOverlay?: boolean;
  closeOnDesktopOverlayClick?: boolean;
  // ... legacy props
}
```

---

[← Previous: Features Showcase](./features.md) | [Next: Configuration →](./configuration.md)
