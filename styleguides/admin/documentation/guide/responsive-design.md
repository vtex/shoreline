---
path: /docs/guide/responsive-design/
---

# Responsive Design

## Media Queries

If you prefer standard CSS media query syntax, you can use nested objects for responsive styles as well.

```jsx static
<div
  sx={{
    width: '100%',
    '@media screen and (min-width: 40em)': {
      width: '50%',
    },
  }}
/>
```

## Responsive Values

Theme UI, like Styled System, includes a shorthand syntax for writing mobile-first responsive styles using arrays as values. This is useful when you want to change a single property across multiple breakpoints without needing to write verbose media query syntax.

```jsx static
import { ThemeProvider, Box } from '@vtex/admin-ui'

function Example() {
  return (
    <ThemeProvider>
      <Box
        styles={{
          width: ['full', 'full', '1/2'],
        }}
      />
    </ThemeProvider>
  )
}
```

### Skipping Breakpoints

If you want to skip a breakpoint, you can use the value null. This is useful if you want to set a value for only the largest breakpoint, for example.

```jsx static
/** @jsx jsx */
import { jsx } from 'theme-ui'
export default (props) => (
  <div
    {...props}
    sx={{
      width: [null, null, '25%'],
    }}
  />
)
```
