---
path: /grid/
---

# Grid

Grid is a [Box](/box/) with `display: grid` and it comes with helpful styles shorthand.

## Import

```jsx isStatic
import { Grid, GridItem } from '@vtex/admin-ui'
```

## Behavior

```jsx
<Grid
  templateAreas={[
    'item-1 item-2 item-3',
    'item-4 item-5 item-6',
    'item-7 item-8 item-9',
  ]}
  templateColumns="repeat(3, 1fr)"
  templateRows="repeat(3, 1fr)"
  gap="6"
  csx={{
    height: 400,
    div: { bg: 'blue', borderRadius: 'default' },
  }}
>
  <GridItem area="item-1" />
  <GridItem area="item-2" />
  <GridItem area="item-3" />
  <GridItem area="item-4" />
  <GridItem area="item-5" />
  <GridItem area="item-6" />
  <GridItem area="item-7" />
  <GridItem area="item-8" />
  <GridItem area="item-9" />
</Grid>
```

## Composition

| Name       | Description                                                                   | Props           |
| ---------- | ----------------------------------------------------------------------------- | --------------- |
| `Grid`     | The main wrapper with `display: grid` and helpful styles shorthand            | `GridProps`     |
| `GridItem` | Used as a child of `Grid` to control the `gridArea` position whithin the grid | `GridItemProps` |

## Features

### Template Areas

Example of using grid template areas and applying a gap or space between the items.

```jsx
<Grid
  templateAreas={['yellow blue-1 blue-2', 'yellow red red']}
  templateColumns="1fr 2fr 2fr"
  templateRows="1fr 2fr"
  gap="4"
  csx={{ height: 400, div: { borderRadius: 'default' } }}
>
  <GridItem area="yellow" csx={{ bg: 'yellow.secondary' }} />
  <GridItem area="blue-1" csx={{ bg: 'blue.secondary' }} />
  <GridItem area="blue-2" csx={{ bg: 'blue.secondary' }} />
  <GridItem area="red" csx={{ bg: 'red.secondary' }} />
</Grid>
```

### Template Columns

Example of using grid template columns and applying a gap or space between the columns.

```jsx
<Grid
  templateColumns="repeat(4, 1fr)"
  columnGap="4"
  csx={{ height: 100, div: { borderRadius: 'default' } }}
>
  <Box csx={{ bg: 'blue.secondary' }} />
  <Box csx={{ bg: 'green.secondary' }} />
  <Box csx={{ bg: 'yellow.secondary' }} />
  <Box csx={{ bg: 'red.secondary' }} />
</Grid>
```

### Template Rows

Example of using grid template rows and applying a gap or space between the rows.

```jsx
<Grid
  templateRows="repeat(4, 1fr)"
  rowGap="4"
  csx={{ height: 400, width: 300, div: { borderRadius: 'default' } }}
>
  <Box csx={{ bg: 'blue.secondary' }} />
  <Box csx={{ bg: 'green.secondary' }} />
  <Box csx={{ bg: 'yellow.secondary' }} />
  <Box csx={{ bg: 'red.secondary' }} />
</Grid>
```

## Props

### Grid

All props of `as`, which is `div` by default. And also, the props that has the same type of grid styles:

| Name              | Shorthand for         |
| ----------------- | --------------------- |
| `gap`             | `gridGap`             |
| `rowGap`          | `gridRowGap`          |
| `columnGap`       | `gridColumnGap`       |
| `templateAreas`   | `gridTemplateAreas`   |
| `templateRows`    | `gridTemplateRows`    |
| `templateColumns` | `gridTemplateColumns` |

## GridItem

All props of `as`, which is `div` by default. And also, the props that has the same type of grid styles:

| Name   | Shorthand for |
| ------ | ------------- |
| `area` | `gridArea`    |
