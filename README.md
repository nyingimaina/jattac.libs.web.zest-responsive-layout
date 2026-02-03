# jattac.libs.web.zest-responsive-layout

[![npm version](https://badge.fury.io/js/jattac.libs.web.zest-responsive-layout.svg)](https://www.npmjs.com/package/jattac.libs.web.zest-responsive-layout)

A highly performant and flexible React component for building responsive layouts with a dynamic side pane and main content area. Features customizable desktop widths, bounce animations, and a configurable mobile breakpoint for seamless user experiences across devices.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
  - [Basic Example](#basic-example)
  - [Advanced Example](#advanced-example)
- [Props Reference](#props-reference)
  - [IProps](#ipropst)
  - [IProps.sidePane](#ipropstsidepane)
- [Styling Customization](#styling-customization)
- [Performance Considerations](#performance-considerations)
- [Contributing](#contributing)
- [License](#license)

## Installation

You can install the package using npm or yarn:

```bash
npm install jattac.libs.web.zest-responsive-layout
# or
yarn add jattac.libs.web.zest-responsive-layout
```

## Usage

The `ZestResponsiveLayout` component provides a flexible structure for displaying a main content area alongside a collapsible side pane, adapting its behavior for both desktop and mobile views.

### Basic Example

Here's a simple example of how to use the `ZestResponsiveLayout` component:

```typescript jsx
import React, { useState } from 'react';
import ZestResponsiveLayout from 'jattac.libs.web.zest-responsive-layout';

const App = () => {
  const [isSidePaneVisible, setIsSidePaneVisible] = useState(true);

  return (
    <ZestResponsiveLayout
      sidePane={{
        visible: isSidePaneVisible,
        title: <h2>Side Pane Title</h2>,
        pane: (
          <div>
            <p>This is the content of the side pane.</p>
            <button onClick={() => setIsSidePaneVisible(false)}>Close Side Pane</button>
          </div>
        ),
        onClose: () => setIsSidePaneVisible(false),
      }}
      detailPane={
        <div>
          <h1>Main Content Area</h1>
          <p>This is the detailed content of your application.</p>
          <button onClick={() => setIsSidePaneVisible(true)}>Open Side Pane</button>
        </div>
      }
    />
  );
};

export default App;
```

### Advanced Example

This example demonstrates how to utilize all available props for fine-grained control over the layout:

```typescript jsx
import React, { useState } from 'react';
import ZestResponsiveLayout from 'jattac.libs.web.zest-responsive-layout';

const AdvancedApp = () => {
  const [isSidePaneVisible, setIsSidePaneVisible] = useState(false);

  return (
    <ZestResponsiveLayout
      sidePane={{
        visible: isSidePaneVisible,
        title: <h3>Settings</h3>,
        pane: (
          <div>
            <p>Advanced settings options go here.</p>
            <button onClick={() => setIsSidePaneVisible(false)}>Done</button>
          </div>
        ),
        onClose: () => setIsSidePaneVisible(false),
        widthRems: 25, // Side pane width in rems (desktop only, for internal calculations)
      }}
      detailPane={
        <div>
          <h1>Dashboard Overview</h1>
          <p>Welcome to your personalized dashboard.</p>
          <button onClick={() => setIsSidePaneVisible(true)}>Open Settings</button>
        </div>
      }
      desktopSidePaneWidth="30vw"       // Custom desktop side pane width
      desktopDetailPaneWidth="70vw"    // Custom desktop detail pane width
      enableBounceAnimation={true}     // Enable the bounce effect for transitions
      mobileBreakpointPx={992}         // Set mobile breakpoint to 992px
    />
  );
};

export default AdvancedApp;
```

## Props Reference

### `IProps`

| Prop                    | Type                      | Description                                                                                                                                              | Default     |
| :---------------------- | :------------------------ | :------------------------------------------------------------------------------------------------------------------------------------------------------- | :---------- |
| `sidePane`              | `IProps.sidePane`         | An object containing configuration and content for the collapsible side pane.                                                                            | `(required)` |
| `detailPane`            | `React.ReactNode`         | The primary content to be displayed in the main area of the layout.                                                                                      | `(required)` |
| `desktopSidePaneWidth`  | `string`                  | Custom width for the side pane in desktop view (e.g., `"300px"`, `"30vw"`). Overrides default CSS variable.                                           | `"25vw"`    |
| `desktopDetailPaneWidth`| `string`                  | Custom width for the detail pane in desktop view (e.g., `"700px"`, `"70vw"`). Overrides default CSS variable.                                         | `"75vw"`    |
| `enableBounceAnimation` | `boolean`                 | If `true`, enables a bounce animation effect for the side pane's open/close transitions.                                                               | `false`     |
| `mobileBreakpointPx`    | `number`                  | Custom pixel width for the mobile breakpoint. When `window.innerWidth` falls below this value, the layout switches to mobile behavior.               | `768`       |

### `IProps.sidePane`

| Prop       | Type              | Description                                                                 | Default      |
| :--------- | :---------------- | :-------------------------------------------------------------------------- | :----------- |
| `visible`  | `boolean`         | Controls the visibility state of the side pane.                             | `(required)` |
| `pane`     | `React.ReactNode` | The content to be rendered inside the side pane.                            | `(required)` |
| `title`    | `React.ReactNode` | The title to be displayed at the top of the side pane.                      | `(required)` |
| `onClose`  | `() => void`      | Optional callback function invoked when the side pane's close button is clicked. | `undefined`  |
| `widthRems`| `number`          | **(Deprecated/Internal)** Defaults to 30. Historically used for internal width calculations. Consider using `desktopSidePaneWidth` for external control. | `30`         |

## Styling Customization

The component uses CSS Modules for styling, which provides scoped class names to prevent conflicts. You can override certain aspects of the layout through the provided props:

*   **`desktopSidePaneWidth` and `desktopDetailPaneWidth`**: These props directly set CSS custom properties (`--sidepane-width-desktop` and `--detailpane-width-desktop`) on the main container element. This allows you to easily control the distribution of space in desktop view.

For more advanced styling, you can either:
*   Use global CSS to target specific elements if you inspect their generated class names (though this is less recommended with CSS Modules).
*   Wrap the `ZestResponsiveLayout` component in a container and apply your own styles to the wrapper.
*   Pass styled React components directly as `detailPane` or `sidePane.pane` content.

## Performance Considerations

This component has been optimized to prevent common performance pitfalls in responsive layouts:

*   **`transform` over `width` animations:** Transitions and animations primarily leverage the `transform` CSS property, which is often GPU-accelerated and avoids expensive browser layout recalculations that occur when animating `width`.
*   **Flexbox for Layout:** Utilizes Flexbox for efficient layout management, allowing the main content to fluidly adapt to the side pane's presence.
*   **`PureComponent`:** The component extends `PureComponent`, performing a shallow comparison of props and state to prevent unnecessary re-renders.

These optimizations contribute to a smooth and responsive user experience, even during complex transitions.

## Contributing

Contributions are welcome! Please feel free to open an issue or submit a pull request.

## License

This project is licensed under the ISC License.
