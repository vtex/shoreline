---
path: /docs/avatar/
---

# Avatar

Component to create a user avatar from a passed label. It shows the first letter capitalized in the center.

## Behavior

```jsx
import { Avatar, Box, ThemeProvider } from '@vtex/admin-ui'

function Example() {
  return (
    <ThemeProvider>
      <Box display="flex" w={140} justify="around">
        <Avatar label="base" />
        <Avatar label="primary" palette="primary" />
        <Avatar label="danger" palette="danger" />
        <Avatar label="success" palette="success" />
      </Box>
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
### Primary

```jsx
import { Avatar, Box, ThemeProvider } from '@vtex/admin-ui'

function Example() {
  return (
    <ThemeProvider>
      <Box display="flex" w={140} justify="around">
        <Avatar label="primary" palette="primary" />
      </Box>
    </ThemeProvider>
  )
}
```

### Danger

```jsx
import { Avatar, Box, ThemeProvider } from '@vtex/admin-ui'

function Example() {
  return (
    <ThemeProvider>
      <Box display="flex" w={140} justify="around">
        <Avatar label="danger" palette="danger" />
      </Box>
    </ThemeProvider>
  )
}
```

### Success

```jsx
import { Avatar, Box, ThemeProvider } from '@vtex/admin-ui'

function Example() {
  return (
    <ThemeProvider>
      <Box display="flex" w={140} justify="around">
        <Avatar label="success" palette="success" />
      </Box>
    </ThemeProvider>
  )
}
```

# Props

<proptypes heading="Avatar" component="Avatar" />
