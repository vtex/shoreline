---
path: /docs/tokens-color/
nightly: true
---

# Color

```jsx
import { Box, ThemeProvider } from '@vtex/admin-ui'

function Example() {
  return (
    <ThemeProvider>
      <Box bg="primary.base" c="primary.contrast" />
    </ThemeProvider>
  )
}
```

#### Available Tokens

| Token    | CSS Property          | Theme Field |
| -------- | --------------------- | ----------- |
| `c`      | `color`               | `colors`    |
| `bg`     | `background-color`    | `colors`    |
| `cc`     | `caret-color`         | `colors`    |
| `bc`     | `border-color`        | `colors`    |
| `btc`    | `border-top-color`    | `colors`    |
| `brc`    | `border-right-color`  | `colors`    |
| `bbc`    | `border-bottom-color` | `colors`    |
| `blc`    | `border-left-color`   | `colors`    |
| `oc`     | `outline-color`       | `colors`    |
| `fill`   | `fill`                | `colors`    |
| `stroke` | `stroke`              | `colors`    |

#### Values

| Token Value        | Returned Value | Color Preview               |
| ------------------ | -------------- | --------------------------- |
| `text`             | #323845        | <colorblock bg="#323845" /> |
| `background`       | #FFFFFF        | <colorblock bg="#FFFFFF" /> |
| `focus`            | #8DB6FA        | <colorblock bg="#8DB6FA" /> |
| `emphasis`         | #F71963        | <colorblock bg="#F71963" /> |
| `muted.0`          | #686E7B        | <colorblock bg="#686E7B" /> |
| `muted.1`          | #8B9299        | <colorblock bg="#8B9299" /> |
| `muted.2`          | #C1C6CC        | <colorblock bg="#C1C6CC" /> |
| `muted.3`          | #D7DADF        | <colorblock bg="#D7DADF" /> |
| `muted.4`          | #F3F5F9        | <colorblock bg="#F3F5F9" /> |
| `primary.base`     | #2953B2        | <colorblock bg="#2953B2" /> |
| `primary.hover`    | #1E4397        | <colorblock bg="#1E4397" /> |
| `primary.active`   | #3F6FDB        | <colorblock bg="#3F6FDB" /> |
| `primary.contrast` | #FFFFFF        | <colorblock bg="#FFFFFF" /> |
| `primary.washed.0` | #F4F8FE        | <colorblock bg="#F4F8FE" /> |
| `primary.washed.1` | #E8F1FF        | <colorblock bg="#E8F1FF" /> |
| `primary.washed.2` | #DBE9FF        | <colorblock bg="#DBE9FF" /> |
| `danger.base`      | #D23030        | <colorblock bg="#D23030" /> |
| `danger.hover`     | #A70C0C        | <colorblock bg="#A70C0C" /> |
| `danger.active`    | #DE0404        | <colorblock bg="#DE0404" /> |
| `danger.contrast`  | #FFFFFF        | <colorblock bg="#FFFFFF" /> |
| `danger.washed.0`  | #FFF0F0        | <colorblock bg="#FFF0F0" /> |
| `danger.washed.1`  | #FFE3E3        | <colorblock bg="#FFE3E3" /> |
| `danger.washed.2`  | #FFD0D0        | <colorblock bg="#FFD0D0" /> |
| `success.base`     | #097E47        | <colorblock bg="#097E47" /> |
| `success.hover`    | #005C31        | <colorblock bg="#005C31" /> |
| `success.active`   | #26AE6E        | <colorblock bg="#26AE6E" /> |
| `success.contrast` | #FFFFFF        | <colorblock bg="#FFFFFF" /> |
| `success.washed.0` | #E2F5EA        | <colorblock bg="#E2F5EA" /> |

| CSS Properties |
| -------------- |
| `transparent`  |
| `inherit`      |
| `initial`      |
| `auto`         |
| `invert`       |
| `none`         |
