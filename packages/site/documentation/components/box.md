---
path: /box/
---

# Box

`Box` is a low-level component with no defined style or shape.

## Import

```jsx isStatic
import { Box } from '@vtex/admin-ui'
```

## Behavior

```jsx
<Box>Box content</Box>
```

## Styling

Use the `csx` property to [add styles](/guidelines/styling/).

```jsx isStatic
<Box csx={{ padding: 1 }}>...</Box>
```

## Semantic elements

By default, Box renders a div element. You can customise it using the `as` prop.

```jsx isStatic
<Box as="section">
  ...
</Box>

<Box as="span" aria-hidden>
  ...
</Box>
```

# Props

All props of `as`, which is `div` by default.
