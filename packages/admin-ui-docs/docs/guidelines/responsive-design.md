---
title: Responsive Design
path: /guidelines/responsive-design/
sidebar_position: 3
---

# Responsive Design

## Responsive aliases

Admin UI has five responsive aliases that guide you while authoring responsive layouts.

| alias          | min-width em | min-width px | max-width em | max-width px |
| -------------- | ------------ | ------------ | ------------ | ------------ |
| `@tablet`      | `48em`       | `768px`      | -            | -            |
| `@tabletOnly`  | `48em`       | `768px`      | `64em`       | `1024px`     |
| `@desktop`     | `64em`       | `1024px`     | -            | -            |
| `@desktopOnly` | `64em`       | `1024px`     | `75em`       | `1200px`     |
| `@widescreen`  | `75em`       | `1200px`     | -            | -            |

In the example - the text content changes, representing the current screen size. You can resize your browser window to see the result.

```jsx live
<tag.div
  csx={{
    ':before': {
      content: '"Mobile"',
      '@tablet': { content: '"Tablet"' },
      '@desktop': { content: '"Desktop"' },
      '@widescreen': { content: '"Widescreen"' },
    },
  }}
/>
```

<details>
  <summary>💡 What happens under the hood?</summary>
  <div>
    <p>
      The responsive alias string will be replaced by a media query.
      <br />
      It replaces the pattern <strong>@[alias]</strong> by <strong>@media (min-width: theme.breakpoints.[alias])</strong>.
      <br />
      For exemple, <strong>@tablet</strong> will be replaced by <strong>@media (min-width: 48em)</strong>.
    </p>
    <br />
    <p>
      The same idea applies to the <strong>only</strong> aliases! The diference is that it set the next breakpoint's <strong>min-width</strong> as its <strong>max-width</strong>, creating a interval.
      <br />
      For exemple, <strong>@tabletOnly</strong> will be replaced by <strong>@media (min-width: 48em) and (max-width: 64em)</strong>.
    </p>
  </div>
</details>

## Mental model

Our styles have a mobile-first mindset. It means that every style that you write targets mobile by default. Each responsive alias targets all others above it so that you can work in optimizing your layout for larger screens. In other words, **always work optimizing space**.

The `Box` in the example has the `$s` padding for all screens:

```jsx
<Box
  csx={{
    padding: '$s',
  }}
/>
```

If we add the `@tablet` rule, the padding will be `$m` for tablets and above - which means that it will remain `$s` for screens smaller than `@tablet`. The logic is still the same for other breakpoints.

```jsx
<tag.div
  csx={{
    padding: '$s',
    '@tablet': {
      padding: '$m',
    },
  }}
/>
```

## Custom media queries

The [responsive aliases](#responsive-aliases) can cover most of the use cases, but custom media queries are allowed if you want to target specific devices on your design. For example:

```js
// declaration
const iPhoneXRLandscape = `
  @media only screen 
  and (device-width : 414px) 
  and (device-height : 896px) 
  and (-webkit-device-pixel-ratio : 2) 
  and (orientation : landscape)
`

// usage
const layout = style({
  // ... component styles,
  [iPhoneXRLandscape]: {
    // ... device specyfic styles
  },
})
```

## Responsive values [deprecated]

A responsive value is a `deprecated` approach in which properties can accept an array of values. Each position of the array correspond to the value on each breakpoint, following the sequence:

```sh
[mobile, tablet, desktop, widescreen]
```

To have a `<Box>` full width while on `mobile`, and half on tablet and above:

```jsx live
<Box
  csx={{
    width: ['full', '1/2'],
    padding: 4,
    bg: 'grey',
  }}
/>
```

You can use the value `null` to skip breakpoints:

```jsx live
<Box
  csx={{
    width: [null, null, 'full'],
    padding: 4,
    bg: 'grey',
  }}
/>
```

### Why are we deprecating this?

The main reasons are:

- Multiple responsive styles are harder to write, learn, and understand.
- Less performant to parse.
- Library complexity overhead.

To migrate to the aliases, you need to place the styles in the correct category.

```js
// with responsive values
const style = {
  bg: '$primary',
  color: '$primary',
  padding: [10, null, null, 20],
  margin: [5, null, 10, 15],
}

// with aliases
const style = {
  bg: '$primary',
  color: '$primary',
  padding: 10,
  margin: 5,
  '@desktop': {
    margin: 10,
  },
  '@widescreen': {
    padding: 20,
    margin: 15,
  },
}
```

## Additional resources

- [Learn responsive design](https://web.dev/learn/design/).
- [Using media queries](https://developer.mozilla.org/en-US/docs/Web/CSS/Media_Queries/Using_media_queries)
