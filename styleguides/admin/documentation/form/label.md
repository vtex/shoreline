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

You can use the `csx` property to handle different styles.

### Example

```jsx
function Example() {
  return (
    <Label csx={{ display: 'flex', alignItems: 'center' }}>
      <Toggle state={{ checked: true }} />
      Toggle Label!
    </Label>
  )
}
```

## Props

| Name     | Type        | Description              | Required | Default |
| -------- | ----------- | ------------------------ | -------- | ------- |
| htmlFor  | `string`    | Label native htmlFor     | 🚫       | -       |
| children | `ReactNode` | Label children           | 🚫       | -       |
| csx      | `StyleProp` | Defines component styles | 🚫       | `{}`    |
