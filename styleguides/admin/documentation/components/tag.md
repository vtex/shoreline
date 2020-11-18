---
path: /tag/
---

# Tag

Tag is a compact element that represents an input, attribute, or action. It renders a `div` element.

## Behavior

```jsx
import { Tag, ThemeProvider } from '@vtex/admin-ui'
import { IconFavorite } from '@vtex/admin-ui-icons'

function Example() {
  return (
    <ThemeProvider>
      <Tag
        icon={<IconFavorite />}
        label="Here goes the label!"
        handleDelete={() => window.alert('Tag deleted')}
      />
    </ThemeProvider>
  )
}
```

## Installation

```static
yarn add @vtex/admin-ui
```

```jsx static
import { Tag, TagProps } from '@vtex/admin-ui'
```

## Variation

### Sizes

By default, the size property has a `regular` value, but you can also set it to `small`.

```jsx
import { Tag, ThemeProvider } from '@vtex/admin-ui'

function Example() {
  return (
    <ThemeProvider>
      <Tag label="Rio de Janeiro" />
      <Tag label="Rio de Janeiro" size="small" />
    </ThemeProvider>
  )
}
```

### Palettes

By default, the palette property has the `blue` value, but you can also set it to the following values: `red`, `yellow`, `green`, `black`, and `purple`.

```jsx
import { Tag, ThemeProvider } from '@vtex/admin-ui'

function Example() {
  return (
    <ThemeProvider>
      <Tag label="Rio de Janeiro" />
      <Tag label="Rio de Janeiro" palette="red" />
      <Tag label="Rio de Janeiro" palette="yellow" />
      <Tag label="Rio de Janeiro" palette="green" />
      <Tag label="Rio de Janeiro" palette="black" />
      <Tag label="Rio de Janeiro" palette="purple" />
    </ThemeProvider>
  )
}
```

### Deletable

You can add the `handleDelete` property to configure the tag as deletable. When this function is defined the tag will have a `button` where you can handle click events.

```jsx
import { Tag, ThemeProvider } from '@vtex/admin-ui'

function Example() {
  return (
    <ThemeProvider>
      <Tag
        label="Rio de Janeiro"
        handleDelete={() => window.alert('Tag deleted')}
      />
    </ThemeProvider>
  )
}
```

### Icon

You can add one Icon on the left side of the `Tag`. Just use the `icon` property.

```jsx
import { Tag, ThemeProvider } from '@vtex/admin-ui'
import { IconFavorite } from '@vtex/admin-ui-icons'

function Example() {
  return (
    <ThemeProvider>
      <Tag icon={<IconFavorite />} label="Rio de Janeiro" />
    </ThemeProvider>
  )
}
```

## Customization

You can use the [styleOverrides](/theming/inline-styles/#styles--styleoverrides) property to handle different styles.

### Example

For example, you can add a margin to the `Tag`. One way to do this is by using the `styleOverrides` property, check the example below!

```jsx
import { Tag, ThemeProvider } from '@vtex/admin-ui'
import { IconFavorite } from '@vtex/admin-ui-icons'

function Example() {
  return (
    <ThemeProvider>
      <Tag
        icon={<IconFavorite />}
        styleOverrides={{ margin: 4 }}
        handleDelete={() => window.alert('Tag deleted')}
        label="Rio de Janeiro"
      />
    </ThemeProvider>
  )
}
```

## Props

<proptypes heading="Tag" component="Tag" />
