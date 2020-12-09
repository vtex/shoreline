---
path: /theming/css-props/
---

# Scales

Properties that you can use in specific components to add `space` or `size` styles.

## Space

`padding`, `paddingX`, `paddingY`, `paddingLeft`, `paddingRight`, `paddingTop`, `paddingBottom`.

`margin`, `marginX`, `marginY`, `marginLeft`, `marginRight`, `marginTop`, `marginBottom`

| TOKEN | REM         | PX     | SIZE                                                                       |
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

## Size

You can use this prop in the following components:

- `Box`
- `Card`
- `Skeleton`

### Theme values

```jsx static
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
}
```

### properties

`width`, `height`, `maxWidth`, `maxHeight`, `minWidth`, `minHeight`
