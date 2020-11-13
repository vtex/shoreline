---
path: /form/checkbox/
---

# Checkbox

Checkboxes are used when a user needs to select one or more values from a series of options, or they can be used as a dual or tri-state toggle button. By default, it renders the native `<input type="checkbox">`.

- dual-state: `check` and `not checked` (true, false)

- tri-state: `check`, `not checked`, and `partially checked` (true, false, mixed)

## Behavior

It receives the same props as controlled inputs, such as checked and onChange:

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

## State

There are two ways of handling the state in our `Checkbox`.

### checked and onChange

You can use the properties `checked` and `onChange` to handle if the Checkbox is checked and its values have changed.

```jsx
import { Checkbox, ThemeProvider } from '@vtex/admin-ui'

function Example() {
  const [checked, setChecked] = React.useState(false)

  return (
    <ThemeProvider>
      <Checkbox checked={checked} onChange={() => setChecked(!checked)} />
    </ThemeProvider>
  )
}
```

### useCheckboxState

For convenience, we also provide a hook that already implements the state logic for you. It can be very handy if you have a group of checkboxes and want to handle the states of each one. You should pass the hook return to the `state` property.

```jsx
import { Checkbox, useCheckboxState, ThemeProvider } from '@vtex/admin-ui'

function Example() {
  const checkboxState = useCheckboxState({ state: false })

  return (
    <ThemeProvider>
      <Checkbox state={checkboxState} />
    </ThemeProvider>
  )
}
```

## Variation

### Standalone

When using a standalone `Checkbox` you should provide an `aria-label` property value. As a `form` component, it should have a label specified to guarantee accessibility.

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

### Checked States

There are three checked states: `not checked`, `checked`, and `partially checked`.

```jsx
import { Checkbox, Set, ThemeProvider } from '@vtex/admin-ui'

function Example() {
  return (
    <ThemeProvider>
      <Set>
        <Checkbox aria-label="label-1" />
        <Checkbox aria-label="label-disabled-1" disabled />
      </Set>
      <Set>
        <Checkbox aria-label="label-2" checked />
        <Checkbox aria-label="label-disabled-2" checked disabled />
      </Set>
      <Set>
        <Checkbox aria-label="label-3" state={{ state: 'indeterminate' }} />
        <Checkbox
          aria-label="label-disabled-3"
          state={{ state: 'indeterminate' }}
          disabled
        />
      </Set>
    </ThemeProvider>
  )
}
```

### Size

There are two size variants: `small`, `regular`. By default, it will render `regular`.

```jsx
import { Checkbox, Set, ThemeProvider } from '@vtex/admin-ui'

function Example() {
  return (
    <ThemeProvider>
      <Set>
        <Checkbox aria-label="label-small-1" size="small" />
        <Checkbox aria-label="label-1" />
      </Set>
      <Set>
        <Checkbox aria-label="label-small-2" checked size="small" />
        <Checkbox aria-label="label-2" checked />
      </Set>
    </ThemeProvider>
  )
}
```

### Multiple Checkboxes

Oftentimes we need to render multiple checkboxes and store the checked values in an array. It can be easily done using our `useCheckboxState` hook, you just need to pass the hook return object to the checkboxes `state` property and define a `value` for each `Checkbox`.

```jsx
import {
  Checkbox,
  Heading,
  useCheckboxState,
  ThemeProvider,
} from '@vtex/admin-ui'

function Example() {
  const state = useCheckboxState({ state: [] })

  return (
    <ThemeProvider>
      <Heading>Selected Checkboxes: {state.state.join(', ')}</Heading>
      <Checkbox state={state} value="checkbox1" />
      <Checkbox state={state} value="checkbox2" />
      <Checkbox state={state} value="checkbox3" />
    </ThemeProvider>
  )
}
```

### Indeterminate State

Sometimes you need to implement a Checkbox that controls the state of a set of Checkboxes. It can be easily done using our `useCheckboxState` hook combined with our Checkbox tri-state: `checked`, `not checked`, and `indeterminate`.

```jsx
import React from 'react'
import {
  Checkbox,
  Set,
  Box,
  useCheckboxState,
  Label,
  CheckboxGroup,
  ThemeProvider,
} from '@vtex/admin-ui'

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
    <ThemeProvider>
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
    </ThemeProvider>
  )
}
```

## Props

<proptypes heading="Checkbox" component="Checkbox" />
