---
path: /visually-hidden/
---

# VisuallyHidden

VisuallyHidden is a utility component that can be used to hide its children visually, while keeping them visible to screen readers and other assistive technology.

## Behavior

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

## Installation

```static
yarn add @vtex/admin-ui
```

```jsx static
import { VisuallyHidden } from '@vtex/admin-ui'
```
