---
path: /docs/skeleton/
---

# Skeleton

Skeletons represent a UI that doesn’t contain actual content; instead, it shows the loading elements of a page in a shape similar to the actual content.

- It shows users that content is loading, offering a vague preview of how content will look once it fully loads.
- It's being used internally by AdminUI to handle the loading state of specific components.

## Usage

By default, the `Skeleton` is fluid, which means that both width and height are `100%` of its container.

- **Fluid Example**

```jsx
import { ThemeProvider, Skeleton, Box } from '@vtex/admin-ui'

function Example() {
  return (
    <ThemeProvider>
      <Box w="full" h={192}>
        <Skeleton />
      </Box>
    </ThemeProvider>
  )
}
```

- **Rect Example**

```jsx
import { ThemeProvider, Skeleton } from '@vtex/admin-ui'

function Example() {
  return (
    <ThemeProvider>
      <Skeleton h={128} w={128} />
    </ThemeProvider>
  )
}
```

- **Circle Example**

```jsx
import { ThemeProvider, Skeleton } from '@vtex/admin-ui'

function Example() {
  return (
    <ThemeProvider>
      <Skeleton shape="circle" w={100} h={100} />
    </ThemeProvider>
  )
}
```

## Props

<proptypes heading="Skeleton" component="Skeleton" />
