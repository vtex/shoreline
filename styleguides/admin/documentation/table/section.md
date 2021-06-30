---
path: /table/section/
---

# Section

If you provide an element to the children prop in the table that element will be displayed on top of the table component.
You should wrap the elements you want to display inside the section component.
We have also developed a few components that should be used in this section.

## Search

This is the input you should use when implementing search on the table. Its behavior is documented in [Search](/form/search)'s page.

## Toolbar

If you have buttons on your table that trigger actions related to the table you should display them inside the toolbar, the table has its own Toolbar.

### Toolbar.Button

This is the table toolbar's button, you should use it inside the table toolbar.

## Pagination

This is the component that handles pagination in the table. Its behavior is documented in [Pagination](/pagination)'s page.

```jsx
function CompleteTopbar() {
  const [search, setSearch] = React.useState('')
  const paginationState = usePaginationState({
    size: 5,
  })
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
      skus: 25,
      price: 120,
    },
    {
      id: 4,
      productName: 'Grape',
      inStock: 380,
      skus: 5,
      price: 120,
    },
    {
      id: 5,
      productName: 'Apple',
      inStock: 380,
      skus: 32,
      price: 120,
    },
    {
      id: 6,
      productName: 'Banana',
      inStock: 380,
      skus: 38,
      price: 120,
    },
  ]

  const filteredFruits = React.useMemo(() => {
    return fruits.filter((fruit) => {
      paginationState.paginate('reset')

      return (
        fruit.productName.toLowerCase().indexOf(search.toLocaleLowerCase()) > -1
      )
    })
  }, [search])

  const state = useTableState({
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
    items: [...filteredFruits].slice(
      paginationState.range[0] - 1,
      paginationState.range[1]
    ),
    length: 5,
  })

  return (
    <StatefulTable state={state}>
      <StatefulTable.Section>
        <StatefulTable.Search
          id="search"
          placeholder="Search"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value)
          }}
        />
        <StatefulTable.Toolbar>
          <StatefulTable.Toolbar.Button icon={<IconFilter />}>
            Filter
          </StatefulTable.Toolbar.Button>
          <StatefulTable.Toolbar.Button icon={<IconImport />}>
            Import
          </StatefulTable.Toolbar.Button>
          <StatefulTable.Toolbar.Button icon={<IconExport />}>
            Export
          </StatefulTable.Toolbar.Button>
        </StatefulTable.Toolbar>
        <FlexSpacer />
        <Pagination
          state={paginationState}
          preposition="of"
          subject="results"
          prevLabel="Previous"
          nextLabel="Next"
          total={fruits.length}
        />
      </StatefulTable.Section>
    </StatefulTable>
  )
}
```
