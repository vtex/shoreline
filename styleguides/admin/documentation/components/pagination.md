---
path: /pagination
---

# Pagination

The pagination component allows the user to move back and forth between pages showing the number of items on the page and in the rest of the collection.

```jsx isStatic
import { Pagination } from '@vtex/admin-ui'
```

## Example

```jsx
function Example() {
  const state = usePaginationState({ size: 5 })

  return (
    <Pagination
      state={state}
      preposition="of"
      subject="results"
      prevLabel="Back"
      nextLabel="Next"
      total={35}
    />
  )
}
```

## Props

| Name        | Type                  | Description                                                                    | Required | Default |
| ----------- | --------------------- | ------------------------------------------------------------------------------ | -------- | ------- |
| total       | `number`              | Total amount of items in a collection                                          | ✅       | -       |
| preposition | `string`              | String displayed in between the end of the range and the total amount of items | ✅       | -       |
| subject     | `string`              | String displayed in the end of the component                                   | ✅       | -       |
| prevLabel   | `string`              | Label used in previous button tooltip                                          | ✅       | -       |
| nextLabel   | `string`              | Label used in next button tooltip                                              | ✅       | -       |
| loading     | `boolean`             | Whether the table is loading or not                                            | 🚫       | -       |
| state       | `UsePaginationReturn` | Component State                                                                | ✅       | -       |

## usePaginationState

For convenience, we also provide a hook that already implements the state logic for you. You should pass the hook return to the `state` property.

## Parameter

| Name                   | Type                                                                    | Description                                                                                                    | Required | Default                                |
| ---------------------- | ----------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------- | -------- | -------------------------------------- |
| paginationInitialState | `PaginationState`                                                       | Hook initial state                                                                                             | 🚫       | `{ currentPage: 1, range: [1, size] }` |
| size                   | `number`                                                                | Amount of itens that will be displayed in a page                                                               | ✅       | -                                      |
| paginationReducer      | `(state: PaginationState, action: PaginationAction) => PaginationState` | Optional way to provide a function to be used inside usePagination hook useReducer                             | 🚫       | usePagination hook default reducer     |
| paginationCallback     | `(params: PaginateParams) => void`                                      | Optional way to provide a function that will be triggered by pagination component when the buttons are clicked | 🚫       | usePagination hook default callback    |
