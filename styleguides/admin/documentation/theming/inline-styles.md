---
path: /theming/inline-styles/
---

# Inline Styles

This page presents all the inline style techniques available within admin-ui.

## styles & styleOverrides

Both have the same behavior, and accepts a valid [`StyleObject`](/theming/style-object/). The difference is the semantic of their usage.

Styles:

- use it on `Primitives` where style changes are expected and encouraged.
- use it with confidence since it does not break predefined styles.
- do not break element consistency.

StyleOverrides:

- use it on `ThemedComponents` where changes are not common and can default theme styles.
- use it with care since it can override styles.
- can break element consistency.

```jsx
import { Box, Button, ThemeProvider } from '@vtex/admin-ui'

function Example() {
  return (
    <ThemeProvider>
      <Box styles={{ color: 'primary.base' }}>
        Text with primary.base color!
      </Box>

      {/** ☢️ Be careful while overriding styles, you can achieve undesired results */}
      <Button styleOverrides={{ bg: 'darkorchid', color: 'orange' }}>
        messed-up button
      </Button>
    </ThemeProvider>
  )
}
```

## cn function

Function that transforms a valid [`StyleObject`](/theming/style-object/) into a className. It's used to style native JSX elements and support integration with other libraries while being consistent.

### Example

```jsx
import { cn, ThemeProvider } from '@vtex/admin-ui'

function Example() {
  return (
    <ThemeProvider>
      <div className={cn({ color: 'primary.base' })}>
        Text with primary.base color!
      </div>
    </ThemeProvider>
  )
}
```

### Do's:

#### ✅ Use it with native elements:

```jsx static
<nav
  className={cn({
    bg: 'muted.2',
    'button + button': { marginLeft: 2 },
  })}
/>
```

#### ✅ Use it with custom libraries that accepts a className:

```jsx static
import { Input } from 'reakit/Input'
;<Input
  className={cn({
    borderColor: 'muted.2',
    ':hover': {
      borderColor: 'text.primary',
    },
  })}
/>
```

### Dont's:

#### 🚫 Use it within Primitives:

```jsx static
// 🚫 Wrong
<Box
  styles={cn({
    bg: 'muted.2',
    'button + button': { marginLeft: 2 },
  })}
/>

// ✅ Correct
<Box
  styles={{
    bg: 'muted.2',
    'button + button': { marginLeft: 2 },
  }}
/>
```

#### 🚫 Use it within ThemedComponents:

```jsx static
// 🚫 Wrong
<Button
  styleOverrides={cn({
    bg: 'muted.2',
    'button + button': { marginLeft: 2 },
  })}
/>

// ✅ Correct
<Button
  styleOverrides={{
    bg: 'muted.2',
    'button + button': { marginLeft: 2 },
  }}
/>
```

## useTheme

Hook that returns the entire theme object. Must be used under a `<ThemeProvider>` context.

### Do:

#### ✅ Use it if you need theme values on your custom hooks

```jsx static
// function that mix two colors
import { mix } from 'polished'

// mixes primary and success color by weight
function usePrimarySuccess(weight = 0.5) {
  const theme = useTheme()
  const primary = theme.colors.primary.base
  const success = theme.colors.success.base

  return mix(weight, primary, success)
}
```

### Dont:

#### 🚫 Use it to pass values to StyleObject

```jsx static
const theme = useTheme()

// 🚫 Wrong
<Box styles={{ color: theme.colors.primary.base  }} />
<div className={cn({ color: theme.colors.primary.base  })} />


// ✅ Correct
<Box styles={{ color: 'primary.base'  }} />
<div className={cn({ color: 'primary.base'  })} />
```
