---
path: /table/column/
---

# Column

## Column API

| Attribute | Type                                | Description                                                                                                                                                                                        | Required                                                                                               |
| --------- | ----------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------ | --- |
| id        | `string`                            | String that defines the property name that the column represents.                                                                                                                                  | ✅                                                                                                     |
| header    | `((column: Column<T>) => ReactNode) | string`                                                                                                                                                                                            | Controls the title which appears on the table Header.<br>It can receive either a string or an element. | 🚫  |
| acessor   | `((item: T) => ReactNode)           | string`                                                                                                                                                                                            | Defines how to access a property                                                                       | 🚫  |
| resolver  | `R`                                 | [Resolvers](/docs/components/table/#resolvers-api) api<br>Will select the [plain resolver](/docs/components/table/#plain) by default                                                               | 🚫                                                                                                     |
| width     | `number`                            | Defines a fixed width for the specific column.<br>Receives either a string or number.<br>By default, the column's width is defined to fit the available space without breaking the content.        | 🚫                                                                                                     |
| sortable  | `(a: T, b: T) => number`            | Defines if that column is sortable or not, passing true to this prop won't sort items by itself, the sorting will still need to be handled using the sort prop inside the StatefulTable sort prop. | 🚫                                                                                                     |
| compare   | `boolean`                           | The function provided to handle the sorting of this column of the table, if this function is provided the table items will be sorted based on this function result.                                | 🚫                                                                                                     |

## Sortable

It's possible to pass compare functions to the sortable property in the column object and that function will be used to sort the items of the table when the header of that column is clicked.

```jsx
function Example() {
  const state = useTableState({
    length: 5,
    columns: [
      {
        id: 'productName',
        header: 'Product Name',
        compare: (a, b) => b.productName.localeCompare(a.productName),
      },
      {
        id: 'inStock',
        header: 'In Stock',
        compare: (a, b) => b.inStock - a.inStock,
      },
      {
        id: 'price',
        header: 'Price',
        compare: (a, b) => b.price - a.price,
      },
    ],
    items: [
      {
        id: 1,
        productName: 'Orange',
        inStock: 180,
        price: 130,
      },
      {
        id: 2,
        productName: 'Lemon',
        inStock: 320,
        price: 320,
      },
      {
        id: 3,
        productName: 'Tomato',
        inStock: 383,
        price: 123,
      },
      {
        id: 4,
        productName: 'Grape',
        inStock: 480,
        price: 340,
      },
      {
        id: 5,
        productName: 'Apple',
        inStock: 350,
        price: 220,
      },
      {
        id: 6,
        productName: 'Banana',
        inStock: 360,
        price: 520,
      },
      {
        id: 7,
        productName: 'Mango',
        inStock: 387,
        price: 823,
      },
    ],
  })

  return <StatefulTable state={state} />
}
```

## Resolvers API

The column object has an optional property that allows you to provide a resolver object that will handle the rendering of the cells and header of that column, the resolver object receives a type, an optional render function, and depending on the type, other props might be necessary. If you don't provide the render function we have a default render function that we'll be used.

### Plain

```jsx
function Example() {
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

  const state = useTableState({
    columns: [
      {
        id: 'product-name',
        header: 'ProductName',
        acessor: 'productName',
      },
      {
        id: 'inStock',
        header: 'In Stock',
        resolver: {
          type: 'plain',
        },
      },
      {
        id: 'skus',
        header: 'SKUs',
        resolver: {
          type: 'plain',
          render: function Render({ data }) {
            return (
              <Text
                variant="highlight"
                csx={{
                  color: Number(data) > 0 ? 'blue' : 'red',
                }}
              >
                {data}
              </Text>
            )
          },
        },
      },
      {
        id: 'price',
        header: 'Price',
      },
    ],
    items: fruits,
  })

  return <StatefulTable state={state} />
}
```

### Currency

```jsx
function Example() {
  const currencies = [
    {
      id: 1,
      brl: 120,
      usd: 24,
      cny: 100,
    },
  ]

  const state = useTableState({
    columns: [
      {
        id: 'brl',
        header: 'Preço',
        resolver: {
          type: 'currency',
          locale: 'pt-BR',
          currency: 'BRL',
        },
      },
      {
        id: 'usd',
        header: 'Price',
        resolver: {
          type: 'currency',
          locale: 'en-US',
          currency: 'USD',
        },
      },
      {
        id: 'cny',
        header: '价格',
        resolver: {
          type: 'currency',
          locale: 'zh-CN',
          currency: 'CNY',
        },
      },
    ],
    items: currencies,
  })

  return <StatefulTable state={state} />
}
```

### Date

```jsx
function Example() {
  const dates = [
    {
      id: 1,
      pt: '5/7/2020, 13:04',
      ar: '5/7/2020, 13:04',
      en: '5/7/2020, 13:04',
      cn: '5/7/2020, 13:04',
    },
  ]

  const state = useTableState({
    columns: [
      {
        id: 'pt',
        header: 'Data',
        resolver: {
          type: 'date',
          locale: 'pt-BR',
          options: {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
          },
        },
      },
      {
        id: 'ar',
        header: 'تاريخ',
        resolver: {
          type: 'date',
          locale: 'ar-AE',
          options: {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
          },
        },
      },
      {
        id: 'en',
        header: 'Date',
        resolver: {
          type: 'date',
          locale: 'en-US',
          options: {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
          },
        },
      },
      {
        id: 'cn',
        header: '日期',
        resolver: {
          type: 'date',
          locale: 'zh-CN',
          options: {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
          },
        },
      },
    ],
    items: dates,
  })

  return <StatefulTable state={state} />
}
```

### Image

| Prop    | Type                      | Description                    | Required | Default |
| ------- | ------------------------- | ------------------------------ | -------- | ------- |
| display | boolean                   | if should preview on hover     | 🚫       | true    |
| size    | `small, regular or large` | size of the preview            | 🚫       | regular |
| delay   | number                    | delay of preview display in ms | 🚫       | 0       |

```jsx
function Example() {
  const fruits = [
    {
      id: 1,
      image:
        'https://images.unsplash.com/photo-1587735243615-c03f25aaff15?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1600&q=80',
      productName: 'Orange',
      stock: 26900,
      price: 120,
    },
    {
      id: 2,
      image:
        'https://images.unsplash.com/flagged/photo-1587302164675-820fe61bbd55?ixlib=rb-1.2.1&auto=format&fit=crop&w=1600&q=80',
      productName: 'Lemon',
      stock: 12905,
      price: 120,
    },
    {
      id: 3,
      image:
        'https://images.unsplash.com/photo-1587486938113-d6d38d424efa?ixlib=rb-1.2.1&auto=format&fit=crop&w=1600&q=80',
      productName: 'Tomato',
      stock: 199001,
      price: 120,
    },
  ]

  const state = useTableState({
    dir: 'ltr',
    columns: [
      {
        id: 'image',
        header: 'Image',
        resolver: {
          type: 'image',
          preview: {
            display: true,
            size: 'regular',
            delay: 0,
          },
        },
      },
      {
        id: 'productName',
        header: 'Name',
      },
      {
        id: 'stock',
        header: 'Stock',
      },
      {
        id: 'price',
        header: 'Stock',
        resolver: {
          type: 'currency',
          locale: 'en-US',
          currency: 'USD',
        },
      },
    ],
    items: fruits,
  })

  return <StatefulTable state={state} />
}
```

### Root

```jsx
function Example() {
  const state = useTableState({
    columns: [
      {
        id: 'image',
        header: 'Image',
        resolver: {
          type: 'image',
        },
      },
      {
        id: 'description',
        header: 'Description',
        resolver: {
          type: 'root',
          render: function Description({ item, context }) {
            if (context.loading) {
              return <Skeleton csx={{ height: 24 }} />
            }

            return (
              <Set orientation="vertical">
                <Text variant="highlight">{item.productName}</Text>
                <Text>{item.category}</Text>
              </Set>
            )
          },
        },
      },
      {
        id: 'inStock',
        header: 'In Stock',
      },
    ],
    items: [
      {
        id: 1,
        image:
          'https://images.unsplash.com/photo-1587735243615-c03f25aaff15?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1600&q=80',
        productName: 'Orange',
        category: 'fruit',
        inStock: 380,
      },
      {
        id: 2,
        image:
          'https://images.unsplash.com/flagged/photo-1587302164675-820fe61bbd55?ixlib=rb-1.2.1&auto=format&fit=crop&w=1600&q=80',
        productName: 'Lemon',
        category: 'fruit',
        inStock: 380,
      },
    ],
  })

  return <StatefulTable state={state} />
}
```
