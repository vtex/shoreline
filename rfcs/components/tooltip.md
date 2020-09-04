# RFC Tooltip component

- 📅 Start Date: 2020-08-28
- 🏆 Champions: @marianabianca, @matheusps

# Summary

`Tooltips` are brief pieces of information that appear on hover state over an element to clarify its meaning or use for the user.

# Basic example

```jsx
import { Tooltip } from '@vtex-component/tooltip'
;<Tooltip label="Delete" placement="right">
  <Button>Delete</Button>
</Tooltip>
```

# Detailed design

| prop      | type        | description                                           | default | required |
| --------- | ----------- | ----------------------------------------------------- | ------- | -------- |
| children  | ReactNode   | element that triggers the tooltip                     | -       | ✔️       |
| label     | String      | Text shown in the tooltip                             | -       | ✔️       |
| placement | Placement   | the placement of the tooltip relative to its children | top     | 🚫       |
| visible   | boolean     | whether the tooltip is visible or not                 | -       | 🚫       |
| sx        | SxStyleProp | Theme-ui style prop                                   | -       | 🚫       |

Placement: `"auto-start" | "auto" | "auto-end" | "top-start" | "top" | "top-end" | "right-start" | "right" | "right-end" | "bottom-end" | "bottom" | "bottom-start" | "left-end" | "left" | "left-start"`

# Drawbacks

WIP

# Alternatives

An alternative is to pass directly a listener to the tooltip children and manually change the visibility of the tooltip.

```jsx
<Tooltip visible={/** Initial state **/} />
```

# Adoption strategy

- This is a new feature, no breaking changes to any packages in `onda`.

# Education

- As with any DS component, it must be documented.

# Unresolved questions

- Missing specification about actions to trigger the tooltip.
