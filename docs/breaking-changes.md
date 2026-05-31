# Breaking Changes

A record of changes across major versions that may require manual intervention when upgrading.

---

## Table of Contents

- [Version 2.5.0 (Return Values &amp; Subscription)](#version-250-return-values--subscription)
- [Version 2.4.0 (Manual Provider Requirement)](#version-240-manual-provider-requirement)
- [Version 2.3.1 (Mobile Outside Click Fix)](#version-231-mobile-outside-click-fix)
- [Version 2.3.0 (Side Pane Stack API)](#version-230-side-pane-stack-api)
- [Version 2.1.0 (Side Pane Stack API)](#version-210-side-pane-stack-api)
- [Version 2.0.0 (The Gold Standard)](#version-200-the-gold-standard)
- [Version 1.1.0](#version-110)

---

## Version 2.5.0 (Return Values & Subscription)

Version 2.5.0 adds Promise-based return values to `openSidePane` and an event subscription mechanism. This is a **backward-compatible** feature addition — no existing code breaks.

### Added: `openSidePane()` returns `Promise<TResult>`

The `openSidePane()` method now returns a `Promise<TResult>`. When a pane calls `closeSidePane(result)`, the opener's Promise resolves with that result.

**Before (v2.4.x):**
```ts
openSidePane({ content: <Editor /> });
// no way to know what happened in the editor
```

**After (v2.5.0):**
```ts
const result = await openSidePane<{ saved: boolean }>({ content: <Editor /> });
if (result?.saved) refresh();
```

**Migration:** Existing callers that ignore the return value continue to work. The return type changes from `void` to `Promise<unknown>`, but TypeScript allows discarding a Promise return value, and the Promise never throws.

### Added: `closeSidePane(result?)`

The `closeSidePane()` method now accepts an optional `result` parameter.

**Before (v2.4.x):**
```ts
closeSidePane();
```

**After (v2.5.0):**
```ts
closeSidePane({ saved: true });
closeSidePane(); // still works — result is undefined
```

**Migration:** Existing `closeSidePane()` calls without arguments work identically. No code changes required.

### Added: `subscribe(listener)`

A new `subscribe` method on the context allows decoupled components to observe all close events.

```ts
const unsub = subscribe(({ paneId, result }) => {
  console.log(`Pane ${paneId} closed with`, result);
});
return unsub; // cleanup
```

**Migration:** No migration needed. This is a new feature with no existing equivalent.

### Unaffected Consumers

All existing code powered by the `sidePane` prop (without the stack API) is completely unaffected.

---

## Version 2.4.0 (Manual Provider Requirement)

Version 2.4.0 removes the automatic `SidePaneProvider` wrapping from `ZestResponsiveLayout`. Consumers using the side pane stack API must now wrap a provider manually at the application root.

### Removed: Automatic SidePaneProvider

**Before (v2.3.x):**
```tsx
// The provider was auto-injected; consumers could use useSidePane() directly
<ZestResponsiveLayout sidePane={{...}}>
  <MyComponent /> {/* useSidePane() works here */}
</ZestResponsiveLayout>
```

**After (v2.4.0):**
```tsx
import { SidePaneProvider, ZestResponsiveLayout } from 'jattac.libs.web.zest-responsive-layout';

// Consumer wraps their own provider
<SidePaneProvider>
  <ZestResponsiveLayout sidePane={{...}}>
    <MyComponent /> {/* useSidePane() works here */};
  </ZestResponsiveLayout>
</SidePaneProvider>
```

### Rationale

The auto-provider pattern prevented consumers from using the `useSidePane()` hook outside of `ZestResponsiveLayout` and caused issues with multiple layout instances competing for separate providers. Moving the provider to the consumer grants full control over the provider scope.

### Safe Degradation

`useSidePane()` now returns harmless no-ops (`openSidePane`, `closeSidePane` are empty functions, `stack` is `[]`, `stackLength` is `0`) when called outside a `SidePaneProvider`. It no longer throws. This means the `sidePane` prop continues to work without a provider — the breaking change only affects consumers using the stack API (`useSidePane`, `withSidePane`, `SidePaneConsumer`).

### Unaffected Consumers

- Applications using only the `sidePane` prop (no `useSidePane()` calls, no `withSidePane()` HOC, no `SidePaneConsumer`).
- Tests that render `ZestResponsiveLayout` without a provider continue to work (the legacy `sidePane` prop path handles this gracefully).

---

## Version 2.3.1 (Mobile Outside Click Fix)

Version 2.3.1 removes the mobile outside click detection that caused the side pane to close unexpectedly when users interacted with portaled UI elements (dropdown menus, datepickers, tooltips) rendered inside the side pane.

### Removed: Mobile Outside Click

The `useOutsideClick` hook on mobile has been removed because the mobile side pane fills the entire viewport, leaving no area to click "outside" of. When active, this handler would fire incorrectly on portaled elements that render outside the side pane's DOM hierarchy (e.g., MUI Select dropdowns, Ant Design DatePicker overlays, React-Select menus), causing the side pane to close without warning.

**Affected consumers:** None. This removal restores correct behavior for any application using portaled overlay components inside the side pane on mobile.

---

## Version 2.3.0 (Side Pane Stack API)

Version 2.1.0 introduces the side pane stack context API and makes the `sidePane` prop optional.

### sidePane Prop Is Now Optional

**Before (v2.0.0):**
```tsx
<IProps> {
  sidePane: { /* required */ }
}
```

**After (v2.1.0):**
```tsx
<IProps> {
  sidePane?: { /* optional */ }
}
```

If your application always passes a `sidePane` object, no migration is needed. The change only affects consumers who previously passed an empty stub to satisfy the type checker.

### New Side Pane Stack API

A context-driven stacking mechanism has been added to replace nested side pane usage. Full documentation is available in the [Examples](docs/examples.md#side-pane-stacking-nested-views) and [API Reference](docs/api.md#side-pane-stack-context-api).

**Before (anti-pattern):**
```tsx
// Nesting side panes results in cramped, unusable UI.
// Do not do this.
<div style={{ position: 'fixed', right: 0 }}>
  <ZestResponsiveLayout sidePane={{ visible: true, ... }}>
    ...
  </ZestResponsiveLayout>
</div>
```

**After (recommended):**
```tsx
import { useSidePane } from 'jattac.libs.web.zest-responsive-layout';

// Inside a child component:
const { openSidePane } = useSidePane();

openSidePane({
  title: "Detail View",
  content: <DetailContent />
});
```

**Note for v2.4.0+:** This is no longer the case. See [Version 2.4.0](#version-240-manual-provider-requirement) for the new provider requirement.

---

## Version 2.0.0 (The Gold Standard)

Version 2.0.0 introduced a more idiomatic React API, improved styling hooks, and consolidated width logic.

A compatibility layer ensures that v1 code continues to function, with deprecation warnings printed to the console during development.

### Migration: detailPane to children

**Before (v1):**
```tsx
<ZestResponsiveLayout detailPane={<MainContent />} ... />
```

**After (v2):**
```tsx
<ZestResponsiveLayout ...>
  <MainContent />
</ZestResponsiveLayout>
```

### Migration: sidePane.pane to sidePane.content

**Before (v1):**
```tsx
<ZestResponsiveLayout sidePane={{ pane: <Sidebar /> }} ... />
```

**After (v2):**
```tsx
<ZestResponsiveLayout sidePane={{ content: <Sidebar /> }} ... />
```

### Migration: desktopSidePaneWidth to sidePaneWidth

**Before (v1):**
```tsx
<ZestResponsiveLayout desktopSidePaneWidth="300px" ... />
```

**After (v2):**
```tsx
<ZestResponsiveLayout sidePaneWidth="300px" ... />
```

### New Styling Hooks

Custom `className` and `style` props can now be applied to both the root layout and the side pane element.

```tsx
<ZestResponsiveLayout
  className="my-layout"
  sidePane={{
    content: <Sidebar />,
    className: "my-sidebar"
  }}
>
  <Content />
</ZestResponsiveLayout>
```

---

## Version 1.1.0

### Desktop Overlay Introduction

Version 1.1.0 introduced a default desktop overlay to focus user attention when the side pane is open.

**To restore the previous behavior:**
```tsx
<ZestResponsiveLayout
  enableDesktopOverlay={false}
  closeOnDesktopOverlayClick={false}
  ...
/>
```
