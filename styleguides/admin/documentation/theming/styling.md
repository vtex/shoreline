---
path: /theming/styling/
---

# Styling

## Styles prop

There are two props that you can use to add style to our components, `styles` and `styleOverrides`, but you should keep in mind that they are the same thing, and the only difference is that when using a `Primitive` component you should use `styles` otherwise `styleOverrides`.

This property lets you add any valid CSS to an element while using values from your theme to keep styles consistent. You can think of the style object that this prop accepts as a superset of CSS.

## styles vs styleOverrides

You can consume the theme context by combining theme aware properties with the theme values.

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

### So, why styleOverrides exists ?

#### Component hotfixes

#### Pattern discovery

We are capable of find new patterns and components from repetitive cases of `styleOverrides`.

## CSS Selectors

In some cases, you might want to apply styles to children of the current element.

```jsx
import { Box, Heading, Button, ThemeProvider } from '@vtex/admin-ui'

function Example() {
  return (
    <ThemeProvider>
      <Box
        styles={{
          display: 'flex',
          flexDirection: 'column',
          h1: {
            margin: 4,
          },
          button: {
            margin: 1,
          },
        }}
      >
        <Heading>My Buttons!</Heading>
        <Button>Primary Button</Button>
        <Button
          styleOverrides={{
            ':active': { color: 'danger.active', bg: 'danger.washed.0' },
          }}
        >
          Click on me to change my color!
        </Button>
        <Button styleOverrides={{ ':hover': { bg: 'text' } }}>
          Hover me to change my color!
        </Button>
      </Box>
    </ThemeProvider>
  )
}
```

## cn

Function that transforms a valid [`StyleObject`]() into a className. It's mostly used to style native JSX elements and support integration with other libraries while being consistent.

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

### Dont's:

## useTheme

A hook that returns the entire theme object. Must be used under a `<ThemeProvider>` context.

### Do:

#### Use it if you need theme values on your custom hooks

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

#### Use it to pass values to StyleObject

```jsx static
const theme = useTheme()

// 🚫 Wrong
<Box styles={{ color: theme.colors.primary.base  }} />
<div className={cn({ color: theme.colors.primary.base  })} />


// ✅ Correct
<Box styles={{ color: 'primary.base'  }} />
<div className={cn({ color: 'primary.base'  })} />
```
