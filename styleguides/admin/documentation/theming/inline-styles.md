---
path: /theming/inline-styles/
---

# Inline Styles

Present our inline styles techniques. Each one has its pros and cons and will be used dependeding of the use case. available techniques.

## styles & styleOverrides

Styles:

- used on `Primitives`, where style changes are expected and ecouraged.

StyleOverrides:

- used on `ThemedComponents`, where changes are not common and can defualt theme styles.

They have the same behavior, both accepting a valid [`StyleObject`](/theming/style-object/). The difference is semantic. While on primitives are out blank canvas, and styles are desired and encoutraged - In `ThemedComponents`

```jsx
import { Box, Button, ThemeProvider } from '@vtex/admin-ui'

function Example() {
  return (
    <ThemeProvider>
      <Box styles={{ color: 'primary.base' }}>
        Text with primary.base color!
      </Box>

      <Button styleOverrides={{ bg: 'darkorchid', color: 'orange' }}>
        messed-up button
      </Button>
    </ThemeProvider>
  )
}
```

## cn function

Function that transforms a valid [`StyleObject`](/theming/style-object/) into a className. It's mostly used to style native JSX elements and support integration with other libraries while being consistent.

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
    bg: 'muted.3',
    'button + button': { marginLeft: 2 },
  })}
/>
```

#### ✅ Use it with custom libraries that accepts a className:

```jsx static
import { Input } from 'reakit/Input'
;<Input
  className={cn({
    borderColor: 'muted.3',
    ':hover': {
      borderColor: 'text',
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
    bg: 'muted.3',
    'button + button': { marginLeft: 2 },
  })}
/>

// ✅ Correct
<Box
  styles={{
    bg: 'muted.3',
    'button + button': { marginLeft: 2 },
  }}
/>
```

#### 🚫 Use it within ThemedComponents:

```jsx static
// 🚫 Wrong
<Button
  styleOverrides={cn({
    bg: 'muted.3',
    'button + button': { marginLeft: 2 },
  })}
/>

// ✅ Correct
<Button
  styleOverrides={{
    bg: 'muted.3',
    'button + button': { marginLeft: 2 },
  }}
/>
```

## useTheme

A hook that returns the entire theme object. Must be used under a `<ThemeProvider>` context.

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
