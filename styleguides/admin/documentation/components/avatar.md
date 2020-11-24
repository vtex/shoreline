---
path: /avatar/
---

# Avatar

Showing the first letter capitalized in the center, this component creates a user's avatar from a label.

## Behavior

The `Avatar` can be rendered in multiple palettes, this means that the `color` and `background-color` properties change according to its `palette` property value.

```jsx
import { Avatar, Set, ThemeProvider } from '@vtex/admin-ui'

function Example() {
  return (
    <ThemeProvider>
      <Set>
        <Avatar label="base" />
        <Avatar label="primary" palette="primary" />
        <Avatar label="danger" palette="danger" />
      </Set>
    </ThemeProvider>
  )
}
```

## Installation

```sh
yarn add @vtex/admin-ui
```

Learn more in [Get started](/docs/get-started/).

## Variation

### Base

By default, it has a `base` palette.

```jsx
import { Avatar, ThemeProvider } from '@vtex/admin-ui'

function Example() {
  return (
    <ThemeProvider>
      <Avatar label="base" />
    </ThemeProvider>
  )
}
```

### Primary

Palette with `primary` value.

```jsx
import { Avatar, ThemeProvider } from '@vtex/admin-ui'

function Example() {
  return (
    <ThemeProvider>
      <Avatar label="primary" palette="primary" />
    </ThemeProvider>
  )
}
```

### Danger

Palette with `danger` value.

```jsx
import { Avatar, ThemeProvider } from '@vtex/admin-ui'

function Example() {
  return (
    <ThemeProvider>
      <Avatar label="danger" palette="danger" />
    </ThemeProvider>
  )
}
```

## Customization

You can also use the `styleOverrides` property to customize any style.

# Props

<proptypes heading="Avatar" component="Avatar" />
