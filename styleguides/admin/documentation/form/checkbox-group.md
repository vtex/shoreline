---
path: /form/checkbox-group/
---

# CheckboxGroup

Used to group a set of `Checkbox` components. Has `role="group"` defined.

`Children`: Group components should have children of the same type. We don't do this restriction on the code, but you should keep in mind that when using the `CheckboxGroup` the children should have the `Checkbox` type.

`Child Label`: By default, the children labels are customized with `display: 'flex'` and `align-items: 'center'`. You can override these styles if necessary.

## Behavior

```jsx
function Example() {
  const checkbox = useCheckboxState({ state: [] })

  return (
    <CheckboxGroup id="form-group-id" label="Group label!">
      <Label>
        <Checkbox state={checkbox} value="checkbox-1" />
        Label 1
      </Label>
      <Label>
        <Checkbox state={checkbox} value="checkbox-2" />
        Label 2
      </Label>
    </CheckboxGroup>
  )
}
```

## Installation

```sh isStatic
yarn add @vtex/admin-ui
```

```jsx isStatic
import { CheckboxGroup } from '@vtex/admin-ui'
```

## Variation

### Horizontal

By default, the CheckboxGroup is rendered in a horizontal orientation. This means that the `orientation` property has a `horizontal` value.

```jsx
function Example() {
  const checkbox = useCheckboxState({ state: [] })

  return (
    <CheckboxGroup
      orientation="vertical"
      id="form-group-id"
      label="Group label!"
    >
      <Label>
        <Checkbox state={checkbox} value="checkbox-1" />
        Label 1
      </Label>
      <Label>
        <Checkbox state={checkbox} value="checkbox-2" />
        Label 2
      </Label>
    </CheckboxGroup>
  )
}
```

### Vertical

The CheckboxGroup can also be rendered in a vertical orientation. This means that the `orientation` property should have a `vertical` value.

```jsx
function Example() {
  const checkbox = useCheckboxState({ state: [] })

  return (
    <CheckboxGroup
      orientation="vertical"
      id="form-group-id"
      label="Group label!"
    >
      <Label>
        <Checkbox state={checkbox} value="checkbox-1" />
        Label 1
      </Label>
      <Label>
        <Checkbox state={checkbox} value="checkbox-2" />
        Label 2
      </Label>
    </CheckboxGroup>
  )
}
```

### Label

You can easily add a label to the CheckboxGroup using the `label` property. Just keep in mind that to guarantee accessibility, always that you define this property, you should define the `id` as well.

You can also add a custom label!

```jsx
function Example() {
  const checkbox = useCheckboxState({ state: [] })

  return (
    <>
      <Label htmlFor="cheboxgroup-id">Group Label</Label>
      <CheckboxGroup orientation="horizontal" id="cheboxgroup-id">
        <Label>
          <Checkbox state={checkbox} value="checkbox-1" />
          Label 1
        </Label>
        <Label>
          <Checkbox state={checkbox} value="checkbox-2" />
          Label 2
        </Label>
      </CheckboxGroup>
    </>
  )
}
```

## Props

<proptypes heading="CheckboxGroup" component="CheckboxGroup" />
