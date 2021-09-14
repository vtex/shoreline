---
path: /layouts/columns/
---

# Columns

Our design system comes with a set of layout components to help you build common layouts inside your application. `Columns` implement a 12 column flexbox based responsive column system. By default, each `<Column>` will have an equal width and you can have up to 12 columns. Check out our [Introduction](/layouts/introduction) page, to see Do's and Don'ts about Layout components.

To create a basic columned layout, add a `<Columns>` component and then add your `<Column>`.

## Behavior

```jsx
<Columns spacing={1}>
  <Column>
    <Box csx={{ bg: 'blue.secondary', padding: 2 }}>6 units</Box>
  </Column>
  <Column>
    <Box csx={{ bg: 'blue.secondary.hover', padding: 2 }}>6 units</Box>
  </Column>
  <Column>
    <Box csx={{ bg: 'blue.secondary', padding: 2 }}>6 units</Box>
  </Column>
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
  <Column>
    <Box csx={{ bg: 'blue.secondary', padding: 2 }}>6 units</Box>
  </Column>
  <Column>
    <Box csx={{ bg: 'blue.secondary.hover', padding: 2 }}>6 units</Box>
  </Column>
  <Column>
    <Box csx={{ bg: 'blue.secondary', padding: 2 }}>6 units</Box>
  </Column>
</Columns>
```

### AutoGapless

```jsx
<Columns spacing={0}>
  <Column>
    <Box csx={{ bg: 'blue.secondary', padding: 2 }}>6 units</Box>
  </Column>
  <Column>
    <Box csx={{ bg: 'blue.secondary.hover', padding: 2 }}>6 units</Box>
  </Column>
  <Column>
    <Box csx={{ bg: 'blue.secondary', padding: 2 }}>6 units</Box>
  </Column>
</Columns>
```

### Units

```jsx
<Columns spacing={1}>
  <Column units={3}>
    <Box csx={{ bg: 'blue.secondary', padding: 2 }}>3 units</Box>
  </Column>
  <Column units={6}>
    <Box csx={{ bg: 'blue.secondary.hover', padding: 2 }}>6 units</Box>
  </Column>
  <Column units={3}>
    <Box csx={{ bg: 'blue.secondary', padding: 2 }}>3 units</Box>
  </Column>
</Columns>
```

### Responsive Units

`spacing`, `units`, and `offset` are [`ResponsiveValues`](/docs/guide/responsive-design/#responsive-values)

```jsx
<Columns spacing={1}>
  <Column units={6} offset={['right', 'right', 'none']}>
    <Box csx={{ bg: 'blue.secondary', padding: 2 }}>6 units</Box>
  </Column>
  <Column units={3}>
    <Box csx={{ bg: 'blue.secondary.hover', padding: 2 }}>3 units</Box>
  </Column>
</Columns>
```

## Customization

You can use the csx property to handle different styles in both `Columns`, and `Column`.

```jsx
<Columns spacing={1} csx={{ bg: 'mid.tertiary' }}>
  <Column units={6} offset="right">
    <Box csx={{ bg: 'blue.secondary', padding: 2 }}>6 units</Box>
  </Column>
  <Column units={3}>
    <Box csx={{ bg: 'blue.secondary.hover', padding: 2 }}>3 units</Box>
  </Column>
</Columns>
```

## Limitations

This component uses a flexbox under the hood. Knowing that it has the same limitations.

## Props

<propdetails heading="Columns" component="Columns">
</propdetails>

<propdetails heading="Column" component="ColumnsItem">
</propdetails>
