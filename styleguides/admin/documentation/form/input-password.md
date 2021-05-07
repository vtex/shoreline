---
path: /form/input-password/
---

# Input Password

The `<Password>` component is used in a form in order to retrieve input from the user. It always has a `label` defined and it renders a `<input>` element with a `type="password"` .

## Behavior

```jsx
function Example() {
  const [value, setValue] = React.useState('')
  const { cn } = useSystem()

  return (
    <div className={cn({ width: 300 })}>
      <InputPassword
        label="Label"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <InputPassword label="Disabled" value="" onChange={() => {}} disabled />
    </div>
  )
}
```

## Installation

```sh isStatic
yarn add @vtex/admin-ui
```

```jsx isStatic
import { InputPassword } from '@vtex/admin-ui'
```

## Variation

### Icon

You can add one Icon on the left side of the `InputPassword`. Just use the `icon` property.

```jsx
function Example() {
  const [value, setValue] = React.useState('')
  const { cn } = useSystem()

  return (
    <div className={cn({ width: 300 })}>
      <InputPassword
        label="Label"
        icon={<IconLock />}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </div>
  )
}
```

### Helpers

You can add a `text` or a `char limit count` helper. Just use the `helperText` or `charLimit` properties.

```jsx
function Example() {
  const [value, setValue] = React.useState('')
  const { cn } = useSystem()

  return (
    <div className={cn({ width: 300 })}>
      <InputPassword
        label="Label"
        charLimit={120}
        helperText="Helper Text!"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </div>
  )
}
```

### Error

You can add a `error message` in the same place of the `helperText`. Just use the `error` property for that.

```jsx
function Example() {
  const [value, setValue] = React.useState('')
  const { cn } = useSystem()

  return (
    <div className={cn({ width: 300 })}>
      <InputPassword
        label="Label"
        charLimit={120}
        helperText="Helper Text!"
        errorMessage="Error message!"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        error
      />
    </div>
  )
}
```

### Overview

Example of the `InputPassword` with all its features.

```jsx
function Example() {
  const [value, setValue] = React.useState('')
  const { cn } = useSystem()

  return (
    <div className={cn({ width: 300 })}>
      <InputPassword
        label="Label"
        icon={<IconLock />}
        suffix="Kg"
        charLimit={120}
        helperText="Helper Text!"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onClear={(e) => setValue('')}
      />
    </div>
  )
}
```

## Props

| Name           | Type                 | Description                | Required | Default |
| -------------- | -------------------- | -------------------------- | -------- | ------- |
| label          | `string`             | Label text                 | ✅       | -       |
| id             | `string`             | unique id of the component | ✅       | -       |
| helperText     | `string`             | Input helper text          | 🚫       | -       |
| charLimit      | `number`             | Input char limit           | 🚫       | -       |
| errorMessage   | `string`             | Input error message        | 🚫       | -       |
| icon           | `ReactNode`          | Input Icon                 | 🚫       | -       |
| labelElement   | `ReactNode`          | Render an optional label   | 🚫       | -       |
| buttonElements | `ReactNode`          | Button elements            | 🚫       | -       |
| onChange       | `ChangeEventHandler` | onChange event             | 🚫       | -       |
| error          | `boolean`            | Input error state          | 🚫       | -       |
| csx            | `StyleProp`          | Defines component styles   | 🚫       | `{}`    |
