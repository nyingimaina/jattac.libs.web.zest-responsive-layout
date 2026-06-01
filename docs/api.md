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
| `children` | `React.ReactNode` | Required | The primary content area. |
| `sidePane` | `object` | `undefined` | Configuration for a single side pane. See [Side Pane Configuration](#side-pane-configuration). |
| `sidePaneWidth` | `string` | `"25%"` | Width of the side pane on desktop (e.g., `"300px"`, `"30%"`). |
| `className` | `string` | `undefined` | Custom CSS class applied to the root layout container. |
| `style` | `React.CSSProperties` | `undefined` | Custom inline styles applied to the root layout container. |
| `enableBounceAnimation` | `boolean` | `true` | Enables the opening bounce animation on the side pane. |
| `mobileBreakpointPx` | `number` | `768` | Viewport width threshold at which the layout switches to mobile mode. |
| `enableDesktopOverlay` | `boolean` | `true` | Renders a dimming overlay over the main content when the side pane is open on desktop. |
| `closeOnDesktopOverlayClick` | `boolean` | `false` | When `true`, clicking the desktop overlay closes the side pane. |

---

## Side Pane Configuration

The `sidePane` prop accepts an object with the following properties:

| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `visible` | `boolean` | Required | Controls the visibility of the side pane. |
| `content` | `React.ReactNode` | `undefined` | The content rendered inside the side pane. |
| `title` | `React.ReactNode` | `undefined` | Text or element displayed in the side pane header. |
| `onClose` | `() => void` | `undefined` | Callback invoked when the close button is clicked or the side pane is dismissed. |
| `keepMounted` | `boolean` | `false` | When `true`, the side pane content remains in the DOM when hidden. Useful for preserving form state. |
| `className` | `string` | `undefined` | Custom CSS class applied to the side pane element. |
| `style` | `React.CSSProperties` | `undefined` | Custom inline styles applied to the side pane element. |

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
| `openSidePane` | `<TResult = unknown>(config: ISidePaneConfig) => Promise<TResult>` | Pushes a new side pane onto the stack. Returns a Promise that resolves with the result passed to `closeSidePane()` when that pane is closed. |
| `closeSidePane` | `<TResult = unknown>(result?: TResult) => void` | Pops the topmost side pane from the stack. The pane's `onClose` is invoked before removal. An optional `result` is passed back to the opener's Promise and broadcast to all subscribers. |
| `subscribe` | `(listener: SidePaneListener) => () => void` | Subscribes to all close events. Returns an unsubscribe function. Each listener receives `{ paneId, result }`. |
| `stack` | `InternalConfig[]` | The current stack of side panes. Intended for inspection; direct mutation is not supported. |
| `stackLength` | `number` | The number of panes currently in the stack. |

### Interface: `SidePaneCloseEvent`

| Prop | Type | Description |
| :--- | :--- | :--- |
| `paneId` | `string` | The unique `_id` of the pane that was closed. |
| `result` | `unknown` | The result value passed to `closeSidePane(result)`, or `undefined`. |

### Type: `SidePaneListener`

```ts
type SidePaneListener = (event: SidePaneCloseEvent) => void;
```

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

### Return Values (v2.5.0+)

When a side pane is closed, it can pass a result back to the opener. Two mechanisms are available.

#### Promise-based (recommended)

`openSidePane()` returns a `Promise<TResult>` that resolves when the pane is closed:

```tsx
const ItemList = () => {
  const { openSidePane } = useSidePane();

  const handleEdit = async (item: Item) => {
    const result = await openSidePane<{ saved: boolean }>({
      title: "Edit Item",
      content: <ItemEditor item={item} />,
    });
    if (result?.saved) {
      refreshList(); // user saved - update the list
    }
  };
};

const ItemEditor = ({ item }: { item: Item }) => {
  const { closeSidePane } = useSidePane();

  const handleSave = () => {
    // ... save logic
    closeSidePane({ saved: true }); // resolves the opener's Promise
  };
};
```

To emulate an `onResult` callback style, use `.then()`:

```tsx
openSidePane<{ saved: boolean }>({ title: "Edit", content: <Editor /> })
  .then(result => { if (result?.saved) refreshList(); });
```

Or wrap it in a utility for reusable patterns:

```tsx
function openWithResult<T>(
  open: (config: ISidePaneConfig) => Promise<T>,
  config: ISidePaneConfig,
  onResult: (result: T) => void,
) {
  open<T>(config).then(onResult);
}
```

#### Broadcast subscription

For decoupled components or third-party consumers that need to observe all close events, use `subscribe`:

```tsx
const Monitor = () => {
  const { subscribe } = useSidePane();

  useEffect(() => {
    const unsub = subscribe(({ paneId, result }) => {
      console.log(`Pane ${paneId} closed with`, result);
    });
    return unsub; // cleanup on unmount
  }, [subscribe]);

  return null;
};
```

The `subscribe` method returns an unsubscribe function. Always call it in your `useEffect` cleanup to prevent stale listeners.

#### Close button behavior

The built-in close button (×) in the side pane header calls `closeSidePane()` with no result. The opener's Promise resolves with `undefined`. Consumers should check for this:

```tsx
const result = await openSidePane<{ saved: boolean }>({ content: <Editor /> });
if (result?.saved) { /* saved */ }
// If the user clicked ×, result is undefined - handled gracefully
```

#### Class component support

Both `withSidePane(P)` and `SidePaneConsumer` expose the full `openSidePane`, `closeSidePane`, and `subscribe` APIs:

```tsx
// HOC
class MyComponent extends React.Component<MyProps> {
  async handleOpen() {
    const result = await this.props.openSidePane({ content: <Editor /> });
    // handle result
  }
}

// Consumer
<SidePaneConsumer>
  {({ openSidePane, subscribe }) => (
    <MyComponent open={openSidePane} subscribe={subscribe} />
  )}
</SidePaneConsumer>
```

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
| `openSidePane` | `<TResult = unknown>(config: ISidePaneConfig) => Promise<TResult>` | Pushes a new side pane onto the stack. Returns a Promise that resolves with the close result. |
| `closeSidePane` | `<TResult = unknown>(result?: TResult) => void` | Pops the topmost pane, passing an optional result to the opener. |
| `subscribe` | `(listener: SidePaneListener) => () => void` | Subscribes to all close events. Returns an unsubscribe function. |
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
  openSidePane: <TResult = unknown>(config: ISidePaneConfig) => Promise<TResult>;
  closeSidePane: <TResult = unknown>(result?: TResult) => void;
  subscribe: (listener: SidePaneListener) => () => void;
  stack: InternalConfig[];
  stackLength: number;
}
```

### Interface: `WithSidePaneProps`

```tsx
export interface WithSidePaneProps {
  openSidePane: <TResult = unknown>(config: ISidePaneConfig) => Promise<TResult>;
  closeSidePane: <TResult = unknown>(result?: TResult) => void;
  subscribe: (listener: SidePaneListener) => () => void;
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
  desktopDetailPaneWidth?: string;
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
