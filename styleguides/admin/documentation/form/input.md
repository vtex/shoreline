---
path: /form/input/
---

# Input

The `<Input>` component is used in a form in order to retrieve input from the user. It always has a `label` defined and it renders a `<input>` element.

## Behavior

```jsx
import { Input, cn, ThemeProvider } from '@vtex/admin-ui'

function Example() {
  const [value, setValue] = React.useState('')

  return (
    <ThemeProvider>
      <div className={cn({ width: 300 })}>
        <Input
          label="Label"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <Input label="Disabled" value="" onChange={() => {}} disabled />
      </div>
    </ThemeProvider>
  )
}
```

## Installation

```static
yarn add @vtex/admin-ui
```

```jsx static
import { Input } from '@vtex/admin-ui'
```

## Variation

### Icon

You can add one Icon on the left side of the `Input`. Just use the `icon` property.

```jsx
import { Input, cn, ThemeProvider } from '@vtex/admin-ui'
import { IconHelp } from '@vtex/admin-ui-icons'

function Example() {
  const [value, setValue] = React.useState('')

  return (
    <ThemeProvider>
      <div className={cn({ width: 300 })}>
        <Input
          label="Label"
          icon={<IconHelp />}
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      </div>
    </ThemeProvider>
  )
}
```

### Suffix

You can add a Suffix the rigth side of the `Input`. Just use the `suffix` property.

```jsx
import { Input, cn, ThemeProvider } from '@vtex/admin-ui'

function Example() {
  const [value, setValue] = React.useState('')

  return (
    <ThemeProvider>
      <div className={cn({ width: 300 })}>
        <Input
          label="Label"
          suffix="Kg"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      </div>
    </ThemeProvider>
  )
}
```

### Clear

You can enable a clear button. Just define the `onClear` function inside the `state` property.

```jsx
import { Input, cn, ThemeProvider } from '@vtex/admin-ui'

function Example() {
  const [value, setValue] = React.useState('Clear me!')

  return (
    <ThemeProvider>
      <div className={cn({ width: 300 })}>
        <Input
          label="Label"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onClear={() => setValue('')}
        />
      </div>
    </ThemeProvider>
  )
}
```

### Helpers

You can add a `text` or a `char limit count` helper. Just use the `helperText` or `charLimit` properties.

```jsx
import { Input, cn, ThemeProvider } from '@vtex/admin-ui'

function Example() {
  const [value, setValue] = React.useState('')

  return (
    <ThemeProvider>
      <div className={cn({ width: 300 })}>
        <Input
          label="Label"
          charLimit={120}
          helperText="Helper Text!"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      </div>
    </ThemeProvider>
  )
}
```

### Error

You can add a `error message` in the same place of the `helperText`. Just use the `error` property for that.

```jsx
import { Input, cn, ThemeProvider } from '@vtex/admin-ui'

function Example() {
  const [value, setValue] = React.useState('')

  return (
    <ThemeProvider>
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
    </ThemeProvider>
  )
}
```

### Overview

Example of the `Input` with all its features.

```jsx
import { Input, cn, ThemeProvider } from '@vtex/admin-ui'
import { IconHelp } from '@vtex/admin-ui-icons'

function Example() {
  const [value, setValue] = React.useState('')

  return (
    <ThemeProvider>
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
    </ThemeProvider>
  )
}
```

## State

How to handle state on input

### value and onChange

You can use the properties `value` and `onChange`, inside our `state` property to handle if the value has changed. Check the example below.

```jsx
import { Input, ThemeProvider } from '@vtex/admin-ui'

function Example() {
  const [value, setValue] = React.useState('')

  return (
    <ThemeProvider>
      <Input
        label="Label"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onClear={() => setValue('')}
      />
    </ThemeProvider>
  )
}
```

## Props

<proptypes heading="Input" components="Input"/>
