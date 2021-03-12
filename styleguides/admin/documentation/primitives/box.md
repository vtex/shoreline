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
<Box>This is a Box</Box>
```

## Installation

```sh isStatic
yarn add @vtex/admin-ui
```

```jsx isStatic
import { Box } from '@vtex/admin-ui'
```

## Variation

### Polymorphism

Box can be rendered as any HTML tag or component. To use this variation, add a valid HTML tah to the `element` property, by default it will render a `div`.

```jsx
<Box element="article">
  <Box element="section">👻 I'm a section</Box>
  <Box>👻 I'm a div</Box>
  <Box element="footer">👻 I'm a footer</Box>
  <Box csx={{ display: 'block' }} element="a" href="/typography/anchor">
    <IconLink /> I'm a link to anchor docs
  </Box>
</Box>
```

## Customization

With the `csx` property, you can add any customization to the `Box` component. Check the [StyleObject](/theming/style-object) page for detailed info.

```jsx
<Box csx={{ display: 'flex', div: { paddingX: 2, marginX: 2 } }}>
  <Box csx={{ border: 'default' }}>First</Box>
  <Box csx={{ border: 'default' }}>Second</Box>
  <Box csx={{ border: 'default' }}>Third</Box>
</Box>
```

# Props

<proptypes heading="Box" component="Box" />
