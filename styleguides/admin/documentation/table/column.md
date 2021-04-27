---
path: /table/column
---

# Column

## Column API

### id

Defines the property name that the column represents.
This property is required and must be a string.

### header

Controls the title which appears on the table Header.
It can receive either a string or an element.

### acessor

Defines how to access a property

### resolver

[Resolvers](/docs/components/table/#resolvers-api) api
Will select the [plain resolver](/docs/components/table/#plain) by default

### width

Defines a fixed width for the specific column.
Receives either a string or number.
By default, the column's width is defined to fit the available space without breaking the content.

### sortable

Defines if that column is sortable or not, passing true to this prop won't sort items by itself, the sorting will still need to be handled using the sort prop inside the StatefulTable sort prop.

### compare

Function provided to handle the sorting of this column of the table, if this function is provided the table items will be sorted based on this function results.

## Resolvers API

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

  return (
    <StatefulTable
      columns={[
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
      ]}
      items={fruits}
    />
  )
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

  return (
    <StatefulTable
      columns={[
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
      ]}
      items={currencies}
    />
  )
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

  return (
    <StatefulTable
      columns={[
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
      ]}
      items={dates}
    />
  )
}
```

### Image

| Prop    | Type                      | Description                    | Default |
| ------- | ------------------------- | ------------------------------ | ------- |
| display | boolean                   | if should preview on hover     | true    |
| size    | `small, regular or large` | size of the preview            | regular |
| delay   | number                    | delay of preview display in ms | 0       |

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

  return (
    <StatefulTable
      dir="ltr"
      columns={[
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
      ]}
      items={fruits}
    />
  )
}
```

### Root

```jsx
function Example() {
  return (
    <StatefulTable
      columns={[
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
      ]}
      items={[
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
      ]}
    />
  )
}
```

## Sortable API

The table has the sort prop which recievies an object that have other properties that handles sorting.
If you just want regular sorting just provide a compare function inside of the table columns objects.
This will handle the table sort UI state and not the sorting of the items.

### initialValue

Defines the table initial sorting value. `{ order?: 'ASC' | 'DSC', by?: string }`

### order

Order is related to the sorting order.

### by

By indicates which column is being sorted, this value should be the id of the column.

### directions

Define in which sorting order the table will be sorted.
It accept's an array with `ASC` and `DSC` as possible values.
You can pass an array with two or one sorting direction, if you pass an array with only one sorting direction the table will only sort in one direction.

### reducer

Receives the reducer that will be used inside of the useReducer that handles the sorting state, it's not required and if not provided the default reducer function will be used.
The reducer function is called with the current sort state `{ order?: SortOrder, by?: string }` and the sorting action `{ type: SortOrder | 'RESET', columnId?: string }`.

### callback

Receives a function that will be fired when the user clicks the table header cell of a column.
This function is called with an object containing the current sort state, the dispatch of the current useReducer that handles the sorting state, the column id of the column that was clicked and the current sort directions being used.

```jsx
function Sortable() {
  const items = []

  const columns = [
    {
      header: 'Name',
      sortable: true,
      id: 'name',
    },
    {
      header: 'Age',
      sortable: true,
      id: 'age',
    },
    {
      header: 'Address',
      sortable: true,
      id: 'address',
    },
  ]

  /**
   * Theese are the default reducer, callback, sort directions and initial state that will be used if you do not provide one of them.
   **/
  const initialValue = {
    by: undefined,
    order: undefined,
  }

  function sortReducer(state, action) {
    switch (action.type) {
      case 'ASC':
      case 'DSC': {
        return {
          by: action.columnId,
          order: action.type,
        }
      }
      case 'RESET': {
        return initialValue
      }
      default:
        return state
    }
  }

  function sortCallback({ currentSortState, columnId, dispatch, directions }) {
    const { by, order } = currentSortState
    if (!by || by !== columnId) {
      dispatch({ type: directions[0], columnId: columnId })
    } else if (order === directions[0] && directions[1]) {
      dispatch({ type: directions[1], columnId: columnId })
    } else {
      dispatch({ type: 'RESET' })
    }
  }

  const sortDirections = ['ASC', 'DSC']

  return (
    <StatefulTable
      items={items}
      columns={columns}
      sort={{
        reducer: sortReducer,
        callback: sortCallback,
        directions: sortDirections,
        initialValue,
      }}
    />
  )
}
```

## Limitations

This component is unstable beacause is also missing some (quite crucial) features, such as:

- Empty states
- Checkboxes resolvers

## Props

| Name       | Type                          | Description                                        | Required | Default                       |
| ---------- | ----------------------------- | -------------------------------------------------- | -------- | ----------------------------- |
| columns    | `Column<T>[]`                 | Table column spec                                  | ✅       | -                             |
| context    | `ResolverContext`             | Resolver context                                   | 🚫       | -                             |
| resolvers  | `Record<string, Resolver<T>>` | Table field resolvers                              | 🚫       | Table's default resolvers     |
| items      | `T[]`                         | Table items                                        | 🚫       | `[]`                          |
| length     | `number`                      | Expected items length                              | 🚫       | `5`                           |
| sort       | `UseTableSortParams<T>`       | useTableSort hook params                           | 🚫       | -                             |
| css        | `any`                         | Emotion css prop                                   | 🚫       | -                             |
| csx        | `StyleProp`                   | Define component styles                            | 🚫       | {}                            |
| getRowKey  | `(item: T) => string`         | Key extractor                                      | 🚫       | Table's default key extractor |
| loading    | `boolean`                     | Whether the table is loading or not                | 🚫       | `false`                       |
| density    | `TableDensity`                | Table row height                                   | 🚫       | `regular`                     |
| onRowClick | `(item: T) => void`           | Action to dispatch on a row click                  | 🚫       | -                             |
| dir        | `TableDir`                    | HTML Dir                                           | 🚫       | ltr                           |
| children   | `ReactNode`                   | Element that will be displayed on top of the table | 🚫       | -                             |
