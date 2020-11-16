---
path: /layouts/set/
---

# Set

Our design system comes with a set of layout components to help you build common layouts inside your application. `Set` represents a set of components, that automatically space out the components. Check out our [Introduction](/layouts/introduction) page, to see Do's and Don'ts about Layout components.

## Behavior

A `<Set>` can be used to list a set of components. It will automatically space out the components, and wrap them when they reach the width of the viewport.

```jsx
import { ThemeProvider, Button, Set } from '@vtex/admin-ui'

function Example() {
  return (
    <ThemeProvider>
      <Set>
        <Button>Button 1</Button>
        <Button>Button 2</Button>
        <Button>Button 3</Button>
        <Button>Button 4</Button>
        <Button>Button 5</Button>
      </Set>
    </ThemeProvider>
  )
}
```

## Installation

```bash
yarn add @vtex/admin-ui
---
npm install @vtex/admin-ui
```

## Variation

### Spacing

The spacing between components can be controlled using the `spacing` property.

> 💡 Spacing consumes the 'space' values from the theme.

```jsx
import { ThemeProvider, Button, Set } from '@vtex/admin-ui'

function Example() {
  return (
    <ThemeProvider>
      <Set spacing={5}>
        <Button>Button 1</Button>
        <Button>Button 2</Button>
        <Button>Button 3</Button>
        <Button>Button 4</Button>
        <Button>Button 5</Button>
      </Set>
    </ThemeProvider>
  )
}
```

### Orientation

Orientation can be either `vertical` or `horizontal` (default). It can be controlled with the `orientation` property.

```jsx
import { ThemeProvider, Button, Set } from '@vtex/admin-ui'

function Example() {
  return (
    <ThemeProvider>
      <Set orientation="vertical">
        <Button>Button 1</Button>
        <Button>Button 2</Button>
        <Button>Button 3</Button>
        <Button>Button 4</Button>
        <Button>Button 5</Button>
      </Set>
    </ThemeProvider>
  )
}
```

### Fluid

While on `vertical` orientation, you can alternatively the `fluid` property. This will make the inner children, match the container width.

```jsx
import { ThemeProvider, Button, Set, Box } from '@vtex/admin-ui'

function Example() {
  return (
    <ThemeProvider>
      <Box maxWidth={320}>
        <Set orientation="vertical" fluid>
          <Button>Button 1</Button>
          <Button>Button 2</Button>
          <Button>Button 3</Button>
          <Button>Button 4</Button>
          <Button>Button 5</Button>
        </Set>
      </Box>
    </ThemeProvider>
  )
}
```

### Align

You can set items alignment (`start` [default], `end`) through the `align` prop.

```jsx
import { ThemeProvider, Button, Set } from '@vtex/admin-ui'

function Example() {
  return (
    <ThemeProvider>
      <Set align="end">
        <Button>Button 1</Button>
        <Button>Button 2</Button>
        <Button>Button 3</Button>
        <Button>Button 4</Button>
        <Button>Button 5</Button>
      </Set>
    </ThemeProvider>
  )
}
```

### Responsive Design

`orientation`, `spacing` and `align` are [`ResponsiveValues`](/docs/guide/responsive-design/#responsive-values). It means that you can pass an array to them.

```jsx
import { ThemeProvider, Button, Set, Box } from '@vtex/admin-ui'

function Example() {
  return (
    <ThemeProvider>
      <Box maxWidth={['full', 'full', 560]}>
        <Set orientation={['vertical', 'vertical', 'horizontal']} fluid>
          <Button>Button 1</Button>
          <Button>Button 2</Button>
          <Button>Button 3</Button>
          <Button>Button 4</Button>
          <Button>Button 5</Button>
        </Set>
      </Box>
    </ThemeProvider>
  )
}
```

## Customization

You can use the `styleOverrides` property to handle different styles.

```jsx
import { ThemeProvider, Button, Set } from '@vtex/admin-ui'

function Example() {
  return (
    <ThemeProvider>
      <Set
        styleOverrides={{ bg: 'muted.4', borderRadius: 'default', padding: 4 }}
      >
        <Button>Button 1</Button>
        <Button>Button 2</Button>
        <Button>Button 3</Button>
        <Button>Button 4</Button>
        <Button>Button 5</Button>
      </Set>
    </ThemeProvider>
  )
}
```

## Limitations

This component uses a flexbox under the hood. Knowing that it has the same limitations.

# Props

<proptypes component="Set" />
