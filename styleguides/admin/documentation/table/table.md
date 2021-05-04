---
path: /table/basic/
---

# Table

Tables display information in rows of data. It's a good component to display data sets.

## Behavior

The Table is a compound component that contains a component to every HTML element related to the `<table>`, which are `Head`, `Body`, `Row` and `Cell`. But you can also use the table's variations, like for example the StatefulTable component which provide a simpler API that allows you to provide only the array of columns and the data set.

## Installation

```sh isStatic
yarn add @vtex/admin-ui
```

```jsx isStatic
import { Table } from '@vtex/admin-ui'
```

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

## Code example

### Density

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

- Checkboxes resolvers

## Props

| Name         | Type                          | Description                                                                 | Required | Default                              |
| ------------ | ----------------------------- | --------------------------------------------------------------------------- | -------- | ------------------------------------ |
| columns      | `Column<T>[]`                 | Table column spec                                                           | ✅       | -                                    |
| context      | `ResolverContext`             | Resolver context                                                            | 🚫       | -                                    |
| resolvers    | `Record<string, Resolver<T>>` | Table field resolvers                                                       | 🚫       | Table's default resolvers            |
| items        | `T[]`                         | Table items                                                                 | 🚫       | `[]`                                 |
| length       | `number`                      | Expected items length                                                       | 🚫       | `5`                                  |
| sort         | `UseTableSortParams<T>`       | useTableSort hook params                                                    | 🚫       | -                                    |
| css          | `any`                         | Emotion css prop                                                            | 🚫       | -                                    |
| csx          | `StyleProp`                   | Define component styles                                                     | 🚫       | {}                                   |
| getRowKey    | `(item: T) => string`         | Key extractor                                                               | 🚫       | Table's default key extractor        |
| loading      | `boolean`                     | Whether the table is loading or not                                         | 🚫       | `false`                              |
| empty        | `boolean`                     | Displays table empty state when there're no items in the collection         | 🚫       | `false`                              |
| itemsNotFoun | `boolean`                     | Displays table state when there're no items found in search                 | 🚫       | `false`                              |
| error        | `boolean`                     | Displays table error state                                                  | 🚫       | `false`                              |
| density      | `TableDensity`                | Table row height                                                            | 🚫       | `regular`                            |
| onRowClick   | `(item: T) => void`           | Action to dispatch on a row click                                           | 🚫       | -                                    |
| dir          | `TableDir`                    | HTML Dir                                                                    | 🚫       | ltr                                  |
| children     | `ReactNode`                   | Element that will be displayed on top of the table                          | 🚫       | -                                    |
| views        | `TableViewsType`              | Object with the strings and types of element to display on each table state | 🚫       | Table's default state fallback title |
