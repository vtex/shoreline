---
path: /docs/checkbox-group/
---

# CheckboxGroup

Used to group `Checkbox` components.

## Behavior

```jsx
import { CheckboxGroup, Label, Checkbox, ThemeProvider } from '@vtex/admin-ui'

function Example() {
  return (
    <ThemeProvider>
      <CheckboxGroup
        orientation="horizontal"
        id="form-group-id"
        label="Group label!"
      >
        <Label>
          <Checkbox />
          Label 1
        </Label>
        <Label>
          <Checkbox />
          Label 2
        </Label>
      </CheckboxGroup>
    </ThemeProvider>
  )
}
```

## Installation

```static
yarn add @vtex/admin-ui
```

```jsx static
import { CheckboxGroup } from '@vtex/admin-ui'
```

## Variation
### Vertical

```jsx
import { CheckboxGroup, Label, Checkbox, ThemeProvider } from '@vtex/admin-ui'

function Example() {
  return (
    <ThemeProvider>
      <CheckboxGroup
        orientation="vertical"
        id="form-group-id"
        label="Group label!"
      >
        <Label>
          <Checkbox />
          Label 1
        </Label>
        <Label>
          <Checkbox />
          Label 2
        </Label>
      </CheckboxGroup>
    </ThemeProvider>
  )
}
```

### CheckboxGroup Label

You can easily add a label using the `label` prop.

- **Without using label prop**

If you want to add a custom label, that differs of the defined one in the `label` prop, it is possible.

```jsx
import { CheckboxGroup, Label, Checkbox, ThemeProvider } from '@vtex/admin-ui'

function Example() {
  return (
    <ThemeProvider>
      <Label htmlFor="cheboxgroup-id">Group Label</Label>
      <CheckboxGroup orientation="horizontal" id="cheboxgroup-id">
        <Label>
          <Checkbox />
          Label 1
        </Label>
      </CheckboxGroup>
    </ThemeProvider>
  )
}
```

> ⚠️ To guarantee accessibility, always check that a `CheckboxGroup` has a label, it should have an `id` set as well.

### CheckboxGroup items

Components with `role="group"` should have children of the same type. We don't do this restriction on the code, so you should keep in mind that when using the `CheckboxGroup` the children should be of `Checkbox` type.

#### Items label

The labels involved by `CheckboxGroup` are customized with `display="flex"` and `items="center"` by default. You can override these styles if necessary.

<proptypes heading="CheckboxGroup" component="CheckboxGroup" />
