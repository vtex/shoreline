---
path: /form/input-password/
---

# Input Password

The `<Password>` component is used in a form in order to retrieve input from the user. It always has a `label` defined and it renders a `<input>` element with a `type="password"` .

## Behavior

```jsx
import { InputPassword, cn, ThemeProvider } from '@vtex/admin-ui'

function Example() {
  const [value, setValue] = React.useState('')

  return (
    <ThemeProvider>
      <div className={cn({ width: 300 })}>
        <InputPassword
          label="Label"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <InputPassword label="Disabled" value="" onChange={() => {}} disabled />
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
import { InputPassword } from '@vtex/admin-ui'
```

## Variation

### Icon

You can add one Icon on the left side of the `InputPassword`. Just use the `icon` property.

```jsx
import { InputPassword, cn, ThemeProvider } from '@vtex/admin-ui'
import { IconLock } from '@vtex/admin-ui-icons'

function Example() {
  const [value, setValue] = React.useState('')

  return (
    <ThemeProvider>
      <div className={cn({ width: 300 })}>
        <InputPassword
          label="Label"
          icon={<IconLock />}
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      </div>
    </ThemeProvider>
  )
}
```

### Helpers

You can add a `text` or a `char limit count` helper. Just use the `helperText` or `charLimit` properties.

```jsx
import { InputPassword, cn, ThemeProvider } from '@vtex/admin-ui'

function Example() {
  const [value, setValue] = React.useState('')

  return (
    <ThemeProvider>
      <div className={cn({ width: 300 })}>
        <InputPassword
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
import { InputPassword, cn, ThemeProvider } from '@vtex/admin-ui'

function Example() {
  const [value, setValue] = React.useState('')

  return (
    <ThemeProvider>
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
    </ThemeProvider>
  )
}
```

### Overview

Example of the `InputPassword` with all its features.

```jsx
import { InputPassword, cn, ThemeProvider } from '@vtex/admin-ui'
import { IconLock } from '@vtex/admin-ui-icons'

function Example() {
  const [value, setValue] = React.useState('')

  return (
    <ThemeProvider>
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
    </ThemeProvider>
  )
}
```

## Props

<proptypes heading="InputPassword" components="InputPassword"/>
