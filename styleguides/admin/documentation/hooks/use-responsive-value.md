---
path: /hooks/use-responsive-value/
---

# useResponsiveValue

Custom hook which returns the value for the current breakpoint from the provided responsive values object. It also responds to the window resizing and returning the appropriate value for the new window size.

## Usage

```jsx
function Example() {
  const mobileText = '📱 mobile'
  const aboveTabletText = '🖥 tablet & above'
  const text = useResponsiveValue([mobileText, aboveTabletText])

  return <Box>{text}</Box>
}
```
