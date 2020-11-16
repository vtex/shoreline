---
path: /form/toggle/
---

# Toggle

`<Toggle>` is essentially a customized checkbox with a toggleable interface to toggle between an enable and disabled state.

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

## State

There are two ways of handling the state in the `Toggle`.

### checked and onChange

You can use the properties `checked` and `onChange` to handle if the Toggle is checked and its values have changed.

```jsx
import { Toggle, ThemeProvider } from '@vtex/admin-ui'

function Example() {
  const [toggled, setToggle] = React.useState(false)

  return (
    <ThemeProvider>
      <Toggle checked={toggled} onChange={() => setToggle(!toggled)} />
    </ThemeProvider>
  )
}
```

### useToggleState

For convenience, we also provide a hook that already implements the state logic for you. It can be very handy if you have a group of toggles and want to handle the states of each one. You should pass the hook return to the `state` property and also define a `value` for each `Toggle`.

```jsx
import { Toggle, useToggleState, ThemeProvider } from '@vtex/admin-ui'

function Example() {
  const toggle = useToggleState({ state: false })

  return (
    <ThemeProvider>
      <Toggle state={toggle} />
    </ThemeProvider>
  )
}
```

## Variation

### Standalone

When using a standalone `Toggle` you should provide an `aria-label` property value. As a `form` component, it should have a label specified to guarantee accessibility.

```jsx
import { Toggle, ThemeProvider } from '@vtex/admin-ui'

function Example() {
  const [toggled, setToggle] = React.useState(false)

  return (
    <ThemeProvider>
      <Toggle
        aria-label="label"
        checked={toggled}
        onChange={() => setToggle(!toggled)}
      />
    </ThemeProvider>
  )
}
```

### Checked States

There are two checked states: `not checked`, and `checked`.

```jsx
import { Toggle, Set, ThemeProvider } from '@vtex/admin-ui'

function Example() {
  return (
    <ThemeProvider>
      <Set>
        <Toggle aria-label="label-1" />
        <Toggle aria-label="label-disabled-1" disabled />
      </Set>
      <Set>
        <Toggle aria-label="label-2" checked />
        <Toggle aria-label="label-disabled-2" checked disabled />
      </Set>
    </ThemeProvider>
  )
}
```

### Size

There are two size variants: `small`, `regular`. By default, it will render `regular`.

```jsx
import { Toggle, Set, ThemeProvider } from '@vtex/admin-ui'

function Example() {
  return (
    <ThemeProvider>
      <Set>
        <Toggle aria-label="label-small-1" size="small" />
        <Toggle aria-label="label-1" />
      </Set>
      <Set>
        <Toggle aria-label="label-small-2" checked size="small" />
        <Toggle aria-label="label-2" checked />
      </Set>
    </ThemeProvider>
  )
}
```

### Multiple Toggle

Oftentimes we need to render multiple toggles and store the checked values in an array. It can be easily done using our `useToggleState` hook, you just need to pass the hook return object to the toggles `state` property and define a `value` for each `Toggle`.

```jsx
import { Toggle, Heading, useToggleState, ThemeProvider } from '@vtex/admin-ui'

function Example() {
  const toggle = useToggleState({ state: [] })

  return (
    <ThemeProvider>
      <Heading>Selected Toglees: {toggle.state.join(', ')}</Heading>
      <Toggle state={toggle} value="toggle1" />
      <Toggle state={toggle} value="toggle2" />
      <Toggle state={toggle} value="toggle3" />
    </ThemeProvider>
  )
}
```

## Props

<proptypes heading="Toggle" component="Toggle"/> -->
