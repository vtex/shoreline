---
path: /form/input/
---

# Input

The `<Input>` component is used in a form in order to retrieve input from the user. It always has a `label` defined and it renders a `<input>` element.

## Behavior

```jsx
function Example() {
  const [value, setValue] = React.useState('')
  const { cn } = useSystem()

  return (
    <div className={cn({ width: 300 })}>
      <Input
        label="Label"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <Input label="Disabled" value="" onChange={() => {}} disabled />
    </div>
  )
}
```

## Installation

```sh isStatic
yarn add @vtex/admin-ui
```

```jsx isStatic
import { Input } from '@vtex/admin-ui'
```

## Variation

### Icon

You can add one Icon on the left side of the `Input`. Just use the `icon` property.

```jsx
function Example() {
  const [value, setValue] = React.useState('')
  const { cn } = useSystem()

  return (
    <div className={cn({ width: 300 })}>
      <Input
        label="Label"
        icon={<IconHelp />}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </div>
  )
}
```

### Suffix

You can add a Suffix the rigth side of the `Input`. Just use the `suffix` property.

```jsx
function Example() {
  const [value, setValue] = React.useState('')
  const { cn } = useSystem()

  return (
    <div className={cn({ width: 300 })}>
      <Input
        label="Label"
        suffix="Kg"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </div>
  )
}
```

### Clear

You can enable a clear button. Just define the `onClear` function inside the `state` property.

```jsx
function Example() {
  const [value, setValue] = React.useState('Clear me!')
  const { cn } = useSystem()

  return (
    <div className={cn({ width: 300 })}>
      <Input
        label="Label"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onClear={() => setValue('')}
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
      <Input
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
      <Input
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

Example of the `Input` with all its features.

```jsx
function Example() {
  const [value, setValue] = React.useState('')
  const { cn } = useSystem()

  return (
    <div className={cn({ width: 300 })}>
      <Input
        label="Label"
        icon={<IconHelp />}
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

## State

How to handle state on input

### value and onChange

You can use the properties `value` and `onChange`, inside our `state` property to handle if the value has changed. Check the example below.

```jsx
function Example() {
  const [value, setValue] = React.useState('')

  return (
    <Input
      label="Label"
      value={value}
      onChange={(e) => setValue(e.target.value)}
      onClear={() => setValue('')}
    />
  )
}
```

## Props

<proptypes heading="Input" components="Input"/>
