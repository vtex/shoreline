---
path: /docs/toggle/
---

# Toggle

An accessible Toggle component, allows the user to toggle the state of a single setting on or off.

## Behavior

```jsx
import { Toggle, ThemeProvider } from '@vtex/admin-ui'

function Example() {
  const [checked, setChecked] = React.useState(false)

  return (
    <ThemeProvider>
      <Toggle
        ariaLabel="label"
        state={{
          checked,
          onChange: () => setChecked(!checked),
        }}
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
import { Toggle } from '@vtex/admin-ui'
```

## Variation

Size

```jsx
import { Toggle, ThemeProvider, Text } from '@vtex/admin-ui'

function Example() {
  const [checked, setChecked] = React.useState(false)

  return (
    <ThemeProvider>
      <Text el="p" variant="body">
        Regular
      </Text>
      <Toggle
        checked={checked}
        checked={checked}
        size="regular"
        onChange={() => setChecked(!checked)}
      />
      <Text el="p" variant="body">
        Small
      </Text>
      <Toggle
        checked={checked}
        checked={checked}
        size="small"
        onChange={() => setChecked(!checked)}
      />
    </ThemeProvider>
  )
}
```

Disabled

```jsx
import { Toggle, ThemeProvider } from '@vtex/admin-ui'

function Example() {
  const [checked, setChecked] = React.useState(false)

  return (
    <ThemeProvider>
      <Toggle
        checked={checked}
        checked={checked}
        disabled
        onChange={() => setChecked(!checked)}
      />
    </ThemeProvider>
  )
}
```

## Customization

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
        state={{
          checked,
          onChange: () => setChecked(!checked),
        }}
      />
    </ThemeProvider>
  )
}
```

### `checked` and `onChange`

We can implement our state logic, just using the properties `checked` and `onChange`.

#### Example

```jsx
import { Toggle, ThemeProvider } from '@vtex/admin-ui'

function Example() {
  const [checked, setChecked] = React.useState(false)

  return (
    <ThemeProvider>
      <Toggle
        state={{
          checked,
          onChange: () => setChecked(!checked),
        }}
      />
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
import { Toggle, useToggleState, ThemeProvider } from '@vtex/admin-ui'

function Example() {
  const state = useToggleState({ state: true })

  return (
    <ThemeProvider>
      <Toggle state={state} />
    </ThemeProvider>
  )
}
```

- **Multiple Toggles**
  Remember that all toggles need to have a value set.

```jsx
import { Toggle, useToggleState, ThemeProvider } from '@vtex/admin-ui'

function Example() {
  const state = useToggleState({ state: [] })

  return (
    <ThemeProvider>
      <Toggle state={state} value="toggle1" />
      <Toggle state={state} value="toggle2" />
      <Toggle state={state} value="toggle3" />
    </ThemeProvider>
  )
}
```

In this case, if we have the `first` and the `second` toggle toggled the state will be: `[toggle1, toggle2]`

## Props

<proptypes heading="Toggle" component="Toggle"/>
