---
path: /layouts/set/
---

# Set

Our design system comes with a set of layout components to help you build common layouts inside your application. `Set` represents a set of components, that automatically space out the components. Check out our [Introduction](/layouts/introduction) page, to see Do's and Don'ts about Layout components.

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

## Installation

```sh isStatic
yarn add @vtex/admin-ui
---
npm install @vtex/admin-ui
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
    bg: 'light.secondary',
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

## Limitations

This component uses a flexbox under the hood. Knowing that it has the same limitations.

# Props

<proptypes component="Set" />
