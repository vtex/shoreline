---
path: /docs/text/
---

# Text

The component that abstracts all text variants from admin's styleguide

## Behavior

```jsx
import { Text, ThemeProvider } from '@vtex/admin-ui'

function Example() {
  return (
    <ThemeProvider>
      <Text variant="headline">Here goes your text!</Text>
    </ThemeProvider>
  )
}
```

## Installation

```sh static
yarn add @vtex/admin-ui
```

```jsx static
import { Text } from '@vtex/admin-ui'
```

## Variation

### Small

```jsx static
lineHeight: 'small', // 1.125
fontVariationSettings: 'regular', // "'wght' 92"
fontSize: 0, // 0.75rem
```

```jsx
import { Text, ThemeProvider } from '@vtex/admin-ui'

function Example() {
  return (
    <ThemeProvider>
      <Text variant="small">Here goes your text!</Text>
    </ThemeProvider>
  )
}
```

### Body

```jsx static
lineHeight: 'body', // 1.25
fontVariationSettings: 'regular', // "'wght' 92"
fontSize: 1, // 0.875rem
```

```jsx
import { Text, ThemeProvider } from '@vtex/admin-ui'

function Example() {
  return (
    <ThemeProvider>
      <Text variant="body">Here goes your text!</Text>
    </ThemeProvider>
  )
}
```

### Highlight

```jsx static
lineHeight: 'highlight', // 1.25
fontVariationSettings: 'regular', // "'wght' 92"
fontSize: 1, // 0.875rem
```

```jsx
import { Text, ThemeProvider } from '@vtex/admin-ui'

function Example() {
  return (
    <ThemeProvider>
      <Text variant="highlight">Here goes your text!</Text>
    </ThemeProvider>
  )
}
```

### Action

```jsx static
lineHeight: 'action', // 1.5
fontVariationSettings: 'regular', // "'wght' 92"
fontSize: 1, // 0.875rem
textTransform: 'uppercase',
```

```jsx
import { Text, ThemeProvider } from '@vtex/admin-ui'

function Example() {
  return (
    <ThemeProvider>
      <Text variant="action">Here goes your text!</Text>
    </ThemeProvider>
  )
}
```

### Subtitle

```jsx static
lineHeight: 'subtitle', // 1.5
fontVariationSettings: 'regular', // "'wght' 92"
fontSize: 2, // 1rem
```

```jsx
import { Text, ThemeProvider } from '@vtex/admin-ui'

function Example() {
  return (
    <ThemeProvider>
      <Text variant="subtitle">Here goes your text!</Text>
    </ThemeProvider>
  )
}
```

### Headline

```jsx static
lineHeight: 'headline', // 1.5
fontVariationSettings: 'regular', // "'wght' 92"
fontSize: 4, // 1.25rem
```

```jsx
import { Text, ThemeProvider } from '@vtex/admin-ui'

function Example() {
  return (
    <ThemeProvider>
      <Text variant="headline">Here goes your text!</Text>
    </ThemeProvider>
  )
}
```

## Customization

You can use the `styleOverrides` property to handle different styles.

### Example

```jsx
import { Text, ThemeProvider } from '@vtex/admin-ui'

function Example() {
  return (
    <ThemeProvider>
      <Text
        styleOverrides={{ color: 'primary.hover' }}
        variant="body"
        element="span"
      >
        Look, a text with 'primary.hover' color... 🤔
      </Text>
    </ThemeProvider>
  )
}
```

### VTEX Trust variable font

<blockquote palette="primary">

A variable font is a specification that can significantly reduce font file sizes and make it possible to animate font characters. We've implemented `VTEX Trust font` using this feature.
[Read more about Variable Fonts](https://web.dev/variable-fonts/)

</blockquote>

### Fallback

<blockquote palette="primary">

Most of the browsers have support to variable fonts, but for the remaining browsers who do not, we have a fallback using `sans-serif` font.

[Read more about the Browsers Support](https://caniuse.com/variable-fonts)

</blockquote>

## Props

<proptypes heading="Text" component="Text"/>
