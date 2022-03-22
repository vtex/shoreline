---
title: Checkbox
path: /checkbox/
---

# Checkbox

Checkboxes are tools that customize configurations. This control has three states: unselected, selected, and undetermined. They reflect the selection of an option and its execution usually requires another control, or confirmation. By default, it renders the native `<input type="checkbox">`. It implements [WAI-ARIA Checkbox pattern](https://www.w3.org/TR/wai-aria-practices/#checkbox).

## Usage

```jsx isStatic
import { Checkbox, useCheckboxState } from '@vtex/admin-ui'

function Example() {
  const state = useCheckboxState({ state: false })

  return <Checkbox aria-label="label" state={state} />
}
```

## Examples

### Checked States

There are three checked states: `not checked`, `checked`, and `partially checked`.

```jsx live
function Example() {
  return (
    <>
      <Set>
        <Checkbox aria-label="label-1" state={{ state: false }} />
        <Checkbox
          aria-label="label-disabled-1"
          state={{ state: false }}
          disabled
        />
      </Set>
      <Set>
        <Checkbox aria-label="label-2" state={{ state: true }} />
        <Checkbox
          aria-label="label-disabled-2"
          state={{ state: true }}
          disabled
        />
      </Set>
      <Set>
        <Checkbox aria-label="label-3" state={{ state: 'indeterminate' }} />
        <Checkbox
          aria-label="label-disabled-3"
          state={{ state: 'indeterminate' }}
          disabled
        />
      </Set>
    </>
  )
}
```

### Size

There are two size variants: `small` and `regular`. By default, it renders `regular`.

```jsx live
function Example() {
  return (
    <>
      <Set>
        <Checkbox aria-label="label-small-1" size="small" />
        <Checkbox aria-label="label-1" />
      </Set>
      <Set>
        <Checkbox
          aria-label="label-small-2"
          state={{ state: true }}
          size="small"
        />
        <Checkbox aria-label="label-2" state={{ state: true }} />
      </Set>
    </>
  )
}
```

### Multiple Checkboxes

To render multiple checkboxes and store the checked values in an array, you just need to pass the hook return object to the checkboxes `state` property and define a unique `value` for each `Checkbox`.

```jsx live
function Example() {
  const state = useCheckboxState({ state: [] })

  return (
    <>
      <Heading>Selected Checkboxes: {state.state.join(', ')}</Heading>
      <Checkbox state={state} value="checkbox1" />
      <Checkbox state={state} value="checkbox2" />
      <Checkbox state={state} value="checkbox3" />
    </>
  )
}
```

### Indeterminate State

To implement a `Checkbox` that controls the state of a set of Checkboxes you'll need to combine the Checkbox tri-state: `checked`, `not checked`, and `indeterminate`.

```jsx live
function Example() {
  function useTreeState({ values }) {
    const { state: group, setState: setGroup } = useCheckboxState({ state: [] })
    const { state: items, setState: setItems } = useCheckboxState({ state: [] })

    // updates items when group is toggled
    React.useEffect(() => {
      if (group === true) {
        setItems(values)
      } else if (group === false) {
        setItems([])
      }
    }, [group, setItems, values])

    // updates group when items is toggled
    React.useEffect(() => {
      if (items instanceof Array && items.length === values.length) {
        setGroup(true)
      } else if (items instanceof Array && items.length) {
        setGroup('indeterminate')
      } else {
        setGroup(false)
      }
    }, [items, setGroup, values])

    return { group, items, setItems, setGroup }
  }

  const values = React.useMemo(() => ['Apple', 'Orange', 'Watermelon'], [])
  const { group, setGroup, items, setItems } = useTreeState({ values })

  return (
    <CheckboxGroup
      label="Fruits"
      id="fruits-checkbox-group"
      orientation="vertical"
    >
      <Label>
        <Checkbox state={{ state: group, setState: setGroup }} />
        Select All (Group Control)
      </Label>
      {values.map((fruit, key) => (
        <Label key={key}>
          <Checkbox
            state={{ state: items, setState: setItems }}
            value={fruit}
          />
          {fruit}
        </Label>
      ))}
    </CheckboxGroup>
  )
}
```

## Accessibility

- Checkbox has role `checkbox`.
- When checked, Checkbox has `aria-checked` set to `true`.
- When not checked, Checkbox has `aria-checked` set to `false`.
- When partially checked, Checkbox has `aria-checked` set to `mixed`.

### Best Practices

- When using a standalone Checkbox you must provide `aria-label` to it:

```jsx isStatic
const state = useCheckboxState()

<Checkbox state={state} aria-label="Meaningful label for Checkbox" />
```

## Props

### Checkbox

It also accepts all the props of `<input type="checkbox" />` JSX element.

| Name     | Type                | Description                         | Required | Default   |
| -------- | ------------------- | ----------------------------------- | -------- | --------- |
| disabled | `boolean`           | Whether Checkbox is disabled or not | 🚫       | `false`   |
| value    | `string, or number` | Checkbox value                      | 🚫       | -         |
| state    | `CheckboxState`     | Return of useCheckboxState hook     | 🚫       | -         |
| size     | `regular, or small` | Checkbox Size                       | 🚫       | `regular` |
| csx      | `StyleProp`         | Defines component styles            | 🚫       | `{}`      |

### useCheckboxState params

| Name  | Type     | Description     | Required | Default    |
| ----- | -------- | --------------- | -------- | ---------- | --------------------------------------------------------------------------------------------------------------------- | --- | --- |
| state | `boolean | "indeterminate" | (string  | number)[]` | Stores the state of the checkbox. If checkboxes that share this state have a value prop defined, it will be an array. | ✅  | -   |

### useCheckboxState return

| Name     | Type                                                 | Description                                                                                                           | Required | Default |
| -------- | ---------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------- | -------- | ------- |
| state    | `boolean, "indeterminate", Array<string, or number>` | Stores the state of the checkbox. If checkboxes that share this state have a value prop defined, it will be an array. | -        | -       |
| setState | `(value: SetStateAction<CheckboxState>) => void`     | Sets state                                                                                                            | -        | -       |
