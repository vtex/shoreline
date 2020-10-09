---
path: /docs/tokens-border/
---

# Border

```jsx
import { Box, ThemeProvider } from '@vtex/admin-ui'

function Example() {
  return (
    <ThemeProvider>
      <Box bw="1" br="3" bs="solid" />
    </ThemeProvider>
  )
}
```

#### Available Tokens

| Token | CSS Property          | Theme Field    |
| ----- | --------------------- | -------------- |
| `bw`  | `border-width`        | `borderWidths` |
| `btw` | `border-top-width`    | `borderWidths` |
| `bbw` | `border-bottom-width` | `borderWidths` |
| `brw` | `border-right-width`  | `borderWidths` |
| `blw` | `border-left-width`   | `borderWidths` |
| `br`  | `border-radius`       | `borderRadius` |
| `bs`  | `border-style`        | none           |
| `bts` | `border-top-style`    | none           |
| `bbs` | `border-bottom-style` | none           |
| `brs` | `border-right-style`  | none           |
| `bls` | `border-left-style`   | none           |

#### Values

| Token Value | Returned Value |
| ----------- | -------------- |
| 0           | `0rem`         |
| 1           | `0.0625rem`    |
| 2           | `0.125rem`     |
| 3           | `0.25rem`      |
