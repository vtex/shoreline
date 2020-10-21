---
path: /docs/style-props/
next: true
---

# Style Props

## Typography

### Available Tokens

| Prop | CSS Property                             | Theme Field   |
| ---- | ---------------------------------------- | ------------- |
| `fs` | `font-size`                              | `fontSizes`   |
| `fw` | `font-variation-settings`, `font-weight` | `fontWeights` |
| `lh` | `line-height`                            | `lineHeights` |
| `ta` | `text-align`                             | none          |

### Values

#### Font size

| Token Value | Returned Value |
| ----------- | -------------- |
| 0           | `0.75rem`      |
| 1           | `0.875rem`     |
| 2           | `1rem`         |
| 3           | `1.125rem`     |
| 4           | `1.25rem`      |

#### Font Weights

| Token Value | Returned Value                                             |
| ----------- | ---------------------------------------------------------- |
| `light`     | `fontVariationSettings`: `'wght' 80`, `fontWeight`: `300`  |
| `regular`   | `fontVariationSettings`: `'wght' 92`, `fontWeight`: `400`  |
| `medium`    | `fontVariationSettings`: `'wght' 100`, `fontWeight`: `500` |
| `bold`      | `fontVariationSettings`: `'wght' 108`, `fontWeight`: `600` |

#### Line Height

| Token Value | Returned Value |
| ----------- | -------------- |
| `small`     | `1.125em`      |
| `body`      | `1.125em`      |
| `highlight` | `1.125em`      |
| `action`    | `1.5em`        |
| `subtitle`  | `1.5em`        |
| `headline`  | `1.5em`        |

## Color

### Available Tokens

| Prop     | CSS Property          | Theme Field |
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

| CSS Properties |
| -------------- |
| `transparent`  |
| `inherit`      |
| `initial`      |
| `auto`         |
| `invert`       |
| `none`         |

### Values

| Token Value        | Returned Value | Color Preview               |
| ------------------ | -------------- | --------------------------- |
| `text`             | #323845        | <colorblock bg="#323845" /> |
| `background`       | #FFFFFF        | <colorblock bg="#FFFFFF" /> |
| `focus`            | #8DB6FA        | <colorblock bg="#8DB6FA" /> |
| `emphasis`         | #F71963        | <colorblock bg="#F71963" /> |
| `muted.0`          | #707685        | <colorblock bg="#707685" /> |
| `muted.1`          | #898F9E        | <colorblock bg="#898F9E" /> |
| `muted.2`          | #C4C5CA        | <colorblock bg="#C4C5CA" /> |
| `muted.3`          | #E0E2E7        | <colorblock bg="#E0E2E7" /> |
| `muted.4`          | #F4F6FB        | <colorblock bg="#F4F6FB" /> |
| `primary.base`     | #2953B2        | <colorblock bg="#2953B2" /> |
| `primary.hover`    | #1E4397        | <colorblock bg="#1E4397" /> |
| `primary.active`   | #3F6FDB        | <colorblock bg="#3F6FDB" /> |
| `primary.contrast` | #FFFFFF        | <colorblock bg="#FFFFFF" /> |
| `primary.washed.0` | #DAE3F5        | <colorblock bg="#DAE3F5" /> |
| `primary.washed.1` | #E8F1FF        | <colorblock bg="#E8F1FF" /> |
| `primary.washed.2` | #DBE9FF        | <colorblock bg="#DBE9FF" /> |
| `danger.base`      | #CE454F        | <colorblock bg="#CE454F" /> |
| `danger.hover`     | #A70C0C        | <colorblock bg="#A70C0C" /> |
| `danger.active`    | #DE0404        | <colorblock bg="#DE0404" /> |
| `danger.contrast`  | #FFFFFF        | <colorblock bg="#FFFFFF" /> |
| `danger.washed.0`  | #FEE3E3        | <colorblock bg="#FEE3E3" /> |
| `danger.washed.1`  | #FFE3E3        | <colorblock bg="#FFE3E3" /> |
| `danger.washed.2`  | #FFD0D0        | <colorblock bg="#FFD0D0" /> |
| `success.base`     | #368369        | <colorblock bg="#368369" /> |
| `success.hover`    | #005C31        | <colorblock bg="#005C31" /> |
| `success.active`   | #26AE6E        | <colorblock bg="#26AE6E" /> |
| `success.contrast` | #FFFFFF        | <colorblock bg="#FFFFFF" /> |
| `success.washed.0` | #E2F5EA        | <colorblock bg="#E2F5EA" /> |
| `warning.base`     | #FFBA52        | <colorblock bg="#FFBA52" /> |
| `warning.hover`    | #E6A30A        | <colorblock bg="#E6A30A" /> |
| `warning.active`   | #EFA906        | <colorblock bg="#EFA906" /> |
| `warning.contrast` | #FFFFFF        | <colorblock bg="#FFFFFF" /> |
| `warning.washed.0` | #FDE6C0        | <colorblock bg="#FDE6C0" /> |
| `basic.blue`       | #DAE3F5        | <colorblock bg="#DAE3F5" /> |
| `basic.red`        | #FEE3E3        | <colorblock bg="#FEE3E3" /> |
| `basic.yellow`     | #FDE6C0        | <colorblock bg="#FDE6C0" /> |
| `basic.green`      | #E2F5EA        | <colorblock bg="#E2F5EA" /> |
| `basic.black`      | #323845        | <colorblock bg="#323845" /> |
| `basic.purple`     | #F4EFFF        | <colorblock bg="#F4EFFF" /> |

## Flex

### Available Tokens

| Prop        | CSS Property      | Theme Field | Values                                       |
| ----------- | ----------------- | ----------- | -------------------------------------------- |
| `items`     | `align-items`     | none        | start, end, center, baseline, stretch, auto  |
| `justify`   | `justify-content` | none        | start, end, center, between, around, evenly  |
| `wrap`      | `flex-wrap`       | none        | wrap, reverse, nowrap                        |
| `direction` | `flex-direction`  | none        | row, rowReverse, col, colReverse             |
| `self`      | `align-self`      | none        | start, end, center, baseline, stretch, auto  |
| `content`   | `align-content`   | none        | start, end, center, between, around, stretch |
| `grow`      | `flex-grow`       | none        | number                                       |
| `shrink`    | `flex-shrink`     | none        | number                                       |
| `order`     | `order`           | none        | number                                       |

## Layout

### Available Tokens

| Prop            | CSS Property     | Theme Field |
| --------------- | ---------------- | ----------- |
| `w`             | `width`          | `sizes`     |
| `h`             | `height`         | `sizes`     |
| `minW`          | `min-width`      | `sizes`     |
| `maxW`          | `max-width`      | `sizes`     |
| `minH`          | `min-height`     | `sizes`     |
| `maxH`          | `max-height`     | `sizes`     |
| `display`       | `display`        | none        |
| `verticalAlign` | `vertical-align` | none        |
| `overflow`      | `overflow`       | none        |
| `overflowX`     | `overflowX`      | none        |
| `overflowY`     | `overflowY`      | none        |

### Values

This token accept a string of type `Sizes` or a number.

### Number

| Token Value | Returned Value |
| ----------- | -------------- |
| `number`    | `${number}px`  |

### Sizes

| Token Value    | Returned Value |
| -------------- | -------------- |
| `sm`           | `20rem`        |
| `md`           | `48rem`        |
| `lg`           | `56rem`        |
| `xl`           | `64rem`        |
| `1/2`          | `50%`          |
| `1/4`          | `25%`          |
| `2/4`          | `50%`          |
| `3/4`          | `75%`          |
| `1/8`          | `12.5%`        |
| `2/8`          | `25%`          |
| `3/8`          | `37.5%`        |
| `4/8`          | `50%`          |
| `5/8`          | `62.5%`        |
| `6/8`          | `75%`          |
| `7/8`          | `87.5%`        |
| `1/12`         | `8.333333%`    |
| `2/12`         | `16.666667%`   |
| `3/12`         | `25%`          |
| `4/12`         | `33.333333%`   |
| `5/12`         | `41.666667%`   |
| `6/12`         | `50%`          |
| `7/12`         | `58.333333%`   |
| `8/12`         | `66.666667%`   |
| `9/12`         | `75%`          |
| `10/12`        | `83.333333%`   |
| `11/12`        | `91.666667%`   |
| `full`         | `100%`         |
| `screenHeight` | `100vh`        |
| `screenWidth`  | `100vw`        |

## Border

### Available Tokens

| Prop  | CSS Property          | Theme Field    |
| ----- | --------------------- | -------------- |
| `bw`  | `border-width`        | `borderWidths` |
| `btw` | `border-top-width`    | `borderWidths` |
| `bbw` | `border-bottom-width` | `borderWidths` |
| `brw` | `border-right-width`  | `borderWidths` |
| `blw` | `border-left-width`   | `borderWidths` |
| `br`  | `border-radius`       | `borderRadius` |
| `bs`  | `border-style`        | none           |
| `bts` | `border-top-style`    | none           |
| `bbs` | `border-bottom-style` | none           |
| `brs` | `border-right-style`  | none           |
| `bls` | `border-left-style`   | none           |

### Values

| Token Value | Returned Value |
| ----------- | -------------- |
| 0           | `0rem`         |
| 1           | `0.0625rem`    |
| 2           | `0.125rem`     |
| 3           | `0.25rem`      |

## Position

| Prop       | CSS Property | Theme Field |
| ---------- | ------------ | ----------- |
| `position` | `position`   | none        |
| `z`        | `z-index`    | `zIndexes`  |
| `top`      | `top`        | `space`     |
| `right`    | `right`      | `space`     |
| `bottom`   | `bottom`     | `space`     |
| `left`     | `left`       | `space`     |

## Space

### Available Tokens

| Prop | CSS Property                       | Theme Field |
| ---- | ---------------------------------- | ----------- |
| `m`  | `margin`                           | `space`     |
| `mt` | `margin-top`                       | `space`     |
| `mr` | `margin-right`                     | `space`     |
| `mb` | `margin-bottom`                    | `space`     |
| `ml` | `margin-left`                      | `space`     |
| `mx` | `margin-left` and `margin-right`   | `space`     |
| `my` | `margin-top` and `margin-bottom`   | `space`     |
| `p`  | `padding`                          | `space`     |
| `pt` | `padding-top`                      | `space`     |
| `pr` | `padding-right`                    | `space`     |
| `pb` | `padding-bottom`                   | `space`     |
| `pl` | `padding-left`                     | `space`     |
| `px` | `padding-left` and `padding-right` | `space`     |
| `py` | `padding-top` and `padding-bottom` | `space`     |

### Values

| Token Value | Returned Value |
| ----------- | -------------- |
| '0'         | `0rem`         |
| '1'         | `0.25rem`      |
| '2'         | `0.5rem`       |
| '3'         | `0.75rem`      |
| '4'         | `1rem`         |
| '5'         | `1.25rem`      |
| '6'         | `1.5rem`       |
| '7'         | `1.75rem`      |
| '8'         | `2rem`         |
| 'px'        | `0.0625rem`    |
| '2px'       | `0.125rem`     |

## Grid

### Available Tokens

| Prop                  | CSS Property            | Theme Field |
| --------------------- | ----------------------- | ----------- |
| `gridGap`             | `grid-gap`              | `space`     |
| `gridRowGap`          | `grid-row-gap`          | `space`     |
| `gridColumnGap`       | `grid-column-gap`       | `space`     |
| `gridColumn`          | `grid-column`           | none        |
| `gridRow`             | `grid-row`              | none        |
| `gridArea`            | `grid-area`             | none        |
| `gridAutoFlow`        | `grid-auto-flow`        | none        |
| `gridAutoRows`        | `grid-auto-rows`        | none        |
| `gridAutoColumns`     | `grid-auto-columns`     | none        |
| `gridTemplateRows`    | `grid-template-rows`    | none        |
| `gridTemplateColumns` | `grid-template-columns` | none        |
| `gridTemplateAreas`   | `grid-template-areas`   | none        |
