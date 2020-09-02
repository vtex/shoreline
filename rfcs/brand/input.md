# RFC Brand Input 

- Start Date: 2020-09-01
- PR: (leave this empty)
- Issue: (leave this empty)

# Summary

An `Input` is a field that allows filling information in different ways. 

# Basic example

```jsx
import React from 'react'
import { Input } from '@vtex/brand-ui'

{/* Simple input */}
<Input label='Name' />

{/* Input with optional props */}
<Input
  label='Name'
  helperText='Enter your first and last name.'
  prefix={<IconPerson />}
  charLimit={32}
  required
/>
```

# Detailed design

| prop | type | description | required |
| ---- | ---- | ----------- | -------- |
| helperText | string | additional tips on how the input is expected to be filled | ✔️ |
| label | string | label displayed in the input, also used as placeholder | ✔️ |
| charLimit | number | maximum number of characters in input text | 🚫 |
| disabled | boolean | whether the input is disabled or not | 🚫 |
| pattern | RegExp | a pattern the input text must match | 🚫 |
| prefix | ReactNode | element placed before the input | 🚫 |
| readOnly | boolean | whether the input is read only or not | 🚫 |
| required | boolean | whether the input must be filled or not | 🚫 |
| size | InputSize | sizing of the input | 🚫 |
| suffix | ReactNode | element placed after the input | 🚫 |
| type | InputType | type of the input | 🚫 |

- InputSize = `'small'` | `'regular'` | `'large'`
- InputType = `'text'` | `'password'`

# Drawbacks

WIP. Ideas?

# Adoption strategy

- This is a new feature, no breaking changes to any packages in `onda`.

# Education

- As with any DS component, it must be documented.

# Unresolved questions

- Should we add the possibility of passing validations and their respective error messages (e.g. with `yup`)? It would look something like this: 

  ```jsx
  <Input
    label='name'
    validations={[
      {
        validation: validateUpperCase,
        errorMessage: 'The name should begin with an uppercase letter.'
      },
      {
        validation: checkFullName,
        errorMessage: 'Remember to state your first and last names.'
      }
    ]}
  />
  ```
