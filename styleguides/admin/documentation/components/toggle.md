---
path: /docs/toggle/
---

# Toggle

An accessible Toggle component, allows the user to toggle the state of a single setting on or off.

## Usage

```jsx
import { Toggle, ThemeProvider } from '@vtex/admin-ui'

function Example() {
  const [checked, setChecked] = React.useState(false)

  return (
    <ThemeProvider>
      <Toggle
        ariaLabel="label"
        checked={checked}
        onChange={() => setChecked(!checked)}
      />
    </ThemeProvider>
  )
}
```

### aria-label

`aria-label` is an optional prop, but, as a `form` component, the Toggle should have a label specified to be accessible, so we grant this using this property.

#### Example

```jsx
import { Toggle, ThemeProvider } from '@vtex/admin-ui'

function Example() {
  const [checked, setChecked] = React.useState(false)

  return (
    <ThemeProvider>
      <Toggle
        checked={checked}
        aria-label="your label goes here!"
        checked={checked}
        onChange={() => setChecked(!checked)}
      />
    </ThemeProvider>
  )
}
```

## State

### `checked` and `onChange`

We can implement our state logic, just using the properties `checked` and `onChange`.

#### Example

```jsx
import { Toggle, ThemeProvider } from '@vtex/admin-ui'

function Example() {
  const [checked, setChecked] = React.useState(false)

  return (
    <ThemeProvider>
      <Toggle checked={checked} onChange={() => setChecked(!checked)} />
    </ThemeProvider>
  )
}
```

### `useToggle` hook

Since the `Toggle` has the same state behavior of a `Checkbox`, we also provide the `useToggle` hook that already handles the state logic for these use cases:

- Simple toggle
- Multiple togglees

```js
interface CheckboxStateReturn {
  /**
   * Stores the state of the toggle.
   * If togglees that share this state have defined a `value` prop, it's
   * going to be an array.
   */
  state: boolean | Array<number | string>
  /**
   * Sets `state`.
   */
  setState: React.Dispatch<React.SetStateAction<CheckboxState['state']>>
}
```

It can be very handy if you have a group of togglees and want to handle the states of each one

> 💡You can check [Reakit documentation](https://reakit.io/docs/checkbox/#usecheckboxstate) for detailed info

#### Usage Examples

- **Simple toggle**

```jsx
import { Toggle, useToggle, ThemeProvider } from '@vtex/admin-ui'

function Example() {
  const toggleProps = useToggle({ state: true })

  return (
    <ThemeProvider>
      <Toggle {...toggleProps} />
    </ThemeProvider>
  )
}
```

- **Multiple Toggles**
  Remember that all toggles need to have a value set.

```jsx
import { Toggle, useToggle, ThemeProvider } from '@vtex/admin-ui'

function Example() {
  const toggleProps = useToggle({ state: [] })

  return (
    <ThemeProvider>
      <Toggle {...toggleProps} value="toggle1" />
      <Toggle {...toggleProps} value="toggle2" />
      <Toggle {...toggleProps} value="toggle3" />
    </ThemeProvider>
  )
}
```

In this case, if we have the `first` and the `second` toggle toggled the state will be: `[toggle1, toggle2]`

## Props

<proptypes heading="Toggle" component="Toggle"/>
