# FAQ

## Nesting ZestResponsiveLayout

### Why does my page freeze when I nest ZestResponsiveLayout inside a sidepane?

This was a bug in versions prior to **2.5.1**. It happened because all `ZestResponsiveLayout` instances share a single global `SidePaneContext`. When a sidepane is opened programmatically (via `openSidePane()`), the context stack contains the sidepane's content. Every `ZestResponsiveLayout` in the tree that lacked its own `sidePane` prop would try to render that entire stack.

If your component tree looked like this:

```
<App>
  <SidePaneProvider>
    <ZestResponsiveLayout>          ← Layout A
      <MainContent>
        <button onClick={() => openSidePane({ content: <Details /> })} />
      </MainContent>
    </ZestResponsiveLayout>

    {/* Context stack renders this when openSidePane is called: */}
    <Details>                        ← rendered inside the stack
      <ZestResponsiveLayout>         ← Layout B (no sidePane prop)
        ...
      </ZestResponsiveLayout>
    </Details>
  </SidePaneProvider>
</App>
```

Layout B would see `stackLength > 0`, render all stack items (including `<Details>`, which contains Layout B), and React would enter an infinite render loop → stack overflow → browser freeze.

**Fixed in v2.5.1+:** When a `ZestResponsiveLayout` has its own `sidePane` prop, it now renders that prop's sidepane instead of the context stack. This breaks the self-referential cycle. A nested layout with `sidePane={{ visible: false }}` will render nothing for its own sidepane area, ignoring the ancestor's context stack entirely.

### How do I fix it in my code?

#### Option A (recommended): Give the nested layout its own `sidePane` prop

Even an invisible sidepane breaks the cycle, because the layout then manages its own sidepane independently instead of reading the ancestor's context stack:

```tsx
<ZestResponsiveLayout sidePane={{ visible: false }}>
  ...
</ZestResponsiveLayout>
```

If you need to show a sidepane in this layout later, toggle `visible` dynamically:

```tsx
const [showDetails, setShowDetails] = useState(false);

<ZestResponsiveLayout
  sidePane={{
    visible: showDetails,
    content: <DetailsPanel />,
    onClose: () => setShowDetails(false),
  }}
>
  ...
</ZestResponsiveLayout>
```

#### Option B: Restructure the component tree

Move the nested `ZestResponsiveLayout` outside of the sidepane content that wraps it. For example, lift the layout up:

```tsx
// Instead of rendering ZestResponsiveLayout inside the sidepane content,
// have the main layout pass content as children:
<ZestResponsiveLayout sidePane={{ visible: true, content: <DetailsPanel /> }}>
  <MainContent />
</ZestResponsiveLayout>
```

#### Option C: Use separate SidePaneProvider boundaries

If you genuinely need independent programmatic sidepane stacks, wrap the nested subtree in its own `<SidePaneProvider>`:

```tsx
<SidePaneProvider>
  <ZestResponsiveLayout>
    ...
    {/* Children also have their own SidePaneProvider: */}
    <SidePaneProvider>
      <ZestResponsiveLayout>
        ...
      </ZestResponsiveLayout>
    </SidePaneProvider>
  </ZestResponsiveLayout>
</SidePaneProvider>
```

### Stale entries with a global SidePaneProvider

If `SidePaneProvider` wraps your entire application, entries pushed via `openSidePane()` persist across page navigation. This is expected behavior — the provider is global so the stack outlives individual pages.

If a page renders without calling `openSidePane()` but a previous page left stale entries, the stack will be non-empty. A `ZestResponsiveLayout` without its own `sidePane` prop will render those stale entries as sidepanes. This is usually not what you want.

Solutions:

- **Per-page providers**: Scope `SidePaneProvider` per page so it auto-cleans on navigation.
- **`closeSidePane()` on navigate**: Call `closeSidePane()` during your page's cleanup/unmount phase.
- **Use `sidePane` prop**: Give each layout its own `sidePane` prop so it ignores the context stack entirely. This is the most explicit and predictable approach.

### A layout relying on `openSidePane` (no sidePane prop)

A `ZestResponsiveLayout` without a `sidePane` prop that uses `openSidePane()` is a **supported pattern**. When there is no local `sidePane` prop, the layout falls through to rendering the context stack. This is how programmatic sidepanes work:

```tsx
// This layout renders nothing in the sidepane area initially,
// but will show content when openSidePane() is called.
<SidePaneProvider>
  <ZestResponsiveLayout>
    <button onClick={() => openSidePane({ content: <Panel /> })} />
  </ZestResponsiveLayout>
</SidePaneProvider>
```

This pattern is safe as long as the context stack's content does not contain this same `ZestResponsiveLayout` (which would create the self-referential cycle fixed in v2.5.1).

### What about keepMounted?

When `keepMounted: true` (the default for context stack items), non-visible sidepanes are hidden with CSS (`display: none`) but React **still executes their render functions**. This means the entire content tree is alive and can trigger side effects, context reads, and — in the original bug — self-referential rendering.

This was why the stack overflow happened even when only one sidepane was visually open: all stack items were still rendering their React trees.
