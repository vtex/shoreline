---
path: /primitives/flex/
---

# Flex

Our design system comes with a set of primitive components that represent our most elementary components, through which other components are built. They are basic elements, with no determined style, that are used as a starting point for other components. Check out our [Introduction](/primitives/introduction) page, to see Do's and Don'ts about primitive components.

Flex is a [Box](/primitives/box) with `display: flex` and it comes with helpful styles shorthand. It renders a div element.

If you want to know more about how to style a primitive component, check out our [Inline Styles](/theming/inline-styles/) page.

## Behavior

`Flex` - The main wrapper with `display: flex` and helpful styles shorthand.

`Flex.Spacer`: Creates an adjustable, empty space that can be used to tune the spacing between child elements within Flex.

```jsx
import { Flex, Box, ThemeProvider } from '@vtex/admin-ui'

function Example() {
  return (
    <ThemeProvider>
      <Flex styles={{ height: 100 }}>
        <Box
          styles={{
            bg: 'red',
            width: 100,
          }}
        >
          Box 1
        </Box>
        <Box
          styles={{
            bg: 'green',
            width: 150,
          }}
        >
          Box 2
        </Box>
        <Box
          styles={{
            bg: 'blue',
            flex: 1,
          }}
        >
          Box 3
        </Box>
      </Flex>
    </ThemeProvider>
  )
}
```

## Installation

```static
yarn add @vtex/admin-ui
```

```jsx static
import { Flex } from '@vtex/admin-ui'
```

## Variations

### Spacer

You can combine `Flex` and `Flex.Spacer` to create an adjustable, empty space that can be used to tune the spacing between child elements within Flex.

```jsx
import { Flex, Box, ThemeProvider } from '@vtex/admin-ui'

function Example() {
  const boxStyles = {
    size: 100,
  }

  return (
    <ThemeProvider>
      <Flex justify="space-around">
        <Box
          styles={{
            bg: 'red',
            ...boxStyles,
          }}
        >
          Box 1s
        </Box>
        <Flex.Spacer />
        <Box
          styles={{
            bg: 'green',
            ...boxStyles,
          }}
        >
          Box 2
        </Box>
      </Flex>
    </ThemeProvider>
  )
}
```

### Customization

With the `styles` property, you can add any customization to the `Grid` and `Grid.Item` components. Check the [StyleObject](/theming/style-object) page for detailed info.

You can also use the following properties to add flex-box styles:

`flexDirection` is `direction`

`flexWrap` is `wrap`

`flexBasis` is `basis`

`flexShrink` is `shrink`

`flexGrow` is `grow`

`alignItems` is `align`

`justifyContent` is `justify`

`order` is `order`

# Props

<proptypes heading="Flex" component="Flex"></proptypes>
