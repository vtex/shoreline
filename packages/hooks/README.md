# @vtex/onda-hooks

Onda shared hooks

Documentation site: https://admin-ui-docs.vercel.app/guide/get-started/

[![NPM](https://img.shields.io/npm/v/@vtex/onda-hooks.svg)](https://www.npmjs.com/package/@vtex/onda-hooks)

## Installation

React `v16.8` and above is required.

```sh
yarn add @vtex/onda-hooks
```

## Hooks

### useDebounce

Keeps a debounced value.

```jsx
function Input() {
  const [text, setText] = React.useState('Hello')
  const [value] = useDebounce(text, 1000)

  return (
    <div>
      <input
        defaultValue={'Hello'}
        onChange={(e) => {
          setText(e.target.value)
        }}
      />
      <p>Actual value: {text}</p>
      <p>Debounce value: {value}</p>
    </div>
  )
}
```

### useDebouncedCallback

Besides useDebounce for values you can debounce callbacks, that is the more commonly understood kind of debouncing

```jsx
function Input({ defaultValue }) {
  const [value, setValue] = React.useState(defaultValue)
  // Debounce callback
  const debounced = useDebouncedCallback(
    // function
    (value) => {
      setValue(value)
    },
    // delay in ms
    1000
  )

  // you should use `e => debounced(e.target.value)` as react works with synthetic events
  return (
    <div>
      <input
        defaultValue={defaultValue}
        onChange={(e) => debounced(e.target.value)}
      />
      <p>Debounced value: {value}</p>
    </div>
  )
}
```

### useDebouncedState

Keeps the state of a debounced callback.

```jsx
function Input() {
  const [state, setState] = useDebouncedState({
    initialState: '',
    timeoutMs: 250,
  })

  return (
    <div>
      <input
        style={{
          border: '1px solid #333',
        }}
        defaultValue="Default value"
        onChange={(e) => setState(e.target.value)}
      />
      <p>Debouced state: {state}</p>
    </div>
  )
}
```

You can also use `produce` to apply state changes.

```jsx isStatic
const [double, setDouble] = useDebouncedState({
  initialState: 1,
  timeoutMs: 250,
  // the state will always be multiplied by two
  produce: (s) => s * 2,
})

setDouble(20) // the state will be 40
```

### useDebouncedCache

Same as `useDebouncedState` but it keeps the state, debounced state and setState

```jsx
function Input() {
  const [state, debouncedState, setState] = useDebouncedCache({
    initialState: '',
    timeoutMs: 250,
  })

  return (
    <div>
      <input
        style={{
          border: '1px solid #333',
        }}
        value={state}
        onChange={(e) => setState(e.target.value)}
      />
      <p>State: {state}</p>
      <p>Debouced state: {debouncedState}</p>
    </div>
  )
}
```

Like `useDebouncedState`, you can use `produce` to apply state changes.

```jsx isStatic
const [double, debouncedDouble setDouble] = useDebouncedState({
  initialState: 1,
  timeoutMs: 250,
  // the state will always be multiplied by two
  produce: (s) => s * 2,
})

setDouble(20) // the state will be 40
// after 250ms, the debouncedDouble will be 40
```

### useQueryState

Persisted keys states in query string params (URL).
Use setState to update the query string params. The state will also reflect the changes.
initial state will keep the value in the amount of component (page load)

```jsx
function Input() {
  const [initialState, setState, state] = useQueryState({
    keys: ['search'],
  })

  return (
    <div>
      <input
        defaultValue={initialSate}
        onChange={(e) => {
          setState({ serach: e.target.value })
        }}
      />
      <p>Actual value: {state.search}</p>
      <p>Initial value: {initialState.search}</p>
    </div>
  )
}
```
