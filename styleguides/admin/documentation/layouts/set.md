---
path: /docs/layouts/set/
next: true
---

# Set

## Behavior

A `<Set>` can be used to list a set of components. It will automatically space out the components, and wrap them when they reach the width of the viewport.

```jsx
import {
  unstableThemeProvider as ThemeProvider,
  unstableButton as Button,
  unstableSet as Set,
} from '@vtex/admin-ui'

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

`<Set>` uses the upcoming `@vtex/admin-ui-system` package. This means you need to install the `latest` version:

```bash
yarn add @vtex/admin-ui@latest
---
npm install @vtex/admin-ui@latest
```

## Variation

### Spacing

The spacing between components can be controlled using the `spacing` property.

> 💡 Spacing consumes the 'space' values from the theme.

```jsx
import {
  unstableThemeProvider as ThemeProvider,
  unstableButton as Button,
  unstableSet as Set,
} from '@vtex/admin-ui'

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

Orientation can be either `vertical` or `horizontal` (default). It can be controled with the `orientation` property.

```jsx
import {
  unstableThemeProvider as ThemeProvider,
  unstableButton as Button,
  unstableSet as Set,
} from '@vtex/admin-ui'

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

While on `vertical` orientation, you can alternativelly the `fluid` property. This will make the inner children, match the container width.

```jsx
import {
  unstableThemeProvider as ThemeProvider,
  unstableButton as Button,
  unstableSet as Set,
  unstableBox as Box,
} from '@vtex/admin-ui'

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

### Responsive Design

`orientation`, `spacing` and `align` are `ResponsiveValues`.

```jsx
import {
  unstableThemeProvider as ThemeProvider,
  unstableButton as Button,
  unstableSet as Set,
  unstableBox as Box,
} from '@vtex/admin-ui'

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

## 5. Code example

For each variation, include code examples in React.

## 6. Props

In a table, include the following attributes for each prop:

- Prop name
- Description
- Type
- Default value
- Required
- Optional props

| Prop name | Description | Type | Default value | Required?  |
| --------- | ----------- | ---- | ------------- | ---------- |
|           |             |      |               | true/false |

## 7. State objects

Include code examples for stateful components.

## 8. Labels

Include any labels present in the component.

## 9. Customization

For each customization possible, make sure to include:

- Description
- Code example
- Labels

## 10. Limitations

Include here any behaviors or customizations that the component doesn't yet support.
