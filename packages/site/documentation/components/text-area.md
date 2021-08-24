---
path: /text-area/
---

# TextArea

Text Area is the space where longer text is inputted by users.

## Behavior

```jsx
function Example() {
  const [value, setValue] = React.useState('')

  return (
    <Box csx={{ width: 300 }}>
      <TextArea
        value={value}
        onChange={(e) => {
          setValue(e.target.value)
        }}
        id="textarea-1"
        label="Label"
        helperText="Helper Text"
        charLimit={120}
      />
    </Box>
  )
}
```

## Installation

```sh isStatic
yarn add @vtex/admin-ui
```

```jsx isStatic
import { TextArea } from '@vtex/admin-ui'
```

## Variations

### Helpers

You can add a helper text to indicate the proper way to fill in the text area, and also, can add a character count to indicate the text maximum length and the current quantity of characters in the text area. To use these variations, the `helperText` and `charLimit` properties should have a value defined.

```jsx
function Example() {
  const [value, setValue] = React.useState('')

  return (
    <Box csx={{ width: 300 }}>
      <TextArea
        value={value}
        onChange={(e) => {
          setValue(e.target.value)
        }}
        id="Helpers-textarea"
        label="Helpers"
        helperText="This TextArea is disabled"
        charLimit={120}
      />
    </Box>
  )
}
```

### Disabled

It means that the user will not be able to add any input value to the `TextArea`. To use this variation, the `disabled` property should have a true value.

```jsx
function Example() {
  const [value, setValue] = React.useState('')

  return (
    <Box width={300}>
      <TextArea
        value={value}
        onChange={(e) => {
          setValue(e.target.value)
        }}
        id="disabled-textarea"
        label="Disabled"
        helperText="This TextArea is disabled"
        disabled
        charLimit={120}
      />
    </Box>
  )
}
```

### Invalid

It means that the user added an invalid input value to the `TextArea`. To use this variation, the `error` property should have a `true` value defined. You should, also define the `errorMessage` property, so the user can know what's the error is about. The error message will appear in the same position as the `helperText`.

```jsx
function Example() {
  const [value, setValue] = React.useState('Invalid Value')
  const [error, setError] = React.useState(true)

  const invalidInput = 'Invalid Value'

  return (
    <Box csx={{ width: 300 }}>
      <TextArea
        value={value}
        onChange={(e) => {
          const newValue = e.target.value
          setValue(newValue)
          setError(newValue === invalidInput ? true : false)
        }}
        error={error}
        id="invalid-textarea"
        label="Invalid"
        helperText="Helper Text"
        errorMessage="Error Message"
        charLimit={120}
      />
    </Box>
  )
}
```

## State

You can use the properties `value`, `onChange` to handling whether the value has changed. You also can control the `error` property to indicate if it's a valid input or not. Check the example below.

```jsx
function Example() {
  const [value, setValue] = React.useState('')
  const [error, setError] = React.useState(true)

  const invalidInput = 'Invalid Value'

  return (
    <Box csx={{ width: 300 }}>
      <TextArea
        value={value}
        onChange={(e) => {
          const newValue = e.target.value
          setValue(newValue)
          setError(newValue === invalidInput ? true : false)
        }}
        error={error}
        id="state-textarea"
        label="State"
        helperText="Helper Text"
        errorMessage="Error Message"
        charLimit={120}
      />
    </Box>
  )
}
```

## Customization

You can use the `csx` property to customize any style.

# Props

<proptypes heading="TextArea" component="TextArea" />
