---
path: /docs/avatar/
---

# Avatar

Component to create a user avatar from a passed label. It shows the first letter capitalized in the center.

## Behavior

```jsx
import {
  Avatar,
  unstableSet as Set,
  unstableThemeProvider as ThemeProvider,
} from '@vtex/admin-ui'

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

```jsx
import { Avatar, unstableThemeProvider as ThemeProvider } from '@vtex/admin-ui'

function Example() {
  return (
    <ThemeProvider>
      <Avatar label="base" palette="base" />
    </ThemeProvider>
  )
}
```

### Primary

```jsx
import { Avatar, unstableThemeProvider as ThemeProvider } from '@vtex/admin-ui'

function Example() {
  return (
    <ThemeProvider>
      <Avatar label="primary" palette="primary" />
    </ThemeProvider>
  )
}
```

### Danger

```jsx
import { Avatar, unstableThemeProvider as ThemeProvider } from '@vtex/admin-ui'

function Example() {
  return (
    <ThemeProvider>
      <Avatar label="danger" palette="danger" />
    </ThemeProvider>
  )
}
```

## Customization

You can use the `styleOverrides` property to customize any style.

# Props

<proptypes heading="Avatar" component="Avatar" />
