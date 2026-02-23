# Breaking Changes ⚠️

A history of changes that may require manual intervention when upgrading.

### Table of Contents
*   [Version 2.0.0 (The Gold Standard)](#version-200-the-gold-standard)
*   [Version 1.1.0](#version-110)

---

[← Previous: Development](./development.md) | [Next: README →](../README.md)

---

### Version 2.0.0 (The Gold Standard)

Version 2.0 introduces a more idiomatic React API, better styling hooks, and consolidated width logic.

#### 🛠 Migration Guide (Compat Mode)
We have included a **Compatibility Layer** in v2.0.0. Your existing v1 code will continue to work, but you will see deprecation warnings in your console during development.

#### 1. Main Content: `detailPane` ⮕ `children`
Instead of passing content via a prop, use standard React children.

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

#### 2. Side Content: `sidePane.pane` ⮕ `sidePane.content`
Renamed for clarity and consistency.

**Before (v1):**
```tsx
<ZestResponsiveLayout sidePane={{ pane: <Sidebar />, ... }} ... />
```

**After (v2):**
```tsx
<ZestResponsiveLayout sidePane={{ content: <Sidebar />, ... }} ... />
```

#### 3. Width Logic: `desktopSidePaneWidth` ⮕ `sidePaneWidth`
Consolidated into a single, clearer control.

**Before (v1):**
```tsx
<ZestResponsiveLayout desktopSidePaneWidth="300px" ... />
```

**After (v2):**
```tsx
<ZestResponsiveLayout sidePaneWidth="300px" ... />
```

#### 4. Styling Hooks
You can now pass `className` and `style` directly to the component and the side pane.

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

### Version 1.1.0

#### Introduction of Desktop Overlay
In version 1.1.0, we introduced a default desktop overlay to improve focus when the side pane is open.

**How to revert to old behavior:**
Set `enableDesktopOverlay={false}` and `closeOnDesktopOverlayClick={false}`.

---

[← Previous: Development](./development.md) | [Next: README →](../README.md)
