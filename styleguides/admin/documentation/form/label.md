---
path: /form/label/
---

# Label

The `<Label>` component renders a `<label>` by default with basic reset styling.

## Behavior

```jsx
function Example() {
  return (
    <Label>
      Input Label!
      <br />
      <input value="input value" />
    </Label>
  )
}
```

## Installation

```sh isStatic
yarn add @vtex/admin-ui
```

```jsx isStatic
import { Label } from '@vtex/admin-ui'
```

## Customization

You can use the `styleOverrides` property to handle different styles.

### Example

```jsx
function Example() {
  return (
    <Label styleOverrides={{ display: 'flex', alignItems: 'center' }}>
      <Toggle state={{ checked: true }} />
      Toggle Label!
    </Label>
  )
}
```

## Props

<proptypes heading="Label" component="Label">
