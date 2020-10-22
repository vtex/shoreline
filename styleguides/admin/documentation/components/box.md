---
path: /docs/box/
---

# Box

We wrap a reakit Box with a `@emotion/styled`. To select different tag elements, we need to remap the `as` prop to be `el`. The composition is enabled through the render-props API.

Further read [reakit/Styling](https://reakit.io/docs/styling/), [reakit/Composition](https://reakit.io/docs/composition/).

## Behavior

```jsx
import { Box, ThemeProvider } from '@vtex/admin-ui'

function Example() {
  return (
    <ThemeProvider>
      <Box>
        This is a Box
      </Box>
    </ThemeProvider>
  )
}
```

## Installation

```static
yarn add @vtex/admin-ui
```

```jsx static
import { Box } from '@vtex/admin-ui'
```
Learn more in [Get started](/docs/get-started/).

## Variation
### Styled Props

```jsx
import { Box, ThemeProvider } from '@vtex/admin-ui'

function Example() {
  return (
    <ThemeProvider>
      <Box bg="primary.washed" p="5" c="primary.base" fs="3" br="3">
        This is also a Box, but styled
      </Box>
    </ThemeProvider>
  )
}
```

### `el` Prop

```jsx
import { Box } from '@vtex/admin-ui'

function Example() {
  return (
    <Box el="article">
      <Box el="h1">👻 I'm a h1</Box>
      <Box el="p">👻 I'm a p</Box>
      <Box>👻 I'm a div</Box>
    </Box>
  )
}
```

# Props
### WIP
<proptypes heading="Box" component="Box" />



