# API Reference

Technical specifications for the `ZestResponsiveLayout` component.

---

## Table of Contents

- [IProps](#iprops)
- [Side Pane Configuration](#side-pane-configuration)
- [Side Pane Stack (Context API)](#side-pane-stack-context-api)
- [Class Component Support](#class-component-support)
- [Type Definitions](#type-definitions)

---

## IProps

| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `children` | `React.ReactNode` | Required | The primary content area. Replaces the deprecated `detailPane` prop. |
| `sidePane` | `object` | `{ visible: false }` | Configuration for a single side pane. See [Side Pane Configuration](#side-pane-configuration). |
| `sidePaneWidth` | `string` | `"25%"` | Width of the side pane on desktop (e.g., `"300px"`, `"30%"`). |
| `className` | `string` | `undefined` | Custom CSS class applied to the root layout container. |
| `style` | `React.CSSProperties` | `undefined` | Custom inline styles applied to the root layout container. |
| `enableBounceAnimation` | `boolean` | `true` | Enables the opening bounce animation on the side pane. |
| `mobileBreakpointPx` | `number` | `768` | Viewport width threshold at which the layout switches to mobile mode. |
| `enableDesktopOverlay` | `boolean` | `true` | Renders a dimming overlay over the main content when the side pane is open on desktop. |
| `closeOnDesktopOverlayClick` | `boolean` | `false` | When `true`, clicking the desktop overlay closes the side pane. |
| `detailPane` | `React.ReactNode` | `undefined` | **Deprecated.** Use `children` instead. |
| `desktopSidePaneWidth` | `string` | `undefined` | **Deprecated.** Use `sidePaneWidth` instead. |
| `desktopDetailPaneWidth` | `string` | `undefined` | **Deprecated.** Not applicable - the content pane fills remaining space. |

---

## Side Pane Configuration

The `sidePane` prop accepts an object with the following properties:

| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `visible` | `boolean` | Required | Controls the visibility of the side pane. |
| `content` | `React.ReactNode` | Required | The content rendered inside the side pane. |
| `title` | `React.ReactNode` | `undefined` | Text or element displayed in the side pane header. |
| `onClose` | `() => void` | `undefined` | Callback invoked when the close button is clicked or the side pane is dismissed. |
| `keepMounted` | `boolean` | `false` | When `true`, the side pane content remains in the DOM when hidden. Useful for preserving form state. |
| `className` | `string` | `undefined` | Custom CSS class applied to the side pane element. |
| `style` | `React.CSSProperties` | `undefined` | Custom inline styles applied to the side pane element. |
| `pane` | `React.ReactNode` | `undefined` | **Deprecated.** Use `content` instead. |
| `widthRems` | `number` | `undefined` | **Deprecated.** Use `sidePaneWidth` instead. |

---

## Side Pane Stack (Context API)

For applications that require drilling into nested views within a side pane, Zest provides a context-driven stacking mechanism. This replaces the anti-pattern of nesting side pane components inside one another, which results in cramped and unusable interfaces.

When using the stack API, each push adds a new side pane to the top of the stack. Only the topmost (most recently pushed) pane is visible at any time. When the topmost pane is closed, the previous pane is revealed with its state fully preserved, including scroll position, form input values, and component state.

### Context: `SidePaneProvider`

Since v2.4.0, `SidePaneProvider` is no longer automatically wrapped around `ZestResponsiveLayout`. Consumers using the side pane stack API (`useSidePane`, `withSidePane`, or `SidePaneConsumer`) must wrap a single `SidePaneProvider` at an appropriate ancestor level, typically at the application root.

**Important:** You only need ONE provider for your entire application, not one per layout instance. Place it above all components that may call `useSidePane()`, regardless of how many `ZestResponsiveLayout` instances exist.

```tsx
import { SidePaneProvider, ZestResponsiveLayout } from 'jattac.libs.web.zest-responsive-layout';

function App() {
  return (
    <SidePaneProvider>
      <ZestResponsiveLayout ...>
        ...
      </ZestResponsiveLayout>
    </SidePaneProvider>
  );
}
```

If your application only uses the `sidePane` prop (without the stack API), the provider is optional — `useSidePane()` degrades gracefully to harmless no-ops.

### Hook: `useSidePane()`

Returns an object with the following members:

| Member | Type | Description |
| :--- | :--- | :--- |
| `openSidePane` | `(config: ISidePaneConfig) => void` | Pushes a new side pane onto the stack. The content, title, and callbacks are provided via the config object. |
| `closeSidePane` | `() => void` | Pops the topmost side pane from the stack. The pane's `onClose` callback is invoked before removal. |
| `stack` | `InternalConfig[]` | The current stack of side panes. Intended for inspection; direct mutation is not supported. |
| `stackLength` | `number` | The number of panes currently in the stack. |

### Interface: `ISidePaneConfig`

| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `content` | `React.ReactNode` | Required | The content rendered inside the side pane. |
| `title` | `React.ReactNode` | `undefined` | Text or element displayed in the side pane header. |
| `onClose` | `() => void` | `undefined` | Callback invoked when this specific pane is popped from the stack (either by the close button or programmatically via `closeSidePane()`). |
| `className` | `string` | `undefined` | Custom CSS class applied to this side pane element. |
| `style` | `React.CSSProperties` | `undefined` | Custom inline styles applied to this side pane element. |

### Data Preservation

All side panes in the stack remain mounted in the DOM. Hidden panes are visually concealed through CSS (`opacity: 0`, `pointer-events: none`, `transform: translateX(110%)`) but are never unmounted. This guarantees that form inputs, scroll positions, and component state within each pane are retained across open and close cycles.

---

## Class Component Support

React class components cannot use hooks. Zest provides two alternative APIs for accessing the side pane stack from class components.

### HOC: `withSidePane(P)`

A higher-order component that injects side pane context methods as props.

```tsx
import { withSidePane, WithSidePaneProps } from 'jattac.libs.web.zest-responsive-layout';

interface MyProps extends WithSidePaneProps {
  // component-specific props
}

class MyComponent extends React.Component<MyProps> {
  render() {
    return (
      <button onClick={() => this.props.openSidePane({ content: <div>Pane</div> })}>
        Open (stack depth: {this.props.stackLength})
      </button>
    );
  }
}

export default withSidePane(MyComponent);
```

**Injected props:**

| Prop | Type | Description |
| :--- | :--- | :--- |
| `openSidePane` | `(config: ISidePaneConfig) => void` | Pushes a new side pane onto the stack. |
| `closeSidePane` | `() => void` | Pops the topmost side pane from the stack. |
| `stackLength` | `number` | The number of panes currently in the stack. |

### Consumer: `SidePaneConsumer`

A render-prop component that provides the side pane context value as the children function argument.

```tsx
import { SidePaneConsumer } from 'jattac.libs.web.zest-responsive-layout';

class MyComponent extends React.Component {
  render() {
    return (
      <SidePaneConsumer>
        {({ openSidePane, closeSidePane, stackLength }) => (
          <button onClick={() => openSidePane({ content: <div>Pane</div> })}>
            Open (stack depth: {stackLength})
          </button>
        )}
      </SidePaneConsumer>
    );
  }
}
```

### Interface: `SidePaneContextValue`

```tsx
export interface SidePaneContextValue {
  openSidePane: (config: ISidePaneConfig) => void;
  closeSidePane: () => void;
  stack: InternalConfig[];
  stackLength: number;
}
```

### Interface: `WithSidePaneProps`

```tsx
export interface WithSidePaneProps {
  openSidePane: (config: ISidePaneConfig) => void;
  closeSidePane: () => void;
  stackLength: number;
}
```

---

## Type Definitions

```tsx
import { ZestResponsiveLayout, ISidePaneConfig } from 'jattac.libs.web.zest-responsive-layout';

interface IProps {
  children?: React.ReactNode;
  sidePane?: {
    visible: boolean;
    content?: React.ReactNode;
    title?: React.ReactNode;
    onClose?: () => void;
    keepMounted?: boolean;
    className?: string;
    style?: React.CSSProperties;
  };
  sidePaneWidth?: string;
  className?: string;
  style?: React.CSSProperties;
  enableBounceAnimation?: boolean;
  mobileBreakpointPx?: number;
  enableDesktopOverlay?: boolean;
  closeOnDesktopOverlayClick?: boolean;
}
```

```tsx
export interface ISidePaneConfig {
  content: React.ReactNode;
  title?: React.ReactNode;
  onClose?: () => void;
  keepMounted?: boolean;
  className?: string;
  style?: React.CSSProperties;
}
```
