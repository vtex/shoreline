---
path: /docs/layouts/columns/
next: true
---

# Columns

It implements a 12 column flexbox based responsive column system.

## Behavior

```jsx
import { ThemeProvider, theme, Columns, Box } from '@vtex/admin-ui'

function Example() {
  return (
    <ThemeProvider>
      <Columns spacing={1}>
        <Columns.Item>
          <Box palette="primary" padding={2}>
            6 units
          </Box>
        </Columns.Item>
        <Columns.Item>
          <Box palette="inverted" padding={2}>
            6 units
          </Box>
        </Columns.Item>
        <Columns.Item>
          <Box palette="primary" padding={2}>
            6 units
          </Box>
        </Columns.Item>
      </Columns>
    </ThemeProvider>
  )
}
```

## Installation

<Columns> uses the upcoming @vtex/admin-ui-system package. This means you need to install the latest version:

```sh static
yarn add @vtex/admin-ui@latest
```

## Variation

### Auto

```jsx
import { ThemeProvider, theme, Columns, Box } from '@vtex/admin-ui'

function Example() {
  return (
    <ThemeProvider>
      <Columns spacing={1}>
        <Columns.Item>
          <Box palette="primary" padding={2}>
            6 units
          </Box>
        </Columns.Item>
        <Columns.Item>
          <Box palette="inverted" padding={2}>
            6 units
          </Box>
        </Columns.Item>
        <Columns.Item>
          <Box palette="primary" padding={2}>
            6 units
          </Box>
        </Columns.Item>
      </Columns>
    </ThemeProvider>
  )
}
```

### AutoGapless

```jsx
import { ThemeProvider, theme, Columns, Box } from '@vtex/admin-ui'

function Example() {
  return (
    <ThemeProvider>
      <Columns spacing={0}>
        <Columns.Item>
          <Box palette="primary" padding={2}>
            6 units
          </Box>
        </Columns.Item>
        <Columns.Item>
          <Box palette="inverted" padding={2}>
            6 units
          </Box>
        </Columns.Item>
        <Columns.Item>
          <Box palette="primary" padding={2}>
            6 units
          </Box>
        </Columns.Item>
      </Columns>
    </ThemeProvider>
  )
}
```

### Units

```jsx
import { ThemeProvider, theme, Columns, Box } from '@vtex/admin-ui'

function Example() {
  return (
    <ThemeProvider>
      <Columns spacing={1}>
        <Columns.Item units={3}>
          <Box palette="primary" padding={2}>
            3 units
          </Box>
        </Columns.Item>
        <Columns.Item units={6}>
          <Box palette="inverted" padding={2}>
            6 units
          </Box>
        </Columns.Item>
        <Columns.Item units={3}>
          <Box palette="primary" padding={2}>
            3 units
          </Box>
        </Columns.Item>
      </Columns>
    </ThemeProvider>
  )
}
```

### Responsive Units

`spacing`, `units`, and `offset` are [`ResponsiveValues`](/docs/guide/responsive-design/#responsive-values)

```jsx
import { ThemeProvider, theme, Columns, Box } from '@vtex/admin-ui'

function Example() {
  return (
    <ThemeProvider>
      <Columns spacing={1}>
        <Columns.Item units={6} offset={['right', 'right', 'none']}>
          <Box palette="primary" padding={2}>
            6 units
          </Box>
        </Columns.Item>
        <Columns.Item units={3}>
          <Box palette="inverted" padding={2}>
            3 units
          </Box>
        </Columns.Item>
      </Columns>
    </ThemeProvider>
  )
}
```

## Customization

You can use the styleOverrides property to handle different styles in both `Columns`, and `Columns.Item`.

```jsx
import { ThemeProvider, theme, Columns, Box } from '@vtex/admin-ui'

function Example() {
  return (
    <ThemeProvider>
      <Columns spacing={1} styleOverrides={{ bg: 'muted.3' }}>
        <Columns.Item units={6} offset="right">
          <Box palette="primary" padding={2}>
            6 units
          </Box>
        </Columns.Item>
        <Columns.Item units={3}>
          <Box palette="inverted" padding={2}>
            3 units
          </Box>
        </Columns.Item>
      </Columns>
    </ThemeProvider>
  )
}
```

## Limitations

This component uses a flexbox under the hood. Knowing that it has the same limitations.

## Props

<propdetails heading="Columns" component="Columns">
</propdetails>

<propdetails heading="Columns.Item" component="ColumnsItem">
</propdetails>
