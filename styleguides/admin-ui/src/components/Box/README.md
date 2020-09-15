# [alpha] Box

- 📅 Start Date: 2020-09-14
- 🏆 Champions: @matheusps

# Summary

Elementary component

# Basic example

```jsx
import { Box } from '@vtex/admin-ui'

function UseCase() {
  return <Box>👻 This is a box</Box>
}
```

# Detailed design

We wrap a reakit Box with a `@emotion/styled`. To select different tag elements, we need to remap the `as` prop to be `el`. The composition is enabled through the render-props API.

Further read https://reakit.io/docs/styling/, https://reakit.io/docs/composition/.

## Render as other elements

```jsx
import { Box } from '@vtex/admin-ui'

function WithElement() {
  return (
    <Box el="article">
      <Box el="h1">👻 I'm a h1</Box>
      <Box el="p">👻 I'm a p</Box>
      <Box>👻 I'm a div</Box>
    </Box>
  )
}
```

## Style Props

```jsx
import { Box } from '@vtex/admin-ui'

function WithStyleProps() {
  return <Box bg="primary.base">👻 This is a box</Box>
}
```

## Render Props

```jsx
import { Box, Button } from '@vtex/admin-ui'

function RenderProps() {
  return (
    <Box display="flex">
      {(props) => <Button {...props}>I'm a flex button</Button>}
    </Box>
  )
}
```

# Drawbacks

- Increases complexity

# Alternatives

- Use theme-ui box with sx.

# Adoption strategy

This component aims to reduce the learning curve and migration time from tachyons/styleguide v9.

# Education

- Documentation, as usual

# Unresolved questions

- Will the developers will enjoy using it?
