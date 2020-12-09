---
path: /primitives/grid/
---

# Grid

Our design system comes with a set of primitive components that represent our most elementary components, through which other components are built. They are basic elements, with no determined style, that are used as a starting point for other components. Check out our [Introduction](/primitives/introduction) page, to see Do's and Don'ts about primitive components.

Grid is a [Box](/primitives/box) with `display: grid` and it comes with helpful styles shorthand. It renders a `div` element.

If you want to know more about how to style a primitive component, check out our [Inline Styles](/theming/inline-styles/) page.

## Behavior

`Grid` - The main wrapper with `display: grid` and helpful styles shorthand.

`Grid.Item` - Used as a child of `Grid` to control the `gridArea` position whithin the grid.

```jsx
import { Grid, ThemeProvider } from '@vtex/admin-ui'
function Example() {
  const templateAreas = [
    'item-1 item-2 item-3',
    'item-4 item-5 item-6',
    'item-7 item-8 item-9',
  ]

  return (
    <ThemeProvider>
      <Grid
        templateAreas={templateAreas}
        templateColumns="repeat(3, 1fr)"
        templateRows="repeat(3, 1fr)"
        gap="6"
        styles={{
          height: 400,
          div: { bg: 'primary.base', borderRadius: 'default' },
        }}
      >
        <Grid.Item area="item-1" />
        <Grid.Item area="item-2" />
        <Grid.Item area="item-3" />
        <Grid.Item area="item-4" />
        <Grid.Item area="item-5" />
        <Grid.Item area="item-6" />
        <Grid.Item area="item-7" />
        <Grid.Item area="item-8" />
        <Grid.Item area="item-9" />
      </Grid>
    </ThemeProvider>
  )
}
```

## Installation

```static
yarn add @vtex/admin-ui
```

```jsx static
import { Grid } from '@vtex/admin-ui'
```

## Variation

### Template Areas

Here's an example of using grid template areas and applying a gap or space between the items.

```jsx
import { Grid, ThemeProvider } from '@vtex/admin-ui'
function Example() {
  const templateAreas = ['yellow blue-1 blue-2', 'yellow red red']
  return (
    <ThemeProvider>
      <Grid
        templateAreas={templateAreas}
        templateColumns="1fr 2fr 2fr"
        templateRows="1fr 2fr"
        gap="4"
        styles={{ height: 400, div: { borderRadius: 'default' } }}
      >
        <Grid.Item area="yellow" styles={{ bg: 'yellow' }} />
        <Grid.Item area="blue-1" styles={{ bg: 'blue' }} />
        <Grid.Item area="blue-2" styles={{ bg: 'blue' }} />
        <Grid.Item area="red" styles={{ bg: 'red' }} />
      </Grid>
    </ThemeProvider>
  )
}
```

### Template Columns

Here's an example of using grid template columns and applying a gap or space between the columns.

```jsx
import { Grid, Box, ThemeProvider } from '@vtex/admin-ui'
function Example() {
  return (
    <ThemeProvider>
      <Grid
        templateColumns="repeat(4, 1fr)"
        columnGap="4"
        styles={{ height: 100, div: { borderRadius: 'default' } }}
      >
        <Box styles={{ bg: 'blue' }} />
        <Box styles={{ bg: 'green' }} />
        <Box styles={{ bg: 'yellow' }} />
        <Box styles={{ bg: 'red' }} />
      </Grid>
    </ThemeProvider>
  )
}
```

### Template Rows

Here's an example of using grid template rows and applying a gap or space between the rows.

```jsx
import { Grid, Box, ThemeProvider } from '@vtex/admin-ui'
function Example() {
  return (
    <ThemeProvider>
      <Grid
        templateRows="repeat(4, 1fr)"
        rowGap="4"
        styles={{ height: 400, width: 300, div: { borderRadius: 'default' } }}
      >
        <Box styles={{ bg: 'blue' }} />
        <Box styles={{ bg: 'green' }} />
        <Box styles={{ bg: 'yellow' }} />
        <Box styles={{ bg: 'red' }} />
      </Grid>
    </ThemeProvider>
  )
}
```

## Customization

With the `styles` property, you can add any customization to the `Grid` and `Grid.Item` components. Check the [StyleObject](/theming/style-object) page for detailed info.

## Props

<propdetails heading="Grid" component="Grid"></propdetails>

<propdetails heading="GridItem" component="GridItem"></propdetails>
