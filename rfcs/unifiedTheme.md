# RFC Unified Theme Architecture

- Start Date: 2020-08-27
- PR: https://github.com/vtex/onda/pull/25

# Summary

Introduce new architecture on how to theme base components. The main reasons are:

- Standardize property names through a series of styleguides.
- Reuse common theme definitions.

# Basic example [optional]

On theme:

```ts
const theme = {
  /** ...(theme as it is) */
  components: {
    button: {
      styles: { /** button default styles */ }
      variant: { /** button variants */ }
      size: { /** button sizes */ }
    }
    skeleton: {
      styles: { /** skeleton default styles */ }
      variant: { /** skeleton variants */ }
    }
  }
}
```

on Styleguide's Button component:

```jsx
import Base from '@vtex-components/button'

function StyleguideButton({ children, variant, size }) {
  return (
    <Base variant={variant} size={size}>
      {children}
    </Base>
  )
}
```

# Detailed design

There are 3 protagonists into this architecture:

1. 🆕 `@vtex-components/theme`: Defines the common types and export theme utils.
2. Styled base-component: Documents it's theme surface area and consumes it.
3. Styleguide: Imports the Styled base-component and implements it's defined surface area.

## Workflow: Create Styled base-component

1. Document your surface area with:

- id: key of the component on the theme,
- modifiers: props that the component consumes, such as `variant`, `size`, etc.

2. Import the `useComponentSx` hook from `@vtex-components/theme`.
3. Pass your surface to it: `useComponentSx(id, { ... modifiers })`.

## Workflow: Subscribe to a Styled base-component surface area.

1. On the theme object entry the component's `id` into `components`.
2. Read with care the documentation of the base component and fill de modifiers.
3. Remember that every base-component has the `styles` modifier on its theme.

# Drawbacks

- Increase the learning curve by adding the patterns, due to the abstraction on top of theme-ui.
- The theme definition can become huge if a lot of components have intricate variants.

# Adoption strategy & Education

- Documentation into a \docs folder on onda's root with all patterns.
- Guidelines on common solutions.
