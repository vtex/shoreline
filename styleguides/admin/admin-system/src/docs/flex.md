---
path: /docs/tokens-flex/
---

# Flex

```jsx
import { Box, ThemeProvider } from '@vtex/admin-ui'

function Example() {
  return (
    <ThemeProvider>
      <Box width="full" height="2xl" overflow="hidden" />
    </ThemeProvider>
  )
}
```

#### Available Tokens

| Prop        | CSS Property      | Theme Field | Values                                       |
| ----------- | ----------------- | ----------- | -------------------------------------------- |
| `items`     | `align-items`     | none        | start, end, center, baseline, stretch, auto  |
| `justify`   | `justify-content` | none        | start, end, center, between, around, evenly  |
| `wrap`      | `flex-wrap`       | none        | wrap, reverse, nowrap                        |
| `direction` | `flex-direction`  | none        | row, rowReverse, col, colReverse             |
| `self`      | `align-self`      | none        | start, end, center, baseline, stretch, auto  |
| `content`   | `align-content`   | none        | start, end, center, between, around, stretch |
| `grow`      | `flex-grow`       | none        | number                                       |
| `shrink`    | `flex-shrink`     | none        | number                                       |
| `order`     | `order`           | none        | number                                       |
