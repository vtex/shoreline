---
path: /table/sortable/
---

# Sortable API

The table has the sort prop to handle sorting.
If you just want regular sorting just provide a compare function inside of the table column objects.
This will handle the table sort UI state and not the sorting of the items.
All of these are optional values and if you do not provide them the default value will be used.

## initialValue

Defines the table initial sorting value. `{ order?: 'ASC' | 'DSC', by?: string }`
The `order` prop is related to the sorting order and `by` indicates which column is being sorted, this value should be the id of the column.

## directions

Defines the sorting order of the table.
It accepts an array with `ASC` and `DSC` as possible values.
You can pass an array with one or two sorting directions. If you pass an array with only one sorting direction the table will only sort in one direction.

## reducer

Receives the reducer that will be used inside of the `useReducer` that handles the sorting state, it's not required and if not provided the default reducer function will be used.
The reducer function is called with the current sort state `{ order?: SortOrder, by?: string }` and the sorting action `{ type: SortOrder | 'RESET', columnId?: string }`.

## callback

Receives a function that will be fired when the user clicks the table header cell of a column.
This function is called with an object containing the current sort state, the dispatch of the current `useReducer` that handles the sorting state, the column id of the column that was clicked and the current sort directions being used.

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
   * These are the default reducer, callback, sort directions, and initial state that will be used if none of them is provided.
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

  const state = useTableState({
    items,
    columns,
    sort: {
      reducer: sortReducer,
      callback: sortCallback,
      directions: sortDirections,
      initialValue,
    },
  })

  return <StatefulTable state={state} />
}
```
