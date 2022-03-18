---
title: Toggle
path: /toggle/
---

# Toggle

A Toggle is a tool that customize configurations. It represents a physical switch that allows users to turn things on or off, providing control over actions and preferences. Tapping a toggle switch is a two-step action: selection and execution. It should reflect an action that triggers a state, never both at once.

## Import

```jsx isStatic
import { Toggle } from '@vtex/admin-ui'
```

## Behavior

```jsx live
function Example() {
  const [checked, setChecked] = React.useState(false)

  return (
    <Toggle
      ariaLabel="label"
      state={{
        checked,
        onChange: () => setChecked(!checked),
      }}
    />
  )
}
```

## State

There are two ways of handling the state in the `Toggle`.

### checked and onChange

You can use the properties `checked` and `onChange` to handle if the Toggle is checked and its values have changed.

```jsx live
function Example() {
  const [toggled, setToggle] = React.useState(false)

  return <Toggle checked={toggled} onChange={() => setToggle(!toggled)} />
}
```

### useToggleState

For convenience, we also provide a hook that already implements the state logic for you. It can be very handy if you have a group of toggles and want to handle the states of each one. You should pass the hook return to the `state` property and also define a `value` for each `Toggle`.

```jsx live
function Example() {
  const toggle = useToggleState({ state: false })

  return <Toggle state={toggle} />
}
```

## Variation

### Standalone

When using a standalone `Toggle` you should provide an `aria-label` property value. As a `form` component, it should have a label specified to guarantee accessibility.

```jsx live
function Example() {
  const [toggled, setToggle] = React.useState(false)

  return (
    <Toggle
      aria-label="label"
      checked={toggled}
      onChange={() => setToggle(!toggled)}
    />
  )
}
```

### Checked States

There are two checked states: `not checked`, and `checked`.

```jsx live
function Example() {
  return (
    <>
      <Set>
        <Toggle aria-label="label-1" />
        <Toggle aria-label="label-disabled-1" disabled />
      </Set>
      <Set>
        <Toggle aria-label="label-2" checked />
        <Toggle aria-label="label-disabled-2" checked disabled />
      </Set>
    </>
  )
}
```

### Size

There are two size variants: `small`, `regular`. By default, it will render `regular`.

```jsx live
function Example() {
  return (
    <>
      <Set>
        <Toggle aria-label="label-small-1" size="small" />
        <Toggle aria-label="label-1" />
      </Set>
      <Set>
        <Toggle aria-label="label-small-2" checked size="small" />
        <Toggle aria-label="label-2" checked />
      </Set>
    </>
  )
}
```

### Multiple Toggle

Oftentimes we need to render multiple toggles and store the checked values in an array. It can be easily done using our `useToggleState` hook, you just need to pass the hook return object to the toggles `state` property and define a `value` for each `Toggle`.

```jsx live
function Example() {
  const toggle = useToggleState({ state: [] })

  return (
    <>
      <Heading>Selected Toglees: {toggle.state.join(', ')}</Heading>
      <Toggle state={toggle} value="toggle1" />
      <Toggle state={toggle} value="toggle2" />
      <Toggle state={toggle} value="toggle3" />
    </>
  )
}
```

## Props

| Name     | Type                 | Description                                                                                                                                       | Required | Default     |
| -------- | -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- | -------- | ----------- |
| checked  | `boolean`            | Checkbox's checked state. If present, it's used instead of state                                                                                  | 🚫       | -           |
| disabled | `boolean`            | Defines if the Checkbox is disabled or not                                                                                                        | 🚫       | -           |
| value    | `string, number`     | Checkbox's value is going to be used when multiple checkboxes share the same state. Checking a checkbox with value will add it to the state array | 🚫       | -           |
| state    | `CheckboxState`      | Return of `useCheckboxState` hook. You can also provide these props from your own state logic.                                                    | 🚫       | -           |
| size     | `'regular', 'small'` | Checkbox Size                                                                                                                                     | 🚫       | `'regular'` |
| children | `ReactNode`          | Button children                                                                                                                                   | 🚫       | -           |
| csx      | `StyleProp`          | Defines component styles                                                                                                                          | 🚫       | `{}`        |
