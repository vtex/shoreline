---
path: /typography/anchor/
---

# Anchor

Component to create an anchor.

## Behavior

```jsx
import { Box, Anchor, ThemeProvider } from '@vtex/admin-ui'

function Example() {
  return (
    <ThemeProvider>
      <Box width={300}>
        <Anchor href="/typography/anchor/#behavior">Link</Anchor>
      </Box>
    </ThemeProvider>
  )
}
```

## Installation

```static
yarn add @vtex/admin-ui
```

```jsx static
import { Anchor } from '@vtex/admin-ui'
```

## Customization

You can use the `styleOverrides` property to customize any style.

# Props

<proptypes heading="Anchor" component="Anchor" />
