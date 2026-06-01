# FAQ

## Recommended Pattern: `withSidePane`

The recommended way to manage sidepanes is to use the `withSidePane` HOC (or `useSidePane` hook) instead of the `sidePane` prop on `ZestResponsiveLayout`. This ensures consistent behavior across nested layouts and components.

```tsx
class MyPage extends React.Component<MyProps & WithSidePaneProps> {
  handleOpen = async () => {
    const result = await this.props.openSidePane({
      title: "Edit Item",
      content: <ItemEditor />,
    });
    if (result?.saved) this.refresh();
  };

  render() {
    return (
      <ZestResponsiveLayout>
        <button onClick={this.handleOpen}>Open</button>
      </ZestResponsiveLayout>
    );
  }
}

export default withSidePane(MyPage);
```

## Pitfalls

### Prop-based `sidePane` blocks the context stack

If a `ZestResponsiveLayout` has a `sidePane` prop AND a child component uses `withSidePane` (or `useSidePane`), the prop-based sidepane **blocks the context stack**. Children's `openSidePane()` calls will never render.

**Don't mix patterns:**
```tsx
// ❌ Prop-based sidepane blocks children's stack entries
<ZestResponsiveLayout sidePane={{ visible: false }}>
  <ChildUsingWithSidePane />  {/* openSidePane() won't show */}
</ZestResponsiveLayout>
```

**Use `withSidePane` everywhere instead:**
```tsx
// ✅ Both parent and children use the same context stack
class Parent extends React.Component<WithSidePaneProps> {
  render() {
    return (
      <ZestResponsiveLayout>
        <ChildUsingWithSidePane />  {/* openSidePane() works */}
      </ZestResponsiveLayout>
    );
  }
}
export default withSidePane(Parent);
```

### Depth tracking handles nesting automatically

Nested `ZestResponsiveLayout` instances (e.g., a layout rendered inside a sidepane content) are detected via depth tracking and **never** render the context stack. They either render their own `sidePane` prop (if provided) or render nothing — preventing infinite render loops.

This means the old workaround of `sidePane={{ visible: false }}` is no longer needed. Nested layouts are safe regardless of the `sidePane` prop.

### Stale stack entries with a global SidePaneProvider

If `SidePaneProvider` wraps your entire application, entries pushed via `openSidePane()` persist across page navigation. A top-level `ZestResponsiveLayout` without its own visible `sidePane` prop will render those stale entries as sidepanes.

Solutions:
- **Per-page providers**: Scope `SidePaneProvider` per page so it auto-cleans on navigation.
- **`closeSidePane()` on navigate**: Call `closeSidePane()` during page cleanup.
- **Use `sidePane` prop**: Give the layout its own `sidePane` prop so it ignores the context stack (but see the pitfall above about mixing patterns).

### `keepMounted` and hidden stack items

When `keepMounted: true` (the default for context stack items), non-visible sidepanes are hidden with CSS (`display: none`) but React **still executes their render functions**. All stack items remain alive and can trigger side effects, context reads, and data fetching. This is intentional — it preserves form state and scroll position — but be aware that every item in the stack is still running.

## When to use the `sidePane` prop

The `sidePane` prop is appropriate for **simple, standalone** layouts that do not have children using `withSidePane`:

```tsx
<ZestResponsiveLayout
  sidePane={{
    visible: isOpen,
    content: <Sidebar />,
    onClose: () => setIsOpen(false),
  }}
/>
```

If children need to open sidepanes programmatically, convert the parent to `withSidePane` and use `openSidePane()` for the parent's sidepanes too.
