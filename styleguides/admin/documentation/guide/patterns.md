---
path: /docs/guide/patterns/
---

# Patterns

There is some style patterns that are common along our admin applications. To make the apply of these styles easier and consistent you can use the following properties defined in our theme.

## Border

You can use it in every component that extends `BorderPattern`.

### default

```jsx static
borderWidth: '1px',
borderStyle: 'solid',
borderRadius: 'default', // 4px
borderColor: 'muted.3',
```

### divider-bottom

```jsx static
borderBottomWidth: '1px',
borderBottomStyle: 'solid',
borderBottomLeftRadius: 0,
borderBottomRightRadius: 0,
borderColor: 'muted.3',
```

### divider-top

```jsx static
borderTopWidth: '1px',
borderTopStyle: 'solid',
borderTopLeftRadius: 0,
borderTopRightRadius: 0,
borderColor: 'muted.3',
```

### strong

```jsx static
borderWidth: '1px',
borderStyle: 'solid',
borderRadius: 'default', // 4px
borderColor: 'text',
```

### strong

```jsx static
borderWidth: '1px',
borderStyle: 'solid',
borderRadius: 'default', // 4px
borderColor: 'text',
```

### disabled

```jsx static
borderWidth: '1px',
borderStyle: 'solid',
borderRadius: 'default', // 4px
borderColor: 'muted.2',
```

### primary

```jsx static
borderWidth: '1px',
borderStyle: 'solid',
borderRadius: 'default', // 4px
borderColor: 'primary.base',
```

### danger

```jsx static
borderWidth: '1px',
borderStyle: 'solid',
borderRadius: 'default', // 4px
borderColor: 'primary.base',
```

### Border Example

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

You can use it in every component that extends `TextPattern`.

### small

```jsx static
lineHeight: 'small', // 1.125
fontVariationSettings: 'regular', // "'wght' 92"
fontSize: 0, // 0.75rem
```

### body

```jsx static
lineHeight: 'body', // 1.25
fontVariationSettings: 'regular', // "'wght' 92"
fontSize: 1, // 0.875rem
```

### highlight

```jsx static
lineHeight: 'highlight', // 1.25
fontVariationSettings: 'regular', // "'wght' 92"
fontSize: 1, // 0.875rem
```

### action

```jsx static
lineHeight: 'action', // 1.5
fontVariationSettings: 'regular', // "'wght' 92"
fontSize: 1, // 0.875rem
textTransform: 'uppercase',
```

### subtitle

```jsx static
lineHeight: 'subtitle', // 1.5
fontVariationSettings: 'regular', // "'wght' 92"
fontSize: 2, // 1rem
```

### headline

```jsx static
lineHeight: 'headline', // 1.5
fontVariationSettings: 'regular', // "'wght' 92"
fontSize: 4, // 1.25rem
```

### Text Example

```jsx
import { Box, ThemeProvider } from '@vtex/admin-ui'

function Example() {
  return (
    <ThemeProvider>
      <Box text="small">Small Text</Box>
      <Box text="headline">Headline Text</Box>
    </ThemeProvider>
  )
}
```

## Palette

You can use it in every component that extends `PalettePattern`.

### base

```jsx static
bg: 'background',
color: 'text',
```

### inverted

```jsx static
bg: 'text',
color: 'background',
```

### primary

```jsx static
bg: 'primary.base',
color: 'primary.contrast',
```

### primary-washed

```jsx static
bg: 'primary.washed.0',
color: 'primary.base',
```

### danger

```jsx static
bg: 'danger.base',
color: 'danger.contrast',
```

### danger-washed

```jsx static
bg: 'danger.washed.0',
color: 'danger.base',
```

### success

```jsx static
bg: 'success.base',
color: 'success.contrast',
```

### success-washed

```jsx static
bg: 'success.washed.0',
color: 'success.base',
```

### warning

```jsx static
bg: 'warning.base',
color: 'warning.contrast',
```

### warning-washed

```jsx static
bg: 'warning.washed.0',
color: 'warning.base',
```

### Palette Example

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
