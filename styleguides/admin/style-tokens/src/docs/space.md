---
path: /docs/tokens-space/
---

# Space

```jsx
import { Box, ThemeProvider } from '@vtex/admin-ui'

function Example() {
  return (
    <ThemeProvider>
      <Box m="2" pb="4" />
    </ThemeProvider>
  )
}
```

#### Available Tokens

| Token | CSS Property                       | Theme Field |
| ----- | ---------------------------------- | ----------- |
| `m`   | `margin`                           | `space`     |
| `mt`  | `margin-top`                       | `space`     |
| `mr`  | `margin-right`                     | `space`     |
| `mb`  | `margin-bottom`                    | `space`     |
| `ml`  | `margin-left`                      | `space`     |
| `mx`  | `margin-left` and `margin-right`   | `space`     |
| `my`  | `margin-top` and `margin-bottom`   | `space`     |
| `p`   | `padding`                          | `space`     |
| `pt`  | `padding-top`                      | `space`     |
| `pr`  | `padding-right`                    | `space`     |
| `pb`  | `padding-bottom`                   | `space`     |
| `pl`  | `padding-left`                     | `space`     |
| `px`  | `padding-left` and `padding-right` | `space`     |
| `py`  | `padding-top` and `padding-bottom` | `space`     |

#### Values

| Token Value | Returned Value |
| ----------- | -------------- |
| '0'         | `0rem`         |
| '1'         | `0.25rem`      |
| '2'         | `0.5rem`       |
| '3'         | `0.75rem`      |
| '4'         | `1rem`         |
| '5'         | `1.25rem`      |
| '6'         | `1.5rem`       |
| '7'         | `1.75rem`      |
| '8'         | `2rem`         |
| 'px'        | `0.0625rem`    |
| '2px'       | `0.125rem`     |
