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
| widescreen | `75rem`      | `1200px`     |

## Responsive Values

A Responsive value accept an array of values. The current value will be the one that matches the breakpoint:

```sh isStatic
[mobile, tablet, desktop, widescreen]
```

In the example below, the `<Box>` has full width while on `mobile`, and half on tablet and above.

```jsx
<Box
  csx={{
    width: ['full', '1/2'],
    padding: 4,
    bg: 'blue',
    color: 'light.primary',
  }}
/>
```

### Skipping Breakpoints

If you want to skip a breakpoint, you can use the value `null`. This is useful if you want to set a value for only the largest breakpoint, for example.

```jsx
<Box
  csx={{
    width: [null, null, 'full'],
    padding: 4,
    color: 'light.primary',
    bg: 'dark.primary',
  }}
/>
```

### Responsive aliases

We provide some properties that combine our breakpoints with media queries making it easier to add responsiveness into your layout.

For example, you can use the alias `@tablet` if you want to apply specific styles only to devices with widths similar to a tablet.

```jsx
<Box
  csx={{
    bg: 'yellow',
    '@tablet': { bg: 'green' },
    '@desktop': { bg: 'blue' },
    '@widescreen': { bg: 'red' },
  }}
>
  Box
</Box>
```
