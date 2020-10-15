---
path: /docs/avatar/
---

# Avatar

## Usage

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
