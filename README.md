# Zest Responsive Layout 🍋

### Building buttery-smooth, responsive React layouts has never been easier.

Zest Responsive Layout is a high-performance React component designed to solve the common challenge of creating consistent, professional layouts with a dynamic side pane and main content area. It handles the heavy lifting of responsive behavior, animations, and desktop overlays, so you can focus on building your features.

### Key Features
*   🚀 **Performance First:** Optimized with GPU-accelerated transforms to ensure 60fps animations.
*   📱 **Seamless Responsiveness:** Intelligent mobile-to-desktop transitions with a configurable breakpoint.
*   ✨ **Playful UX:** Built-in bounce animations and desktop overlays for a modern, "zesty" feel.
*   🛠️ **Highly Configurable:** Complete control over widths, visibility, and interaction behavior.
*   📦 **Lightweight & Type-Safe:** Zero-bloat implementation with full TypeScript support.

### Installation

```bash
npm install jattac.libs.web.zest-responsive-layout
```

### Basic Usage ("Hello World")

Get a professional layout up and running in seconds:

```tsx
import { ZestResponsiveLayout } from 'jattac.libs.web.zest-responsive-layout';

const App = () => (
  <ZestResponsiveLayout
    sidePane={{
      visible: true,
      title: "Navigation",
      content: <nav>My Sidebar Content</nav>
    }}
  >
    <main>My Main Application Content</main>
  </ZestResponsiveLayout>
);
```

### Next Steps

Ready to dive deeper? Explore our documentation:

1.  **[The Cookbook (Examples)](https://github.com/nyingimaina/jattac.libs.web.zest-responsive-layout/blob/master/docs/examples.md)** - **Start here!** Learn by building practical recipes.
2.  [Features Showcase](https://github.com/nyingimaina/jattac.libs.web.zest-responsive-layout/blob/master/docs/features.md) - See what else Zest can do.
3.  [API Reference](https://github.com/nyingimaina/jattac.libs.web.zest-responsive-layout/blob/master/docs/api.md) - Technical specifications and prop tables.
4.  [Configuration](https://github.com/nyingimaina/jattac.libs.web.zest-responsive-layout/blob/master/docs/configuration.md) - Deep-dive into customization.
5.  [Development Guide](https://github.com/nyingimaina/jattac.libs.web.zest-responsive-layout/blob/master/docs/development.md) - For contributors and advanced users.
6.  [Breaking Changes (Migration Guide)](https://github.com/nyingimaina/jattac.libs.web.zest-responsive-layout/blob/master/docs/breaking-changes.md) - Upgrading from v1 to v2.
7.  **[Bug Fixes](./conductor/fixes.md)** - History of resolved issues.

---

[Next: The Cookbook (Examples) →](https://github.com/nyingimaina/jattac.libs.web.zest-responsive-layout/blob/master/docs/examples.md)
