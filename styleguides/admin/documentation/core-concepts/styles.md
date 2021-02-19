---
path: /core-concepts/styles/
---

# Styles

The admin-ui `StyleObject` lets you style elements while consuming values from the theme. We use [emotion](https://emotion.sh/docs/introduction) under the hood - you can think of it as a superset of [emotion's css object](https://emotion.sh/docs/object-styles). So, this means that any valid emotion object is also accepted.

```jsx
<Box
  styles={{
    color: 'darkorchid',
    backgroundColor: 'orange',
    padding: '10px',
  }}
>
  styled box
</Box>
```

## Scales

Scales are values that can be consumed from specific properties within the `StyleObject`. They are the recommended values for those props if you desire to reach consistency between apps. These are defined within our `default theme`, and you can check all the available scales on the [link](/theming/default-theme).

```jsx
<Box
  styles={{
    color: 'blue',
    backgroundColor: 'blue.secondary',
    padding: 3,
    fontSize: 3,
  }}
>
  styled box
</Box>
```

## Nesting

Sometimes it’s useful to nest selectors to target elements inside the current class or React component. An example with an element selector is shown below.

```jsx
<Box
  styles={{
    button: {
      padding: 1,
      margin: 1,
      cursor: 'pointer',
      borderRadius: 'default',
      bg: 'light.secondary',
      color: 'dark.primary',
    },
    header: {
      button: {
        bg: 'dark.primary',
        color: 'light.primary',
      },
    },
  }}
>
  <header>
    <button>dark button</button>
  </header>
  <button>light button</button>
</Box>
```

## className

Scoped clasNames can also be created and reused multiple times.

```jsx
<Box
  styles={{
    display: 'flex',
    '.button': {
      padding: 1,
      borderRadius: 'default',
      cursor: 'pointer',
      fontSize: 1,
      textDecoration: 'none',
      '+ .button': {
        marginLeft: 2,
      },
    },
    '.light': {
      bg: 'light.secondary',
      color: 'dark.primary',
    },
    '.dark': {
      bg: 'dark.primary',
      color: 'light.primary',
    },
  }}
>
  <button className="button dark">dark button</button>
  <button className="button light">light button</button>
  <a className="button dark">link dark button</a>
</Box>
```

## Pseudo-classes

You can use all [CSS Pseudo-classes](https://developer.mozilla.org/en-US/docs/Web/CSS/Pseudo-classes) such as `:hover`, `:active`, `:focus` and more. For example:

```jsx
<Box
  styles={{
    bg: 'blue',
    color: 'light.primary',
    padding: 1,
    size: 64,
    transition: 'snap',
    ':hover': {
      transform: 'scale(1.2)',
    },
  }}
>
  Scales on :hover
</Box>
```

## Pseudo-elements

You can use all [CSS Pseudo-elements](https://developer.mozilla.org/en-US/docs/Web/CSS/Pseudo-elements) such as `:before` and `:after`. For example:

```jsx
<Box
  styles={{
    boxSizing: 'border-box',
    position: 'relative',
    display: 'block',
    transform: 'scale(1)',
    width: '22px',
    height: '22px',
    ':before,:after': {
      content: '""',
      display: 'block',
      boxSizing: 'border-box',
      position: 'absolute',
      left: '3px',
    },
    ':after': {
      width: '8px',
      height: '8px',
      borderBottom: '2px solid',
      borderLeft: '2px solid',
      transform: 'rotate(45deg)',
      bottom: '7px',
    },
    ':before': {
      width: '16px',
      height: '2px',
      bottom: '10px',
      background: 'currentColor',
    },
  }}
/>
```

## Media queries

You can also use the [standard CSS media query syntax](https://developer.mozilla.org/en-US/docs/Web/CSS/Media_Queries/Using_media_queries). All features work inside media query declarations as well (like: nesting, className, pseudo-elements, etc.).

```jsx
<Box
  styles={{
    bg: 'blue',
    size: 50,
    '@media screen and (min-width: 40em)': {
      size: 100,
    },
  }}
/>
```

## Responsive values

Responsive values accept an array of values. The current value will be the one that matches the breakpoint:

| name       | min-width em | min-width px |
| ---------- | ------------ | ------------ |
| mobile     | `40rem`      | `640px`      |
| tablet     | `48rem`      | `768px`      |
| desktop    | `64rem`      | `1024px`     |
| widescreen | `80rem`      | `1280px`     |

This is useful when you want to change a single property across multiple breakpoints without needing to write verbose media query syntax. In the example below, the `<div>` has full width while on `mobile`, and half on `desktop` and above.

```jsx
<Box
  styles={{
    bg: 'dark.primary',
    height: 30,
    width: ['full', 'full', '1/2'],
  }}
/>
```

**If you want to skip a breakpoint, you can use the value `null`. This is useful if you want to set a value for only the largest breakpoint.**

```jsx isStatic
<Box
  styles={{
    width: [null, null, '25%'],
  }}
/>
```

## Functions

For shorthand CSS properties or ones that are not automatically mapped to values in the theme, use an inline function to reference values from the theme object.

```jsx
<Box
  styles={{
    boxShadow: (theme) => `0 0 .5em ${theme.colors.red.default}`,
  }}
>
  Red glow box shadow
</Box>
```
