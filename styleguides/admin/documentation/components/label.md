---
path: /docs/label/
---

# Label

Form label component

## Behavior

```jsx
import { Label, ThemeProvider } from '@vtex/admin-ui'

function Example() {
  return (
    <ThemeProvider>
      <Label>
        Input Label!
        <br />
        <input value="input value" />
      </Label>
    </ThemeProvider>
  )
}
```

## Installation

```static
yarn add @vtex/admin-ui
```

```jsx static
import { Label } from '@vtex/admin-ui'
```

## Variation
### Using `htmlFor` prop

```jsx
import { Label, ThemeProvider } from '@vtex/admin-ui'

function Example() {
  return (
    <ThemeProvider>
      <Label htmlFor="my-input">Input Label!</Label>
      <br />
      <input id="my-input" value="input value" />
    </ThemeProvider>
  )
}
```

## Customization

You can use all the theme tokens to make customizations, and you can also use the `sx` prop.

> 💡 You can check the Theme Documentation for detailed info.

### Example

```jsx
import { Label, Toggle, ThemeProvider } from '@vtex/admin-ui'

function Example() {
  return (
    <ThemeProvider>
      <Label styleOverrides={{ display: 'flex', alignItems: 'center' }}>
        <Toggle state={{ checked: true }} />
        Toggle Label!
      </Label>
    </ThemeProvider>
  )
}
```

## Props

It also receives all the props from `BoxProps` except the `el` prop.

<proptypes heading="Label" component="Label">
