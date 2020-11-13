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

## Styles

With the `styles` property, you can add any customization to the Box component. Check the [StyleObject](/theming/style-object) page for detailed info.

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

## Patterns

The Box accepts all the Patterns properties, you can use it to add admin's applications common customization. Check the [Patterns](/theming/patterns) section for detailed info.

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

## CSS Props

The Box accepts all Style Props defined on our design system, you can use it to add customization. Check the [CSS Props](/theming/css-props) section for detailed info.

## Text

You can use it in `Label`, `Heading`, `List`, `List.Item`, and `Paragraph` components.

### Values

`small`, `body`, `highlight`, `action`, `subtitle`, `headline`.

### Example

```jsx
import { Box, Label, List, ThemeProvider } from '@vtex/admin-ui'

function Example() {
  return (
    <ThemeProvider>
      <Box text="small">Small Text</Box>
      <Label text="subtitle">Subtitle Text</Label>
      <List>
        <List.Item text="action">First</List.Item>
        <List.Item text="action">Second</List.Item>
        <List.Item text="action">Third</List.Item>
      </List>
    </ThemeProvider>
  )
}
```

## border

You can use it in the `Box` component.

### Values

`default`, `divider-bottom`, `divider-top`, `strong`, `disabled`, `primary`, `danger`.

### Example

```jsx
import { Box, ThemeProvider } from '@vtex/admin-ui'

function Example() {
  return (
    <ThemeProvider>
      <Box border="primary" paddingX={3}>
        <Box border="divider-bottom" paddingY={4}>
          First
        </Box>
        <Box border="divider-bottom" paddingY={4}>
          Second
        </Box>
        <Box paddingY={4}>Third</Box>
      </Box>
    </ThemeProvider>
  )
}
```

### Palette css-prop

You can use it in the `Box` component.

#### Values

| variant             | description |
| ------------------- | ----------- |
| `base`              |             |
| `inverted`          |             |
| `primary`           |             |
| `secondary`         |             |
| `danger`            |             |
| `danger-secondary`  |             |
| `success`           |             |
| `success-secondary` |             |
| `warning`           |             |
| `warning-secondary` |             |

### Example

```jsx
import { Box, Set, ThemeProvider } from '@vtex/admin-ui'

function Example() {
  return (
    <ThemeProvider>
      <Set orientation="vertical" fluid>
        <Box palette="base">Base Text</Box>
        <Box palette="inverted">Inverted Text</Box>
        <Box palette="primary">Primary Text</Box>
        <Box palette="danger">Danger Text</Box>
      </Set>
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

Box can be rendered as any HTML tag.

```jsx
import { ThemeProvider, Box } from '@vtex/admin-ui'

function Example() {
  return (
    <ThemeProvider>
      <Box element="article">
        <Box element="section">👻 I'm a section</Box>
        <Box>👻 I'm a div</Box>
        <Box element="footer">👻 I'm a footer</Box>
      </Box>
    </ThemeProvider>
  )
}
```

# Props

<proptypes heading="Box" component="Box" />
