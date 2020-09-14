# RFC Admin Switch

- 📅 Start Date: 2020-09-14
- 🏆 Champion: @lucasaarcoverde

# Summary

An accessible Switch component, allows the user to toggle the state of a single setting on or off.

# Basic example

```jsx
import { Switch } from '@vtex/admin-ui'

function UseCase() {
  const [checked, setChecked] = React.useState(false)

  return <Switch checked={checked} onChange={() => setChecked(!checked)} />
}
```

- Using `useSwitch` hook

```jsx
import { Switch, useSwitch } from '@vtex/admin-ui'

function UseCase() {
  const switch = useSwitch({ state: false })

  return <Switch {...switch} />
}
```

# Detailed design

Since `Switch` and `Checkbox` are quite the same, just changing the `style` and the `role`, we'll use [Reakit Checkbox](https://reakit.io/docs/checkbox/) as the base to create our component.

## Types

| prop     | type                                 | description                       | required | default |
| -------- | ------------------------------------ | --------------------------------- | -------- | ------- |
| sx       | SxStyleProp                          | ThemeUI style prop                | 🚫       | {}      |
| checked  | bool                                 | Whether Switch is checked or not  | 🚫       | false   |
| required | bool                                 | Whether Switch is required or not | 🚫       | false   |
| disabled | bool                                 | Whether Switch is disabled or not | 🚫       | false   |
| label    | ReactNode                            | Switch label                      | 🚫       | -       |
| value    | string, number, undefined            | Switch value                      | 🚫       | -       |
| name     | string                               | Switch name                       | 🚫       | -       |
| onChange | func                                 | onChange event                    | 🚫       | -       |
| state    | SwitchState                          | `reakit` Checkbox state           | 🚫       | -       |
| setState | SetStateAction<boolean, SwitchState> | `reakit` Checkbox setState        | 🚫       | -       |

```ts
interface SwitchState {
  state: bool, (string,number)[]
}
```

- Should have `role="switch"`

## State

### `checked` and `onChange`

We can use our state logic, just using the properties `checked` and `onChange`.

### `useCheckboxState` hook

Reakit provides this hook that already handles state logic for us:

- Multiple switches

You can read more in [Reakit documentation](https://reakit.io/docs/checkbox/#usecheckboxstate)

#### Usage Examples

- **Multiple Switches**
  Remember that all switches need to have a value set.

```jsx
import { Switch, useSwitch } from '@vtex/admin-ui'

function UseCase() {
  const switch = useSwitch({ state: [] })

  return (
    <>
      <Switch {...switch} value="switch1" />
      <Switch {...switch} value="switch2" />
      <Switch {...switch} value="switch3" />
    </>
  )
}
```

# Drawbacks

- Using `Reakit Checkbox` grants the accessibility that we need, but can be non-intuitive with its props, for example: instead of using the prop `on` to represents the state of the switch, we use `checked`. This can be worked around by changing the interface and using the `checked` only in background.

# Adoption strategy

- This is a new feature, no breaking changes to any packages in onda.

# Education

- Document the components with its user cases, besides usage examples with all Switch's features (Multiple Switches, Simple usage, etc).

# Unresolved questions

- How the Switch label will works?
- It will have only the success palette?
