---
path: /theming/style-object/
---

# StyleObject

The admin-ui `StyleObject` lets you style elements while consuming values from the theme. Think of it as a superset of CSS. You will encounter this API in mainly three places: `cn` function, `style`, and `styleOverrides` properties. To know more about the difference between those, you can check the [Styling Documentation](/docs/theming/styling/)

<blockquote palette="blue">

The `cn` function will be used on the examples below, due to its simplicity. The same behavior applies to `style` and `styleOverrides`.

</blockquote>

## Consuming theme keys

Within a `StyleObject` you are able to reuse the predefined styles of [`@vtex/admin-ui-theme`](https://www.npmjs.com/package/@vtex/admin-ui-theme) by using a [theme-aware property](/docs/theming/style-object/#theme-aware-properties).

```jsx
<div
  className={cn({
    color: 'blue',
    backgroundColor: 'blue.secondary',
    padding: 3,
    fontSize: 3,
  })}
>
  styled div
</div>
```

## Plain CSS

Any valid css object is accepted within the `StyleObject`. Like on the example below:

```jsx
<div
  className={cn({
    color: 'darkorchid',
    backgroundColor: 'orange',
    height: 48,
    fontSize: '2em',
  })}
>
  styled div
</div>
```

## Nesting & Child Selectors

In some cases, you might want to apply styles to children of the current element.
You can do so with Emotion's [nested selectors](https://emotion.sh/docs/nested).

```jsx
<div
  className={cn({
    button: {
      border: '1px solid',
      padding: 1,
      borderRadius: 'default',
    },
    'button + button': {
      marginLeft: 2,
    },
  })}
>
  <button>Button</button>
  <button>Button</button>
  <button>Button</button>
</div>
```

## Pseudo-classes

You can use all [CSS Pseudo-classes](https://developer.mozilla.org/en-US/docs/Web/CSS/Pseudo-classes) such as `:hover`, `:active`, `:focus` and more. For example:

```jsx
<div
  className={cn({
    bg: 'blue',
    color: 'blue.accent',
    padding: 1,
    size: 64,
    transition: 'snap',

    ':hover': {
      transform: 'scale(1.2)',
    },
  })}
>
  Scales on :hover
</div>
```

## Pseudo-elements

You can use all [CSS Pseudo-elements](https://developer.mozilla.org/en-US/docs/Web/CSS/Pseudo-elements) such as `:before` and `:after`. For example:

```jsx
<div
  className={cn({
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
  })}
/>
```

## Responsive values

Responsive values accept an array of values. The current value will be the one that matches the breakpoint:

```sh isStatic
[mobile, tablet, desktop, widescreen]
```

This is useful when you want to change a single property across multiple breakpoints without needing to write verbose media query syntax.

In the example below, the `<div>` has full width while on `mobile`, and half on `desktop` and above.

```jsx isStatic
<div
  className={cn({
    width: ['full', 'full', '1/2'],
  })}
/>
```

### Skipping breakpoints

If you want to skip a breakpoint, you can use the value `null`. This is useful if you want to set a value for only the largest breakpoint, for example.

```jsx isStatic
<div
  className={cn({
    width: [null, null, '25%'],
  })}
/>
```

### Media queries

If you prefer standard CSS media query syntax, you can use nested objects for responsive styles as well.

```jsx isStatic
<div
  className={cn({
    width: 'full',
    '@media screen and (min-width: 40em)': {
      width: '1/2',
    },
  })}
/>
```

## Functional style

For shorthand CSS properties or ones that are not automatically mapped to values in the theme, use an inline function to reference values from the theme object.

```jsx
<div
  className={cn({
    boxShadow: (theme) => `0 0 .5em ${theme.colors.red.default}`,
  })}
>
  Red glow box shadow
</div>
```

## Scales

Scales are values that can be consumed from specific properties within the `StyleObject`. They are the recommended values for those props if you desire to reach consistency between apps.

Available scales: [sizes](/theming/sizes/), [space](/theming/space/), [typography](/theming/typography/), [colors](/theming/colors/)
