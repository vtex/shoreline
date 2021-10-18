---
title: DataGrid
path: /data-grid/
---

# DataGrid

DataGrid is designed to render tabular data consistently for any kind of data type. If you're coming from [VTEX Styleguide](https://styleguide.vtex.com/), you can see it as the next-gen of the [Table v2](https://styleguide.vtex.com/#/Components/%F0%9F%91%BB%20Experimental/Table%20V2) (and is strongly inspired by it).

## State

DataGrid is pretty much stateless. The state hook `useDataGridState` contains all business logic needed for the component.

```jsx
function Example() {
  /**
   * The hook returns the DataGrid state
   */
  const state = useDataGridState({
    /**
     * Columns shape, read more about it on the rendering section
     */
    columns: [
      {
        id: 'productName',
        header: 'Product name',
      },
      {
        id: 'inStock',
        header: 'In Stock',
      },
      {
        id: 'price',
        header: 'Price',
      },
      {
        id: 'skus',
        header: 'SKUs',
      },
    ],
    /**
     * List of items to render
     */
    items: [
      {
        id: 1,
        productName: 'Orange',
        inStock: 380,
        skus: 0,
        price: 120,
      },
    ],
  })
  /**
   * You must use the `state` prop so that your DataGrid comes to life
   * This is the only prop that is required
   */
  return <DataGrid state={state} />
}
```

### useDataGridState

| Name       | Type                          | Description                                                                | Required | Default                       |
| ---------- | ----------------------------- | -------------------------------------------------------------------------- | -------- | ----------------------------- |
| columns    | `Column<T>[]`                 | Table column spec                                                          | ✅       | -                             |
| view       | `DataViewState`               | Related DataView state                                                     | 🚫       | -                             |
| context    | `ResolverContext`             | Resolver context                                                           | 🚫       | -                             |
| resolvers  | `Record<string, Resolver<T>>` | Table field resolvers                                                      | 🚫       | Table's default resolvers     |
| items      | `T[]`                         | Table items                                                                | 🚫       | `[]`                          |
| length     | `number`                      | Expected items length, this will also control the number of skeleton items | 🚫       | `5`                           |
| sort       | `UseTableSortParams<T>`       | useTableSort hook params                                                   | 🚫       | -                             |
| getRowKey  | `(item: T) => string`         | Key extractor                                                              | 🚫       | Table's default key extractor |
| density    | `TableDensity`                | Inital table row height                                                    | 🚫       | `regular`                     |
| onRowClick | `(item: T) => void`           | Action to dispatch on a row click                                          | 🚫       | -                             |

It returns an object with the following types

```ts isStatic
interface DataGridState<T> {
  /**
   * Collection rendered while loading
   */
  skeletonCollection: T[]
  /**
   * Resolves the cell content
   */
  resolveCell: (args: ResolverCallee<ResolveCellArgs<T>>) => ReactNode
  /**
   * Resolvers the header content
   */
  resolveHeader: (
    args: ResolverCallee<ResolveHeaderArgs<T>>
  ) => ResolveHeaderReturn
  /**
   * Items to render
   */
  data: T[]
  /**
   * Grid columns
   */
  columns: Array<Column<T>>
  /**
   * Providers from the resolvers
   */
  Providers: (props: PropsWithChildren<unknown>) => JSX.Element
  /**
   * Current sorting state
   */
  sortState: UseSortReturn
  /**
   * Key extractor
   */
  getRowKey: (item: T) => string | unknown
  /**
   * Current grid density
   */
  density: DataGridDensity
  /**
   * Set the current grid density
   */
  setDensity: React.Dispatch<DataGridDensity>
  /**
   * Action to take on click a row
   */
  onRowClick?: (item: T) => void
}

/**
 * Caller of a resolver
 */
type ResolverCallee<T> = Omit<T, 'resolvers' | 'context' | 'sortState'>
```

## Rendering

The main objective of `DataGrid` is to provide a flexible render to support any kind of data type.

| Attribute | Type                                            | Description                                                                                                                                                                                                                                           | Required |
| --------- | ----------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| id        | `string`                                        | String that defines the property name that the column represents.                                                                                                                                                                                     | ✅       |
| header    | `((column: Column<T>) => ReactNode), or string` | Controls the title which appears on the table Header.<br />It can receive either a string or an element.                                                                                                                                              | 🚫       |
| accessor  | `((item: T) => ReactNode), or string`           | Defines how to access a property                                                                                                                                                                                                                      | 🚫       |
| resolver  | `R`                                             | [Resolvers](/data-display/data-grid/#resolvers) api<br />Will select the [plain resolver](/data-display/data-grid/#plain) by default                                                                                                                  | 🚫       |
| width     | `number`                                        | Defines a fixed width for the specific column.<br />Receives either a string or number.<br />By default, the column's width is defined to fit the available space without breaking the content.                                                       | 🚫       |
| sortable  | `(a: T, b: T) => number`                        | Defines if that column is sortable or not, passing true to this prop won't sort items by itself, the sorting will still need to be handled using the sort prop inside the StatelessTable sort prop. Check [Sorting](/data-display/data-grid/#sorting) | 🚫       |
| compare   | `boolean`                                       | The function provided to handle the sorting of this column of the table, if this function is provided the table items will be sorted based on this function result. Check [Sorting](/data-display/data-grid/#sorting)                                 | 🚫       |

### Accessor

Some properties may be nested within objects and arrays. The `accessor` properties provide an easy way to access those.

```jsx noInline
const items = [
  {
    id: 1,
    product: {
      name: 'Orange',
      type: 'Fruit',
    },
    qty: {
      sold: 100,
      total: 320,
    },
    skus: {
      value: [0, 10, 20],
    },
    price: [120, 'usd'],
  },
]

function Example() {
  const state = useDataGridState({
    columns: [
      {
        id: 'product.name',
        header: 'Name',
        accessor: 'product.name',
      },
      {
        id: 'product.type',
        header: 'Type',
        accessor: 'product.type',
      },
      {
        id: 'qty',
        header: 'In Stock',
        accessor: (item) => {
          const {
            qty: { total, sold },
          } = item
          return total - sold
        },
      },
      {
        id: 'price',
        header: 'Price',
        accessor: 'price.0',
      },
      {
        id: 'skus',
        header: 'SKUs',
        accessor: 'skus.value.2',
      },
    ],
    items,
  })

  return <DataGrid state={state} />
}

render(<Example />)
```

### Resolvers

Resolvers are rendering functions that target a specific data type. The main usage is to render the same data types consistently along with admin applications.

#### Key concepts

##### Render function

All resolvers accept a render function, that returns a component. It controls the data rendering, which may be treated by the resolver or not.

```ts isStatic
{
  type: 'resolver name',
  /**
   * You have 3 render props here:
   * { item, data, context }
   */
  render: function Render({ item, data, context }) {
    return <></>
  }
}
```

| prop name | type                                             | description                                                         |
| --------- | ------------------------------------------------ | ------------------------------------------------------------------- |
| item      | `T`                                              | the item displayed for the row                                      |
| data      | `unknown`                                        | extracted column data from the item, you need to cast it before use |
| context   | `{ loading: boolean, density: DataGridDensity }` | relevant global information about the table current state           |

##### Root Resolver

This is the parent of all other resolvers. It does not treat the data at all - even the loading state is completely up to you. Use it if you want complete control over what's being rendered on the cell, and don't mind the complexity that it brings.

```jsx
function Example() {
  const state = useDataGridState({
    columns: [
      {
        id: 'id',
        header: 'Id',
      },
      /**
       * The great thing about the root resolver is that you can infer new columns from
       * multiple properties of the item.
       *
       * description is being created from productName and category
       */
      {
        id: 'description',
        header: 'Description',
        resolver: {
          type: 'root',
          /**
           * { data } here would be null, because the is no such prop in the item
           */
          render: function Description({ item, context }) {
            /**
             * You should declare the render while loading
             * this is only required by the root resolver
             * the other ones, take care of this for you
             */
            if (context.status === 'loading') {
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
        productName: 'Orange',
        category: 'fruit',
        inStock: 380,
      },
      {
        id: 2,
        productName: 'Lemon',
        category: 'fruit',
        inStock: 380,
      },
    ],
  })

  return <DataGrid state={state} />
}
```

#### Resolver Options

##### Plain

The plain resolver is the default for all columns. It means that if you don't select a resolver, this is what you're rendering. It should be mainly used to render raw data like strings or numbers that don't need treatment.

```jsx noInline
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

function Example() {
  const state = useDataGridState({
    columns: [
      {
        id: 'productName',
        header: 'Product name',
      },
      {
        id: 'inStock',
        header: 'In Stock',
      },
      {
        id: 'price',
        header: 'Price',
      },
      {
        id: 'skus',
        header: 'SKUs',
        resolver: {
          type: 'plain',
          /**
           * this is how to use the render function
           */
          render: function Render({ data }) {
            return (
              <tag.p
                csx={{
                  color: Number(data) > 0 ? 'blue' : 'red',
                }}
              >
                {data}
              </tag.p>
            )
          },
        },
      },
    ],
    items,
  })

  return <DataGrid state={state} />
}

render(<Example />)
```

##### Currency

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

  const state = useDataGridState({
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

  return <DataGrid state={state} />
}
```

##### Date

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

  const state = useDataGridState({
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

  return <DataGrid state={state} />
}
```

##### Image

| Prop    | Type                      | Description                      | Required | Default |
| ------- | ------------------------- | -------------------------------- | -------- | ------- |
| display | boolean                   | if should preview on hover       | 🚫       | true    |
| size    | `small, regular or large` | size of the preview              | 🚫       | regular |
| delay   | number                    | delay of a preview display in ms | 🚫       | 0       |

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

  const state = useDataGridState({
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

  return <DataGrid state={state} />
}
```

### Sorting

To use the base sorting configuration, that matches the majority of use cases, you just need to pass the `compare` function to the columns that you want to sort by. Two params are accepted, representing two items - you must return a boolean that proves their equality.

```ts isStatic
type Compare = (a: T, b: T) => boolean
```

The following example allows ordering by `name`, `lastSale` and `price`.

```jsx noInline
const items = Array(3)
  .fill()
  .map((_, id) => {
    return {
      id: `${id}`,
      name: faker.commerce.productName(),
      lastSale: faker.date.past().toDateString(),
      price: faker.commerce.price(),
    }
  })

function CompareExample() {
  const state = useDataGridState({
    columns: [
      {
        id: 'name',
        header: 'Product Name',
        compare: (a, b) => b.name.localeCompare(a.name),
      },
      {
        id: 'lastSale',
        header: 'Last Sale',
        compare: (a, b) => {
          const aLastSale = new Date(a.lastSale).valueOf()
          const bLastSale = new Date(b.lastSale).valueOf()

          return bLastSale - aLastSale
        },
      },
      {
        id: 'price',
        header: 'Price',
        resolver: {
          type: 'currency',
          locale: 'en-US',
          currency: 'USD',
        },
        compare: (a, b) => parseInt(b.price, 10) - parseInt(a.price, 10),
      },
    ],
    items,
  })

  return <DataGrid state={state} />
}

render(<CompareExample />)
```

#### Configuration

By using the `sort` property within `useDataGridState` you can configure the sorting to match specific use cases.

##### initialValue

Defines the table initial sorting value. `{ order?: 'ASC' | 'DSC', by?: string }`

The `order` prop is related to the sorting order and `by` indicates which column is being sorted, this value should be the id of the column.

##### directions

Defines the sorting order of the table.

It accepts an array with `ASC` and `DSC` as possible values.
You can pass an array with one or two sorting directions. If you pass an array with only one sorting direction the table will only sort in one direction.

##### reducer

Receives the reducer that will be used inside of the `useReducer` that handles the sorting state, it's not required and if not provided the default reducer function will be used.
The reducer function is called with the current sort state `{ order?: SortOrder, by?: string }` and the sorting action `{ type: SortOrder | 'RESET', columnId?: string }`.

##### callback

Receives a function that will be fired when the user clicks the table header cell of a column.

This function is called with an object containing the current sort state, the dispatch of the current `useReducer` that handles the sorting state, the column id of the column that was clicked, and the current sort directions being used.

## Composition

The `DataGrid` is designed to easily integrate with other components to create the view. You must understand the concept of the [DataView Pattern](/patterns/data-view/) before reading this section.

### Anatomy

Normally you will encounter DataGrid as the data-rendering part of the data-view, for example:

```txt isStatic
DataView
|__ DataViewControls
|   |__ Search
|   |__ Toolbar
|   |   |__ Button
|   |__ Pagination
|
|__ DataGrid
    |__ .Head
    |   |__ .Cell
    |__ .Body
        |__ .Row
            |__ .Cell
```

```jsx
function WithinDataView() {
  const view = useDataViewState()
  const grid = useDataGridState({
    columns: [
      /**
       * For easier usage, you can define the related view
       * within inside of the DataGrid state hook
       */
      view,
      {
        id: 'productName',
        header: 'Product name',
      },
      {
        id: 'inStock',
        header: 'In Stock',
      },
      {
        id: 'price',
        header: 'Price',
      },
      {
        id: 'skus',
        header: 'SKUs',
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
    ],
  })

  return (
    <DataView state={view}>
      <DataGrid state={grid} />
    </DataView>
  )
}
```

### Search Form

Example using the [Search](/form/search) component to filter the data.

```jsx noInline
const items = [
  {
    id: 1,
    productName: 'Banana',
    inStock: 380,
    skus: 0,
    price: 80,
  },
  {
    id: 2,
    productName: 'Lemon',
    inStock: 380,
    skus: 26,
    price: 500,
  },
  {
    id: 3,
    productName: 'Tomato',
    inStock: 380,
    skus: 25,
    price: 100,
  },
]

function WithSearch() {
  const view = useDataViewState()
  const search = useSearchState()

  const searchedItems = React.useMemo(() => {
    return items.filter((item) =>
      item.productName.toLowerCase().startsWith(
        // use the search debounced value to
        // filter the collection
        search.debouncedValue.toLocaleLowerCase()
      )
    )
  }, [search])

  const grid = useDataGridState({
    view,
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
    items: searchedItems,
    length: 5,
  })

  return (
    <DataView state={view}>
      <DataViewControls>
        <Search id="search" placeholder="Search" state={search} />
      </DataViewControls>
      <DataGrid state={grid} />
    </DataView>
  )
}

render(<WithSearch />)
```

### Toolbar

Example using the [Toolbar](/toolbar/) component.

```jsx
function WithToolbar() {
  const toolbar = useToolbarState()
  const view = useDataViewState()
  const grid = useDataGridState({
    columns: [
      view,
      {
        id: 'productName',
        header: 'Product name',
      },
      {
        id: 'inStock',
        header: 'In Stock',
      },
      {
        id: 'price',
        header: 'Price',
      },
      {
        id: 'skus',
        header: 'SKUs',
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
    ],
  })

  return (
    <DataView state={view}>
      <DataViewControls>
        <Toolbar state={toolbar}>
          <ToolbarButton
            size="small"
            variant="adaptative-dark"
            icon={<IconImport />}
          >
            Import
          </ToolbarButton>
          <ToolbarButton
            size="small"
            variant="adaptative-dark"
            icon={<IconExport />}
          >
            Export
          </ToolbarButton>
        </Toolbar>
      </DataViewControls>
      <DataGrid state={grid} />
    </DataView>
  )
}
```

### Pagination

Example using the [Pagination](/pagination) component.

```jsx noInline
const NUMBER_OF_ITEMS = 100
const ITEMS_PER_PAGE = 5

const items = Array(NUMBER_OF_ITEMS)
  .fill()
  .map((_, id) => {
    return {
      id: `${id}`,
      name: faker.commerce.productName(),
      lastSale: faker.date.past().toDateString(),
      price: faker.commerce.price(),
    }
  })

function WithPagination() {
  const view = useDataViewState()
  const pagination = usePaginationState({
    pageSize: ITEMS_PER_PAGE,
    total: NUMBER_OF_ITEMS,
  })
  const grid = useDataGridState({
    view,
    columns: [
      {
        id: 'name',
        header: 'Product Name',
      },
      {
        id: 'lastSale',
        header: 'Last Sale',
      },
      {
        id: 'price',
        header: 'Price',
        resolver: {
          type: 'currency',
          locale: 'en-US',
          currency: 'USD',
        },
      },
    ],
    items: items.slice(pagination.range[0] - 1, pagination.range[1]),
    length: ITEMS_PER_PAGE,
  })

  return (
    <DataView state={view}>
      <DataViewControls>
        <FlexSpacer />
        <Pagination
          state={pagination}
          preposition="of"
          subject="results"
          prevLabel="Previous"
          nextLabel="Next"
        />
      </DataViewControls>
      <DataGrid state={grid} />
    </DataView>
  )
}

render(<WithPagination />)
```

### Reacting to DataView status

By dispatch the `setStatus` function of the `DataView`, the `DataGrid` reacts to it.

```jsx noInline
const items = Array(3)
  .fill()
  .map((_, id) => {
    return {
      id: `${id}`,
      name: faker.commerce.productName(),
      lastSale: faker.date.past().toDateString(),
      price: faker.commerce.price(),
    }
  })

function StatusExample() {
  const view = useDataViewState()
  const grid = useDataGridState({
    view,
    items,
    columns: [
      {
        id: 'name',
        header: 'Product Name',
      },
      {
        id: 'lastSale',
        header: 'Last Sale',
      },
      {
        id: 'price',
        header: 'Price',
        resolver: {
          type: 'currency',
          locale: 'en-US',
          currency: 'USD',
        },
      },
    ],
    length: 3,
  })

  return (
    <DataView state={view}>
      <DataViewControls>
        <Button
          onClick={() =>
            view.setStatus({
              type: 'ready',
            })
          }
        >
          Ready
        </Button>
        <Button
          onClick={() =>
            view.setStatus({
              type: 'loading',
            })
          }
        >
          Loading
        </Button>
        <Button
          onClick={() =>
            view.setStatus({
              type: 'error',
              message: 'Something went wrong',
            })
          }
        >
          Error
        </Button>
        <Button
          onClick={() =>
            view.setStatus({
              type: 'not-found',
              message: 'Your product was not found',
            })
          }
        >
          Not Found
        </Button>
        <Button
          onClick={() =>
            view.setStatus({
              type: 'empty',
              message: 'You need to create something',
            })
          }
        >
          Empty
        </Button>
      </DataViewControls>
      <DataGrid state={grid} />
    </DataView>
  )
}

render(<StatusExample />)
```

## Examples

This section presents a series of examples that may be useful.

### Topbar

Mixing the concepts of `Search`, `Toolbar` and `Pagination`

```jsx noInline
const NUMBER_OF_ITEMS = 100
const ITEMS_PER_PAGE = 5

const items = Array(NUMBER_OF_ITEMS)
  .fill()
  .map((_, id) => {
    return {
      id: `${id}`,
      name: faker.commerce.productName(),
      lastSale: faker.date.past().toDateString(),
      price: faker.commerce.price(),
    }
  })

function WithFullTopbar() {
  const toolbar = useToolbarState()
  const view = useDataViewState()
  const search = useSearchState()
  const pagination = usePaginationState({
    pageSize: ITEMS_PER_PAGE,
    total: NUMBER_OF_ITEMS,
  })

  const paginatedItems = React.useMemo(() => {
    pagination.paginate('reset')
    return items.filter((item) =>
      item.name.toLowerCase().startsWith(
        // use the search debounced value to
        // filter the collection
        search.debouncedValue.toLocaleLowerCase()
      )
    )
  }, [search.debouncedValue])

  const grid = useDataGridState({
    view,
    columns: [
      {
        id: 'name',
        header: 'Product Name',
      },
      {
        id: 'lastSale',
        header: 'Last Sale',
      },
      {
        id: 'price',
        header: 'Price',
        resolver: {
          type: 'currency',
          locale: 'en-US',
          currency: 'USD',
        },
      },
    ],
    items: [...paginatedItems].slice(
      pagination.range[0] - 1,
      pagination.range[1]
    ),
    length: ITEMS_PER_PAGE,
  })

  return (
    <DataView state={view}>
      <DataViewControls>
        <Search id="search" placeholder="Search" state={search} />
        <Toolbar state={toolbar} aria-label="Toolbar">
          <ToolbarButton
            size="small"
            variant="adaptative-dark"
            icon={<IconImport />}
          >
            Import
          </ToolbarButton>
          <ToolbarButton
            size="small"
            variant="adaptative-dark"
            icon={<IconExport />}
          >
            Export
          </ToolbarButton>
        </Toolbar>
        <FlexSpacer />
        <Pagination
          state={pagination}
          preposition="of"
          subject="results"
          prevLabel="Previous"
          nextLabel="Next"
        />
      </DataViewControls>
      <DataGrid state={grid} />
    </DataView>
  )
}

render(<WithFullTopbar />)
```

### Data fetching

Example with a simulated data fetching

```jsx noInline
/**
 * Function to simulate a request
 * You can configure the delay and numberOfItems here
 */
function request(delay = 3000, numberOfItems = 3) {
  return new Promise(function (resolve) {
    setTimeout(
      resolve,
      delay,
      Array(numberOfItems)
        .fill()
        .map((_, id) => {
          return {
            id: `${id}`,
            name: faker.commerce.productName(),
            lastSale: faker.date.past().toDateString(),
            price: faker.commerce.price(),
          }
        })
    )
  })
}

function DataFetchExample() {
  const [items, setItems] = React.useState([])
  /**
   * This is just for the example purposes so, nevermind
   */
  const [update, setUpdate] = React.useState(false)

  const view = useDataViewState()
  const grid = useDataGridState({
    view,
    columns: [
      {
        id: 'name',
        header: 'Product Name',
      },
      {
        id: 'lastSale',
        header: 'Last Sale',
      },
      {
        id: 'price',
        header: 'Price',
        resolver: {
          type: 'currency',
          locale: 'en-US',
          currency: 'USD',
        },
      },
    ],
    length: 3,
    items,
  })

  React.useEffect(() => {
    view.setStatus({
      type: 'loading',
    })
    request().then((d) => {
      setItems(d)
      view.setStatus({
        type: 'ready',
      })
    })
  }, [update])

  return (
    <DataView state={view}>
      <DataViewControls>
        <Button
          onClick={() => {
            setUpdate((u) => !u)
          }}
        >
          Simulate data fetching
        </Button>
      </DataViewControls>
      <DataGrid state={grid} />
    </DataView>
  )
}

render(<DataFetchExample />)
```

### Drag and Drop

Simple and accessible drag and drop reordering using [Atlassian's react-beautiful-dnd](https://github.com/atlassian/react-beautiful-dnd). The idea here is to use the rendering complexity to access the DataGrid's table internals.

```jsx noInline
const fakeData = Array(5)
  .fill()
  .map((_, id) => {
    return {
      id: `${id}`,
      name: faker.commerce.productName(),
      lastSale: faker.date.past().toDateString(),
      price: faker.commerce.price(),
    }
  })

// simple reordering function
function reorder(list, startIndex, endIndex) {
  const result = Array.from(list)
  const [removed] = result.splice(startIndex, 1)

  result.splice(endIndex, 0, removed)

  return result
}

function Example() {
  // we need to keep our items within a state, since they're reordered
  const [items, setItems] = React.useState(fakeData)
  const datagrid = useDataGridState({
    columns: [
      // here we create a new column that does not exist on the collection
      // this is one of the greatest things about the root resolver
      // you can deal with a prop that does not exist without parsing the collection
      {
        id: 'draggable',
        header: '',
        width: 36,
        resolver: {
          type: 'root',
          render: function RenderIcon() {
            return <IconDrag />
          },
        },
      },
      // To drag-n-drop look good, each column must have a fixed width
      // there is other approaches on this, see:
      // https://github.com/atlassian/react-beautiful-dnd/blob/master/docs/patterns/tables.md
      {
        id: 'name',
        width: 200,
        header: 'Product Name',
      },
      {
        id: 'lastSale',
        width: 200,
        header: 'Last Sale',
      },
      {
        id: 'price',
        header: 'Price',
        width: 100,
        resolver: {
          type: 'currency',
          locale: 'en-US',
          currency: 'USD',
        },
      },
    ],
    items,
  })

  const onDragEnd = (result) => {
    if (!result.destination) {
      return
    }

    const orderedItems = reorder(
      items,
      result.source.index,
      result.destination.index
    )

    setItems(orderedItems)
  }

  return (
    <DataGrid state={datagrid} csx={{ width: 'unset' }}>
      <DataGrid.Head />
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="droppable">
          {(droppableProvided) => (
            <DataGrid.Body ref={droppableProvided.innerRef}>
              {(renderRow) => (
                <React.Fragment>
                  {renderRow(({ key, item, index }) => (
                    <Draggable draggableId={key} index={index}>
                      {(draggableProvided, draggableSnapshot) => (
                        <DataGrid.Body.Row
                          id={key}
                          item={item}
                          ref={draggableProvided.innerRef}
                          {...draggableProvided.draggableProps}
                          {...draggableProvided.dragHandleProps}
                          csx={{
                            ...draggableProvided.draggableProps.style,
                            boxShadow: draggableSnapshot.isDragging
                              ? 'menu'
                              : 'none',
                          }}
                        />
                      )}
                    </Draggable>
                  ))}
                  {droppableProvided.placeholder}
                </React.Fragment>
              )}
            </DataGrid.Body>
          )}
        </Droppable>
      </DragDropContext>
    </DataGrid>
  )
}

render(<Example />)
```
