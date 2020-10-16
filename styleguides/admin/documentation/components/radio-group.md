---
path: /docs/radio-group/
---

# RadioGroup

Used to group `Radio` components.

## Usage

```jsx
import {
  Radio,
  RadioGroup,
  useRadio,
  Label,
  Text,
  ThemeProvider,
} from '@vtex/admin-ui'

function Example() {
  const radio = useRadio({ state: 'oms' })
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
        {...radio}
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

## `useRadio` hook

You should use this hook to grants navigation accessibility in the `RadioGroup` children.

### Usage

```jsx
import {
  Radio,
  RadioGroup,
  useRadio,
  Label,
  Text,
  ThemeProvider,
} from '@vtex/admin-ui'

function Example() {
  const radio = useRadio({ state: 'oms' })
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
        {...radio}
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

> 💡 You can check [Reakit documentation](https://reakit.io/docs/radio/#useradiostate) for detailed info

## RadioGroup Label

You can easily add a label using the `label` prop, but it is also possible to add a custom one, or even not add any label (just remember to use `aria-label` prop, in this case).

- **Custom Label**

```jsx
import {
  Radio,
  RadioGroup,
  useRadio,
  Label,
  ThemeProvider,
} from '@vtex/admin-ui'

function Example() {
  const state = useRadio({ state: '' })

  return (
    <ThemeProvider>
      <Label htmlFor="radio-group-id">Fruits</Label>
      <RadioGroup id="radio-group-id" {...state}>
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

<proptypes heading="RadioGroup" component="RadioGroup"/>
