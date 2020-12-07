---
path: /primitives/box/
---

# Box

Our design system comes with a set of primitive components that represent our most elementary components, through which other components are built. They are basic elements, with no determined style, that are used as a starting point for other components. Check out our [Introduction](/primitives/introduction) page, to see Do's and Don'ts about primitive components.

`Box` is versatile primitive component, with no defined style, that can be used to leverage other elementary components. The majority of our components are built on top of the `<Box>`. By default it renders a `<div>` element.

If you want to know more about how to style a primitive component, check out our [Inline Styles](/theming/inline-styles/) page.

_Note that you may want to use one of our `Layout` components before using Box to build layouts. Also check one of our `Typography` components before using it to render a text._

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
        <Box styles={{ border: 'default' }}>First</Box>
        <Box styles={{ border: 'default' }}>Second</Box>
        <Box styles={{ border: 'default' }}>Third</Box>
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
      <Box styles={{ text: 'small' }}>Small Text</Box>
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

## Polymorphism

Box can be rendered as any HTML tag or component.

```jsx
import { ThemeProvider, Box, Anchor } from '@vtex/admin-ui'
import { IconLink } from '@vtex/admin-ui-icons'

function Example() {
  return (
    <ThemeProvider>
      <Box element="article">
        <Box element="section">👻 I'm a section</Box>
        <Box>👻 I'm a div</Box>
        <Box element="footer">👻 I'm a footer</Box>
        <Box
          styles={{ display: 'block' }}
          element="a"
          href="/typography/anchor"
        >
          <IconLink /> I'm a link to anchor docs
        </Box>
      </Box>
    </ThemeProvider>
  )
}
```

# Props

<proptypes heading="Box" component="Box" />
