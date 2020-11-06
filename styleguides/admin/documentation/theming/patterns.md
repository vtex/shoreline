---
path: /docs/theming/patterns/
---

# Patterns

Some style patterns are common along with our admin applications. To make the application of these styles easier and consistent you can use the following properties defined in our theme.

> You may want to try to use one of our components before using a pattern in a Primitive component.

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

## Palette

You can use it in the `Box` component.

### Values

`base`, `inverted`, `primary`, `primary-washed`, `danger`, `danger-washed`, `success`, `success-washed`, `warning`, `warning-washed`,

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
