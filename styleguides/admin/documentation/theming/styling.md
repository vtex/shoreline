---
path: /docs/theming/styling/
---

# Styling

## ThemeProvider

Provides a context so we can consume our theme along with our design system.

The `<ThemeProvider>` component accepts the theme as a prop, where you can specify overrides to the default theme. Since all of our components are theme aware, remember that every application should have a `<ThemeProvider>` defined in the project root.

```jsx static
import { ThemeProvider } from '@vtex/admin-ui'

function ProjectRoot() {
  return <ThemeProvider>{/** Your app here */}</ThemeProvider>
}
```

## Styles prop

There are two props that you can use to add style to our components, `styles` and `styleOverrides`, but you should keep in mind that they are the same thing, and the only difference is that when using a `Primitive` component you should use `styles` otherwise `styleOverrides`.

This property lets you add any valid CSS to an element while using values from your theme to keep styles consistent. You can think of the style object that this prop accepts as a superset of CSS.

<blockquote palette="primary">

Some CSS properties are theme-aware and can consume specific sections of the theme context. [Click here](/docs/theming/styling/#theme-aware-properties) to check the full list.

</blockquote>

## Inline style

You can consume the theme context by combining theme aware properties with the theme values.

```jsx
import { Box, Button, ThemeProvider } from '@vtex/admin-ui'

function Example() {
  return (
    <ThemeProvider>
      <Box styles={{ color: 'primary.base' }}>
        Text with primary.base color!
      </Box>
    </ThemeProvider>
  )
}
```

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

## Advanced Section

This section contains features with different ways of using our theme to add styles.

> You may want to try to use features from the section above before getting into this one.

### cn

To add styles from the theme in a native element or an external component that doesn't have our API you can this function.

The function receives an object in the same way as `styles` and `styleOverrides` and turns into a `className`.

> You may want to try to use one of our components before using this function.

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

### get

A getter function to access and returns a value from our theme.

### useTheme hook

A hook that returns the entire theme object. Must be used under a `<ThemeProvider>` context.

> You may want to try use a [Inline Style](/docs/theming/styling/#inline-style) before using this hook.

```jsx
import { useTheme, get, Box, ThemeProvider } from '@vtex/admin-ui'

function Component() {
  const theme = useTheme()
  const primaryColor = get(theme, 'colors.primary.base')
  return (
    <Box styles={{ color: `${primaryColor}` }}>
      {' '}
      Text with primary.base color!
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

### Functional Style

For shorthand CSS properties or ones that are not automatically mapped to values in the theme, use an inline function to reference values from the theme object.

> You may want to try to use a [Inline Style](/docs/theming/styling/#inline-style) before using functional style.

```jsx
import { get, Box, ThemeProvider } from '@vtex/admin-ui'

function Example() {
  return (
    <ThemeProvider>
      <Box
        styles={{ color: (theme) => `${get(theme, 'colors.primary.base')}` }}
      >
        Text with primary.base color!
      </Box>
    </ThemeProvider>
  )
}
```

## Theme Aware Properties

The following CSS properties will use values defined in the theme, when available.

<themeawareprops>
</themeawareprops>
