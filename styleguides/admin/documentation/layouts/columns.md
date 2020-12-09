---
path: /layouts/columns/
---

# Columns

Our design system comes with a set of layout components to help you build common layouts inside your application. `Columns` implement a 12 column flexbox based responsive column system. By default, each `<Columns.Item>` will have an equal width and you can have up to 12 columns. Check out our [Introduction](/layouts/introduction) page, to see Do's and Don'ts about Layout components.

To create a basic columned layout, add a `<Columns>` component and then add your `<Columns.Item>`.

## Behavior

```jsx
<Columns spacing={1}>
  <Columns.Item>
    <Box styles={{ bg: 'secondary.base', padding: 2 }}>6 units</Box>
  </Columns.Item>
  <Columns.Item>
    <Box styles={{ bg: 'secondary.hover', padding: 2 }}>6 units</Box>
  </Columns.Item>
  <Columns.Item>
    <Box styles={{ bg: 'secondary.base', padding: 2 }}>6 units</Box>
  </Columns.Item>
</Columns>
```

## Installation

```sh isStatic
yarn add @vtex/admin-ui
```

## Variation

### Auto

```jsx
<Columns spacing={1}>
  <Columns.Item>
    <Box styles={{ bg: 'secondary.base', padding: 2 }}>6 units</Box>
  </Columns.Item>
  <Columns.Item>
    <Box styles={{ bg: 'secondary.hover', padding: 2 }}>6 units</Box>
  </Columns.Item>
  <Columns.Item>
    <Box styles={{ bg: 'secondary.base', padding: 2 }}>6 units</Box>
  </Columns.Item>
</Columns>
```

### AutoGapless

```jsx
<Columns spacing={0}>
  <Columns.Item>
    <Box styles={{ bg: 'secondary.base', padding: 2 }}>6 units</Box>
  </Columns.Item>
  <Columns.Item>
    <Box styles={{ bg: 'secondary.hover', padding: 2 }}>6 units</Box>
  </Columns.Item>
  <Columns.Item>
    <Box styles={{ bg: 'secondary.base', padding: 2 }}>6 units</Box>
  </Columns.Item>
</Columns>
```

### Units

```jsx
<Columns spacing={1}>
  <Columns.Item units={3}>
    <Box styles={{ bg: 'secondary.base', padding: 2 }}>3 units</Box>
  </Columns.Item>
  <Columns.Item units={6}>
    <Box styles={{ bg: 'secondary.hover', padding: 2 }}>6 units</Box>
  </Columns.Item>
  <Columns.Item units={3}>
    <Box styles={{ bg: 'secondary.base', padding: 2 }}>3 units</Box>
  </Columns.Item>
</Columns>
```

### Responsive Units

`spacing`, `units`, and `offset` are [`ResponsiveValues`](/docs/guide/responsive-design/#responsive-values)

```jsx
<Columns spacing={1}>
  <Columns.Item units={6} offset={['right', 'right', 'none']}>
    <Box styles={{ bg: 'secondary.base', padding: 2 }}>6 units</Box>
  </Columns.Item>
  <Columns.Item units={3}>
    <Box styles={{ bg: 'secondary.hover', padding: 2 }}>3 units</Box>
  </Columns.Item>
</Columns>
```

## Customization

You can use the styleOverrides property to handle different styles in both `Columns`, and `Columns.Item`.

```jsx
<Columns spacing={1} styleOverrides={{ bg: 'muted.2' }}>
  <Columns.Item units={6} offset="right">
    <Box styles={{ bg: 'secondary.base', padding: 2 }}>6 units</Box>
  </Columns.Item>
  <Columns.Item units={3}>
    <Box styles={{ bg: 'secondary.hover', padding: 2 }}>3 units</Box>
  </Columns.Item>
</Columns>
```

## Limitations

This component uses a flexbox under the hood. Knowing that it has the same limitations.

## Props

<propdetails heading="Columns" component="Columns">
</propdetails>

<propdetails heading="Columns.Item" component="ColumnsItem">
</propdetails>
