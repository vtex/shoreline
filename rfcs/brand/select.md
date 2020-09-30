# RFC Brand Select

- 📅 Start Date: 2020-09-29
- 🏆 Champion: @lucasmedeiros

# Summary

A `Select` is a field that allows the user to pick one or more `options` from a list.

# Basic example

```jsx
import React from 'react'
import { Select } from '@vtex/brand-ui'

{
  /* Simple select */
}
<Select label="Options">
  <option>1</option>
  <option>2</option>
</Select>

{
  /* Select with optional props */
}
<Select
  label="Company"
  helperText="Select your company below"
  prefix={<IconPerson />}
  required
>
  <option>Company 1</option>
  <option>Company 2</option>
</Select>

{
  /* Select with groups */
}
<Select
  label="Movie"
  helperText="Select the movie you want to watch"
  prefix={<IconMovie />}
  required
  multiple
>
  <Select.Group label="19h00">
    <option>Titanic</option>
    <option>Cidade de Deus</option>
  </Select.Group>
  <Select.Group label="20h00">
    <option>Lord of the Rings</option>
    <option>Batman</option>
  </Select.Group>
</Select>
```

# Detailed design

This component reuses functionalities from the [Reakit Select Input](https://reakit.io/docs/input/). It also has a composite `Group`, which is a commom `optgroup` HTML tag, for grouping options.

## Props

| prop       | type      | description                                               | required |
| ---------- | --------- | --------------------------------------------------------- | -------- |
| label      | string    | label displayed in the select, also used as placeholder    | ✔️       |
| helperText | string    | additional tips about the select options                   | 🚫       |
| prefix     | ReactNode | element placed before the select                           | 🚫       |
| readOnly   | boolean   | whether the select is read only or not                     | 🚫       |
| multiple   | boolean   | whether multiple options can be selected                   | 🚫       |
| required   | boolean   | whether the select must be filled or not                   | 🚫       |
| size       | InputSize | sizing of the select                                       | 🚫       |

- InputSize = `'small'` | `'regular'` | `'large'`

# Adoption strategy

- This is a new feature, no breaking changes to any packages in `onda`.

# Education

- Document the components with its user cases, besides usage examples with all Select's features (read only, groups, options etc.).
