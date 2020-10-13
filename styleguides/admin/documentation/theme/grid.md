---
path: /docs/tokens-grid/
nightly: true
---

# Grid

```jsx
import { Box, ThemeProvider } from '@vtex/admin-ui'

function Example() {
  return (
    <ThemeProvider>
      <Box gridGap="2" gridAutoFlow="row dense" />
    </ThemeProvider>
  )
}
```

| Prop                  | CSS Property            | Theme Field |
| --------------------- | ----------------------- | ----------- |
| `gridGap`             | `grid-gap`              | `space`     |
| `gridRowGap`          | `grid-row-gap`          | `space`     |
| `gridColumnGap`       | `grid-column-gap`       | `space`     |
| `gridColumn`          | `grid-column`           | none        |
| `gridRow`             | `grid-row`              | none        |
| `gridArea`            | `grid-area`             | none        |
| `gridAutoFlow`        | `grid-auto-flow`        | none        |
| `gridAutoRows`        | `grid-auto-rows`        | none        |
| `gridAutoColumns`     | `grid-auto-columns`     | none        |
| `gridTemplateRows`    | `grid-template-rows`    | none        |
| `gridTemplateColumns` | `grid-template-columns` | none        |
| `gridTemplateAreas`   | `grid-template-areas`   | none        |
