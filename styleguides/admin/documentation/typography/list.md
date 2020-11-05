---
path: /docs/typography/list/
---

# List

`<List>` renders a `<ul>` element by default with reset styles.

## Behavior

```jsx
import { List, ThemeProvider } from '@vtex/admin-ui'

function Example() {
  return (
    <ThemeProvider>
      <List>
        <List.Item>Coffee</List.Item>
        <List>
          <List.Item>Arabica</List.Item>
          <List.Item>Robusta</List.Item>
        </List>
        <List.Item>Juice</List.Item>
        <List.Item>Tea</List.Item>
      </List>
    </ThemeProvider>
  )
}
```

## Installation

```sh static
yarn add @vtex/admin-ui
```

```jsx static
import { Heading, HeadingProps } from '@vtex/admin-ui'
```

## Variation

### Headers

```jsx
import { Heading, ThemeProvider } from '@vtex/admin-ui'

function Example() {
  return (
    <ThemeProvider>
      <Heading>Heading 1</Heading>
      <Heading element="h2">Heading 2</Heading>
      <Heading element="h3">Heading 3</Heading>
      <Heading element="h4">Heading 4</Heading>
      <Heading element="h5">Heading 5</Heading>
      <Heading element="h6">Heading 6</Heading>
    </ThemeProvider>
  )
}
```

## Customization

You can use the `styleOverrides` property to handle different styles, and also the `TextPattern` and `SpaceStyleProps`.

### Example

```jsx
import { Heading, ThemeProvider } from '@vtex/admin-ui'

function Example() {
  return (
    <ThemeProvider>
      <Heading
        text="body"
        marginBottom={2}
        styleOverrides={{ fontSize: 4, bg: 'muted.4', color: 'primary.base' }}
      >
        Heading 1
      </Heading>
    </ThemeProvider>
  )
}
```

## Props

<proptypes heading="List" component="List"/>
