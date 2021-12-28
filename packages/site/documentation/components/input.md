---
title: Input
path: /input/
---

# Input

Is used in a form in order to retrieve input from the user. It always has a `label` defined, and renders a `<input>` html element by default.

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

## Alternatives

- [InputPassword](/input-password/) - For password fields.
- [Textarea](/text-area/) - For long text fields.

## Examples

### Tone of voice

The `Input` [tone of voice](/foundations/colors/#tones) is either `neutral` (default) or `critical`, and it's adjustable using the `tone` prop.

```jsx
<Set spacing={3}>
  <Input label="Neutral" value="Neutral text field" helperText="Helpful text" />
  <Input
    tone="critical"
    label="Critical"
    value="Critical text field"
    helperText="Helpful text"
    criticalText="Something is wrong"
  />
</Set>
```

### Icon

You can add one Icon on the left side of the `Input` by defining the `icon` property.

```jsx
function Example() {
  const [value, setValue] = React.useState('')

  return (
    <tag.div csx={{ width: 300 }}>
      <Input
        label="Label"
        icon={<IconQuestion />}
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
        icon={<IconPackage />}
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
        icon={<IconPackage />}
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
              variant="adaptative-dark"
              icon={<IconQuestion />}
              size="small"
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

## Props

All props of `input` JSX element.

| Name           | Type                                       | Description                                     | Required | Default   |
| -------------- | ------------------------------------------ | ----------------------------------------------- | -------- | --------- |
| label          | `string`                                   | Label text                                      | ✅       | -         |
| id             | `string`                                   | Unique id of the component                      | ✅       | -         |
| name           | `string`                                   | Name of the input element.                      | 🚫       | -         |
| helperText     | `string`                                   | Input helper text                               | 🚫       | -         |
| charLimit      | `number`                                   | Input char limit                                | 🚫       | -         |
| tone           | `neutral, critical`                        | Tone of voice                                   | 🚫       | `neutral` |
| type           | `tel, text, url, email`                    | Input type                                      | 🚫       | -         |
| icon           | `ReactNode`                                | Input Icon                                      | 🚫       | -         |
| suffix         | `string`                                   | Input Suffix                                    | 🚫       | -         |
| onClear        | `() => void`                               | Handler called when the inputs value is cleared | 🚫       | -         |
| buttonElements | `ReactNode`                                | Button elements                                 | 🚫       | -         |
| onChange       | `React.FormEventHandler<HTMLInputElement>` | Handler called when the inputs value changes    | 🚫       | -         |
| disabled       | `boolean`                                  | Whether the input is disabled or not            | 🚫       | `false`   |
| criticalText   | `string`                                   | Input critical message                          | 🚫       | -         |
| csx            | `StyleProp`                                | Defines component styles                        | 🚫       | `{}`      |
