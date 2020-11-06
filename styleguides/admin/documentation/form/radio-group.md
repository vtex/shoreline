---
path: /docs/form/radio-group/
---

# RadioGroup

Used to group `Radio` components.

## Behavior

```jsx
import {
  Radio,
  RadioGroup,
  useRadioState,
  Label,
  Text,
  ThemeProvider,
} from '@vtex/admin-ui'

function Example() {
  const radio = useRadioState({ state: 'oms' })
  const values = [
    'Marketplace Ecommerce',
    'B2C Commerce',
    'B2B Commerce',
    'Order Management System',
    'Disabled',
  ]

  return (
    <ThemeProvider>
      <Text variant="subtitle">Selected solution: {radio.state}</Text>
      <RadioGroup
        state={radio}
        id="radio-group"
        orientation="vertical"
        label="Solutions"
      >
        {values.map((value, key) => {
          return (
            <Label key={key}>
              <Radio
                value={value}
                state={radio}
                disabled={value === 'Disabled'}
              />
              {value}
            </Label>
          )
        })}
      </RadioGroup>
    </ThemeProvider>
  )
}
```

## Installation

```jsx static
yarn add @vtex/admin-ui
```

```jsx static
import { RadioGroup } from '@vtex/admin-ui'
```

## `useRadio` hook

You should use this hook to grants navigation accessibility in the `RadioGroup` children.

### Variation

Orientation Horizontal

```jsx
import {
  Radio,
  RadioGroup,
  useRadioState,
  Label,
  Text,
  ThemeProvider,
} from '@vtex/admin-ui'

function Example() {
  const radio = useRadioState({ state: 'oms' })
  const values = [
    'Marketplace Ecommerce',
    'B2C Commerce',
    'B2B Commerce',
    'Order Management System',
    'Disabled',
  ]

  return (
    <ThemeProvider>
      <Text variant="subtitle">Selected solution: {radio.state}</Text>
      <RadioGroup
        state={radio}
        id="radio-group"
        orientation="horizontal"
        label="Solutions"
      >
        {values.map((value, key) => {
          return (
            <Label key={key}>
              <Radio
                value={value}
                state={radio}
                disabled={value === 'Disabled'}
              />
              {value}
            </Label>
          )
        })}
      </RadioGroup>
    </ThemeProvider>
  )
}
```

## RadioGroup Label

You can easily add a label using the `label` prop, but it is also possible to add a custom one, or even not add any label (just remember to use `aria-label` prop, in this case).

- **Custom Label**

```jsx
import {
  Radio,
  RadioGroup,
  useRadioState,
  Label,
  ThemeProvider,
} from '@vtex/admin-ui'

function Example() {
  const state = useRadioState({ state: '' })

  return (
    <ThemeProvider>
      <Label htmlFor="radio-group-id">Fruits</Label>
      <RadioGroup id="radio-group-id" state={state}>
        <Label>
          <Radio state={state} value="Apple" />
          Apple
        </Label>
        <Label>
          <Radio state={state} value="Watermelon" />
          Watermelon
        </Label>
        <Label>
          <Radio state={state} value="Orange" />
          Orange
        </Label>
      </RadioGroup>
    </ThemeProvider>
  )
}
```

> ⚠️ To guarantee accessibility, always that a `RadioGroup` has a label, it should have an `id` set as well.

## RadioGroup children

Components with `role="radiogroup"` should have children of type `Radio`. We don't do this restriction on the code, so you should keep in mind that when using the `RadioGroup` the children should be of `Radio` type.

### Child label

The labels involved by `RadioGroup` are customized with `display="flex"` and `items="center"` by default. You can override these styles if necessary.

## Props

### WIP

<proptypes heading="RadioGroup" component="RadioGroup"/>
