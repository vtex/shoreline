# TextArea RFC

- 📅 Start Date: 2020-11-06
- 🏆 Champions: @ingrid

# Summary

- TextArea Component

# Basic example

```tsx
import { TextArea } from '@vtex/admin-ui'

const [value, setValue] = useState('')

//Regular Variation
<TextArea
  state={{
    value,
    onChange: (e) => setValue(e.target.value),
  }}
  id="textarea-1"
  label="Label"
  helperText="Helper Text"
  charLimit={120}
/>

//Error Variation
<TextArea
  state={{
    value,
    onChange: (e) => setValue(e.target.value),
  }}
  id="textarea-2"
  label="Label"
  helperText="Helper Text"
  errorMessage="Error Message"
  charLimit={120}
/>

// Disabled TextArea
<TextArea
  state={{
    value,
    onChange: (e) => setValue(e.target.value),
  }}
  id="textarea-3"
  label="Label"
  helperText="Helper Text"
  disabled
  charLimit={120}
/>

```

# Detailed design

- Default props:
  `state: { value: '', onChange }`
  `helperText: ''`
  `disabled: false`
  `charLimit: 120`
  `errorMessage`
  `styleOverrides`

- Required props:
  `id`
  `label`
