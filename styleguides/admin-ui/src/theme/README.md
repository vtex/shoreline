# Admin UI Theme

## ThemeProvider

> Provider of all admin-ui styles

The ThemeProvider component is a wrapper around Emotion's ThemeProvider and MDX's MDXProvider. It provides default styled-components to MDX content that pick up values from `theme.styles`. It also handles color mode state.

Usage:

```jsx
import { ThemeProvider } from '@vtex/admin-ui'

function ProjectRoot() {
  return <ThemeProvider>{/** You app here */}</ThemeProvider>
}
```

## jsx

The jsx export is a React create element function intended for use with a custom pragma comment. It adds support for the sx prop, which uses Emotion's create element function internally and parses style objects with the Theme UI css utility.

Usage:

```jsx
/** @jsx jsx */
import { jsx } from '@vtex/admin-ui'

export default (props) => (
  <div
    {...props}
    sx={{
      color: 'primary.base',
    }}
  />
)
```

## `useTheme` hook

> Returns the theme object

Usage:

```jsx
import { useTheme } from '@vtex-components/theme'

function Component() {
  const theme = useTheme()
  // ...
}
```

## `sx` property

> To apply custom styles and consume theme values on specyfic properties

The sx prop lets you add any valid CSS to an element, while using values from your theme to keep styles consistent. You can think of the style object that the sx prop accepts as a superset of CSS.

Some property are theme-aware, that can consume specyfic sections of the theme context. You can see the full token list down below.

[Read more on ThemeUI Documentation](https://theme-ui.com/sx-prop)

## Token List

> List of all tokens and props that can consume it

### Space

Supported props:

```
margin, margin-top, margin-right, margin-bottom, margin-left, margin-block, margin-block-end, margin-block-start, margin-inline, margin-inline-end, margin-inline-start, padding, padding-top, padding-right, padding-bottom, padding-left, padding-block, padding-block-end, padding-block-start, padding-inline, padding-inline-end, padding-inline-start, inset, inset-block, inset-block-end, inset-block-start, inset-inline, inset-inline-end, inset-inline-start, top, right, bottom, left, grid-gap, grid-column-gap, grid-row-gap, gap, column-gap, row-gap
```

| token | value  |
| ----- | ------ |
| 0     | `0px`  |
| 1     | `1px`  |
| 2     | `2px`  |
| 3     | `4px`  |
| 4     | `6px`  |
| 5     | `8px`  |
| 6     | `10px` |
| 7     | `12px` |
| 8     | `14px` |
| 9     | `16px` |
| 10    | `18px` |
| 11    | `20px` |
| 12    | `22px` |
| 13    | `24px` |

### Color

Supported props:

```
color, background-color, border-color, caret-color, border-top-color, border-bottom-color, border-left-color, border-right-color, outline-color, fill, stroke
```

| token              | value     |
| ------------------ | --------- |
| `text`             | '#323845' |
| `background`       | '#FFFFFF' |
| `focus`            | '#8DB6FA' |
| `muted.0`          | '#686E7B' |
| `muted.1`          | '#8B9299' |
| `muted.2`          | '#C1C6CC' |
| `muted.3`          | '#D7DADF' |
| `muted.4`          | '#F3F5F9' |
| `primary.base`     | '#2953B2' |
| `primary.hover`    | '#1E4397' |
| `primary.active`   | '#3F6FDB' |
| `primary.contrast` | '#FFFFFF' |
| `primary.washed`   | '#F4F8FE' |
| `danger.base`      | '#D23030' |
| `danger.hover`     | '#A70C0C' |
| `danger.active`    | '#DE0404' |
| `danger.contrast`  | '#FFFFFF' |
| `danger.washed`    | '#FFF0F0' |

### fontSize

Supported props:

```
font-size
```

| token | value  |
| ----- | ------ |
| 0     | `12px` |
| 1     | `14px` |
| 2     | `16px` |
| 3     | `20px` |

### Line Height

Supported props:

```
line-height
```

| token       | value     |
| ----------- | --------- |
| `small`     | `1.125em` |
| `body`      | `1.125em` |
| `highlight` | `1.125em` |
| `action`    | `1.5em`   |
| `subtitle`  | `1.5em`   |
| `headline`  | `1.5em`   |

### Border Width

Supported props:

```
border-width, border-top-width, border-bottom-width, border-left-width, border-right-width, border-block-end-width, border-block-start-width, border-block-width, border-inline-end-width, border-inline-start-width, border-inline-width
```

| token | value |
| ----- | ----- |
| 0     | `0px` |
| 1     | `1px` |
| 2     | `2px` |
| 3     | `4px` |
| 4     | `6px` |

### Border Radius

Supported props:

```
border-radius, border-top-right-radius, border-top-left-radius, border-bottom-right-radius, border-bottom-left-radius, border-end-end-radius, border-end-start-radius, border-start-end-radius, border-start-start-radius
```

| token | value |
| ----- | ----- |
| 0     | `0px` |
| 1     | `1px` |
| 2     | `2px` |
| 3     | `4px` |
| 4     | `6px` |
