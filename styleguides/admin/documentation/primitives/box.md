---
path: /primitives/box/
---

# Box

Our design system comes with a set of primitive components that represent our most elementary components, through which other components are built. They are basic elements, with no determined style, that are used as a starting point for other components. Check out our [Introduction](/primitives/introduction) page, to see Do's and Don'ts about primitive components. 

`Box` is versatile primitive component, with no defined style, that can be used to leverage other elementary components. The majority of our components are built on top of the `<Box>`. By default it renders a `<div>` element.  

If you want to know more about how to style a primitive component, check out our [Inline Styles](/theming/inline-styles/) page.

*Note that you may want to use one of our `Layout` components before using Box to build layouts. Also check one of our `Typography` components before using it to render a text.*



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

The Box accepts all the Patterns properties, you can use it to add admin's applications common customization.

### text

`small`, `body`, `highlight`, `action`, `subtitle`, `headline`.

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

### border

You can use it in the `Box` component.

`default`, `divider-bottom`, `divider-top`, `strong`, `disabled`, `primary`, `danger`.

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

### Palette

| value            | description |
| ---------------- | ----------- |
| `base`           | TODO        |
| `inverted`       | TODO        |
| `primary`        | TODO        |
| `secondary`      | TODO        |
| `danger`         | TODO        |
| `danger-washed`  | TODO        |
| `success`        | TODO        |
| `success-washed` | TODO        |
| `warning`        | TODO        |
| `warning-washed` | TODO        |

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

## CSS Props

The Box accepts all Style Props defined on our design system, you can use it to add customization. Check the [CSS Props](/theming/css-props) section for detailed info.

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
