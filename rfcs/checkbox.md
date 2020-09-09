# RFC Admin Checkbox

- 📅 Start Date: 2020-09-09
- 🏆 Champion: @lucasaarcoverde

# Summary

Accessible Checkbox component that follows [WAI-ARIA Checkbox Pattern](https://www.w3.org/TR/wai-aria-practices/#checkbox).

# Basic example

```jsx
import { Checkbox } from '@vtex/admin-ui'

function UseCase() {
  const [checked, setChecked] = React.useState(false)

  return <Checkbox checked={checked} onChange={() => setChecked(!checked)} />
}
```

- Using `useCheckbox` hook

```jsx
import { Checkbox, useCheckbox } from '@vtex/admin-ui'

function UseCase() {
  const checkbox = useCheckbox({ state: false })

  return <Checkbox {...checkbox} />
}
```

# Detailed design

We'll use [Reakit Checkbox](https://reakit.io/docs/checkbox/) as the base to create our component

## Types

| prop     | type                                | description                         | required | default |
| -------- | ----------------------------------- | ----------------------------------- | -------- | ------- |
| sx       | SxStyleProp                         | ThemeUI style prop                  | 🚫       | {}      |
| checked  | bool                                | Whether checkbox is checked or not  | 🚫       | false   |
| required | bool                                | Whether checkbox is required or not | 🚫       | false   |
| disabled | bool                                | Whether checkbox is disabled or not | 🚫       | false   |
| label    | ReactNode                           | Checkbox label                      | 🚫       | -       |
| value    | string, number, undefined           | Checkbox value                      | 🚫       | -       |
| name     | string                              | Checkbox name                       | 🚫       | -       |
| onChange | func                                | onChange event                      | 🚫       | -       |
| state    | CheckState                          | `reakit` Checkbox state             | 🚫       | -       |
| setState | SetStateAction<boolean, CheckState> | `reakit` Checkbox setState          | 🚫       | -       |

```ts
interface CheckState {
  state: bool | "indeterminate", (string,number)[]
}
```

## State

### `checked` and `onChange`

We can use our state logic using the properties `checked` and `onChange` event.

### `useCheckboxState` hook

Reakit also provides this hook that already handles state logic for us:

- Multiple checkboxes
- Partially checked
- Checkbox tree is easier to implement using it

You can read more in [Reakit documentation](https://reakit.io/docs/checkbox/#usecheckboxstate)

#### Usage Examples

- **Multiple Checkboxes**
  Remember that all checkboxes need to have a value set.

```jsx
import { Checkbox, useCheckbox } from '@vtex/admin-ui'

function UseCase() {
  const checkbox = useCheckbox({ state: [] })

  return (
    <>
      <Checkbox {...checkbox} value="checkbox1" />
      <Checkbox {...checkbox} value="checkbox2" />
      <Checkbox {...checkbox} value="checkbox3" />
    </>
  )
}
```

- **Partially Checked**

```jsx
import { Checkbox, useCheckbox } from '@vtex/admin-ui'

function UseCase() {
  const checkbox = useCheckbox({ state: 'indeterminate' })

  return (
    <>
      <Checkbox {...checkbox} value="checkbox1" />
      <Checkbox {...checkbox} value="checkbox2" />
      <Checkbox {...checkbox} value="checkbox3" />
    </>
  )
}
```

# Drawbacks

- When we have multiple checkboxes the state has only a list of values, without indicating which checkboxes are checked (In `Styleguide v9` it saves an object `{ label: ..., value:... }`). Maybe it can be a drawback.

# Adoption strategy

- This is a new feature, no breaking changes to any packages in onda.

# Education

- Document the components with its user cases, besides usage examples with all Checkbox's features (Multiple checkboxes, Partially Checked, Simple usage, etc).

# Unresolved questions

- How the Checkbox label will works?
- It will have only the primary color?
