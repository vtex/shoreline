---
path: /docs/form/checkbox/
---

# Checkbox

An accessible Checkbox input component.

## Behavior

```jsx
import { Checkbox, ThemeProvider } from '@vtex/admin-ui'

function Example() {
  const [checked, setChecked] = React.useState(false)

  return (
    <ThemeProvider>
      <Checkbox
        aria-label="label"
        checked={checked}
        onChange={() => setChecked(!checked)}
      />
    </ThemeProvider>
  )
}
```

## Installation

```static
yarn add @vtex/admin-ui
```

```jsx static
import { Checkbox } from '@vtex/admin-ui'
```

## Variation

### aria-label

`aria-label` is an optional prop, but, as a `form` component, the Checkbox should have a label specified to be accessible, so we grant this using this property.

```jsx
import { Checkbox, ThemeProvider } from '@vtex/admin-ui'

function Example() {
  const [checked, setChecked] = React.useState(false)

  return (
    <ThemeProvider>
      <Checkbox
        state={{ checked, onChange: () => setChecked(!checked) }}
        aria-label="your label goes here!"
      />
    </ThemeProvider>
  )
}
```

### State

#### `checked` and `onChange`

We can implement our state logic, just using the properties `checked` and `onChange`.

```jsx
import { Checkbox, ThemeProvider } from '@vtex/admin-ui'

function Example() {
  const [checked, setChecked] = React.useState(false)

  return (
    <ThemeProvider>
      <Checkbox state={{ checked, onChange: () => setChecked(!checked) }} />
    </ThemeProvider>
  )
}
```

### `useCheckbox` hook

We provide the `useCheckbox` hook that already handles the state logic for these use cases:

- Simple Checkbox
- Multiple Checkboxes
- Indeterminate state

```js
interface CheckboxStateReturn {
  /**
   * Stores the state of the Checkbox.
   * If checkboxes that share this state have defined a `value` prop, it's
   * going to be an array.
   */
  state: boolean | 'indeterminate' | Array<number | string>
  /**
   * Sets `state`.
   */
  setState: React.Dispatch<React.SetStateAction<CheckboxState['state']>>
}
```

It can be very handy if you have a group of Checkboxes and want to handle the states of each one.

> 💡 You can check [Reakit documentation](https://reakit.io/docs/checkbox/#usecheckboxstate) for detailed info

### Simple Checkbox

```jsx
import { Checkbox, useCheckboxState, ThemeProvider } from '@vtex/admin-ui'

function Example() {
  const state = useCheckboxState({ state: true })

  return (
    <ThemeProvider>
      <Checkbox state={state} />
    </ThemeProvider>
  )
}
```

### Multiple Checkboxes

Remember that all checkboxes need to have a value set!

```jsx
import { Checkbox, useCheckboxState, ThemeProvider } from '@vtex/admin-ui'

function Example() {
  const state = useCheckboxState({ state: [] })

  return (
    <ThemeProvider>
      <Checkbox state={state} value="checkbox1" />
      <Checkbox state={state} value="checkbox2" />
      <Checkbox state={state} value="checkbox3" />
    </ThemeProvider>
  )
}
```

In this case, if we have the `first` and the `second` checkbox checked the state will be: `[checkbox1, checkbox2]`

### Indeterminate state

Admin's `Checkbox` component, follows the [WAI-Aria Checkbox Pattern](https://www.w3.org/TR/wai-aria-practices/#checkbox), which means you'll have a working dual or tri-state toggle button regardless of the type of the underlying element.

- **dual-state**

  `check` and `not checked` (true, false)

- **tri-state**

  `check`, `not checked`, and `partially checked` (true, false, mixed)

> 💡 You can check [Reakit Checkbox Inderterminate](https://reakit.io/docs/checkbox/#indeterminate-or-mixed-state) documentation, for detailed info.

## Props

<proptypes heading="Checkbox" component="Checkbox" />
