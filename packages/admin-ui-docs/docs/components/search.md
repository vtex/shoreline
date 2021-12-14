---
title: Search
path: /search/
---

# Search

Search enables users to specify a word, phrase, or term to find relevant pieces of content.

## Import

```jsx isStatic
import { Search } from '@vtex/admin-ui'
```

## Behavior

```jsx live
function Example() {
  const state = useSearchState()

  return (
    <Search
      state={state}
      id="basic-behavior"
      aria-label="Behavior Search"
      placeholder="Search something..."
    />
  )
}
```

## State

The `useSearchState` hook handles the `Search` behavior

### Loading

The loading state is already maintained by the **state hook** so that you don't need to do it within your application. The initial loading state can be controlled using the `initiallyLoading` parameter. You can also toggle its state programmatically with the `setLoading` function.

```jsx live
function Example() {
  const state = useSearchState({
    initiallyLoading: true,
  })

  return (
    <Set>
      <Search
        state={state}
        id="loading-example"
        aria-label="Loading Example Search"
        placeholder="Search something..."
      />
      <Button variant="secondary" onClick={() => state.setLoading((l) => !l)}>
        Toggle Loading
      </Button>
    </Set>
  )
}
```

### Debounce

A common UX pattern is to filter the collections (or make a query) while the user types the input. To do that performatively, we often use debounced values. The good thing here, it that useSearchState stores a debounced value for you!

```jsx live
function Example() {
  const state = useSearchState({
    // controls the debounce timeout
    timeoutMs: 500,
  })

  return (
    <tag.div csx={{ width: 500 }}>
      <Search
        id="search"
        state={state}
        placeholder="Search for a product, category or brand"
      />
      <tag.div csx={{ marginTop: 4 }}>
        <tag.p>Value: {state.value}</tag.p>
        <tag.p>DebouncedValue: {state.debouncedValue}</tag.p>
      </tag.div>
    </tag.div>
  )
}
```

### Persisted state in query params

You can persist the search value within the browser's query params using the `useQuerySearchState` hook, instead of `useSearchState`. The application should be wrapped by `QueryStateProvider`.

_watch how your url changes (Note that the persisted value is the debounce value)_

```jsx live
function Example() {
  const Content = () => {
    const state = useQuerySearchState()

    return (
      <tag.div csx={{ width: 500 }}>
        <Search
          id="search"
          state={state}
          placeholder="Search for a product, category or brand"
        />
        <tag.div csx={{ marginTop: 4 }}>
          <tag.p>Value: {state.value}</tag.p>
          <tag.p>DebouncedValue: {state.debouncedValue}</tag.p>
        </tag.div>
      </tag.div>
    )
  }

  return (
    <QueryStateProvider>
      <Content />
    </QueryStateProvider>
  )
}
```

## Accessibility

To grant that assistive technology can interact safely with the `Search` component, you must define two things:

- The `aria-label` property.
- The `id` property.

Both should be unique for the Page. This means that if you have two searches, they should have different `aria-label`'s and `id`s. Also, if you're dealing with i18n, you must translate your `aria-label`'s.

## Types

### Search props

All props of `form` JSX element

### useSearchState Params

Configuration params accepted by the state hook

| Name             | Type                                      | Description                       | Required | Default |
| ---------------- | ----------------------------------------- | --------------------------------- | -------- | ------- |
| initialValue     | `string`                                  | Initial input value               | 🚫       | `''`    |
| defaultValue     | `string`                                  | Value set in the clean action     | 🚫       | `''`    |
| initiallyLoading | `boolean`                                 | If is initially loading           | 🚫       | `false` |
| onSubmit         | `(e: FormEvent<HTMLFormElement>) => void` | Action to take on submit the form | 🚫       | -       |
| timeoutMs        | `number`                                  | Debounce timeout in ms            | 🚫       | `250`   |

### useSearchState Return

The object returned from the state hook

| Name           | Type                                            | Description                                 |
| -------------- | ----------------------------------------------- | ------------------------------------------- |
| value          | `string`                                        | Input value                                 |
| debouncedValue | `string`                                        | Input value with debouce                    |
| setValue       | `(value: string) => void`                       | Sets the value state                        |
| onSubmit       | `(e: FormEvent<HTMLFormElement>) => void`       | Action to take on submit the form           |
| clear          | `() => void`                                    | Clears the input value                      |
| showClear      | `boolean`                                       | Whether should show the clear option or not |
| loading        | `boolean`                                       | Whether is loading                          |
| setLoading     | `React.Dispatch<React.SetStateAction<boolean>>` | Sets the loading state                      |

### useQuerySearchState Params

Configuration params accepted by the state hook

| Name             | Type                                      | Description                       | Required | Default |
| ---------------- | ----------------------------------------- | --------------------------------- | -------- | ------- |
| defaultValue     | `string`                                  | Value set in the clean action     | 🚫       | `''`    |
| initiallyLoading | `boolean`                                 | If is initially loading           | 🚫       | `false` |
| onSubmit         | `(e: FormEvent<HTMLFormElement>) => void` | Action to take on submit the form | 🚫       | -       |
| timeoutMs        | `number`                                  | Debounce timeout in ms            | 🚫       | `250`   |

### useQuerySearchState Return

The object returned from the state hook is the same than useSearchState
