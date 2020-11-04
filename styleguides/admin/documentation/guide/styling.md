---
path: /docs/styling/
---

# 🚧 Styling

💡 Also check [ThemeUI API](https://theme-ui.com/api/) for detailed info.

<blockquote next="true">
  This is a next feature. Use it with care 😬.
</blockquote>

## ThemeProvider

Same as [ThemeUI ThemeProvider](https://theme-ui.com/guides/how-it-works/#themeprovider)

Usage:

```jsx static
import { ThemeProvider } from '@vtex/admin-ui'

function ProjectRoot() {
  return <ThemeProvider>{/** Your app here */}</ThemeProvider>
}
```

## `useTheme` hook

Returns the theme object

Usage:

```jsx static
import { useTheme } from '@vtex-components/theme'

function Component() {
  const theme = useTheme()
  // ...
}
```

## `styles` & `styleOverrides` properties

The sx prop lets you add any valid CSS to an element, while using values from your theme to keep styles consistent. You can think of the style object that the sx prop accepts as a superset of CSS.

Some property are theme-aware, that can consume specyfic sections of the theme context. You can see the full token list down below.

[Read more on ThemeUI Documentation](https://theme-ui.com/sx-prop)

## `focus` ring

Our components have a `focus` ring style that only appears when the user is navigating with the keyboard. To add this in a custom component use the following properties in with the `sx` prop.

```css
':focus:not([data-focus-visible-added])': {
  outline: 'none',
  boxShadow: 'none',
},
':focus': {
  outline: 'none',
  boxShadow: 'focus',
},
```

## Styled Props

💡 Check the `Tokens` section for detailed info about each styled prop.
