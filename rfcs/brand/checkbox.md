# RFC Brand Checkbox

- 📅 Start Date: 2020-10-09
- 🏆 Champions: @JRobsonJr

# Summary

A `Checkbox` lets the user toggle the selection of an item.

# Basic example

```jsx
import { useState } from 'react'
import { Checkbox, useCheckboxState } from '@vtex/brand-ui'

const BasicUse = () => {
  const [checked, setChecked] = useState(false)
  const handleChange = () => setChecked(!checked)

  return <Checkbox checked={checked} onChange={handleChange} label="Mobile">
}

const MultipleCheckboxes = () => {
  const checkbox = useCheckboxState({ state: [] })
  return (
    <Flex>
        <Checkbox {...checkbox} label="reputation" value="reputation">
        <Checkbox {...checkbox} label="Lover" value="lover">
        <Checkbox {...checkbox} label="folklore" value="folklore">
    </Flex>
  )
}
```

# Detailed design

Our implementation will be based on [Reakit's Checkbox](https://reakit.io/docs/checkbox/).

| prop         | type                                | description                                | default | required |
| ------------ | ----------------------------------- | ------------------------------------------ | ------- | -------- |
| sx           | `SxStyleProp`                       | Theme-ui style prop                        | -       | 🚫       |
| checked      | boolean                             | whether the checkbox is checked or not     | -       | 🚫       |
| disabled     | boolean                             | whether the checkbox is disabled or not    | -       | 🚫       |
| error        | boolean                             | whether the checkbox is error state or not | -       | 🚫       |
| errorMessage | string                              | description of the error                   | -       | 🚫       |
| label        | string                              | checkbox label                             | -       | 🚫       |
| onChange     | function                            | onChange event                             | -       | 🚫       |
| required     | boolean                             | whether the checkbox is required or not    | -       | 🚫       |
| setState     | `ReakitCheckboxSetState`            | `Reakit` Checkbox setState                 | -       | 🚫       |
| state        | `ReakitCheckboxState`               | `Reakit` Checkbox state                    | -       | 🚫       |
| value        | string                              | checkbox value                             | -       | 🚫       |

# Drawbacks

WIP. Ideas?

# Adoption strategy

This is a new feature, no breaking changes to any packages in onda.

# Education

Document the multiple use cases of the component.
