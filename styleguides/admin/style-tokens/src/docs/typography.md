---
path: /docs/tokens-typography/
---

# Typography

```jsx
import { Box, ThemeProvider } from '@vtex/admin-ui'

function Example() {
  return (
    <ThemeProvider>
      <Box fs="1" fw="regular" ta="center" lh="small" />
    </ThemeProvider>
  )
}
```

#### Available Tokens

| Token | CSS Property                             | Theme Field   |
| ----- | ---------------------------------------- | ------------- |
| `fs`  | `font-size`                              | `fontSizes`   |
| `fw`  | `font-variation-settings`, `font-weight` | `fontWeights` |
| `lh`  | `line-height`                            | `lineHeights` |
| `ta`  | `text-align`                             | none          |

#### Values

##### Font size

| Token Value | Returned Value |
| ----------- | -------------- |
| 0           | `0.75rem`      |
| 1           | `0.875rem`     |
| 2           | `1rem`         |
| 3           | `1.125rem`     |
| 4           | `1.25rem`      |

##### Font Weights

| Token Value | Returned Value                                             |
| ----------- | ---------------------------------------------------------- |
| `light`     | `fontVariationSettings`: `'wght' 80`, `fontWeight`: `300`  |
| `regular`   | `fontVariationSettings`: `'wght' 92`, `fontWeight`: `400`  |
| `medium`    | `fontVariationSettings`: `'wght' 100`, `fontWeight`: `500` |
| `bold`      | `fontVariationSettings`: `'wght' 108`, `fontWeight`: `600` |

##### Line Height

| Token Value | Returned Value |
| ----------- | -------------- |
| `small`     | `1.125em`      |
| `body`      | `1.125em`      |
| `highlight` | `1.125em`      |
| `action`    | `1.5em`        |
| `subtitle`  | `1.5em`        |
| `headline`  | `1.5em`        |
