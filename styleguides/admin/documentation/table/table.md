---
path: /table/basic/
---

# Table

Tables display information in rows of data. It favors the display of data sets.

## Behavior

The table is a compound component that contains a component for every HTML element related to the `<table>`. HTML elements include `Head`, `Body`, `Row` and `Cell`. It is also possible to use table's variations, like the `StatefulTable` component which provides a simpler API, that requires only the state, you can get the state passing the array of columns and the data set to the `useTableState` hook, and the `StatefulTable` will render the table for you.

## Installation

```sh isStatic
yarn add @vtex/admin-ui
```

```jsx isStatic
import { Table } from '@vtex/admin-ui'
```

## Variations

### StatefulTable

This is the simplest way to use the Table. It handles common table use cases.

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

  const state = useTableState({ columns, items: fruits })

  return <StatefulTable state={state} />
}
```

## Code examples

### Density

The density prop changes the height of the table row. You can set its value to `regular`, `compact`, or `variable`.

```jsx
function Example() {
  const state = useTableState({
    density: 'compact',
    columns: [
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
    ],
    items: [
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
    ],
  })

  return <StatefulTable state={state} />
}
```

### Row click

You can pass a function to the prop onRowClick and that function we'll be called passing the item of that row.

```jsx
function Example() {
  const state = useTableState({
    onRowClick: (item) => alert(item.productName),
    columns: [
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
    ],
    items: [
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
    ],
  })

  return <StatefulTable state={state} />
}
```

### Direction

You can have right to left writing on the table using the dir prop

```jsx
function Example() {
  const state = useTableState({
    dir: 'rtl',
    density: 'variable',
    columns: [
      {
        id: 'location',
        width: 148,
        header: 'موقعك',
        resolver: {
          type: 'plain',
        },
      },
      {
        id: 'date',
        header: 'تاريخ',
        width: 148,
        resolver: {
          type: 'date',
          locale: 'ar-AE',
          options: {
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric',
            day: 'numeric',
            month: 'numeric',
            year: 'numeric',
          },
        },
      },
      {
        id: 'status',
        width: 156,
        header: 'الحالة',
        resolver: {
          type: 'plain',
        },
      },
    ],
    items: [
      {
        id: 1,
        location: 'ساو باولو- اس بي',
        date: '8/7/2020, 23:29',
        status: `تم التوصيل`,
      },
      {
        id: 2,
        location: 'ساو باولو- اس بي',
        date: '6/7/2020, 21:12',
        status: `وصل إلى ساو باولو`,
      },
      {
        id: 3,
        location: 'ساو باولو- اس بي',
        date: '5/7/2020, 13:04',
        status: `في طريقها من ريو دي جانيرو إلى ساو باولو`,
      },
      {
        id: 4,
        location: 'ساو باولو- اس بي',
        date: '4/7/2020, 14:48',
        status: `إرسال الكائن في مكتب البريد`,
      },
    ],
  })

  return <StatefulTable state={state} />
}
```

### Table

Suited for advanced usages such as [Windowing](https://admin-ui.vercel.app/?path=/story/admin-ui-table-deep--windowing) and [Drag n Drop](https://admin-ui.vercel.app/?path=/story/admin-ui-table-deep--dnd). If that's your case, check the storybook stories for more details in how to accomplish this.

```jsx
function Example() {
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

  const items = [
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

  return (
    <Table>
      <Table.Head>
        <Table.Row>
          {columns.map((column) => {
            return (
              <Table.Cell key={column.id} column={column}>
                {column.header}
              </Table.Cell>
            )
          })}
        </Table.Row>
      </Table.Head>
      <Table.Body>
        {items.map((item) => (
          <Table.Row key={item.id}>
            {columns.map((column) => {
              return (
                <Table.Cell key={column.id} column={column}>
                  {item[column.id]}
                </Table.Cell>
              )
            })}
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  )
}
```

## useTableState

Hook that manages the state logic of the Table component.

### Params

| Name          | Type                          | Description                                                         | Required | Default                       |
| ------------- | ----------------------------- | ------------------------------------------------------------------- | -------- | ----------------------------- |
| columns       | `Column<T>[]`                 | Table column spec                                                   | ✅       | -                             |
| context       | `ResolverContext`             | Resolver context                                                    | 🚫       | -                             |
| resolvers     | `Record<string, Resolver<T>>` | Table field resolvers                                               | 🚫       | Table's default resolvers     |
| items         | `T[]`                         | Table items                                                         | 🚫       | `[]`                          |
| length        | `number`                      | Expected items length                                               | 🚫       | `5`                           |
| sort          | `UseTableSortParams<T>`       | useTableSort hook params                                            | 🚫       | -                             |
| getRowKey     | `(item: T) => string`         | Key extractor                                                       | 🚫       | Table's default key extractor |
| loading       | `boolean`                     | Whether the table is loading or not                                 | 🚫       | `false`                       |
| empty         | `boolean`                     | Displays table empty state when there're no items in the collection | 🚫       | `false`                       |
| itemsNotFound | `boolean`                     | Displays table state when there're no items found in search         | 🚫       | `false`                       |
| error         | `boolean`                     | Displays table error state                                          | 🚫       | `false`                       |
| density       | `TableDensity`                | Table row height                                                    | 🚫       | `regular`                     |
| onRowClick    | `(item: T) => void`           | Action to dispatch on a row click                                   | 🚫       | -                             |
| dir           | `TableDir`                    | HTML Dir                                                            | 🚫       | ltr                           |

## Props

| Name     | Type             | Description                                                                 | Required | Default                              |
| -------- | ---------------- | --------------------------------------------------------------------------- | -------- | ------------------------------------ |
| csx      | `StyleProp`      | Define component styles                                                     | 🚫       | {}                                   |
| children | `ReactNode`      | Element that will be displayed on top of the table                          | 🚫       | -                                    |
| views    | `TableViewsType` | Object with the strings and types of element to display on each table state | 🚫       | Table's default state fallback title |
