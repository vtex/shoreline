# RFC Admin UI FormGroup

- 📅 Start Date: 2020-09-23
- 🏆 Champions: @lucasaarcoverde

# Summary

FormGroup component

# Basic example

```jsx
import { FormGroup, Label, Toggle } from '@vtex/admin-ui'

function UseCase() {
  return (
    <FormGroup
      orientation="horizontal"
      id="form-group-id"
      label={(props) => <Label {...props}>Group label!</Label>}
    >
      <Label>
        <Toggle />
        Label 1
      </Label>
      <Label>
        <Toggle />
        Label 2
      </Label>
    </FormGroup>
  )
}
```

# Detailed design

## Types

| prop        | type                                      | description           | required | default      |
| ----------- | ----------------------------------------- | --------------------- | -------- | ------------ |
| id          | string                                    | FormGroup identifier  | 🚫       | -            |
| orientation | 'vertical', 'horizontal'                  | FormGroup orientation | 🚫       | 'horizontal' |
| label       | (props: FormGroupLabelProps) => ReactNode | FormGroup label       | 🚫       | -            |
| sx          | SxStyleProp                               | ThemeUI style prop    | 🚫       | {}           |

### FormGroup Label

- Label render props

```ts
interface FormGroupLabelProps {
  htmlFor: string
  c: Colors
  fv: FontVariation
  fs: FontSizes
}

props = {
  htmlFor: FormGroupId,
  c: 'muted.0',
  fv: 'regular',
  fs: '0',
}
```

I thought using the `label` like this because we can provide the style needed and continue giving the flexibility to our user to create a custom label if needed.

#### Example

- **Using `label` prop**

It works like a shorthand, so the user can include a `label` easier without worrying about styling and positioning it.

```jsx
import { FormGroup, Label } from '@vtex/admin-ui'

function UseCase() {
  return (
    <FormGroup
      orientation="horizontal"
      id="form-group-id"
      label={(props) => (
        <Label {...props} c="muted.3">
          Group label!
        </Label>
      )}
    >
      <Label>
        <Toggle />
        Label 1
      </Label>
      <Label>
        <Toggle />
        Label 2
      </Label>
    </FormGroup>
  )
}
```

> ⚠️ To guarantee accessibility, always that a `FormGroup` has a `label` should have an `id` set as well.

- **Without using label prop**

The user will have the flexibility to put the `Label` anywhere and customize it from scratch.

```jsx
import { FormGroup, Label } from '@vtex/admin-ui'

function UseCase() {
  return (
    <Label htmlFor={FormGroupId}>Group Label</Label>
    <FormGroup
      orientation="horizontal"
      id={FormGroupId}
      label={(props) => (
        <Label {...props} c="muted.3">
          Group label!
        </Label>
      )}
    >
      <Label>
        <Toggle />
        Label 1
      </Label>
      <Label>
        <Toggle />
        Label 2
      </Label>
    </FormGroup>
  )
}
```

> ⚠️ To guarantee accessibility, always that a `FormGroup` has a label, it should have an `id` set as well.

### FormGroup items

Components with `role="group"` should have children of the same type. We don't do this restriction on the code, so the user should keep it in mind when using the `FormGroup` component.

#### Items label

We decided to haven't a `FormGroup.Item` that receives a Label, because it can be a non-flexible approach, for example, in this use case:

- When the user wants FormGroup items Labeled on the right instead of left
  To cover this case, we would need to add a new `prop` that handles the label position and also add this logic in the code.

Just letting the user cover this case turns the component easier to use.
Example:

```jsx
<FormGroup>
  <Label display="flex" direction="row">
    Label 1
    <Toggle />
  </Label>
</FormGroup>
```

# Drawbacks

The user will write more code and will have to guarantee the style of the `FormGroup` items. In another way, the component will not be a design blocker.

# Alternatives

Another approach is don't having a `label` prop in the `FormGroup`, but it would imply that whenever the user wants to implement a label to the group, it will need to write the `Label` component and guarantee accessibility and style to each group's label.

In cases that the `FormGroup` is inside a flex container is necessary to involve both `Label` and `FormGroup` within a `Box`. Using the `label` prop we just need to implement the `FormGroup`.

# Adoption strategy

- This is a new feature, no breaking changes to any packages in onda.

# Education

- Document the components with its user cases, besides usage examples with all FormGroups's features
