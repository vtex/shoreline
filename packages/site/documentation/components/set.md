---
title: Set
path: /set/
---

# Set

Our design system comes with a set of layout components to help you build common layouts inside your application. `Set` represents a set of components, that automatically space out the components.

## Behavior

A `<Set>` can be used to list a set of components. It will automatically space out the components, and wrap them when they reach the width of the viewport.

```jsx
<Set>
  <Button>Button 1</Button>
  <Button>Button 2</Button>
  <Button>Button 3</Button>
  <Button>Button 4</Button>
  <Button>Button 5</Button>
</Set>
```

## Import

```sh isStatic
import { Set } from '@vtex/admin-ui'
```

## Variation

### Spacing

The spacing between components can be controlled using the `spacing` property.

> 💡 Spacing consumes the 'space' values from the theme.

```jsx
<Set spacing={5}>
  <Button>Button 1</Button>
  <Button>Button 2</Button>
  <Button>Button 3</Button>
  <Button>Button 4</Button>
  <Button>Button 5</Button>
</Set>
```

### Orientation

Orientation can be either `vertical` or `horizontal` (default). It can be controlled with the `orientation` property.

```jsx
<Set orientation="vertical">
  <Button>Button 1</Button>
  <Button>Button 2</Button>
  <Button>Button 3</Button>
  <Button>Button 4</Button>
  <Button>Button 5</Button>
</Set>
```

### Fluid

While on `vertical` orientation, you can alternatively the `fluid` property. This will make the inner children, match the container width.

```jsx
<Box csx={{ maxWidth: 320 }}>
  <Set orientation="vertical" fluid>
    <Button>Button 1</Button>
    <Button>Button 2</Button>
    <Button>Button 3</Button>
    <Button>Button 4</Button>
    <Button>Button 5</Button>
  </Set>
</Box>
```

### Align

You can set items alignment (`start` [default], `end`) through the `align` prop.

```jsx
<Set align="end">
  <Button>Button 1</Button>
  <Button>Button 2</Button>
  <Button>Button 3</Button>
  <Button>Button 4</Button>
  <Button>Button 5</Button>
</Set>
```

### Responsive Design

`orientation`, `spacing` and `align` are [`ResponsiveValues`](/docs/guide/responsive-design/#responsive-values). It means that you can pass an array to them.

```jsx
<Box csx={{ maxWidth: ['full', 'full', 560] }}>
  <Set orientation={['vertical', 'vertical', 'horizontal']} fluid>
    <Button>Button 1</Button>
    <Button>Button 2</Button>
    <Button>Button 3</Button>
    <Button>Button 4</Button>
    <Button>Button 5</Button>
  </Set>
</Box>
```

## Customization

You can use the `csx` property to handle different styles.

```jsx
<Set
  csx={{
    bg: 'muted',
    borderRadius: 'default',
    padding: 4,
  }}
>
  <Button>Button 1</Button>
  <Button>Button 2</Button>
  <Button>Button 3</Button>
  <Button>Button 4</Button>
  <Button>Button 5</Button>
</Set>
```

# Props

All props of `div` jsx element.

| Name          | Type                        | Description                                              | Required             | Default |
| ------------- | --------------------------- | -------------------------------------------------------- | -------------------- | ------- | ------------ |
| `orientation` | `ResponsiveValue<'vertical' | 'horizontal'>`                                           | orientation of items | 🚫      | `'vertical'` |
| `fluid`       | `boolean`                   | If the items should grow in width to match the container | 🚫                   | `false` |
| `spacing`     | `ResponsiveValue<number>`   | Space between items                                      | 🚫                   | `0`     |
| `align`       | `ResponsiveValue<'start'    | 'end'>`                                                  | Items alignment      | 🚫      | `start`      |
| `csx`         | `StyleProp`                 | Defines component styles                                 | 🚫                   | `{}`    |
