---
path: /form/label/
---

# Label

The `<Label>` component renders a `<label>` by default with basic reset styling.

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

## Customization

You can use the `styleOverrides` property to handle different styles.

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

<proptypes heading="Label" component="Label">
