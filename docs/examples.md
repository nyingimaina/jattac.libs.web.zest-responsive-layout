# Examples

Common usage patterns for the `ZestResponsiveLayout` component.

---

## Table of Contents

- [Basic Layout](#basic-layout)
- [Custom Desktop Width](#custom-desktop-width)
- [Mobile Breakpoint Configuration](#mobile-breakpoint-configuration)
- [Animation Control](#animation-control)
- [Desktop Overlay Configuration](#desktop-overlay-configuration)
- [State Preservation with keepMounted](#state-preservation-with-keepmounted)
- [Side Pane Stacking (Nested Views)](#side-pane-stacking-nested-views)
  - [Function Components with useSidePane](#function-components-with-usesidepane)
  - [Class Components with withSidePane HOC](#class-components-with-withsidepane-hoc)
  - [Class Components with SidePaneConsumer](#class-components-with-sidepaneconsumer)
  - [Deep Nesting and Data Preservation](#deep-nesting-and-data-preservation)
  - [Nesting with Form State Preservation](#nesting-with-form-state-preservation)
- [Custom Styling](#custom-styling)

---

## Basic Layout

A standard sidebar-and-content layout with automatic mobile responsiveness.

```tsx
import { ZestResponsiveLayout } from 'jattac.libs.web.zest-responsive-layout';
import { useState } from 'react';

const BasicApp = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <ZestResponsiveLayout
      sidePane={{
        visible: isOpen,
        title: "Menu",
        content: <ul><li>Home</li><li>Profile</li></ul>,
        onClose: () => setIsOpen(false)
      }}
    >
      <div>
        <button onClick={() => setIsOpen(true)}>Open Menu</button>
        <p>Main content goes here.</p>
      </div>
    </ZestResponsiveLayout>
  );
};
```

On viewports narrower than the configured breakpoint (default 768px), the side pane renders as a full-screen overlay that slides in from the right edge.

---

## Custom Desktop Width

```tsx
<ZestResponsiveLayout
  sidePaneWidth="300px"
  sidePane={{
    visible: true,
    content: <nav>Fixed Width Sidebar</nav>
  }}
>
  <main>Dynamic Content</main>
</ZestResponsiveLayout>
```

The `sidePaneWidth` prop accepts any valid CSS length value, including `"30%"`, `"400px"`, or `"20vw"`.

---

## Mobile Breakpoint Configuration

```tsx
<ZestResponsiveLayout
  mobileBreakpointPx={1024}
  sidePane={{
    visible: true,
    content: <nav>Responsive Menu</nav>
  }}
>
  <main>Content</main>
</ZestResponsiveLayout>
```

Use this to switch the layout to mobile mode at a higher or lower viewport width.

---

## Animation Control

```tsx
<ZestResponsiveLayout
  enableBounceAnimation={false}
  sidePane={{
    visible: true,
    content: <nav>Sidebar</nav>
  }}
>
  <main>Content</main>
</ZestResponsiveLayout>
```

Disable the bounce animation for applications that require a more restrained visual style or need to conform to accessibility guidelines regarding reduced motion.

---

## Desktop Overlay Configuration

```tsx
<ZestResponsiveLayout
  enableDesktopOverlay={false}
  closeOnDesktopOverlayClick={false}
  sidePane={{
    visible: true,
    content: <nav>Settings</nav>,
    onClose: () => handleClose()
  }}
>
  <main>Settings Dashboard</main>
</ZestResponsiveLayout>
```

- `enableDesktopOverlay={false}` removes the dimming overlay, allowing the main content to remain fully interactive.
- `closeOnDesktopOverlayClick={false}` prevents the side pane from closing when the overlay area is clicked; users must use the close button.

---

## State Preservation with keepMounted

```tsx
<ZestResponsiveLayout
  sidePane={{
    visible: isOpen,
    keepMounted: true,
    title: "Edit Profile",
    content: <MyComplexForm />,
    onClose: () => setIsOpen(false)
  }}
>
  <main>Main Content Area</main>
</ZestResponsiveLayout>
```

When `keepMounted` is `true`, the side pane content remains in the DOM even while hidden. This is useful when the content includes forms, data grids, or other stateful components that would be expensive or disruptive to reinitialize on each open.

---

## Side Pane Stacking (Nested Views)

**Important:** Do not nest `ZestResponsiveLayout` components or place side panes inside other side panes. Doing so produces a cramped and unusable interface. Instead, use the side pane stack API.

The stack API allows an unlimited number of side panes to be pushed onto a stack. Only the topmost pane is visible at any time. When a pane is closed, the pane below it is revealed with its state fully preserved, including form inputs, scroll position, and all component state.

### Function Components with useSidePane

The `useSidePane()` hook is the primary API for function components. It returns `openSidePane`, `closeSidePane`, `stackLength`, and `stack`.

```tsx
import {
  ZestResponsiveLayout,
  useSidePane,
  ISidePaneConfig
} from 'jattac.libs.web.zest-responsive-layout';
import { useState } from 'react';

const ItemList = () => {
  const { openSidePane } = useSidePane();
  const items = [
    { id: 1, name: "Project Alpha" },
    { id: 2, name: "Project Beta" }
  ];

  return (
    <div>
      {items.map(item => (
        <button key={item.id} onClick={() => {
          openSidePane({
            title: item.name,
            content: <ItemDetail item={item} />
          });
        }}>
          View {item.name}
        </button>
      ))}
    </div>
  );
};

const ItemDetail = ({ item }: { item: { id: number; name: string } }) => {
  const { openSidePane, stackLength } = useSidePane();

  return (
    <div>
      <h2>{item.name}</h2>
      <p>Stack depth: {stackLength}</p>
      <button onClick={() => openSidePane({
        title: "Edit " + item.name,
        content: <div>Edit form for {item.name}</div>
      })}>
        Edit
      </button>
    </div>
  );
};

const App = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <ZestResponsiveLayout
      sidePane={{
        visible: isOpen,
        title: "Projects",
        content: <ItemList />,
        onClose: () => setIsOpen(false)
      }}
    >
      <main>
        <button onClick={() => setIsOpen(true)}>Open Projects</button>
      </main>
    </ZestResponsiveLayout>
  );
};
```

### Class Components with withSidePane HOC

Class components can use the `withSidePane` higher-order component, which injects `openSidePane`, `closeSidePane`, and `stackLength` as props.

```tsx
import {
  ZestResponsiveLayout,
  withSidePane,
  WithSidePaneProps,
  ISidePaneConfig
} from 'jattac.libs.web.zest-responsive-layout';
import React from 'react';

interface ProjectListProps extends WithSidePaneProps {}

class ProjectList extends React.Component<ProjectListProps> {
  private items = [
    { id: 1, name: "Project Alpha" },
    { id: 2, name: "Project Beta" },
    { id: 3, name: "Project Gamma" }
  ];

  private handleView(item: { id: number; name: string }): void {
    this.props.openSidePane({
      title: item.name,
      content: <ProjectDetail item={item} />
    });
  }

  render() {
    return (
      <div>
        {this.items.map(item => (
          <button key={item.id} onClick={() => this.handleView(item)}>
            View {item.name}
          </button>
        ))}
        <p>Current stack depth: {this.props.stackLength}</p>
      </div>
    );
  }
}

// Wrap with the HOC to inject side pane context props
const ProjectListWithSidePane = withSidePane(ProjectList);

const App = () => {
  return (
    <ZestResponsiveLayout
      sidePane={{
        visible: true,
        title: "Projects",
        content: <ProjectListWithSidePane />
      }}
    >
      <main>Main Content</main>
    </ZestResponsiveLayout>
  );
};
```

### Class Components with SidePaneConsumer

An alternative for class components is the `SidePaneConsumer` render-prop component. This avoids the HOC wrapper and gives direct access to the full context value, including the raw stack array.

```tsx
import {
  ZestResponsiveLayout,
  SidePaneConsumer
} from 'jattac.libs.web.zest-responsive-layout';
import React from 'react';

interface TaskListState {
  tasks: { id: number; title: string }[];
}

class TaskList extends React.Component<{}, TaskListState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      tasks: [
        { id: 1, title: "Design review" },
        { id: 2, title: "API integration" },
        { id: 3, title: "Testing" }
      ]
    };
  }

  render() {
    return (
      <SidePaneConsumer>
        {({ openSidePane, closeSidePane, stackLength, stack }) => (
          <div>
            <h3>Tasks (stack depth: {stackLength})</h3>
            <ul>
              {this.state.tasks.map(task => (
                <li key={task.id}>
                  {task.title}
                  <button onClick={() => openSidePane({
                    title: "Task Details",
                    content: <div>
                      <p>Task: {task.title}</p>
                      <button onClick={() => openSidePane({
                        title: "Assign",
                        content: <div>Assignment form for {task.title}</div>
                      })}>
                        Assign
                      </button>
                    </div>
                  })}>
                    View
                  </button>
                </li>
              ))}
            </ul>
            {stackLength > 0 && (
              <button onClick={closeSidePane}>Back</button>
            )}
          </div>
        )}
      </SidePaneConsumer>
    );
  }
}

const App = () => {
  return (
    <ZestResponsiveLayout
      sidePane={{
        visible: true,
        title: "Task Manager",
        content: <TaskList />
      }}
    >
      <main>Main Content</main>
    </ZestResponsiveLayout>
  );
};
```

### Deep Nesting and Data Preservation

The stack API supports an arbitrary number of nested panes. Each level pushes a new entry onto the stack. When the user closes panes one by one, each previous pane is restored with its component state intact.

The following example demonstrates four levels of nesting with form data preservation:

```tsx
import {
  ZestResponsiveLayout,
  useSidePane
} from 'jattac.libs.web.zest-responsive-layout';
import { useState } from 'react';

// Level 1: Order list
const OrderList = () => {
  const { openSidePane } = useSidePane();

  return (
    <div>
      <h3>Orders</h3>
      {[1001, 1002, 1003].map(id => (
        <div key={id}>
          Order #{id}
          <button onClick={() => openSidePane({
            title: `Order #${id}`,
            content: <OrderDetail orderId={id} />
          })}>
            View
          </button>
        </div>
      ))}
    </div>
  );
};

// Level 2: Order detail with edit action
const OrderDetail = ({ orderId }: { orderId: number }) => {
  const { openSidePane } = useSidePane();

  return (
    <div>
      <h4>Order #{orderId}</h4>
      <p>Status: Pending</p>
      <p>Items: 3 line items</p>
      <button onClick={() => openSidePane({
        title: `Edit Order #${orderId}`,
        content: <OrderEdit orderId={orderId} />
      })}>
        Edit Order
      </button>
    </div>
  );
};

// Level 3: Order edit form with line-item drill-in
const OrderEdit = ({ orderId }: { orderId: number }) => {
  const [notes, setNotes] = useState("");
  const { openSidePane } = useSidePane();

  return (
    <div>
      <h4>Edit Order #{orderId}</h4>
      <label>
        Notes:
        <textarea value={notes} onChange={e => setNotes(e.target.value)} />
      </label>
      <h5>Line Items</h5>
      {["Widget A", "Widget B", "Widget C"].map((item, i) => (
        <div key={i}>
          {item}
          <button onClick={() => openSidePane({
            title: `Edit ${item}`,
            content: <LineItemEdit
              itemName={item}
              onBack={() => openSidePane({
                title: `Edit Order #${orderId}`,
                content: <OrderEdit orderId={orderId} />
              })}
            />
          })}>
            Edit Line Item
          </button>
        </div>
      ))}
    </div>
  );
};

// Level 4: Line item editor
const LineItemEdit = ({
  itemName,
  onBack
}: {
  itemName: string;
  onBack: () => void;
}) => {
  const [quantity, setQuantity] = useState(1);

  return (
    <div>
      <h4>Edit {itemName}</h4>
      <label>
        Quantity:
        <input
          type="number"
          value={quantity}
          onChange={e => setQuantity(Number(e.target.value))}
        />
      </label>
      <p>Selected quantity: {quantity}</p>
      <button onClick={onBack}>Save and Return</button>
    </div>
  );
};

const App = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <ZestResponsiveLayout
      sidePane={{
        visible: isOpen,
        title: "Order Management",
        content: <OrderList />,
        onClose: () => setIsOpen(false)
      }}
    >
      <main>
        <button onClick={() => setIsOpen(true)}>Open Orders</button>
      </main>
    </ZestResponsiveLayout>
  );
};
```

**Navigation flow:**

1. User opens the Orders pane.
2. User clicks "View" on Order #1001, pushing `OrderDetail` onto the stack.
3. User clicks "Edit Order", pushing `OrderEdit` onto the stack.
4. User types notes in the textarea (state is tracked in `OrderEdit`).
5. User clicks "Edit Line Item" on "Widget A", pushing `LineItemEdit` onto the stack.
6. User changes quantity to 5.
7. User clicks the close button (x) four times, or the overlay four times if configured.
8. Each close pops one level: `LineItemEdit` closes, revealing `OrderEdit` with the notes textarea still containing the typed text.
9. Another close reveals `OrderDetail`. Another close reveals `OrderList`. Final close returns to the main application.

**Data preservation guarantees:**

- The notes textarea in `OrderEdit` retains its value across all intervening pushes and pops.
- The quantity input in `LineItemEdit` retains its value as long as the pane is on the stack.
- Any React state, refs, timers, or subscriptions within each pane continue to function normally across hide and show cycles.
- The only data that is reset is component state that is explicitly cleaned up by the consumer (e.g., in a `useEffect` cleanup function).

### Nesting with Form State Preservation

A common requirement is to have a form inside one side pane that remains filled in while the user drills into a reference data lookup in another side pane. The stack API handles this inherently.

```tsx
import {
  ZestResponsiveLayout,
  useSidePane
} from 'jattac.libs.web.zest-responsive-layout';
import { useState } from 'react';

// A form inside a side pane
const CustomerForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [country, setCountry] = useState("");
  const { openSidePane } = useSidePane();

  return (
    <div>
      <h3>Customer Details</h3>
      <div>
        <label>Name:</label>
        <input value={name} onChange={e => setName(e.target.value)} />
      </div>
      <div>
        <label>Email:</label>
        <input value={email} onChange={e => setEmail(e.target.value)} />
      </div>
      <div>
        <label>Country:</label>
        <input value={country} placeholder="Click Lookup to search" readOnly />
        <button onClick={() => openSidePane({
          title: "Country Lookup",
          content: <CountryLookup onSelect={(c) => {
            setCountry(c);
          }} />
        })}>
          Lookup
        </button>
      </div>
      <p>Name: {name}, Email: {email}, Country: {country}</p>
    </div>
  );
};

// Lookup pane that the form drills into
const CountryLookup = ({ onSelect }: { onSelect: (country: string) => void }) => {
  const [search, setSearch] = useState("");
  const { closeSidePane, openSidePane } = useSidePane();

  const countries = ["Kenya", "Uganda", "Tanzania", "Rwanda", "Burundi"]
    .filter(c => c.toLowerCase().includes(search.toLowerCase()));

  const handleSelect = (country: string) => {
    onSelect(country);
    closeSidePane();
  };

  return (
    <div>
      <h4>Search Countries</h4>
      <input
        placeholder="Type to search..."
        value={search}
        onChange={e => setSearch(e.target.value)}
      />
      <ul>
        {countries.map(c => (
          <li key={c}>
            {c}
            <button onClick={() => openSidePane({
              title: c,
              content: <CountryDetail
                country={c}
                onSelect={() => handleSelect(c)}
              />
            })}>
              Details
            </button>
            <button onClick={() => handleSelect(c)}>Select</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

const CountryDetail = ({
  country,
  onSelect
}: {
  country: string;
  onSelect: () => void;
}) => {
  const { closeSidePane } = useSidePane();

  return (
    <div>
      <h4>{country}</h4>
      <p>Region: East Africa</p>
      <p>Code: {country.substring(0, 3).toUpperCase()}</p>
      <button onClick={() => {
        onSelect();
        closeSidePane();
      }}>
        Select This Country
      </button>
    </div>
  );
};

const App = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <ZestResponsiveLayout
      sidePane={{
        visible: isOpen,
        title: "Customer",
        content: <CustomerForm />,
        onClose: () => setIsOpen(false)
      }}
    >
      <main>
        <button onClick={() => setIsOpen(true)}>Open Customer Form</button>
      </main>
    </ZestResponsiveLayout>
  );
};
```

**Behavior:**

1. User opens the Customer form and types "John" as the name and "john@example.com" as the email.
2. User clicks "Lookup" to find a country, pushing `CountryLookup` onto the stack.
3. User types "Ken" in the search field within the lookup (internal state of `CountryLookup`).
4. User clicks "Details" on Kenya, pushing `CountryDetail` onto the stack.
5. User clicks "Select This Country".
6. `CountryDetail` and `CountryLookup` are popped from the stack (two close operations).
7. The `CustomerForm` is revealed with "John" and "john@example.com" still in the input fields, and "Kenya" now populated in the Country field.

---

## Custom Styling

```tsx
<ZestResponsiveLayout
  className="my-app-layout"
  style={{ background: "#f0f0f0" }}
  sidePane={{
    visible: true,
    content: <Sidebar />,
    className: "my-custom-sidebar"
  }}
>
  <Content />
</ZestResponsiveLayout>
```

The `className` and `style` props on the root container apply to the outermost layout wrapper. The `sidePane.className` and `sidePane.style` props apply directly to the side pane element. These same props are available on `ISidePaneConfig` for stacked panes via the context API.
