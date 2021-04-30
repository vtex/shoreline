---
path: /table/basic
---

# Table

## Import

WIP

## Variation

### StatefulTable

This is the simplest way to use the Table. It handles common table use cases for the developer.

```jsx
function Simple() {
  const fruits = [
    {
      id: 1,
      productName: 'Orange',
      inStock: 380,
      skus: 0,
      price: 120,
    },
    {
      id: 2,
      productName: 'Lemon',
      inStock: 380,
      skus: 26,
      price: 120,
    },
    {
      id: 3,
      productName: 'Tomato',
      inStock: 380,
      skus: 26,
      price: 120,
    },
  ]

  const columns = [
    {
      id: 'productName',
      header: 'Product Name',
    },
    {
      id: 'inStock',
      header: 'In Stock',
    },
    {
      id: 'skus',
      header: 'SKUs',
    },
    {
      id: 'price',
      header: 'Price',
    },
  ]

  return <StatefulTable columns={columns} items={fruits} />
}
```

## Density

```jsx
<StatefulTable
  density="regular"
  columns={[
    {
      id: 'location',
      header: 'Location',
      width: 148,
    },
    {
      id: 'date',
      header: 'Date',
      width: 148,
    },
    {
      id: 'status',
      header: 'Status',
      width: 156,
    },
  ]}
  items={[
    {
      id: 1,
      location: 'São Paulo, SP',
      date: '8/7/2020, 23:29',
      status: `Delivered`,
    },
    {
      id: 2,
      location: 'São Paulo, SP',
      date: '6/7/2020, 21:12',
      status: `Arrived at São Paulo`,
    },
    {
      id: 3,
      location: 'São Paulo, SP',
      date: '5/7/2020, 13:04',
      status: `On its way from Rio de Janeiro to São Paulo`,
    },
    {
      id: 4,
      location: 'Itaquaquecetuba, SP',
      date: '4/7/2020, 14:48',
      status: `Object dispatched at the post office`,
    },
  ]}
/>
```

### Table

<blockquote palette="red">

Still TDB. Suited for advanced usages such as Windowing and Drag n Drop. If that's your case, check the storybook stories for more details in how to acomplish it.

</blockquote>

## Limitations

This component is unstable beacause is also missing some (quite crucial) features, such as:

- Empty states
- Checkboxes resolvers

## Props

WIP
