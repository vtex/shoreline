---
title: Page
path: /patterns/page/
sidebar_position: 1
---

# Page

Page is a pattern that represents a complete screen of an admin application. You can use the following utility components to achieve consistency easily.

## Import

```jsx
import {
  Page,
  PageHeader,
  PageTitle,
  PageActions,
  PageContent,
} from '@vtex/admin-ui'
```

## Anatomy

```txt
Page
|__ PageHeader
|   |__ PageTitle
|   |__ (...custom elements)
|   |__ PageActions
|       |__ Button
|
|__PageContent
   |__ (...Some view)
```

## Behavior

```jsx
<Page>
  <PageHeader>
    <PageTitle>Page Title</PageTitle>
  </PageHeader>
  <PageContent csx={{ padding: 5 }}>
    <tag.div>Page Content</tag.div>
  </PageContent>
</Page>
```

## PageHeader

Users rely on the page header to navigate and orient themselves within the admin.

### PageTitle

This is the basic usage. Use the `PageTitle` to render the page title.

```jsx live
<PageHeader>
  <PageTitle>Product</PageTitle>
</PageHeader>
```

#### With Link

The back-link is present if the `onPopNavigation` property is passed.

```jsx live
<PageHeader onPopNavigation={() => alert('onPopNavigation()')}>
  <PageTitle>Product</PageTitle>
</PageHeader>
```

### PageActions

Use the `PageActions` composite to add actions that are relevant for the whole page.

```jsx live
<PageHeader>
  <PageTitle>Products</PageTitle>
  <PageActions>
    <Button variant="secondary">Edit</Button>
    <Button>Create</Button>
  </PageActions>
</PageHeader>
```

### Full Blown Example

All features of `PageHeader` together.

```jsx live
<PageHeader onPopNavigation={() => alert('onPopNavigation()')}>
  <PageTitle>Product</PageTitle>
  <PageActions>
    <Button variant="danger">Delete Item</Button>
  </PageActions>
</PageHeader>
```

## PageContent

Renders the content of the page.

### With DataView

Example featuring [DataView](/patterns/data-view/) and [DataGrid](/components/data-grid/)

```jsx noInline live
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
    <Page>
      <PageHeader onPopNavigation={() => alert('should go back')}>
        <PageTitle>Page Title</PageTitle>
        <PageActions>
          <Button variant="tertiary">Tertiary Action</Button>
          <Button variant="secondary">Secondary Action</Button>
          <Button>Primary Action</Button>
        </PageActions>
      </PageHeader>
      <PageContent>
        <DataView state={view}>
          <DataViewControls>
            <Search id="search" placeholder="Search" state={search} />
          </DataViewControls>
          <DataGrid state={grid} />
        </DataView>
      </PageContent>
    </Page>
  )
}

render(<WithSearch />)
```

## Types

### Page

All props of `div` jsx element

### PageContent

All props of `div` jsx element

### PageHeader

All props of `header` jsx element

| Name            | Type         | Description                        | Required | Default |
| --------------- | ------------ | ---------------------------------- | -------- | ------- |
| onPopNavigation | `() => void` | Action when back button is clicked | 🚫       | 🚫      |

### PageTitle

All props of `div` jsx element

### PageActions

All props of `div` jsx element
