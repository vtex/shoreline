# RFC Brand Text Area

- 📅 Start Date: 2021-05-27
- 🏆 Champion: @myllenaalves

# Summary

`Text area`  is a edition control for a text box, and works when the user wants to write a large text in a free format 

# Basic example

```jsx
import { Textarea } from '@brand-ui/TextArea'

;<Textarea label="Please enter your feedbacks here.."
  helperText="Help Message">
    <p>Image description</p>
<Textarea/>
```

# Detailed design

| prop       | type      | description                                               | required |
| ---------- | --------- | --------------------------------------------------------- | -------- |
| value | string    | value associated with the text area| ✔️       |
| helperText | string    | additional tips on how the TextArea is expected to be filled | ✔️       |
| label      | string    | label displayed in the TextArea, also used as placeholder    | ✔️       |
| onChange | function | the function that handles changes on the textarea value |  ✔️        | - |
| charLimit  | number    | maximum number of characters in TextArea text                | 🚫       |
| disabled   | boolean   | whether the TextArea is disabled or not                      | 🚫       |
| pattern    | RegExp    | a pattern the TextArea text must match                       | 🚫       |                         | 🚫       |
| readOnly   | boolean   | whether the TextArea is read only or not                     | 🚫       |
| required   | boolean   | whether the TextArea must be filled or not                   | 🚫       |
| rows       | TextAreaSize | sizing of the TextArea                                       | 🚫       |
| colums       | TextAreaSize | sizing of the TextArea                                       | 🚫       |
| error        | boolean                             | whether the TextArea is error state or not |  🚫       |
| darkmode        | boolean                             | whether the TextArea is in darkmode state or not  | 🚫       |





# Adoption strategy

- This is a new feature, no breaking changes to any packages in `onda`.

# Education

- As with any DS component, it must be documented.

# Unresolved questions

- Is this a brand specific component, or a component that can be reused by all VTEX Styleguides?
