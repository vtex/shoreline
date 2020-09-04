# RFC Template <REPLACE_WITH_TITLE>

- Start Date: 2020-09-02
- PR: (leave this empty)
- Issue: (leave this empty)

# Summary

`Popover` is a non-modal dialog that floats around its disclosure. Popovers contain helpful information such as an explanation of a context.

# Basic example

```jsx
import { Popover } from '@vtex-component/popover'
;<Popover size="small">
  <p>This is a Popover</p>
</Popover>
```

# Detailed design

| prop      | type        | description                                           | default | required |
| --------- | ----------- | ----------------------------------------------------- | ------- | -------- |
| size      | PopoverSize | sizing of the popover                                 | regular | 🚫       |
| placement | Placement   | the placement of the popover relative to its children | top     | 🚫       |
| arrow     | Boolean     | whether the popover will have an arrow or no          | top     | 🚫       |

PopoverSize = `'small'` | `'regular'`  
Placement = `"auto-start" | "auto" | "auto-end" | "top-start" | "top" | "top-end" | "right-start" | "right" | "right-end" | "bottom-end" | "bottom" | "bottom-start" | "left-end" | "left" | "left-start"`

# Adoption strategy

- This is a new feature, no breaking changes to any packages in `onda`.

# Education

- As with any DS component, it must be documented.

# Unresolved questions

- Missing specification about positioning the Popover.
- Missing other usage examples.
