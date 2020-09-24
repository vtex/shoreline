# RFC Admin UI CheckboxGroup

- 📅 Start Date: 2020-09-23
- 🏆 Champions: @lucasaarcoverde

# Summary

Used to group `Checkbox` components.

# Basic example

```jsx
import { CheckboxGroup, Label, Checkbox } from '@vtex/admin-ui'

function UseCase() {
  return (
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
  )
}
```

# Detailed design

## Types

| prop        | type                     | description               | required | default      |
| ----------- | ------------------------ | ------------------------- | -------- | ------------ |
| id          | string                   | CheckboxGroup identifier  | 🚫       | -            |
| orientation | 'vertical', 'horizontal' | CheckboxGroup orientation | 🚫       | 'horizontal' |
| label       | string                   | CheckboxGroup label       | 🚫       | -            |
| sx          | SxStyleProp              | ThemeUI style prop        | 🚫       | {}           |

### CheckboxGroup Label

The user can easily add a label using `label` prop.

- **Without using label prop**

If the user want to add a custom label, that differs of the defined one in the `label` prop, it is possible.

```jsx
import { CheckboxGroup, Label, Checkbox } from '@vtex/admin-ui'

function UseCase() {
  return (
    <Label htmlFor={CheckboxGroupId} {...customization}>Group Label</Label>
    <CheckboxGroup
      orientation="horizontal"
      id={CheckboxGroupId}
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
  )
}
```

> ⚠️ To guarantee accessibility, always that a `CheckboxGroup` has a label, it should have an `id` set as well.

### CheckboxGroup items

Components with `role="group"` should have children of the same type. We don't do this restriction on the code, so the user should keep in mind that when using the `CheckboxGroup` the children should be of `Checkbox` type.

#### Items label

We decided to haven't a `CheckboxGroup.Item` that receives a Label, because it can be a non-flexible approach, for example, in this use case:

- **When the user wants CheckboxGroup items Labeled on the right instead of left**

  To cover this case, we would need to add a new `prop` that handles the label position and also add this logic in the code.

Just letting the user cover this case turns the component easier to use.

##### Example:

```jsx
<CheckboxGroup>
  <Label display="flex" direction="row">
    Label 1
    <Checkbox />
  </Label>
</CheckboxGroup>
```

# Drawbacks

The user will write more code and will have to guarantee the style of the `CheckboxGroup` items. In another way, the component will not be a design blocker.

# Alternatives

Another approach is don't having a `label` prop in the `CheckboxGroup`, but it would imply that whenever the user wants to implement a label to the group, it will need to write the `Label` component and guarantee accessibility and style to each group's label.

In cases that the `CheckboxGroup` is inside a flex container is necessary to involve both `Label` and `CheckboxGroup` within a `Box`. Using the `label` prop we just need to implement the `CheckboxGroup`.

# Adoption strategy

- This is a new feature, no breaking changes to any packages in onda.

# Education

- Document the components with its user cases, besides usage examples with all CheckboxGroup's features
