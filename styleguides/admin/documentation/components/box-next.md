---
path: /docs/box-next/
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
  ThemeProviderNext,
  baseTheme,
} from '@vtex/admin-ui'

function Example() {
  return (
    <ThemeProviderNext theme={baseTheme}>
      <Box
        bg="primary.washed"
        padding="5"
        color="primary.base"
        fontSize="3"
        borderRadius="3"
      >
        This is also a Box, but styled
      </Box>
    </ThemeProviderNext>
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
