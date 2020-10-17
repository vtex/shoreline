---
path: /docs/unstable-box/
---

# Unstable Box

## Installation

```sh
yarn add @vtex/admin-ui
```

Learn more in [Get started](/docs/get-started/).

## Styled Props

```jsx
import {
  unstableBox as Box,
  unstableThemeProvider as ThemeProvider,
  unstableTheme as theme,
} from '@vtex/admin-ui'

function Example() {
  return (
    <ThemeProvider theme={theme}>
      <Box
        bg="primary.washed"
        padding="5"
        color="primary.base"
        fontSize="3"
        borderRadius="3"
      >
        This is also a Box, but styled
      </Box>
    </ThemeProvider>
  )
}
```

# Props

<details open>
  <summary>Box</summary>
  <div>
    <proptypes component="unstableBox" />
  </div>
</details>
