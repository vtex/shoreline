---
title: Theming
path: /guidelines/theming/
sidebar_position: 6
---

# Theming

The theme object is where you define your application's color palette, type scale, font stacks, breakpoints, border-radius values, and more.

Theming with Admin UI is inspired by the [Styled System Theme Specification](https://system-ui.com/theme/).

Our library provides a sensible default theme defined by the design system team.

## Colors

Color themes are used to reflect a product's style with consistency across all components used on the application. Each color has some specific function when applied to an element on the screen. They can be customized to match the app's style guidelines, reflecting their function.

Our design system provides an [accessible default palette](/foundations/colors) to get you up and running. To check how we use them semantically, you can check the [Design Tokens section](/guidelines/design-tokens)

## Typography

The [StyleObject](styling) accepts the `text` prop. It combines `fontFamily`, `fontSize`, `fontVariationSettings`, and `lineHeight` css properties for a consistent font rendering throught the product.

```jsx live
<tag.h1 csx={{ text: '$pageTitle' }}>Page title</tag.h1>
```

| Value        | Description                                                                                                               |
| ------------ | ------------------------------------------------------------------------------------------------------------------------- |
| `$pageTitle` | Page header title                                                                                                         |
| `$title1`    | Primary titles                                                                                                            |
| `$title2`    | Nested titles                                                                                                             |
| `$action1`   | Actions text                                                                                                              |
| `$action2`   | Less proeminent actions, such as menus                                                                                    |
| `$display`   | Totalizer value                                                                                                           |
| `$body`      | Text in tables, modals, toasts, alerts, cards; Text in form fields and controls; Placeholder text in form fields.         |
| `$detail`    | Text in tag, tooltip and table pagination; Form error and help text. Labels in form field placeholders and select inline. |

## Breakpoints

Our styleguide comes with a predefined set of commonly used breakpoints. [Detailed info about Responsive Design](#)

```ts isStatic
export default {
  breakpoints: ['640px', '768px', '1024px', '1280px'],
}
```

## Spacing

The `space` key allows you to customize the global spacing and sizing scale for your project. By default these spacing values can be referenced by the `padding`, `margin`, and `top`, `left`, `right`, `bottom` styles.

**Multiple Properties:** Combines two or more CSS properties into one.

| Property   | Combines                      | Description        |
| ---------- | ----------------------------- | ------------------ |
| `paddingX` | `paddingLeft`, `paddingRight` | Horizontal padding |
| `paddingY` | `paddingTop`, `paddingBottom` | Vertical padding   |
| `marginX`  | `marginLeft`, `marginRight`   | Horizontal margin  |
| `marginY`  | `marginTop`, `marginBottom`   | Vertical margin    |

```ts isStatic
export default {
  space: {
    0: '0rem',
    1: '0.25rem',
    2: '0.5rem',
    3: '0.75rem',
    4: '1rem',
    5: '1.25rem',
    6: '1.5rem',
    7: '1.75rem',
    8: '2rem',
    px: '0.0625rem',
    '2px': '0.125rem',
  },
}
```

The values are proportional, so 1 spacing unit is equal to 0.25rem, which translates to 4px by default in common browsers.

:::tip

**Mental model**: If you need a spacing of 24px, divide it by 4. That'll give you 6. Then use it in your component.

:::

| Token | rem         | Pixels | size                                                                               |
| ----- | ----------- | ------ | ---------------------------------------------------------------------------------- |
| 0     | `0rem`      | `0px`  | <div style={{width: '0rem', backgroundColor: 'black', height: '10px'}}></div>      |
| px    | `0.0625rem` | `1px`  | <div style={{width: '0.0625rem', backgroundColor: 'black', height: '10px'}}></div> |
| 2px   | `0.125rem`  | `2px`  | <div style={{width: '0.125rem', backgroundColor: 'black', height: '10px'}}></div>  |
| 1     | `0.25rem`   | `4px`  | <div style={{width: '0.25rem', backgroundColor: 'black', height: '10px'}}></div>   |
| 2     | `0.5rem`    | `8px`  | <div style={{width: '0.5rem', backgroundColor: 'black', height: '10px'}}></div>    |
| 3     | `0.75rem`   | `12px` | <div style={{width: '0.75rem', backgroundColor: 'black', height: '10px'}}></div>   |
| 4     | `1rem`      | `16px` | <div style={{width: '1rem', backgroundColor: 'black', height: '10px'}}></div>      |
| 5     | `1.25rem`   | `20px` | <div style={{width: '1.25rem', backgroundColor: 'black', height: '10px'}}></div>   |
| 6     | `1.50rem`   | `24px` | <div style={{width: '1.50rem', backgroundColor: 'black', height: '10px'}}></div>   |
| 7     | `1.75rem`   | `28px` | <div style={{width: '1.75rem', backgroundColor: 'black', height: '10px'}}></div>   |
| 8     | `2rem`      | `32px` | <div style={{width: '2rem', backgroundColor: 'black', height: '10px'}}></div>      |

## Sizes

The sizes key allows you to customize the global sizing of components you build for your project. By default these sizes value can be referenced by the `width`, `height`, and `maxWidth`, `minWidth`, `maxHeight`, `minHeight` styles.

**Multiple Properties:** Combines two or more CSS properties into one.

| Property | Combines          | Description                                               |
| -------- | ----------------- | --------------------------------------------------------- |
| `size`   | `width`, `height` | Element size, useful to create a square or perfect circle |

```ts isStatic
export default {
  sizes: {
    sm: '20rem',
    md: '48rem',
    lg: '56rem',
    xl: '64rem',
    '1/2': '50%',
    '1/4': '25%',
    '2/4': '50%',
    '3/4': '75%',
    '1/8': '12.5%',
    '2/8': '25%',
    '3/8': '37.5%',
    '4/8': '50%',
    '5/8': '62.5%',
    '6/8': '75%',
    '7/8': '87.5%',
    '1/12': '8.333333%',
    '2/12': '16.666667%',
    '3/12': '25%',
    '4/12': '33.333333%',
    '5/12': '41.666667%',
    '6/12': '50%',
    '7/12': '58.333333%',
    '8/12': '66.666667%',
    '9/12': '75%',
    '10/12': '83.333333%',
    '11/12': '91.666667%',
    full: '100%',
    screenHeight: '100vh',
    screenWidth: '100vw',
  },
}
```

## Border Radius

Our styleguide comes with a set of smooth corner radius values.

```ts isStatic
export default {
  borderRadius: {
    default: '4px',
    flat: '0px',
    pill: '100px',
    circle: '100%',
  },
}
```

## Border Variant

The [StyleObject](styling) accepts the `border` prop. It is a shortcut for the border variants of the `admin-ui`.

```jsx live
function Example() {
  const { cn } = useSystem()

  return (
    <div className={cn({ border: 'default', padding: 4 })}>
      Div with border default
    </div>
  )
}
```

| Value            | Description                                                     |
| ---------------- | --------------------------------------------------------------- |
| `default`        | the most common border-style used along with all the `admin`    |
| `divider-bottom` | add a border dividing the current element with the one below it |
| `divider-top`    | add a border dividing the current element with the one above it |

```ts isStatic
export default {
  border: {
    default: {
      borderWidth: '1px',
      borderStyle: 'solid',
      borderRadius: 'default',
      borderColor: 'mid.tertiary',
    },
    'divider-bottom': {
      borderBottomWidth: '1px',
      borderBottomStyle: 'solid',
      borderBottomLeftRadius: 0,
      borderBottomRightRadius: 0,
      borderColor: 'mid.tertiary',
    },
    'divider-top': {
      borderTopWidth: '1px',
      borderTopStyle: 'solid',
      borderTopLeftRadius: 0,
      borderTopRightRadius: 0,
      borderColor: 'mid.tertiary',
    },
  },
}
```
