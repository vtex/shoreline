---
title: InputPassword
path: /input-password/
---

# Input Password

The `<InputPassword>` component is used in a form in order to retrieve input from the user. It always has a `label` defined and it renders a `<input>` element with a `type="password"` .

## Usage

```jsx isStatic
import { InputPassword } from '@vtex/admin-ui'

function Example() {
  const [value, setValue] = React.useState('')

  return (
    <InputPassword
      label="Meaningful label"
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  )
}
```

## Alternatives

- [Input](/input/) - For text fields.
- [Textarea](/text-area/) - For long text fields.

## Examples

### Tone of voice

The `InputPassword` [tone of voice](/foundations/colors/#tones) is either `neutral` (default) or `critical`, and it's adjustable using the `tone` prop.

```jsx
<Set spacing={3}>
  <InputPassword
    label="Neutral"
    value="Neutral text field"
    helperText="Helpful text"
  />
  <InputPassword
    tone="critical"
    label="Critical"
    value="Critical text field"
    helperText="Helpful text"
    criticalText="Something is wrong"
  />
</Set>
```

### Icon

You can add one Icon on the left side of the `InputPassword` by defining the `icon` property.

```jsx
function Example() {
  const [value, setValue] = React.useState('')

  return (
    <tag.div csx={{ width: 300 }}>
      <InputPassword
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

You can add a Suffix to the `InputPassword` by defining the `suffix` property.

```jsx
function Example() {
  const [value, setValue] = React.useState('')

  return (
    <tag.div csx={{ width: 300 }}>
      <InputPassword
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
      <InputPassword
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
      <InputPassword
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

You can disable the InputPassword by defining the `disabled` property.

```jsx
function Example() {
  const [value, setValue] = React.useState('')

  return (
    <tag.div csx={{ width: 300 }}>
      <InputPassword
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

Example of the `InputPassword` with all its features.

```jsx
function Example() {
  const [value, setValue] = React.useState('')

  return (
    <tag.div csx={{ width: 300 }}>
      <InputPassword
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
      <InputPassword
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

| Name           | Type                  | Description                            | Required | Default   |
| -------------- | --------------------- | -------------------------------------- | -------- | --------- |
| label          | `string`              | Label text                             | ✅       | -         |
| id             | `string`              | Unique id of the component             | ✅       | -         |
| helperText     | `string`              | InputPassword helper text              | 🚫       | -         |
| charLimit      | `number`              | InputPassword char limit               | 🚫       | -         |
| criticalText   | `string`              | InputPassword critical message         | 🚫       | -         |
| icon           | `ReactNode`           | InputPassword Icon                     | 🚫       | -         |
| labelElement   | `ReactNode`           | Render an optional label               | 🚫       | -         |
| buttonElements | `ReactNode`           | Button elements                        | 🚫       | -         |
| onChange       | `ChangeEventHandler`  | Event triggered when something changes | 🚫       | -         |
| tone           | `neutral or critical` | InputPassword tone of voice            | 🚫       | `neutral` |
| csx            | `StyleProp`           | Defines component styles               | 🚫       | `{}`      |
