# Admin UI Switch

An accessible Switch component, allows the user to toggle the state of a single setting on or off.

## Usage

```jsx
import { Switch } from '@vtex/admin-ui'

function UseCase() {
  const [checked, setChecked] = React.useState(false)

  return (
    <Switch
      ariaLabel="label"
      checked={checked}
      onChange={() => setChecked(!checked)}
    />
  )
}
```

## Types

| prop     | type                                 | description                       | required | default   |
| -------- | ------------------------------------ | --------------------------------- | -------- | --------- |
| size     | 'regular', 'small'                   | Switch size                       | 🚫       | 'regular' |
| sx       | SxStyleProp                          | ThemeUI style prop                | 🚫       | {}        |
| checked  | bool                                 | Whether Switch is checked or not  | 🚫       | false     |
| required | bool                                 | Whether Switch is required or not | 🚫       | false     |
| disabled | bool                                 | Whether Switch is disabled or not | 🚫       | false     |
| value    | string, number                       | Switch value                      | 🚫       | -         |
| name     | string                               | Switch name                       | 🚫       | -         |
| onChange | func                                 | onChange event                    | 🚫       | -         |
| state    | SwitchState                          | `reakit` Checkbox state           | 🚫       | -         |
| setState | SetStateAction<boolean, SwitchState> | `reakit` Checkbox setState        | 🚫       | -         |

### aria-label

`aria-label` is an optional prop, but, as a `form` component, the Switch should have a label specified to be accessible, so we grant this using this property.

#### Example

```jsx
import { Switch } from '@vtex/admin-ui'

function UseCase() {
  const [checked, setChecked] = React.useState(false)

  return (
    <Switch
      checked={checked}
      aria-label="your label goes here!"
      checked={checked}
      onChange={() => setChecked(!checked)}
    />
  )
}
```

## State

### `checked` and `onChange`

We can implement our state logic, just using the properties `checked` and `onChange`.

#### Example

```jsx
import { Switch } from '@vtex/admin-ui'

function UseCase() {
  const [checked, setChecked] = React.useState(false)

  return <Switch checked={checked} onChange={() => setChecked(!checked)} />
}
```

### `useSwitch` hook

Since the `Switch` has the same state behavior of a `Checkbox`, we also provide the `useSwitch` hook that already handles the state logic for these use cases:

- Simple switch
- Multiple switches

```ts
interface CheckboxStateReturn {
  /**
   * Stores the state of the switch.
   * If switches that share this state have defined a `value` prop, it's
   * going to be an array.
   */
  state: boolean | Array<number | string>
  /**
   * Sets `state`.
   */
  setState: React.Dispatch<React.SetStateAction<CheckboxState['state']>>
}
```

It can be very handy if you have a group of switches and want to handle the states of each one

> 💡You can check [Reakit documentation](https://reakit.io/docs/checkbox/#usecheckboxstate) for detailed info

#### Usage Examples

- **Simple switch**

```jsx
import { Switch, useSwitch } from '@vtex/admin-ui'

function UseCase() {
  const switchProps = useSwitch({ state: true })

  return <Switch {...switchProps} />
}
```

- **Multiple Switches**
  Remember that all switches need to have a value set.

```jsx
import { Switch, useSwitch } from '@vtex/admin-ui'

function UseCase() {
  const switchProps = useSwitch({ state: [] })

  return (
    <>
      <Switch {...switchProps} value="switch1" />
      <Switch {...switchProps} value="switch2" />
      <Switch {...switchProps} value="switch3" />
    </>
  )
}
```

In this case, if we have the `first` and the `second` switch toggled the state will be: `[switch1, switch2]`
