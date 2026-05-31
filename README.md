# Zest Responsive Layout

A high-performance React component for building responsive layouts with a dynamic side pane and main content area. Handles responsive behavior, animations, desktop overlays, and nested side pane management.

---

## Key Features

- **Performance-First Architecture:** GPU-accelerated CSS transforms ensure consistent 60fps animations.
- **Responsive by Default:** Intelligent mobile-to-desktop transitions with a configurable breakpoint (default 768px).
- **Nested Side Pane Management:** Built-in side pane stacking via a context-driven API. Consumers can push and pop side panes without data loss or UI cramping.
- **Desktop Overlay System:** Optional dimming overlay with configurable click-to-close behavior.
- **Type-Safe:** Full TypeScript support with exported interfaces.

---

## Installation

```bash
npm install jattac.libs.web.zest-responsive-layout
```

---

## Table of Contents

- [Key Features](#key-features)
- [Installation](#installation)
- [Quick Start](#quick-start)
- [Class Component Support](#class-component-support)
- [Documentation](#documentation)

---

## Class Component Support

Class components can access the side pane stack API via the `withSidePane` higher-order component or the `SidePaneConsumer` render-prop component. Full documentation is available in the [API Reference](docs/api.md#class-component-support).

### withSidePane HOC

```tsx
import { withSidePane, WithSidePaneProps } from 'jattac.libs.web.zest-responsive-layout';
import React from 'react';

interface MyProps extends WithSidePaneProps {}

class MyComponent extends React.Component<MyProps> {
  render() {
    return (
      <button onClick={() => this.props.openSidePane({ content: <div>Content</div> })}>
        Open (stack: {this.props.stackLength})
      </button>
    );
  }
}

export default withSidePane(MyComponent);
```

### SidePaneConsumer (render-prop)

```tsx
import { SidePaneConsumer } from 'jattac.libs.web.zest-responsive-layout';

class MyComponent extends React.Component {
  render() {
    return (
      <SidePaneConsumer>
        {({ openSidePane, stackLength }) => (
          <button onClick={() => openSidePane({ content: <div>Content</div> })}>
            Open (stack: {stackLength})
          </button>
        )}
      </SidePaneConsumer>
    );
  }
}
```

---

## Quick Start

```tsx
import { ZestResponsiveLayout } from 'jattac.libs.web.zest-responsive-layout';
import { useState } from 'react';

const App = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <ZestResponsiveLayout
      sidePane={{
        visible: isOpen,
        title: "Navigation",
        content: <nav>Sidebar Content</nav>,
        onClose: () => setIsOpen(false)
      }}
    >
      <main>Main Application Content</main>
    </ZestResponsiveLayout>
  );
};
```

---

## Documentation

1. **[API Reference](docs/api.md)** - Prop specifications and type definitions.
2. **[Examples](docs/examples.md)** - Common usage patterns, including side pane stacking.
3. **[Features](docs/features.md)** - Detailed feature descriptions.
4. **[Configuration](docs/configuration.md)** - Customization and advanced setup.
5. **[Development Guide](docs/development.md)** - Contribution and build instructions.
6. **[Breaking Changes](docs/breaking-changes.md)** - Migration between major versions.
