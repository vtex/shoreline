---
path: /theming/responsive-design/
---

# Responsive Design

## Breakpoints

`admin-ui` uses 4 mobile-first breakpoints, which are

| name       | min-width em | min-width px |
| ---------- | ------------ | ------------ |
| mobile     | `40rem`      | `640px`      |
| tablet     | `48rem`      | `768px`      |
| desktop    | `64rem`      | `1024px`     |
| widescreen | `80rem`      | `1280px`     |

## Responsive Values

A Responsive value accept an array of values. The current value will be the one that matches the breakpoint:

```static
[mobile, tablet, desktop, widescreen]
```

In the example below, the `<Box>` has full width while on `mobile`, and half on tablet and above.

```jsx
import { ThemeProvider, Box } from '@vtex/admin-ui'

function Example() {
  return (
    <ThemeProvider>
      <Box padding={4} width={['full', '1/2']} palette="primary" />
    </ThemeProvider>
  )
}
```

### Skipping Breakpoints

If you want to skip a breakpoint, you can use the value null. This is useful if you want to set a value for only the largest breakpoint, for example.

```jsx
import { ThemeProvider, Box } from '@vtex/admin-ui'

function Example() {
  return (
    <ThemeProvider>
      <Box padding={4} width={[null, null, 'full']} palette="inverted" />
    </ThemeProvider>
  )
}
```

## 🎣 React hooks

You can also use the `useResponsiveValue` hook. It can turn any value in a responsive value.

```jsx
import { ThemeProvider, Box, useResponsiveValue } from '@vtex/admin-ui'

function Example() {
  const mobileText = '📱 mobile'
  const aboveTabletText = '🖥 tablet & above'
  const text = useResponsiveValue([mobileText, aboveTabletText])

  return (
    <ThemeProvider>
      <Box padding={4} palette="inverted">
        {text}
      </Box>
    </ThemeProvider>
  )
}
```
