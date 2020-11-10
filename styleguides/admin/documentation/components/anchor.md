---
path: /docs/anchor/
---

# Anchor

Component to create an anchor.

## Behavior

```jsx static
import { Box, Anchor, ThemeProvider } from '@vtex/admin-ui'

function Example() {
  return (
    <ThemeProvider>
      <Box width={300}>
        <Anchor href='/'>Link</Anchor>
      </Box>
    </ThemeProvider>
  )
}
```

## Installation

```static
yarn add @vtex/admin-ui
```

Learn more in [Get started](/docs/get-started/).

## Variation
### Regular

```jsx static
import { Box, Anchor, ThemeProvider } from '@vtex/admin-ui'

function Example() {
  return (
    <ThemeProvider>
      <Box width={300}>
        <Anchor href='/'>Link</Anchor>
      </Box>
    </ThemeProvider>
  )
}
```

## Customization

You can use the `styleOverrides` property to customize any style.

# Props

<proptypes heading="Anchor" component="Anchor" />
