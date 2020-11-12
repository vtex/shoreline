---
path: /form/text-field/
---

# TextField

The `<TextField>` component is used in a form in order to retrieve input from the user. It always has a `label` defined and it renders a `<Input>` element.

## Behavior

```jsx
import { TextField, cn, ThemeProvider } from '@vtex/admin-ui'

function Example() {
  const [value, setValue] = React.useState('')

  return (
    <ThemeProvider>
      <div className={cn({ width: 300 })}>
        <TextField
          label="Label"
          state={{
            value,
            onChange: (e) => {
              setValue(e.target.value)
            },
          }}
        />
        <TextField
          label="Disabled"
          state={{
            value: '',
            onChange: () => {},
          }}
          disabled
        />
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
import { TextField } from '@vtex/admin-ui'
```

## Variation

### Icon

You can add one Icon on the left side of the `TextField`. Just use the `icon` property.

```jsx
import { TextField, IconHelp, cn, ThemeProvider } from '@vtex/admin-ui'

function Example() {
  const [value, setValue] = React.useState('')

  return (
    <ThemeProvider>
      <div className={cn({ width: 300 })}>
        <TextField
          label="Label"
          icon={<IconHelp />}
          state={{
            value,
            onChange: (e) => {
              setValue(e.target.value)
            },
          }}
        />
      </div>
    </ThemeProvider>
  )
}
```

### Suffix

You can add a Suffix the rigth side of the `TextField`. Just use the `suffix` property.

```jsx
import { TextField, cn, ThemeProvider } from '@vtex/admin-ui'

function Example() {
  const [value, setValue] = React.useState('')

  return (
    <ThemeProvider>
      <div className={cn({ width: 300 })}>
        <TextField
          label="Label"
          suffix="Kg"
          state={{
            value,
            onChange: (e) => {
              setValue(e.target.value)
            },
          }}
        />
      </div>
    </ThemeProvider>
  )
}
```

### Clear

You can enable a clear button. Just define the `onClear` function inside the `state` property.

```jsx
import { TextField, cn, ThemeProvider } from '@vtex/admin-ui'

function Example() {
  const [value, setValue] = React.useState('Clear me!')

  return (
    <ThemeProvider>
      <div className={cn({ width: 300 })}>
        <TextField
          label="Label"
          state={{
            value,
            onChange: (e) => {
              setValue(e.target.value)
            },
            onClear: () => {
              setValue('')
            },
          }}
        />
      </div>
    </ThemeProvider>
  )
}
```

### Helpers

You can add a `text` or a `char limit count` helper. Just use the `helperText` or `charLimit` properties.

```jsx
import { TextField, cn, ThemeProvider } from '@vtex/admin-ui'

function Example() {
  const [value, setValue] = React.useState('')

  return (
    <ThemeProvider>
      <div className={cn({ width: 300 })}>
        <TextField
          label="Label"
          charLimit={120}
          helperText="Helper Text!"
          state={{
            value,
            onChange: (e) => {
              setValue(e.target.value)
            },
          }}
        />
      </div>
    </ThemeProvider>
  )
}
```

### Error

You can add a `error message` in the same place of the `helperText`. Just use the `errorMessage` property with a non-empty message.

```jsx
import { TextField, cn, ThemeProvider } from '@vtex/admin-ui'

function Example() {
  const [value, setValue] = React.useState('')

  return (
    <ThemeProvider>
      <div className={cn({ width: 300 })}>
        <TextField
          label="Label"
          charLimit={120}
          helperText="Helper Text!"
          errorMessage="Error message!"
          state={{
            value,
            onChange: (e) => {
              setValue(e.target.value)
            },
          }}
        />
      </div>
    </ThemeProvider>
  )
}
```

### Overview

Example of the `TextField` with all its features.

```jsx
import { TextField, cn, IconHelp, ThemeProvider } from '@vtex/admin-ui'

function Example() {
  const textfield = useInputState()

  return (
    <ThemeProvider>
      <div className={cn({ width: 300 })}>
        <TextField
          label="Label"
          icon={<IconHelp />}
          suffix="Kg"
          charLimit={120}
          helperText="Helper Text!"
          state={textfield}
        />
      </div>
    </ThemeProvider>
  )
}
```

## State

There are two ways that you can handle the state in `<TextField>`.

### value and onChange

You can use the properties `value` and `onChange`, inside our `state` property to handle if the value has changed. Check the example below.

```jsx
import { TextField, ThemeProvider } from '@vtex/admin-ui'

function Example() {
  const [value, setValue] = React.useState('')

  return (
    <ThemeProvider>
      <TextField
        label="Label"
        state={{
          value,
          onChange: (e) => {
            setValue(e.target.value)
          },
          onClear: () => {
            setValue('')
          },
        }}
      />
    </ThemeProvider>
  )
}
```

### useInputState

For convenience, we also provide a hook that already implements the state logic for you. It can be very handy if you have a group of TextFields and want to handle the states of each one. You should pass the hook return to the `state` property.

```jsx
import { TextField, useInputState, ThemeProvider } from '@vtex/admin-ui'

function Example() {
  const { value, onChange, onClear } = useInputState()

  return (
    <ThemeProvider>
      <TextField label="Label" state={{ value, onChange, onClear }} />
    </ThemeProvider>
  )
}
```

## Props

<proptypes />
