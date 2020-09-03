# Admin UI Skeleton

Skeletons represent a UI that doesn’t contain actual content; instead, it shows the loading elements of a page in a shape similar to the actual content.

- It shows users that content is loading, offering a vague preview of how content will look once it fully loads.
- It's being used internally by AdminUI to handle the loading state of specific components.

## Usage

By default, the `Skeleton` is fluid, which means that both width and height are `100%` of its container.

```jsx
import { Box, Skeleton } from '@vtex/admin-ui'

/**
 * In this example, the skeleton will fill its parent container.
 */
function Fluid() {
  return (
    <Box sx={{ height: 100, width: 100 }}>
      <Skeleton />
    </Box>
  )
}

/**
 * You can also use sx to set desired measures.
 */
function Fixed() {
  return <Skeleton sx={{ height: 100, width: 100 }} />
}
```

## Props

| prop  | type             | description                                                                   | required | default |
| ----- | ---------------- | ----------------------------------------------------------------------------- | -------- | ------- |
| shape | "rect", "circle" | Shape of the skeleton, you must use equal measures to obtain a perfect circle | 🚫       | "rect"  |
| sx    | SxStyleProp      | Theme-ui style prop                                                           | 🚫       | {}      |
