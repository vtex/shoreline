---
title: Pagination
path: /pagination/
---

# Pagination

The pagination component allows the user to move back and forth between pages, showing the number of items on the page and in the rest of the collection.

## Installation

```jsx isStatic
import { Pagination } from '@vtex/admin-ui'
```

## Code example

```jsx
function Example() {
  const state = usePaginationState({ pageSize: 5, total: 35 })

  return (
    <Pagination
      state={state}
      preposition="of"
      subject="results"
      prevLabel="Previous"
      nextLabel="Next"
    />
  )
}
```

## Variation

Pagination only has one variation which is loading

### Loading

```jsx
function Loading() {
  const state = usePaginationState({ pageSize: 5, total: 35 })

  return (
    <Pagination
      state={state}
      preposition="of"
      subject="results"
      prevLabel="Previous"
      nextLabel="Next"
      loading
    />
  )
}
```

## Props

| Name        | Type                  | Description                                                                    | Required | Default |
| ----------- | --------------------- | ------------------------------------------------------------------------------ | -------- | ------- |
| preposition | `string`              | String displayed in between the end of the range and the total amount of items | ✅       | -       |
| subject     | `string`              | String displayed in the end of the component                                   | ✅       | -       |
| prevLabel   | `string`              | Label used in previous button tooltip                                          | ✅       | -       |
| nextLabel   | `string`              | Label used in next button tooltip                                              | ✅       | -       |
| loading     | `boolean`             | Whether the table is loading or not                                            | 🚫       | -       |
| state       | `UsePaginationReturn` | Component State                                                                | ✅       | -       |

## State objects

The pagination state object is composed of the `currentPage` prop and the `range` prop. The `currentPage` is a number and its value is paginations current page, and the `range` is an array that contains two numbers with the beginning and the end of the current page in relation to the current page and the total amount of items in the collection.

### usePaginationState

For convenience, we also provide a hook that already implements the state logic for you. You should pass the hook return to the `state` property.

#### Parameter

| Name         | Type                                                                    | Description                                                                        | Required | Default                            |
| ------------ | ----------------------------------------------------------------------- | ---------------------------------------------------------------------------------- | -------- | ---------------------------------- |
| pageSize     | `number`                                                                | Amount of items that will be displayed in a page                                   | ✅       | -                                  |
| total        | `number`                                                                | Total amount of items in a collection                                              | 🚫       | pageSize                           |
| stateReducer | `(state: PaginationState, action: PaginationAction) => PaginationState` | Optional way to provide a function to be used inside usePagination hook useReducer | 🚫       | usePagination hook default reducer |
| initialPage  | `number`                                                                | The initial state of pagination                                                    | 🚫       | 1                                  |

### useQueryPaginationState

You can persist the pagination state within the browser's query params using the `useQuerySuseQueryPaginationStatetate` hook, instead of `usePaginationState`. Both hooks are used in the same way. The application should be wrapped by `QueryStateProvider`. The application should be wrapped by `QueryStateProvider`.

#### Parameter

| Name         | Type                                                                    | Description                                                                        | Required | Default                            |
| ------------ | ----------------------------------------------------------------------- | ---------------------------------------------------------------------------------- | -------- | ---------------------------------- |
| pageSize     | `number`                                                                | Amount of items that will be displayed in a page                                   | ✅       | -                                  |
| total        | `number`                                                                | Total amount of items in a collection                                              | 🚫       | pageSize                           |
| stateReducer | `(state: PaginationState, action: PaginationAction) => PaginationState` | Optional way to provide a function to be used inside usePagination hook useReducer | 🚫       | usePagination hook default reducer |

#### Code example

_watch how your url changes_

```jsx
function Example() {
  const Content = () => {
    const state = useQueryPaginationState({ pageSize: 5, total: 35 })

    return (
      <Pagination
        state={state}
        preposition="of"
        subject="results"
        prevLabel="Previous"
        nextLabel="Next"
      />
    )
  }

  return (
    <QueryStateProvider>
      <Content />
    </QueryStateProvider>
  )
}
```
