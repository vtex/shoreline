---
path: /docs/box/
nightly: true
---

# Box

We wrap a reakit Box with a `@emotion/styled`. To select different tag elements, we need to remap the `as` prop to be `el`. The composition is enabled through the render-props API.

Further read [reakit/Styling](https://reakit.io/docs/styling/), [reakit/Composition](https://reakit.io/docs/composition/).

## Behavior

```jsx
import { Box } from 'reakit/Box'

function Example() {
  return <Box>Box</Box>
}
```

## Installation

```sh
yarn add @vtex/admin-ui
```

Learn more in [Get started](/docs/get-started/).

## Styled Props

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

## `el` Prop

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

<proptypes heading="Box" component="Box" />
