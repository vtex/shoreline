---
path: /docs/tokens-position/
---

# Position

```jsx
import { Box, ThemeProvider } from '@vtex/admin-ui'

function Example() {
  return (
    <ThemeProvider>
      <Box position="relative" z="1" top="0" left="0" bottom="0" right="0" />
    </ThemeProvider>
  )
}
```

| Prop       | CSS Property | Theme Field |
| ---------- | ------------ | ----------- |
| `position` | `position`   | none        |
| `z`        | `z-index`    | `zIndexes`  |
| `top`      | `top`        | `space`     |
| `right`    | `right`      | `space`     |
| `bottom`   | `bottom`     | `space`     |
| `left`     | `left`       | `space`     |
