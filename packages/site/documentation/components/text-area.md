---
title: Textarea
path: /text-area/
---

# TextArea

Text Area is the space where longer text is inputted by users. It renders a `<textarea>` by default.

## Usage

```jsx isStatic
import { TextArea } from '@vtex/admin-ui'

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

## Examples

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

You can disable the input by defining the `disabled` property.

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

You can indicate to users that they had input an invalid value by defining the `error` property. You should, also define the `errorMessage` property, so the user can know what's the error is about.

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

## Props

It also receives all props of `textarea` JSX element.

| Name         | Type                                          | Description                                  | Required | Default |
| ------------ | --------------------------------------------- | -------------------------------------------- | -------- | ------- |
| label        | `string`                                      | Label text                                   | ✅       | -       |
| id           | `string`                                      | Unique id of the component                   | ✅       | -       |
| name         | `string`                                      | Name of the textarea element.                | 🚫       | -       |
| helperText   | `string`                                      | TextArea helper text                         | 🚫       | -       |
| charLimit    | `number`                                      | TextArea char limit                          | 🚫       | -       |
| errorMessage | `string`                                      | TextArea error message                       | 🚫       | -       |
| onChange     | `react.FormEventHandler<HTMLTextareaElement>` | Handler called when the inputs value changes | 🚫       | -       |
| disabled     | `boolean`                                     | Whether the textarea is disabled or not      | 🚫       | `false` |
| error        | `boolean`                                     | TextArea error state                         | 🚫       | `false` |
| csx          | `StyleProp`                                   | Defines component styles                     | 🚫       | `{}`    |
