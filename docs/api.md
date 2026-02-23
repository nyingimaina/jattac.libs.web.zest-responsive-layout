# API Reference 📐

Technical specifications for the `ZestResponsiveLayout` component.

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
| `sidePane` | `IProps.sidePane` | **Required** | Configuration for the collapsible pane. |
| `detailPane` | `React.ReactNode` | **Required** | Main content area content. |
| `desktopSidePaneWidth` | `string` | `"25%"` | Width of sidebar on desktop (e.g. `300px`, `20rem`). |
| `desktopDetailPaneWidth` | `string` | `"75%"` | Width of detail pane on desktop. |
| `enableBounceAnimation` | `boolean` | `true` | Enables the "Zesty" bounce effect. |
| `mobileBreakpointPx` | `number` | `768` | Screen width where layout switches to mobile mode. |
| `enableDesktopOverlay` | `boolean` | `true` | Show a dimming overlay on desktop when open. |
| `closeOnDesktopOverlayClick` | `boolean` | `true` | Close the sidebar when clicking the desktop overlay. |

---

### sidePane Configuration

| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `visible` | `boolean` | **Required** | Controls if the sidebar is open. |
| `pane` | `React.ReactNode` | **Required** | The content to render inside the sidebar. |
| `title` | `React.ReactNode` | `undefined` | Header title for the sidebar. |
| `onClose` | `() => void` | `undefined` | Callback triggered by close button or overlay click. |
| `widthRems` | `number` | `undefined` | (Legacy) Sets sidebar width in rems. Prefer `desktopSidePaneWidth`. |

---

### Types

#### `IProps`
```tsx
export interface IProps {
  sidePane: {
    visible: boolean;
    widthRems?: number;
    pane: React.ReactNode;
    title?: React.ReactNode;
    onClose?: () => void;
  };
  detailPane: React.ReactNode;
  desktopSidePaneWidth?: string;
  desktopDetailPaneWidth?: string;
  enableBounceAnimation?: boolean;
  mobileBreakpointPx?: number;
  enableDesktopOverlay?: boolean;
  closeOnDesktopOverlayClick?: boolean;
}
```

---

[← Previous: Features Showcase](./features.md) | [Next: Configuration →](./configuration.md)
