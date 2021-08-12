---
path: /data-display/data-view/
---

# DataView

DataView is a pattern used for rendering and controlling a set of data.

## Import

```jsx isStatic
import { DataView, DataViewControls, useDataViewState } from '@vtex/admin-ui'
```

## Anatomy

```txt isStatic
DataView
|__ DataViewControls
|   |__ Search
|   |__ Toolbar
|   |   |__ Button
|   |__ Pagination
|   |__ (Other controls)
|
|__ (Data rendering section)
```

## State

The `useDataViewState` handles the `DataView` behavior.

```jsx
function Example() {
  const view = useDataViewState()

  return <DataView state={view}>Data</DataView>
}
```

## Controls

The `DataViewControls` arranges all the components that control or changes the displayed data. These components can be buttons, search forms, pagination, menus, and so on.

```jsx
function Example() {
  const view = useDataViewState()
  const search = useSearchState()
  const toolbar = useToolbarState()

  return (
    <DataView state={view}>
      <DataViewControls>
        <Search id="search" placeholder="Search" state={search} />
        <Toolbar state={toolbar}>
          <ToolbarButton variant="adaptative-dark">Button 1</ToolbarButton>
          <ToolbarButton variant="adaptative-dark">Button 2</ToolbarButton>
          <ToolbarButton variant="adaptative-dark">Button 3</ToolbarButton>
        </Toolbar>
      </DataViewControls>
    </DataView>
  )
}
```

## Rendering Data

The `useDataViewState` keeps track of `ready`, `loading`, `empty`, `error`, and `not-found` states. It also has default illustrations for `empty`, `error`, and `not-found` so that you only need to handle the `ready` and `loading` states.

```jsx
function RenderingData() {
  const view = useDataViewState()
  const toolbar = useToolbarState()

  const content = React.useMemo(
    (item) => {
      switch (view.status) {
        // Renders Data text if ready
        case 'ready': {
          return <p>Data</p>
        }
        // Rendes a Spinner if loading
        case 'loading': {
          return <Spinner size={24} />
        }
        // Don't render anything if empty, error or not-found
        // The illustrations will be rendered by the DataView
        default: {
          return null
        }
      }
    },
    [view.status]
  )

  return (
    <DataView state={view}>
      <DataViewControls>
        <Toolbar state={toolbar}>
          <ToolbarButton
            size="small"
            variant="adaptative-dark"
            onClick={() =>
              view.setStatus({
                type: 'ready',
              })
            }
          >
            Ready
          </ToolbarButton>
          <ToolbarButton
            size="small"
            variant="adaptative-dark"
            onClick={() =>
              view.setStatus({
                type: 'loading',
              })
            }
          >
            Loading
          </ToolbarButton>
          <ToolbarButton
            size="small"
            variant="adaptative-dark"
            onClick={() =>
              view.setStatus({
                type: 'error',
                message: 'Something went wrong',
              })
            }
          >
            Error
          </ToolbarButton>
          <ToolbarButton
            size="small"
            variant="adaptative-dark"
            onClick={() =>
              view.setStatus({
                type: 'not-found',
                message: 'The search term was not found',
              })
            }
          >
            Not found
          </ToolbarButton>
          <ToolbarButton
            size="small"
            variant="adaptative-dark"
            onClick={() =>
              view.setStatus({
                type: 'empty',
                message: 'The collection is empty',
              })
            }
          >
            Empty
          </ToolbarButton>
        </Toolbar>
      </DataViewControls>
      {content}
    </DataView>
  )
}
```

### With Skeleton

Example of a skeleton collection.

```jsx noInline
const NUMBER_OF_ITEMS = 5

const items = Array(NUMBER_OF_ITEMS)
  .fill()
  .map((_, id) => {
    return {
      id: `${id}`,
      name: faker.commerce.productName(),
    }
  })

function SkeletonCollection() {
  const view = useDataViewState()
  const search = useSearchState()
  const toolbar = useToolbarState()

  const data = React.useMemo(() => {
    return items.filter((item) =>
      item.name.toLowerCase().startsWith(
        // use the search debounced value to
        // filter the collection
        search.debouncedValue.toLocaleLowerCase()
      )
    )
  }, [search.debouncedValue])

  const renderItem = React.useCallback(
    (item) => {
      switch (view.status) {
        case 'ready': {
          return <p>{item.name}</p>
        }
        case 'loading': {
          return (
            <Skeleton
              csx={{
                width: 256,
                height: 24,
              }}
            />
          )
        }
        default: {
          return null
        }
      }
    },
    [view.status]
  )

  return (
    <DataView state={view}>
      <DataViewControls>
        <Search id="search" placeholder="Search" state={search} />
        <Toolbar state={toolbar}>
          <ToolbarButton
            size="small"
            variant="adaptative-dark"
            onClick={() =>
              view.setStatus({
                type: 'ready',
              })
            }
          >
            Ready
          </ToolbarButton>

          <ToolbarButton
            size="small"
            variant="adaptative-dark"
            onClick={() =>
              view.setStatus({
                type: 'loading',
              })
            }
          >
            Loading
          </ToolbarButton>
          <ToolbarButton
            size="small"
            variant="adaptative-dark"
            onClick={() =>
              view.setStatus({
                type: 'error',
                message: 'Something went wrong',
              })
            }
          >
            Error
          </ToolbarButton>
          <ToolbarButton
            size="small"
            variant="adaptative-dark"
            onClick={() =>
              view.setStatus({
                type: 'not-found',
                message: 'The search term was not found',
              })
            }
          >
            Not found
          </ToolbarButton>
          <ToolbarButton
            size="small"
            variant="adaptative-dark"
            onClick={() =>
              view.setStatus({
                type: 'empty',
                message: 'The collection is empty',
              })
            }
          >
            Empty
          </ToolbarButton>
        </Toolbar>
      </DataViewControls>
      {(view.status === 'loading' || view.status === 'ready') &&
        data.map((item) => (
          <Flex
            align="center"
            key={item.id}
            csx={{
              paddingX: 1,
              paddingY: 3,
              border: 'divider-bottom',
              height: 64,
            }}
          >
            {renderItem(item)}
          </Flex>
        ))}
    </DataView>
  )
}

render(<SkeletonCollection />)
```

## Types

### DataView props

All props of JSX div element.

| Name  | Type            | Description    | Required | Default |
| ----- | --------------- | -------------- | -------- | ------- |
| state | `DataViewState` | DataView state | ✅       | -       |

### DataViewControls props

All props of JSX div element.

### useDataViewState params

The params configure the initial state. The default values represent the `ready` state.

| Name     | Type      | Description          | Required | Default |
| -------- | --------- | -------------------- | -------- | ------- |
| loading  | `boolean` | Whether is loading   | 🚫       | `false` |
| error    | `Object`  | Whether is error     | 🚫       | `null`  |
| empty    | `Object`  | Whether is empty     | 🚫       | `null`  |
| notFound | `Object`  | Whether is not-found | 🚫       | `null`  |

### useDataViewState return

| Name         | Type                                                                   | Description          |
| ------------ | ---------------------------------------------------------------------- | -------------------- |
| status       | `ready`, `loading`, `error`, `not-found`, or `empty`                   | Current view status  |
| statusObject | `{ loading: boolean, empty: Object, notFound: Object, error: Object }` | Detailed view status |
| setStatus    | `React.Dispatch<{type: status }>`                                      | Sets the view status |
