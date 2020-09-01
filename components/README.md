# 🌊 VTEX components

> Base components

# Architecture

## 🎨Themes

There are 3 protagonists here:

1. `@vtex-components/theme`: Defines the common types and export theme utils.
2. Styled base-component: Documents its theme surface area and consumes it.
3. Styleguide: Imports the Styled base-component and implements its defined surface area.

### Workflow 1: Create Styled base-component

1. Document your surface area with:

- id: key of the component on the theme,
- modifiers: props that the component consumes, such as `variant`, `size`, etc.

2. Import the `useComponentSx` hook from `@vtex-components/theme`.
3. Pass your surface to it: `useComponentSx(id, { ... modifiers })`.

### Workflow: Subscribe to a Styled base-component surface area.

1. On the theme object entry the component's `id` into `components`.
2. Read with care the documentation of the base component and fill de modifiers.
3. Remember that every base-component has the `styles` modifier on its theme.
