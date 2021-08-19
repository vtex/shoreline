---
path: /radio-group/
---

# RadioGroup

Used to group a set of `Radio` components. Has `role="radiogroup"` defined.

`Children`: Group components should have children of the same type. We don't do this restriction on the code, but you should keep in mind that when using the `RadioGroup` the children should have the `Radio` type.

`Child Label`: By default, the children labels are customized with `display: 'flex'` and `align-items: 'center'`. You can override these styles if necessary.

## Behavior

```jsx
function Example() {
  const radio = useRadioState()
  return (
    <>
      <Heading>Selected Radio: {radio.state}</Heading>
      <RadioGroup state={radio} id="radio-group" label="Solutions">
        <Label>
          <Radio value="Marketplace Ecommerce" state={radio} />
          Marketplace Ecommerce
        </Label>
        <Label>
          <Radio value="B2C Commerce" state={radio} />
          B2C Commerce
        </Label>
        <Label>
          <Radio value="Order Management System" state={radio} />
          Order Management System
        </Label>
      </RadioGroup>
    </>
  )
}
```

## Installation

```sh isStatic
yarn add @vtex/admin-ui
```

```jsx isStatic
import { RadioGroup } from '@vtex/admin-ui'
```

## `useRadioState` hook

To guarantee accessibility and keyboard navigation along with the `Radios` inside the `RadioGroup`, we provide a hook that already implements the state logic for you. You should pass the hook return to the `state` property to the `RadioGroup` and all `Radio` children.

## Variation

### Horizontal

By default, the RadioGroup is rendered in a horizontal orientation. This means that the `orientation` property has a `horizontal` value.

```jsx
function Example() {
  const radio = useRadioState()
  return (
    <>
      <Heading>Selected Radios: {radio.state}</Heading>
      <RadioGroup state={radio} id="radio-group" label="Solutions">
        <Label>
          <Radio value="Marketplace Ecommerce" state={radio} />
          Marketplace Ecommerce
        </Label>
        <Label>
          <Radio value="B2C Commerce" state={radio} />
          B2C Commerce
        </Label>
        <Label>
          <Radio value="Order Management System" state={radio} />
          Order Management System
        </Label>
      </RadioGroup>
    </>
  )
}
```

### Vertical

The RadioGroup can also be rendered in a vertical orientation. This means that the `orientation` property should have a `vertical` value.

```jsx
function Example() {
  const radio = useRadioState()
  return (
    <>
      <Heading>Selected Radio: {radio.state}</Heading>
      <RadioGroup
        state={radio}
        id="radio-group"
        orientation="vertical"
        label="Solutions"
      >
        <Label>
          <Radio value="Marketplace Ecommerce" state={radio} />
          Marketplace Ecommerce
        </Label>
        <Label>
          <Radio value="B2C Commerce" state={radio} />
          B2C Commerce
        </Label>
        <Label>
          <Radio value="Order Management System" state={radio} />
          Order Management System
        </Label>
      </RadioGroup>
    </>
  )
}
```

### Label

You can easily add a label to the RadioGroup using the `label` property. Just keep in mind that to guarantee accessibility, always that you define this property, you should define the `id` as well.

You can also add a custom label!

```jsx
function Example() {
  const state = useRadioState({ state: '' })

  return (
    <>
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
    </>
  )
}
```

## Props

<proptypes heading="RadioGroup" component="RadioGroup"/>
