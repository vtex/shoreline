---
title: Theming
path: /guidelines/theming/
---

# Theming

The theme object is where you define your application's color palette, type scale, font stacks, breakpoints, border-radius values, and more.

Theming with Admin UI is inspired by the [Styled System Theme Specification](https://system-ui.com/theme/).

Our library provides a sensible [default theme](https://github.com/vtex/onda/blob/master/packages/core/src/theme/shape.ts) defined by the design system team.

## Colors

Color themes are used to reflect a product's style with consistency across all components used on the application. Each color has some specific function when applied to an element on the screen. They can be customized to match the app's style guidelines, reflecting their function.

Our design system provides an accessible default palette to get you up and running. To check how we use them semantically, you can check the [Design Tokens section](/guidelines/design-tokens)

<Grid templateColumns="repeat(3, 1fr)" columnGap="4" rowGap="6">
  <ColorCard color="blue05" name="colors.blue40" />
  <ColorCard color="blue10" name="colors.blue40" />
  <ColorCard color="blue20" name="colors.blue40" />
  <ColorCard color="blue30" name="colors.blue40" />
  <ColorCard color="blue40" name="colors.blue40" />
  <ColorCard color="blue50" name="colors.blue40" />
  <ColorCard color="blue60" name="colors.blue40" />

  <ColorCard color="lightBlue05" name="colors.lightBlue05" />
  <ColorCard color="lightBlue10" name="colors.lightBlue10" />
  <ColorCard color="lightBlue20" name="colors.lightBlue20" />
  <ColorCard color="lightBlue30" name="colors.lightBlue30" />
  <ColorCard color="lightBlue40" name="colors.lightBlue40" />
  <ColorCard color="lightBlue50" name="colors.lightBlue50" />
  <ColorCard color="lightBlue60" name="colors.lightBlue60" />

  <ColorCard color="cyan05" name="colors.cyan05" />
  <ColorCard color="cyan10" name="colors.cyan10" />
  <ColorCard color="cyan20" name="colors.cyan20" />
  <ColorCard color="cyan30" name="colors.cyan30" />
  <ColorCard color="cyan40" name="colors.cyan40" />
  <ColorCard color="cyan50" name="colors.cyan50" />
  <ColorCard color="cyan60" name="colors.cyan60" />

  <ColorCard color="teal05" name="colors.teal05" />
  <ColorCard color="teal10" name="colors.teal10" />
  <ColorCard color="teal20" name="colors.teal20" />
  <ColorCard color="teal30" name="colors.teal30" />
  <ColorCard color="teal40" name="colors.teal40" />
  <ColorCard color="teal50" name="colors.teal50" />
  <ColorCard color="teal60" name="colors.teal60" />

  <ColorCard color="green05" name="colors.green05" />
  <ColorCard color="green10" name="colors.green10" />
  <ColorCard color="green20" name="colors.green20" />
  <ColorCard color="green30" name="colors.green30" />
  <ColorCard color="green40" name="colors.green40" />
  <ColorCard color="green50" name="colors.green50" />
  <ColorCard color="green60" name="colors.green60" />

  <ColorCard color="orange05" name="colors.orange05" />
  <ColorCard color="orange10" name="colors.orange10" />
  <ColorCard color="orange20" name="colors.orange20" />
  <ColorCard color="orange30" name="colors.orange30" />
  <ColorCard color="orange40" name="colors.orange40" />
  <ColorCard color="orange50" name="colors.orange50" />
  <ColorCard color="orange60" name="colors.orange60" />

  <ColorCard color="pink05" name="colors.pink05" />
  <ColorCard color="pink10" name="colors.pink10" />
  <ColorCard color="pink20" name="colors.pink20" />
  <ColorCard color="pink30" name="colors.pink30" />
  <ColorCard color="pink40" name="colors.pink40" />
  <ColorCard color="pink50" name="colors.pink50" />
  <ColorCard color="pink60" name="colors.pink60" />

  <ColorCard color="red05" name="colors.red05" />
  <ColorCard color="red10" name="colors.red10" />
  <ColorCard color="red20" name="colors.red20" />
  <ColorCard color="red30" name="colors.red30" />
  <ColorCard color="red40" name="colors.red40" />
  <ColorCard color="red50" name="colors.red50" />
  <ColorCard color="red60" name="colors.red60" />

  <ColorCard color="white" name="colors.white" />
  <ColorCard color="grey10" name="colors.grey10" />
  <ColorCard color="grey20" name="colors.grey20" />
  <ColorCard color="grey30" name="colors.grey30" />
  <ColorCard color="grey40" name="colors.grey40" />
  <ColorCard color="grey50" name="colors.grey50" />
  <ColorCard color="grey60" name="colors.grey60" />
  <ColorCard color="grey70" name="colors.grey60" />
  <ColorCard color="grey80" name="colors.grey60" />
  <ColorCard color="black" name="colors.black" />

</Grid>

## Typography

To manage Typography options, the theme object supports the following keys: `fonts`, `fontSizes`, `fontSettings` (equivalent to `fontVariationSettings` property), and lineHeights.

```ts isStatic
export default {
  fonts: {
    sans: '"VTEX Trust", -apple-system, system-ui, BlinkMacSystemFont, sans-serif',
    mono: '"MonoLisa", "Operator Mono", "Fira Code Retina", "Fira Code", "FiraCode-Retina", "Dank Mono", "Consolas", "Monaco", "Menlo", monospace',
  },
  fontSizes: {
    0: '0.75rem',
    1: '0.875rem',
    2: '1rem',
    3: '1.125rem',
    4: '1.25rem',
  },
  fontSettings: {
    hairline: "'WGHT' 100",
    thin: "'WGHT' 250",
    light: "'WGHT' 375",
    regular: "'WGHT' 500",
    medium: "'WGHT' 650",
    bold: "'WGHT' 875",
    black: "'WGHT' 1000",
  },
  lineHeights: {
    code: 1,
    small: 1.125,
    body: 1.25,
    highlight: 1.25,
    action: 1.5,
    subtitle: 1.5,
    headline: 1.5,
  },
}
```

### Text Variant

The [StyleObject](/theming/style-object/) accepts the `text` prop. It is a shortcut for the text variants of the `admin-ui`.
This is preferred over the scales.

```jsx
function Example() {
  const { cn } = useSystem()

  return <h1 className={cn({ text: 'headline' })}>Headline text</h1>
}
```

| Value       | Description                                                 |
| ----------- | ----------------------------------------------------------- |
| `code`      | `pre` & `code` tags. Use wheather you need monospaced fonts |
| `small`     | for small elements, such as tags, etc.                      |
| `body`      | default text for the most elements, such as `p`             |
| `highlight` | for accent texts                                            |
| `action`    | used on primary actions                                     |
| `subtitle`  | for subtitles                                               |
| `headline`  | for titles & page headers                                   |

```ts isStatic
export default {
  text: {
    code: {
      fontFamily: 'mono',
      lineHeight: 'code',
      fontSize: 1,
      fontFeatureSettings: "'clig' 0, 'calt' 0",
      fontVariantLigatures: 'normal',
    },
    small: {
      fontFamily: 'sans',
      lineHeight: 'small',
      fontSettings: 'regular',
      fontSize: 0,
    },
    body: {
      fontFamily: 'sans',
      lineHeight: 'body',
      fontSettings: 'regular',
      fontSize: 1,
    },
    highlight: {
      fontFamily: 'sans',
      lineHeight: 'highlight',
      fontSettings: 'regular',
      fontSize: 1,
    },
    action: {
      fontFamily: 'sans',
      lineHeight: 'action',
      fontSettings: 'regular',
      fontSize: 1,
      textTransform: 'uppercase',
    },
    subtitle: {
      fontFamily: 'sans',
      lineHeight: 'subtitle',
      fontSettings: 'regular',
      fontSize: 2,
    },
    headline: {
      fontFamily: 'sans',
      lineHeight: 'headline',
      fontSettings: 'regular',
      fontSize: 4,
    },
  },
}
```

## Breakpoints

Our styleguide comes with a predefined set of commonly used breakpoints. [Detailed info about Responsive Design]()

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

<blockquote palette="blue">

**Mental model**: If you need a spacing of 24px, divide it by 4. That'll give you 6. Then use it in your component.

</blockquote>

| Token | rem         | Pixels | size                                                                       |
| ----- | ----------- | ------ | -------------------------------------------------------------------------- |
| 0     | `0rem`      | `0px`  | <div style="width: 0rem; backgroundColor: black; height: 10px"></div>      |
| px    | `0.0625rem` | `1px`  | <div style="width: 0.0625rem; backgroundColor: black; height: 10px"></div> |
| 2px   | `0.125rem`  | `2px`  | <div style="width: 0.125rem; backgroundColor: black; height: 10px"></div>  |
| 1     | `0.25rem`   | `4px`  | <div style="width: 0.25rem; backgroundColor: black; height: 10px"></div>   |
| 2     | `0.5rem`    | `8px`  | <div style="width: 0.5rem; backgroundColor: black; height: 10px"></div>    |
| 3     | `0.75rem`   | `12px` | <div style="width: 0.75rem; backgroundColor: black; height: 10px"></div>   |
| 4     | `1rem`      | `16px` | <div style="width: 1rem; backgroundColor: black; height: 10px"></div>      |
| 5     | `1.25rem`   | `20px` | <div style="width: 1.25rem; backgroundColor: black; height: 10px"></div>   |
| 6     | `1.50rem`   | `24px` | <div style="width: 1.50rem; backgroundColor: black; height: 10px"></div>   |
| 7     | `1.75rem`   | `28px` | <div style="width: 1.75rem; backgroundColor: black; height: 10px"></div>   |
| 8     | `2rem`      | `32px` | <div style="width: 2rem; backgroundColor: black; height: 10px"></div>      |

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

The [StyleObject](/theming/style-object/) accepts the `border` prop. It is a shortcut for the border variants of the `admin-ui`.

```jsx
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
