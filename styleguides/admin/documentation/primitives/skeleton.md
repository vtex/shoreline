---
path: /skeleton/
---

# Skeleton

Skeletons represent a UI that doesn’t contain actual content; instead, it shows the loading elements of a page in a shape similar to the actual content.

- It shows users that content is loading, offering a vague preview of how content will look once it fully loads.
- It's being used internally by AdminUI to handle the loading state of specific components.

## Behavior

By default, the `Skeleton` is fluid, which means that both width and height are `100%` of its container.

```jsx
import { ThemeProvider, Skeleton, Box } from '@vtex/admin-ui'

function Example() {
  return (
    <ThemeProvider>
      <Box width="full" height={192}>
        <Skeleton />
      </Box>
    </ThemeProvider>
  )
}
```

## Installation

```sh static
yarn add @vtex/admin-ui
```

```jsx static
import { Skeleton } from '@vtex/admin-ui'
```

## Variation

### Rect

By default Skeleton shape is rectangular. This means that the <highlight message="shape"></highlight> property has the `rect` value.

```jsx
import { ThemeProvider, Skeleton } from '@vtex/admin-ui'

function Example() {
  return (
    <ThemeProvider>
      <Skeleton height={128} width={128} />
    </ThemeProvider>
  )
}
```

### Circle

The shape can also be circular. To do this add the <highlight message="shape"></highlight> property with the `circle` value.

```jsx
import { ThemeProvider, Skeleton } from '@vtex/admin-ui'

function Example() {
  return (
    <ThemeProvider>
      <Skeleton shape="circle" width={100} height={100} />
    </ThemeProvider>
  )
}
```

## Props

<proptypes heading="Skeleton" component="Skeleton" />
