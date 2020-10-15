---
path: /docs/visually-hidden/
---

# VisuallyHidden

## Usage

```jsx
import { VisuallyHidden, Box, Text, ThemeProvider } from '@vtex/admin-ui'

function Example() {
  return (
    <ThemeProvider>
      <Box display="flex" direction="col" w={200}>
        <VisuallyHidden>
          <label htmlFor="search">Hidden Label</label>
        </VisuallyHidden>
        <input id="search" type="search" placeholder="A11y Search Input" />
        <Text mt="3" self="end" variant="small">
          Use this input to search things
        </Text>
      </Box>
    </ThemeProvider>
  )
}
```
