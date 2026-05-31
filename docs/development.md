# Development Guide

Build, contribution, and architecture documentation for the `ZestResponsiveLayout` library.

---

## Table of Contents

- [Project Architecture](#project-architecture)
- [Local Setup](#local-setup)
- [Available Scripts](#available-scripts)
- [Build Output](#build-output)

---

## Project Architecture

The library is built with React, TypeScript, and CSS Modules.

```
src/
  UI/
    ZestResponsiveLayout.tsx   - Root layout component (public API)
    SidePane.tsx               - Side pane renderer
    DetailPane.tsx             - Main content container
  context/
    SidePaneContext.tsx        - Side pane stack provider and hook
  hooks/
    useDraggable.ts            - Desktop drag repositioning logic
    useIsHydrated.ts           - SSR hydration guard
    useIsMobile.ts             - Responsive breakpoint detection
    useOutsideClick.ts         - Click-outside detection
  Styles/
    ZestResponsiveLayout.module.css  - Scoped CSS styles
  types/
    css.d.ts                   - CSS module type declarations
```

---

## Local Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/Jattac/jattac.libs.web.zest-responsive-layout.git
   cd jattac.libs.web.zest-responsive-layout
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Build the project:
   ```bash
   npm run build
   ```

---

## Available Scripts

| Command | Description |
| :--- | :--- |
| `npm run build` | Compiles the source code into `dist/` using Rollup. Generates ESM, CJS, and TypeScript declaration files. |

---

## Build Output

- `dist/ZestResponsiveLayout.js` — CommonJS bundle.
- `dist/ZestResponsiveLayout.esm.js` — ES Module bundle.
- `dist/ZestResponsiveLayout.d.ts` — TypeScript type declarations.
- `dist/UI/` and `dist/hooks/` — Supporting type declaration files.
