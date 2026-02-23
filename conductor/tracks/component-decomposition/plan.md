# Track Plan: Decompose Layout into Sub-components

## Objective
Split `ZestResponsiveLayout.tsx` into smaller, focused components to improve readability and maintainability.

## Tasks
- [x] Create `SidePane` component in `src/UI/SidePane.tsx`
- [x] Create `DetailPane` component in `src/UI/DetailPane.tsx`
- [x] Update `ZestResponsiveLayout.tsx` to compose these components.
- [x] Verify build and behavior.

## Atomic Units
1. **`SidePane`**: Encapsulates header, close button, and animation logic.
2. **`DetailPane`**: Encapsulates flex-basis calculations and transitions.
