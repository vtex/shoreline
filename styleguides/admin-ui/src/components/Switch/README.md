# Admin UI Switch

An accessible Switch component, allows the user to toggle the state of a single setting on or off.

## Usage

```jsx
import { Switch } from '@vtex/admin-ui'

function UseCase() {
  const [checked, setChecked] = React.useState(false)

  return (
    <Switch
      label="label"
      checked={checked}
      onChange={() => setChecked(!checked)}
    />
  )
}
```

- Using the `useSwitch` hook

```jsx
import { Switch, useSwitch } from '@vtex/admin-ui'

function UseCase() {
  const switch = useSwitch({ state: false })

  return <Switch label="label" {...switch} />
}
```

## Types

| prop     | type                                 | description                       | required | default   |
| -------- | ------------------------------------ | --------------------------------- | -------- | --------- |
| label    | ReactNode                            | Switch label                      | ✅       | -         |
| size     | 'regular', 'small'                   | Switch size                       | 🚫       | 'regular' |
| sx       | SxStyleProp                          | ThemeUI style prop                | 🚫       | {}        |
| checked  | bool                                 | Whether Switch is checked or not  | 🚫       | false     |
| required | bool                                 | Whether Switch is required or not | 🚫       | false     |
| disabled | bool                                 | Whether Switch is disabled or not | 🚫       | false     |
| value    | string, number, undefined            | Switch value                      | 🚫       | -         |
| name     | string                               | Switch name                       | 🚫       | -         |
| onChange | func                                 | onChange event                    | 🚫       | -         |
| state    | SwitchState                          | `reakit` Checkbox state           | 🚫       | -         |
| setState | SetStateAction<boolean, SwitchState> | `reakit` Checkbox setState        | 🚫       | -         |

### Label

Every accessible input should have a label specified, which can be visible or not.

#### Example

- Visible label

```jsx
import { Switch, useSwitch } from '@vtex/admin-ui'

function UseCase() {
  const switchProps = useSwitch({ state: false })

  return <Switch label="your label goes here!" {...switchProps} />
}
```

- Hidden label

You can use the `<VisuallyHidden />` component to do this.

```jsx
import { Switch, useSwitch, VisuallyHidden } from '@vtex/admin-ui'

function UseCase() {
  const switchProps = useSwitch({ state: false })

  return (
    <Switch
      label={<VisuallyHidden>your label goes here!</VisuallyHidden>}
      {...switchProps}
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

We also provide this hook that already handles the state logic:

- Simple use case
- Multiple switches

You can read more in [Reakit documentation](https://reakit.io/docs/checkbox/#usecheckboxstate)

#### Usage Examples

- **Simple use case**

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
