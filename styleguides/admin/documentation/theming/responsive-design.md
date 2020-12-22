---
path: /theming/responsive-design/
---

# Responsive Design

## Breakpoints

`admin-ui` uses 4 mobile-first breakpoints, which are

| name       | min-width em | min-width px |
| ---------- | ------------ | ------------ |
| mobile     | `40rem`      | `640px`      |
| tablet     | `48rem`      | `768px`      |
| desktop    | `64rem`      | `1024px`     |
| widescreen | `80rem`      | `1280px`     |

## Responsive Values

A Responsive value accept an array of values. The current value will be the one that matches the breakpoint:

```sh isStatic
[mobile, tablet, desktop, widescreen]
```

In the example below, the `<Box>` has full width while on `mobile`, and half on tablet and above.

```jsx
<Box
  styles={{
    width: ['full', '1/2'],
    padding: 4,
    bg: 'blue',
    color: 'blue.accent',
  }}
/>
```

### Skipping Breakpoints

If you want to skip a breakpoint, you can use the value `null`. This is useful if you want to set a value for only the largest breakpoint, for example.

```jsx
<Box
  styles={{
    width: [null, null, 'full'],
    padding: 4,
    color: 'light.primary',
    bg: 'dark.primary',
  }}
/>
```

## 🎣 React hooks

You can also use the `useResponsiveValue` hook. It can turn any value in a responsive value.

```jsx noInline
function Example() {
  const mobileText = '📱 mobile'
  const aboveTabletText = '🖥 tablet & above'
  const text = useResponsiveValue([mobileText, aboveTabletText])

  return (
    <Box styles={{ padding: 4, bg: 'dark.primary', color: 'light.primary' }}>
      {text}
    </Box>
  )
}

render(<Example />)
```
