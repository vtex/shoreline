---
path: /primitives/box/
---

# Box

The majority of our components are built on top of the `<Box>` primitive. By default it renders a `<div>` element.

> You may want to try to use one of our `Layout` components before using Box to build layouts, and also, check one of our Typography components before using it to render a text.

## Behavior

```jsx
import { Box, ThemeProvider } from '@vtex/admin-ui'

function Example() {
  return (
    <ThemeProvider>
      <Box>This is a Box</Box>
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

## styles

```jsx
import { Box, ThemeProvider } from '@vtex/admin-ui'

function Example() {
  return (
    <ThemeProvider>
      <Box styles={{ display: 'flex', div: { paddingX: 2, marginX: 2 } }}>
        <Box border="default">First</Box>
        <Box border="default">Second</Box>
        <Box border="default">Third</Box>
      </Box>
    </ThemeProvider>
  )
}
```

## patterns

```jsx
import { Box, ThemeProvider } from '@vtex/admin-ui'

function Example() {
  return (
    <ThemeProvider>
      <Box text="headline" palette="primary">
        This is also a Box, but styled with a pattern
      </Box>
    </ThemeProvider>
  )
}
```

## style-Props

```jsx
import { Box, ThemeProvider } from '@vtex/admin-ui'

function Example() {
  return (
    <ThemeProvider>
      <Box padding="4" width="1/2">
        This is also a Box, but styled
      </Box>
    </ThemeProvider>
  )
}
```

## `element` Prop

```jsx
import { ThemeProvider, Box } from '@vtex/admin-ui'

function Example() {
  return (
    <ThemeProvider>
      <Box element="article">
        <Box element="h1">👻 I'm a h1</Box>
        <Box element="p">👻 I'm a p</Box>
        <Box>👻 I'm a div</Box>
      </Box>
    </ThemeProvider>
  )
}
```

# Props

<proptypes heading="Box" component="Box" />
