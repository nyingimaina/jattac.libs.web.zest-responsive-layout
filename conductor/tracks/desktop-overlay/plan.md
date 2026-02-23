# Track Plan: Add Configurable Desktop Overlay

## Objective
Introduce a blocking overlay on the `DetailPane` when the `SidePane` is open in desktop view, providing a focused "Drawer" experience.

## Tasks
- [x] Update `IProps` in `ZestResponsiveLayout.tsx` with new overlay configuration.
- [x] Add `.detailOverlay` and update `.detailPane` styles in `ZestResponsiveLayout.module.css`.
- [x] Refactor `DetailPane.tsx` to render the overlay and handle click events.
- [x] Update `ZestResponsiveLayout.tsx` to pass new props to `DetailPane`.
- [x] Update `README.md` with new props documentation.
- [x] Verify build and behavior.

## Atomic Units
1. **Styles**: Ensure `DetailPane` is `position: relative` and define the overlay aesthetics.
2. **DetailPane Logic**: Implement the conditional rendering and click-to-dismiss handler.
3. **Public API**: Expose and document the control props.
