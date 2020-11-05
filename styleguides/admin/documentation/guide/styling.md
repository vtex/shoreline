---
path: /docs/guide/styling/
---

# Styling

## ThemeProvider

All of our components are theme aware, so remember that every application should have a `<ThemeProvider>` defined in the project root.

```jsx static
import { ThemeProvider } from '@vtex/admin-ui'

function ProjectRoot() {
  return <ThemeProvider>{/** Your app here */}</ThemeProvider>
}
```

## `styles` & `styleOverrides` properties

The sx prop lets you add any valid CSS to an element, while using values from your theme to keep styles consistent. You can think of the style object that the sx prop accepts as a superset of CSS.

Some property are theme-aware, that can consume specyfic sections of the theme context. You can see the full token list down below.

[Read more on ThemeUI Documentation](https://theme-ui.com/sx-prop)

## Accessing Theme object

<blockquote palette="primary">

💡 You can check detailed info about Theme Aware properties [here](https://theme-ui.com/sx-prop/#theme-aware-properties)

</blockquote>

### `styles` and `styleOverrides`

```jsx
import { Box, get, ThemeProvider } from '@vtex/admin-ui'

function Example() {
  return (
    <ThemeProvider>
      <Box
        styles={{
          boxShadow: (theme) => `inset 0 0 0 2px ${get(theme, 'colors.focus')}`,
        }}
      >
        Custom boxShadow style!
      </Box>
    </ThemeProvider>
  )
}
```

### `useTheme` hook

```jsx
import { useTheme, get, Box, ThemeProvider } from '@vtex/admin-ui'

function Component() {
  const theme = useTheme()
  const focusColor = get(theme, 'colors.focus')
  return (
    <Box styles={{ boxShadow: `inset 0 0 0 2px ${focusColor}` }}>
      Custom boxShadow style!
    </Box>
  )
}

function Example() {
  return (
    <ThemeProvider>
      <Component />
    </ThemeProvider>
  )
}
```

## Theming native elements or external components

### cn

You can apply styles in the same way as if you were using `styles` or `stylesOverrides` inside a `className` property.

```jsx
import { cn, ThemeProvider } from '@vtex/admin-ui'

function Example() {
  return (
    <ThemeProvider>
      <div className={cn({ bg: 'primary.base', color: 'primary.contrast' })}>
        Theming native element
      </div>
    </ThemeProvider>
  )
}
```

## `focus` style

Our components have a `focus` ring style that only appears when the user is navigating with the keyboard. To add this in a custom component use the following style.

```jsx static
':focus:not([data-focus-visible-added])': {
  outline: 'none',
  boxShadow: 'none',
},
':focus': {
  outline: 'none',
  boxShadow: 'focus',
},
```
