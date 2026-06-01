# FAQ

## Nesting ZestResponsiveLayout

### Why does my page freeze when I nest ZestResponsiveLayout inside a sidepane?

This happens because all `ZestResponsiveLayout` instances share a single global `SidePaneContext`. When a sidepane is opened programmatically (via `openSidePane()`), the context stack contains the sidepane's content. Every `ZestResponsiveLayout` in the tree that lacks its own `sidePane` prop will try to render that entire stack.

If your component tree looks like this:

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

Layout B sees `stackLength > 0`, renders all stack items (including `<Details>`, which contains Layout B), and React enters an infinite render loop → stack overflow → browser freeze.

### How do I fix it?

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

### What if I can't fix it right now?

Add `suppressNestedStackWarning` as a temporary workaround:

```tsx
<ZestResponsiveLayout suppressNestedStackWarning>
  ...
</ZestResponsiveLayout>
```

This suppresses the dev-mode error and falls through to the safe rendering path (your own `sidePane` prop takes priority). Do **not** rely on this permanently — restructure your code following one of the options above.

### What is the correct pattern?

Each `ZestResponsiveLayout` should manage its own sidepanes independently via the `sidePane` prop. The context stack (`SidePaneProvider` / `openSidePane()`) is designed for the top-level layout that hosts the provider. Nested layouts should use the declarative `sidePane` prop — even for programmatic-like scenarios, manage visibility via React state and pass it to `sidePane.visible`.

**Correct:**

```tsx
// Top-level layout — renders programmatic sidepanes via context stack
<SidePaneProvider>
  <ZestResponsiveLayout>
    ...
  </ZestResponsiveLayout>
</SidePaneProvider>

// Nested layout — manages its own sidepane declaratively
<ZestResponsiveLayout sidePane={{ visible: isOpen, content: <Panel /> }}>
  ...
</ZestResponsiveLayout>
```

**Anti-pattern:**

```tsx
// Nested layout without own sidePane prop — reads ancestor's stack
<ZestResponsiveLayout>
  ...  // will try to render ancestor's stack items
</ZestResponsiveLayout>
```

### What about keepMounted?

When `keepMounted: true` (the default for context stack items), non-visible sidepanes are hidden with CSS (`display: none`) but React **still executes their render functions**. This means the entire content tree is alive and can trigger side effects, context reads, and — in this bug — self-referential rendering.

This is why the stack overflow happens even when only one sidepane is visually open: all stack items are still rendering their React trees.
