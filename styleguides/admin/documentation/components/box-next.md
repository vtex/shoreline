---
path: /docs/box-next/
---

# Box

## Installation

```sh
yarn add @vtex/admin-ui
```

Learn more in [Get started](/docs/get-started/).

## Styled Props

```jsx
import { nightlyBox as Box, ThemeProvider } from '@vtex/admin-ui'

function Example() {
  return (
    <ThemeProvider>
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

<proptypes heading="Box" component="nightlyBox" />
