---
path: /input/
---

# Input

Is used in a form in order to retrieve input from the user. It always has a `label` defined and it renders a `<input>` html element by default.

## Usage

```jsx isStatic
import { Input } from '@vtex/admin-ui'

function Example() {
  const [value, setValue] = React.useState('')

  return (
    <Input
      label="Meaningful label"
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  )
}
```

## Examples

### Icon

You can add one Icon on the left side of the `Input` by defining the `icon` property.

```jsx
function Example() {
  const [value, setValue] = React.useState('')

  return (
    <tag.div csx={{ width: 300 }}>
      <Input
        label="Label"
        icon={<IconHelp />}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </tag.div>
  )
}
```

### Suffix

You can add a Suffix to the `Input` by defining the `suffix` property.

```jsx
function Example() {
  const [value, setValue] = React.useState('')

  return (
    <tag.div csx={{ width: 300 }}>
      <Input
        label="Label"
        suffix="Kg"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </tag.div>
  )
}
```

### Clear

You can enable a clear button by defining the `onClear` function.

```jsx
function Example() {
  const [value, setValue] = React.useState('Clear me!')

  return (
    <tag.div csx={{ width: 300 }}>
      <Input
        label="Label"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onClear={() => setValue('')}
      />
    </tag.div>
  )
}
```

### Helpers

You can add a `text` or a `char limit count` helper. You just need to define the `helperText` or `charLimit` properties.

```jsx
function Example() {
  const [value, setValue] = React.useState('')

  return (
    <tag.div csx={{ width: 300 }}>
      <Input
        label="Label"
        charLimit={120}
        helperText="Helper Text!"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </tag.div>
  )
}
```

### Error

You can add a `error message` in the same place of the `helperText` by defining the `error` property.

```jsx
function Example() {
  const [value, setValue] = React.useState('')

  return (
    <tag.div csx={{ width: 300 }}>
      <Input
        label="Label"
        charLimit={120}
        helperText="Helper Text!"
        errorMessage="Error message!"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        error
      />
    </tag.div>
  )
}
```

### Disabled

You can disable the input by defining the `disabled` property.

```jsx
function Example() {
  const [value, setValue] = React.useState('')

  return (
    <tag.div csx={{ width: 300 }}>
      <Input
        disabled
        label="Weight"
        icon={<IconShipping />}
        suffix="Kg"
        charLimit={10}
        helperText="Add a weight!"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onClear={() => setValue('')}
      />
    </tag.div>
  )
}
```

### Overview

Example of the `Input` with all its features.

```jsx
function Example() {
  const [value, setValue] = React.useState('')

  return (
    <tag.div csx={{ width: 300 }}>
      <Input
        label="Weight"
        icon={<IconShipping />}
        suffix="Kg"
        charLimit={10}
        helperText="Add a weight!"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onClear={() => setValue('')}
      />
    </tag.div>
  )
}
```

### Custom Button

You can add a custom button if necessary by defining the `buttonElements` property.

```jsx
function Example() {
  const [value, setValue] = React.useState('')

  return (
    <tag.div csx={{ width: 300 }}>
      <Input
        buttonElements={
          <Flex justify="center" align="center">
            <Button
              icon={<IconHelp />}
              size="small"
              variant="adaptative-dark"
            />
          </Flex>
        }
        label="Label"
        charLimit={10}
        helperText="Helper text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </tag.div>
  )
}
```

## Accessibility

Be sure that you're using the correct semantic element and `aria roles` for the behavior you're implementing. You can use the [WAI-ARIA Practices](https://www.w3.org/TR/wai-aria-practices/) to help you.

## Props

It also receives all props of `input` JSX element.

| Name           | Type                                       | Description                                     | Required | Default  |
| -------------- | ------------------------------------------ | ----------------------------------------------- | -------- | -------- | ---------- | --- | --- |
| label          | `string`                                   | Label text                                      | ✅       | -        |
| id             | `string`                                   | Unique id of the component                      | ✅       | -        |
| name           | `string`                                   | Name of the input element.                      | 🚫       | -        |
| helperText     | `string`                                   | Input helper text                               | 🚫       | -        |
| charLimit      | `number`                                   | Input char limit                                | 🚫       | -        |
| errorMessage   | `string`                                   | Input error message                             | 🚫       | -        |
| type           | `'tel'                                     | 'text'                                          | 'url'    | 'email'` | Input type | 🚫  | -   |
| icon           | `ReactNode`                                | Input Icon                                      | 🚫       | -        |
| suffix         | `string`                                   | Input Suffix                                    | 🚫       | -        |
| onClear        | `() => void`                               | Handler called when the inputs value is cleared | 🚫       | -        |
| buttonElements | `ReactNode`                                | Button elements                                 | 🚫       | -        |
| onChange       | `react.FormEventHandler<HTMLInputElement>` | Handler called when the inputs value changes    | 🚫       | -        |
| disabled       | `boolean`                                  | Whether the input is disabled or not            | 🚫       | `false`  |
| error          | `boolean`                                  | Input error state                               | 🚫       | `false`  |
| csx            | `StyleProp`                                | Defines component styles                        | 🚫       | `{}`     |
