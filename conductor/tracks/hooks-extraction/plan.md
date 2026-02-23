# Track Plan: Extract Logic into Custom Hooks

## Objective
Remove viewport detection, outside click handling, and hydration logic from the main component and move them into reusable hooks.

## Tasks
- [x] Create `useIsMobile` hook in `src/hooks/useIsMobile.ts`
- [x] Create `useOutsideClick` hook in `src/hooks/useOutsideClick.ts`
- [x] Create `useIsHydrated` hook in `src/hooks/useIsHydrated.ts`
- [x] Refactor `ZestResponsiveLayout.tsx` to use these hooks.
- [x] Verify build and behavior.

## Atomic Units
1. **`useIsMobile`**: Should handle window resize and REM-based breakpoint logic.
2. **`useOutsideClick`**: Should handle mousedown events and ref checking.
3. **`useIsHydrated`**: Should handle the mounting state for SSR safety.
